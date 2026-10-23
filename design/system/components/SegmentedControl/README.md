SegmentedControl switches between 2–5 mutually exclusive views of the same content.

**Consumer provides** `options` (strings or `{value, label}`), `value` + `onChange` (controlled) or `defaultValue`, and an `aria-label`.

It speaks the tab bar's selection language: the selected item gets a `fill-control` lozenge and an `accent-text` label at 600, and the lozenge slides between positions. On `canvas` it sits in a `fill-control` track (36px items); inside glass — the cluster's accessory — the track disappears and items take the tab bar's 48px height, so a view switcher and the tab bar read as the same kind of control.

- Do: keep labels to one short word each; Title Case.
- Do: place it inside a glass toolbar or directly on `canvas`.
- Don't: use it for actions or for more than five options — use a menu.
