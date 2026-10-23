# Glass Prison

The Smoked Glass design, as code. A working React + TypeScript starter for the Smoked Glass app: the component kit as a package, and an app shell that already
behaves the way the design says — one bar on a phone, two bars on the open iPhone Duo and desktop, pages that *request*
controls instead of laying them out, focus cards for anything the agent needs from you, and a wiki where every statement
cites its source.

```bash
npm install
npm run dev        # http://localhost:5173 — resize the window: < 840 px phone, 840–1199 Duo/tablet, ≥ 1200 desktop
npm run build      # typecheck + production build
```

## What's where

```
packages/ui/                    @smoked-glass/ui — the component kit
  src/index.ts                  every component, typed (start here)
  src/types.ts                  all prop types
  src/styles/                   tokens.css (light Frost / dark Smoke) + components.css
  src/layout/Cluster.ts         the bottom bar: row · bloom · focus
  src/agent/  calendar/  wiki/  places/  selection/  fields/  lists/  primitives/  modules/
  src/legacy/                   TabBar, BottomBar, Dock — reference only
  tokens/tokens.json            design tokens; `npm run tokens` regenerates tokens.css

apps/web/                       the app
  src/app/shell/AppShell.tsx    phone / Duo / desktop layouts; owns both bars
  src/app/shell/Page.tsx        scrolling page with a large title and the passive top edge
  src/app/state/bar.tsx         useBar() — how a page asks the bar for a field, switcher, Primary, actions
  src/app/state/focus.tsx       useFocus() — open a focus card (permission, question, event, place, source)
  src/app/state/nav.tsx         modules, per-module route stacks, places over any screen, search
  src/app/state/store.tsx       in-memory data — replace with your backend
  src/app/state/size.ts         compact · expanded · large
  src/modules/                  chat · calendar · tasks · wiki · you · search · places
  src/modules/registry.ts       add a module here and it appears in navigation everywhere
  src/model/types.ts            the data model (chats, prompts, events, tasks, places, wiki pages)
  src/data/                     sample data (the Lisbon trip)

docs/DESIGN.md                  the design rules (from the design system)
docs/ARCHITECTURE.md            how the shell, requests, focus cards, modules and the wiki model fit together
```

The canvas and design system this was built from stay the reference for visuals; this repo is where they become product.
