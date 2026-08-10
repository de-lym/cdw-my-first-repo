# Digital Canvas: 2D and 3D Spatial Studies

# Project Ideas

## Concept

A collection of computational drawing studies that treats the Dreamcore environment as a container for small experiments in flat and spatial depth.

## Object Direction

The four studies form a small library of computational spatial sketches. Each study is defined by a limited rule set, a distinct visual state, and one or two direct interactions.

Together, they explore how simple computational rules can produce different experiences of space, movement, depth, and atmosphere.

## Spatial Experience

Two 2D studies and two 3D studies appear inside dedicated popup windows within the Dream Archive. The canvases scale with their containers so the computational objects remain legible when the browser-like windows are resized.

## Interaction

Visitors can disturb the 2D particle field, rotate the 3D camera with OrbitControls, and interact with a satellite object in the atmospheric scene.

Interaction should remain direct and limited, allowing the behavior of each study to remain visible rather than being hidden behind interface controls.

# Digital Objects

## Digital Object

The four studies are:
- Study 01 — Geometric Constellation: a static arrangement of computationally generated forms.

- Study 02 — Drifting Particle Field: a slow particle system that responds to visitor interaction.

- Study 03 — Floating Geometry: a 3D scene of floating primitives viewed through an orbit camera.

- Study 04 — Atmospheric Satellite: a spatial experiment combining material, light, fog, and a satellite object.

Each study uses a different computational rule set to explore a particular quality of space.

## Spatial Composition

The studies are divided between flat and spatial environments. The 2D canvases establish a simpler graphic field, while the 3D scenes introduce depth, camera movement, lighting, and atmospheric effects.

The popup windows provide a shared container without requiring the four studies to behave or look identically.

## Motion

The first 2D study is static, allowing its geometric structure to remain the focus.

The second contains slow particles that drift and scatter when clicked. The first 3D study continuously rotates floating primitives, while the second combines animated atmospheric objects with changing light.

Motion is therefore part of the identity of each study rather than a uniform animation system applied across the collection.

## Technical Character

p5.js creates the 2D canvases. Three.js and OrbitControls create the 3D scenes.

Each canvas is initialized within its popup, resized with the container, and disposed when the popup closes. The computational behavior of each study is intentionally small enough to remain legible as a visual rule.

## Computational Mateiral

The primary materials are geometry, particles, movement, camera perspective, light, fog, and interaction.

The studies should make these materials perceptible rather than hiding them behind complex visual effects. The visitor should be able to sense the rules producing the image.

# Aesthetic

## Visual Language

The four studies share a Dreamcore foundation while allowing the 2D and 3D environments to develop different spatial characters.

### Color Palette

The 2D studies use soft cream, lavender, blue, peach, and dark violet.

The 3D studies extend this language into floating geometry, atmospheric lighting, fog, and darker spatial scenes.

The color relationship should create continuity across the four studies without forcing the same palette or lighting conditions onto every environment.

### Typography

IBM Plex Mono and Space Mono support the technical archive feeling, while Bagel Fat One remains part of the surrounding Dreamcore navigation.

Typography should remain secondary to the computational drawings, functioning mainly as orientation and interface language.

## Layout

Each study occupies its own popup window, allowing visitors to treat the four experiments as separate artifacts within a shared spatial archive.

The canvases should remain visually dominant, with minimal interface surrounding them.

## Motion

Motion should remain slow and legible. Particle drift, rotation, atmospheric movement, and light changes should reveal the computational behavior of each study rather than create visual spectacle.

## Atmosphere

The collection should feel exploratory and experimental. Each study is small enough to be encountered quickly but open enough to invite visitors to observe how the system behaves over time.

The 2D studies can feel more graphic and immediate, while the 3D studies can create a stronger sense of depth, immersion, and uncertainty.

## Website Components

### HTML

The collection should feel exploratory and experimental. Each study is small enough to be encountered quickly but open enough to invite visitors to observe how the system behaves over time.

The 2D studies can feel more graphic and immediate, while the 3D studies can create a stronger sense of depth, immersion, and uncertainty.

### CSS

The CSS establishes the popup windows, canvas containers, interface typography, labels, and responsive behavior.

The shared styling should connect the studies to the Dream Archive while allowing each computational environment to retain its own visual character.

### JavaScript

The JavaScript manages the initialization, animation, resizing, interaction, and disposal of the p5.js and Three.js studies.

Each study should have its own contained rule system rather than relying on one generalized behavior. The code should allow the computational differences between the studies to remain visible in the final experience.

# Design Principles

## Small Rule Sets

Keep each study based on a small and understandable computational rule. Complexity should emerge from the behavior of the system rather than from an accumulation of features.

## Behavior as Form

Treat motion, geometry, lighting, depth, and interaction as the visual material of the object. The computational process should be perceptible in the final image.

## Direct Manipulation

Prefer direct interaction with the computational environment over additional interface controls. Clicking, dragging, rotating, and observing should be enough to reveal how each study behaves.

## Variation Within Cohesion

Allow the four studies to differ from one another. The collection should feel like a family of experiments rather than four versions of the same visual treatment.

## Spatial Discovery

Let visitors discover depth, movement, and behavior through observation and interaction rather than through extensive explanation.

## Archive Cohesion

The studies should remain recognizable as part of the Dream Archive through their shared popup environment, typography, and Dreamcore atmosphere while maintaining their own computational identities.