"use client";

import { Tick } from "@/components/review/badges";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Verdict = "approved" | "changes" | null;
type Comment = { id: string; text: string; author: string; at: number };
type Entry = { label: string; verdict: Verdict; comments: Comment[]; updatedAt?: number; note?: string };
type Store = Record<string, Entry>;
/** "off" means there's no server store (local development), so feedback stays in this browser. */
type Remote = "checking" | "on" | "off";
type SaveState = "idle" | "saving" | "saved" | "error";

const STORAGE_KEY = "provident-review-feedback-v1";
const REVIEWER_KEY = "provident-reviewer";

const FeedbackContext = createContext<{
  store: Store;
  setVerdict: (id: string, label: string, verdict: Verdict) => void;
  addComment: (id: string, label: string, text: string) => void;
  removeComment: (id: string, commentId: string) => void;
  reviewer: string;
  ready: boolean;
  setReviewer: (name: string) => void;
  remote: Remote;
  saveState: SaveState;
} | null>(null);

/** Older saves kept one free-text note per item; show it as a comment. */
function normalise(entry: Entry, author: string): Entry {
  const comments = Array.isArray(entry.comments) ? [...entry.comments] : [];
  if (entry.note?.trim() && comments.length === 0) {
    comments.push({ id: "note", text: entry.note.trim(), author, at: entry.updatedAt ?? Date.now() });
  }
  return { label: entry.label, verdict: entry.verdict ?? null, comments, updatedAt: entry.updatedAt ?? 0 };
}

const normaliseStore = (store: Store, author: string) =>
  Object.fromEntries(Object.entries(store).map(([id, entry]) => [id, normalise(entry, author)]));

const readLocal = (): Store => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

/** Both sides' comments are kept; the status with the newest change wins. */
function mergeEntry(a: Entry | undefined, b: Entry): Entry {
  if (!a) return b;
  const comments = new Map<string, Comment>();
  for (const comment of [...a.comments, ...b.comments]) comments.set(comment.id, comment);
  const newer = (b.updatedAt ?? 0) >= (a.updatedAt ?? 0) ? b : a;
  return {
    label: newer.label,
    verdict: newer.verdict,
    comments: [...comments.values()].sort((x, y) => x.at - y.at),
    updatedAt: Math.max(a.updatedAt ?? 0, b.updatedAt ?? 0),
  };
}

async function pushEntries(reviewer: string, entries: Store) {
  const response = await fetch("/api/feedback", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewer, entries }),
  });
  if (!response.ok) throw new Error(`Save failed: ${response.status}`);
}

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>({});
  const [reviewer, setReviewerState] = useState("");
  const [ready, setReady] = useState(false);
  const [remote, setRemote] = useState<Remote>("checking");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const storeRef = useRef<Store>({});
  const reviewerRef = useRef("");
  const remoteRef = useRef<Remote>("checking");

  const commit = useCallback((next: Store) => {
    storeRef.current = next;
    setStore(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const markRemote = (value: Remote) => {
    remoteRef.current = value;
    setRemote(value);
  };

  /** Loads the reviewer's saved feedback and merges it with this browser's. */
  const sync = useCallback(
    async (name: string) => {
      markRemote("checking");
      try {
        if (!name) {
          // No reviewer yet: just ask whether the server store is there (404 means it isn't).
          const probe = await fetch("/api/feedback", { cache: "no-store" });
          markRemote(probe.status === 404 ? "off" : "on");
          return;
        }
        const response = await fetch(`/api/feedback?reviewer=${encodeURIComponent(name)}`, { cache: "no-store" });
        if (!response.ok) throw new Error(String(response.status));
        const saved = normaliseStore(((await response.json()) as { entries: Store }).entries ?? {}, name);
        const merged: Store = { ...saved };
        for (const [id, entry] of Object.entries(storeRef.current)) merged[id] = mergeEntry(saved[id], entry);
        commit(merged);
        markRemote("on");
        const changed = Object.fromEntries(
          Object.entries(merged).filter(([id, entry]) => JSON.stringify(entry) !== JSON.stringify(saved[id]))
        );
        if (Object.keys(changed).length) await pushEntries(name, changed);
      } catch {
        markRemote("off");
      }
    },
    [commit]
  );

  useEffect(() => {
    const name = localStorage.getItem(REVIEWER_KEY) ?? "";
    const local = normaliseStore(readLocal(), name);
    storeRef.current = local;
    reviewerRef.current = name;
    // Restores this browser's feedback and reviewer after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStore(local);
    setReviewerState(name);
    setReady(true);
    void sync(name);
  }, [sync]);

  /** Saves one item straight away. */
  const save = async (id: string) => {
    if (remoteRef.current !== "on" || !reviewerRef.current) return;
    setSaveState("saving");
    try {
      await pushEntries(reviewerRef.current, { [id]: storeRef.current[id] });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  const change = (id: string, label: string, edit: (entry: Entry) => Entry) => {
    const current = storeRef.current[id] ?? { label, verdict: null, comments: [] };
    commit({ ...storeRef.current, [id]: { ...edit(current), label, updatedAt: Date.now() } });
    void save(id);
  };

  const setVerdict = (id: string, label: string, verdict: Verdict) => change(id, label, (entry) => ({ ...entry, verdict }));

  const addComment = (id: string, label: string, text: string) =>
    change(id, label, (entry) => ({
      ...entry,
      comments: [...entry.comments, { id: newId(), text: text.trim(), author: reviewerRef.current, at: Date.now() }],
    }));

  const removeComment = (id: string, commentId: string) => {
    const entry = storeRef.current[id];
    if (!entry) return;
    change(id, entry.label, (current) => ({ ...current, comments: current.comments.filter((comment) => comment.id !== commentId) }));
  };

  const setReviewer = (name: string) => {
    const trimmed = name.trim();
    if (reviewerRef.current && trimmed.toLowerCase() !== reviewerRef.current.toLowerCase() && remoteRef.current === "on") {
      // A different person on this browser starts from their own saved feedback, not the last person's.
      commit({});
    }
    localStorage.setItem(REVIEWER_KEY, trimmed);
    reviewerRef.current = trimmed;
    setReviewerState(trimmed);
    void sync(trimmed);
  };

  return (
    <FeedbackContext.Provider
      value={{ store, setVerdict, addComment, removeComment, reviewer, ready, setReviewer, remote, saveState }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback needs a FeedbackProvider");
  return context;
}

const formatTime = (time: number) =>
  new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(time);

function NameForm({ initial = "", onDone }: { initial?: string; onDone?: () => void }) {
  const { setReviewer } = useFeedback();
  const [draft, setDraft] = useState(initial);
  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.trim()) return;
        setReviewer(draft);
        onDone?.();
      }}
    >
      <label className="block text-sm">
        <span className="bz-eyebrow mb-2 block">Your name</span>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="First and last name"
          autoComplete="name"
          autoFocus
          className="bz-field"
        />
      </label>
      <button type="submit" className="bz-btn bz-btn--primary" disabled={!draft.trim()}>
        Continue
      </button>
    </form>
  );
}

/**
 * Asks for the reviewer's name when they first arrive, so it's stored against their
 * statuses and comments. Afterwards it shows who's reviewing and how feedback is saved.
 */
const CHANGE_NAME_EVENT = "review:change-name";

/** The name prompt: shown on the first visit, or when someone picks "Not you?". Sits once in the layout. */
export function ReviewerBar() {
  const { reviewer, ready } = useFeedback();
  const [editing, setEditing] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const open = () => setEditing(true);
    window.addEventListener(CHANGE_NAME_EVENT, open);
    return () => window.removeEventListener(CHANGE_NAME_EVENT, open);
  }, []);

  // Not on Bizbo's own page of everyone's feedback.
  if (!ready || pathname.startsWith("/review/feedback/all")) return null;
  if (reviewer && !editing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5" role="dialog" aria-modal="true" aria-labelledby="reviewer-title">
      <div className="bz-cell w-full max-w-md p-8">
        <p className="bz-eyebrow">Provident review</p>
        <h2 id="reviewer-title" className="bz-h3 mt-3">
          {editing ? "Change your name" : "Welcome. Who's reviewing?"}
        </h2>
        <p className="bz-muted mt-3 text-sm">
          Your name is saved with your approvals and comments, so each comment shows who made it.
        </p>
        <NameForm initial={editing ? reviewer : ""} onDone={() => setEditing(false)} />
        {editing && (
          <button type="button" className="bz-muted mt-4 text-sm underline underline-offset-4" onClick={() => setEditing(false)}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

/** "Reviewing as X", with where the feedback is saved and a way to change the name. Sits with the feedback controls. */
export function ReviewerLine({ className }: { className?: string }) {
  const { reviewer, ready, saveState } = useFeedback();
  if (!ready || !reviewer) return null;

  // The name doubles as the way to change it, so the line stays just "Reviewing as <name>".
  return (
    <p className={cn("bz-muted text-xs", className)} aria-live="polite">
      Reviewing as{" "}
      <button
        type="button"
        title="Change name"
        className="relative font-semibold text-[var(--root)] hover:underline hover:underline-offset-4"
        onClick={() => window.dispatchEvent(new Event(CHANGE_NAME_EVENT))}
      >
        {reviewer}
        <span className="sr-only"> (change name)</span>
      </button>
      {saveState === "error" && <span className="bz-warn"> Couldn&apos;t save. Please try again.</span>}
    </p>
  );
}

/**
 * Status and comments for one item. `embedded` drops the outer box so it can sit
 * inside another card, such as a testimonial.
 */
export function FeedbackControl({
  id,
  label,
  embedded = false,
  placeholder = "Add a comment",
}: {
  id: string;
  label: string;
  embedded?: boolean;
  placeholder?: string;
}) {
  const { store, setVerdict, addComment, removeComment, reviewer } = useFeedback();
  const [draft, setDraft] = useState("");
  const entry = store[id];
  const comments = entry?.comments ?? [];
  const options: { verdict: Exclude<Verdict, null>; text: string }[] = [
    { verdict: "approved", text: "Approve" },
    { verdict: "changes", text: "Request changes" },
  ];

  const submit = () => {
    if (!draft.trim()) return;
    addComment(id, label, draft);
    setDraft("");
  };

  return (
    <div className={embedded ? "bz-rule-top mt-4 pt-4" : "bz-cell p-5"}>
      {!embedded && (
        <p className="bz-eyebrow mb-4">Provident feedback</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold">Status</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label={`Status for ${label}`}>
          {options.map((option) => {
            const active = entry?.verdict === option.verdict;
            return (
              <button
                key={option.verdict}
                type="button"
                aria-pressed={active}
                onClick={() => setVerdict(id, label, active ? null : option.verdict)}
                className={cn(
                  "bz-btn bz-btn--sm",
                  active ? (option.verdict === "approved" ? "bz-btn--approved" : "bz-btn--changes") : "bz-btn--ghost"
                )}
              >
                {active && <Tick className="size-3.5" />}
                {option.text}
              </button>
            );
          })}
        </div>
      </div>

      <div className={embedded ? "mt-4" : "bz-rule-top mt-5 pt-5"}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-sm font-semibold">Comments</p>
          <ReviewerLine />
        </div>
        {comments.length > 0 && (
          <ul className="mt-3 space-y-3">
            {comments.map((comment) => (
              <li key={comment.id} className="bz-cell--stone rounded-[4px] border border-[var(--hairline)] p-3 text-sm">
                <div className="bz-muted flex flex-wrap items-center gap-x-2 text-xs">
                  <strong className="text-[var(--root)]">{comment.author || reviewer}</strong>
                  <span>{formatTime(comment.at)}</span>
                  <button
                    type="button"
                    className="ml-auto underline underline-offset-4"
                    onClick={() => removeComment(id, comment.id)}
                  >
                    Delete<span className="sr-only"> comment</span>
                  </button>
                </div>
                <p className="mt-1 whitespace-pre-wrap">{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
        <form
          className="mt-3"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <label className="block text-sm">
            <span className="sr-only">Add a comment on {label}</span>
            <textarea
              rows={2}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                // Enter adds the comment; Shift + Enter starts a new line.
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder={placeholder}
              className="bz-field"
            />
          </label>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="bz-muted text-xs">Press Enter to add. Shift + Enter for a new line.</span>
            <button type="submit" className="bz-btn bz-btn--primary bz-btn--sm" disabled={!draft.trim()}>
              Add comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** Everything the reviewer has entered, with a copy button as a fallback. */
export function FeedbackSummary() {
  const { store, remote, reviewer } = useFeedback();
  const [copied, setCopied] = useState(false);
  const entries = Object.values(store).filter((entry) => entry.verdict || entry.comments.length);

  const text = [
    `Provident conversion optimisation: review feedback${reviewer ? ` from ${reviewer}` : ""}`,
    "",
    ...entries.map((entry) => {
      const status = entry.verdict === "approved" ? "Approved" : entry.verdict === "changes" ? "Changes requested" : "No status";
      const lines = entry.comments.map((comment) => `  - ${comment.text.replace(/\n/g, "\n    ")}`);
      return [`${entry.label}: ${status}`, ...lines].join("\n");
    }),
  ].join("\n");

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="bz-muted">
          Nothing yet. Set a status and add comments on each change, and they&apos;ll collect here.
        </p>
      ) : (
        <pre className="bz-pre max-h-96 overflow-auto p-4 whitespace-pre-wrap">{text}</pre>
      )}
      <span className="bz-guides bz-guides--sm inline-flex">
        <button
          type="button"
          disabled={entries.length === 0}
          onClick={async () => {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          }}
          className="bz-btn bz-btn--primary"
        >
          {copied && <Tick className="size-4" />}
          {copied ? "Copied" : "Copy feedback"}
        </button>
      </span>
      <p className="bz-muted text-xs">
        {remote === "on"
          ? "Your feedback is already saved and shared with Bizbo, so there's no need to email it. Copy it if you'd like your own record."
          : "Your feedback is saved in this browser only, so you can come back to it. Copy it into an email to send it to Bizbo."}
      </p>
    </div>
  );
}
