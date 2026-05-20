'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { formatDate } from '@/lib/cms';
import type { NewsItem, NewsPageSection } from '@/lib/cms-types';

type NewsPageContentProps = {
  news: NewsItem[];
  newsCategories: string[];
  newsPageSection: NewsPageSection;
};

export function NewsPageContent({ news, newsCategories, newsPageSection }: NewsPageContentProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(newsPageSection.defaultCategory);

  const filteredNews = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return news.filter((item) => {
      const matchesCategory = activeCategory === newsPageSection.defaultCategory || item.category === activeCategory;
      const matchesSearch = !keyword || `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#fdf8f3] to-white pt-28 pb-16 animate-page-enter">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal as="header" className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              {newsPageSection.eyebrow}
            </p>
            <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">
              {newsPageSection.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              {newsPageSection.description}
            </p>
          </Reveal>

          <Reveal delay={100} className="mx-auto mb-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder={newsPageSection.searchPlaceholder}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-full border border-amber-100 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="mb-10 flex flex-wrap justify-center gap-3">
            {newsCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'border border-amber-100 bg-white text-neutral-700 hover:bg-amber-50'
                }`}
              >
                {category}
              </button>
            ))}
          </Reveal>

          {filteredNews.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item) => (
                <Reveal as="article" key={item.id} className="group overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <Link href={`/news/${item.slug}`} className="block">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={item.images[0].src}
                        alt={item.images[0].alt}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-neutral-500">
                        {formatDate(item.publishedAt)} • {item.author}
                      </p>
                      <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-snug text-neutral-900">
                        {item.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                        {item.excerpt}
                      </p>
                      <span className="mt-5 inline-flex font-semibold text-amber-700">
                        {newsPageSection.readMoreLabel}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="rounded-3xl border border-amber-100 bg-white p-10 text-center text-neutral-500 shadow-sm">
              {newsPageSection.emptyMessage}
            </Reveal>
          )}
        </div>
      </main>
    </>
  );
}
