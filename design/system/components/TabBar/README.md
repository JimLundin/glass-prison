TabBar is the floating capsule of top-level destinations that sits above the home indicator, with an optional detached circular action (search) beside it.

**Consumer provides** `items` (`{id, label, icon}`, 2–5 of them), `value` + `onChange` (or `defaultValue`), and optionally `action` `{icon, label, onClick}`.

Regular glass, `radius-pill`. The selected tab gets a `fill-control` lozenge and `accent-text` glyph and label; labels are `caption-1` at 500.

- Do: pass it as a `Screen` dock — on Compact and Medium in `dock`, on Expanded and up in `asideDock` so it sits under the list pane. It never becomes a top bar or a side rail.
- At short heights (landscape) it drops its labels and shrinks to 44px automatically inside `Screen`.
- Do: shrink it to icons only (or a single capsule) on scroll — glass morphs, it does not disappear.
- Don't: use it for actions; actions go in toolbars or the `action` circle.

> Legacy: use `Cluster`, which draws this inside the bottom cluster and morphs between states.
