<?php

// Diagnostik koneksi database untuk entrypoint.
// Exit 0 jika koneksi berhasil; exit 1 dengan pesan penyebab ke stderr.

$host = getenv('DB_HOST') ?: 'postgres';
$port = getenv('DB_PORT') ?: '5432';
$user = getenv('DB_USERNAME');
$pass = getenv('DB_PASSWORD');

if ($user === false || $user === '' || $pass === false || $pass === '') {
    fwrite(STDERR, "ENV: DB_USERNAME / DB_PASSWORD kosong atau tidak terbaca di container");
    exit(1);
}

$resolved = @gethostbyname($host);
if ($resolved === $host) {
    fwrite(STDERR, "DNS: host '{$host}' tidak ditemukan di jaringan container (cek nama service & network)");
    exit(1);
}

try {
    new PDO(
        sprintf('pgsql:host=%s;port=%s', $host, $port),
        $user,
        $pass,
        [PDO::ATTR_TIMEOUT => 5]
    );
} catch (Throwable $e) {
    // contoh pesan: "Connection refused", "password authentication failed for user ..."
    fwrite(STDERR, substr($e->getMessage(), 0, 200));
    exit(1);
}

exit(0);
