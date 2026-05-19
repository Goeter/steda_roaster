# CMS Mapping — FAQs & News

File utama untuk konten CMS:

- `lib/cms-data.ts` untuk isi konten/data yang nanti bisa diganti dari CMS admin.
- `lib/cms-types.ts` untuk tipe/struktur data TypeScript.

UI behavior tidak diubah. Perubahan hanya memindahkan teks/label/image/limit ke variabel CMS-ready dan menambahkan reveal animation ringan pada page/section.

## FAQs

### 1. Home FAQ Section

File data: `lib/cms-data.ts`

Variabel yang dipanggil component:

```ts
faqHomeSection
```

Dipakai di file:

```txt
components/sections/faq.tsx
```

Field yang bisa diganti dari CMS:

```ts
faqHomeSection.heading
faqHomeSection.description
faqHomeSection.image.src
faqHomeSection.image.alt
faqHomeSection.ctaLabel
faqHomeSection.ctaHref
faqHomeSection.previewLimit
```

### 2. FAQ Page Header, CTA, Back Button

File data: `lib/cms-data.ts`

Variabel yang dipanggil page:

```ts
faqPageSection
```

Dipakai di file:

```txt
app/faqs/page.tsx
```

Field yang bisa diganti dari CMS:

```ts
faqPageSection.heading
faqPageSection.description
faqPageSection.contactText
faqPageSection.contactCtaLabel
faqPageSection.backLabel
faqPageSection.backHref
```

### 3. FAQ Categories & Items

File data: `lib/cms-data.ts`

Variabel yang dipanggil:

```ts
faqCategories
faqs
```

Dipakai di file:

```txt
components/sections/faq.tsx
app/faqs/page.tsx
```

Field yang bisa diganti dari CMS:

```ts
faqCategories[].title
faqCategories[].icon
faqCategories[].faqs[].id
faqCategories[].faqs[].question
faqCategories[].faqs[].answer
```

Catatan icon FAQ hanya menerima nilai berikut karena sudah dipetakan ke icon UI:

```ts
'coffee' | 'settings' | 'bookOpen'
```

## News

### 1. News Listing Page

File data: `lib/cms-data.ts`

Variabel yang dipanggil page:

```ts
newsPageSection
```

Dipakai di file:

```txt
app/news/page.tsx
```

Field yang bisa diganti dari CMS:

```ts
newsPageSection.eyebrow
newsPageSection.heading
newsPageSection.description
newsPageSection.defaultCategory
newsPageSection.searchPlaceholder
newsPageSection.emptyMessage
newsPageSection.readMoreLabel
```

### 2. News Detail Page

File data: `lib/cms-data.ts`

Variabel yang dipanggil page:

```ts
newsDetailSection
```

Dipakai di file:

```txt
app/news/[slug]/page.tsx
```

Field yang bisa diganti dari CMS:

```ts
newsDetailSection.notFoundTitle
newsDetailSection.backLabel
newsDetailSection.backHref
newsDetailSection.relatedHeading
newsDetailSection.relatedLimit
```

### 3. News Categories & Articles

File data: `lib/cms-data.ts`

Variabel yang dipanggil:

```ts
newsCategories
news
```

Dipakai di file:

```txt
app/news/page.tsx
app/news/[slug]/page.tsx
lib/cms.ts
```

Field yang bisa diganti dari CMS:

```ts
newsCategories[]

news[].id
news[].slug
news[].title
news[].excerpt
news[].content[]
news[].category
news[].publishedAt
news[].author
news[].images[].src
news[].images[].alt
```

Catatan penting:

- `newsPageSection.defaultCategory` sebaiknya sama dengan item pertama di `newsCategories`, misalnya `All News`.
- `news[].category` sebaiknya cocok dengan salah satu kategori di `newsCategories` agar filter tetap berjalan.
- `news[].slug` dipakai untuk URL detail `/news/[slug]`, jadi harus unik.

## Site Settings yang juga dipakai FAQ

File data: `lib/cms-data.ts`

Variabel:

```ts
siteSettings
```

Dipakai di FAQ page untuk link WhatsApp:

```ts
siteSettings.whatsappNumber
siteSettings.whatsappMessage
```

## File yang diubah

```txt
lib/cms-types.ts
lib/cms-data.ts
components/sections/faq.tsx
app/faqs/page.tsx
app/news/page.tsx
app/news/[slug]/page.tsx
README_CMS_FAQ_NEWS_MAPPING.md
```

## Validasi

Build sudah dites dengan:

```bash
npm run build
```

Hasil: berhasil compile tanpa error.
