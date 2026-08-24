# LMS — Learning Management System

Aplikasi Learning Management System (LMS) berbasis web dengan autentikasi, manajemen kursus, materi (module), assignment, submission, enrollment, serta ujian online lengkap dengan hasil & riwayat ujian.

## Tech Stack

| Bagian   | Teknologi |
|----------|-----------|
| Backend  | Laravel 12 (PHP 8.2+), Laravel Sanctum, PostgreSQL |
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS 4, shadcn/ui (Radix), React Router 7 |
| Deploy   | Docker Compose (Nginx + PHP-FPM), reverse proxy `/api` & `/storage` di frontend |

## Fitur

- **Autentikasi** — register, login, logout (Sanctum token).
- **Manajemen User** — CRUD user dengan role: admin, teacher, student.
- **Kursus** — CRUD kursus, foto kursus, daftar kursus per teacher.
- **Module** — materi pembelajaran di dalam kursus.
- **Assignment & Submission** — tugas per module, pengumpulan tugas siswa, penilaian (grading) oleh guru.
- **Enrollment** — pendaftaran siswa ke kursus dan pelacakan progress.
- **Ujian Online** — CRUD exam & question (pilihan ganda), sesi ujian (`start`/`submit`), hasil ujian per exam dan per user.
- **Face Verification (proctoring)** — model `FaceLog` tersedia di backend; route masih dalam pengembangan.

## Struktur Proyek

```
.
├── backend/            # Laravel 12 — REST API
├── frontend/           # React + Vite — SPA
├── docker-compose.yml  # Orkestrasi deployment
├── DEPLOY.md           # Panduan deploy ke server
└── .env.example        # Template konfigurasi environment
```

## Menjalankan Lokal (Development)

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Sesuaikan DB_CONNECTION/DB_* di .env lalu:
php artisan migrate --seed
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment (Docker Compose)

Panduan lengkap ada di [DEPLOY.md](DEPLOY.md). Ringkasannya:

```bash
cp .env.example .env      # isi APP_KEY & kredensial DB
docker compose up -d --build
```

Yang terjadi otomatis saat start:

1. `db-init` membuat database `lms` jika belum ada.
2. `backend` menunggu DB siap → `migrate --force` → `db:seed` (idempotent) → `storage:link` → cache config/route/view.
3. `frontend` build statis + Nginx sebagai SPA sekaligus reverse proxy `/api/*` dan `/storage/*` ke backend.

### Port & Service

| Service       | Port host | Keterangan |
|---------------|-----------|------------|
| lms-frontend  | 3006      | SPA React + proxy `/api`, `/storage` |
| lms-backend   | 4001      | Laravel API (PHP-FPM + Nginx + queue worker) |
| db-init       | -         | one-shot, buat database bila belum ada |

### Akun Demo (dari Seeder)

| Role    | Email                          | Password  |
|---------|--------------------------------|-----------|
| Admin   | admin@example.com              | password  |
| Teacher | teacher1@example.com … teacher10@example.com | password |
| Student | student1@example.com … student10@example.com | password |

> Segera ganti password admin setelah login pertama.

## API Endpoint (Ringkasan)

Semua endpoint berada di bawah prefix `/api`, kecuali beberapa yang public:

- `POST /api/register`, `POST /api/login`, `POST /api/logout`
- `/api/users`, `/api/courses`, `/api/courses/{id}/modules`, `/api/modules/{id}/assignments`
- `/api/assignments/{id}/submissions`, `PUT /api/submissions/{id}/grade`
- `/api/courses/{id}/enroll`, `PUT /api/enrollments/{id}/progress`
- `/api/courses/{id}/exams`, `/api/exams/{id}/questions`
- `POST /api/exams/{id}/start`, `POST /api/exams/{id}/submit`
- `/api/exams/{id}/results`, `/api/users/{id}/results`

Healthcheck: `GET /up`.

## Perintah Berguna

```bash
# masuk shell backend / artisan
docker compose exec backend sh
docker compose exec backend php artisan migrate:status

# rebuild setelah update kode
git pull && docker compose up -d --build

# lihat log
docker compose logs -f backend frontend
```

## Catatan

- Data upload (foto kursus, dokumen assignment, avatar) tersimpan di named volume `lms_backend_storage`.
- Seeder idempotent (`firstOrCreate`) — aman dijalankan tiap restart tanpa menduplikasi data.
- Konvensi port homelab: frontend 3000–3099, backend 4000–4099.
