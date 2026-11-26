# AGENTS.md - E Beats Perú Landing Page

## Project Overview

This is a static website for the E Beats Perú real estate automation offering.

- `index.html` contains the landing and the diagnostic quiz markup.
- `config.js` contains the public brand, WhatsApp, booking and offer settings.
- `assets/inmobiliarias/` contains the landing stylesheet, browser script and media.
- `assets/js/header.js` and `assets/js/footer.js` serve the archived articles.
- `pages/` contains the legal pages, nutrition page, editorial index and articles.
- `nginx.conf`, `Caddyfile.example` and `netlify.toml` define hosting and legacy redirects.
- `README.md` documents local preview, quiz behavior and deployment.

## Development and verification

The landing uses vanilla HTML, CSS and JavaScript, with no build step. From the project root, run:

```bash
python -m http.server 3000 --bind 127.0.0.1
```

- Verify the mockups and layout at 360 px and on desktop.
- Test the quiz with all result paths and check that going back retains answers.
- Verify the WhatsApp message and marketing attribution from the quiz result.
- Test links, keyboard navigation, the animated demo and reduced motion.
- Check legacy redirects on the hosting server when editing routing rules.

## Code style

- Use semantic HTML5, two-space indentation and double-quoted attributes.
- Use descriptive alternative text for meaningful images and accessible names for icon-only controls.
- Keep styling in `assets/inmobiliarias/landing.css`. Use CSS custom properties and responsive units.
- Use data attributes for JavaScript hooks and preserve keyboard focus while changing quiz steps.
- Specify image dimensions and reserve lazy loading for images below the initial viewport.
- Keep credentials out of browser-facing configuration. The diagnostic is requested through WhatsApp or the optional calendar.

# Available Skills

## How to Invoke a Skill

Simply mention the skill name in your prompt. The skill will be loaded automatically when needed.

**Examples:**
- "Usa taste-skill para generar código premium"
- "Con minimalist-skill, crea una UI estilo Notion"
- "Aplicando soft-skill, haz animaciones spring"

## Skill List

| Skill | Description | When to Use |
|-------|-------------|-------------|
| **taste-skill** | High-end frontend design. Layout, typography, colors, motion. | Default premium UI generation |
| **redesign-skill** | Audits and fixes existing design problems. | Improving legacy projects |
| **soft-skill** | Soft UI with premium fonts, whitespace, depth, spring animations. | Luxury/minimal aesthetics |
| **output-skill** | Prevents lazy outputs, placeholder comments, half-finished code. | Ensuring complete deliverables |
| **minimalist-skill** | Clean, editorial-style (Notion/Linear). Monochrome, crisp borders. | Minimalist interfaces |
| **brutalist-skill** | Raw mechanical interfaces (Swiss + CRT). BETA. | Bold/brutalist designs |
| **stitch-skill** | Google Stitch-compatible semantic design. | Structured design systems |
| **landing-page-fixer** | Analyzes and fixes HTML landing pages and questionnaires. | Fix existing landings |
| **seo-optimizer** | SEO optimization for content and technical aspects. | SEO improvements |

## Skill Configuration (taste-skill)

The taste-skill has 3 adjustable parameters:

- **DESIGN_VARIANCE** (1-10): Layout experimental level
  - 1-3: Clean/centered
  - 8-10: Asymmetric/modern
  
- **MOTION_INTENSITY** (1-10): Animation amount
  - 1-3: Simple hover
  - 8-10: Magnetic/scroll-triggered
  
- **VISUAL_DENSITY** (1-10): Content density
  - 1-3: Spacious/luxury
  - 8-10: Dense dashboards

**Usage:** Simply specify your preference in the prompt, e.g.:
- "With DESIGN_VARIANCE=9, MOTION_INTENSITY=7, create a modern landing page"