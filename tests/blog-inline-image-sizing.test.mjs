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
