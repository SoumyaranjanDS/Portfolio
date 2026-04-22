---
name: Editorial Monochrome
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dcdddd'
  on-secondary-container: '#5f6161'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Newsreader
    fontSize: 120px
    fontWeight: '300'
    lineHeight: 110px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-edge: 64px
  section-gap: 160px
---

## Brand & Style

The design system is rooted in the principles of high-end editorial Minimalism and Swiss design. It aims to evoke a sense of prestige, clarity, and intellectual rigor, positioning the creative work as the primary focal point. By utilizing extreme whitespace and a restrained color palette, the UI retreats into the background, acting as a sophisticated frame for bold, black-and-white photography. 

The aesthetic is defined by its architectural layout—favoring asymmetrical compositions that create a dynamic visual rhythm rather than a standard, predictable grid. Motion is intentional and understated, utilizing soft fades and smooth easing to reinforce a premium, curated experience.

## Colors

The palette of this design system is strictly monochromatic to ensure zero interference with the featured portfolio content. 

- **Primary (#000000):** Used for headlines, primary actions, and structural lines. It represents authority and permanence.
- **Neutral/Base (#FFFFFF):** The canvas. It must be used generously to provide "air" between elements.
- **Surface Low (#F5F5F5):** Reserved for subtle section backgrounds or large-scale containers where absolute white might cause eye strain.
- **Surface High (#E5E5E5):** Used for thin borders, dividers, and disabled states.

Functional colors (success/error) should be handled via iconography or weighted typography rather than introducing new hues, maintaining the system’s chromatic integrity.

## Typography

Typography is the primary vehicle for the brand’s voice. This design system utilizes a high-contrast pairing:

- **The Serif (Newsreader):** Used for headlines and display text. It should be typeset with tight tracking in larger sizes to create a dramatic, "ink-on-paper" editorial feel.
- **The Sans-Serif (Inter):** Used for body copy, navigation, and labels. It provides a functional, modern counterpoint to the serif, ensuring maximum readability at smaller scales.

Vertical rhythm is critical; all type must align to a baseline grid to maintain the "asymmetric but orderly" feel. Long-form text should utilize generous line heights to enhance the spacious, breathable quality of the layout.

## Layout & Spacing

This design system employs a **Fixed Grid** with a twist. While content lives within a 12-column structure, the placement of elements should be intentionally staggered. 

- **Asymmetry:** Key elements (like display headlines and hero images) should rarely be centered. Instead, they should anchor to the far left or right columns, leaving substantial negative space on the opposite side.
- **Dividers:** Use 1px #E5E5E5 lines to separate sections horizontally. These lines should often span the full width of the container, reinforcing the architectural feel.
- **Rhythm:** Utilize massive "section-gaps" (160px+) to distinguish between different projects or chapters, forcing the user to slow down and appreciate the content.

## Elevation & Depth

In this design system, depth is communicated through **structural alignment and layering**, rather than shadows. 

- **Low-Contrast Outlines:** Instead of shadows, use thin, 1px borders (#E5E5E5) to define boundaries.
- **Tonal Layering:** Depth is achieved by placing #FFFFFF elements on #F5F5F5 surfaces. 
- **Flatness:** The system rejects skeuomorphism. Elements do not "lift" off the page; they sit firmly on the grid. 
- **Z-Index Logic:** Navigation overlays and modals should use absolute #FFFFFF backgrounds with no blur or shadow, relying on a stark 1px black border or a dimming of the background content to establish hierarchy.

## Shapes

The shape language is strictly **Sharp (0px)**. Every element—including buttons, input fields, and image containers—must feature 90-degree angles. This severity reinforces the precision and professional nature of the creative portfolio, mimicking the edges of a printed magazine or a photographic frame.

## Components

### Buttons
Primary buttons are solid black rectangles with white Inter-Medium text. There is no border radius. On hover, the button should transition smoothly to a dark gray (#222222) or display a simple slide-in fill effect. Secondary buttons are text-only with a subtle 1px underline that expands from the center or slides in from the left on hover.

### Interactive Links
Navigation items and inline links utilize "Subtle Hover Underlines." The underline should be 1px thick and sit 2-3 pixels below the baseline. Use a transition duration of 300ms for the line’s appearance.

### Input Fields
Inputs are defined by a single 1px bottom border (#000000). Labels should be in the "label-sm" style (Inter, Uppercase) and sit above the line. Error states should be communicated by the line turning bold (2px) rather than changing color.

### Cards & Image Containers
Portfolio cards consist of a black-and-white image followed by a Newsreader headline. Do not use borders around images unless the image has a white background; in that case, use a 1px #E5E5E5 frame.

### Dividers
Vertical and horizontal rules are 1px thick. They are used to bracket content, often extending beyond the content width to the edge of the margins to create a "blueprint" aesthetic.