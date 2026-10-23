Composer is the message field: one 56px glass capsule — + on the leading side, the text, and mic / send / stop on the trailing side. It only grows taller when the text runs past one line (to 160px, then scrolls).

**Consumer provides** `onSend(text)` (Enter sends, Shift+Enter breaks a line), optionally `value` + `onChange`, `placeholder`, `onAttach` (the + button), `onDictate`, and extra `tools` (small `gray` Buttons or `fill` IconButtons).

When empty the trailing button is a quiet microphone; as soon as there is text it becomes the `accent` send circle. Input text is `body`; placeholder `label-secondary`.

- Do: float it `space-4` above the home indicator with content scrolling beneath.
- Do: put attachments and modes (Research, Photos) in the + menu; `tools` exists but should stay empty in most screens.
- Don't: give it a solid background or a visible outline at rest — the rim is the edge; focus shows the `focus-ring`.

**While the agent works** pass `working` and a short `status` ("Working · step 3 of 4"): the send button becomes an `accent` Stop square (`onStop`) and the status shows as the empty field's placeholder, in `accent-text`. The reader can still type a follow-up; it queues.
