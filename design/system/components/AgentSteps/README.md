AgentSteps lists what the agent did or is doing in this turn, one 44px row per step.

**Consumer provides** `steps`: `{icon, label, status}` with `status` `done` (green checkmark), `running` (spinner), `failed`. (`waiting` still renders but isn't used: something the agent needs from you is shown once, as an `AgentPrompt`, not as a step.)

- Labels are past tense when done ("Read calendar"), present when running ("Writing …").
- Every status carries a word or glyph, never colour alone; the spinner stops under reduced motion.
- Do: collapse to the last three steps plus "Show all" past six.
- Don't: show internal tool names — say what was touched (calendar, wiki, web).
