Smoked Glass is a modern-Apple interface language built from two layers: an opaque, warm-neutral **content layer**, and a **glass layer** of floating controls that blur and tint whatever scrolls beneath them. The light theme, *Frost*, reads as milky frosted glass; the dark theme, *Smoke*, reads as smoked glass. Accents are Apple's system colours, used sparingly.

## Principles

- **Interaction lives in the bottom half.** Every fixed control — navigation, back, close, search, actions, the composer — docks at the bottom of the screen, below `reach-line`. The top half holds only passive things: the screen title, status text and content that scrolls. This holds on every size, from phone to desktop.
- **Content first, chrome floats.** Text, messages and media live on `canvas` / `canvas-raised`. Navigation and controls (tab bar, toolbars, composer, buttons over content) live on glass and float above it, inset from the screen edge by `space-4`.
- **Glass never stacks on glass.** One glass layer at a time. A control inside a glass panel uses `fill-control` or `glass-highlight`, never another blurred material.
- **Capsules and circles.** Every control is a capsule (`radius-pill`) or a circle. Containers use large continuous radii (`radius-lg`, `radius-xl`, `radius-sheet`).
- **Concentric corners.** A nested shape's radius = its parent's radius minus the padding between them (a `radius-xl` composer with `space-2` padding holds `radius-pill` buttons; a `radius-lg` list holds `radius-xs` icon tiles at `space-3`).
- **Quiet colour.** Neutrals carry 90% of the UI. One accent per screen — `accent` for the single primary action, `accent-text` for links. System colours appear as icon tiles, status and illustration, not as large backgrounds.

## Content and voice

- Plain, direct and short. Say what happens: "Delete Chat", not "Are you sure you want to proceed?".
- **Title Case** for button labels, bottom-bar titles and tab labels ("New Chat", "Add Photos"). **Sentence case** for everything else: list subtitles, footers, alerts, body copy.
- Address the reader as "you"; the app does not say "I" or "we" in chrome.
- No emoji in UI chrome. Use the ellipsis character "…" for actions that open a further step ("Share…", "Reply…").
- Numbers as numerals; times as "4:05 PM" or "Yesterday".

## Materials (the glass)

| Material | Token | Blur | Use |
| --- | --- | --- | --- |
| Thin | `glass-thin` | `blur-thin` | Icon-only circular buttons and chips floating over content. No body text. |
| Regular | `glass-regular` | `blur-regular` | Tab bar, bottom bar, composer, menus. `label` text at any size. |
| Thick | `glass-thick` | `blur-thick` | Sheets, popovers, grouped lists — anything with `label-secondary` or coloured text. |
| Smoke | `glass-smoke` | `blur-regular` | Controls over photos or video, in both themes. Text and glyphs in `label-on-smoke`. |

Build every glass surface the same way:

```css
background: var(--glass-regular);
-webkit-backdrop-filter: blur(var(--blur-regular)) saturate(var(--saturate-glass));
backdrop-filter: blur(var(--blur-regular)) saturate(var(--saturate-glass));
border: 0.5px solid var(--glass-stroke);
box-shadow: var(--shadow-glass);
```

- The `saturate-glass` boost is not optional — without it colour beneath the glass turns grey and the material reads as plastic.
- The 0.5px `glass-stroke` rim plus the inset top highlight inside `shadow-glass` is the specular edge. Do not replace it with a heavier border.
- Under `prefers-reduced-transparency: reduce`, swap every material for `glass-fallback` and drop the backdrop filter (the bundle's `.sg-glass` does this).
- Glass needs something behind it. On an empty `canvas`, prefer `canvas-raised` cards over glass.

## Colour

- Grounds: `canvas` (screen), `canvas-raised` (opaque cards, message bubbles), `canvas-sunken` (code, wells).
- Text: `label` for primary, `label-secondary` for subtitles and placeholders, `label-tertiary` only for disabled or decorative marks (it is below 4.5:1).
- Coloured text (`accent-text`, `success-text`, `warning-text`, `danger-text`) goes on `canvas`, `canvas-raised` or `glass-thick` only — not on thin or regular glass.
- Filled primary actions use `accent` with `label-on-smoke` (white) text. The raw `system-blue` is for tints and icons; white text on it is under 4.5:1.
- `system-orange`, `system-yellow`, `system-green` and `system-mint` take dark glyphs (`label` light-theme value) if anything sits on them.
- Status is never colour alone: pair `success-text` / `danger-text` with a checkmark, an icon or a word.
- Keyboard focus: a 2px solid `focus-ring` outline, offset 2px, on every interactive element. It clears 3:1 on every ground in both themes.
- No gradients in chrome, and never a blue-to-purple wash. Colour behind the glass comes from real content.

## Typography

- System San Francisco via the `sans` (text) and `display` stacks; `display` for `large-title` through `title-3`, `sans` for `headline` and below. SF Pro is Apple's and is not shipped as a file — on non-Apple platforms the stacks fall back to Helvetica Neue / the platform UI face.
- Use the iOS Dynamic Type sizes as given: `body` (17/22) is the default reading size, composer input included; `subheadline` for row subtitles; `footnote` for group footers; `caption-1` for tab labels.
- Tracking is part of each style (SF tightens as it grows). Keep it.
- Weight carries hierarchy, not size jumps: `headline` is `body` at 600.
- `rounded` is for numerals in badges and counters only. `mono` / `code` on `canvas-sunken` for code.

## Spacing and layout

- 4px base: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 20 · `space-6` 24 · `space-8` 32 · `space-10` 40.
- Side margin `space-4` on Compact, `space-5` on Medium and up. Floating glass sits `space-4` from the pane edges and the home indicator.
- Minimum hit target 44 × 44px, even when the visible capsule is smaller.
- Every scroll view pads its bottom by `dock-clearance` so the last item can rise clear of the dock.

## The reach zone

The screen splits at `reach-line` (half its height).

| Zone | What may live there |
| --- | --- |
| Top half | The passive header (`large-title` plus an optional `footnote` eyebrow), status text, scrolling content. No buttons, no search field, no tabs, no menus. |
| Bottom half | The dock: `TabBar`, `BottomBar`, `Composer`, floating `Button`s; sheets and menus that open from it. |

- **Back, close and more** are circles at the leading and trailing ends of the `BottomBar` — never top corners.
- **Search** is the `TabBar`'s detached action circle; tapping it turns the dock into a bottom search field.
- **Sheets** rise from the bottom and keep their actions at their own bottom edge; a sheet's close is a bottom circle or a swipe down, never a top-corner ✕.
- **Menus and popovers** open upward from their trigger.
- **The keyboard** pushes the dock up; the composer always rides directly on the keyboard.
- **Scrolling content stays tappable** wherever it scrolls — the rule is about fixed chrome, not rows and links the reader moves into place themselves.
- **The top is not dead space**: it is where reading happens. Let the passive header scroll away with the content.

## Screen sizes

Size classes are read from the width of the screen — or of the pane — not the device, so a window on desktop behaves like the device of that width. Use the `Screen` component; it applies all of this through container queries.

| Class | Width | Typical devices | Layout |
| --- | --- | --- | --- |
| Compact | < `bp-medium` (600) | Phones in portrait; iPhone Duo folded (cover screen ≈ 466 × 678 pt) | One pane. Dock spans the width minus `space-4` margins. |
| Medium | 600–839 | iPhone Duo open and turned upright (626 × 890 pt), small tablets in portrait, large phones in landscape | One pane; content capped at `content-max` and the dock at `dock-max`, both centred. |
| Expanded | 840–1199 | iPhone Duo open (≈ 890 × 626 pt, split at the hinge with `Screen` `hinge`), tablets, narrow desktop windows | Aside pane (`aside-width`, the module's list) beside the main pane (the open item). Two bars: the modules laid flat under the left half, the open item's bar under the right (see *Across sizes*). |
| Large | ≥ `bp-large` (1200) | Desktop | As Expanded; aside 380px, main content capped at `content-max` and centred. |

**Short height** (below `bp-short`, i.e. phones in landscape; optional): the header drops to `title-3`, the `TabBar` drops its labels and shrinks to 44px, and the dock tightens to `space-2` from the bottom edge. The reach rule still applies.

- Never move navigation to a top bar or a full-height side rail at larger sizes — the aside pane holds the list, and its own bar (navigation) docks at its bottom.
- On desktop, the bottom dock also serves pointer users well (one predictable place); back it with keyboard shortcuts (⌘K for search, ⌘N for new, Esc for back).
- Folds and hinges: iPhone Duo opens to a passport-shaped 7.6" screen (2670 × 1878 px, about 890 × 626 pt at an assumed @3x). Treat it as Expanded and split the panes exactly at the hinge (`Screen` `hinge`): list on the left half, detail on the right, with the modules laid flat under the left half and the open item's bar, circles in the right corner, under the right. Folded, its 5.4" cover screen (about 466 × 678 pt) is Compact — wider and shorter than a phone, so docks have more room across and less up.

## The bottom cluster

Everything you can press that isn't content lives in one cluster at the bottom, built with `Cluster`. Pages never lay it out. They make **requests**, and each kind of request always lands in the same place.

**One shape for everything in the cluster.** Every piece is a 56px-tall glass capsule or circle, and everything you can pick inside one is a 48px item with the same selection look (a `fill-control` lozenge behind a `label` glyph — no accent; unselected items are `label-secondary`). Prefer stretching this shape over inventing a new one.

**Nothing moves under your thumb.** The bar changes shape only as the direct result of your own tap (a bloom, a focus card you picked, Back) or while you type. Nothing the app or the agent does on its own — a new request, a finished task, scrolling — reshapes it.

### What a page may request

| Request | Lands in |
| --- | --- |
| **Field** — `compose`, `query` or `capture` (Chat's composer, Search, "Add a task…", Find in page) | the centre |
| **Switcher** (Calendar's Day · Week · Month, drawn like the tabs) | the centre |
| **Back** | the leading circle |
| **Primary** (New Event) — alone | the trailing circle (no accent — it looks like every other circle) |
| **Actions** (Share, Rename, Delete — and the Primary, if both) | the trailing "…" circle, which blooms into them |
| **Focus card** (the agent's permission or question, a place, a short form) | the whole cluster |

Nothing else can be requested — no titles, labels or banners. Titles go to the top as a passive `TopEdge`.

### One structure, three states

**Right-handed.** *Leading* and *trailing* are relative to the thumb, not to reading order: the leading circle — the module, or Back — sits at the **right** end on touch screens. There is no left-handed setting.

1. **Row** — on a phone, `[trailing circle] [centre] [leading circle]`: the leading circle at the right edge is Back one level in, otherwise the current module; the trailing circle at the left edge is the Primary, or "…", or nothing; the centre between them is the page's field or switcher, or empty. While typing — and only while typing, with the keyboard up as the cue — the trailing circle steps aside so the field can widen. Tapping a switcher, a button or anything else in the bar never changes its shape. (A pane's bar on the open Duo gathers its circles in the thumb's corner instead — see *Across sizes*.)
2. **Bloom** — tapping a circle blooms its menu: the screen behind dims and blurs (`scrim`), the circle turns into a close ✕, and **the bar itself stands up on end** above it — one vertical glass capsule of the same 56px items (icon over name, `fill-control` lozenge on the current one) that the flat navigation bar uses. Names can be dropped (`bloomLabels={false}`). Picking one or tapping the dimmed screen folds it back down. Blooming the **module circle is search**: the modules stand up and the centre becomes the "Search everything" field, focused — type and the results take the page. Results are one level in, so the leading circle becomes Back (Close Search); results are grouped by kind, with no scope switcher. The trailing "…" blooms into the page's actions (the Primary first, if there is one; destructive last, in red).
3. **Focus** — when the page puts a card in front of you, the whole cluster becomes that card, anchored to the bottom edge: it is the thing to look at. Its bottom row is the bar's row: the answers as 48px capsules sharing the width (Deny · Allow; Done; Ask · Directions) — the filled one is the answer you'd most likely give — and, at the end where the bar's Back sits, **the way out without answering**: a circle, ✕ (*Later* — the request stays pending in the chat) for a request or question, ‹ for a place. Swiping the card down or pressing Esc does the same. With a keyboard, each button shows its key inside it (`kbd` on an action: Allow Once ⏎), and the exit circle shows esc in place of ✕ — never as a separate row of hints. Answering or leaving shrinks it back into the row.

**Questions detach from the conversation.** The agent's questions and requests appear in the chat as `AgentPrompt` cards. Picking one lifts it out of the conversation into the focus state; an "Answering below" outline stays in its place, and the chat keeps scrolling behind. When answered, the outline becomes the answered prompt. If the agent asks something new while you are in the chat, it arrives as a pending prompt in the conversation (and in Needs you) — it takes the bar only when you pick it, never on its own.

Examples: Chat `[composer] [Chat]`; a conversation `[…] [composer] [Back]`; Calendar detail `[…] [Day·Week·Month] [Back]` — the … blooms into New Event and Today; the event collection restores the Calendar module circle. A wiki page uses `[…] · · · [Back]`; You `[You]` at the right; a place: Back + its details as a focus card.

### Bar (reference)

The iOS 26 arrangement — tab bar on the bottom row with the field or switcher above it — takes the same requests. Its bottom row alone (modules laid flat plus a search circle) is the **flat navigation bar** of wide layouts; the two-row arrangement is kept only as a reference.

**Across sizes: menus bloom only when space is short.** A menu has two forms — behind a circle that blooms it upright, or laid flat and always visible. The phone is the only place short enough on space to need the bloom.

- **Phone, iPhone Duo folded (Compact):** one bar; the modules and the actions bloom.
- **iPhone Duo open, tablets (Expanded):** two bars, and one rule for which gets what — the left bar is navigation only; everything the module asks for goes to the right bar. The list in the left half never gets controls of its own, and details that aren't a page (a place, an event) open as a focus card in the right half. The left half's bar is the modules laid flat with their names, plus a search circle that turns the bar into the search field. The right half's bar is the open item's, with its circles gathered in the right thumb's corner (`gather`): `[field] […] [Back]`, so no lone button waits by the hinge. While the list is beside it the item needs no Back; one level deeper (a page opened from a chat) it gets one.
- **Desktop (Large):** the open Duo's two bars at desktop size — the modules laid flat under the sidebar, the open item's bar under the main pane — with the actions laid flat as icons (`flat`) since a pointer has the room. ⌘K search, ⌘N the Primary, Esc closes a bloom or leaves a focus card.

## Selection: one tick

There is exactly one check mark in the system: the 22px circle that fills with `accent` and a white tick (`Checkbox`). Task completion, wiki checklists, single and multiple choices (`ChoiceList`, `AgentQuestion`) all use it. No square checkboxes, no radio dots, no trailing checkmarks for selection. The `Switch` is reserved for settings that take effect immediately.

## Agent conversation

The agent is a participant in Chat and an actor in every other module.

- **Turns.** The reader's turns are `Message from="user"` bubbles; the agent's are plain text (`from="agent"`), full width, like a document. No names or avatars per turn.
- **Work.** What the agent does in a turn shows as `AgentSteps` (done, running, failed). Something it is waiting on you for is never a step: it is shown once, as its `AgentPrompt`. What it makes or changes elsewhere shows as an `ItemCard` linking to it (a wiki page, an event, a task).
- **Working state.** The `Composer` takes `working`: the send button becomes Stop and the status ("Working · step 3 of 4") shows in the empty field. Follow-ups typed meanwhile queue.
- **The agent needs you.** A permission (`AgentRequest`) or a clarifying question (`AgentQuestion`) is a focus card: it takes the whole cluster, anchored to the bottom. In the conversation it is an `AgentPrompt`; picking a prompt detaches it into focus and leaves an "Answering below" outline. One at a time; Later puts it back.
- **Across modules.** Anything the agent created carries a `sparkle` `Badge` ("From chat", "Added by agent") until the reader edits it. Suggestions that are not committed yet (an unbooked flight) are drawn dashed (`EventRow` `suggested`). Chats waiting on the reader rise to a "Needs you" group at the top of Chat.
- **Permissions** live in You → Agent permissions, per module: Allowed or Ask.

## Calendar

The [current Calendar contract](../../docs/DESIGN.md#calendar) defines the collection, Day / Week / Month detail views, and event focus cards. It supersedes the mini-month arrangement retained in the archived boards. Use `CalendarCollectionView` for the event list and `CalendarPage` for its three detail presentations.

## Wiki: cited pages, stored as data

A wiki page is about a subject (a trip, a person, a project). **Only the agent writes it** — you steer it in chat — and **every statement cites the original words it rests on**, including anything the agent looked up itself.

**Sources are stored copies.** A source is anything the agent can quote: a conversation (typed or a transcribed voice note), an imported document, an image, or a web page. Whatever it is, it is captured into storage as it was at that moment — text plus the original file — with an `origin` URI pointing back to where it came from (`chat://…`, `mail://…`, `https://…`) and the time it was captured. The original can change or disappear; the citation can't drift. Opening a web source shows the saved copy, with its address and capture date.

**A page is data, not markdown.** It is a list of typed blocks (`WikiDoc`): paragraphs made of **claims** (one statement each, with an id), facts, and live embeds — a **timeline** from Calendar, **tasks** from Tasks, a **place** from Places, and **open questions** about the subject — ending with the numbered **sources**. Each claim stores its source ids *and the exact span* of source text it rests on, so tapping a citation opens a `SourceCard` focus card with those words highlighted in context, and when a source is removed the agent can find and re-check every claim built on it (until it does, the claim shows *Source missing*). Embeds are queries, not copies. Answering an open question saves the answer as a new source and the page cites it. Pages export to markdown (claims → sentences, citations → footnotes, embeds → snapshots).

In the bar a page asks for Back and `…` (Ask the Agent, Add Source, Find, Share, Delete); the Wiki list asks for Import Source. There is no manual editing.

## Locations

Places are not a module. They live inside the things that mention them and open over the current screen.

- A mention is a `PlaceChip` (an event's venue, a task's address, a place named in a wiki page or chat answer).
- A chat answer about places shows a `MapPreview` card with pins and one action (Directions).
- Tapping either opens the **map view**: `MapPreview bare` fills the screen, and the place's details and actions take the dock as a thick-glass card (back on its leading side). Glass over the map is where the material matters most: keep the dock to `glass-thick`.
- The map art in this system is a stylised stand-in drawn from the `map-*` tokens; the product uses the platform map, styled to them.

## Elevation and edges

- Two depths only: content (flat, no shadow) and glass (`shadow-glass`). Sheets use `shadow-sheet`; knobs and thumbs use `shadow-thumb`.
- Dividers are `separator` hairlines (0.5px), inset to align with row text, never full-bleed inside a group.

## Motion

Glass morphs; it does not fade in from nowhere. The cluster's glass stays clear: colour from the content behind shows through, saturated, as on iOS. Every change in the cluster is the same three pieces of glass changing shape — a circle blooming its options up out of itself, the field widening when the trailing circle steps aside, the whole row growing into a focus card and shrinking back.

- **Geometry** (position, width, height, corner radius) moves on a slightly springy curve: `cubic-bezier(0.34, 1.18, 0.5, 1)` over 520ms — a small overshoot, like iOS's default spring.
- **Content** inside a piece cross-fades: out in 140ms (scale to 0.86, 4px blur), in over 220ms after a 120ms delay, so labels never stretch.
- **Bloom**: the upright bar grows from its circle (scale from 40% height, same spring) while its items fade in, nearest first.
- **Selection lozenges** (tab highlight, segmented thumb) slide on `cubic-bezier(0.32, 0.72, 0, 1)` at 350ms.
- **The top edge** title fades and rises 6px as the large title scrolls away.
- **Press** feedback: buttons scale to 0.96, circles to 0.92.
- **Reduced motion:** every move becomes a 150ms cross-fade in place.

## Iconography

- Apple's SF Symbols are the reference — but they are licensed for Apple platforms only. On the web this system ships a small substitute set through `Icon` (24px grid, 1.75px stroke, round caps and joins) tuned to sit beside SF Symbols "regular". **Flag:** these are stand-ins, not SF Symbols.
- Glyphs take the colour of the text they sit with (`currentColor`): `label` in the dock, `accent-text` when tinted, `label-on-smoke` on smoke.
- Icon tiles in settings-style rows: a white glyph on a `radius-xs` square of one system colour; the row's text label always carries the meaning.
- No emoji as icons.

## Components

Agent: `Message`, `AgentSteps`, `AgentStatus`, `ItemCard`, `AgentRequest`, `AgentQuestion`. Selection: `Checkbox`, `ChoiceList`. Modules: `TaskRow`, `EventRow`, `WeekStrip`, `TimeGrid` (Day and Week views), `MonthGrid` (Month view and the wide layouts' date picker). Locations: `PlaceChip`, `MapPreview`. Wiki: `WikiDoc` (a cited page from structured data), `SourceCard` (the original text behind a citation), `WikiTimeline`. Layout: `Screen` (the responsive shell), `Cluster` (the bottom cluster: Row or Bar), `TopEdge` (passive top title), `SearchField`, `Menu`, `Glass` (the material primitive), `Button`, `IconButton`, `SegmentedControl`, `Switch`, `Composer`, `ListGroup` + `ListRow`, `Badge` and `Icon`. Legacy, not for new work: `Dock`, `BottomBar`, standalone `TabBar` — `Cluster` replaces all three — and `AgentStatus`, whose job is now done by the composer's working status and `AgentPrompt`. Build every screen from `Screen`, put a `Cluster` in its `dock`, and let modules fill the Cluster's slots; the other components render inside the content you provide and set no page backgrounds. Load `bundle.css` after the tokens, and wrap demos in `.sg-stage` (a `canvas` panel with a few solid colour discs) when you need something behind the glass to show the blur.
