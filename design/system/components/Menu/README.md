Menu is an ellipsis (or other icon) button that opens a thick-glass list of actions upward from itself — the overflow for any dock.

**Consumer provides** `items` (`{id, label, icon, onClick, destructive}` in priority order), and optionally `icon`, `label` (accessible name, default "More"), `align` (`'end'` default opens toward the leading side from a trailing trigger; `'start'` for a leading trigger).

Items are 44px rows: label on the leading side in `body`, glyph trailing. Destructive items go last, in `danger-text`. Closes on choice, outside tap or Escape.

- Do: let `Dock` build it from the actions that don't fit; use it directly only for a fixed "more" button.
- Do: keep it to seven items or fewer; group with a hairline if needed.
- Don't: open it downward, or put it in the top half.
