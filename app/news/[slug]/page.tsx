import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { NewsGallery } from '@/components/news/news-gallery';
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

  const latestNews = news
    .filter((latest) => latest.slug !== item.slug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

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
    mainEntityOfPage: getNewsUrl(item.slug, siteMetadata.metadataBase),
    inLanguage: siteMetadata.language,
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="relative min-h-screen overflow-hidden bg-[#fbf6ee] pt-28 pb-20 animate-page-enter">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(120,53,15,0.12),transparent_32%)]" />
          <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.9)_45%,rgba(255,255,255,1))]" />
        </div>

        <article className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href={newsDetailSection.backHref}
              className="inline-flex text-sm font-semibold text-amber-800 transition hover:text-amber-950"
            >
              {newsDetailSection.backLabel}
            </Link>
          </Reveal>

          <Reveal
            as="header"
            delay={100}
            className="mx-auto mt-10 max-w-4xl text-center"
          >
            <span className="inline-flex rounded-full border border-amber-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur">
              {item.category}
            </span>

            <h1 className="mx-auto mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
              {item.title}
            </h1>

            <div className="mt-6 flex items-center justify-center text-sm font-medium text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} className="text-amber-700" />
                {formatDate(item.publishedAt)}
              </span>
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <div className="rounded-[2rem] bg-white/60 p-2 shadow-[0_24px_80px_rgba(120,53,15,0.12)] ring-1 ring-amber-100/80 backdrop-blur">
              <NewsGallery
                images={item.images}
                title={item.title}
                labels={newsDetailSection}
              />
            </div>
          </Reveal>

          <Reveal delay={200} className="mx-auto mt-14 max-w-3xl">
            <div className="border-l border-amber-200 pl-6 sm:pl-8">
              <div className="prose prose-neutral max-w-none">
                {item.content.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-7 text-lg leading-9 text-neutral-700 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {latestNews.length > 0 && (
            <Reveal as="section" delay={300} className="mt-20">
              <div className="mx-auto mb-8 max-w-4xl text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                  More Stories
                </span>

                <h2 className="mt-2 text-2xl font-bold text-neutral-950">
                  Latest News
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestNews.map((latest) => {
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
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />

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
