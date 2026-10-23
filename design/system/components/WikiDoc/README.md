WikiDoc renders a wiki page from structured data — a list of typed blocks — and makes every statement traceable to the original words it rests on.

**Consumer provides** `doc` (`{ blocks }`), `sources` (a map of source id → `{kind, title, when, where, speaker, excerpt}`), and handlers: `onCite(sourceId, claimId)` (a citation chip was tapped — open its `SourceCard` as the cluster's focus card; `sourceId` is `null` for a claim with no source), `onSource(id)`, `onQuestion(q)`, `onPlace()`. `activeClaim` / `activeSource` highlight the statement whose source is open. `start` renders from a block index.

Blocks: `paragraph` (a run of `claims`), `heading`, `facts` (label / value pairs, each cited), `timeline` (from Calendar), `tasks` (from Tasks), `place` (a map from Places), `questions` (open until answered; an answer is saved as a new source), `sources` (the numbered list, last).

- Citation chips number sources in order of first use. Every claim has a source; if one is deleted, the claim shows dotted with a `?` chip (*Source missing*) until the agent re-checks it.
- Embeds show where they come from (“From Calendar · 13–15 Nov”) and are live queries, not copies.
- Sources are stored copies: `conversation`, `voice` (transcribed), `document`, `image` or `web` — each with an `origin` URI and the time it was `captured`.
