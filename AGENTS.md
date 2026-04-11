# AGENTS.md - E Beats Perú Landing Page

## Project Overview
This is a static landing page for E Beats Perú (AI/automation agency). The project consists of:
- `index.html` - Main landing page with sections, forms, and embedded JSON-LD schemas
- `main.js` - Vanilla JavaScript for animations, modals, form validation, and video controls
- `styles.css` - CSS design system with custom properties and responsive styles
- `politica-de-privacidad.html` - Privacy policy page
- Static assets in `/image` folder

## Build Commands
This is a static website with no build system. No npm/node dependencies.

- **Preview locally**: Open `index.html` directly in browser, or serve with any static server:
  ```bash
  # Using Python
  python -m http.server 8000
  # Using Node (if available)
  npx serve
  ```
- **Deploy**: Push to any static host (Netlify, Vercel, GitHub Pages, etc.)

## Testing
No automated tests exist. Manual testing checklist:
- [ ] Form validation works for all 3 steps
- [ ] Phone validation respects country-specific rules (PHONE_RULES in main.js)
- [ ] Modal opens/closes correctly
- [ ] Scroll animations trigger properly
- [ ] Mobile hamburger menu works
- [ ] Smooth scroll to anchors works
- [ ] Video player controls function correctly
- [ ] Accessibility: keyboard navigation, ARIA labels

## Code Style Guidelines

### General
- This is a vanilla HTML/CSS/JS project - no frameworks
- Use semantic HTML5 elements
- Keep CSS organized with comment headers (see existing pattern)
- JavaScript uses ES6+ (const, let, arrow functions, template literals)

### HTML (index.html)
- Use 2-space indentation
- All attributes in double quotes
- Self-closing tags for void elements
- Keep attributes sorted logically (lang, charset, viewport, title, meta, link, style, script)
- Use data attributes for JS hooks (`data-aos`, `data-hero-delay`)
- Include proper ARIA labels on interactive elements
- JSON-LD schemas should be valid

### CSS (styles.css)
- Use CSS custom properties (`:root`) for colors, fonts, spacing
- Follow BEM-ish naming: `.block__element--modifier`
- Use `clamp()` for responsive typography
- Keep responsive breakpoints in media queries
- Use CSS variables from `:root` instead of hardcoded values
- Prefer `rem` over `px` for accessibility

### JavaScript (main.js)
- Wrap in `DOMContentLoaded` event listener
- Use `const` and `let` - avoid `var`
- Use arrow functions where appropriate
- Use template literals for string interpolation
- Add `{ passive: true }` to scroll event listeners
- Handle `prefers-reduced-motion` for accessibility
- Validate phone numbers against PHONE_RULES object
- Use `fetch` with proper error handling for form submissions
- Clear form state on modal open

### Naming Conventions
- Classes: kebab-case (`.btn-primary`, `.hero-content`)
- IDs: camelCase where needed (`#hero-cta`, `#diagModal`)
- Functions: camelCase (`initHeroEntrance()`, `goToStep()`)
- Constants: UPPER_SNAKE_CASE for configuration objects (`PHONE_RULES`, `WEBHOOK_URL`)
- CSS variables: kebab-case (`--red`, `--ease`)

### Accessibility
- Include `alt` text on all images
- Use semantic heading hierarchy (h1 → h2 → h3)
- Ensure color contrast meets WCAG AA
- Support keyboard navigation
- Use `aria-label` on icon-only buttons
- Implement focus management for modals

### Error Handling
- Form validation should show inline errors
- Use `try/catch` for async operations (fetch)
- Log errors to console with descriptive messages
- Provide user-friendly error messages in UI

### Performance
- Lazy load images with `loading="lazy"`
- Use `preconnect` for external resources
- Defer non-critical scripts
- Avoid layout shifts by specifying dimensions
- Use `will-change` sparingly for animated elements

## Project-Specific Notes

### Form Validation
The diagnostic modal (3-step form) validates:
- Step 1: Country, name, email, phone (country-specific regex)
- Step 2: Ventas, facturación, problemas (checkboxes), herramientas (checkboxes)
- Step 3: Etapa, implementar, tiempo (radio), privacy checkbox

### Phone Validation
Phone rules vary by country (defined in `PHONE_RULES`). Each country has:
- `regex`: Validation pattern
- `placeholder`: Input hint
- `hint`: Error message

### External Dependencies
- **anime.js**: Loaded via CDN for animations
- **Vimeo Player API**: For custom video controls
- **Calendly**: Lazy-loaded on demand for scheduling
- **Google Fonts**: Inter + Plus Jakarta Sans

### Webhook
Form submissions POST to n8n webhook at:
```
https://aimachristian-n8n.ajcxjb.easypanel.host/webhook/ce321d03-b62e-4972-970d-d169776c9f8b
```

## Common Tasks
- **Add new section**: Copy existing section pattern, update IDs
- **Modify form fields**: Update validation in main.js + HTML
- **Change colors**: Update CSS custom properties in `:root`
- **Add animation**: Use IntersectionObserver pattern like existing code
- **Debug form**: Check browser console + network tab for webhook responses

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