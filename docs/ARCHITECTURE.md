# Architecture

## The shell owns the bar; pages request

Nothing a page renders is a fixed control. A page calls `useBar()` with what it wants, and the shell places it:

```tsx
useBar({
  accessory: { kind: 'composer', key: 'reply', placeholder: 'Reply…', onSend },   // field or switcher → the centre
  primary:   { icon: 'plus', label: 'New Event' },                                 // → the trailing circle (or into … with actions)
  actions:   [{ id: 'share', label: 'Share', icon: 'share' }],                     // → the … bloom; icons on desktop
}, [deps]);
```

The shell adds **Back** itself (one level in; search and places count as levels) and the **module circle** on phones.
Accessory kinds: `composer`, `query`, `capture`, `switcher`. Only the open item requests — lists in the left half never do.

| Size (`state/size.ts`) | Devices | Layout |
| --- | --- | --- |
| compact (< 840) | phone, Duo folded | one pane, one bar `[…][field][Back/module]`; the module circle blooms into modules + search |
| expanded (840–1199, touch) | Duo open, tablet | list \| item; left bar = modules laid flat + search; right bar = the item's requests, circles gathered right (`gather`) |
| large (≥ 1200, or ≥ 1000 with a pointer) | desktop | same two bars; actions laid flat as icons (`flat`); keys shown inside buttons |

**Nothing moves under your thumb:** the bar only changes shape from your own tap or while you type.

## Focus cards

`useFocus().open(spec)` puts a card in place of the whole bar — `kind: 'request' | 'question' | 'card' | 'source'`.
Every card has a way out without answering (`dismiss`: ✕ Later, ‹ Back, ✕ Close), plus swipe-down and Esc. Answering or
leaving closes it. Cards only open from the user's own tap; a new agent request waits in the chat as a prompt.

## Modules

```ts
interface ModuleDef {
  id; label; icon;
  List: ComponentType;                       // phone root (unless Root is set) and the left half
  Root?: ComponentType;                      // phone root when it differs from List (e.g. ChatHome adds the composer)
  Item?: ComponentType<{ route: Route }>;    // what a route points at — requests the bar
  home?: Route;                              // the right half before anything is picked
}
```

Navigate with `useNav()`: `go(module, route?)`, `push(route)`, `back()`, `openPlace(id)`, `setSearch(q)`.
Places aren't a module — they open over whatever mentioned them. Search is reached from the bar, not a tab.

## The wiki model

A page is structured data, not markdown (`WikiDocument` in `@smoked-glass/ui`): typed blocks — `paragraph` (claims),
`heading`, `facts`, `timeline` (a query into Calendar), `tasks` (into Tasks), `place` (into Places), `questions`, `sources`.
Each claim stores its source ids and the exact span of source text it rests on. Sources are **stored copies**
(`conversation`, `voice`, `document`, `image`, `web`) with an `origin` URI and a `captured` time, so a citation can't drift.
Only the agent writes pages; you steer it in chat. `WikiDoc` renders a page; tapping a citation opens a `SourceCard`
focus card with the cited words highlighted.

## The kit

`packages/ui/src/index.ts` is the typed surface. The implementations were ported mechanically from the design-system
bundle (React.createElement, `// @ts-nocheck` inside); convert a folder to TSX when you start changing it — the public types
stay the contract. Styles are plain CSS on tokens: `data-theme="dark" | "light"` on any ancestor switches Smoke / Frost.

## Next steps

- Replace `app/state/store.tsx` with your API client (chats, prompts, events, tasks, sources, pages).
- Wire the agent: prompts arrive as `Prompt` records; answering calls back into the agent.
- Persist navigation in the URL if you want deep links (`nav.tsx` is the one place to change).
