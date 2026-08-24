# Panduan Deploy LMS ke Server Pribadi

Deploy via Docker Compose. Backend (Laravel 12) otomatis menjalankan migrate + seed saat start.

## Arsitektur

```
Browser -> :3006 frontend (Nginx SPA) -- /api & /storage --> backend:80 (Laravel, internal)
                                        \-> :4001 (backend diekspos juga untuk akses API langsung)
Database: pakai PostgreSQL homelab yang sudah ada (container `postgres`)
```

| Service | Port host | Keterangan |
|---------|-----------|------------|
| lms-frontend | 3006 | SPA React + proxy `/api`, `/storage` |
| lms-backend | 4001 | Laravel API (PHP-FPM + Nginx + queue worker) |
| db-init | - | one-shot, buat DB jika belum ada |

## Langkah Deploy

### 1. Siapkan environment

```bash
cd ~/lms   # lokasi repo di server
cp .env.example .env
nano .env
```

Isi `APP_KEY` (wajib untuk production):

```bash
# generate sekali dari mana saja:
docker run --rm php:8.3-cli-alpine php -r "echo 'base64:'.base64_encode(random_bytes(32)).PHP_EOL;"
```

Kalau `APP_KEY` dibiarkan kosong, entrypoint akan generate otomatis dan menyimpannya di volume storage (tetap aman antar-restart).

### 2. Build & jalankan

```bash
docker compose up -d --build
```

Otomatisasi yang terjadi:
- `db-init`: membuat database `lms` di PostgreSQL homelab (jika belum ada)
- `backend` menunggu DB siap, lalu: `migrate --force` -> `db:seed --force` (idempotent) -> `storage:link` -> cache config/route/view/event -> jalankan nginx + php-fpm + queue worker

### 3. Verifikasi

```bash
docker compose ps
docker logs lms-backend --tail 50

curl http://localhost:4001/up                 # healthcheck backend
curl http://localhost:3006/api/courses -H "Authorization: Bearer x" # akan 401 kalau route benar
```

Login admin default (dari seeder): **admin@example.com / password**

Akun demo lain: `teacher1@example.com` ... `teacher10@example.com`, `student1@example.com` ... `student10@example.com` (password: `password`). Ganti password admin setelah login!

### 4. Integrasi Nginx Proxy Manager

Forward domain -> `http://<ip-server>:3006` (frontend). Semua request `/api/*` dan `/storage/*` sudah diproxy oleh nginx frontend ke backend, jadi cukup satu domain.

## Perintah Berguna

```bash
# masuk shell backend
docker compose exec backend sh

# artisan manual
docker compose exec backend php artisan tinker
docker compose exec backend php artisan migrate:status

# rebuild setelah update kode
git pull && docker compose up -d --build

# lihat log
docker compose logs -f backend frontend
```

## Catatan

- Data upload (course photo, dokumen assignment, avatar) tersimpan di named volume `lms_backend_storage`.
- Seeder bersifat idempotent (`firstOrCreate`) — aman jalan tiap restart, tidak menduplikasi data.
- Port mengikuti konvensi homelab: frontend 3000-3099, backend 4000-4099.
