import type { Product } from './cms-types';

function normalizeProductLabel(value: string | undefined) {
  return value?.trim().toLowerCase() ?? '';
}

export function isBestSeller(product: Product, bestSellerLabel: string) {
  return normalizeProductLabel(product.tag) === normalizeProductLabel(bestSellerLabel);
}

export function getProductCoverImage(product: Product) {
  return product.image || product.images?.find(Boolean) || '/hero-1.jpg';
}
