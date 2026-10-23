AgentRequest asks the reader to approve something the agent wants to do. It is a focus card: passed as the `Cluster`'s `sheet`, it takes the whole cluster, anchored to the bottom, so the decision is the one thing in front of you. Give it a `dismiss` ({ icon: "xmark", label: "Later" }): a circle at the end of the answer row, where the bar's Back sits, that leaves it pending. Swipe down and Esc do the same.

**Consumer provides** `icon` + `tint` (the module or capability: calendar `orange`, web `blue`, tasks `green`, wiki `teal`), `title` as a question ("Add an event to Calendar?"), `description` (who wants what), `detail` (exactly what will happen — the event, the page, the sites), optional `remember` (label for an "always allow" switch), `actions` (Deny first, the approving action last and `filled`), and with a keyboard, `kbd` on the action it triggers (`{label:'Allow Once', variant:'filled', kbd:'⏎'}`) and on the dismiss (`kbd:'esc'`) — each key is shown inside its own button. `hints` (a separate row of keys) is legacy.

- Do: state the concrete effect, not the tool. Do: say what it will *not* do when that reassures ("It won't book anything").
- Do: keep the conversation's `AgentSteps` row in `waiting` while the request is open.
- Don't: show more than one request at a time; queue them.
- Settings in You → Agent permissions decide which actions ask at all.

`detail` may also be a list of lines: the first is set as `headline`, the second `subheadline`, the rest `footnote`.
