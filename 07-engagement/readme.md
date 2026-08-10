# Build Your Dream

# Project Ideas

## Concept

A participatory digital object where visitors can document a dream, assemble one from fragments, and encounter a shared archive of anonymous contributions.

## Object Direction

The object treats participation as another form of computational material: private recollection becomes text, text becomes fragments, and fragments become part of a collective visual archive.

Rather than presenting dreaming as something to be interpreted from the outside, the project gives visitors different ways to record, reconstruct, and reshape their own dream material.

## Spatial Experience

The standalone composer is organized around three modes: Make a Dream Note, Assemble a Dream Piece, and Talk It Through. A Dream Wall extends beneath the input experience, allowing visitors to encounter saved contributions as part of the larger archive.

## Interaction

Visitors can write a dream with an optional title and mood, select or drag fragments into a new composition, save the result, and browse the shared Dream Wall.

The three modes offer different levels of participation: recording a memory, manipulating dream fragments, and developing a recollection through conversation.

# Digital Objects

## Digital Object

The project contains a dream note form, mood patches, a fragment pool, a composition area, a Dream Wall, recorded-dream overlays, and a privacy statement.

These components work together as one participatory object rather than as separate tools.

## Dream Note

The dream note mode provides a simple space for recording a remembered dream. Visitors can add an optional title and mood while keeping the writing itself at the center of the experience.

## Dream Piece

The dream piece mode turns dream language into reusable fragments. Visitors can select, move, and assemble fragments into a new composition, allowing existing dream material to be encountered in a different form.

## Talk It Through

The conversational mode connects Build Your Dream to the Dream Guide. Visitors can use a guided conversation to develop a dream recollection before optionally saving it as part of the archive.

## Dream Wall

The conversational mode connects Build Your Dream to the Dream Guide. Visitors can use a guided conversation to develop a dream recollection before optionally saving it as part of the archive.

## Technical Character

The composer is a standalone HTML/CSS/JavaScript experience loaded into the main archive through an iframe. Its styling and Firebase wiring remain isolated from the host page.

The computational structure supports writing, fragment manipulation, saving, and retrieving anonymous contributions while maintaining the composer as an independent environment.

## Data and Content

The primary material is visitor-generated dream language. Titles, moods, fragments, compositions, and saved contributions become the content of the object.

Privacy is part of the content structure as well as the interface: contributions should remain anonymous, and the experience should avoid requiring identifying information.

# Aesthetic

## Visual Language

Build Your Dream retains a warmer and more tactile visual character than the main Dreamcore shell. Its visual language should make the act of writing and assembling feel intimate, playful, and material.

### Color Palette

Soft cream, pale yellow, cloud-like whites, muted pastel patches, and dark text create a warmer environment than the main Dreamcore shell.

The palette should support the feeling of paper, memory, fragments, and soft dream imagery without becoming overly decorative.

### Typography

The composer combines playful display typography with readable serif and monospace/interface type.

Labels and controls remain compact and functional, while the title has a more liquid and expressive character. The contrast between expressive display type and restrained interface type reflects the relationship between imagination and structure.

## Layout

The composer combines playful display typography with readable serif and monospace/interface type.

Labels and controls remain compact and functional, while the title has a more liquid and expressive character. The contrast between expressive display type and restrained interface type reflects the relationship between imagination and structure.

## Motion

Word fragments can be selected, dragged, and assembled into a composition. Small reveal windows, transitions, and changes in state turn submitted material into an unfolding archive experience.

Motion should remain tactile and responsive rather than fast or highly animated.

## Atmosphere

The object should feel exploratory, intimate, and playful rather than instructional. Its atmosphere comes from the relationship between writing, fragments, soft visual materials, and the presence of other anonymous dreamers.

## Website Components

### HTML

The HTML establishes the composer as a self-contained participatory environment with its three modes, writing controls, fragment composition area, Dream Wall, status feedback, and privacy information.

Each mode should be clearly identifiable while remaining part of the same overall experience.

### CSS

The CSS creates the warmer visual identity of Build Your Dream while maintaining a relationship with the wider Dream Archive.

It should support the different spatial states of writing, fragment manipulation, conversation, and the Dream Wall without making the composer feel like a conventional productivity application.

### JavaScript

The JavaScript manages the three modes, dream input, fragment selection and manipulation, conversation states, saving, and interaction with Firebase-backed contributions.

The behavior of the interface should make the computational logic tangible: text becomes fragments, fragments can be rearranged, compositions can be saved, and individual contributions become part of a shared archive.

## Design Principles

### Participation

Treat words as materials that can exist in different forms: a remembered sentence can become a fragment, fragments can become a composition, and a composition can become part of the archive.

### Materiality

Keep contributions anonymous and avoid unnecessary requests for identifying information. The sense of safety and distance created by anonymity is important to the experience of sharing dreams.

### Privacy

Prefer writing, selecting, dragging, assembling, and browsing over unnecessary interface controls. The visitor should understand the object through doing rather than through extensive instructions.

### Direct Manipulation

Build Your Dream should remain recognizable as part of the Dream Archive while maintaining its warmer and more tactile identity. Its relationship to the Dream Wall and Dream Guide should make it feel like a connected part of the larger system.

### Archive Cohesion

Allow visitors to move between making, assembling, talking, and browsing without forcing a single sequence. The object should encourage visitors to discover different ways of engaging with dream material.

### Discovery

The JavaScript manages the three modes, dream input, fragment selection and manipulation, conversation states, saving, and interaction with Firebase-backed contributions.
The behavior of the interface should make the computational logic tangible: text becomes fragments, fragments can be rearranged, compositions can be saved, and individual contributions become part of a shared archive.

