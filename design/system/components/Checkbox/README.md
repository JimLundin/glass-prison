Checkbox is the system's only check: a 22px circle that fills with `accent` and a white tick. Tasks, wiki checklists and the choices in `ChoiceList` / `AgentQuestion` all use this same mark — there is no square checkbox and no separate radio style.

**Consumer provides** `checked` + `onChange` (or `defaultChecked`), and either a text label as children or `label` (accessible name) for a bare tick. `strike` greys and strikes the label when checked (checklists).

The native input is kept (visually hidden) for keyboard and screen readers; the hit area is at least 44px; focus shows the `focus-ring` around the circle.
