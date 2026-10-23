TimeGrid is the Day and Week view: an hour column, one column per day, an all-day row for multi-day events, and events drawn as tinted blocks with a coloured edge.

**Consumer provides** `days` (`{name, num, selected, today}` — one for Day, seven for Week), `events` (`{day, start, end, title, tint, place, suggested, agent}`, times as `"HH:MM"`), optional `allDay` (`{from, to, title, tint, agent}` as day indexes), `startHour`/`endHour` (default 7–23), `hourHeight` (44 on a phone week, 56 on a phone day, 52–60 wide), `compact` (phone week: titles only), `now` (`{day, time}` draws the red now line), `onSelect(i)` for the day headers and `onEvent(e)`.

- Overlapping events share their column side by side.
- `suggested` events (proposed by the agent, not booked) are dashed and unfilled; `agent` events carry a ✦ after the title.
- It is content and scrolls; the range switcher, Today and New Event live in the bottom cluster. Tapping an event opens it as a focus card there.
