# Steda Roaster CMS Webhook + Cache Setup

Project ini memakai pola aman dan SEO-friendly:

```txt
Admin CMS
↓ POST/PUT/PATCH
Backend CMS
↓ simpan
Database CMS
↓ trigger webhook
Next.js Frontend revalidate/cache
↓
Customer hanya view website static/cache
```

## Konsep

Customer website tidak melakukan akses langsung ke database. Database tetap ada di backend CMS.

Frontend Next.js mengambil konten dari CMS di sisi server, lalu hasilnya di-cache/prerender oleh Next.js. Saat admin mengubah konten, backend CMS memanggil webhook revalidate agar cache frontend diperbarui.

## File penting

```txt
lib/cms.ts                         -> data layer, fetch CMS API, fallback data, cache tags
app/api/cms/revalidate/route.ts    -> webhook untuk trigger revalidate/cache refresh
lib/cms-data.ts                    -> fallback/static data jika CMS API belum aktif
lib/cms-types.ts                   -> acuan struktur response CMS API
lib/seo.ts                         -> helper SEO URL/canonical/sitemap
app/sitemap.ts                     -> sitemap dinamis dari cache CMS
```

## Environment variables

Buat file `.env.local`:

```env
CMS_API_URL=https://domain-cms-kamu.com
CMS_READ_TOKEN=optional-jika-api-butuh-token
CMS_REVALIDATE_SECRET=ganti-dengan-secret-panjang-random
CMS_REVALIDATE_SECONDS=2592000
```

Catatan:

- `CMS_API_URL` adalah domain backend CMS.
- `CMS_READ_TOKEN` opsional. Pakai jika endpoint read dari CMS tidak public.
- `CMS_REVALIDATE_SECRET` wajib untuk webhook agar tidak bisa dipanggil sembarang orang.
- `CMS_REVALIDATE_SECONDS` default 30 hari. Konten biasanya refresh lewat webhook, bukan request terus-menerus.

## Endpoint yang dibaca Next.js dari CMS backend

CMS/backend perlu menyediakan endpoint GET berikut:

```txt
GET /api/layout
GET /api/home
GET /api/about
GET /api/products-page
GET /api/product-detail
GET /api/faqs
GET /api/news-page
GET /api/news-detail
```

Frontend membaca endpoint ini di server, bukan dari browser customer.

## Webhook dari CMS ke Next.js

Setelah admin melakukan create/update/delete konten, backend CMS panggil:

```txt
POST https://domain-frontend-kamu.com/api/cms/revalidate
Content-Type: application/json
```

Body paling sederhana:

```json
{
  "secret": "isi-sama-dengan-CMS_REVALIDATE_SECRET",
  "tags": ["cms:all"]
}
```

Untuk update lebih spesifik:

```json
{
  "secret": "isi-sama-dengan-CMS_REVALIDATE_SECRET",
  "tags": ["cms:products"],
  "paths": ["/products", "/products/se-200-series"]
}
```

## Cache tags yang tersedia

```txt
cms:all
cms:layout
cms:home
cms:about
cms:products
cms:product-detail
cms:faqs
cms:news
cms:news-detail
cms:seo
```

## Contoh mapping trigger webhook

```txt
Update hero/banner home        -> tags: ["cms:home"]
Update about                   -> tags: ["cms:about"]
Update product                 -> tags: ["cms:products", "cms:product-detail", "cms:seo"]
Update FAQ                     -> tags: ["cms:faqs", "cms:seo"]
Update news                    -> tags: ["cms:news", "cms:news-detail", "cms:seo"]
Update navbar/footer/contact   -> tags: ["cms:layout"]
Update metadata/global SEO     -> tags: ["cms:seo", "cms:layout"]
```

## Keamanan

- Database tidak dibuka ke website customer.
- Webhook memakai secret.
- Path revalidation dibatasi hanya ke route website yang valid.
- Cache tag revalidation dibatasi hanya ke tag yang dikenali frontend.
- Jika CMS API gagal, frontend tetap tampil memakai fallback dari `lib/cms-data.ts`.

## SEO

SEO tetap server-rendered/static-cache, bukan client-side fetch. Metadata, sitemap, JSON-LD product/news/FAQ tetap dihasilkan dari data CMS/cache sehingga aman untuk Google indexing.
