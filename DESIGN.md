---
version: alpha
name: darrenjaworski.com
description: An ultra-simple, text-first personal site skinned entirely in Catppuccin Latte (light) and Frappé (dark) — no decoration beyond what the content needs.
colors:
  primary: "#4c4f69"
  neutral: "#eff1f5"
  light-bg: "#eff1f5"
  light-text: "#4c4f69"
  dark-bg: "#303446"
  dark-text: "#c6d0f5"
typography:
  h1:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.3
  body-md:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 0.225rem
spacing:
  xs: 0.225rem
  sm: 0.9rem
  md: 1.35rem
  lg: 1.5rem
  xl: 1.8rem
components:
  page-light:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    typography: "{typography.body-md}"
  page-dark:
    backgroundColor: "{colors.dark-bg}"
    textColor: "{colors.dark-text}"
    typography: "{typography.body-md}"
  link:
    textColor: "{colors.primary}"
  button-icon:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
---

## Overview

This is a small personal site: a home page and a journalism archive, nothing
else. The design goal is to disappear and let the words carry the page — no
imagery, no illustration, no shadows, no gradients, no card chrome. Every
visual choice should answer "does the content need this?" If the answer is
no, don't add it.

The only branding decision that matters is the palette: the whole site is
skinned in [Catppuccin](https://catppuccin.com/) — **Latte** for light mode,
**Frappé** for dark mode — and nothing else. A future agent working on this
site should treat "stay Catppuccin, stay minimal" as the top-level constraint
above any individual feature request.

## Colors

The site uses exactly **two semantic colors** — a background and a
foreground/text color — swapped as a pair per theme. There is no secondary,
tertiary, or accent color anywhere in the UI. Links, nav items, headings, and
body text all share the same foreground color; the only thing that
distinguishes a link is its underline, not a different hue.

- **Light / Catppuccin Latte** — background `#eff1f5` (Latte "base"), text
  `#4c4f69` (Latte "text"). This is the default theme.
- **Dark / Catppuccin Frappé** — background `#303446` (Frappé "base"), text
  `#c6d0f5` (Frappé "text").

Theme selection is three-tiered, in this priority order:

1. An explicit user choice, applied as `data-theme="light"` or
   `data-theme="dark"` on `<html>` (see `[data-theme]` selectors in
   `src/index.css`) and persisted in component state (`useTheme` hook).
2. The OS-level `prefers-color-scheme: dark` media query, when no explicit
   choice has been made.
3. Light (Latte) as the final fallback.

**If the design ever needs a third color** (an accent for a call-to-action,
a focus ring, a hover state that isn't just underline), pull it from the
same Catppuccin Latte/Frappé palettes — e.g. Latte/Frappé `mauve` or `blue`
— never from an unrelated palette, and never a literal hex not already in
Catppuccin's spec. Confirm the choice keeps WCAG AA contrast (4.5:1) against
the theme's background before shipping it.

## Typography

One font stack, no web font loading: `Arial, Helvetica, sans-serif`. This is
a deliberate performance and simplicity choice — the site never blocks on a
font download. Hierarchy comes from size and weight only, not from font
family changes:

- **h1** — 3rem, bold (700), line-height 1.2. Used once per page, for the
  page title ("home" / "journalism").
- **h2** — 1.5rem, normal weight (400), line-height 1.3. Used for section
  headers within a page (e.g. journalism section names).
- **body** — 1.125rem, normal weight, line-height 1.6 (set globally on
  `html`, inherited everywhere). This is also the nav and link size — there
  is no separate "small text" style in the current design.

## Layout

The entire site is a single centered column, `max-width: 40rem`, with
`0 auto` margins. There are **no responsive breakpoints and no media
queries** beyond the one for `prefers-color-scheme`. Responsiveness comes
for free from:

- A single-column layout that never needs to reflow.
- rem-based sizing throughout (root `font-size: 16px` in the reset), so text
  and spacing scale naturally with the user's browser zoom/font settings.
- `img { max-width: 100%; height: auto; }` in the reset, so any future
  inline image never overflows on small viewports.

Spacing follows a loose rem scale drawn from actual usage, not a rigid
grid:

| Token | Value | Used for |
|---|---|---|
| `spacing.xs` | 0.225rem | icon button padding |
| `spacing.sm` | 0.9rem | list item bottom margin |
| `spacing.md` | 1.35rem | paragraph / list bottom margin |
| `spacing.lg` | 1.5rem | h1 bottom margin, nav bottom margin, nav item gap |
| `spacing.xl` | 1.8rem | body padding, h2 top margin |

**A future agent adding a new page or section should reuse this scale**
rather than inventing new spacing values — if none of the five fit, that's
a signal to reconsider the layout rather than add a sixth token.

## Shapes

Corners are square by default everywhere. The **only** rounded element in
the entire UI is the theme-toggle icon button, and even that is barely
rounded (`0.225rem` — just enough to soften the click target, not enough to
read as "rounded"). No cards, no pills, no circular avatars. If a future
component needs a shape decision and nothing in this file covers it, default
to square corners, not rounded ones.

## Components

- **`page-light`** / **`page-dark`** — the background/text pairing for each
  theme (Catppuccin Latte and Frappé respectively). Every page uses the same
  pairing; there is no alternate "surface" color for cards, modals, or
  panels, because none of those exist in this design.
- **`link`** — every link (nav, inline body links, resume link, social
  links, article links) uses the same text color as body copy, always
  underlined. Never give a link a distinct color — the underline alone
  signals interactivity.
- **`button-icon`** — the theme-toggle button: transparent background,
  `currentColor` icon fill (inherits the theme's text color automatically),
  minimal padding, barely-rounded corners. This is also the template for any
  future icon-only button: no background, no border, inherit color.

## Do's and Don'ts

- **Do** keep the palette to exactly two semantic colors (background, text)
  sourced from Catppuccin Latte/Frappé. Don't add a third color casually —
  if you must, it still has to come from the same two Catppuccin palettes.
- **Do** drive all theming through the CSS custom properties
  (`--bg-color`, `--text-color`) and the `data-theme` attribute /
  `prefers-color-scheme` fallback already in `src/index.css`. Never hardcode
  a color directly in a component or inline style.
- **Do** keep links, nav items, and body text visually identical in color —
  underline is the only interactive signal a link gets.
- **Do** reuse the existing spacing scale (0.225 / 0.9 / 1.35 / 1.5 /
  1.8rem) for new margins and padding instead of picking arbitrary values.
- **Do** keep corners square; the icon button's subtle radius is the one
  exception, not a precedent.
- **Don't** add drop shadows, gradients, borders-as-decoration, card
  backgrounds, or any other surface treatment — this design has none, on
  purpose.
- **Don't** load a web font or add a second font family. The system sans
  stack is a permanent choice, not a placeholder.
- **Don't** add responsive breakpoints/media queries unless a real layout
  problem proves the single-column, rem-based approach insufficient — the
  simplicity of "no breakpoints needed" is itself a design value here.
- **Don't** reach for a CSS framework or component library. This site is
  plain CSS (`src/index.css`, `src/reset.css`) by design, matching the
  project's minimal-dependencies convention (see `CLAUDE.md`/`.hermes.md`).
