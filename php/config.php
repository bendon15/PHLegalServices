<?php
/**
 * config.php
 *
 * No SQL/database is used in this sample: the "backend" is a pair of
 * small PHP endpoints that read and write flat JSON files under /data.
 * This is intentional for a portfolio sample and mirrors what you'd
 * replace with a real database in production.
 *
 * IMPORTANT — Vercel note:
 * Vercel's PHP support (and serverless functions generally) run on a
 * read-only filesystem outside /tmp, so book.php cannot persist writes
 * there between requests. These endpoints are included and fully
 * functional for local use (Laragon/XAMPP/`php -S`), and the front end
 * (see js/booking.js and js/main.js) automatically falls back to
 * localStorage when these endpoints aren't reachable, so the deployed
 * demo keeps working either way.
 */

declare(strict_types=1);

define('DATA_DIR', __DIR__ . '/../data');
define('LAWYERS_FILE', DATA_DIR . '/lawyers.json');
define('BOOKINGS_FILE', DATA_DIR . '/bookings.json');

function json_response($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_file(string $path): array
{
    if (!file_exists($path)) {
        return [];
    }
    $raw = file_get_contents($path);
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

/**
 * Append one record to a JSON array file with an exclusive lock so two
 * concurrent bookings can't clobber each other on a local dev server.
 */
function append_json_record(string $path, array $record): void
{
    if (!is_dir(dirname($path))) {
        mkdir(dirname($path), 0775, true);
    }

    $fp = fopen($path, 'c+');
    if ($fp === false) {
        throw new RuntimeException('Unable to open data file for writing.');
    }

    flock($fp, LOCK_EX);
    $size = filesize($path) ?: 0;
    $contents = $size > 0 ? fread($fp, $size) : '[]';
    $records = json_decode($contents, true);
    if (!is_array($records)) {
        $records = [];
    }
    $records[] = $record;

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
}

function sanitize_string($value): string
{
    return trim(htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8'));
}
