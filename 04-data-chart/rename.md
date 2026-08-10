# Dreaming Trajectory

# Project Ideas

## Concept

A data visualization that turns recorded sleep sessions into individual trajectories through sleep depth. The object treats sleep data as something that can be visually wandered through rather than only summarized statistically.

## Object Direction

The visualization can be understood as a digital object about rhythm. A visitor follows one person’s sleep as a path through time and depth, with moments of remembered dreaming appearing along the trajectory.

Rather than presenting sleep as a set of averages, the object makes the structure of an individual night visible.

## Spatial Experience

The visualization appears inside a dedicated popup containing a short explanatory paragraph, stage legend, SVG visualization, status bar, and tooltip.

Time runs horizontally from sleep onset, while sleep stage forms the vertical structure. Multiple sessions create a layered field from which individual trajectories can be selected.

## Interaction

Hovering over a sleep trajectory brings one session out of the surrounding visual field and exposes information about that session. Recalled-dream moments are marked along the trajectory and become part of the visitor’s reading of the night.

# Digital Objects

## Digital Object

The central object is a layered sleep-stage chart. Each line represents a recorded sleep session, while highlighted points indicate moments associated with dream recall.

The visualization allows individual sessions to remain connected to the larger dataset without reducing the experience to statistical comparison.

## Data and Content

The primary material is a collection of recorded sleep sessions organized as time and sleep-stage points.

Each session describes movement through Wake, REM, N1, N2, and N3 stages. Recalled-dream moments are associated with specific positions along the trajectory.

The data should remain legible as individual experiences while also revealing patterns across multiple sessions.

## Spatial Composition

The chart uses a horizontal time axis and a vertical sleep-stage structure. Multiple trajectories occupy the same visual field, creating a layered representation of sleep.

A stage legend establishes the depth system, while the status bar and tooltip provide additional information without competing with the trajectories.

## Technical Character

D3.js constructs the SVG scales, stage grid, axes, gradients, trajectories, recalled-dream markers, interaction areas, and tooltip behavior.

The visualization is data-driven: trajectories are generated from session data rather than manually drawn, allowing the visual structure to reflect the underlying sleep records.
# Aesthetic

## Visual Language

The visual language is restrained and data-oriented, but the trajectory form gives the visualization a more organic quality than a conventional statistical chart.

The chart should feel like a field of individual nights rather than a technical dashboard.

### Color Palette

Sleep stages are separated through a restrained cool-to-warm depth palette. Wake, REM, N1, N2, and N3 remain distinguishable while the selected trajectory becomes visually prominent.

The palette should support the hierarchy of sleep depth without turning the visualization into a purely decorative gradient.

### Typography

Monospace interface text keeps the visualization connected to the surrounding digital archive. Labels remain compact so the chart itself remains the dominant object.

## Layout

The visualization occupies the primary area of the popup. The explanatory paragraph and legend provide context without taking attention away from the trajectories.

The interface should leave enough negative space for individual paths to remain distinguishable, particularly when many sleep sessions overlap.

## Motion

The chart is intentionally calm. There is no need for continuous animation; movement comes from hovering, focusing, and transitioning between individual trajectories.

When a trajectory becomes active, the change should feel like a shift in attention rather than a dramatic visual effect.

## Atmosphere

The object should feel quiet, observational, and slightly contemplative. The visitor is looking through the rhythm of another person’s night rather than simply reading a dataset.

The combination of measured sleep stages and recalled-dream moments should preserve a subtle tension between scientific recording and subjective experience.

## Website Components

### HTML

The HTML establishes the visualization as a self-contained digital object with a title, explanatory context, stage legend, chart surface, status information, and tooltip.

The structure should make the purpose of the visualization clear while keeping the sleep trajectories central.

### CSS

The CSS establishes the restrained chart environment, typography, stage colors, selected states, tooltip, and popup layout.

It should prioritize visual hierarchy and readability rather than introducing unnecessary interface decoration.

### JavaScript

The JavaScript manages the D3 visualization, sleep-session data, trajectory rendering, hover and focus states, recalled-dream markers, tooltip behavior, and responsive interaction.

The behavior should make the structure of sleep perceptible: individual sessions should remain recognizable, changes in sleep depth should be readable, and dream-recall moments should feel connected to the trajectory rather than added as separate annotations.

# Design Principles

## Rhythm Over Summary

Present sleep as a changing trajectory through time rather than reducing it to averages or a single summary value.

## Individaul Within the Collective

Allow visitors to see individual sleep sessions while maintaining their relationship to the larger dataset. The object should move between the experience of one night and the patterns formed by many nights.

## Dream Recall as a Moment

Treat recalled-dream moments as points within the sleep trajectory rather than as separate content. Their meaning comes partly from where they occur within the structure of the night.

## Calm Interaction

Use interaction to focus attention rather than to create spectacle. Hovering, selecting, and revealing information should feel like looking more closely at a night.

## Data as Experience

Let the visual form emerge from the structure of the sleep data. The trajectory should not simply illustrate the dataset; it should become the way the visitor encounters it.

## Archive Cohesion

Dreaming Trajectory should remain recognizable as part of the Dream Archive while maintaining its own analytical and temporal identity. Its quiet, layered chart can contrast with the geographic field of Nightfall and the relational network of Dream Theory.

## Preserve Ucertainty

The visualization records sleep stages and moments of dream recall without claiming to fully explain the subjective experience of dreaming. The gap between measurement and memory should remain part of the object.
