import Image from 'next/image'
import Link from 'next/link'

import type { PostCard } from './types'
import { SectionHeader } from './SectionHeader'

type FeaturedPostsProps = {
  heroPost?: PostCard
  sidePosts: PostCard[]
}

export function FeaturedPosts({ heroPost, sidePosts }: FeaturedPostsProps) {
  return (
    <section className="flex flex-col gap-8">
      <SectionHeader
        title="Najnovije priče"
        subtitle="Najsvežiji tekstovi iz svih kategorija, urednički odabrani."
      />

      {heroPost ? (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <Link
            href={`/blog/${heroPost.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/5 transition duration-200 hover:border-emerald-200/50"
          >
            <div className="relative h-72 w-full overflow-hidden sm:h-96">
              <Image
                src={heroPost.image}
                alt={`Ilustracija za ${heroPost.title}`}
                fill
                sizes="(min-width: 1024px) 720px, 90vw"
                className="object-cover transition duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/70" />
            </div>

            <div className="flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.14em] text-emerald-200 uppercase">
                <span className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-3 py-1">
                  {heroPost.categoryLabel}
                </span>
                {heroPost.date && <span>{heroPost.date}</span>}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                  {heroPost.title}
                </h3>
                <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
                  {heroPost.excerpt}
                </p>
              </div>
              <span className="text-sm font-semibold text-emerald-200">
                Pročitaj celu priču {'->'}
              </span>
            </div>
          </Link>

          <div className="flex flex-col gap-4">
            {sidePosts.length ? (
              sidePosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.8)] transition duration-200 hover:border-emerald-200/50"
                >
                  <div
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl"
                    style={{ position: 'relative' }}
                  >
                    <Image
                      src={post.image}
                      alt={`Ilustracija za ${post.title}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold tracking-[0.14em] text-emerald-200 uppercase">
                        {post.categoryLabel}
                      </span>
                      <h3 className="text-base font-semibold text-white">
                        {post.title}
                      </h3>
                    </div>
                    {post.date && (
                      <span className="text-xs text-zinc-300">{post.date}</span>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-200">
                Još nema dovoljno objava za listu sa strane.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-200">
          Prvi tekstovi stižu uskoro.
        </div>
      )}
    </section>
  )
}
