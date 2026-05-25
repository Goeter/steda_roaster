# Cara Pasang Hotfix Vercel Steda Roaster

Masalah di log bukan dari folder public. Vercel masih membaca commit lama `02aed55`, package.json lama dengan `node: 20.x`, dan install command lama `npm ci --no-audit --no-fund`.

## File yang wajib diganti di root GitHub repo

Upload/replace file ini ke root repo `Goeter/steda_roaster` branch `main`:

- `package.json`
- `package-lock.json`
- `.npmrc`
- `vercel.json`

Root repo harus terlihat seperti ini:

```txt
steda_roaster/
├─ app/
├─ components/
├─ lib/
├─ public/
├─ package.json
├─ package-lock.json
├─ .npmrc
└─ vercel.json
```

## Setelah upload ke GitHub

1. Pastikan GitHub membuat commit baru, bukan lagi `02aed55`.
2. Di Vercel, redeploy tanpa build cache.
3. Log install harus berubah menjadi:

```bash
npm ci --registry=https://registry.npmjs.org/ --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000 --fetch-timeout=300000 --no-audit --no-fund
```

Jika log masih menampilkan `Commit: 02aed55`, berarti Vercel belum membaca file terbaru.
