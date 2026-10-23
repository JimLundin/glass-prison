ListRow is one 44px-minimum row inside a `ListGroup`: optional icon tile, title, subtitle, trailing detail and accessory.

**Consumer provides** `title`, and optionally `subtitle`, `detail` (trailing `label-secondary` value), `icon` (an `Icon` name or node) with `tint` (a system colour name), `accessory` (`'chevron'`, a node such as a `Switch`, or `null`), `onClick`, `destructive`.

Hairline `separator` dividers are inset to the text column. An `onClick` row gets a chevron by default and a `fill-control` pressed state.

- Do: title in sentence case, `body`; subtitle `subheadline` in `label-secondary`.
- Do: icon tiles carry a white glyph on one system colour — the title always carries the meaning (white on orange/yellow tiles is decorative, under 3:1).
- Don't: put two lines of subtitle; truncate instead.
