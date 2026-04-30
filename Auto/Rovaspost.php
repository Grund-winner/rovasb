<?php
// Rovaspost.php — Postback proxy for 1win affiliate program
// Receives GET params from 1win, validates, and forwards to Bot.php webhook

// Keys you DON'T want to send
$dontSend = ["my1", "my2"];

// Get incoming data
$data = $_REQUEST;

// Event check
$event = $_GET['event'] ?? null;

// Validate Deposit
function validateDeposit($data) {
    if (!isset($data['amount'])) {
        return false;
    }
    if (!is_numeric($data['amount'])) {
        return false;
    }
    if ($data['amount'] <= 0) {
        return false;
    }
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

    // Target URL — Updated to new Render deployment
    $url = "https://rovasb-app.onrender.com/Auto/Bot.php?action=webhook";

    // Send POST request with JSON
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonPayload)
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonPayload);
    $response = curl_exec($ch);
    curl_close($ch);

    echo "OK";
} else {
    echo "Missing or invalid fields.";
}
