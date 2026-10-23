AgentStatus is the one-line state of the agent: a dot and a short phrase.

**Consumer provides** `tone` (`working` pulsing accent, `waiting` orange — a permission, `question` accent — an answer, `done` green) and the text.

Used at the end of a conversation's content and inside the `Composer` while the agent works (`working` prop). It is a live region (`role="status"`), so screen readers hear changes.
