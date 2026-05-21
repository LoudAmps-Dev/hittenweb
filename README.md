# HITTEN — Official Website

Official website for HITTEN, a hard rock band from Spain. Built as my first real web project while learning frontend development.

Live: [www.officialhitten.com](https://www.officialhitten.com)

---

## What it is

Two-page static site:
- **index.html** — main band website (bio, discography, shows, merch, video)
- **epk.html** — Electronic Press Kit for promoters and media

## Tech

Vanilla HTML, CSS and JavaScript. No frameworks, no npm, no build tools.

- CSS custom properties for the design system (colors, spacing, typography)
- Flexbox and Grid for layout
- Fluid typography with `clamp()`
- Intersection Observer for scroll animations and active nav state
- Video facade pattern to avoid loading YouTube iframes on page load
- GDPR-compliant cookie consent banner (localStorage, Meta Pixel hook ready)
- Bandsintown widget for live show dates
- JSON-LD structured data for SEO
- Open Graph and Twitter Card meta tags
- `prefers-reduced-motion` support

## Structure

```
├── index.html
├── epk.html
├── style.css
├── script.js
└── assets/
    ├── albums/
    ├── docs/
    └── video/
```

## What I learned building this

This was my first frontend project. I came from a graphic design background so I understood visual hierarchy and composition, but had no programming experience.

Main things I picked up:
- How the browser parses and renders HTML/CSS/JS
- CSS positioning and stacking contexts
- How JavaScript interacts with the DOM
- Why semantic HTML matters for SEO and accessibility
- How to integrate third-party widgets and override their styles
- Git workflow and deploying to GitHub Pages

## Deployment

Hosted on GitHub Pages with a custom domain via CNAME.
