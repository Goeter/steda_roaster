import type { LinkItem } from './cms-types';

/**
 * Main website navigation is intentionally frontend-owned.
 * Do not move this list to the CMS unless the product requirements change.
 */
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'News', href: '/news' },
  { label: 'FAQs', href: '/faqs' },
] as const satisfies readonly LinkItem[];
