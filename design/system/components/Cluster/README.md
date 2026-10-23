Cluster is the bottom cluster: one structure — `[leading circle] [centre] [trailing circle]` — in three states (row, bloom, focus). Pages don't lay it out; they pass requests and the cluster places them.

**Consumer provides** (all optional except `tabs`)
- `tabs` (`{id, label, icon, badge}`), `tab`, `onTab` — the app's modules. They live in the leading circle's bloom.
- `search` (`{onOpen, placeholder}`) — "Search everything" at the bottom of the Go to bloom; `onOpen` should put a `query` field in the centre.
- `back` (`{onClick, label}`) — one level in; takes the leading circle.
- `accessory` — the centre request: a field (`{kind:'composer'|'query'|'capture', …}` or a `Composer` / `SearchField`) or a switcher (`{kind:'switcher', options, defaultValue}`).
- `primary` (`{icon, label, onClick}`) — alone it is the accent trailing circle; with actions it becomes the first, accented item of the "…" bloom.
- `actions`, `more` (`{id, label, icon, onClick, destructive}`) — the trailing "…" circle blooms into them.
- `sheet` — the focus card: `{kind:'request', …AgentRequest}`, `{kind:'question', …AgentQuestion}`, `{kind:'card', title, subtitle, lines, actions}`, or a node. While present the whole cluster is this card, anchored to the bottom.
- `flat` — pointer layout (desktop): the modules lie flat with their names, the actions sit as icons, and the row reads left to right.
- `gather` — both circles gather in the right thumb's corner and the centre fills inward (a pane's bar on the open Duo).
- `bloomLabels` — `false` drops the names beside bloomed circles.
- `search.onQuery(q)` — blooming the module circle turns the centre into a search field; the first keystroke calls this and closes the bloom.
- No `tabs` and no `back` — the leading circle is left out (an item pane beside a list).
- `bloom` / `onBloom` — `'none' | 'lead' | 'trail'`, to control blooming from outside (otherwise internal; tapping away or Escape closes).
- `variant` — `'row'` (default for new work) or `'bar'` (the iOS 26 tab-bar reference).

The pieces are absolutely positioned glass that transition position, size and radius on the system spring; content cross-fades with a blur. A bloom dims and blurs the screen (`scrim`) and springs its options up out of the circle as labelled glass capsules, the circle becoming ✕; focus grows from the whole row. Under reduced motion only opacity changes.

- Do: give every focus card a `dismiss` — the way out without answering (✕ Later for requests and questions, ‹ Back for a place). It sits at the end of the answer row, where Back sits in the bar.
- Don't: request more than one centre item, or put a title in the cluster.
