import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Instagram,
  Link as LinkIcon,
  Share2,
  UserRound,
} from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { formatDate, getNewsDetailContent } from '@/lib/cms';
import { absoluteUrl, getNewsUrl } from '@/lib/seo';

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { news } = await getNewsDetailContent();

  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { news, newsDetailSection } = await getNewsDetailContent();
  const item = news.find((newsItem) => newsItem.slug === slug);

  if (!item) {
    return { title: newsDetailSection.notFoundTitle };
  }

  return {
    title: item.title,
    description: item.excerpt,
    alternates: {
      canonical: `/news/${item.slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      url: `/news/${item.slug}`,
      type: 'article',
      publishedTime: item.publishedAt,
      authors: [item.author],
      images: [{ url: item.images[0].src, alt: item.images[0].alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.excerpt,
      images: [item.images[0].src],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const { news, newsDetailSection, siteMetadata, siteSettings } =
    await getNewsDetailContent();

  const item = news.find((newsItem) => newsItem.slug === slug);

  if (!item) notFound();

  const relatedNews = news
    .filter((latest) => latest.slug !== item.slug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

  const latestNews = relatedNews.slice(0, 4);

  const moreNews = relatedNews.slice(4, 8).length
    ? relatedNews.slice(4, 8)
    : relatedNews.slice(0, 4);

  const heroImage = item.images[0];

  const articleUrl = getNewsUrl(item.slug, siteMetadata.metadataBase);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.excerpt,
    image: item.images.map((image) =>
      absoluteUrl(image.src, siteMetadata.metadataBase)
    ),
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    author: {
      '@type': 'Organization',
      name: item.author || siteSettings.siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteSettings.siteName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/hero-1.jpg', siteMetadata.metadataBase),
      },
    },
    mainEntityOfPage: articleUrl,
    inLanguage: siteMetadata.language,
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="relative min-h-screen overflow-hidden bg-[#f8f1e7] pt-28 pb-20 animate-page-enter">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(120,53,15,0.14),transparent_32%)]" />
          <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-200/20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.24),rgba(255,255,255,0.78)_48%,rgba(255,255,255,1))]" />
        </div>

        <article className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href={newsDetailSection.backHref}
              className="inline-flex text-sm font-semibold text-amber-800 transition hover:text-amber-950"
            >
              {newsDetailSection.backLabel}
            </Link>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <header className="max-w-4xl">
                <span className="inline-flex rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur">
                  {item.category}
                </span>

                <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
                  {item.title}
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
                  {item.excerpt}
                </p>
              </header>

              <aside className="hidden lg:block">
                <div className="rounded-[2rem] border border-amber-100 bg-white/80 p-5 shadow-[0_20px_60px_rgba(120,53,15,0.10)] backdrop-blur">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-neutral-950">
                      Latest News
                    </h2>

                    <Link
                      href="/news"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 hover:text-amber-900"
                    >
                      View all
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  <div className="space-y-5">
                    {latestNews.map((latest) => {
                      const latestImage = latest.images[0];

                      return (
                        <Link
                          key={latest.slug}
                          href={`/news/${latest.slug}`}
                          className="group grid grid-cols-[96px_minmax(0,1fr)] gap-4"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-2xl bg-amber-50">
                            <Image
                              src={latestImage.src}
                              alt={latestImage.alt || latest.title}
                              fill
                              sizes="96px"
                              className="object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-neutral-500">
                              <CalendarDays
                                size={13}
                                className="text-amber-700"
                              />
                              {formatDate(latest.publishedAt)}
                            </div>

                            <h3 className="line-clamp-2 text-sm font-bold leading-5 text-neutral-950 transition group-hover:text-amber-800">
                              {latest.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                              {latest.excerpt}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <section className="relative">
              <div className="relative overflow-hidden rounded-[2.25rem] bg-neutral-900 shadow-[0_32px_90px_rgba(120,53,15,0.16)]">
                <div className="relative aspect-[16/9] min-h-[360px]">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt || item.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                </div>
              </div>

              <div className="mt-5 text-center text-xs font-medium text-neutral-500">
                Picture by 2024 Getty Images
              </div>

              <div className="right-8 bottom-10 mt-6 w-full rounded-[1.75rem] border border-amber-100 bg-white/95 p-5 shadow-[0_24px_70px_rgba(23,23,23,0.16)] backdrop-blur lg:absolute lg:mt-0 lg:max-w-sm">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
                      <CalendarDays size={14} />
                      Published
                    </div>

                    <p className="text-sm font-semibold text-neutral-950">
                      {formatDate(item.publishedAt)}
                    </p>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
                      <UserRound size={14} />
                      Content
                    </div>

                    <p className="text-sm font-semibold text-neutral-950">
                      {item.author || 'Steda Team'}
                    </p>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
                      <Share2 size={14} />
                      Share
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        aria-label="Copy article link"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-800 transition hover:bg-amber-100"
                      >
                        <LinkIcon size={17} />
                      </button>

                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          articleUrl
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Share to Facebook"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-sm font-black text-amber-800 transition hover:bg-amber-100"
                      >
                        f
                      </Link>

                      <Link
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open Instagram"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-100 bg-amber-50 text-amber-800 transition hover:bg-amber-100"
                      >
                        <Instagram size={17} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <Reveal delay={200}>
              <section className="rounded-[2rem] border border-amber-100/80 bg-white/85 px-5 py-8 shadow-[0_22px_70px_rgba(120,53,15,0.08)] backdrop-blur sm:px-8 md:px-10 lg:px-12 lg:py-11">
                <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-amber-100 pb-6">
                  <span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-800 ring-1 ring-amber-100">
                    Article
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500">
                    <Clock3 size={15} className="text-amber-700" />
                    3 min read
                  </span>
                </div>

                <div className="prose prose-neutral max-w-none">
                  {item.content.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={`mb-7 text-base leading-8 text-neutral-700 last:mb-0 sm:text-lg sm:leading-9 ${
                        index === 0
                          ? 'first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-amber-800 sm:first-letter:text-6xl'
                          : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={300} className="lg:hidden">
              <aside className="rounded-[2rem] border border-amber-100 bg-white/85 p-5 shadow-[0_20px_60px_rgba(120,53,15,0.08)] backdrop-blur">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-neutral-950">
                    Latest News
                  </h2>

                  <Link
                    href="/news"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-700 hover:text-amber-900"
                  >
                    View all
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                <div className="space-y-5">
                  {latestNews.map((latest) => {
                    const latestImage = latest.images[0];

                    return (
                      <Link
                        key={latest.slug}
                        href={`/news/${latest.slug}`}
                        className="group grid grid-cols-[96px_minmax(0,1fr)] gap-4"
                      >
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-amber-50">
                          <Image
                            src={latestImage.src}
                            alt={latestImage.alt || latest.title}
                            fill
                            sizes="96px"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-neutral-500">
                            <CalendarDays
                              size={13}
                              className="text-amber-700"
                            />
                            {formatDate(latest.publishedAt)}
                          </div>

                          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-neutral-950 transition group-hover:text-amber-800">
                            {latest.title}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                            {latest.excerpt}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </aside>
            </Reveal>
          </div>

          {moreNews.length > 0 && (
            <Reveal as="section" delay={300} className="mt-20">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                    More News
                  </span>

                  <h2 className="mt-2 text-3xl font-bold text-neutral-950">
                    Read More Stories
                  </h2>
                </div>

                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900"
                >
                  Show More
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {moreNews.map((latest) => {
                  const latestImage = latest.images[0];

                  return (
                    <Link
                      key={latest.slug}
                      href={`/news/${latest.slug}`}
                      className="group overflow-hidden rounded-[1.75rem] border border-amber-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-amber-50">
                        <Image
                          src={latestImage.src}
                          alt={latestImage.alt || latest.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm backdrop-blur">
                          {latest.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
                          <CalendarDays size={14} className="text-amber-700" />
                          {formatDate(latest.publishedAt)}
                        </div>

                        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-neutral-950 transition group-hover:text-amber-800">
                          {latest.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                          {latest.excerpt}
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                          Read more
                          <ArrowUpRight
                            size={15}
                            className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Reveal>
          )}
        </article>
      </main>
    </>
  );
}
