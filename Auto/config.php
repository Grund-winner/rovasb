<?php
// ========================
// SECURE CONFIGURATION
// ========================
// ALL secrets loaded from environment variables ONLY.
// NO fallbacks — the app will fail explicitly if env vars are missing.
// Set these in Render Environment Variables.

// Database configuration - Neon PostgreSQL
define('DB_HOST', getenv('DB_HOST') ?: '');
define('DB_PORT', getenv('DB_PORT') ?: '5432');
define('DB_NAME', getenv('DB_NAME') ?: '');
define('DB_USER', getenv('DB_USER') ?: '');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_SSL', true);

// SQLite fallback for Rovaspredict.php
define('DB_PATH', __DIR__ . '/data/bot.db');

// Bot configuration — TOKEN from env var ONLY
define('TOKEN', getenv('BOT_TOKEN') ?: '');
define('WEBHOOK_SECRET', getenv('WEBHOOK_SECRET') ?: '');
define('CHANNEL', 'ROVASOFFICIEL');
define('PROMOCODE', 'ROVAS');
define('P_PARAM', '583j');

// Admin credentials from env var ONLY
define('ADMIN_USER', getenv('ADMIN_USER') ?: '');
define('ADMIN_PASS', getenv('ADMIN_PASS') ?: '');

// URLs
define('BASE_URL', 'https://rovasb-app.onrender.com/Auto/Bot.php');
define('WEB_APP_URL', 'https://rovasb-app.onrender.com/Auto/rovas/rovassoft-main/');

// PostgreSQL connection function
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        if (empty(DB_HOST) || empty(DB_NAME) || empty(DB_USER) || empty(DB_PASS)) {
            throw new Exception('Database not configured. Set DB_HOST, DB_NAME, DB_USER, DB_PASS env vars.');
        }
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
