import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, UserRound } from 'lucide-react';
import { NewsGallery } from '@/components/news/news-gallery';
import { Reveal } from '@/components/reveal';
import { formatDate, getNewsBySlug } from '@/lib/cms';
import { absoluteUrl, getNewsUrl } from '@/lib/seo';
import { news, newsDetailSection, siteMetadata, siteSettings } from '@/lib/cms-data';

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

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
  const item = getNewsBySlug(slug);

  if (!item) notFound();

  const relatedNews = news
    .filter((related) => related.slug !== item.slug)
    .slice(0, newsDetailSection.relatedLimit);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.excerpt,
    image: item.images.map((image) => absoluteUrl(image.src)),
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
        url: absoluteUrl('/hero-1.jpg'),
      },
    },
    mainEntityOfPage: getNewsUrl(item.slug),
    inLanguage: siteMetadata.language,
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-b from-[#fff8ef] via-white to-white pt-28 pb-16 animate-page-enter">
        <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link href={newsDetailSection.backHref} className="mb-8 inline-flex text-sm font-semibold text-amber-700 hover:text-amber-800">
              {newsDetailSection.backLabel}
            </Link>
          </Reveal>

          <Reveal as="header" delay={100} className="mb-10 text-center">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              {item.category}
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-bold leading-tight text-neutral-950 md:text-5xl">
              {item.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
              {item.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} /> {formatDate(item.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <UserRound size={16} /> {item.author}
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <NewsGallery images={item.images} title={item.title} labels={newsDetailSection} />
          </Reveal>

          <Reveal delay={200} className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-amber-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="prose prose-neutral max-w-none">
              {item.content.map((paragraph) => (
                <p key={paragraph} className="mb-6 text-lg leading-9 text-neutral-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {relatedNews.length > 0 && (
            <Reveal as="section" delay={300} className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                {newsDetailSection.relatedHeading}
              </h2>
              <div className="grid gap-5 sm:grid-cols-3">
                {relatedNews.map((related) => (
                  <Link key={related.slug} href={`/news/${related.slug}`} className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                      {related.category}
                    </p>
                    <h3 className="mt-3 line-clamp-2 font-bold text-neutral-900">
                      {related.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                      {related.excerpt}
                    </p>
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
