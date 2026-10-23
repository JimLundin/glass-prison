Switch toggles a single setting on or off, taking effect immediately.

**Consumer provides** `checked` + `onChange` (or `defaultChecked`) and an `aria-label` matching the row's title.

51 × 31px capsule: `fill-control` track off, `system-green` track on, white knob with `shadow-thumb` that slides with a spring.

- Do: place it as the trailing `accessory` of a `ListRow`; the row title says what it controls.
- Don't: use a switch for something that needs a Save button — use a checkmark row instead.
