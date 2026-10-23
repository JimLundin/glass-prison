Message is one turn in a conversation: the reader's turns in a bubble, the agent's as plain text, and system lines (timestamps, "Chat started") as a centred footnote.

**Consumer provides** `from` (`'user'`, `'agent'` default, `'system'`) and the content as children (an agent turn may hold several `<p>`).

- `user`: `fill-control` bubble, right-aligned, max 82% wide, `radius-lg`.
- `agent`: no bubble, full width, `body` on `canvas` — the agent's words read like a document, not a chat balloon.
- Do: follow an agent turn with `AgentSteps`, `ItemCard` or `MapPreview` when the turn did or made something.
- Don't: name or avatar the agent per turn.
