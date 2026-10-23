EventRow is one calendar entry in a `ListGroup` (`glass={false}`): time, the calendar's colour dot, title, meta, and optional place and badge.

**Consumer provides** `time`, `tint` (the calendar's system colour), `title`, `meta`, `location` (a place name — renders a `PlaceChip`) with `onLocation`, `badge`, and `suggested` (a dashed dot: proposed by the agent, not yet on the calendar).

`agent` (true or a label) adds the sparkle "Added by agent" badge; `suggested` adds the "Suggestion" badge with the dashed dot.
