import { cmsFallbackContent } from './cms-data';
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


const TECHNICAL_PARAMETER_KEYS = [
  'capacity',
  'efficiency',
  'roastingTime',
  'production',
] as const;

const DISTRIBUTION_COLOR_CLASSES = [
  'bg-red-500',
  'bg-yellow-400',
  'bg-green-600',
  'bg-blue-900',
  'bg-rose-600',
  'bg-lime-500',
  'bg-purple-600',
  'bg-orange-500',
  'bg-pink-600',
  'bg-amber-800',
  'bg-black',
  'bg-neutral-700',
] as const;

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

const LEGACY_IMAGE_PATHS: Record<string, string> = {
  '/banners/product-hero.jpg': '/banner-products.webp',
  '/map-indonesia.png': '/gambar_peta.webp',
  '/banners/about-hero.jpg': '/company-roaster.webp',
};

function normalizeImagePath(value: unknown, fallback = '') {
  const path = readString(value);
  return LEGACY_IMAGE_PATHS[path] || path || fallback;
}

function resolveTechnicalParameterKey(label: string) {
  const normalized = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

  if (['capacity', 'kapasitas', 'maxcapacity', 'kapasitasmaksimal'].includes(normalized)) {
    return 'capacity';
  }

  if (
    ['efficiency', 'efisiensi', 'control', 'kontrol', 'controller', 'heating', 'pemanas'].includes(
      normalized,
    )
  ) {
    return 'efficiency';
  }

  if (
    ['roastingtime', 'wakturoasting', 'waktusangrai', 'duration', 'durasi'].includes(normalized)
  ) {
    return 'roastingTime';
  }

  if (['production', 'produksi', 'output', 'usage', 'penggunaan'].includes(normalized)) {
    return 'production';
  }

  return undefined;
}

function normalizeTechnicalParameters(value: unknown): Record<string, string> {
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, item]) => [key, readString(item)] as const)
        .filter(([, item]) => Boolean(item)),
    );
  }

  if (!Array.isArray(value)) return {};

  const normalized: Record<string, string> = {};
  const unusedKeys = [...TECHNICAL_PARAMETER_KEYS];

  value.forEach((item) => {
    let label = '';
    let content = '';

    if (typeof item === 'string') {
      content = item.trim();
    } else if (isRecord(item)) {
      label = readString(item.name) || readString(item.label) || readString(item.key);
      content =
        readString(item.value) ||
        readString(item.nilai) ||
        readString(item.description) ||
        readString(item.keterangan);
    }

    if (!content) return;

    const resolvedKey = resolveTechnicalParameterKey(label);
    const key = resolvedKey || unusedKeys.find((candidate) => !(candidate in normalized));
    if (!key) return;

    normalized[key] = content;
    const usedIndex = unusedKeys.indexOf(key);
    if (usedIndex >= 0) unusedKeys.splice(usedIndex, 1);
  });

  return normalized;
}

/**
 * Maps CMS specification labels (Indonesian or English) to the camelCase keys
 * expected by the product detail page, similar to resolveTechnicalParameterKey.
 */
function resolveSpecificationKey(label: string) {
  const normalized = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

  if (['type', 'tipe', 'jenis', 'model', 'seri', 'series'].includes(normalized)) {
    return 'type';
  }
  if (['minroast', 'minimumroast', 'minimalroast', 'minsangrai', 'minroasting'].includes(normalized)) {
    return 'minRoast';
  }
  if (['maxroast', 'maksroast', 'maximumroast', 'maksimalroast', 'makssangrai', 'maxroasting', 'maksroasting'].includes(normalized)) {
    return 'maxRoast';
  }
  if (['ignition', 'pengapian', 'pemantik', 'heating', 'pemanas', 'heater'].includes(normalized)) {
    return 'ignition';
  }
  if (['airflow', 'aliranudara', 'air', 'blower'].includes(normalized)) {
    return 'airflow';
  }
  if (['drum', 'tabung', 'drumseries'].includes(normalized)) {
    return 'drum';
  }
  if (['dimensions', 'dimensi', 'ukuran', 'size'].includes(normalized)) {
    return 'dimensions';
  }
  if (['weight', 'berat', 'bobot'].includes(normalized)) {
    return 'weight';
  }
  if (['electricalpower', 'dayalistrik', 'daya', 'power', 'listrik', 'watt', 'voltage', 'electric'].includes(normalized)) {
    return 'electricalPower';
  }
  if (['datalogger', 'logger', 'datalogging', 'monitoring', 'datalog'].includes(normalized)) {
    return 'dataLogger';
  }

  return undefined;
}

/**
 * CMS may return specifications as:
 *   - a Record<string, string> (current contract)
 *   - an array of strings (legacy)
 *   - an array of { name, value } objects
 * This normalizer converts the array-of-objects form into a flat record
 * so the page never tries to render an object as a React child.
 */
function normalizeSpecifications(value: unknown): unknown {
  // Already a plain record – resolve keys so CMS labels map to camelCase
  if (isRecord(value)) {
    const result: Record<string, string> = {};
    for (const [key, item] of Object.entries(value)) {
      const resolvedKey = resolveSpecificationKey(key) || key;
      const content = readString(item);
      if (content) result[resolvedKey] = content;
    }
    return result;
  }

  // Not an array – return unchanged (could be undefined)
  if (!Array.isArray(value)) return value;

  // Check if the array contains objects with {name, value} keys
  const hasObjectItems = value.some((item) => isRecord(item) && ('name' in item || 'label' in item || 'key' in item));

  if (!hasObjectItems) {
    // Legacy string array – convert each element to a guaranteed string
    return value.map((item) => (typeof item === 'string' ? item : readString(item)));
  }

  // Array of { name/label/key, value/nilai/description } objects → flat record
  // Resolve CMS display labels to the expected camelCase keys
  const normalized: Record<string, string> = {};
  value.forEach((item) => {
    if (!isRecord(item)) return;
    const rawKey = readString(item.key) || readString(item.name) || readString(item.label);
    const content =
      readString(item.value) ||
      readString(item.nilai) ||
      readString(item.description) ||
      readString(item.keterangan);
    if (!rawKey || !content) return;
    const resolvedKey = resolveSpecificationKey(rawKey) || rawKey;
    normalized[resolvedKey] = content;
  });
  return normalized;
}

function normalizeProducts(value: unknown) {
  if (!Array.isArray(value)) return value;

  return value.map((item) => {
    if (!isRecord(item)) return item;

    const images = Array.isArray(item.images)
      ? item.images.map(readString).filter(Boolean)
      : [];
    const coverImage = readString(item.image) || images[0] || '/hero-1.jpg';

    return {
      ...item,
      image: coverImage,
      images: images.length ? images : [coverImage],
      technicalParams: normalizeTechnicalParameters(item.technicalParams),
      specifications: normalizeSpecifications(item.specifications),
    };
  });
}

function normalizeProductSection(value: unknown) {
  if (!isRecord(value)) return value;

  const filters = Array.isArray(value.filters)
    ? value.filters
        .map((filter) => {
          if (typeof filter === 'string') return filter.trim();
          if (!isRecord(filter)) return '';
          return readString(filter.label) || readString(filter.name) || readString(filter.id);
        })
        .filter(Boolean)
    : value.filters;

  return { ...value, filters };
}

function normalizeBenefitsSection(value: unknown) {
  if (!isRecord(value) || !Array.isArray(value.items)) return value;

  return {
    ...value,
    items: value.items.map((item, index) =>
      isRecord(item) ? { ...item, id: Number(item.id) || index + 1 } : item,
    ),
  };
}

function normalizeDistributionSection(value: unknown) {
  if (!isRecord(value) || !Array.isArray(value.cities)) return value;

  const cmsCities = value.cities.map((city, index) => {
    if (!isRecord(city)) return city;
    return {
      ...city,
      color:
        readString(city.color) ||
        DISTRIBUTION_COLOR_CLASSES[index % DISTRIBUTION_COLOR_CLASSES.length],
    };
  });

  const fallbackCities = cmsFallbackContent.home.distributionSection.cities;
  const existingNames = new Set(cmsCities.map((c) => (isRecord(c) ? readString(c.name) : '')));
  const mergedCities = [...cmsCities];

  fallbackCities.forEach((fallbackCity) => {
    if (!existingNames.has(fallbackCity.name)) {
      mergedCities.push(fallbackCity);
    }
  });

  return {
    ...value,
    ...(isRecord(value.map)
      ? {
          map: {
            ...value.map,
            src: normalizeImagePath(value.map.src, '/gambar_peta.webp'),
          },
        }
      : {}),
    cities: mergedCities,
  };
}

function normalizeHeroSection(value: unknown) {
  if (!isRecord(value) || !Array.isArray(value.slides)) return value;

  return {
    ...value,
    slides: value.slides.map((slide, index) => {
      if (!isRecord(slide)) return slide;
      return {
        ...slide,
        id: readString(slide.id) || `cms-hero-${index + 1}`,
        src: normalizeImagePath(slide.src, '/hero-1.jpg'),
        alt: readString(slide.alt) || readString(value.heading) || 'Steda Roaster',
      };
    }),
  };
}

function normalizeProductPageSection(value: unknown) {
  if (!isRecord(value) || !isRecord(value.hero) || !isRecord(value.hero.image)) return value;

  return {
    ...value,
    hero: {
      ...value.hero,
      image: {
        ...value.hero.image,
        src: normalizeImagePath(value.hero.image.src, '/banner-products.webp'),
      },
    },
  };
}

function normalizeAboutPageSection(value: unknown) {
  if (!isRecord(value) || !isRecord(value.hero) || !isRecord(value.hero.image)) return value;

  return {
    ...value,
    hero: {
      ...value.hero,
      image: {
        ...value.hero.image,
        src: normalizeImagePath(value.hero.image.src, '/company-roaster.webp'),
      },
    },
  };
}

function normalizeSiteSettings(value: unknown) {
  if (!isRecord(value)) return value;

  const normalized: Record<string, unknown> = { ...value };

  if (!('phoneNumber' in value)) {
    const legacyPhoneNumber =
      readString(value.phone) ||
      readString(value.telephone) ||
      readString(value.whatsappNumber);

    if (legacyPhoneNumber) normalized.phoneNumber = legacyPhoneNumber;
  }

  const socialAliases = {
    instagram: value.instagram,
    facebook: value.facebook,
    tiktok: value.tiktok,
  };
  const socials = isRecord(value.socials) ? { ...value.socials } : {};

  for (const [platform, alias] of Object.entries(socialAliases)) {
    if (!(platform in socials) && readString(alias)) socials[platform] = readString(alias);
  }

  if (Object.keys(socials).length > 0) normalized.socials = socials;

  return normalized;
}

/**
 * Normalizes FAQ categories from the CMS to ensure each FAQ item has consistent
 * id, question, and answer fields.
 */
function normalizeFaqCategories(value: unknown) {
  if (!Array.isArray(value)) return value;

  return value.map((category) => {
    if (!isRecord(category)) return category;

    const faqs = Array.isArray(category.faqs)
      ? category.faqs.map((faq, index) => {
          if (!isRecord(faq)) return faq;
          return {
            ...faq,
            id: Number(faq.id) || index + 1,
            question: readString(faq.question) || readString(faq.pertanyaan),
            answer: readString(faq.answer) || readString(faq.jawaban),
          };
        })
      : [];

    return { ...category, faqs };
  });
}

/**
 * Normalizes flat FAQ items array (used in home page) from the CMS.
 */
function normalizeFaqItems(value: unknown) {
  if (!Array.isArray(value)) return value;

  return value.map((faq, index) => {
    if (!isRecord(faq)) return faq;
    return {
      ...faq,
      id: Number(faq.id) || index + 1,
      question: readString(faq.question) || readString(faq.pertanyaan),
      answer: readString(faq.answer) || readString(faq.jawaban),
    };
  });
}

function normalizeCmsPayload(value: unknown) {
  if (!isRecord(value)) return value;

  return {
    ...value,
    ...(value.siteSettings !== undefined
      ? { siteSettings: normalizeSiteSettings(value.siteSettings) }
      : {}),
    ...(value.heroSection !== undefined ? { heroSection: normalizeHeroSection(value.heroSection) } : {}),
    ...(value.productPageSection !== undefined
      ? { productPageSection: normalizeProductPageSection(value.productPageSection) }
      : {}),
    ...(value.aboutPageSection !== undefined
      ? { aboutPageSection: normalizeAboutPageSection(value.aboutPageSection) }
      : {}),
    ...(value.products !== undefined ? { products: normalizeProducts(value.products) } : {}),
    ...(value.productSection !== undefined
      ? { productSection: normalizeProductSection(value.productSection) }
      : {}),
    ...(value.benefitsSection !== undefined
      ? { benefitsSection: normalizeBenefitsSection(value.benefitsSection) }
      : {}),
    ...(value.distributionSection !== undefined
      ? { distributionSection: normalizeDistributionSection(value.distributionSection) }
      : {}),
    ...(value.faqCategories !== undefined
      ? { faqCategories: normalizeFaqCategories(value.faqCategories) }
      : {}),
    ...(value.faqs !== undefined
      ? { faqs: normalizeFaqItems(value.faqs) }
      : {}),
  };
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

    const keys = new Set([...Object.keys(fallback), ...Object.keys(data)]);

    return Object.fromEntries(
      Array.from(keys).map((key) => {
        if (!(key in fallback)) return [key, data[key]];
        return [key, mergeWithFallback(fallback[key], data[key])];
      }),
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

function applyGlobalTextOverrides<T>(value: T): T {
  if (value === null || value === undefined) return value;

  if (Array.isArray(value)) {
    return value.map(item => applyGlobalTextOverrides(item)) as unknown as T;
  }

  if (typeof value === 'object') {
    const result: any = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = applyGlobalTextOverrides(val);
    }

    // Intercept ctaLabel and ctaHref pairs:
    if (typeof result.ctaLabel === 'string' && typeof result.ctaHref === 'string') {
      const lowerLabel = result.ctaLabel.toLowerCase().trim();
      if (lowerLabel.includes('partner')) {
        result.ctaHref = 'https://wa.me/6281225171359?text=Halo%20Steda%20Roaster%2C%20saya%20tertarik%20menjadi%20partner.';
      }
    }

    return result as T;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    const lower = trimmed.toLowerCase();
    if (lower === 'explore now' || lower === 'explore') {
      return 'View Product' as unknown as T;
    }
    if (lower === 'learn more' || lower === 'learn') {
      return 'View Detail' as unknown as T;
    }
    return value;
  }

  return value;
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
    return applyGlobalTextOverrides(
      cmsFailure(
        '[cms] CMS_API_URL is not configured. Using local fallback content.',
        fallback,
      ),
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
      return applyGlobalTextOverrides(
        cmsFailure(
          `[cms] ${endpointPath} returned HTTP ${response.status}. Using local fallback content.`,
          fallback,
        ),
      );
    }

    const payload = normalizeCmsPayload(
      unwrapCmsPayload(await response.json()),
    );

    if (!payload) {
      return applyGlobalTextOverrides(fallback);
    }

    return applyGlobalTextOverrides(mergeWithFallback(fallback, payload));
  } catch (error) {
    return applyGlobalTextOverrides(
      cmsFailure(
        `[cms] Failed to fetch ${endpointPath}. Using local fallback content.`,
        fallback,
        error,
      ),
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
};

export type ProductDetailContent = {
  productDetailSection: ProductDetailSection;
  productPageSection: ProductPageSection;
  products: Product[];
};

export type FAQsContent = {
  faqCategories: FAQCategory[];
  faqPageSection: FAQPageSection;
};

export type NewsContent = {
  news: NewsItem[];
  newsCategories: string[];
  newsPageSection: NewsPageSection;
};

export type NewsDetailContent = {
  news: NewsItem[];
  newsDetailSection: NewsDetailSection;
};

/**
 * All pages read content through these functions only.
 * The Next.js fetch cache is the single cache layer and is invalidated by CMS tags/webhooks.
 */
export function getLayoutContent() {
  return fetchFromCms<LayoutContent>(
    'layout',
    cmsFallbackContent.layout,
    [CMS_TAGS.layout, CMS_TAGS.seo],
  );
}

export function getHomeContent() {
  return fetchFromCms<HomeContent>(
    'home',
    cmsFallbackContent.home,
    [CMS_TAGS.home, CMS_TAGS.products, CMS_TAGS.faqs],
  );
}

export function getAboutContent() {
  return fetchFromCms<AboutContent>(
    'about',
    cmsFallbackContent.about,
    [CMS_TAGS.about],
  );
}

export function getProductsContent() {
  return fetchFromCms<ProductsContent>(
    'productsPage',
    cmsFallbackContent.productsPage,
    [CMS_TAGS.products],
  );
}

export function getProductDetailContent() {
  return fetchFromCms<ProductDetailContent>(
    'productDetail',
    cmsFallbackContent.productDetail,
    [CMS_TAGS.products, CMS_TAGS.productDetail, CMS_TAGS.seo],
  );
}

export function getFAQsContent() {
  return fetchFromCms<FAQsContent>(
    'faqs',
    cmsFallbackContent.faqs,
    [CMS_TAGS.faqs, CMS_TAGS.seo],
  );
}

export function getNewsContent() {
  return fetchFromCms<NewsContent>(
    'newsPage',
    cmsFallbackContent.newsPage,
    [CMS_TAGS.news, CMS_TAGS.seo],
  );
}

export function getNewsDetailContent() {
  return fetchFromCms<NewsDetailContent>(
    'newsDetail',
    cmsFallbackContent.newsDetail,
    [CMS_TAGS.news, CMS_TAGS.newsDetail, CMS_TAGS.seo],
  );
}
