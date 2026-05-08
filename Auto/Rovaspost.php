<?php
// Rovaspost.php — Postback proxy for 1win affiliate program
// Receives GET params from 1win, validates, and forwards to Bot.php webhook
// SECURITY: HMAC signature verification added

require_once __DIR__ . '/config.php';

// Shared secret for HMAC verification (set POSTBACK_SECRET env var)
$postbackSecret = getenv('POSTBACK_SECRET') ?: '';

// HMAC signature verification
if (isset($_SERVER['HTTP_X_SIGNATURE'])) {
    $providedSig = $_SERVER['HTTP_X_SIGNATURE'];
    $rawData = file_get_contents('php://input');
    $expectedSig = hash_hmac('sha256', $rawData, $postbackSecret);
    if (!hash_equals($expectedSig, $providedSig)) {
        http_response_code(403);
        exit('Invalid signature');
    }
    // Block if POSTBACK_SECRET not set
    if (empty($postbackSecret)) {
        http_response_code(500);
        exit('Postback secret not configured');
    }
}

// Rate limiting — max 60 requests per minute per IP
$rateLimitFile = sys_get_temp_dir() . '/rovaspost_rate_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (file_exists($rateLimitFile)) {
    $rateData = json_decode(file_get_contents($rateLimitFile), true);
    if ($rateData && $rateData['count'] > 60 && (time() - $rateData['start']) < 60) {
        http_response_code(429);
        exit('Rate limited');
    }
    if ((time() - $rateData['start']) >= 60) {
        $rateData = ['count' => 0, 'start' => time()];
    }
} else {
    $rateData = ['count' => 0, 'start' => time()];
}
$rateData['count']++;
@file_put_contents($rateLimitFile, json_encode($rateData));

// Keys you DON'T want to send
$dontSend = ["my1", "my2"];

// Get incoming data
$data = $_REQUEST;

// Event check
$event = $_GET['event'] ?? null;

// Validate Deposit
function validateDeposit($data) {
    if (!isset($data['amount'])) return false;
    if (!is_numeric($data['amount'])) return false;
    if ($data['amount'] <= 0) return false;
    return true;
}

// Required fields check
$requiredFields = [];

if ($event === "deposit") {
    $requiredFields = ["amount", "country", "transactionid"];
} elseif ($event === "registration") {
    $requiredFields = ["tgid", "hash", "time", "country", "userid"];
}

// Only proceed if event is set and all required fields are present
$canSend = true;
if ($event && !empty($requiredFields)) {
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            $canSend = false;
            break;
        }
    }

    // Deposit specific validation
    if ($event === "deposit" && $canSend) {
        $canSend = validateDeposit($data);
    }
} else {
    $canSend = false;
}

if ($canSend) {
    // Remove keys you don't want
    foreach ($dontSend as $key) {
        unset($data[$key]);
    }

    // Prepare JSON payload
    $jsonPayload = json_encode($data);

    // Target URL — Internal Render call
    $url = BASE_URL . '?action=webhook';

    // Add HMAC signature header for Bot.php verification
    $signature = hash_hmac('sha256', $jsonPayload, $postbackSecret);

    // Send POST request with JSON
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonPayload),
        'X-Signature: ' . $signature
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonPayload);
    $response = curl_exec($ch);
    curl_close($ch);

    echo "OK";
} else {
    echo "Missing or invalid fields.";
}
