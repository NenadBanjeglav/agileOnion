# Inline Blog Image Sizing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep Sanity images inside the blog post body from rendering as oversized hero-like images.

**Architecture:** Leave cover images unchanged and adjust only the PortableText image renderer in the blog slug page. Add a small Node built-in test that pins the body image sizing classes so future typography or layout edits do not accidentally restore full-width inline images.

**Tech Stack:** Next.js 15 App Router, React 19, Sanity PortableText, `next/image`, Tailwind CSS 4, Node built-in `node:test`.

---

## Scope Check

This is one focused rendering change. It affects only images whose PortableText block type is `image` inside blog post bodies. It does not change Sanity schemas, cover images, related post images, OpenGraph images, or newsletter rendering.

## File Structure

- Create: `tests/blog-inline-image-sizing.test.mjs`
  - Responsibility: Regression-check the blog PortableText image renderer's sizing classes and confirm the cover image block is not capped.
- Modify: `app/(public)/blog/[slug]/page.tsx`
  - Responsibility: Render inline blog body images centered, responsive, and capped at the text-column width.

---

### Task 1: Add Regression Test For Inline Blog Images

**Files:**

- Create: `tests/blog-inline-image-sizing.test.mjs`

- [ ] **Step 1: Create the failing test**

Create `tests/blog-inline-image-sizing.test.mjs` with this exact content:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, '../app/(public)/blog/[slug]/page.tsx')
const source = readFileSync(pagePath, 'utf8')

const rendererMatch = source.match(
  /image: \(\{ value \}\) => \{[\s\S]*?file: \(\{ value \}\) => \{/,
)

test('PortableText body image renderer is present', () => {
  assert.ok(rendererMatch, 'expected PortableText image renderer in blog page')
})

test('PortableText body images are centered and capped to text column width', () => {
  const renderer = rendererMatch?.[0] ?? ''

  assert.match(
    renderer,
    /<figure className="[^"]*\bmx-auto\b[^"]*"/,
    'expected inline image figure to be centered with mx-auto',
  )
  assert.match(
    renderer,
    /<figure className="[^"]*\bw-full\b[^"]*"/,
    'expected inline image figure to remain responsive on small screens',
  )
  assert.match(
    renderer,
    /<figure className="[^"]*max-w-\[760px\][^"]*"/,
    'expected inline image figure to be capped at 760px on desktop',
  )
  assert.match(
    renderer,
    /sizes="\([^"]*760px[^"]*"/,
    'expected Next Image sizes to match the 760px visual cap',
  )
})

test('cover image remains full article width', () => {
  const coverBlockMatch = source.match(
    /\{coverImageUrl && \([\s\S]*?priority\s*\/>\s*<\/div>\s*\)\}/,
  )
  const coverBlock = coverBlockMatch?.[0] ?? ''

  assert.ok(coverBlock, 'expected cover image block in blog page')
  assert.doesNotMatch(
    coverBlock,
    /max-w-\[760px\]/,
    'cover image should not use the inline image cap',
  )
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs
```

Expected result: the test fails because the current PortableText image renderer has no `mx-auto`, no `max-w-[760px]`, and no `sizes` attribute tied to the 760px cap.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/blog-inline-image-sizing.test.mjs
git commit -m "test: cover inline blog image sizing"
```

---

### Task 2: Cap PortableText Body Images

**Files:**

- Modify: `app/(public)/blog/[slug]/page.tsx`
- Test: `tests/blog-inline-image-sizing.test.mjs`

- [ ] **Step 1: Update the PortableText image renderer**

In `app/(public)/blog/[slug]/page.tsx`, replace the `image: ({ value }) => { ... }` block inside `portableTextComponents.types` with this exact implementation:

```tsx
    image: ({ value }) => {
      const imageUrl = urlFor(value).width(1000).auto('format').url()
      if (!imageUrl) return null
      return (
        <figure className="mx-auto my-8 w-full max-w-[760px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src={imageUrl}
            alt="Ilustracija u članku"
            width={1000}
            height={583}
            sizes="(min-width: 768px) 760px, calc(100vw - 48px)"
            className="h-auto w-full object-contain"
          />
        </figure>
      )
    },
```

This keeps inline images responsive on mobile, caps them to the article text column on desktop, centers them, and reduces the requested Sanity transform from `1200px` to `1000px` because the image no longer displays wider than `760px`.

- [ ] **Step 2: Run the regression test and verify it passes**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs
```

Expected result: all three tests pass.

- [ ] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected result: ESLint exits with code `0`.

- [ ] **Step 4: Run production build**

Run:

```bash
npm run build
```

Expected result: Next.js build exits with code `0`.

- [ ] **Step 5: Commit the implementation**

```bash
git add 'app/(public)/blog/[slug]/page.tsx' tests/blog-inline-image-sizing.test.mjs
git commit -m "fix: cap inline blog body images"
```

---

### Task 3: Browser Verification

**Files:**

- No additional file changes.

- [ ] **Step 1: Start the dev server**

Run:

```bash
npm run dev
```

Expected result: Next.js starts locally and prints a localhost URL, usually `http://localhost:3000`.

- [ ] **Step 2: Open the affected post**

Open:

```text
http://localhost:3000/blog/da-svakako-ne-nikako
```

Expected result: the cover image remains large near the top of the article, while images inside the article body render centered and no wider than the text column.

- [ ] **Step 3: Check mobile behavior**

Resize the browser to a narrow mobile viewport such as `390px` wide.

Expected result: inline body images shrink to the available content width, do not overflow horizontally, and keep their aspect ratio.

- [ ] **Step 4: Stop the dev server**

Stop the dev server with `Ctrl+C`.

Expected result: the terminal returns to the shell prompt.

---

## Self-Review

- Spec coverage: The plan covers the approved recommendation: only post-body Sanity images are capped, cover images remain unchanged, and desktop max width is `760px`.
- Placeholder scan: No deferred requirements or unspecified implementation steps remain.
- Type consistency: The only code change is in the existing `PortableTextComponents` image renderer; it keeps the same `value` input and `Image` usage pattern.
