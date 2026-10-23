TaskRow is one task in a `ListGroup` (`glass={false}`): the system tick, the title, a meta line and optional badges.

**Consumer provides** `title`, `meta` ("Project · due"), `done` + `onToggle` (or `defaultDone`), and `badge` (e.g. a `Badge` "From chat" with `sparkle` for tasks the agent created).

Done tasks grey out and strike through; keep them in place until the list is next opened.

`agent` (true or a label) adds the sparkle "From chat" badge for tasks the agent created.
