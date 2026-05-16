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

test('cover image dimensions cannot round down to zero', () => {
  assert.match(
    source,
    /Math\.max\(1,\s*Math\.round\(value\)\)/,
    'expected malformed fractional image dimensions to clamp to at least 1',
  )
})

test('cover image URL uses adaptive layout source width', () => {
  assert.match(
    source,
    /const coverImageLayout = getCoverImageLayout\(post\.coverImageDimensions\)/,
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
