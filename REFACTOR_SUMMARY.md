# Ringkasan Refactor — Single Source CMS

## Global settings

Semua data global hanya berasal dari endpoint `GET /api/layout`:

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
- seluruh field `footerSection`
- seluruh field `siteMetadata`

Endpoint produk, FAQ, dan berita tidak perlu mengirim ulang `siteSettings` atau `siteMetadata`. Frontend mengambil global settings melalui `getLayoutContent()` dan konten halaman melalui getter endpoint masing-masing.

`phoneNumber` mengatur nomor yang terlihat pada Contact Us. Klik nomor tetap membuka WhatsApp menggunakan `whatsappNumber` dan `whatsappMessage`, sehingga behavior UI lama tetap sama. CMS lama yang belum mengirim `phoneNumber` otomatis memakai `whatsappNumber` sebagai fallback.

## Fallback dan strict mode

Fallback lokal dikelompokkan dalam satu object `cmsFallbackContent` di `lib/cms-data.ts`.

- `CMS_STRICT_MODE=false`: situs tetap tampil memakai fallback jika CMS tidak tersedia.
- `CMS_STRICT_MODE=true`: kegagalan koneksi CMS menyebabkan request gagal. Aktifkan hanya setelah API CMS stabil.

## Validasi sebelum deploy

```bash
npm ci
npm run check
npm run check:cms
```

`npm run build` otomatis menjalankan pemeriksaan konfigurasi deployment melalui script `prebuild`.

Jangan menyimpan secret production di repository. Isi `CMS_READ_TOKEN` dan `CMS_REVALIDATE_SECRET` melalui environment variables pada hosting.
