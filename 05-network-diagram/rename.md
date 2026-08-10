# A Relational Structure of Dream Theory

# Project Ideas

## Concept

An interactive diagram that visualizes how dream theory was founded, contested, and carried into art, therapy, and science, from temple incubation to activation-synthesis.

## Object Direction

The network functions as a historical reading interface where relationships are as important as individual entries. Rather than presenting dream theory as a linear timeline or collection of biographies, the object allows visitors to discover paths through changing ideas, influences, disciplines, and disagreements.

## Spatial Experience

A large network occupies the main stage as a spatial field rather than a fixed diagram. Nodes represent people, theories, disciplines, and historical positions, while connections reveal different types of relationships between them.

A header provides the title, category legend, connection legend, and interaction hint. A contextual card provides additional information when a node is selected.

## Interaction

Visitors can drag nodes, pan the canvas, zoom or pinch, focus on individual entries, and hover to reveal descriptions. Double-clicking resets the diagram.

The interaction allows visitors to move between individual historical entries and the larger structure that connects them.

# Digital Objects

## Digital Object

The digital object is a relational map of people, theories, disciplines, and historical positions.

Different connection types describe relationships such as developed/applied/influenced, precedes, interprets, and contested. These relationships form the primary material of the visualization.

## Historical Structure

The network traces changing approaches to dreaming across different periods and disciplines. Rather than treating the history as a single progression, it exposes overlaps, continuities, conflicts, and transfers between religious practice, philosophy, psychology, art, therapy, and science.

## Data and Content

The primary content consists of nodes representing historical figures, theories, disciplines, and positions, together with edges describing their relationships.

Nodes and edges are kept as separate CSV datasets so that the historical structure remains data-driven and can be revised independently of the visual system.

Descriptions provide contextual information for individual nodes without requiring the visitor to leave the network.

## Technical Character

D3.js supplies the force-directed layout, SVG rendering, legends, node and edge interaction, focus states, and contextual card.

The force system determines the spatial arrangement of the network, making relationships computationally visible rather than treating the diagram as a static illustration.

# Aesthetic

## Visual Language

The visual language is intentionally analytical and restrained so that the network structure, labels, and relationships remain primary.

The object should feel closer to a research diagram or historical map than to a conventional infographic, while retaining enough visual softness to remain connected to the Dream Archive.

### Color Palette

A light analytical field provides the foundation for the network. Node colors distinguish categories, while line styles distinguish types of relationships.

The restrained palette keeps the structure legible and prevents color from becoming more important than the relationships it represents.

### Typography

The diagram uses compact editorial and interface typography. Category labels, connection labels, node names, and the contextual card create a layered reading hierarchy.

Typography should remain small and information-oriented without making the network feel like a dense academic chart.

## Layout

The network occupies the main visual field as a large force-directed SVG.

The header contains the title, category legend, connection legend, and interaction hint. A contextual card appears near the selected or hovered node to provide additional information without permanently occupying the network space.

## Motion

Nodes and links are positioned through a force-based spatial system. Motion should emerge primarily from the network itself and from visitor manipulation.

Focused states, node movement, and transitions provide feedback without introducing ornamental animation.

## Atmosphere

The object should feel exploratory, investigative, and slightly open-ended. Visitors should feel that they are discovering a history rather than being presented with a fixed interpretation of it.

The network should encourage lingering, tracing connections, and noticing unexpected relationships.

## Website Components

### HTML

The HTML establishes the network as a self-contained historical visualization with a clear title, introductory context, legends, interaction guidance, network surface, and contextual information area.

The structure should make the purpose of the network understandable without requiring extensive explanation before interaction begins.

### CSS

The HTML establishes the network as a self-contained historical visualization with a clear title, introductory context, legends, interaction guidance, network surface, and contextual information area.

The structure should make the purpose of the network understandable without requiring extensive explanation before interaction begins.

### JavaScript

The CSS establishes the light analytical field, typography, legends, node and connection styling, contextual card, and responsive behavior.

The interface should prioritize the network itself and avoid unnecessary controls or decorative elements.

# Design Principles

## Relationships Over Lists

The network should communicate history through relationships rather than presenting people and theories as isolated entries. The connections are as important as the nodes themselves.

## Nonlinear History

Avoid forcing dream theory into a single linear progression. The structure should allow visitors to discover multiple paths through influence, conflict, interpretation, application, and historical sequence.

## Data as Structure

Treat the historical dataset as the foundation of the visual system. The network should emerge from the relationships encoded in the data rather than being manually arranged as a decorative diagram.

## Direct Exploration

Let visitors discover the historical structure through dragging, zooming, hovering, and tracing connections. Interaction should reveal complexity gradually rather than presenting every detail at once.

## Context Without Interruption

Provide enough information to understand individual nodes while keeping the visitor within the network. Contextual descriptions should support exploration rather than interrupt it.

## Computational Character

The force-directed system should remain part of the meaning of the object. The movement and spatial relationships of the nodes should make the structure of dream theory perceptible rather than simply illustrating it.

## Archive Cohesion

The network should remain recognizable as part of the Dream Archive while maintaining its own analytical identity. Its restrained visual language can contrast with more atmospheric objects without breaking the larger archive experience.