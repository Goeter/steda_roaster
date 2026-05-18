# Steda Roaster - CMS API Ready Frontend

Project ini sudah dirapikan agar frontend dapat memakai satu sumber data/variabel yang nanti bisa diganti dengan API CMS internal.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka: `http://localhost:3000`

## Build production

```bash
npm run build
npm run start
```

## File penting untuk integrasi CMS

### 1. `lib/cms-types.ts`
Berisi kontrak tipe data untuk CMS:
- `SiteSettings`
- `HeroSlide`
- `Product`
- `Testimony`
- `FAQItem`
- `NewsItem`
- `ImageItem`

File ini bisa dijadikan acuan field database/API CMS.

### 2. `lib/cms-data.ts`
Berisi data dummy/static sementara yang sekarang dipakai frontend:
- `siteSettings`
- `heroSlides`
- `products`
- `testimonies`
- `faqs`
- `newsCategories`
- `news`

Nanti saat CMS API sudah dibuat, isi file ini bisa diganti dari response API.

### 3. `lib/cms.ts`
Berisi helper pemanggilan data:
- `getProductBySlug(slug)`
- `getNewsBySlug(slug)`
- `formatDate(date)`

## Contoh response API CMS Product

```json
{
  "id": 1,
  "slug": "se-200-series",
  "name": "SE 200 Series",
  "category": "Home Roastery",
  "tag": "Compact Roaster",
  "description": "Solusi roaster kapasitas 200 gram untuk kebutuhan home roastery.",
  "image": "/product-1.jpg",
  "images": ["/product-1.jpg"],
  "technicalParams": {
    "capacity": "200 Gram",
    "power": "220V / 800W",
    "heating": "Electric Heater",
    "control": "Manual Control",
    "material": "Stainless Steel 304"
  },
  "specifications": [
    "Drum rotation adjustable",
    "Real-time temperature display"
  ]
}
```

## Contoh response API CMS News

```json
{
  "id": 1,
  "slug": "grand-opening-surabaya",
  "title": "Grand Opening Cabang Baru di Surabaya",
  "excerpt": "Ringkasan berita untuk card news.",
  "content": [
    "Paragraf pertama isi berita.",
    "Paragraf kedua isi berita."
  ],
  "category": "Our Partner",
  "publishedAt": "2026-05-01",
  "author": "Steda Roaster Team",
  "images": [
    {
      "src": "https://example.com/news-image.jpg",
      "alt": "Foto berita"
    }
  ]
}
```

## Catatan perubahan

- Code dibersihkan dari dependency dan komponen UI yang tidak dipakai.
- Section product sudah memakai kategori `Home Roastery`, bukan `Small Batch`.
- Section Testimonies sudah dibuat background putih/cerah dengan motif subtle yang elegan.
- Section CTA `Want to buy Steda Roaster products?` sudah dibuat background coklat agar nyambung dengan footer.
- Halaman detail news sudah dibuat di `/news/[slug]` dengan slider/gallery foto lebih dari satu.
- SEO metadata global, product detail, dan news detail sudah dirapikan.
- Build production sudah dites sukses dengan `npm run build`.
