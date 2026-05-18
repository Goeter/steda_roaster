import { news, products } from './cms-data';

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getNewsBySlug(slug: string) {
  return news.find((item) => item.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}
