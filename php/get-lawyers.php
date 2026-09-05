<?php
/**
 * get-lawyers.php
 * GET /php/get-lawyers.php
 *
 * Returns the sample lawyer directory as JSON. This is a plain read of
 * data/lawyers.json — no database involved. Included so the project
 * demonstrates a real PHP data endpoint when run under Laragon/XAMPP;
 * the deployed static site instead fetches data/lawyers.json directly
 * (see js/main.js), since Vercel's static hosting doesn't execute PHP.
 */

declare(strict_types=1);
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['error' => 'Method not allowed'], 405);
}

$lawyers = read_json_file(LAWYERS_FILE);
json_response($lawyers);
