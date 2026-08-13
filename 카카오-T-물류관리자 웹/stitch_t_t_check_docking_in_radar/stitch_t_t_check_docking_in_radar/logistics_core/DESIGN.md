---
name: Logistics Core
colors:
  surface: '#f9f9fa'
  surface-dim: '#dadadb'
  surface-bright: '#f9f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeef'
  surface-container-high: '#e8e8e9'
  surface-container-highest: '#e2e2e3'
  on-surface: '#1a1c1d'
  on-surface-variant: '#4b4732'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#7c775f'
  outline-variant: '#cdc7aa'
  surface-tint: '#6a5f00'
  primary: '#6a5f00'
  on-primary: '#ffffff'
  primary-container: '#fee500'
  on-primary-container: '#716600'
  inverse-primary: '#dec800'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#006d3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#84fbab'
  on-tertiary-container: '#00743e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fde400'
  primary-fixed-dim: '#dec800'
  on-primary-fixed: '#201c00'
  on-primary-fixed-variant: '#504700'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#84faab'
  tertiary-fixed-dim: '#67dd91'
  on-tertiary-fixed: '#00210d'
  on-tertiary-fixed-variant: '#00522a'
  background: '#f9f9fa'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e3'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar-width: 240px
  touch-target-min: 52px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for a premium freight and logistics ecosystem, balancing high-utility professional tools with the approachable DNA of a leading mobility provider. The visual language centers on **Corporate Modernism**, prioritizing clarity, trust, and rhythmic efficiency.

The target audience includes logistics managers, heavy-vehicle drivers, and corporate shippers who require instant data recognition in high-pressure environments. The emotional response should be one of "effortless reliability"—the UI feels systematic and robust, yet never heavy or cluttered. 

Key stylistic pillars:
- **Functional Density:** Information is packed for efficiency but spaced for legibility.
- **Systematic Trust:** Heavy use of high-contrast typography and intentional borders.
- **Mobility First:** Design cues taken from navigation systems—clear wayfinding and prominent action states.

## Colors

The palette is anchored in high-contrast neutrality to ensure readability across different lighting conditions (e.g., driver cabins at night vs. bright office environments).

- **Primary (#FEE500):** Reserved strictly for high-impact moments. Use for the main "Dispatch" button, active navigation states, and critical highlights.
- **Background (#F7F7F8):** A cool-toned neutral that reduces screen glare.
- **Surface (#FFFFFF):** Used for cards and containers to create a "layered" information architecture.
- **Typography:** Primary text is a deep ink (#191919) for maximum contrast, while secondary text (#666666) handles metadata and labels.

## Typography

This design system utilizes **Hanken Grotesk** as a high-performance alternative to Pretendard, offering exceptional legibility in both Korean and English contexts. 

- **Weight Strategy:** Use Bold (700) for headlines and core navigation points. Use Medium (500) for labels to maintain presence without visual noise.
- **Scaling:** On mobile devices, headline sizes drop by one tier to maximize vertical space.
- **Numbers:** Since logistics involves heavy data, ensure all tabular numbers use the default proportional lining of the font for vertical alignment in lists.

## Layout & Spacing

The layout is built on a **Fluid Grid** that adapts to the specific needs of two distinct user groups:

**Desktop (Logistics Managers):**
- Uses a fixed **240px sidebar** on the left for primary navigation.
- Content area utilizes a 12-column grid with 16px gutters.
- Information density is high, using a "Dashboard" approach where multiple cards are visible at once.

**Mobile (Drivers):**
- Bottom tab-bar navigation for one-handed operation.
- Minimum touch targets are set to **52px** to accommodate use while wearing work gloves or in vibrating vehicle environments.
- Content is stacked in a single column with 20px side margins.

## Elevation & Depth

This design system utilizes **Low-Contrast Outlines** combined with subtle **Tonal Layers**. Shadows are used sparingly to prevent the UI from feeling muddy on lower-quality mobile displays.

- **Level 0 (Background):** #F7F7F8.
- **Level 1 (Cards/Surface):** #FFFFFF with a 1px solid border of #E8E8EA.
- **Level 2 (Modals/Popovers):** #FFFFFF with a soft, 12% opacity neutral shadow (0px 8px 24px) to indicate temporary overlay.
- **Interactive States:** On hover or tap, cards should not "lift" with shadows but rather intensify their border weight or change background color slightly to maintain a flat, professional aesthetic.

## Shapes

The shape language is "Approachable Geometric." 

- **Cards:** Use a consistent **16px radius** for both mobile and desktop to maintain brand continuity.
- **Buttons:** Large action buttons use the same 16px radius. Smaller chips and tags use a 4px or fully rounded pill shape.
- **Input Fields:** 8px radius to differentiate functional data-entry areas from structural containers.

## Components

### Buttons & CTAs
- **Primary:** Background #FEE500, Text #191919, Bold weight. No border.
- **Secondary:** Background #FFFFFF, Border #E8E8EA, Text #191919.
- **Danger:** Background #F04452, Text #FFFFFF.

### Cards (The "Freight Unit")
- Every shipment or task is contained in a card.
- Header: Title-md font for the shipment ID.
- Body: 1px horizontal dividers between data points (e.g., Pick-up vs. Drop-off).
- Footer: Contains the primary action (e.g., "Accept Delivery").

### T-Check Illustration
- The system includes a standardized **5-ton cargo truck illustration**.
- Style: 2.5D (Isometric) with flat color fills.
- Use: Displayed during vehicle verification and status screens.

### Inputs & Forms
- Height: 52px for mobile, 44px for desktop.
- State: Active inputs receive a 2px border in #191919; errors use #F04452.

### Chips & Status Tags
- **Success:** Soft green background with #25A55F text.
- **Pending:** #FEE500 background with #191919 text.
- **Urgent:** Soft red background with #F04452 text.