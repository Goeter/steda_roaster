import { unstable_cache } from 'next/cache';
import {
  aboutPageSection as fallbackAboutPageSection,
  aboutSection as fallbackAboutSection,
  benefitsSection as fallbackBenefitsSection,
  distributionSection as fallbackDistributionSection,
  faqCategories as fallbackFaqCategories,
  faqHomeSection as fallbackFaqHomeSection,
  faqPageSection as fallbackFaqPageSection,
  footerSection as fallbackFooterSection,
  heroSection as fallbackHeroSection,
  news as fallbackNews,
  newsCategories as fallbackNewsCategories,
  newsDetailSection as fallbackNewsDetailSection,
  newsPageSection as fallbackNewsPageSection,
  productDetailSection as fallbackProductDetailSection,
  productPageSection as fallbackProductPageSection,
  productSection as fallbackProductSection,
  products as fallbackProducts,
  siteMetadata as fallbackSiteMetadata,
  siteSettings as fallbackSiteSettings,
  testimonies as fallbackTestimonies,
  testimoniesSection as fallbackTestimoniesSection,
} from './cms-data';
import type {
  AboutPageSection,
  AboutSection,
  BenefitsSection,
  DistributionSection,
  FAQCategory,
  FAQHomeSection,
  FAQItem,
  FAQPageSection,
  FooterSection,
  HeroSection,
  NewsDetailSection,
  NewsItem,
  NewsPageSection,
  Product,
  ProductDetailSection,
  ProductPageSection,
  ProductSection,
  SiteMetadata,
  SiteSettings,
  TestimoniesSection,
  Testimony,
} from './cms-types';

export const CMS_TAGS = {
  all: 'cms:all',
  layout: 'cms:layout',
  home: 'cms:home',
  about: 'cms:about',
  products: 'cms:products',
  productDetail: 'cms:product-detail',
  faqs: 'cms:faqs',
  news: 'cms:news',
  newsDetail: 'cms:news-detail',
  seo: 'cms:seo',
} as const;

const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;
const DEFAULT_CMS_FETCH_TIMEOUT_MS = 15_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeWithFallback<T>(fallback: T, data: unknown): T {
  if (Array.isArray(fallback)) {
    return Array.isArray(data) ? (data as T) : fallback;
  }

  if (isRecord(fallback)) {
    if (!isRecord(data)) return fallback;

    return Object.fromEntries(
      Object.entries(fallback).map(([key, fallbackValue]) => [
        key,
        mergeWithFallback(fallbackValue, data[key]),
      ]),
    ) as T;
  }

  return data === undefined || data === null ? fallback : (data as T);
}

function getCmsBaseUrl() {
  return process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || '';
}

function getRevalidateSeconds() {
  const value = Number(process.env.CMS_REVALIDATE_SECONDS);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_REVALIDATE_SECONDS;
}

function getCmsFetchTimeoutMs() {
  const value = Number(process.env.CMS_FETCH_TIMEOUT_MS);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_CMS_FETCH_TIMEOUT_MS;
}

async function fetchFromCms<T>(path: string, fallback: T, tags: string[]): Promise<T> {
  const baseUrl = getCmsBaseUrl();

  if (!baseUrl) return fallback;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, {
      headers: {
        Accept: 'application/json',
        ...(process.env.CMS_READ_TOKEN
          ? { Authorization: `Bearer ${process.env.CMS_READ_TOKEN}` }
          : {}),
      },
      next: {
        revalidate: getRevalidateSeconds(),
        tags: [CMS_TAGS.all, ...tags],
      },
      signal: AbortSignal.timeout(getCmsFetchTimeoutMs()),
    });

    if (!response.ok) {
      console.warn(`[cms] ${path} returned ${response.status}. Using fallback data.`);
      return fallback;
    }

    return mergeWithFallback(fallback, await response.json());
  } catch (error) {
    console.warn(`[cms] Failed to fetch ${path}. Using fallback data.`, error);
    return fallback;
  }
}

export type LayoutContent = {
  siteSettings: SiteSettings;
  siteMetadata: SiteMetadata;
  footerSection: FooterSection;
};

export type HomeContent = {
  heroSection: HeroSection;
  aboutSection: AboutSection;
  productSection: ProductSection;
  productPageSection: ProductPageSection;
  benefitsSection: BenefitsSection;
  distributionSection: DistributionSection;
  testimoniesSection: TestimoniesSection;
  testimonies: Testimony[];
  faqHomeSection: FAQHomeSection;
  faqs: FAQItem[];
  products: Product[];
};

export type AboutContent = {
  aboutPageSection: AboutPageSection;
  aboutSection: AboutSection;
  benefitsSection: BenefitsSection;
  testimoniesSection: TestimoniesSection;
  testimonies: Testimony[];
};

export type ProductsContent = {
  productPageSection: ProductPageSection;
  productSection: ProductSection;
  products: Product[];
  siteSettings: SiteSettings;
};

export type ProductDetailContent = {
  productDetailSection: ProductDetailSection;
  products: Product[];
  siteSettings: SiteSettings;
  siteMetadata: SiteMetadata;
};

export type FAQsContent = {
  faqCategories: FAQCategory[];
  faqPageSection: FAQPageSection;
  siteSettings: SiteSettings;
  siteMetadata: SiteMetadata;
};

export type NewsContent = {
  news: NewsItem[];
  newsCategories: string[];
  newsPageSection: NewsPageSection;
  siteMetadata: SiteMetadata;
};

export type NewsDetailContent = {
  news: NewsItem[];
  newsDetailSection: NewsDetailSection;
  siteSettings: SiteSettings;
  siteMetadata: SiteMetadata;
};

export const getLayoutContent = unstable_cache(
  () =>
    fetchFromCms<LayoutContent>(
      '/api/layout',
      {
        siteSettings: fallbackSiteSettings,
        siteMetadata: fallbackSiteMetadata,
        footerSection: fallbackFooterSection,
      },
      [CMS_TAGS.layout, CMS_TAGS.seo],
    ),
  ['cms-layout'],
  { tags: [CMS_TAGS.all, CMS_TAGS.layout, CMS_TAGS.seo], revalidate: getRevalidateSeconds() },
);

export const getHomeContent = unstable_cache(
  () =>
    fetchFromCms<HomeContent>(
      '/api/home',
      {
        heroSection: fallbackHeroSection,
        aboutSection: fallbackAboutSection,
        productSection: fallbackProductSection,
        productPageSection: fallbackProductPageSection,
        benefitsSection: fallbackBenefitsSection,
        distributionSection: fallbackDistributionSection,
        testimoniesSection: fallbackTestimoniesSection,
        testimonies: fallbackTestimonies,
        faqHomeSection: fallbackFaqHomeSection,
        faqs: fallbackFaqCategories.flatMap((category) => category.faqs),
        products: fallbackProducts,
      },
      [CMS_TAGS.home, CMS_TAGS.products, CMS_TAGS.faqs],
    ),
  ['cms-home'],
  { tags: [CMS_TAGS.all, CMS_TAGS.home, CMS_TAGS.products, CMS_TAGS.faqs], revalidate: getRevalidateSeconds() },
);

export const getAboutContent = unstable_cache(
  () =>
    fetchFromCms<AboutContent>(
      '/api/about',
      {
        aboutPageSection: fallbackAboutPageSection,
        aboutSection: fallbackAboutSection,
        benefitsSection: fallbackBenefitsSection,
        testimoniesSection: fallbackTestimoniesSection,
        testimonies: fallbackTestimonies,
      },
      [CMS_TAGS.about],
    ),
  ['cms-about'],
  { tags: [CMS_TAGS.all, CMS_TAGS.about], revalidate: getRevalidateSeconds() },
);

export const getProductsContent = unstable_cache(
  () =>
    fetchFromCms<ProductsContent>(
      '/api/products-page',
      {
        productPageSection: fallbackProductPageSection,
        productSection: fallbackProductSection,
        products: fallbackProducts,
        siteSettings: fallbackSiteSettings,
      },
      [CMS_TAGS.products],
    ),
  ['cms-products-page'],
  { tags: [CMS_TAGS.all, CMS_TAGS.products], revalidate: getRevalidateSeconds() },
);

export const getProductDetailContent = unstable_cache(
  () =>
    fetchFromCms<ProductDetailContent>(
      '/api/product-detail',
      {
        productDetailSection: fallbackProductDetailSection,
        products: fallbackProducts,
        siteSettings: fallbackSiteSettings,
        siteMetadata: fallbackSiteMetadata,
      },
      [CMS_TAGS.products, CMS_TAGS.productDetail, CMS_TAGS.seo],
    ),
  ['cms-product-detail'],
  { tags: [CMS_TAGS.all, CMS_TAGS.products, CMS_TAGS.productDetail, CMS_TAGS.seo], revalidate: getRevalidateSeconds() },
);

export const getFAQsContent = unstable_cache(
  () =>
    fetchFromCms<FAQsContent>(
      '/api/faqs',
      {
        faqCategories: fallbackFaqCategories,
        faqPageSection: fallbackFaqPageSection,
        siteSettings: fallbackSiteSettings,
        siteMetadata: fallbackSiteMetadata,
      },
      [CMS_TAGS.faqs, CMS_TAGS.seo],
    ),
  ['cms-faqs'],
  { tags: [CMS_TAGS.all, CMS_TAGS.faqs, CMS_TAGS.seo], revalidate: getRevalidateSeconds() },
);

export const getNewsContent = unstable_cache(
  () =>
    fetchFromCms<NewsContent>(
      '/api/news-page',
      {
        news: fallbackNews,
        newsCategories: fallbackNewsCategories,
        newsPageSection: fallbackNewsPageSection,
        siteMetadata: fallbackSiteMetadata,
      },
      [CMS_TAGS.news, CMS_TAGS.seo],
    ),
  ['cms-news-page'],
  { tags: [CMS_TAGS.all, CMS_TAGS.news, CMS_TAGS.seo], revalidate: getRevalidateSeconds() },
);

export const getNewsDetailContent = unstable_cache(
  () =>
    fetchFromCms<NewsDetailContent>(
      '/api/news-detail',
      {
        news: fallbackNews,
        newsDetailSection: fallbackNewsDetailSection,
        siteSettings: fallbackSiteSettings,
        siteMetadata: fallbackSiteMetadata,
      },
      [CMS_TAGS.news, CMS_TAGS.newsDetail, CMS_TAGS.seo],
    ),
  ['cms-news-detail'],
  { tags: [CMS_TAGS.all, CMS_TAGS.news, CMS_TAGS.newsDetail, CMS_TAGS.seo], revalidate: getRevalidateSeconds() },
);

export async function getProductBySlug(slug: string) {
  const { products } = await getProductDetailContent();
  return products.find((product) => product.slug === slug);
}

export async function getNewsBySlug(slug: string) {
  const { news } = await getNewsDetailContent();
  return news.find((item) => item.slug === slug);
}

export function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate);
}
