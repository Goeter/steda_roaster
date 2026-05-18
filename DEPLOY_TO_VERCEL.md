# Steda Roaster Frontend - Vercel Ready

Project ini sudah dirapikan untuk deploy ke Vercel.

## Yang sudah diperbaiki

- `package.json` disinkronkan dengan `package-lock.json`.
- Node dikunci ke `20.x` dan npm ke `10.x` agar stabil di Vercel.
- `vercel.json` memakai `npm ci --no-audit --no-fund`.
- Komponen UI template yang tidak dipakai dan menyebabkan TypeScript error sudah dihapus.
- Build production sudah dites dengan `npm run build` dan berhasil.

## Cara upload ulang ke GitHub

1. Extract ZIP ini.
2. Upload semua isi folder ke repository GitHub frontend.
3. Jangan upload folder `node_modules` atau `.next`.
4. Di Vercel, lakukan Redeploy dengan `Clear Build Cache`.

## Vercel settings

Vercel akan membaca konfigurasi dari `vercel.json`:

```json
{
  "framework": "nextjs",
  "installCommand": "npm ci --no-audit --no-fund",
  "buildCommand": "npm run build"
}
```

Tidak perlu isi `outputDirectory`, karena ini project Next.js.
