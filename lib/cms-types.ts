export type ImageItem = {
  src: string;
  alt: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type HeroSlide = ImageItem & {
  id: string;
};

export type HeroSection = {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  slides: HeroSlide[];
  slideAriaLabelPrefix: string;
};

export type ProductTechnicalParameterKey =
  | 'capacity'
  | 'efficiency'
  | 'roastingTime'
  | 'production';

export type ProductTechnicalParameterField = {
  key: ProductTechnicalParameterKey;
  label: string;
};

export type ProductTechnicalParameters = Partial<Record<ProductTechnicalParameterKey, string>>;

export type ProductSpecificationKey =
  | 'type'
  | 'minRoast'
  | 'maxRoast'
  | 'ignition'
  | 'airflow'
  | 'drum'
  | 'dimensions'
  | 'weight'
  | 'electricalPower'
  | 'dataLogger';

export type ProductSpecificationField = {
  key: ProductSpecificationKey;
  label: string;
};

export type ProductSpecifications = Partial<Record<ProductSpecificationKey, string>>;

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  tag?: string;
  description: string;
  image: string;
  images: string[];
  technicalParams: ProductTechnicalParameters | Record<string, string>;
  /**
   * Object format is the current CMS contract. A string array remains accepted
   * temporarily so an older CMS response does not break the product page.
   */
  specifications: ProductSpecifications | string[];
};

export type ProductSection = {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  allowedCategories: string[];
  filters: string[];
  emptyMessage: string;
  consultation: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
    note: string;
  };
  previousProductAriaLabel: string;
  nextProductAriaLabel: string;
};

export type ProductPageSection = {
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    image: ImageItem;
  };
  searchPlaceholder: string;
  searchAriaLabel: string;
  detailButtonLabel: string;
  bestSellerLabel: string;
  detailAriaLabelPrefix: string;
  productImageAltPrefix: string;
};

export type ProductDetailSection = {
  notFoundTitle: string;
  metadataTitleSuffix: string;
  technicalParametersHeading: string;
  technicalParameterFields: ProductTechnicalParameterField[];
  specificationsHeading: string;
  specificationFields: ProductSpecificationField[];
  bestSellerHeading: string;
  viewAllProductsLabel: string;
  noImageMessage: string;
  previousImageAriaLabel: string;
  nextImageAriaLabel: string;
  thumbnailAriaLabelPrefix: string;
  shareCopiedMessage: string;
  backAriaLabel: string;
  shareAriaLabel: string;
};

export type BenefitItem = {
  id: number;
  title: string;
  description: string;
};

export type BenefitsSection = {
  image: ImageItem;
  heading: string;
  description: string;
  items: BenefitItem[];
};

export type DistributionCity = {
  name: string;
  color: string;
};

export type DistributionSection = {
  eyebrow: string;
  heading: string;
  highlightedWord: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  map: ImageItem;
  legendTitle: string;
  cities: DistributionCity[];
};

export type Testimony = {
  id: number;
  name: string;
  position: string;
  text: string;
};

export type TestimoniesSection = {
  eyebrow: string;
  heading: string;
  description: string;
  previousAriaLabel: string;
  nextAriaLabel: string;
  itemAriaLabelPrefix: string;
};

export type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  icon: 'coffee' | 'settings' | 'bookOpen';
  faqs: FAQItem[];
};

export type FAQHomeSection = {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  previewLimit: number;
};

export type FAQPageSection = {
  heading: string;
  description: string;
  contactText: string;
  contactCtaLabel: string;
  backLabel: string;
  backHref: string;
};

export type NewsPageSection = {
  eyebrow: string;
  heading: string;
  description: string;
  defaultCategory: string;
  searchPlaceholder: string;
  emptyMessage: string;
  readMoreLabel: string;
};

export type NewsDetailSection = {
  notFoundTitle: string;
  backLabel: string;
  backHref: string;
  relatedHeading: string;
  relatedLimit: number;
  previousImageAriaLabel: string;
  nextImageAriaLabel: string;
  openImageAriaLabelPrefix: string;
};

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  publishedAt: string;
  author: string;
  images: ImageItem[];
};

export type AboutSection = {
  videoUrl: string;
  videoTitle: string;
  heading: string;
  description: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type AboutPageSection = {
  hero: {
    heading: string;
    description: string;
    image: ImageItem;
  };
  visionMission: {
    heading: string;
    description: string;
    visionTitle: string;
    visionDescription: string;
    missionTitle: string;
    missionItems: string[];
  };
  cta: {
    heading: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export type FooterSection = {
  description: string;
  copyright: string;
  navigationTitle: string;
  contactTitle: string;
  socialTitle: string;
};

export type SiteSettings = {
  siteName: string;
  description: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  address: string;
  mapUrl: string;
  socials: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
};

export type SiteMetadata = {
  metadataBase: string;
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  authorName: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphUrl: string;
  openGraphSiteName: string;
  openGraphImage: ImageItem & { width: number; height: number };
  locale: string;
  type: 'website';
  language: string;
  themeColor: string;
};
