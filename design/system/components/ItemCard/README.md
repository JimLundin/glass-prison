ItemCard is the link to something the agent made or changed in another module — a wiki page, an event, a task — shown in the conversation.

**Consumer provides** `icon` and `tint` (the module's: wiki `teal`, calendar `orange`, tasks `green`, chat `indigo`), `title`, `subtitle` ("Module · state"), and `href` or `onClick`.

- Do: one card per object; update its subtitle as the agent works ("draft · updating" → "ready").
- Don't: use it for search results (`ListRow`) or for places (`MapPreview`).
