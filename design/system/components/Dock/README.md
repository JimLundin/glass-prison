Dock arranges everything a module contributes to the bottom of the screen — navigation, back, a title or view switcher, actions, one primary action and one input surface — and re-arranges it for each size class.

**Consumer provides** (all optional; pass it as a `Screen`'s `dock`)
- `nav`: the global `TabBar`, from the app shell. Omit it in a pane whose nav lives elsewhere (the main pane on Expanded and up, when the `TabBar` sits in `asideDock`).
- `navIcon`: the current module's glyph, shown as a single circle when the nav collapses.
- `back`: `{icon, label, onClick}` when the view is one level in (a conversation, an event, a wiki page). Its presence also hides `nav`'s claim to be the way out.
- `title` or `center`: a passive title, or a view switcher (`SegmentedControl`). Both sit in a glass capsule — nothing in the dock rests bare on content.
- `actions`: `{id, label, icon, onClick, destructive}` in priority order.
- `primary`: `{label, icon, onClick}` — the module's one main action.
- `input`: one `Composer` (compose), or one `SearchField` (`query` / `capture`).
- `inputActive`: force the active-input state (it is otherwise "focus is inside the input").

**Arrangement** (the size class is measured from the pane the Dock sits in)

| | Compact (< 600) | Medium (600–839) | Wide (≥ 840 pane) |
| --- | --- | --- | --- |
| Rows, top → bottom | context · input · nav | centre · back + input + actions · nav | one row: back + input/centre + actions + primary |
| Visible actions | 1 (more → menu) | 2 | 3 |
| Primary | accent circle | filled labelled button | filled labelled button |
| While input is active | nav collapses to a `navIcon` circle beside the input | nav stays | — |

- Do: let modules declare contributions and let Dock lay them out — modules never place chrome themselves.
- Do: order `actions` by importance; the tail is what overflows.
- Don't: give a view more than one input, or more than one primary.

> Superseded by `Cluster`, which follows the same slot model with fewer variations and animates between states. Kept for static layouts.
