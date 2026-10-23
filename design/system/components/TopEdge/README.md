TopEdge is the passive top of a screen: a scroll-edge blur that fades content out under the status bar, and a small centred title that appears once the large title has scrolled away.

**Consumer provides** `title` and `show` (true once the large title is off-screen, or always in a conversation). Place it inside the pane, after the scroll view. It has no pointer events and nothing in it is interactive — that is the rule for the top of the screen.
