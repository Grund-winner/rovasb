<?php
// ========================
// SECURE CONFIGURATION
// ========================
// All secrets loaded from environment variables.
// On Render, set these in Environment Variables.
// Fallbacks are for local dev only — remove before production.

// Database configuration - Neon PostgreSQL
define('DB_HOST', getenv('DB_HOST') ?: 'ep-flat-base-ano9evqe-pooler.c-6.us-east-1.aws.neon.tech');
define('DB_PORT', getenv('DB_PORT') ?: '5432');
define('DB_NAME', getenv('DB_NAME') ?: 'neondb');
define('DB_USER', getenv('DB_USER') ?: 'neondb_owner');
define('DB_PASS', getenv('DB_PASS') ?: 'npg_RxGvbPYy5Nf9');
define('DB_SSL', true);

// SQLite fallback for Rovaspredict.php
define('DB_PATH', __DIR__ . '/data/bot.db');

// Bot configuration — TOKEN from env var
define('TOKEN', getenv('BOT_TOKEN') ?: '8601017974:AAHI2L2Y3r61vTxKG_8ojbeLmVc0wxp9e9c');
define('WEBHOOK_SECRET', getenv('WEBHOOK_SECRET') ?: 'rnd_5kwxUwbMnTAXzKXktZAW5RKLuDjs');
define('CHANNEL', 'ROVASOFFICIEL');
define('PROMOCODE', 'ROVAS');
define('P_PARAM', '583j');

// Admin credentials from env var (format: username:password)
define('ADMIN_USER', getenv('ADMIN_USER') ?: 'rovas');
define('ADMIN_PASS', getenv('ADMIN_PASS') ?: 'Patrick2026@####');

// URLs
define('BASE_URL', 'https://rovasb-app.onrender.com/Auto/Bot.php');
define('WEB_APP_URL', 'https://rovasb-app.onrender.com/Auto/rovas/rovassoft-main/');

// PostgreSQL connection function
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'pgsql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';sslmode=require';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
    }
    return $pdo;
}
?>
