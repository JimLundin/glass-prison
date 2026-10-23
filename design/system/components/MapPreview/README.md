MapPreview shows one or more places on a small map card, with a caption and one action; with `bare` it fills its container as the full map view behind a glass dock.

**Consumer provides** `pins` (`{x, y}` in % of the map, `tint`, `label`, `active` — the active pin is larger and labelled), `height`, `title`, `subtitle`, `action` (`{label, icon, onClick}`, usually Directions), and `bare` for the full-screen view.

The map art here is a stylised stand-in drawn from the `map-*` tokens; in the product it is replaced by the platform map (MapKit or similar) styled to the same tokens. Pins use system colours with a `canvas` outline so they hold 3:1 on land, park and water in both themes.
