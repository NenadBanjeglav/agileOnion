# Blog Body Image Heading Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Handle PortableText blog body images with the same metadata-driven adaptive layout used by blog heading images.

**Architecture:** Project Sanity asset dimensions into image blocks inside `body[]`, then use one shared blog image layout helper for cover and body images. Portrait images render centered with the same `520px` desktop cap; landscape and square images render at full article width with layout, source width, `sizes`, and `next/image` dimensions derived from Sanity metadata.

**Tech Stack:** Next.js 15 App Router, React 19, Sanity GROQ image metadata, `@portabletext/react`, `next/image`, Tailwind CSS 4, Node built-in `node:test`.

---

## Scope Check

This is one focused rendering change on the blog post detail page. It affects only the top-level cover image layout helper and PortableText body image blocks in `app/(public)/blog/[slug]/page.tsx`. It does not change Sanity schemas, related post images, blog index cards, OpenGraph metadata, newsletter emails, or category pages.

## File Structure

- Modify: `tests/blog-inline-image-sizing.test.mjs`
  - Responsibility: Regression-check that PortableText body images fetch Sanity dimensions, use the shared adaptive layout helper, and no longer use the old fixed `760px` inline cap.
- Modify: `tests/blog-cover-image-sizing.test.mjs`
  - Responsibility: Regression-check that the cover image still uses the same adaptive layout behavior after the helper is generalized from cover-specific to shared blog-image layout.
- Modify: `app/(public)/blog/[slug]/page.tsx`
  - Responsibility: Project body image dimensions from Sanity, generalize the cover layout helper, and render body images with the same orientation-aware layout as heading images.

---

### Task 1: Update Regression Tests For Shared Adaptive Blog Images

**Files:**
- Modify: `tests/blog-inline-image-sizing.test.mjs`
- Modify: `tests/blog-cover-image-sizing.test.mjs`

- [ ] **Step 1: Replace the inline image sizing test**

Replace the full contents of `tests/blog-inline-image-sizing.test.mjs` with:

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

test('post query fetches PortableText body image dimensions', () => {
  assert.match(
    source,
    /body\[\]\{[\s\S]*_type == "image" => \{[\s\S]*"dimensions": asset->metadata\.dimensions[\s\S]*\}/,
    'expected post query to fetch Sanity dimensions for body image blocks',
  )
})

test('PortableText body image renderer is present', () => {
  assert.ok(rendererMatch, 'expected PortableText image renderer in blog page')
})

test('PortableText body images use the shared adaptive image layout', () => {
  const renderer = rendererMatch?.[0] ?? ''

  assert.match(
    renderer,
    /const imageLayout = getBlogImageLayout\(getPortableTextImageDimensions\(value\)\)/,
    'expected body images to derive layout from projected Sanity dimensions',
  )
  assert.match(
    renderer,
    /\.width\(imageLayout\.sourceWidth\)/,
    'expected body image URL transform to use adaptive source width',
  )
  assert.match(
    renderer,
    /className=\{`my-8 \$\{imageLayout\.frameClassName\}`\}/,
    'expected body image figure to reuse the shared frame class with body spacing',
  )
  assert.match(
    renderer,
    /width=\{imageLayout\.width\}/,
    'expected body image width to come from layout metadata',
  )
  assert.match(
    renderer,
    /height=\{imageLayout\.height\}/,
    'expected body image height to come from layout metadata',
  )
  assert.match(
    renderer,
    /sizes=\{imageLayout\.sizes\}/,
    'expected body image sizes to come from adaptive layout',
  )
  assert.match(
    renderer,
    /className="h-auto w-full object-contain"/,
    'expected body images to preserve natural aspect ratio',
  )
})

test('PortableText body image renderer does not keep the old fixed inline cap', () => {
  const renderer = rendererMatch?.[0] ?? ''

  assert.doesNotMatch(
    renderer,
    /max-w-\[760px\]|width=\{1000\}|height=\{583\}|760px/,
    'body images should not use the old hard-coded inline image dimensions',
  )
})
```

- [ ] **Step 2: Replace the cover image sizing test**

Replace the full contents of `tests/blog-cover-image-sizing.test.mjs` with:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, '../app/(public)/blog/[slug]/page.tsx')
const source = readFileSync(pagePath, 'utf8')

test('post query fetches cover image dimensions', () => {
  assert.match(
    source,
    /"coverImageDimensions": coverImage\.asset->metadata\.dimensions/,
    'expected post query to fetch Sanity cover image dimensions',
  )
})

test('portrait image detection compares Sanity width and height', () => {
  assert.match(
    source,
    /type ImageDimensions = \{[\s\S]*?width\?: number \| null[\s\S]*?height\?: number \| null[\s\S]*?\}/,
    'expected an ImageDimensions type with width and height',
  )
  assert.match(
    source,
    /const isPortraitImage = \([\s\S]*?height > width[\s\S]*?\}/,
    'expected portrait detection to compare height against width',
  )
})

test('shared blog image layout caps portrait images without capping landscape images', () => {
  const layoutMatch = source.match(
    /const getBlogImageLayout = \([\s\S]*?\n\}\n\nconst getPortableTextImageDimensions/,
  )
  const layout = layoutMatch?.[0] ?? ''

  assert.ok(layout, 'expected getBlogImageLayout helper in blog page')
  assert.match(
    layout,
    /max-w-\[520px\]/,
    'expected portrait image frame to cap at 520px',
  )
  assert.match(
    layout,
    /\bmx-auto\b/,
    'expected portrait image frame to be centered',
  )
  assert.match(
    layout,
    /: 'w-full'/,
    'expected landscape image frame to stay full width',
  )
  assert.match(
    layout,
    /sourceWidth: isPortrait \? 900 : 1600/,
    'expected smaller Sanity transform width for portrait images',
  )
  assert.match(
    layout,
    /\(min-width: 768px\) 520px/,
    'expected portrait sizes attribute to match the 520px cap',
  )
  assert.match(
    layout,
    /\(min-width: 1024px\) 1024px/,
    'expected landscape sizes attribute to match article width',
  )
})

test('blog image dimensions cannot round down to zero', () => {
  assert.match(
    source,
    /Math\.max\(1,\s*Math\.round\(value\)\)/,
    'expected malformed fractional image dimensions to clamp to at least 1',
  )
})

test('cover image URL uses adaptive layout source width', () => {
  assert.match(
    source,
    /const coverImageLayout = getBlogImageLayout\(post\.coverImageDimensions\)/,
    'expected cover image layout to use Sanity cover dimensions',
  )
  assert.match(
    source,
    /\.width\(coverImageLayout\.sourceWidth\)/,
    'expected cover image URL transform to use adaptive source width',
  )
})

test('cover image render uses adaptive layout values', () => {
  const coverBlockMatch = source.match(
    /\{coverImageUrl && \([\s\S]*?priority\s*\/>\s*<\/div>\s*\)\}/,
  )
  const coverBlock = coverBlockMatch?.[0] ?? ''

  assert.ok(coverBlock, 'expected cover image block in blog page')
  assert.match(
    coverBlock,
    /className=\{coverImageLayout\.frameClassName\}/,
    'expected cover frame to use adaptive className',
  )
  assert.match(
    coverBlock,
    /width=\{coverImageLayout\.width\}/,
    'expected cover image width to come from layout metadata',
  )
  assert.match(
    coverBlock,
    /height=\{coverImageLayout\.height\}/,
    'expected cover image height to come from layout metadata',
  )
  assert.match(
    coverBlock,
    /sizes=\{coverImageLayout\.sizes\}/,
    'expected cover image sizes to come from adaptive layout',
  )
  assert.match(
    coverBlock,
    /className="h-auto w-full object-contain"/,
    'expected cover image to preserve natural aspect ratio',
  )
})

test('cover and body images share the same adaptive layout helper', () => {
  assert.match(
    source,
    /const coverImageLayout = getBlogImageLayout\(post\.coverImageDimensions\)/,
    'expected cover images to use the shared blog image layout helper',
  )
  assert.match(
    source,
    /const imageLayout = getBlogImageLayout\(getPortableTextImageDimensions\(value\)\)/,
    'expected body images to use the shared blog image layout helper',
  )
  assert.doesNotMatch(
    source,
    /getCoverImageLayout/,
    'expected cover-specific image layout helper to be generalized',
  )
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
```

Expected result: FAIL. The current implementation still uses `body`, `getCoverImageLayout`, `max-w-[760px]`, `width={1000}`, and `height={583}` in the PortableText image renderer.

- [ ] **Step 4: Commit the failing regression tests**

Run:

```bash
git add tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
git commit -m "test: require adaptive blog body image layout"
```

Expected result: a commit containing only the two updated test files.

---

### Task 2: Project Body Image Dimensions From Sanity

**Files:**
- Modify: `app/(public)/blog/[slug]/page.tsx`
- Test: `tests/blog-inline-image-sizing.test.mjs`

- [ ] **Step 1: Update the post query body projection**

In `app/(public)/blog/[slug]/page.tsx`, replace this field in `POST_QUERY`:

```ts
  body,
```

with this projection:

```ts
  body[]{
    ...,
    _type == "image" => {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  },
```

Expected result: PortableText image blocks in `post.body` include a `dimensions` object with Sanity asset metadata while non-image blocks keep their original fields.

- [ ] **Step 2: Run the inline image test**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs
```

Expected result: partial FAIL. The query projection assertion passes, while the renderer assertions still fail until the shared layout helper is implemented.

---

### Task 3: Generalize The Cover Image Layout Helper

**Files:**
- Modify: `app/(public)/blog/[slug]/page.tsx`
- Test: `tests/blog-cover-image-sizing.test.mjs`

- [ ] **Step 1: Add a typed value shape for PortableText image dimensions**

In `app/(public)/blog/[slug]/page.tsx`, add this type immediately after `type ImageDimensions`:

```ts
type BlogImageValue = {
  dimensions?: ImageDimensions | null
}
```

- [ ] **Step 2: Rename the layout helper and add a PortableText dimensions reader**

Replace the current `getCoverImageLayout` helper with these two helpers:

```ts
const getBlogImageLayout = (dimensions?: ImageDimensions | null) => {
  const isPortrait = isPortraitImage(dimensions)
  const fallbackWidth = isPortrait ? 900 : 1600
  const fallbackHeight = isPortrait ? 1200 : 900

  return {
    sourceWidth: isPortrait ? 900 : 1600,
    width: getImageDimension(dimensions?.width, fallbackWidth),
    height: getImageDimension(dimensions?.height, fallbackHeight),
    sizes: isPortrait
      ? '(min-width: 768px) 520px, calc(100vw - 48px)'
      : '(min-width: 1024px) 1024px, calc(100vw - 48px)',
    frameClassName: [
      'overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)]',
      isPortrait ? 'mx-auto w-full max-w-[520px]' : 'w-full',
    ].join(' '),
  }
}

const getPortableTextImageDimensions = (value: unknown) => {
  if (!value || typeof value !== 'object' || !('dimensions' in value)) {
    return null
  }

  return (value as BlogImageValue).dimensions ?? null
}
```

Expected result: cover and body image code can use the same helper without duplicating orientation, fallback, `sizes`, or frame-class logic.

- [ ] **Step 3: Update the cover image call site**

Replace:

```ts
  const coverImageLayout = getCoverImageLayout(post.coverImageDimensions)
```

with:

```ts
  const coverImageLayout = getBlogImageLayout(post.coverImageDimensions)
```

- [ ] **Step 4: Run the cover image test**

Run:

```bash
node --test tests/blog-cover-image-sizing.test.mjs
```

Expected result: partial FAIL. The shared helper and cover call-site assertions pass, while the final shared-helper assertion still fails until the body image renderer uses `getBlogImageLayout`.

---

### Task 4: Render Body Images With The Shared Adaptive Layout

**Files:**
- Modify: `app/(public)/blog/[slug]/page.tsx`
- Test: `tests/blog-inline-image-sizing.test.mjs`
- Test: `tests/blog-cover-image-sizing.test.mjs`

- [ ] **Step 1: Replace the PortableText image renderer**

In `app/(public)/blog/[slug]/page.tsx`, replace the full `image: ({ value }) => { ... }` block inside `portableTextComponents.types` with:

```tsx
    image: ({ value }) => {
      const imageLayout = getBlogImageLayout(
        getPortableTextImageDimensions(value),
      )
      const imageUrl = urlFor(value)
        .width(imageLayout.sourceWidth)
        .auto('format')
        .url()
      if (!imageUrl) return null
      return (
        <figure className={`my-8 ${imageLayout.frameClassName}`}>
          <Image
            src={imageUrl}
            alt="Ilustracija u članku"
            width={imageLayout.width}
            height={imageLayout.height}
            sizes={imageLayout.sizes}
            className="h-auto w-full object-contain"
          />
        </figure>
      )
    },
```

Expected result: body images use the same source width, actual dimensions, `sizes`, portrait cap, landscape width, and aspect-ratio-preserving rendering as heading images. The only body-specific addition is `my-8` vertical spacing on the `figure`.

- [ ] **Step 2: Run the focused image tests**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
```

Expected result: PASS with 11 passing tests and 0 failing tests.

- [ ] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected result: PASS with no ESLint errors.

- [ ] **Step 4: Commit the implementation**

Run:

```bash
git add 'app/(public)/blog/[slug]/page.tsx'
git commit -m "fix: use adaptive layout for blog body images"
```

Expected result: a commit containing only the blog post page implementation change.

---

### Task 5: Verify The Blog Article Experience

**Files:**
- Verify: `app/(public)/blog/[slug]/page.tsx`
- Verify: `tests/blog-inline-image-sizing.test.mjs`
- Verify: `tests/blog-cover-image-sizing.test.mjs`

- [ ] **Step 1: Run all focused image tests**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
```

Expected result: PASS with 11 passing tests and 0 failing tests.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected result: PASS. The blog post page compiles with the projected body image dimensions and shared image layout helper.

- [ ] **Step 3: Start the local dev server**

Run:

```bash
npm run dev
```

Expected result: the Next.js development server starts and prints a local URL, usually `http://localhost:3000`.

- [ ] **Step 4: Manually verify a blog post with body images**

Open:

```text
http://localhost:3000/blog/da-svakako-ne-nikako
```

Expected result: the heading image and PortableText body images follow the same visual rules. Portrait images are centered and capped at `520px` on desktop. Landscape images use the full article width. Images keep their natural aspect ratio and do not crop.

- [ ] **Step 5: Manually verify a mobile viewport**

Open the same page at a mobile-sized viewport, around `390px` wide.

Expected result: heading and body images fit inside the viewport using `calc(100vw - 48px)`, keep their natural aspect ratio, and do not overflow horizontally.

---

## Self-Review

- Spec coverage: The plan implements the requested recommended approach: body images are handled the same as heading images by using the same metadata-driven layout helper, orientation rules, source width, `sizes`, and `next/image` dimension strategy.
- Placeholder scan: The plan contains concrete files, code snippets, commands, expected failures, expected passes, and commit messages.
- Type consistency: `ImageDimensions`, `BlogImageValue`, `getBlogImageLayout`, `getPortableTextImageDimensions`, `coverImageLayout`, and `imageLayout` are named consistently across tests and implementation steps.
