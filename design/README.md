# Design reference

This folder is the **source of truth for how Glass Prison should look and behave**. When the app in `apps/web` and this
folder disagree, this folder wins — fix the app.

| Folder | What it is | How to use it |
| --- | --- | --- |
| [`system/`](system/) | The Smoked Glass design system exactly as published: the rules (`README.md`), tokens (`tokens.json`, `tokens.css`), the component bundle (`components/bundle.js`, `bundle.css`), prop types (`components/index.d.ts`) and every component's notes and preview (`components/<Name>/`). | Open `system/index.html` in a browser for a live gallery of every component (dark; `?theme=light` for light). Read `system/README.md` for the rules. |
| [`screenshots/`](screenshots/) | Every board on the design canvas, rendered — all modules at phone, iPhone Duo folded, iPhone Duo open and desktop sizes; the calendar's Day/Week/Month; the cited wiki; the bottom-bar studies. | Start at [`screenshots/README.md`](screenshots/README.md) — grouped by canvas section, with each board's title. |
| [`canvas/`](canvas/) | The source of every board (`*.dc.html`) and the canvas layout (`canvas.json`). The interactive prototypes are `ClusterProto`, `CalendarProto` and `WikiProto`. | These run in the design canvas (they need its runtime, which isn't included). Read them for exact content, data and states; the props at the bottom of each file show every variant. |
| [`comparison/`](comparison/) | The app (right of each pair) next to the matching board (left) at the same size. | Use as a checklist when changing the app. |

## The rules in one screen

Calendar's collection and detail roles follow the [current contract](../docs/DESIGN.md#calendar).
It supersedes the mini-month arrangement shown in the archived screenshots and canvas boards.

- **Interaction lives in the bottom half.** The top is for reading: a large title, then a small passive title in the top edge.
- **Pages request; the bar places.** Field or switcher → centre · Primary → trailing circle · actions → the `…` bloom (icons on desktop) · Back / module → leading circle · focus card → the whole bar.
- **Phone / Duo folded:** one bar `[…][field][Back/module]`; the module circle blooms into the modules (the bar stood upright) and the centre becomes search.
- **Duo open / tablet:** two bars — modules laid flat under the left half; the open item's bar under the right with its circles gathered in the right thumb's corner.
- **Desktop:** the same two bars, actions laid flat as icons, keyboard keys shown inside their buttons.
- **Focus cards** always have a way out without answering (✕ Later, ‹ Back), plus swipe-down and Esc.
- **Nothing moves under your thumb:** the bar only reshapes from your own tap or while you type.
- **Clear glass**, no accent colour on the bar's circles; blue only on the filled answer inside a card.
- **Dark (Smoke) is the primary theme**; light (Frost) must keep contrast.
- **Wiki:** written only by the agent; every statement cites the exact words of a stored source (conversation, voice note, document, image, web page — saved as captured, with its origin).
