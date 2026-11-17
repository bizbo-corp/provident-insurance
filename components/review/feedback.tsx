"use client";

import { Tick } from "@/components/review/badges";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Verdict = "approved" | "changes" | null;
type Entry = { label: string; verdict: Verdict; note: string; updatedAt?: number };
type Store = Record<string, Entry>;
/** "off" means there's no server store (local development), so feedback stays in this browser. */
type Remote = "checking" | "on" | "off";
type SaveState = "idle" | "saving" | "saved" | "error";

const STORAGE_KEY = "provident-review-feedback-v1";
const REVIEWER_KEY = "provident-reviewer";

const FeedbackContext = createContext<{
  store: Store;
  update: (id: string, entry: Partial<Entry> & { label: string }) => void;
  reviewer: string;
  setReviewer: (name: string) => void;
  remote: Remote;
  saveState: SaveState;
} | null>(null);

const readLocal = (): Store => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

async function pushEntries(reviewer: string, entries: Store) {
  const response = await fetch("/api/feedback", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewer, entries }),
  });
  if (!response.ok) throw new Error(`Save failed: ${response.status}`);
}

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>({});
  const [reviewer, setReviewerState] = useState("");
  const [remote, setRemote] = useState<Remote>("checking");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const storeRef = useRef<Store>({});
  const dirty = useRef(new Set<string>());
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const commit = useCallback((next: Store) => {
    storeRef.current = next;
    setStore(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  /** Loads the reviewer's saved feedback and merges it with this browser's, newest edit winning. */
  const sync = useCallback(
    async (name: string) => {
      if (!name) {
        // No reviewer yet: just ask whether the server store is there (404 means it isn't).
        const response = await fetch("/api/feedback", { cache: "no-store" }).catch(() => null);
        setRemote(response && response.status !== 404 ? "on" : "off");
        return;
      }
      setRemote("checking");
      try {
        const response = await fetch(`/api/feedback?reviewer=${encodeURIComponent(name)}`, { cache: "no-store" });
        if (!response.ok) throw new Error(String(response.status));
        const { entries: saved } = (await response.json()) as { entries: Store };
        const local = storeRef.current;
        const merged: Store = { ...saved };
        const toPush: Store = {};
        for (const [id, entry] of Object.entries(local)) {
          if (!saved[id] || (entry.updatedAt ?? 0) > (saved[id].updatedAt ?? 0)) {
            merged[id] = entry;
            toPush[id] = entry;
          }
        }
        commit(merged);
        setRemote("on");
        if (Object.keys(toPush).length) await pushEntries(name, toPush);
      } catch {
        setRemote("off");
      }
    },
    [commit]
  );

  useEffect(() => {
    const local = readLocal();
    const name = localStorage.getItem(REVIEWER_KEY) ?? "";
    storeRef.current = local;
    // Restores this browser's feedback and reviewer after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStore(local);
    setReviewerState(name);
    void sync(name);
  }, [sync]);

  const flush = useCallback(async () => {
    if (remote !== "on" || !reviewer || dirty.current.size === 0) return;
    const ids = [...dirty.current];
    dirty.current.clear();
    const entries = Object.fromEntries(ids.map((id) => [id, storeRef.current[id]]));
    setSaveState("saving");
    try {
      await pushEntries(reviewer, entries);
      setSaveState("saved");
    } catch {
      ids.forEach((id) => dirty.current.add(id));
      setSaveState("error");
    }
  }, [remote, reviewer]);

  const update = (id: string, entry: Partial<Entry> & { label: string }) => {
    const current = storeRef.current;
    commit({ ...current, [id]: { ...(current[id] ?? { verdict: null, note: "" }), ...entry, updatedAt: Date.now() } });
    dirty.current.add(id);
    clearTimeout(timer.current);
    // Typing in a comment saves once the reviewer pauses.
    timer.current = setTimeout(() => void flush(), 600);
  };

  const setReviewer = (name: string) => {
    const trimmed = name.trim();
    if (trimmed.toLowerCase() !== reviewer.toLowerCase() && reviewer && remote === "on") {
      // A different person on this browser starts from their own saved feedback, not the last person's.
      commit({});
    }
    localStorage.setItem(REVIEWER_KEY, trimmed);
    setReviewerState(trimmed);
    void sync(trimmed);
  };

  return (
    <FeedbackContext.Provider value={{ store, update, reviewer, setReviewer, remote, saveState }}>
      {children}
    </FeedbackContext.Provider>
  );
}

function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback needs a FeedbackProvider");
  return context;
}

/** Asks for the reviewer's name once, so their feedback is saved under it and comes back on their next visit. */
export function ReviewerBar() {
  const { reviewer, setReviewer, remote, saveState } = useFeedback();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const pathname = usePathname();

  // Not on Bizbo's own page of everyone's feedback, or when there's nowhere to save it but this browser.
  if (pathname.startsWith("/review/feedback/all") || (remote === "off" && !reviewer)) return null;

  if (!reviewer || editing) {
    return (
      <form
        className="bz-cell mb-8 flex flex-wrap items-end gap-3 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim()) return;
          setReviewer(draft);
          setEditing(false);
        }}
      >
        <label className="min-w-[220px] flex-1 text-sm">
          <span className="bz-eyebrow mb-2 block">Your name</span>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="So we know whose feedback it is"
            autoComplete="name"
            className="bz-field"
          />
        </label>
        <button type="submit" className="bz-btn bz-btn--primary bz-btn--sm" disabled={!draft.trim()}>
          Start reviewing
        </button>
      </form>
    );
  }

  const status =
    remote === "checking"
      ? "Loading your feedback…"
      : remote === "off"
        ? "Saved in this browser only."
        : saveState === "saving"
          ? "Saving…"
          : saveState === "error"
            ? "Couldn't save just now. We'll try again with your next change."
            : "Your feedback saves automatically.";

  return (
    <p className="bz-muted mb-8 text-sm">
      Reviewing as <strong className="text-[var(--root)]">{reviewer}</strong>. {status}{" "}
      <button
        type="button"
        className="underline underline-offset-4"
        onClick={() => {
          setDraft(reviewer);
          setEditing(true);
        }}
      >
        Not you?
      </button>
    </p>
  );
}

/** Approve or ask for changes on one item. */
export function FeedbackControl({ id, label }: { id: string; label: string }) {
  const { store, update } = useFeedback();
  const entry = store[id];
  const options: { verdict: Exclude<Verdict, null>; text: string }[] = [
    { verdict: "approved", text: "Approve" },
    { verdict: "changes", text: "Request changes" },
  ];
  return (
    <div className="bz-cell p-5">
      <p className="bz-eyebrow mb-3">Provident feedback</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = entry?.verdict === option.verdict;
          return (
            <button
              key={option.verdict}
              type="button"
              aria-pressed={active}
              onClick={() => update(id, { label, verdict: active ? null : option.verdict })}
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
      <label className="mt-3 block text-sm">
        <span className="sr-only">Comments on {label}</span>
        <textarea
          rows={2}
          value={entry?.note ?? ""}
          onChange={(event) => update(id, { label, note: event.target.value })}
          placeholder="Comments (optional)"
          className="bz-field"
        />
      </label>
    </div>
  );
}

/** Everything the reviewer has entered, with a copy button as a fallback. */
export function FeedbackSummary() {
  const { store, remote, reviewer } = useFeedback();
  const [copied, setCopied] = useState(false);
  const entries = Object.values(store).filter((entry) => entry.verdict || entry.note.trim());

  const text = [
    `Provident website version 2: review feedback${reviewer ? ` from ${reviewer}` : ""}`,
    "",
    ...entries.map((entry) => {
      const verdict = entry.verdict === "approved" ? "Approved" : entry.verdict === "changes" ? "Changes requested" : "Comment";
      return `${entry.label}: ${verdict}${entry.note.trim() ? `\n  ${entry.note.trim()}` : ""}`;
    }),
  ].join("\n");

  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="bz-muted">
          Nothing yet. Use the Approve and Request changes buttons on each change, and your choices will collect here.
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
          ? "Your feedback is already saved and sent to Bizbo, so there's no need to email it. Copy it if you'd like your own record."
          : "Your feedback is saved in this browser only, so you can come back to it. Copy it into an email to send it to us."}
      </p>
    </div>
  );
}
