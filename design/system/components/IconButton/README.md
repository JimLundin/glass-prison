IconButton is a circular, icon-only control — back, close, more, send.

**Consumer provides** `icon` (an `Icon` name), `label` (required: the accessible name and tooltip) and `onClick`.

Variants: `glass` (thin glass, default, for toolbar circles over content), `smoke` (over photos/video), `fill` (`fill-control`, inside glass panels), `accent` (filled send button), `tinted`, `plain`. Sizes `sm` 32px, `md` 44px, `lg` 52px.

- Do: put back / close at the leading end and more / share at the trailing end of the `BottomBar` — never in the top corners.
- Don't: use an icon whose meaning isn't obvious without its label; use a `Button` with text instead.
