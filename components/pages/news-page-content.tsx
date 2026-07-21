'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { formatDate } from '@/lib/date';
import type { NewsItem, NewsPageSection } from '@/lib/cms-types';

type NewsPageContentProps = {
  news: NewsItem[];
  newsCategories: string[];
  newsPageSection: NewsPageSection;
};

export function NewsPageContent({ news, newsCategories, newsPageSection }: NewsPageContentProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(newsPageSection.defaultCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    setCurrentPage(1);
  };

  const filteredNews = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return news.filter((item) => {
      const matchesCategory =
        activeCategory === newsPageSection.defaultCategory || item.category === activeCategory;
      const matchesSearch =
        !keyword ||
        `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, news, newsPageSection.defaultCategory, search]);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f3ec] to-[#f3ece2] pt-28 pb-16 animate-page-enter">
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
              aria-label={newsPageSection.searchPlaceholder}
              placeholder={newsPageSection.searchPlaceholder}
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="w-full rounded-full border border-amber-100 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </Reveal>

        <Reveal delay={150} className="mb-10 flex flex-wrap justify-center gap-3">
          {newsCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
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

        {paginatedNews.length > 0 ? (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedNews.map((item) => {
                const coverImage = item.images.find((image) => image.src) ?? {
                  src: '/hero-1.jpg',
                  alt: item.title,
                };

                return (
                  <Reveal
                    as="article"
                    key={item.id}
                    className="group overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link href={`/news/${item.slug}`} className="block">
                      <div className="relative h-60 w-full overflow-hidden">
                        <Image
                          src={coverImage.src}
                          alt={coverImage.alt}
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
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-700 transition hover:bg-amber-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`h-10 w-10 rounded-full font-semibold transition ${
                      currentPage === page
                        ? 'bg-amber-600 text-white'
                        : 'border border-amber-200 bg-white text-neutral-700 hover:bg-amber-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-700 transition hover:bg-amber-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <Reveal className="rounded-3xl border border-amber-100 bg-white p-10 text-center text-neutral-500 shadow-sm">
            {newsPageSection.emptyMessage}
          </Reveal>
        )}
      </div>
    </main>
  );
}
