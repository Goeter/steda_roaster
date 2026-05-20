# Steda Roaster — CMS Webhook Cache Ready Frontend

Project ini sudah disesuaikan dengan alur aman dan SEO-friendly:

```txt
Admin CMS -> POST/PUT/PATCH -> Backend CMS -> Database CMS -> Webhook -> Next.js revalidate/cache -> Customer view static/cache website
```

Baca dokumentasi utama di:

```txt
README_CMS_WEBHOOK_CACHE_SETUP.md
```

## Cara menjalankan

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run start
```

## Environment

Copy `.env.example` menjadi `.env.local`, lalu isi:

```env
CMS_API_URL=https://domain-cms-kamu.com
CMS_READ_TOKEN=optional-jika-api-butuh-token
CMS_REVALIDATE_SECRET=change-this-to-a-long-random-secret
CMS_REVALIDATE_SECONDS=2592000
```

## File penting

```txt
lib/cms.ts                         -> fetch server-side ke CMS API + cache tags + fallback
app/api/cms/revalidate/route.ts    -> webhook dari CMS untuk refresh cache frontend
lib/cms-data.ts                    -> fallback data jika CMS API belum ready/down
lib/cms-types.ts                   -> kontrak struktur response CMS API
app/sitemap.ts                     -> sitemap dinamis dari data CMS/cache
```

Customer browser tidak langsung akses database. Fetch konten dilakukan server-side oleh Next.js, lalu hasilnya di-cache/prerender. Saat admin update data, CMS memanggil webhook frontend untuk memperbarui cache.
