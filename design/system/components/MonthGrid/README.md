MonthGrid is the Month view: six weeks of days, Monday first. On a phone each day shows up to three coloured dots; with `titles` (desktop) each day lists its events by name. Multi-day events run as a bar under (or across) their days.

**Consumer provides** `weeks` — six of `{days: [{num, muted, selected, today, span, items: [{title, tint, suggested}]}], spans: [{from, to, title, tint}]}` — plus `titles` and `onSelect(row, col, day)`.

- The selected day is inverted like the WeekStrip; today's number is red.
- Small and dotted, it doubles as the date picker in a wide layout's left half.
- On a phone, put the chosen day's agenda (`EventRow`s) under it.
