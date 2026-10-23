Icon renders one of 23 stroke glyphs on a 24px grid (1.75px stroke, round caps) — a web stand-in for SF Symbols, which may only be used on Apple platforms.

**Consumer provides** `name`, and optionally `size` (default 22) and `strokeWidth`. Colour is `currentColor`: it follows the surrounding text colour. Decorative by default (`aria-hidden`); pass `aria-label` and `role="img"` when it stands alone.

Names: plus, arrow-up, chevron-right, chevron-left, xmark, checkmark, search, mic, bubble, folder, gear, bell, person, sparkle, square-pencil, ellipsis, calendar, checklist, book, filter, share, trash, pin.

- Do: use 2px stroke for selected states and inside icon tiles.
- Don't: mix in filled or emoji icons.
- Flag: on Apple platforms, use the matching SF Symbol instead.
