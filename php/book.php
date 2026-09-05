<?php
/**
 * book.php
 * POST /php/book.php
 *
 * Validates a booking submission and appends it to data/bookings.json.
 * No SQL — this is a flat-file example intended for local Laragon/XAMPP
 * use. See config.php for why this endpoint is a no-op on Vercel, and
 * js/booking.js for the localStorage fallback that keeps the deployed
 * demo working without it.
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

$required = ['lawyerId', 'clientName', 'clientEmail', 'date', 'time', 'mode'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        json_response(['error' => "Missing required field: {$field}"], 422);
    }
}

$email = filter_var($input['clientEmail'], FILTER_VALIDATE_EMAIL);
if ($email === false) {
    json_response(['error' => 'Invalid email address'], 422);
}

$lawyers = read_json_file(LAWYERS_FILE);
$lawyerExists = false;
foreach ($lawyers as $lawyer) {
    if (($lawyer['id'] ?? null) === $input['lawyerId']) {
        $lawyerExists = true;
        break;
    }
}
if (!$lawyerExists) {
    json_response(['error' => 'Unknown lawyer selected'], 422);
}

$reference = 'DLB-' . date('Y') . '-' . random_int(1000, 9999);

$booking = [
    'reference'   => $reference,
    'lawyerId'    => sanitize_string($input['lawyerId']),
    'lawyerName'  => sanitize_string($input['lawyerName'] ?? ''),
    'clientName'  => sanitize_string($input['clientName']),
    'clientEmail' => $email,
    'clientPhone' => sanitize_string($input['clientPhone'] ?? ''),
    'date'        => sanitize_string($input['date']),
    'time'        => sanitize_string($input['time']),
    'mode'        => sanitize_string($input['mode']),
    'concern'     => sanitize_string($input['concern'] ?? ''),
    'createdAt'   => date(DATE_ATOM),
];

try {
    append_json_record(BOOKINGS_FILE, $booking);
} catch (RuntimeException $e) {
    json_response(['error' => 'Could not save booking. Please try again.'], 500);
}

json_response(['ok' => true, 'reference' => $reference], 201);
