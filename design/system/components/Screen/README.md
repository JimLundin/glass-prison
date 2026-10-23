Screen is the responsive shell every view is built from: a passive header in the top zone, a scrolling content pane, and a bottom dock that holds all fixed controls — plus an aside pane on tablet and desktop widths.

**Consumer provides**
- `title` (and optional `eyebrow`): rendered as a passive `large-title` header that scrolls away with content. It is never interactive.
- `children`: the main pane's scrolling content.
- `dock`: every fixed control for the main pane — normally a `Dock` holding the module's contributions (or, for simple cases, a `TabBar`, `BottomBar` or `Composer` directly). It is pinned `space-4` above the bottom edge (and the safe area) and capped at the bottom half of the pane (`reach-line`).
- `aside`, `asideTitle`, `asideEyebrow`, `asideDock`: an optional list pane shown beside the main pane from Expanded (840px) up; its controls (usually the `TabBar`) dock at its own bottom.

**How it adapts** (read from its own width via container queries; numbers mirror the `layout` tokens)
- Compact (< 600): one pane, dock full width minus `space-4`.
- Medium (600–839, e.g. a foldable opened flat): content capped at `content-max`, dock at `dock-max`, both centred.
- Expanded (840–1199): aside pane at `aside-width` appears; on Compact/Medium the app shows the aside content as its own screen instead.
- Large (≥ 1200): aside widens to 380px.
- `hinge`: on a hinged foldable opened flat (iPhone Duo, 890 × 626 pt), the two panes split exactly at the fold.
- Short height (< 500, phones in landscape): title drops to `title-3` size, tab labels hide, the dock tightens.

- Do: put every button, field and tab in a `dock` or in scrolling content — nothing fixed in the top half.
- Do: give the Screen the full height of its container; it scrolls internally.
- Don't: add a top app bar, top-corner buttons or a side navigation rail at any size.
