import Image from 'next/image'
import Link from 'next/link'

import type {PostCard} from './types'
import {SectionHeader} from './SectionHeader'

type PostGridProps = {
  posts: PostCard[]
  title?: string
  subtitle?: string
}

export function PostGrid({
  posts,
  title = 'Sve priče',
  subtitle = 'Svaka objava na jednom mestu, uredno posložena.',
}: PostGridProps) {
  return (
    <section className="flex flex-col gap-6" id="all-posts">
      <SectionHeader title={title} subtitle={subtitle} />

      {posts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/5 transition duration-200 hover:border-emerald-200/50"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={`Ilustracija za ${post.title}`}
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/70" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.14em] text-emerald-200 uppercase">
                  <span className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-3 py-1">
                    {post.categoryLabel}
                  </span>
                  {post.date && <span>{post.date}</span>}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {post.excerpt}
                  </p>
                </div>
                <span className="mt-auto text-sm font-semibold text-emerald-200">
                  Pročitaj {'->'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-200">
          Još nema objava za prikaz.
        </div>
      )}
    </section>
  )
}
