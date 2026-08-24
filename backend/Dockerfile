# syntax=docker/dockerfile:1

# ============================================================
# Stage 1: install dependency composer (tanpa dev)
# ============================================================
FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --no-autoloader \
    --no-scripts

COPY . .

RUN composer dump-autoload --optimize --no-dev --classmap-authoritative --no-scripts

# ============================================================
# Stage 2: runtime PHP-FPM + Nginx + Supervisor
# ============================================================
FROM php:8.3-fpm-alpine AS runtime

# Paket sistem: nginx (web server), supervisor (multi-process), curl (healthcheck)
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    openssl

# Ekstensi PHP untuk Laravel 12 + PostgreSQL + upload file
COPY --from=mlocati/php-extension-installer:latest /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions \
    pdo_pgsql \
    bcmath \
    gd \
    intl \
    zip \
    exif \
    pcntl \
    opcache

WORKDIR /var/www/html

# Source code aplikasi
COPY --chown=www-data:www-data . .

# Dependency hasil stage 1 (menimpa folder kosong bila ada)
COPY --from=vendor --chown=www-data:www-data /app/vendor ./vendor

# Konfigurasi PHP, Nginx, Supervisor, dan entrypoint automation
COPY docker/php.ini         /usr/local/etc/php/conf.d/99-app.ini
COPY docker/opcache.ini     /usr/local/etc/php/conf.d/zz-opcache.ini
COPY docker/nginx.conf      /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh   /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh \
    # public/storage bisa ikut ter-copy sebagai file rusak dari Windows, hapus
    && rm -rf public/storage \
    # pastikan struktur storage lengkap (sebagian di-exclude .dockerignore)
    && mkdir -p \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/framework/testing \
        storage/logs \
        storage/app/public \
        storage/app/private \
        bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R ug+rwX storage bootstrap/cache

EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
