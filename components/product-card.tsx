import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product, ProductPageSection } from '@/lib/cms-types';
import { getProductCoverImage, isBestSeller } from '@/lib/products';

type ProductCardProps = {
  product: Product;
  labels: ProductPageSection;
};

/**
 * Shared product card used by the product listing and similar-product section.
 * Keeping the card in one component ensures both locations retain identical UI and behavior.
 */
export function ProductCard({ product, labels }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={`${labels.detailAriaLabelPrefix} ${product.name}`}
      className="group block h-full"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl card-timbul transition duration-300 hover:-translate-y-1 hover:border-amber-600/30">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={getProductCoverImage(product)}
            alt={`${labels.productImageAltPrefix} ${product.name}`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {isBestSeller(product, labels.bestSellerLabel) && (
            <span className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white shadow-md">
              {labels.bestSellerLabel}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="w-fit rounded-full bg-orange-100/90 px-3 py-1 text-sm font-bold text-orange-800">
            {product.category}
          </span>

          <h3 className="mt-4 text-xl font-extrabold text-neutral-900 text-timbul-dark">{product.name}</h3>

          <p className="mt-3 text-sm font-medium leading-6 text-neutral-700 text-timbul-dark">{product.description}</p>

          <div className="flex-1" />

          <Button asChild className="mt-6 w-full rounded-full bg-orange-600 text-white hover:bg-orange-700">
            <span>
              {labels.detailButtonLabel} <ArrowRight size={18} />
            </span>
          </Button>
        </div>
      </article>
    </Link>
  );
}
