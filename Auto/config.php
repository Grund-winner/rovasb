<?php
// Database configuration - Neon PostgreSQL
define('DB_HOST', 'ep-flat-base-ano9evqe-pooler.c-6.us-east-1.aws.neon.tech');
define('DB_PORT', '5432');
define('DB_NAME', 'neondb');
define('DB_USER', 'neondb_owner');
define('DB_PASS', 'npg_RxGvbPYy5Nf9');
define('DB_SSL', true);

// SQLite fallback for Rovaspredict.php
define('DB_PATH', __DIR__ . '/data/bot.db');

// Bot configuration
define('TOKEN', '8436757891:AAFP1o04hTD5ka7NaWRGUOlBR-kiHYF1UMY');
define('CHANNEL', 'ROVASOFFICIEL');
define('PROMOCODE', 'ROVAS');
define('P_PARAM', '583j');

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
