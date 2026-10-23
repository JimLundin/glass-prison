ChoiceList is a set of options shown as tappable `fill-control` rows, each with the system's tick; the chosen ones take `accent-tint`.

**Consumer provides** `options` (strings or `{value, label, detail}`), `value` + `onChange` or `defaultValue`, `multiple`, `columns`, `legend`, and `other` (a placeholder that adds a free-text option).

Semantics follow `multiple`: radios for one, checkboxes for several — the look is the same tick either way.
