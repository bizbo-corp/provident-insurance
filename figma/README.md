# Figma library link

The Provident Insurance design system lives in Figma:
https://www.figma.com/design/XPjkbiazUJDWvh4LRYR7cC

- `design-system.json` maps every Figma component (node id and key) to its source file, export and props. It stands in for Code Connect, which needs a Figma Organization plan.
- `node figma/extract-tokens.mjs` prints the tokens in `app/globals.css` as JSON, for diffing against the Figma variables.

Code is the source of truth. When a token or component changes here, update the Figma library in place (same names and node ids) and republish it, rather than recreating components. The `provident-figma-sync` skill does this.
