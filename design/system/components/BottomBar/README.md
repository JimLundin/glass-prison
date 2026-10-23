BottomBar is the bottom-docked replacement for a top navigation bar: back or close at the leading end, a title or the primary action in the centre, more actions at the trailing end.

**Consumer provides** `leading` (usually one `IconButton` — back `chevron-left` or close `xmark`, variant `plain`), `center` (a `headline` title, a `SegmentedControl`, or the one `filled` `Button`), `trailing` (one or two `IconButton`s, variant `plain`) and an `aria-label`. Pass it in a `Screen`'s `dock`, above the `Composer` when both appear.

The leading and trailing groups are regular-glass capsules; the centre sits directly on content, so a centre title should only appear where the backdrop is calm. An empty side keeps a spacer so the centre stays centred.

- Do: keep back on the leading end, always — it is the most-used control and sits under the thumb.
- Do: open menus from the trailing ellipsis upward.
- Don't: put a BottomBar at the top of a screen or a sheet, or more than three icons in it.

> Legacy: use `Cluster`, which draws this inside the bottom cluster and morphs between states.
