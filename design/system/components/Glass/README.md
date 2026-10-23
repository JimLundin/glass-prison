Glass is the material primitive: a blurred, saturated, translucent surface with a 0.5px specular rim and a soft drop shadow.

**Use it for** anything that floats above content — the bottom bar, tab bar, composer, upward menus, bottom sheets, controls over media. Content itself (messages, articles, cards in a feed) stays on the opaque `canvas` / `canvas-raised` layer.

**Consumer provides** the children and, ideally, real content scrolling beneath it — glass over a flat `canvas` looks like grey plastic.

| `variant` | Material | Text it holds |
| --- | --- | --- |
| `thin` | `glass-thin` + `blur-thin` | glyphs only |
| `regular` (default) | `glass-regular` + `blur-regular` | `label` |
| `thick` | `glass-thick` + `blur-thick` | `label`, `label-secondary`, coloured text |
| `smoke` | `glass-smoke` + `blur-regular` | `label-on-smoke` |

`shape`: `rounded` (`radius-xl`, default), `card` (`radius-lg`), `pill`, `circle`, `sheet` (top corners `radius-sheet` with `shadow-sheet`).

- Do: keep one glass layer per region; nest controls using `fill-control` inside it.
- Don't: stack glass on glass, add gradients or coloured borders, or remove the rim.
- Reduced transparency swaps every variant to `glass-fallback` automatically.
