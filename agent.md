# AGILE ONION - CREATIVE DIRECTION & PROJECT SPECIFICATION

Design, architecture, layout, motion, responsiveness, and development guidelines.

Last updated: 2025

## 1. Brand Essence

AgileOnion is a modern personal development blog combining:

- introspective storytelling
- agile/scrum philosophy
- personal growth
- emotional intelligence
- modern design and animation

Tone: thoughtful, bold, aesthetic, calm, modern, editorial, personal, reflective.

The website must feel premium, clean, modern, softly animated, beautifully readable, creative but not chaotic, and artistic but structured.

## 2. Visual Language

### 2.1 Tailwind 4 Color System (CSS variables)

All color logic is defined via CSS variables inside `@theme`:

```css
@theme {
  --color-primary-base: #00e3b0;
  --color-primary-mid: #00d8bd;
  --color-primary-soft: #00cccc;
  --color-primary-cool: #00c7d2;
  --color-primary-pop: #00ffff;

  --color-secondary: #3e00e3;
  --color-secondary-light: #5617ff;
  --color-secondary-dark: #3000b0;
  --color-secondary-content: #ebe3ff;

  --color-background: #181b1b;
  --color-foreground: #232928;
  --color-border: #3b4542;

  --color-copy: #fbfbfb;
  --color-copy-light: #d6dcda;
  --color-copy-lighter: #9faca9;

  --color-success: #00e300;
  --color-warning: #e3e300;
  --color-error: #e30000;

  --gradient-primary: linear-gradient(
    90deg,
    #00e3b0,
    #00d8bd,
    #00cccc,
    #00c7d2
  );
}
```

Color philosophy: deep, calm dark-mode foundation; vibrant turquoise identity color; purple accent for contrast and personality; minimal color noise; maintain strong contrast and readability.

## 3. Typography System

Fonts: headings (Inter, Geist, Satoshi), body (Inter). Display may be oversized, bold, sometimes transparent/masked.

Hierarchy: Display 6xl-7xl; H1 5xl; H2 4xl; H3 3xl; Body base-lg.

Rules: headlines must feel intentional and strong; body text must be highly readable; avoid dense paragraphs; maximum line width 75ch.

## 4. Layout Guidelines

Use an editorial, modern layout with generous spacing.

Global container: `<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">`

Page structure: Hero, Category/Menu, Featured Articles, Quote or Punchline, Blog Feed, Author/About, Footer. Spacing increases with breakpoints.

## 5. Responsive Design System

The site must feel handcrafted on each device.

Breakpoints: sm 640px; md 768px; lg 1024px; xl 1280px; 2xl 1536px.

Responsive typography:

- Mobile: Display 4xl, H1 3xl, H2 2xl, Body base
- Tablet: Display 5xl, H1 4xl, H2 3xl, Body lg
- Desktop: Display 7xl, H1 5xl, H2 4xl, Body lg

## 6. Responsive Layout Details

- Hero: mobile centered with simplified animation; tablet left-aligned with stronger motion; desktop fully layered hero with transparent typography and video.
- Category grid (B-Egg inspired): mobile 1 column; tablet 2 columns; desktop 3-4 columns.
- Article cards: mobile 1 column; tablet 2 columns; desktop 3 columns with parallax/hover.
- Blog post page: mobile full width; tablet centered with margins; desktop editorial layout with pull quotes and parallax cover.
- Navigation: mobile hamburger overlay; tablet hybrid; desktop full horizontal nav.

## 7. Animation Guidelines (Framer Motion)

Motion philosophy: smooth, subtle, premium, supports storytelling.

Default animations:

```ts
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.25 } },
}
```

Allowed motion: parallax and scroll transforms, text fade/slide, section reveals, hover microinteractions.

Avoid: bouncy animations, abrupt motion, excessive parallax.

Accessibility: if prefers-reduced-motion, disable parallax, scroll-based animations, and background motion.

## 8. Component System

- Cards: rounded 8-16px; subtle border and shadow; hover scale plus border glow.
- Buttons: Primary `bg-primary-base` with primary content; Secondary `bg-secondary` with secondary content; Tertiary transparent with border.
- Hero: masked and transparent typography; background video or animated gradient; scroll-linked transitions.
- Article components: cover image, category label, reading time, hover and fade animations.

## 9. Sanity CMS Structure

- Post: title, slug, excerpt, coverImage, body (Portable Text), category, tags[], publishedAt, seo { title, description }
- Category: title, slug, description
- Author: name, bio, avatar, socials { linkedin, twitter }
- QuoteBlock (optional): text, author, context

## 10. Technical Architecture Guidelines

- Next.js 16 App Router
- When implementing a new feature with a third-party library or framework, pull the latest docs via Context7 before coding to validate setup and API usage.
- Use Server Components by default; Client Components only for interactive pieces
- Fetch CMS data using Next built-in caching
- Use edge caching where possible
- Use `dynamic = "force-static"` for blog pages unless filters applied
- Newsletter system: collect signups, send welcome email (React Email) via Resend, and support sending new-post newsletters to all subscribers directly from the app (no external tools beyond Resend).
- Contact form: submit via API and send notification email through Resend.

File structure:

```
/app
  /layout.tsx
  /page.tsx
  /(site)
    /blog/[slug]
    /category/[slug]
  /components
  /lib
  /sanity
  /styles
```

Styling: Tailwind 4 with CSS variables; avoid raw CSS unless necessary.

Images: use `next/image` with responsive and optimized formats.

## 11. Content and Writing Guidelines

Tone: personal, conversational, reflective, insightful, clear.

Rules: short paragraphs; high-value statements; use quotes and story-driven writing; use subheadings frequently; avoid corporate or robotic tone.

## 12. Accessibility and Performance

- Meet WCAG AA contrast
- Provide motion-reduced alternatives
- Avoid layout shifts (CLS)
- Preload primary fonts
- Use Next.js image optimization
- Avoid large blocking JavaScript

## 13. Design Inspirations to Follow

Must integrate visual and interaction qualities inspired by:

- Zhoosh Creative (transparent typography plus moving background)
- Mango Marketing Co (text-over-video hero plus modern typography)
- B-Egg (category/menu animations plus colorful transparent text)
- Rebellion (bold storytelling layout)
- Niccolo Miranda (editorial reading experience)
- Juice Agency (energetic, modern creative agency feel)

## 14. Deliverables Checklist

This project must include:

- Design: Hero, Category section, Featured posts, Article pages, Author section, Animations, Design system
- Dev: Next.js 16 app, Sanity CMS integration, Tailwind 4 theme, Framer Motion animations, Responsive components, SEO and metadata
- Content: Author bio, Intro message, Categories, At least 3 sample posts
- Pages: Home (intro, categories, latest posts), About (bio + LinkedIn link, visual identity), Blog index with categories/archives/share, Contact page with working form (Resend email), Newsletter signup with welcome email + ability to send new-post newsletters from the system, Sitemap/canonical/OpenGraph/SEO basics.
- Scope note: i18n (SR/EN) is deferred for now; keep architecture extendable for future languages.

## 15. Quality Bar

Everything delivered must be clean, modern, premium, responsive, well-animated, authentic, fast, accessible, editorial, and high-craftsmanship.

This document is the single source of truth for all creative, architectural, design, motion, and content decisions in the AgileOnion project.

## 16. Text Encoding & Localization (MANDATORY)

- Encoding: all source files must be UTF-8 (no BOM); never introduce or preserve non-UTF-8 text.
- Allowed characters: standard UTF-8 plus Serbian Latin diacritics only — č ć š ž đ Č Ć Š Ž Đ.
- Forbidden characters: never allow mojibake or corruption (e.g., Ž Ø ƒ  � Ã Â â € ™ ¢) and never use smart quotes; always use ASCII quotes (", ').
- Copy/paste hygiene: avoid pasting directly from Word/PDF/email; if external text is used, paste as plain text, normalize to UTF-8, replace smart quotes, and manually verify diacritics.
- File handling: assume UTF-8 when creating/editing; do not change encodings unless explicitly instructed.
- Validation: before submitting changes, visually scan for encoding issues and diacritic correctness; any corruption is a blocking issue and must be fixed immediately.
