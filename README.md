# Lumière — Premium E-Commerce Product Page

A production-quality, single-page e-commerce product experience built for a fictional luxury skincare brand. Designed and developed as a portfolio project to demonstrate real-world frontend engineering, UI/UX design judgment, and attention to conversion-focused detail.

**Live Demo:** [View Project](https://feyisara-o.github.io/lumiere-product-page/) &nbsp;·&nbsp; **Portfolio:** [FeyisaraCodes](#)

---

## Overview

Lumière is a high-fidelity product page for *Radiant Youth Complex* — a premium facial serum. The project simulates the full frontend experience of a modern DTC (direct-to-consumer) skincare brand, from first impression through to cart management. Every interaction, animation, and design decision was made with two goals in mind: **visual quality** and **conversion performance**.

---

## Features

### Shopping Experience
- **Interactive image gallery** with crossfade transitions and thumbnail switching
- **Image zoom modal** — fullscreen view triggered by icon click or double-click
- **Size variant selector** — dynamically updates price across all UI touchpoints
- **Skin type selector** — crossfades product description to match the selected skin profile
- **Quantity controls** with min/max bounds and micro-animation feedback

### Cart System
- **Slide-in cart drawer** with full item management
- Add, increase, decrease, and remove items
- Real-time subtotal calculation
- Persistent cart state via `localStorage` — survives page refresh
- Checkout CTA (styled, UI-complete)

### Engagement & Trust
- **Wishlist toggle** — saves state to `localStorage`, syncs across nav and product button
- **Social proof counter** — live viewer count that fluctuates realistically
- **Stock urgency indicator** with animated pulse dot
- **Review helpful votes** — one vote per review card, count updates in real time
- **Trust badges** — delivery, returns, vegan, and dermatologist-tested signals

### UI & Motion
- **Custom cursor** — outer ring trails with lerp interpolation; scales on hover, shrinks on click
- **Page loader** — branded fade-in with animated italic logo
- **Scroll-triggered animations** — ingredients and reviews sections reveal with staggered fade-up via `IntersectionObserver`
- **3D tilt effect** on product image — responds to cursor position with `perspective()` transforms and a dynamic gloss overlay
- **Sticky Add-to-Cart bar** — appears via `IntersectionObserver` when the main CTA leaves the viewport
- **Back to top button** — appears after 600px scroll
- **Toast notifications** — contextual feedback for cart, wishlist, and vote actions
- Smooth scroll navigation to page sections via sticky nav links
- Responsive layout — fully functional from 320px to widescreen

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic, accessible document structure |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Vanilla JavaScript | All interactivity — zero dependencies |
| Google Fonts | Cormorant Garamond + DM Sans — soft luxury type pairing |
| Unsplash | High-quality placeholder product photography |
| localStorage | Cart and wishlist persistence |

No frameworks. No build tools. No dependencies. Deploys as static files to any host.

---

## Project Structure

```
lumiere-product-page/
├── index.html          # Full page structure and content
├── css/
│   └── style.css       # Complete design system and component styles
├── js/
│   └── main.js         # All interactivity and state management
└── README.md
```

---

## Design Decisions

**Soft luxury aesthetic** — The palette of warm cream, dusty rose, and champagne gold was chosen to match the visual language of premium skincare brands. Typography pairs Cormorant Garamond (editorial, high-fashion) with DM Sans (clean, readable) to balance elegance with usability.

**No framework** — Keeping the stack to vanilla HTML, CSS, and JS demonstrates core competency without hiding logic behind abstractions. It also produces a lighter, faster page with no build step required.

**IntersectionObserver for everything** — The sticky bar, scroll reveals, and back-to-top button all use `IntersectionObserver` rather than scroll event listeners. This avoids main-thread blocking and keeps animations performant.

**3D tilt via CSS transforms** — The product image tilt effect uses `perspective()` and `rotateX/Y` with a lerp-interpolated gloss overlay. No WebGL, no canvas, no library — purely CSS transforms driven by mouse coordinates.

**Conversion-led layout** — The split hero (gallery left, info right), sticky bar, social proof counter, stock urgency, and trust badges are all patterns used by high-converting e-commerce brands. The project demonstrates understanding of *why* design decisions matter commercially, not just aesthetically.

---

## Key JavaScript Concepts Demonstrated

- **IIFE module pattern** — all logic scoped, no global pollution
- **IntersectionObserver API** — sticky bar, scroll reveal, back to top
- **localStorage** — cart serialisation, wishlist persistence
- **CSS custom property manipulation** — dynamic accent colours per ingredient card
- **Lerp animation loop** — `requestAnimationFrame` cursor trailing
- **Event delegation** — dynamically rendered cart items handled efficiently
- **DOM crossfade pattern** — opacity transition before `src` swap for smooth image changes
- **Staggered animation delays** — calculated from sibling index at reveal time

---

## Running Locally

No build step required.

```bash
git clone https://github.com/yourusername/lumiere-product-page.git
cd lumiere-product-page
```

Open `index.html` in any modern browser. For best results, serve via a local server:

```bash
# Python
python -m http.server 3000

# Node
npx serve .
```

---

## What This Project Demonstrates

This was built to show potential clients and collaborators that I can:

- **Design and engineer** a complete, production-quality UI without a framework
- **Make commercial decisions** — layout, copy, trust signals, and interactions that actually drive conversions
- **Write clean, maintainable code** — structured, commented, and easy to hand off
- **Sweat the details** — micro-interactions, animation timing, responsive behaviour, and accessibility all matter

---

## About

Built by **Feyisara Okunola** — freelance web developer and designer behind [FeyisaraCodes](#).

I build premium digital experiences for lifestyle brands, product businesses, and founders who care about craft.

**Available for freelance work** — [Get in touch](https://www.linkedin.com/in/mofeyisara-okunola-73121b277?utm_source=share_via&utm_content=profile&utm_medium=member_android)
