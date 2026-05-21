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
} from 'lucide-react';
import { NewsGallery } from '@/components/news/news-gallery';
import { Reveal } from '@/components/reveal';
import { formatDate, getNewsDetailContent } from '@/lib/cms';
import { absoluteUrl, getNewsUrl } from '@/lib/seo';

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function getReadingTime(content: string[]) {
  const wordsPerMinute = 200;

  const wordCount = content
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} minute read`;
}

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

  const latestNews = relatedNews.slice(0, 3);

  const moreNews = relatedNews.slice(3, 7).length
    ? relatedNews.slice(3, 7)
    : relatedNews.slice(0, 4);

  const articleUrl = String(getNewsUrl(item.slug, siteMetadata.metadataBase));
  const readingTime = getReadingTime(item.content);

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

      <main className="relative min-h-screen overflow-hidden bg-[#ede8de] pt-24 pb-20 animate-page-enter">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#f7f0e4_0%,#ede5d4_30%,#e5dac8_60%,#ede8de_100%)]" />

          {/* Radial overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_0%,rgba(217,165,80,0.16),transparent_60%),radial-gradient(ellipse_50%_40%_at_90%_10%,rgba(160,100,40,0.10),transparent_55%),radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(180,140,80,0.08),transparent_60%)]" />

          {/* Soft blobs */}
          <div className="absolute -left-24 top-10 h-[560px] w-[560px] rounded-full bg-amber-300/20 blur-[140px]" />
          <div className="absolute -right-20 top-32 h-[420px] w-[420px] rounded-full bg-orange-200/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-200/25 blur-[100px]" />

          {/* Subtle dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(101,67,33,0.07)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />

          {/* Top border line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#ede8de]/80 to-transparent" />
        </div>

        <article className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal
            as="header"
            delay={100}
            className="mx-auto max-w-6xl text-center"
          >
            <h1 className="mx-auto max-w-6xl text-balance text-4xl font-bold leading-[1.12] tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
              {item.title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
              {item.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-neutral-500">
              <span className="rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold tracking-wide text-amber-800 ring-1 ring-amber-300/50">
                {item.category}
              </span>

              <span className="h-5 w-px bg-neutral-300" />

              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                {readingTime}
              </span>
            </div>
          </Reveal>

          {/* Gallery */}
          <Reveal delay={150} className="mt-10">
            <section className="overflow-hidden rounded-2xl shadow-lg shadow-amber-900/10 ring-1 ring-amber-900/8">
              <NewsGallery
                images={item.images}
                title={item.title}
                labels={newsDetailSection}
              />
            </section>
          </Reveal>

          {/* Content + Sidebar */}
          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <Reveal delay={200}>
              <section className="max-w-none rounded-[2rem] bg-[#fffdf8]/70 p-6 shadow-sm shadow-amber-900/8 ring-1 ring-amber-900/6 backdrop-blur-md sm:p-8 lg:bg-[#fffdf8]/60">
                <div className="prose prose-neutral max-w-none">
                  {item.content.map((paragraph, index) => (
                    <p
                      key={`${paragraph}-${index}`}
                      className="mb-6 text-base leading-8 text-neutral-800 last:mb-0 sm:text-lg sm:leading-9"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={300}>
              <aside className="lg:sticky lg:top-28">
                <div className="space-y-10 rounded-[2rem] bg-[#fffdf8]/70 p-6 shadow-sm shadow-amber-900/8 ring-1 ring-amber-900/6 backdrop-blur-md lg:bg-[#fffdf8]/60">
                  <section className="space-y-6">
                    <div>
                      <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700/70">
                        Published
                      </div>

                      <p className="text-base font-bold text-neutral-950">
                        {formatDate(item.publishedAt)}
                      </p>
                    </div>

                    <div>
                      <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700/70">
                        Content
                      </div>

                      <p className="text-base font-bold text-neutral-950">
                        {item.author || 'Steda Team'}
                      </p>
                    </div>

                    <div>
                      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700/70">
                        <Share2 size={14} />
                        Share
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={articleUrl}
                          aria-label="Open article link"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-neutral-700 ring-1 ring-amber-900/10 transition hover:bg-white hover:text-amber-700 hover:ring-amber-400/40"
                        >
                          <LinkIcon size={16} />
                        </Link>

                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            articleUrl
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Share to Facebook"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-sm font-black text-neutral-700 ring-1 ring-amber-900/10 transition hover:bg-white hover:text-amber-700 hover:ring-amber-400/40"
                        >
                          f
                        </Link>

                        <Link
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open Instagram"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-neutral-700 ring-1 ring-amber-900/10 transition hover:bg-white hover:text-amber-700 hover:ring-amber-400/40"
                        >
                          <Instagram size={16} />
                        </Link>
                      </div>
                    </div>
                  </section>

                  {latestNews.length > 0 && (
                    <section>
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-950">
                          Latest News
                        </h2>

                        <Link
                          href="/news"
                          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-amber-700 transition hover:text-amber-900"
                        >
                          View all
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>

                      <div className="space-y-7">
                        {latestNews.map((latest) => {
                          const latestImage = latest.images[0];
                          const latestReadingTime = getReadingTime(
                            latest.content
                          );

                          return (
                            <Link
                              key={latest.slug}
                              href={`/news/${latest.slug}`}
                              className="group block"
                            >
                              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 shadow-sm shadow-amber-900/10 ring-1 ring-amber-900/6">
                                <Image
                                  src={latestImage.src}
                                  alt={latestImage.alt || latest.title}
                                  fill
                                  sizes="340px"
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                              </div>

                              <div className="mt-3">
                                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-neutral-500">
                                  <CalendarDays
                                    size={13}
                                    className="text-amber-600"
                                  />
                                  {formatDate(latest.publishedAt)}
                                </div>

                                <h3 className="line-clamp-2 text-base font-bold leading-6 text-neutral-950 transition group-hover:text-amber-800">
                                  {latest.title}
                                </h3>

                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                                  {latest.excerpt}
                                </p>

                                <div className="mt-3 flex items-center gap-3 text-xs font-medium text-neutral-500">
                                  <span className="font-semibold text-amber-700">
                                    {latest.category}
                                  </span>

                                  <span className="h-4 w-px bg-neutral-300" />

                                  <span>{latestReadingTime}</span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </section>
                  )}
                </div>
              </aside>
            </Reveal>
          </div>

          {/* More News */}
          {moreNews.length > 0 && (
            <Reveal as="section" delay={400} className="mt-24">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-950">
                    More News
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Explore more stories and updates.
                  </p>
                </div>

                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 transition hover:text-amber-900"
                >
                  Show More News
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {moreNews.map((latest) => {
                  const latestImage = latest.images[0];
                  const latestReadingTime = getReadingTime(latest.content);

                  return (
                    <Link
                      key={latest.slug}
                      href={`/news/${latest.slug}`}
                      className="group overflow-hidden rounded-2xl bg-[#fffdf8]/75 shadow-sm shadow-amber-900/10 ring-1 ring-amber-900/8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-[#fffdf8]/95 hover:shadow-lg hover:shadow-amber-900/12"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                        <Image
                          src={latestImage.src}
                          alt={latestImage.alt || latest.title}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm ring-1 ring-amber-300/30 backdrop-blur">
                          {latest.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
                          <CalendarDays size={13} className="text-amber-600" />
                          {formatDate(latest.publishedAt)}
                        </div>

                        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-neutral-950 transition group-hover:text-amber-800">
                          {latest.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                          {latest.excerpt}
                        </p>

                        <div className="mt-4 flex items-center gap-3 text-xs font-medium text-neutral-500">
                          <span className="font-semibold text-amber-700">
                            {latest.category}
                          </span>

                          <span className="h-4 w-px bg-neutral-300" />

                          <span>{latestReadingTime}</span>
                        </div>

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
