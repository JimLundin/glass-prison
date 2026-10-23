SourceCard shows the original text behind a citation: which conversation, voice note or document, when, and the excerpt with the cited words highlighted. It is the wiki's focus card — pass it as the `Cluster` sheet (`{kind: 'source', source, span, claim, actions, dismiss}`).

- One action that opens the source (Open in Chat, Open Document, Open Saved Copy for a web page); ✕ closes it and the page stays where it was.
- A source with an `origin` shows it under the quote with the date the copy was saved, so it's clear the quote is the stored version.
- `span` must be words that appear in the excerpt; they are marked, the rest of the excerpt stays as context.
