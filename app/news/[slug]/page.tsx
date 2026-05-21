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

      <main className="min-h-screen bg-white pt-24 pb-20 animate-page-enter">
        <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
              <span className="font-semibold text-amber-700">
                {item.category}
              </span>

              <span className="h-5 w-px bg-neutral-300" />

              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                {readingTime}
              </span>
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-10">
            <section>
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200">
                <NewsGallery
                  images={item.images}
                  title={item.title}
                  labels={newsDetailSection}
                />
              </div>
            </section>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <Reveal delay={200}>
              <section className="max-w-none">
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
                <div className="space-y-10">
                  <section className="space-y-6">
                    <div>
                      <div className="mb-2 text-sm font-medium text-neutral-500">
                        Published
                      </div>

                      <p className="text-base font-bold text-neutral-950">
                        {formatDate(item.publishedAt)}
                      </p>
                    </div>

                    <div>
                      <div className="mb-2 text-sm font-medium text-neutral-500">
                        Content
                      </div>

                      <p className="text-base font-bold text-neutral-950">
                        {item.author || 'Steda Team'}
                      </p>
                    </div>

                    <div>
                      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-neutral-500">
                        <Share2 size={15} />
                        Share
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={articleUrl}
                          aria-label="Open article link"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-950 transition hover:bg-neutral-100 hover:text-amber-700"
                        >
                          <LinkIcon size={17} />
                        </Link>

                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            articleUrl
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Share to Facebook"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-neutral-950 transition hover:bg-neutral-100 hover:text-amber-700"
                        >
                          f
                        </Link>

                        <Link
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open Instagram"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-950 transition hover:bg-neutral-100 hover:text-amber-700"
                        >
                          <Instagram size={17} />
                        </Link>
                      </div>
                    </div>
                  </section>

                  {latestNews.length > 0 && (
                    <section>
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-neutral-950">
                          Latest News
                        </h2>

                        <Link
                          href="/news"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition hover:text-amber-900"
                        >
                          View all
                          <ArrowUpRight size={15} />
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
                              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100 shadow-sm">
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
                                    size={14}
                                    className="text-amber-700"
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
                      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
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
