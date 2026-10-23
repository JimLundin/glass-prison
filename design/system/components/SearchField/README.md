SearchField is the single-line glass capsule for the two lightweight input kinds: `query` (search, find in page) and `capture` (quick-add a task, an event, a note).

**Consumer provides** `kind`, `placeholder`, `onSubmit(text)`, and optionally `value` + `onChange`, `onCancel` (Escape), `autoFocus`.

- `query`: magnifier glyph, a clear button once there is text; results render in the scrolling content above, updating as the reader types. Enter submits.
- `capture`: plus glyph, an `accent` add button once there is text; Enter adds the item and empties the field so the next can be typed.
- Multi-line, send-style input is the `Composer`, not this.

- Do: pass it as a `Dock`'s `input`; it is the module's one input surface.
- Do: write placeholders as the action plus what it covers — "Add a task…", "Search chats, tasks, wiki, events".
- Don't: place it in the top half, or show two fields at once.
