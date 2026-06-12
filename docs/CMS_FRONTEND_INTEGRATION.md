# Integrasi Frontend Steda Roaster dengan CMS

Dokumen ini adalah kontrak antara frontend dan developer CMS. Integrasi ini tidak menambahkan dashboard admin baru dan tidak mengubah UI, behavior, responsive layout, maupun animation website.

## 1. Arsitektur data

Semua halaman membaca data melalui satu lapisan:

```txt
CMS API
  ↓
lib/cms-config.ts   -> endpoint, environment, cache tag, strict mode
  ↓
lib/cms.ts          -> fetch, authorization, fallback, cache, normalisasi response
  ↓
app/* + components/*
```

Aturan penting:

- Komponen UI tidak boleh memanggil CMS API secara langsung.
- Komponen UI tidak boleh membaca `process.env`.
- Perubahan alamat endpoint dilakukan di environment variable atau `lib/cms-config.ts`.
- Bentuk data utama ditentukan di `lib/cms-types.ts`.
- `lib/cms-data.ts` hanya merupakan fallback lokal dan contoh kontrak data.

## 2. Environment variable yang wajib diisi

Salin `.env.example` menjadi `.env.local` untuk development lokal.

```env
CMS_API_URL=https://domain-cms-kamu.com
CMS_READ_TOKEN=
CMS_REVALIDATE_SECRET='replace-with-a-new-long-random-secret'
CMS_REVALIDATE_SECONDS=2592000
CMS_FETCH_TIMEOUT_MS=15000
CMS_STRICT_MODE=false
```

Penjelasan:

| Variable | Wajib | Fungsi |
|---|---:|---|
| `CMS_API_URL` | Ya | Base URL backend CMS, tanpa trailing slash. |
| `CMS_READ_TOKEN` | Opsional | Bearer token jika endpoint CMS tidak publik. |
| `CMS_REVALIDATE_SECRET` | Ya untuk webhook | Secret yang harus sama antara CMS dan frontend. |
| `CMS_REVALIDATE_SECONDS` | Ya | Cache time-based dalam detik. Default contoh 30 hari. |
| `CMS_FETCH_TIMEOUT_MS` | Ya | Batas waktu request CMS. |
| `CMS_STRICT_MODE` | Tidak | `false`: fallback lokal aktif. `true`: CMS wajib tersedia. |

Untuk production, environment variable harus dimasukkan di control panel hosting. Mengisi `.env.example` saja tidak otomatis mengaktifkan variable di server.

## 3. Endpoint CMS default

Frontend mengharapkan endpoint berikut:

| Kebutuhan frontend | Endpoint default | Response type |
|---|---|---|
| Layout, brand, footer contact, social media, dan SEO global | `/api/layout` | `LayoutContent` |
| Homepage | `/api/home` | `HomeContent` |
| About page | `/api/about` | `AboutContent` |
| Products listing | `/api/products-page` | `ProductsContent` |
| Product detail | `/api/product-detail` | `ProductDetailContent` |
| FAQ page | `/api/faqs` | `FAQsContent` |
| News listing | `/api/news-page` | `NewsContent` |
| News detail | `/api/news-detail` | `NewsDetailContent` |

Response boleh langsung berupa object:

```json
{
  "products": []
}
```

atau dibungkus dengan `data`:

```json
{
  "data": {
    "products": []
  }
}
```

Jika developer CMS menggunakan endpoint berbeda, gunakan optional environment variable berikut tanpa mengubah UI:

```env
CMS_ENDPOINT_LAYOUT=/api/layout
CMS_ENDPOINT_HOME=/api/home
CMS_ENDPOINT_ABOUT=/api/about
CMS_ENDPOINT_PRODUCTS_PAGE=/api/products-page
CMS_ENDPOINT_PRODUCT_DETAIL=/api/product-detail
CMS_ENDPOINT_FAQS=/api/faqs
CMS_ENDPOINT_NEWS_PAGE=/api/news-page
CMS_ENDPOINT_NEWS_DETAIL=/api/news-detail
```


## 3A. Kontrak footer dan menu navigasi

Data berikut berasal dari CMS melalui response `/api/layout`:

- `siteSettings.siteName`
- `siteSettings.description`
- `siteSettings.phoneNumber`
- `siteSettings.whatsappNumber`
- `siteSettings.whatsappMessage`
- `siteSettings.email`
- `siteSettings.address`
- `siteSettings.mapUrl`
- `siteSettings.socials.instagram`
- `siteSettings.socials.facebook`
- `siteSettings.socials.tiktok`
- `footerSection.description`
- `footerSection.copyright`
- `footerSection.navigationTitle`
- `footerSection.contactTitle`
- `footerSection.socialTitle`

`phoneNumber` adalah nomor yang ditampilkan di kolom Contact Us. Klik pada nomor tersebut tetap membuka WhatsApp menggunakan `whatsappNumber` dan `whatsappMessage`, sehingga UI dan behavior lama tidak berubah. Email menggunakan link `mailto:`, alamat membuka `mapUrl`, dan icon media sosial hanya tampil bila URL terkait tersedia.

Semua field global di atas **hanya** dikirim oleh `/api/layout`. Endpoint halaman seperti `/api/products-page`, `/api/product-detail`, `/api/faqs`, `/api/news-page`, dan `/api/news-detail` tidak perlu mengulang `siteSettings` atau `siteMetadata`.

Menu utama **tidak dikelola CMS**. Daftar menu navbar dan Navigation pada footer berasal dari:

```txt
lib/navigation.ts
```

Daftar statis saat ini:

```ts
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'News', href: '/news' },
  { label: 'FAQs', href: '/faqs' },
];
```

Developer CMS tidak perlu mengirim `navigationItems`. Jika field itu tetap terkirim dari CMS, frontend mengabaikannya.

Contoh response lengkap tersedia di `docs/CMS_LAYOUT_RESPONSE.example.json`.

## 4. Kontrak data produk

Definisi TypeScript berada di `lib/cms-types.ts`.

```ts
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

export type ProductSpecifications = Partial<Record<ProductSpecificationKey, string>>;

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  tag?: string;
  description: string;
  detailDescription?: string[] | string;
  image: string;
  images: string[];
  technicalParams: {
    capacity?: string;
    efficiency?: string;
    roastingTime?: string;
    production?: string;
  };
  specifications: ProductSpecifications;
};
```

Contoh response produk:

```json
{
  "id": 2,
  "slug": "mre-series",
  "name": "MRE Series",
  "category": "Home Roastery",
  "tag": "Best Seller",
  "description": "Mesin roasting kopi kapasitas 1 kg.",
  "detailDescription": [
    "Paragraf pertama deskripsi panjang produk.",
    "Paragraf kedua menjelaskan kontrol dan fitur.",
    "Paragraf ketiga menjelaskan kapasitas dan penggunaan.",
    "Paragraf keempat menjelaskan material dan durabilitas.",
    "Paragraf kelima menjadi penutup produk."
  ],
  "image": "https://cdn.example.com/products/mre/cover.webp",
  "images": [
    "https://cdn.example.com/products/mre/front.webp",
    "https://cdn.example.com/products/mre/side.webp",
    "https://cdn.example.com/products/mre/detail.webp"
  ],
  "technicalParams": {
    "capacity": "1 Kg / batch",
    "efficiency": "Digital PID control",
    "roastingTime": "Menyesuaikan profil roasting",
    "production": "Coffee shop skala kecil"
  },
  "specifications": {
    "type": "MRE Series",
    "minRoast": "250 Gram",
    "maxRoast": "1 Kg",
    "ignition": "Gas",
    "airflow": "Adjustable",
    "drum": "Stainless Steel",
    "dimensions": "Isi dari CMS",
    "weight": "Isi dari CMS",
    "electricalPower": "220V / 2200W",
    "dataLogger": "Digital Monitoring"
  }
}
```

Catatan frontend:

- `images` mendukung jumlah gambar dinamis dari CMS.
- `detailDescription` tampil tepat di bawah judul produk. Gunakan array untuk memisahkan paragraf; satu string dengan jeda dua baris juga didukung.
- `technicalParams` memiliki empat field utama: `capacity`, `efficiency`, `roastingTime`, dan `production`.
- Label keempat field berasal dari `productDetailSection.technicalParameterFields` dan dapat dikirim CMS.
- Ikon Technical Parameters ditentukan oleh frontend agar visual tetap konsisten; CMS hanya mengirim label dan nilai.
- Technical Parameters tampil di bawah gallery foto, sedangkan Specifications tampil di kolom kanan.
- Tampilan awal saat ini menggunakan 3 gambar per produk.
- `image` digunakan sebagai cover/fallback dan untuk sebagian metadata.
- Detail produk menampilkan 10 field spesifikasi terstruktur: `type`, `minRoast`, `maxRoast`, `ignition`, `airflow`, `drum`, `dimensions`, `weight`, `electricalPower`, dan `dataLogger`.
- Lima field pertama tampil di kolom kiri dan lima field berikutnya tampil di kolom kanan.
- Label dan urutan field berasal dari `productDetailSection.specificationFields`, sehingga developer CMS dapat mengubah label tanpa menyentuh komponen UI.
- Section **Other Similar Product** hanya mengambil produk lain dengan `category` yang sama.
- Produk dengan `tag: "Best Seller"` otomatis diurutkan paling kiri pada daftar produk serupa.
- Array string lama masih diterima sementara sebagai mode kompatibilitas, tetapi CMS baru sebaiknya mengirim object `specifications`.
- URL gambar dapat berupa URL HTTPS dari CDN/CMS atau path lokal yang dimulai `/`.

## 5. Cache frontend

Frontend memakai satu cache layer melalui Next.js `fetch`:

```ts
next: {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms:all', ...tags]
}
```

Default contoh adalah 30 hari karena perubahan konten seharusnya dikirim melalui webhook. Jika webhook belum siap, gunakan nilai lebih pendek saat integrasi:

```env
CMS_REVALIDATE_SECONDS=300
```

Setelah webhook stabil, dapat dinaikkan kembali:

```env
CMS_REVALIDATE_SECONDS=2592000
```

Cache tags yang tersedia:

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

## 6. Webhook revalidation

CMS harus mengirim request ke frontend setelah content publish, update, atau delete. Cache tag dibuat expire dan path terkait ditandai untuk diregenerasi pada request berikutnya.

Endpoint frontend:

```txt
POST https://domain-frontend.com/api/cms/revalidate
```

Secret direkomendasikan dikirim melalui header:

```txt
x-cms-revalidate-secret: replace-with-a-new-long-random-secret
Content-Type: application/json
```

### Produk berubah

```json
{
  "tags": ["cms:products", "cms:product-detail", "cms:seo"],
  "paths": ["/products", "/products/mre-series"]
}
```

### Homepage berubah

```json
{
  "tags": ["cms:home", "cms:products", "cms:faqs"],
  "paths": ["/"]
}
```

### News berubah

```json
{
  "tags": ["cms:news", "cms:news-detail", "cms:seo"],
  "paths": ["/news", "/news/contoh-slug"]
}
```

### FAQ berubah

```json
{
  "tags": ["cms:faqs", "cms:seo"],
  "paths": ["/faqs", "/"]
}
```

### Semua content berubah

```json
{
  "tags": ["cms:all"],
  "paths": ["/", "/about", "/products", "/faqs", "/news"]
}
```

Frontend juga menerima secret melalui:

```txt
Authorization: Bearer <secret>
```

atau field `secret` di JSON body untuk kompatibilitas, tetapi header lebih disarankan.

## 7. Health check

Setelah deployment, buka:

```txt
https://domain-frontend.com/api/cms/health
```

Response berhasil akan menunjukkan:

- CMS sudah dikonfigurasi.
- Host CMS dapat dihubungi.
- Status endpoint layout.
- Cache duration.
- Strict mode.
- Daftar endpoint yang diharapkan.

Secret dan read token tidak pernah ditampilkan.

Untuk pengecekan dari terminal lokal:

```bash
npm run check:cms
```

## 8. Urutan kerja frontend developer

1. Copy `.env.example` menjadi `.env.local`.
2. Isi `CMS_API_URL`.
3. Isi `CMS_READ_TOKEN` jika CMS memakai private API.
4. Jalankan `npm run check:cms`.
5. Jalankan `npm run dev`.
6. Periksa `/api/cms/health`.
7. Cek semua halaman.
8. Uji webhook dengan produk test.
9. Setelah stabil, set `CMS_STRICT_MODE=true` jika CMS memang harus menjadi satu-satunya sumber data.
10. Masukkan variable yang sama ke environment hosting.

## 9. Urutan kerja developer CMS

1. Sediakan delapan endpoint sesuai kontrak atau informasikan override path.
2. Return JSON langsung atau `{ "data": ... }`.
3. Pastikan nama field sesuai `lib/cms-types.ts`.
4. Return URL gambar HTTPS yang dapat diakses frontend.
5. Sediakan Bearer token jika endpoint private.
6. Pasang webhook publish/update/delete.
7. Kirim cache tags dan affected paths yang sesuai.
8. Uji dengan `/api/cms/health` dan `npm run check:cms`.

## 10. Single source dan fallback

Dalam kode UI, data hanya diambil melalui `lib/cms.ts`. Ini adalah single access layer. Konten fallback juga dikelompokkan per endpoint dalam `cmsFallbackContent` agar tidak ada konfigurasi global yang disalin ke endpoint halaman.

Ada dua mode runtime:

- `CMS_STRICT_MODE=false`: CMS adalah sumber utama, `lib/cms-data.ts` menjadi fallback agar website tidak blank saat API belum siap.
- `CMS_STRICT_MODE=true`: CMS adalah satu-satunya sumber data. Jika CMS gagal, request gagal dan fallback tidak digunakan.

Untuk fase integrasi gunakan `false`. Setelah backend CMS stabil dan webhook sudah diuji, gunakan `true` jika dibutuhkan oleh kebijakan proyek.

## 11. Security

- Jangan expose `CMS_READ_TOKEN` ke variable `NEXT_PUBLIC_*`.
- Jangan expose `CMS_REVALIDATE_SECRET` ke browser.
- Jangan hard-code secret di komponen UI.
- Set secret melalui environment hosting.
- Gunakan secret acak yang panjang di environment hosting dan jangan menaruh nilai production di `.env.example`.

## 10. SEO field opsional dari CMS

Halaman dan item konten mendukung object opsional berikut tanpa mengubah UI:

```json
{
  "seo": {
    "title": "Judul SEO khusus",
    "description": "Deskripsi SEO khusus",
    "image": {
      "src": "https://cdn.example.com/seo/cover.webp",
      "alt": "Deskripsi gambar SEO"
    }
  },
  "updatedAt": "2026-06-08T12:00:00.000Z"
}
```

`seo` didukung pada `aboutPageSection`, `productPageSection`, `faqPageSection`, `newsPageSection`, setiap `Product`, dan setiap `NewsItem`. Jika tidak dikirim, frontend memakai heading, description, dan image yang sudah tersedia. `updatedAt` dipakai sitemap dan Article structured data agar tanggal perubahan tidak dibuat-buat.

## 11. Konten detail berita yang harus dikirim CMS

`newsDetailSection` juga menerima:

```json
{
  "relatedDescription": "Latest updates and stories from Steda Roaster.",
  "viewAllLabel": "Show More News",
  "readMoreLabel": "Read more"
}
```

## 12. Revalidation route SEO

Ketika layout, produk, atau berita berubah, CMS dapat ikut mengirim path berikut:

```json
{
  "paths": ["/sitemap.xml", "/robots.txt", "/manifest.webmanifest"]
}
```

Gunakan secret production baru yang hanya disimpan di environment hosting frontend dan konfigurasi webhook CMS. Jangan menyimpan secret asli di repository atau `.env.example`.
