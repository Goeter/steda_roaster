import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { NewsGallery } from '@/components/news/news-gallery';
import { Reveal } from '@/components/reveal';
import { getNewsDetailContent } from '@/lib/cms';
import { formatDate } from '@/lib/date';
import { absoluteUrl, getBreadcrumbJsonLd, getNewsUrl, getSafeTimestamp } from '@/lib/seo';

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

  const coverImage = item.seo?.image || item.images.find((image) => image.src) || {
    src: '/hero-1.jpg',
    alt: item.title,
  };

  return {
    title: item.seo?.title || item.title,
    description: item.seo?.description || item.excerpt,
    alternates: {
      canonical: `/news/${item.slug}`,
    },
    openGraph: {
      title: item.seo?.title || item.title,
      description: item.seo?.description || item.excerpt,
      url: `/news/${item.slug}`,
      type: 'article',
      publishedTime: item.publishedAt,
      authors: [item.author],
      images: [{ url: coverImage.src, alt: coverImage.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.seo?.title || item.title,
      description: item.seo?.description || item.excerpt,
      images: [coverImage.src],
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
      (a, b) => getSafeTimestamp(b.publishedAt) - getSafeTimestamp(a.publishedAt)
    )
    .slice(0, newsDetailSection.relatedLimit);

  const articleImages = item.images.filter((image) => image.src);
  const safeArticleImages = articleImages.length > 0 ? articleImages : [{ src: '/hero-1.jpg', alt: item.title }];
  const articleUrl = String(getNewsUrl(item.slug, siteMetadata.metadataBase));

  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', href: '/' },
      { name: 'News', href: '/news' },
      { name: item.title, href: `/news/${item.slug}` },
    ],
    siteMetadata.metadataBase,
  );

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.excerpt,
    image: safeArticleImages.map((image) =>
      absoluteUrl(image.src, siteMetadata.metadataBase),
    ),
    datePublished: item.publishedAt,
    dateModified: item.updatedAt || item.publishedAt,
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="relative min-h-screen overflow-hidden bg-[#ede8de] pt-24 pb-20 animate-page-enter">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#f7f0e4_0%,#ede5d4_30%,#e5dac8_60%,#ede8de_100%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_0%,rgba(217,165,80,0.16),transparent_60%),radial-gradient(ellipse_50%_40%_at_90%_10%,rgba(160,100,40,0.10),transparent_55%),radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(180,140,80,0.08),transparent_60%)]" />

          <div className="absolute -left-24 top-10 h-[560px] w-[560px] rounded-full bg-amber-300/20 blur-[140px]" />
          <div className="absolute -right-20 top-32 h-[420px] w-[420px] rounded-full bg-orange-200/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-200/25 blur-[100px]" />

          <div className="absolute inset-0 bg-[radial-gradient(rgba(101,67,33,0.07)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

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
              <span className="rounded-full bg-amber-100/70 px-3 py-1 text-xs font-semibold tracking-wide text-amber-800 ring-1 ring-amber-300/40">
                {item.category}
              </span>

              <span className="h-5 w-px bg-neutral-300" />

              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} className="text-amber-700" />
                {formatDate(item.publishedAt)}
              </span>
            </div>
          </Reveal>

          {/* Gallery */}
          <Reveal delay={150} className="mt-10">
            <section className="overflow-hidden rounded-[1.75rem]">
              <NewsGallery
                images={safeArticleImages}
                title={item.title}
                labels={newsDetailSection}
              />
            </section>
          </Reveal>

          {/* Content */}
          <Reveal delay={200} className="mt-16">
            <section className="mx-auto max-w-6xl">
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

          {/* Latest News */}
          {latestNews.length > 0 && (
            <Reveal as="section" delay={300} className="mt-24">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-950">
                    {newsDetailSection.relatedHeading}
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    {newsDetailSection.relatedDescription}
                  </p>
                </div>

                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 transition hover:text-amber-900"
                >
                  {newsDetailSection.viewAllLabel}
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestNews.map((latest) => {
                  const latestImage = latest.images.find((image) => image.src) ?? {
                    src: '/hero-1.jpg',
                    alt: latest.title,
                  };
                  return (
                    <Link
                      key={latest.slug}
                      href={`/news/${latest.slug}`}
                      className="group overflow-hidden rounded-2xl bg-[#fffdf8]/60 shadow-[0_12px_38px_rgba(120,53,15,0.06)] ring-1 ring-white/45 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-[#fffdf8]/85 hover:shadow-[0_18px_52px_rgba(120,53,15,0.09)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                        <Image
                          src={latestImage.src}
                          alt={latestImage.alt || latest.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm ring-1 ring-amber-300/25 backdrop-blur">
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

                        <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                          {newsDetailSection.readMoreLabel}
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
