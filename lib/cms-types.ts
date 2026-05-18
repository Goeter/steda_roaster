export type ImageItem = {
  src: string;
  alt: string;
};

export type HeroSlide = ImageItem & {
  id: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  tag?: string;
  description: string;
  image: string;
  images: string[];
  technicalParams: Record<string, string>;
  specifications: string[];
};

export type Testimony = {
  id: number;
  name: string;
  position: string;
  text: string;
};

export type FAQItem = {
  id: number;
  question: string;
  answer: string;
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

export type SiteSettings = {
  siteName: string;
  description: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  address: string;
  socials: {
    facebook?: string;
    tiktok?: string;
  };
};
