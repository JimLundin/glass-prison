AgentQuestion is the agent asking the reader to clarify, with choices to tap. Like `AgentRequest` it is a focus card in the `Cluster`; in the conversation it appears as an `AgentPrompt` that detaches into focus when picked.

**Consumer provides** `title` (the question), `progress` ("1 of 2" when there are several), `hint`, `options` (`{value, label, detail}`), `multiple` (pick several), `columns` (2 on Medium and up), `other` (placeholder for a free-text option, or omit), `defaultValue` (the agent's best guess, pre-selected), `actions` (Skip / Back, then Next or the action it unlocks, `filled`), and `onReplyInChat` (pass `null` to hide "Reply in Chat", which brings the composer back).

Choices use the system's one tick (see `Checkbox`) whether single or multiple.

- Do: pre-select the likeliest answer; three or four options, never more than six.
- Don't: ask what the agent could look up itself.
