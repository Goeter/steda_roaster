# Steda Roaster CMS Webhook + Cache Setup

Dokumentasi cache dan webhook sudah digabungkan ke kontrak integrasi utama:

```txt
docs/CMS_FRONTEND_INTEGRATION.md
```

Ringkasannya:

- Cache frontend menggunakan Next.js server `fetch` dengan `next.revalidate` dan cache tags.
- CMS memanggil `POST /api/cms/revalidate` setelah publish, update, atau delete.
- Secret disarankan dikirim melalui header `x-cms-revalidate-secret`.
- Cache tag dan path dibatasi agar webhook tidak dapat merevalidasi route sembarangan.
- Status koneksi CMS dapat diperiksa melalui `GET /api/cms/health`.
- Environment hosting harus berisi nilai dari `.env.example`.

Gunakan contoh payload dan mapping tag/path di `docs/CMS_FRONTEND_INTEGRATION.md` sebagai acuan developer CMS.
