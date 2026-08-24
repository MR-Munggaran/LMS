#!/bin/sh
# ============================================================
# Entrypoint automation LMS Backend
# 1. Tunggu database siap
# 2. Generate APP_KEY otomatis jika kosong
# 3. Migrate + seed (idempotent) otomatis
# 4. storage:link + optimasi cache production
# ============================================================
set -e

cd /var/www/html

echo "[entrypoint] Menunggu database ${DB_HOST:-postgres}:${DB_PORT:-5432}..."
i=0
until php -r '
try {
    new PDO(
        sprintf("pgsql:host=%s;port=%s", getenv("DB_HOST") ?: "postgres", getenv("DB_PORT") ?: "5432"),
        getenv("DB_USERNAME") ?: "admin",
        getenv("DB_PASSWORD")
    );
    exit(0);
} catch (Throwable $e) {
    exit(1);
}' >/dev/null 2>&1; do
    i=$((i + 1))
    if [ "$i" -ge 60 ]; then
        echo "[entrypoint] ERROR: database tidak kunjung siap." >&2
        exit 1
    fi
    sleep 2
done
echo "[entrypoint] Database siap."

# APP_KEY fallback: generate sekali, simpan agar stabil antar-restart
if [ -z "$APP_KEY" ]; then
    KEY_FILE="storage/app-key.txt"
    if [ -f "$KEY_FILE" ]; then
        export APP_KEY="$(cat "$KEY_FILE")"
        echo "[entrypoint] APP_KEY dimuat dari $KEY_FILE"
    else
        export APP_KEY="base64:$(openssl rand -base64 32)"
        echo "$APP_KEY" > "$KEY_FILE"
        echo "[entrypoint] APP_KEY baru digenerate & disimpan di $KEY_FILE (isi APP_KEY di .env root agar permanen)."
    fi
fi

php artisan migrate --force

# Seeder idempotent (firstOrCreate) -> aman dijalankan setiap deploy/restart
php artisan db:seed --force

rm -rf public/storage
php artisan storage:link || true

php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true

echo "[entrypoint] Selesai. Menjalankan supervisord..."
exec "$@"
