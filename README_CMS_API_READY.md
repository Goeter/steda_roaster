# Steda Roaster — CMS API Ready Frontend

Frontend memakai alur berikut:

```txt
Admin CMS -> Backend CMS -> Database CMS -> CMS API -> Next.js cache -> Website
                                         -> Webhook revalidation -> Next.js
```

Dashboard admin tetap dikelola oleh project CMS yang terpisah. Project ini hanya menyediakan frontend, kontrak API, cache, webhook, fallback, SEO, dan health check.

## Dokumentasi utama

Baca:

```txt
docs/CMS_FRONTEND_INTEGRATION.md
```

Dokumen tersebut berisi:

- Environment variable yang harus diisi.
- Endpoint CMS yang diharapkan frontend.
- Type dan contoh response.
- Product gallery dan specification contract.
- Cache tags dan webhook payload.
- Health check.
- Checklist frontend developer dan CMS developer.

## Menjalankan project

```bash
npm ci
npm run dev
```

## Validasi production

```bash
npm run typecheck
npm run build
npm run verify:deploy-config
```

Setelah `.env.local` terisi, cek koneksi CMS:

```bash
npm run check:cms
```

Health endpoint setelah website berjalan:

```txt
/api/cms/health
```

## File utama integrasi

```txt
lib/cms-config.ts                 -> endpoint, environment, cache tags, strict mode
lib/cms.ts                        -> single data access layer
lib/cms-types.ts                  -> TypeScript contract
lib/cms-data.ts                   -> local fallback dan contoh data
app/api/cms/revalidate/route.ts   -> CMS webhook receiver
app/api/cms/health/route.ts       -> safe CMS connectivity check
docs/CMS_FRONTEND_INTEGRATION.md  -> complete handoff contract
```
