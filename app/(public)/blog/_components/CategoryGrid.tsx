import Image from 'next/image'
import Link from 'next/link'

import type {CategoryCard} from './types'
import {SectionHeader} from './SectionHeader'

type CategoryGridProps = {
  categories: CategoryCard[]
}

export function CategoryGrid({categories}: CategoryGridProps) {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        title="Kategorije"
        subtitle="Četiri sloja kroz koje vodi Agile Onion iskustvo."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_18px_55px_-40px_rgba(0,0,0,0.85)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200/50 hover:bg-white/8 hover:shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
          >
            <div className="relative h-28 overflow-hidden rounded-2xl">
              <Image
                src={category.image}
                alt={`Ilustracija za ${category.title}`}
                fill
                sizes="(min-width: 1024px) 240px, 80vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/60" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-emerald-100">
                {category.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-200 transition-colors duration-300 group-hover:text-zinc-100">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
