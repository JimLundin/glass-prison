WeekStrip is a passive seven-day overview above an agenda: day, date and a dot for days with events; the selected day is inverted (`label` on `canvas`).

**Consumer provides** `days` (`{name, num, busy}`), `selected` (index) and optional `onSelect(i)`. It is content that scrolls with the page, so tapping a day to pick it is fine; the fixed controls (Today, the range) stay in the bottom cluster.
