# Vercel Deploy Fix

Perbaikan ini dibuat untuk menghindari error `npm error Exit handler never called!` saat Vercel menjalankan `npm install`.

## Yang diubah

- `package-lock.json` lama dihapus karena berisi resolved registry internal yang tidak bisa diakses oleh Vercel.
- `.npmrc` ditambahkan agar npm memakai public registry: `https://registry.npmjs.org/`.
- `.gitignore` ditambahkan agar `node_modules`, `.next`, `.env`, dan `.vercel` tidak ikut masuk GitHub.
- `vercel.json` ditambahkan agar Vercel memakai install command yang stabil.
- `next-env.d.ts` dibersihkan supaya tidak mengarah ke file `.next/types` yang belum tentu ada saat fresh install.
- `package.json` dipin ke versi public/stable untuk Next.js, React, dan React DOM.

## Cara upload ke GitHub

1. Extract ZIP ini.
2. Masuk ke folder project.
3. Jalankan lokal:

```bash
npm install
npm run build
```

4. Commit dan push ke GitHub:

```bash
git init
git add .
git commit -m "Fix Vercel npm install deployment"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA_REPO.git
git push -u origin main
```

## Setting Vercel yang disarankan

- Framework Preset: Next.js
- Install Command: `npm install --no-audit --no-fund`
- Build Command: `npm run build`
- Output Directory: kosongkan/default
- Node.js Version: 20.x atau 22.x

Jika Vercel masih memakai cache lama, buka Project Settings → Deployments atau redeploy dengan opsi **Clear Build Cache**.
