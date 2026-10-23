Button is a capsule-shaped action with a Title Case label, optionally led by an icon.

**Consumer provides** the label (`children`), `onClick`, and optionally `icon`, `size`, `variant`, `destructive`, `disabled`.

| `variant` | Look | When |
| --- | --- | --- |
| `glass` (default) | regular glass, `label` text | Actions floating over content |
| `filled` | `accent` fill, white text | The one primary action on a screen or sheet |
| `tinted` | `accent-tint` fill, `accent-text` | Secondary actions that should still read as tappable |
| `gray` | `fill-control`, `label` | Neutral actions inside glass panels (Cancel) |
| `plain` | text only, `accent-text` | Text buttons inside the `BottomBar` (Edit, Done) |

Sizes: `sm` 32px (`subheadline` 600), `md` 44px (`headline`, default), `lg` 52px. Every size keeps a 44px hit area — pad `sm` buttons' surroundings accordingly.

- Do: one `filled` button per view; Title Case verbs ("Delete Chat", "Add Photos").
- Do: `destructive` turns the label `danger-text`, or a filled button `danger-fill`.
- Don't: put a `glass` button on another glass surface — use `gray` there.
