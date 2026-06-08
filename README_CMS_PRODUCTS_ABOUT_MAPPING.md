# CMS Mapping - Products & About Pages

Dokumen ini menjelaskan variabel CMS-ready yang dipakai untuk halaman Products, Product Detail, dan About. Admin CMS cukup mengubah data di `lib/cms-data.ts`; component/page hanya membaca variabel tersebut.

## File data utama

- `lib/cms-data.ts`
- `lib/cms-types.ts`

## Products homepage section

Dipakai di:

- `components/sections/product.tsx`

Variabel dari `lib/cms-data.ts`:

- `productSection`
- `productPageSection`
- `products`

Field CMS:

- `productSection.eyebrow`
- `productSection.heading`
- `productSection.description`
- `productSection.ctaLabel`
- `productSection.ctaHref`
- `productSection.allowedCategories`
- `productSection.filters`
- `productSection.emptyMessage`
- `productPageSection.detailButtonLabel`
- `productPageSection.bestSellerLabel`
- `products[]`

## Products page

Dipakai di:

- `app/products/page.tsx`

Variabel dari `lib/cms-data.ts`:

- `productPageSection`
- `productSection`
- `products`
- `siteSettings`

Field CMS:

- `productPageSection.hero.eyebrow`
- `productPageSection.hero.heading`
- `productPageSection.hero.description`
- `productPageSection.hero.image.src`
- `productPageSection.hero.image.alt`
- `productPageSection.searchPlaceholder`
- `productPageSection.searchAriaLabel`
- `productPageSection.detailButtonLabel`
- `productPageSection.bestSellerLabel`
- `productSection.filters`
- `productSection.allowedCategories`
- `productSection.emptyMessage`
- `productSection.consultation.eyebrow`
- `productSection.consultation.heading`
- `productSection.consultation.description`
- `productSection.consultation.ctaLabel`
- `productSection.consultation.note`
- `siteSettings.whatsappNumber`
- `siteSettings.whatsappMessage`
- `products[]`

## Product detail page

Dipakai di:

- `app/products/[slug]/page.tsx`
- `components/product-gallery.tsx`
- `components/product-actions.tsx`

Variabel dari `lib/cms-data.ts`:

- `productDetailSection`
- `products`

Field CMS:

- `productDetailSection.notFoundTitle`
- `productDetailSection.metadataTitleSuffix`
- `productDetailSection.technicalParametersHeading`
- `productDetailSection.specificationsHeading`
- `productDetailSection.specificationFields[]`
- `productDetailSection.specificationFields[].key`
- `productDetailSection.specificationFields[].label`
- `productDetailSection.noImageMessage`
- `productDetailSection.previousImageAriaLabel`
- `productDetailSection.nextImageAriaLabel`
- `productDetailSection.thumbnailAriaLabelPrefix`
- `productDetailSection.shareCopiedMessage`
- `productDetailSection.backAriaLabel`
- `productDetailSection.shareAriaLabel`
- `products[].slug`
- `products[].name`
- `products[].category`
- `products[].tag`
- `products[].description`
- `products[].image`
- `products[].images`
- `products[].technicalParams`
- `products[].specifications.type`
- `products[].specifications.minRoast`
- `products[].specifications.maxRoast`
- `products[].specifications.ignition`
- `products[].specifications.airflow`
- `products[].specifications.drum`
- `products[].specifications.dimensions`
- `products[].specifications.weight`
- `products[].specifications.electricalPower`
- `products[].specifications.dataLogger`

## About homepage section

Dipakai di:

- `components/sections/about-us.tsx`

Variabel dari `lib/cms-data.ts`:

- `aboutSection`

Field CMS:

- `aboutSection.videoUrl`
- `aboutSection.videoTitle`
- `aboutSection.heading`
- `aboutSection.description`
- `aboutSection.ctaLabel`
- `aboutSection.ctaHref`

## About page

Dipakai di:

- `app/about/page.tsx`

Variabel dari `lib/cms-data.ts`:

- `aboutPageSection`
- `aboutSection`
- `benefitsSection`
- `testimoniesSection`
- `testimonies`

Field CMS:

- `aboutPageSection.hero.heading`
- `aboutPageSection.hero.description`
- `aboutPageSection.hero.image.src`
- `aboutPageSection.hero.image.alt`
- `aboutPageSection.visionMission.heading`
- `aboutPageSection.visionMission.description`
- `aboutPageSection.visionMission.visionTitle`
- `aboutPageSection.visionMission.visionDescription`
- `aboutPageSection.visionMission.missionTitle`
- `aboutPageSection.visionMission.missionItems`
- `aboutPageSection.cta.heading`
- `aboutPageSection.cta.description`
- `aboutPageSection.cta.ctaLabel`
- `aboutPageSection.cta.ctaHref`
- `aboutSection.*`
- `benefitsSection.*`
- `testimoniesSection.*`
- `testimonies[]`

## Tipe data baru

Ditambahkan di `lib/cms-types.ts`:

- `ProductPageSection`
- `ProductDetailSection`
- `AboutPageSection`

## Catatan behavior UI

Behavior UI tidak diubah:

- Product filter tetap memakai `productSection.filters`.
- Product search tetap berjalan di client.
- Product detail gallery tetap bisa pindah gambar.
- Product share/back mobile tetap sama.
- About page tetap memakai struktur hero, about section, vision mission, benefits, testimonies, dan CTA.
- Animasi tambahan memakai `Reveal` dan `animate-page-enter`, tidak mengubah flow interaksi.
