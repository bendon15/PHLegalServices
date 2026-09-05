<?php
/**
 * contact.php
 * POST /php/contact.php
 *
 * Validates and stores a general contact-form message as a JSON record.
 * Same flat-file approach as book.php — see config.php for the note on
 * why this is a local-only endpoint and how the front end falls back to
 * localStorage on static hosting like Vercel.
 */

declare(strict_types=1);
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    json_response(['error' => 'Invalid JSON payload'], 400);
}

foreach (['name', 'email', 'subject', 'message'] as $field) {
    if (empty($input[$field])) {
        json_response(['error' => "Missing required field: {$field}"], 422);
    }
}

$email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
if ($email === false) {
    json_response(['error' => 'Invalid email address'], 422);
}

$record = [
    'name'      => sanitize_string($input['name']),
    'email'     => $email,
    'subject'   => sanitize_string($input['subject']),
    'message'   => sanitize_string($input['message']),
    'createdAt' => date(DATE_ATOM),
];

try {
    append_json_record(DATA_DIR . '/messages.json', $record);
} catch (RuntimeException $e) {
    json_response(['error' => 'Could not save message. Please try again.'], 500);
}

json_response(['ok' => true], 201);
