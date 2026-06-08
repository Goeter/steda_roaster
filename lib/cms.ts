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
import {
  CMS_TAGS,
  getCmsEndpoint,
  getCmsEndpointUrl,
  getCmsRuntimeConfig,
  type CmsEndpointKey,
} from './cms-config';
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

export { CMS_TAGS } from './cms-config';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * CMS responses may be returned directly or wrapped as { data: ... }.
 * This keeps the frontend independent from a common backend response envelope.
 */
function unwrapCmsPayload(value: unknown) {
  if (isRecord(value) && 'data' in value) return value.data;
  return value;
}

/**
 * Keeps the UI stable when an older CMS response is missing a newly added field.
 * Arrays from the CMS are authoritative, including intentionally empty arrays.
 */
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

const warnedCmsMessages = new Set<string>();

function cmsFailure<T>(message: string, fallback: T, error?: unknown): T {
  const { strictMode } = getCmsRuntimeConfig();

  if (strictMode) {
    throw new Error(message, error ? { cause: error } : undefined);
  }

  if (!warnedCmsMessages.has(message)) {
    warnedCmsMessages.add(message);
    if (error) console.warn(message, error);
    else console.warn(message);
  }

  return fallback;
}

async function fetchFromCms<T>(
  endpointKey: CmsEndpointKey,
  fallback: T,
  tags: string[],
): Promise<T> {
  const config = getCmsRuntimeConfig();
  const endpointUrl = getCmsEndpointUrl(endpointKey);
  const endpointPath = getCmsEndpoint(endpointKey);

  if (!endpointUrl) {
    return cmsFailure(
      '[cms] CMS_API_URL is not configured. Using local fallback content.',
      fallback,
    );
  }

  try {
    const response = await fetch(endpointUrl, {
      headers: {
        Accept: 'application/json',
        ...(config.readToken ? { Authorization: `Bearer ${config.readToken}` } : {}),
      },
      next: {
        revalidate: config.revalidateSeconds,
        tags: [CMS_TAGS.all, ...tags],
      },
      signal: AbortSignal.timeout(config.fetchTimeoutMs),
    });

    if (!response.ok) {
      return cmsFailure(
        `[cms] ${endpointPath} returned HTTP ${response.status}. Using local fallback content.`,
        fallback,
      );
    }

    const payload = unwrapCmsPayload(await response.json());
    return mergeWithFallback(fallback, payload);
  } catch (error) {
    return cmsFailure(
      `[cms] Failed to fetch ${endpointPath}. Using local fallback content.`,
      fallback,
      error,
    );
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

/**
 * All pages read content through these functions only.
 * The Next.js fetch cache is the single cache layer and is invalidated by CMS tags/webhooks.
 */
export function getLayoutContent() {
  return fetchFromCms<LayoutContent>(
    'layout',
    {
      siteSettings: fallbackSiteSettings,
      siteMetadata: fallbackSiteMetadata,
      footerSection: fallbackFooterSection,
    },
    [CMS_TAGS.layout, CMS_TAGS.seo],
  );
}

export function getHomeContent() {
  return fetchFromCms<HomeContent>(
    'home',
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
  );
}

export function getAboutContent() {
  return fetchFromCms<AboutContent>(
    'about',
    {
      aboutPageSection: fallbackAboutPageSection,
      aboutSection: fallbackAboutSection,
      benefitsSection: fallbackBenefitsSection,
      testimoniesSection: fallbackTestimoniesSection,
      testimonies: fallbackTestimonies,
    },
    [CMS_TAGS.about],
  );
}

export function getProductsContent() {
  return fetchFromCms<ProductsContent>(
    'productsPage',
    {
      productPageSection: fallbackProductPageSection,
      productSection: fallbackProductSection,
      products: fallbackProducts,
      siteSettings: fallbackSiteSettings,
    },
    [CMS_TAGS.products],
  );
}

export function getProductDetailContent() {
  return fetchFromCms<ProductDetailContent>(
    'productDetail',
    {
      productDetailSection: fallbackProductDetailSection,
      products: fallbackProducts,
      siteSettings: fallbackSiteSettings,
      siteMetadata: fallbackSiteMetadata,
    },
    [CMS_TAGS.products, CMS_TAGS.productDetail, CMS_TAGS.seo],
  );
}

export function getFAQsContent() {
  return fetchFromCms<FAQsContent>(
    'faqs',
    {
      faqCategories: fallbackFaqCategories,
      faqPageSection: fallbackFaqPageSection,
      siteSettings: fallbackSiteSettings,
      siteMetadata: fallbackSiteMetadata,
    },
    [CMS_TAGS.faqs, CMS_TAGS.seo],
  );
}

export function getNewsContent() {
  return fetchFromCms<NewsContent>(
    'newsPage',
    {
      news: fallbackNews,
      newsCategories: fallbackNewsCategories,
      newsPageSection: fallbackNewsPageSection,
      siteMetadata: fallbackSiteMetadata,
    },
    [CMS_TAGS.news, CMS_TAGS.seo],
  );
}

export function getNewsDetailContent() {
  return fetchFromCms<NewsDetailContent>(
    'newsDetail',
    {
      news: fallbackNews,
      newsDetailSection: fallbackNewsDetailSection,
      siteSettings: fallbackSiteSettings,
      siteMetadata: fallbackSiteMetadata,
    },
    [CMS_TAGS.news, CMS_TAGS.newsDetail, CMS_TAGS.seo],
  );
}

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
