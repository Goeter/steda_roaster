# CMS Connection Fix

## Frontend environment

The supplied frontend reads `.env` locally. On Vercel or another Git-based host, `.env` is ignored by Git, so the same variables must also be entered in the hosting dashboard.

```env
CMS_API_URL=https://stedacms.duckdns.org
CMS_READ_TOKEN=
CMS_REVALIDATE_SECRET=CHANGE_ME_SAME_AS_BACKEND
CMS_REVALIDATE_SECONDS=60
CMS_FETCH_TIMEOUT_MS=20000
CMS_STRICT_MODE=false
```

The current Laravel API routes are public, so `CMS_READ_TOKEN` stays empty.

## Backend production environment

```env
APP_URL=https://stedacms.duckdns.org
FRONTEND_URL=https://YOUR-FRONTEND-DOMAIN
CMS_REVALIDATE_SECRET=THE_SAME_SECRET_AS_FRONTEND
```

After editing Laravel environment variables:

```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan storage:link
```

## Tests

Frontend CLI:

```bash
npm run check:cms
```

After deployment:

```text
https://YOUR-FRONTEND-DOMAIN/api/cms/health
```

The health endpoint checks all eight endpoints, JSON content type, and required top-level keys.
