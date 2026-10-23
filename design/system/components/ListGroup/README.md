ListGroup is an inset, rounded group of `ListRow`s on thick glass, with an optional header and footer — the settings-style list.

**Consumer provides** `ListRow` children, and optionally `header` (rendered uppercase `footnote`, `label-secondary`), `footer` (`footnote` helper text), and `glass={false}` for an opaque `canvas-raised` group when nothing scrolls beneath.

- Do: separate groups by `space-6`; keep headers to two or three words.
- Do: put a lone destructive action in its own group at the bottom.
- Don't: nest a ListGroup inside other glass.
