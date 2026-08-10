# Nightfall

# Project Ideas

## Concept

A world atlas of how long people sleep and when they go to bed. The object turns a global sleep-tracking dataset into a geographic field that can be explored country by country.

## Object Direction

The object can be understood as a geography of rest. Instead of presenting sleep data as a ranked table, it makes differences in sleep spatial, allowing visitors to compare countries through geography, color, and interaction.

## Spatial Experience

Nightfall appears as a dedicated white map stage within the Dreamcore popup system. The map, legend, country labels, and explanatory text form a self-contained environment for exploring the dataset.

## Interaction

Hovering or tapping a country reveals its average time in bed and typical bedtime. The visitor can move across the geographic field while the legend provides a consistent reference for interpreting the color scale.

# Digital Objects

## Digital Object

Nightfall consists of an interactive world map, a sleep-duration color scale, country-level information, and a short methodological statement describing the 48-market sleep-tracking study.

Together, these elements transform a global dataset into an exploratory geographic object rather than a static data display.

## Data and Content

The primary material is the sleep-tracking dataset. Each country is represented through its geographic position, average time in bed, and typical bedtime.

Warm amber represents less time in bed, while cool violet represents more. Countries without comparable data remain gray so that missing or unavailable information is visually explicit rather than being mistaken for a value.

The object also includes concise explanatory text that gives visitors enough context to understand what the data represents without interrupting the map experience.

## Spatial Composition

A dedicated white map stage contains the world map, gradient legend, country labels at the range endpoints, and a short interaction caption.

The map lives inside the Dreamcore popup system but maintains its own restrained editorial visual language.

## Technical Character

Mapbox GL renders the geographic layer. GeoJSON provides country geometries, while the sleep dataset supplies the values used for the choropleth-style coloring and country interaction.

The relationship between geography and data is part of the computational character of the object: the visual field changes according to the underlying sleep values rather than using geography as a purely decorative backdrop.

# Aesthetic

## Visual Language

Nightfall uses a restrained editorial language that contrasts with the more atmospheric Dreamcore environment. The white map stage creates a clear analytical surface while the color field introduces the dream-related qualities of warmth, darkness, and variation.

### Color Palette

Warm amber marks less time in bed and cool violet marks more. Unmatched countries remain gray so the absence of comparable data is visually explicit.

The color scale should remain continuous and legible, allowing visitors to understand relative differences without requiring a ranked list.

### Typography

The map uses a restrained hierarchy: a small digital-object label, a large Nightfall title, a short subtitle, map legend, country information, and concise explanatory text.

Typography should support the map rather than compete with it, keeping the geographic field as the primary visual element.

## Layout

The map occupies the main visual field, with the legend and supporting information positioned so they remain accessible without interrupting geographic exploration.

Country labels appear only where they help establish the range of the dataset, while detailed information is revealed through interaction.

## Motion

The map is primarily spatial rather than animated. Movement comes from navigation, hover and tap states, and subtle transitions when country information appears.

Motion should communicate geographic exploration without turning the data visualization into spectacle.

## Atmosphere

Nightfall should feel quiet, analytical, and contemplative. The restrained map environment creates a contrast between measurable sleep behavior and the subjective, atmospheric nature of dreaming.

The object should encourage comparison and observation rather than direct visitors toward a predetermined conclusion.

## Website Components

### HTML

The HTML establishes Nightfall as a self-contained data visualization with a clear title, subtitle, map stage, legend, country information, methodological text, and supporting interface elements.

The structure should keep the geographic visualization central while making the meaning of the data accessible.

### CSS

The CSS creates the white map stage and restrained editorial hierarchy while maintaining the relationship between Nightfall and the wider Dream Archive.

It should support the map, legend, labels, hover states, and responsive information without introducing unnecessary interface decoration.

### JavaScript

The JavaScript manages the map, country interactions, data-driven color values, hover and tap states, and the display of country-level information.

The interaction should make the relationship between geographic location and sleep data immediately understandable.

# Design Principles

## Geography as Data

Use geography as an active way of understanding the dataset rather than as a decorative background. Spatial proximity, country boundaries, and regional differences should contribute to how visitors read the information.

## Make Comparison Visible

Allow visitors to compare sleep patterns through color and location rather than requiring them to read a ranked table.

## Make Absence Visible

Missing or unmatched countries should remain visually distinct. The visualization should communicate the limits of the dataset rather than implying that every country has a comparable measurement.

## Context Without Overload

Provide enough methodological and explanatory information for visitors to understand the visualization while keeping the map itself as the primary experience.

## Direct Exploration

Let visitors discover individual values through hovering, tapping, and moving across the map. Interaction should reveal detail without requiring unnecessary controls.

## Archive Cohesion

Nightfall should remain recognizable as part of the Dream Archive while maintaining its own analytical identity. Its restrained map environment can contrast with the softer visual language of other objects without feeling disconnected from them.