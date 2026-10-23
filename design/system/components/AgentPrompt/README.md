AgentPrompt is how a question or permission request from the agent appears inside the conversation — and the marker it leaves behind while you answer it in the cluster.

**Consumer provides** `title` (the question), `kind` ("Question", "Permission"), `icon` + `tint`, `state`, `answer` (once done), `cta` (default "Answer") and `onOpen`.

- `pending`: a tappable card with an accent "Answer". Picking it should pass the matching `AgentQuestion` / `AgentRequest` to the `Cluster` as its `sheet` (focus) and set this prompt to `focused`.
- `focused`: an outline that says "Answering below" — the card has lifted out of the conversation into the cluster; the chat scrolls behind it.
- `done`: a green checkmark, the question and the answer given.

Several prompts can be pending at once; only one is ever focused.
