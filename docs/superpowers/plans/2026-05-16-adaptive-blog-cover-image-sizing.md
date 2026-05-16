# Adaptive Blog Cover Image Sizing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep portrait blog cover images from rendering as huge full-width headers while preserving full-width landscape covers.

**Architecture:** Fetch Sanity cover image dimensions with the blog post query, derive a small cover-image layout object in the blog slug page, and use that object to select image source width, rendered dimensions, `sizes`, and wrapper classes. Landscape covers keep the existing full article width; portrait covers render centered with a desktop max width of `520px` and natural aspect ratio.

**Tech Stack:** Next.js 15 App Router, React 19, Sanity GROQ image metadata, `next/image`, Tailwind CSS 4, Node built-in `node:test`.

---

## Scope Check

This is one focused rendering change on the blog post detail page. It affects only the top-level `coverImage` on `app/(public)/blog/[slug]/page.tsx`. It does not change inline PortableText image sizing, Sanity schemas, related post cards, OpenGraph image metadata, newsletter emails, or the blog index.

## File Structure

- Modify: `app/(public)/blog/[slug]/page.tsx`
  - Responsibility: Fetch cover image dimensions, detect portrait covers, and render portrait covers with a centered desktop cap while keeping landscape covers full width.
- Modify: `tests/blog-inline-image-sizing.test.mjs`
  - Responsibility: Rename the existing cover guard so it no longer claims every cover image remains full-width.
- Create: `tests/blog-cover-image-sizing.test.mjs`
  - Responsibility: Regression-check the adaptive cover image query, helper logic, classes, and `next/image` props.

---

### Task 1: Add Regression Tests For Adaptive Cover Images

**Files:**

- Modify: `tests/blog-inline-image-sizing.test.mjs`
- Create: `tests/blog-cover-image-sizing.test.mjs`

- [ ] **Step 1: Rename the existing cover guard**

In `tests/blog-inline-image-sizing.test.mjs`, replace the final test block with this exact block:

```js
test('cover image does not reuse the inline body image cap', () => {
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

- [ ] **Step 2: Create the failing adaptive cover test**

Create `tests/blog-cover-image-sizing.test.mjs` with this exact content:

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

test('portrait cover detection compares Sanity width and height', () => {
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

test('cover image layout caps portrait covers without capping landscape covers', () => {
  const layoutMatch = source.match(
    /const getCoverImageLayout = \([\s\S]*?\n\}\n\nconst portableTextComponents/,
  )
  const layout = layoutMatch?.[0] ?? ''

  assert.ok(layout, 'expected getCoverImageLayout helper in blog page')
  assert.match(
    layout,
    /max-w-\[520px\]/,
    'expected portrait cover frame to cap at 520px',
  )
  assert.match(
    layout,
    /\bmx-auto\b/,
    'expected portrait cover frame to be centered',
  )
  assert.match(
    layout,
    /: 'w-full'/,
    'expected landscape cover frame to stay full width',
  )
  assert.match(
    layout,
    /sourceWidth: isPortrait \? 900 : 1600/,
    'expected smaller Sanity transform width for portrait covers',
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
```

- [ ] **Step 3: Run the tests and verify the new test fails**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
```

Expected result: `tests/blog-inline-image-sizing.test.mjs` passes, and `tests/blog-cover-image-sizing.test.mjs` fails because the page does not yet fetch `coverImageDimensions` or render with `coverImageLayout`.

- [ ] **Step 4: Commit the failing tests**

```bash
git add tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
git commit -m "test: cover adaptive blog cover image sizing"
```

---

### Task 2: Implement Adaptive Cover Image Layout

**Files:**

- Modify: `app/(public)/blog/[slug]/page.tsx`
- Test: `tests/blog-cover-image-sizing.test.mjs`
- Test: `tests/blog-inline-image-sizing.test.mjs`

- [ ] **Step 1: Fetch Sanity cover image dimensions**

In `app/(public)/blog/[slug]/page.tsx`, change the post query section from:

```ts
  body,
  coverImage,
  author->{name, image}
```

to:

```ts
  body,
  coverImage,
  "coverImageDimensions": coverImage.asset->metadata.dimensions,
  author->{name, image}
```

- [ ] **Step 2: Add the cover image dimensions type**

In `app/(public)/blog/[slug]/page.tsx`, add this type immediately after the `Author` type:

```ts
type ImageDimensions = {
  width?: number | null
  height?: number | null
  aspectRatio?: number | null
}
```

Then change the `Post` type from:

```ts
  coverImage?: unknown
  author?: Author
```

to:

```ts
  coverImage?: unknown
  coverImageDimensions?: ImageDimensions | null
  author?: Author
```

- [ ] **Step 3: Add adaptive cover layout helpers**

In `app/(public)/blog/[slug]/page.tsx`, add these helpers immediately after `getFileUrl`:

```ts
const isPositiveNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0

const isPortraitImage = (dimensions?: ImageDimensions | null) => {
  const width = dimensions?.width
  const height = dimensions?.height

  return isPositiveNumber(width) && isPositiveNumber(height) && height > width
}

const getImageDimension = (value: unknown, fallback: number) =>
  isPositiveNumber(value) ? Math.round(value) : fallback

const getCoverImageLayout = (dimensions?: ImageDimensions | null) => {
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
```

- [ ] **Step 4: Use the layout when building the cover image URL**

In `BlogPostPage`, replace:

```ts
  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1600).auto('format').url()
    : null
```

with:

```ts
  const coverImageLayout = getCoverImageLayout(post.coverImageDimensions)
  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage)
        .width(coverImageLayout.sourceWidth)
        .auto('format')
        .url()
    : null
```

- [ ] **Step 5: Use the adaptive layout in the cover image JSX**

In `BlogPostPage`, replace the current cover block:

```tsx
          {coverImageUrl && (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)]">
              <Image
                src={coverImageUrl}
                alt={`Naslovna slika za ${post.title}`}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}
```

with:

```tsx
          {coverImageUrl && (
            <div className={coverImageLayout.frameClassName}>
              <Image
                src={coverImageUrl}
                alt={`Naslovna slika za ${post.title}`}
                width={coverImageLayout.width}
                height={coverImageLayout.height}
                sizes={coverImageLayout.sizes}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          )}
```

- [ ] **Step 6: Run the regression tests and verify they pass**

Run:

```bash
node --test tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
```

Expected result: all tests pass.

- [ ] **Step 7: Commit the implementation**

```bash
git add 'app/(public)/blog/[slug]/page.tsx' tests/blog-inline-image-sizing.test.mjs tests/blog-cover-image-sizing.test.mjs
git commit -m "fix: cap portrait blog cover images"
```

---

### Task 3: Verify Build And Browser Behavior

**Files:**

- No additional file changes.

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected result: ESLint exits with code `0`.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected result: Next.js build exits with code `0`.

- [ ] **Step 3: Start the dev server**

Run:

```bash
npm run dev
```

Expected result: Next.js starts locally and prints a localhost URL, usually `http://localhost:3000`.

- [ ] **Step 4: Verify a portrait-cover post**

Open the affected blog post with a portrait cover image in the browser.

Expected result on desktop: the cover image below the article header is centered, no wider than `520px`, and keeps its full portrait composition.

Expected result on mobile around `390px` wide: the cover image uses the available content width, does not overflow horizontally, and keeps its natural aspect ratio.

- [ ] **Step 5: Verify a landscape-cover post**

Open a blog post with a landscape cover image in the browser.

Expected result on desktop: the cover image remains full article width inside the existing rounded frame.

Expected result on mobile around `390px` wide: the cover image stays responsive, does not overflow horizontally, and keeps its natural aspect ratio.

- [ ] **Step 6: Stop the dev server**

Stop the dev server with `Ctrl+C`.

Expected result: the terminal returns to the shell prompt.

---

## Self-Review

- Spec coverage: Task 2 fetches dimensions, detects portrait covers, caps portrait covers at `520px`, keeps landscape covers full-width, preserves natural aspect ratio, and leaves inline body images unchanged.
- Placeholder scan: No placeholder terms or deferred implementation details remain.
- Type consistency: `ImageDimensions`, `isPortraitImage`, `getCoverImageLayout`, `coverImageLayout.sourceWidth`, `coverImageLayout.width`, `coverImageLayout.height`, `coverImageLayout.sizes`, and `coverImageLayout.frameClassName` are named consistently across tests and implementation steps.
