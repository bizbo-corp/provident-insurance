#!/usr/bin/env node
// Prints the colour, radius and shadow tokens from app/globals.css as JSON,
// so the Figma sync can diff them against the library's variables.
// Usage: node figma/extract-tokens.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "app/globals.css"), "utf8");

const block = (selector) => {
  const start = css.indexOf(selector);
  if (start < 0) return "";
  const open = css.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}" && --depth === 0) return css.slice(open + 1, i);
  }
  return "";
};
const decls = (text) =>
  Object.fromEntries(
    [...text.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()])
  );

const theme = decls(block("@theme inline"));
const rootVars = decls(block(":root"));
const resolve = (v) => {
  const m = /^var\(--([\w-]+)\)$/.exec(v);
  return m && rootVars[m[1]] ? rootVars[m[1]] : v;
};

const out = { colors: {}, radius: {}, shadow: {} };
for (const [name, value] of Object.entries(theme)) {
  if (name.startsWith("color-")) out.colors[name.slice(6)] = { value: resolve(value).toUpperCase(), alias: value.startsWith("var(") ? value : null };
  else if (name.startsWith("radius-")) out.radius[name.slice(7)] = value;
  else if (name.startsWith("shadow-")) out.shadow[name.slice(7)] = value;
}
console.log(JSON.stringify(out, null, 2));
