# @smoked-glass/ui

The Smoked Glass component kit. Import components from the package root and the styles once:

```tsx
import '@smoked-glass/ui/styles.css';
import { Cluster, ListGroup, ListRow, WikiDoc } from '@smoked-glass/ui';
```

Put `data-theme="dark"` (Smoke) or `"light"` (Frost) on an ancestor. See `../../docs/DESIGN.md` for the rules and
`src/types.ts` for every prop.

`CalendarCollectionView` renders caller-supplied event groups in the wide collection pane or a
compact page. `CalendarPage` owns Day, Week, and Month presentation. Hosts own date meaning,
collection membership, selection, and Back navigation; a calendar range change leaves the
collection intact. See the [Calendar contract](../../docs/DESIGN.md#calendar).
