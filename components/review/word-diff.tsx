type Part = { text: string; kind: "same" | "added" | "removed" };

const normalise = (word: string) => word.replace(/[’‘]/g, "'").replace(/[“”]/g, '"');

/** Word-level diff (longest common subsequence), comparing curly and straight quotes as equal. */
export function wordDiff(original: string, shown: string): Part[] {
  const a = original.split(/\s+/).filter(Boolean);
  const b = shown.split(/\s+/).filter(Boolean);
  const table = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      table[i][j] =
        normalise(a[i]) === normalise(b[j]) ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const parts: Part[] = [];
  const push = (text: string, kind: Part["kind"]) => {
    const last = parts.at(-1);
    if (last?.kind === kind) last.text += ` ${text}`;
    else parts.push({ text, kind });
  };
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (normalise(a[i]) === normalise(b[j])) {
      push(b[j], "same");
      i++;
      j++;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      push(a[i++], "removed");
    } else {
      push(b[j++], "added");
    }
  }
  while (i < a.length) push(a[i++], "removed");
  while (j < b.length) push(b[j++], "added");
  return parts;
}

export function hasEdits(original: string, shown: string) {
  return wordDiff(original, shown).some((part) => part.kind !== "same");
}

export function WordDiff({ original, shown }: { original: string; shown: string }) {
  return (
    <p className="leading-relaxed">
      {wordDiff(original, shown).map((part, index) => (
        <span key={index}>
          {index > 0 && " "}
          {part.kind === "same" && part.text}
          {part.kind === "removed" && (
            <del className="bz-del">{part.text}</del>
          )}
          {part.kind === "added" && (
            <ins className="bz-ins">{part.text}</ins>
          )}
        </span>
      ))}
    </p>
  );
}
