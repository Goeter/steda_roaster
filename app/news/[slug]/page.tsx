import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
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

      <main className="relative min-h-screen overflow-hidden bg-[#fffaf3] pt-28 pb-16 animate-page-enter">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="absolute right-[-8%] top-72 h-80 w-80 rounded-full bg-orange-200/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-100/40 blur-3xl" />
        </div>

        <article className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href={newsDetailSection.backHref}
              className="mb-8 inline-flex rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur transition hover:-translate-x-1 hover:border-amber-300 hover:bg-amber-50"
            >
              {newsDetailSection.backLabel}
            </Link>
          </Reveal>

          <Reveal
            as="header"
            delay={100}
            className="mb-10 rounded-[2rem] border border-amber-100 bg-white/75 px-5 py-10 text-center shadow-sm backdrop-blur sm:px-10 sm:py-12"
          >
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm">
              {item.category}
            </span>

            <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
              {item.title}
            </h1>

            <div className="mt-6 flex items-center justify-center text-sm font-medium text-neutral-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-white/80 px-4 py-2 shadow-sm">
                <CalendarDays size={16} className="text-amber-700" />
                {formatDate(item.publishedAt)}
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="overflow-hidden rounded-[2rem] border border-amber-100 bg-white/80 p-3 shadow-sm backdrop-blur sm:p-4">
              <NewsGallery
                images={item.images}
                title={item.title}
                labels={newsDetailSection}
              />
            </div>
          </Reveal>

          <Reveal
            delay={200}
            className="mt-12 rounded-[2rem] border border-amber-100 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-10"
          >
            <div className="prose prose-neutral max-w-none">
              {item.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-6 text-lg leading-9 text-neutral-700 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {latestNews.length > 0 && (
            <Reveal as="section" delay={300} className="mt-16">
              <div className="mb-6 text-left">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                  More Stories
                </span>

                <h2 className="mt-2 text-2xl font-bold text-neutral-950">
                  Latest News
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {latestNews.map((latest) => (
                  <Link
                    key={latest.slug}
                    href={`/news/${latest.slug}`}
                    className="group rounded-3xl border border-amber-100 bg-white/85 p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                      {latest.category}
                    </p>

                    <h3 className="mt-3 line-clamp-2 font-bold leading-6 text-neutral-950 transition group-hover:text-amber-800">
                      {latest.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                      {latest.excerpt}
                    </p>

                    <div className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.16em] text-amber-700 transition group-hover:translate-x-1">
                      Read more
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </article>
      </main>
    </>
  );
}
