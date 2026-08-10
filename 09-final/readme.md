# ReadME.md

# DREAMING : An Experimental Archive of Dreams

## What this module is

The Dream Archive is a polished website composed of all 7 digital objects that has been created throughout the senester. Additionally, title design is revised with the hand-crafted bubble-letter SVGs (`/letters`), a cursor-following bubble trail effect, and folds the chat guide directly into the Dream Composer UI (`sendChatMessage`/`renderChatMessages`/`setChatBusy`) rather than treating it as a separate module.

## Visual & design direction

**What's new/finished here:**
- `/letters` — individual SVGs for custom bubble-letter glyphs (`A`, `D`, `E`, `G`, `I`, `M`, `N`, `R`, plus digits), replacing rendered web-font text for the floating bubbles with hand-crafted vector letterforms — the clearest sign this module is meant to be the "final polish" pass on the module-02 visual concept.
- `initCursorBubbles()`/`spawnCursorBubble()`/`handlePointerMove()` — a new ambient cursor-trail effect (small bubbles trailing the pointer), extending the particle language from module 03 into a whole-page ambient touch rather than something confined to canvas windows.
- Chat is now embedded directly in the Dream Composer's own UI (`renderChatMessages`, `sendChatMessage`, `setChatBusy`) instead of being a separate widget — confirms the intended final experience is "compose a dream, optionally talk it through with the guide" as one continuous flow, not two disconnected features.
