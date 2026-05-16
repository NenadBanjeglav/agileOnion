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
    /const imageLayout = getBlogImageLayout\(\s*getPortableTextImageDimensions\(value\),?\s*\)/,
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
