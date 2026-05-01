<?php
require_once __DIR__ . '/config.php';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');

$baseUrl = 'https://rovasb-app.onrender.com';
$timeStart = microtime(true);

// ── Health Check Functions ──
function checkUrl($url, $timeout = 10) {
    $start = microtime(true);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_CONNECTTIMEOUT => $timeout,
        CURLOPT_NOBODY => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER => ['User-Agent: RovasDiagnostic/1.0']
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    $latency = round((microtime(true) - $start) * 1000);
    curl_close($ch);
    return [
        'status' => ($httpCode >= 200 && $httpCode < 500) ? 'online' : 'offline',
        'http_code' => $httpCode,
        'latency' => $latency,
        'error' => $error,
        'response' => mb_substr($response, 0, 500)
    ];
}

function checkBotApi($token) {
    $start = microtime(true);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.telegram.org/bot{$token}/getMe",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER => ['User-Agent: RovasDiagnostic/1.0']
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    $latency = round((microtime(true) - $start) * 1000);
    curl_close($ch);
    $data = json_decode($response, true);
    $botInfo = null;
    if ($data && isset($data['ok']) && $data['ok']) {
        $botInfo = $data['result'];
    }
    return [
        'status' => $botInfo ? 'online' : 'offline',
        'http_code' => $httpCode,
        'latency' => $latency,
        'error' => $error,
        'bot_info' => $botInfo
    ];
}

function checkWebhook($token) {
    $start = microtime(true);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.telegram.org/bot{$token}/getWebhookInfo",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER => ['User-Agent: RovasDiagnostic/1.0']
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $latency = round((microtime(true) - $start) * 1000);
    curl_close($ch);
    $data = json_decode($response, true);
    $webhookInfo = null;
    if ($data && isset($data['ok']) && $data['ok']) {
        $webhookInfo = $data['result'];
    }
    return [
        'status' => $webhookInfo ? 'online' : 'offline',
        'latency' => $latency,
        'webhook_info' => $webhookInfo
    ];
}

function checkDatabase() {
    $start = microtime(true);
    try {
        $db = getDB();
        $db->query('SELECT 1');
        $latency = round((microtime(true) - $start) * 1000);
        
        // Get stats
        $totalUsers = (int)$db->query("SELECT COUNT(*) FROM users")->fetchColumn();
        $registered = (int)$db->query("SELECT COUNT(*) FROM users WHERE is_registered = 1")->fetchColumn();
        $deposited = (int)$db->query("SELECT COUNT(*) FROM users WHERE is_deposited = TRUE")->fetchColumn();
        $totalDeposits = (float)$db->query("SELECT COALESCE(SUM(deposit_amount), 0) FROM users WHERE is_deposited = TRUE")->fetchColumn();
        $todayUsers = (int)$db->query("SELECT COUNT(*) FROM users WHERE DATE(updated_at) = CURRENT_DATE")->fetchColumn();
        $todayDeposits = (float)$db->query("SELECT COALESCE(SUM(deposit_amount), 0) FROM users WHERE is_deposited = TRUE AND DATE(deposited_at) = CURRENT_DATE")->fetchColumn();
        
        // DB size
        $dbSize = (int)$db->query("SELECT pg_database_size('" . DB_NAME . "')")->fetchColumn();
        $dbSizeMB = round($dbSize / (1024 * 1024), 2);
        
        // Active connections
        $activeConns = (int)$db->query("SELECT count(*) FROM pg_stat_activity WHERE datname = '" . DB_NAME . "'")->fetchColumn();
        
        // Table sizes
        $usersSize = (int)$db->query("SELECT pg_total_relation_size('users')")->fetchColumn();
        
        return [
            'status' => 'online',
            'latency' => $latency,
            'stats' => [
                'total_users' => $totalUsers,
                'is_registered' => $registered,
                'deposited' => $deposited,
                'total_deposits' => $totalDeposits,
                'today_users' => $todayUsers,
                'today_deposits' => $todayDeposits,
                'db_size_mb' => $dbSizeMB,
                'active_connections' => $activeConns,
                'users_table_size' => round($usersSize / 1024, 1),
                'deposits_table_size' => 0
            ]
        ];
    } catch (Exception $e) {
        return [
            'status' => 'offline',
            'latency' => round((microtime(true) - $start) * 1000),
            'error' => $e->getMessage()
        ];
    }
}

function checkSiteControl() {
    $path = __DIR__ . '/rovas/rovassoft-main/setting.json';
    if (!file_exists($path)) {
        return ['status' => 'unknown', 'error' => 'setting.json not found'];
    }
    $content = file_get_contents($path);
    $settings = json_decode($content, true);
    return [
        'status' => $settings ? 'online' : 'offline',
        'settings' => $settings
    ];
}

// ── Run All Checks ──
$checks = [];

// 1. Bot API
$checks['bot_api'] = checkBotApi(TOKEN);

// 2. Webhook Status
$checks['webhook'] = checkWebhook(TOKEN);

// 3. Render Main Service
$checks['render_service'] = checkUrl($baseUrl . '/Auto/Bot.php');

// 4. PostgreSQL Database
$checks['database'] = checkDatabase();

// 5. Prediction Page
$checks['prediction_page'] = checkUrl($baseUrl . '/Auto/rovas/rovassoft-main/index.html');

// 6. Postback System
$checks['postback'] = checkUrl($baseUrl . '/Auto/Rovaspost.php');

// 7. Admin Panel
$checks['admin_panel'] = checkUrl($baseUrl . '/Auto/admin.php');

// 8. Game Manager
$checks['game_manager'] = checkUrl($baseUrl . '/Auto/rovas/rovassoft-main/admingjhdsgffx/');

// 9. Site Control
$checks['site_control'] = checkSiteControl();

// 10. Videos
$videoFiles = ['fr_inscription.mp4', 'fr_depot.mp4', 'other_inscription.mp4', 'other_depot.mp4'];
$videoStatus = [];
foreach ($videoFiles as $vf) {
    $vpath = __DIR__ . '/video/' . $vf;
    $videoStatus[$vf] = [
        'exists' => file_exists($vpath),
        'size_mb' => file_exists($vpath) ? round(filesize($vpath) / (1024 * 1024), 2) : 0
    ];
}

// ── Compute Summary ──
$onlineCount = 0;
$degradedCount = 0;
$offlineCount = 0;
foreach ($checks as $key => $check) {
    if ($check['status'] === 'online') $onlineCount++;
    elseif ($check['status'] === 'degraded') $degradedCount++;
    else $offlineCount++;
}
$allServicesOk = ($offlineCount === 0 && $degradedCount === 0);

$pageLatency = round((microtime(true) - $timeStart) * 1000);
$currentTime = date('H:i:s');

// ── Determine active tab from URL ──
$activeTab = isset($_GET['tab']) ? $_GET['tab'] : 'overview';
$validTabs = ['overview', 'bots', 'infrastructure', 'variables'];
if (!in_array($activeTab, $validTabs)) $activeTab = 'overview';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ROVAS Diagnostic Panel</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{
            font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text","Helvetica Neue",Arial,sans-serif;
            background:#0a0a1a;color:#f1f5f9;
            -webkit-font-smoothing:antialiased;
            min-height:100vh;
        }
        .bg-mesh{
            position:fixed;top:0;left:0;right:0;bottom:0;z-index:0;
            background:
                radial-gradient(at 20% 20%,rgba(96,165,250,0.08) 0%,transparent 50%),
                radial-gradient(at 80% 80%,rgba(167,139,250,0.08) 0%,transparent 50%),
                radial-gradient(rgba(52,211,153,0.04) 0%,transparent 50%);
        }
        .grid-pattern{
            position:fixed;top:0;left:0;right:0;bottom:0;z-index:0;
            background-size:60px 60px;
            background-image:
                linear-gradient(to right,rgba(255,255,255,0.02) 1px,transparent 1px),
                linear-gradient(to bottom,rgba(255,255,255,0.02) 1px,transparent 1px);
        }
        .container{
            position:relative;z-index:10;min-height:100vh;
            padding:16px;max-width:1400px;margin:0 auto;
        }
        @media(min-width:768px){.container{padding:32px}}

        /* Glass */
        .glass{
            background:rgba(255,255,255,0.05);
            backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
            border:1px solid rgba(255,255,255,0.1);
            border-radius:20px;
        }
        .glass-sm{
            background:rgba(255,255,255,0.03);
            backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:14px;
        }
        .glass:hover,.glass-hover:hover{
            background:rgba(255,255,255,0.08);
            border-color:rgba(255,255,255,0.15);
            transform:translateY(-2px);
            box-shadow:0 8px 32px rgba(0,0,0,0.3);
            transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .glass,.glass-sm,.glass-hover{transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}

        /* Header */
        .header{margin-bottom:32px}
        .header-inner{display:flex;flex-direction:column;gap:16px}
        @media(min-width:768px){
            .header-inner{flex-direction:row;align-items:center;justify-content:space-between}
        }
        .logo-area{display:flex;align-items:center;gap:12px;margin-bottom:8px}
        .logo-icon{
            width:40px;height:40px;border-radius:12px;
            background:linear-gradient(to bottom-right,rgba(16,185,129,0.2),rgba(6,182,212,0.2));
            border:1px solid rgba(16,185,129,0.2);
            display:flex;align-items:center;justify-content:center;
        }
        .logo-icon svg{width:20px;height:20px;color:#34d399}
        .page-title{
            font-size:24px;font-weight:700;letter-spacing:-0.025em;
            background:linear-gradient(to right,#fff,#e2e8f0,#94a3b8);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;
            background-clip:text;
        }
        @media(min-width:768px){.page-title{font-size:30px}}
        .subtitle{font-size:14px;color:#64748b;margin-left:52px}
        .header-actions{display:flex;align-items:center;gap:12px}
        .btn-refresh{
            display:flex;align-items:center;gap:8px;
            padding:8px 16px;font-size:14px;color:#cbd5e1;
            cursor:pointer;border:none;background:none;
        }
        .btn-refresh svg{width:16px;height:16px}
        .btn-refresh:hover{color:#fff}
        .last-check{font-size:12px;color:#64748b}
        @media(max-width:767px){.last-check{display:none}}

        /* Status Banner */
        .status-banner{
            padding:16px;margin-bottom:24px;display:flex;
            align-items:center;justify-content:space-between;
            flex-wrap:wrap;gap:12px;
        }
        .status-left{display:flex;align-items:center;gap:10px}
        .status-text{font-size:14px;font-weight:500;color:#cbd5e1}
        .status-counters{display:flex;gap:16px}
        .status-counter{display:flex;align-items:center;gap:6px;font-size:12px;color:#94a3b8}
        .dot{border-radius:50%;flex-shrink:0}
        .dot-sm{width:8px;height:8px}
        .dot-md{width:12px;height:12px}
        .dot-green{background:#34d399}
        .dot-yellow{background:#fbbf24}
        .dot-red{background:#f87171}

        @keyframes pulse-green{0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.5)}50%{box-shadow:0 0 0 8px rgba(52,211,153,0)}}
        @keyframes pulse-red{0%,100%{box-shadow:0 0 0 0 rgba(248,113,113,0.5)}50%{box-shadow:0 0 0 8px rgba(248,113,113,0)}}
        @keyframes pulse-yellow{0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,0.5)}50%{box-shadow:0 0 0 8px rgba(251,191,36,0)}}
        .pulse-green{animation:pulse-green 2s ease-in-out infinite}
        .pulse-red{animation:pulse-red 2s ease-in-out infinite}
        .pulse-yellow{animation:pulse-yellow 2s ease-in-out infinite}

        /* Tabs */
        .tabs{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap}
        .tab{
            display:flex;align-items:center;gap:8px;
            padding:10px 16px;font-size:14px;color:#94a3b8;
            cursor:pointer;white-space:nowrap;
            text-decoration:none;
        }
        .tab svg{width:16px;height:16px;stroke-width:1.5}
        .tab:hover{color:#fff}
        .tab.active{
            background:rgba(255,255,255,0.1);
            border-color:rgba(255,255,255,0.2);
            color:#fff;
        }

        /* Cards Grid */
        .cards-grid{
            display:grid;grid-template-columns:1fr;gap:16px;
            margin-bottom:24px;
        }
        @media(min-width:768px){.cards-grid{grid-template-columns:1fr 1fr}}

        /* Diagnostic Card */
        .diag-card{
            padding:20px;cursor:default;position:relative;overflow:hidden;
        }
        .diag-card::before{
            content:'';position:absolute;top:0;left:0;right:0;height:1px;
            background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);
        }
        .glow-green{box-shadow:0 0 20px rgba(52,211,153,0.15),inset 0 0 20px rgba(52,211,153,0.05)}
        .glow-red{box-shadow:0 0 20px rgba(248,113,113,0.15),inset 0 0 20px rgba(248,113,113,0.05)}
        .glow-yellow{box-shadow:0 0 20px rgba(251,191,36,0.15),inset 0 0 20px rgba(251,191,36,0.05)}

        .card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px}
        .card-info{display:flex;align-items:center;gap:12px}
        .card-icon{
            width:44px;height:44px;border-radius:16px;
            display:flex;align-items:center;justify-content:center;
        }
        .card-icon svg{width:20px;height:20px;stroke-width:1.5}
        .card-name{font-size:14px;font-weight:600;color:#fff}
        .card-meta{font-size:12px;color:#64748b;margin-top:2px}
        .card-meta span{color:rgba(0,183,215,0.7)}

        .status-badge{display:flex;align-items:center;gap:6px}
        .status-label{font-size:12px;font-weight:500}

        /* Health Checks */
        .health-rows{display:flex;flex-direction:column;gap:8px}
        .health-row{display:flex;align-items:center;gap:10px}
        .check-badge{
            width:20px;height:20px;border-radius:6px;
            display:flex;align-items:center;justify-content:center;
            font-size:12px;font-weight:bold;flex-shrink:0;
        }
        .check-ok{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);color:#34d399}
        .check-fail{background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.2);color:#f87171}
        .check-warn{background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);color:#fbbf24}
        .health-label{font-size:12px;color:#94a3b8;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .health-value{font-size:10px;color:#475569;flex-shrink:0}

        .card-footer{
            border-top:1px solid rgba(255,255,255,0.05);
            padding-top:12px;margin-top:16px;
            display:flex;align-items:center;justify-content:space-between;
        }
        .card-footer span{font-size:10px;color:#475569}

        /* Stat Cards */
        .stats-grid{
            display:grid;grid-template-columns:repeat(2,1fr);gap:12px;
            margin-bottom:24px;
        }
        @media(min-width:768px){.stats-grid{grid-template-columns:repeat(4,1fr)}}
        .stat-card{
            padding:16px;text-align:center;
        }
        .stat-value{font-size:24px;font-weight:700;color:#fff;margin-bottom:4px}
        @media(min-width:768px){.stat-value{font-size:28px}}
        .stat-label{font-size:12px;color:#94a3b8}
        .stat-trend{font-size:11px;margin-top:4px}
        .trend-up{color:#34d399}
        .trend-neutral{color:#64748b}

        /* Infra Section */
        .infra-section{
            padding:20px;margin-bottom:24px;
        }
        .infra-title{
            display:flex;align-items:center;gap:10px;
            font-size:14px;font-weight:600;color:#fff;
            margin-bottom:16px;
        }
        .infra-title svg{width:20px;height:20px;color:#22d3ee;stroke-width:1.5}
        .infra-item{
            padding:12px;border-radius:12px;
            background:rgba(16,185,129,0.1);
            border:1px solid rgba(16,185,129,0.2);
            display:flex;align-items:center;gap:12px;
        }
        .infra-item.offline{
            background:rgba(248,113,113,0.1);
            border-color:rgba(248,113,113,0.2);
        }
        .infra-badge{
            width:24px;height:24px;border-radius:8px;
            display:flex;align-items:center;justify-content:center;
            font-size:13px;font-weight:bold;
            background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);color:#34d399;
        }
        .infra-item.offline .infra-badge{
            background:rgba(248,113,113,0.1);border-color:rgba(248,113,113,0.2);color:#f87171;
        }
        .infra-name{font-size:14px;color:#fff}
        .infra-detail{font-size:12px;color:#64748b;margin-top:2px}

        /* Variables Table */
        .var-section{padding:20px;margin-bottom:24px}
        .var-title{
            display:flex;align-items:center;gap:10px;
            font-size:14px;font-weight:600;color:#fff;
            margin-bottom:16px;
        }
        .var-title svg{width:20px;height:20px;color:#a78bfa;stroke-width:1.5}
        .var-table{width:100%;border-collapse:separate;border-spacing:0 4px}
        .var-table th{
            text-align:left;font-size:11px;color:#64748b;
            padding:8px 12px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;
        }
        .var-table td{
            padding:10px 12px;font-size:13px;
        }
        .var-table tr td:first-child{color:#94a3b8;font-family:monospace}
        .var-table tr td:last-child{color:#e2e8f0;word-break:break-all}
        .var-table tbody tr{
            background:rgba(255,255,255,0.03);border-radius:8px;
        }
        .var-table tbody tr td:first-child{border-radius:8px 0 0 8px}
        .var-table tbody tr td:last-child{border-radius:0 8px 8px 0}

        /* Video Grid */
        .video-grid{
            display:grid;grid-template-columns:1fr 1fr;gap:12px;
            margin-top:16px;
        }
        .video-item{
            padding:12px;border-radius:12px;
            background:rgba(255,255,255,0.03);
            border:1px solid rgba(255,255,255,0.08);
            display:flex;align-items:center;gap:10px;
        }
        .video-icon{font-size:20px;flex-shrink:0}
        .video-name{font-size:12px;color:#e2e8f0;word-break:break-all}
        .video-size{font-size:11px;color:#64748b;margin-top:2px}
        .video-missing{color:#f87171}

        /* Tab Content */
        .tab-content{display:none}
        .tab-content.active{display:block}

        /* Footer */
        .footer{
            margin-top:32px;padding-top:24px;
            border-top:1px solid rgba(255,255,255,0.05);
            display:flex;flex-direction:column;align-items:center;gap:4px;
            text-align:center;
        }
        @media(min-width:768px){
            .footer{flex-direction:row;justify-content:space-between}
        }
        .footer span{font-size:10px;color:#334155}

        /* Scrollbar */
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px}
        ::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.2)}

        /* Error detail */
        .error-detail{
            margin-top:12px;padding:12px;border-radius:10px;
            background:rgba(248,113,113,0.05);border:1px solid rgba(248,113,113,0.15);
            font-size:11px;color:#f87171;font-family:monospace;
            word-break:break-all;max-height:80px;overflow-y:auto;
        }

        /* Responsive fixes */
        @media(max-width:767px){
            .status-counters{flex-wrap:wrap}
            .stats-grid{grid-template-columns:repeat(2,1fr)}
            .video-grid{grid-template-columns:1fr}
        }
    </style>
</head>
<body>
    <div class="bg-mesh"></div>
    <div class="grid-pattern"></div>

    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-inner">
                <div>
                    <div class="logo-area">
                        <div class="logo-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                <path d="M9 12l2 2 4-4"/>
                            </svg>
                        </div>
                        <h1 class="page-title">ROVAS Diagnostic</h1>
                    </div>
                    <p class="subtitle">Panneau d'Administration Diagnostique &bull; Monitoring temps r&eacute;el</p>
                </div>
                <div class="header-actions">
                    <span class="last-check">Derni&egrave;re v&eacute;rification: <?= $currentTime ?></span>
                    <button class="btn-refresh glass glass-hover" onclick="location.reload()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12a9 9 0 1 1-3.36-7"/>
                            <path d="M21 3v6h-6"/>
                        </svg>
                        Actualiser
                    </button>
                </div>
            </div>
        </header>

        <!-- Status Banner -->
        <div class="status-banner glass">
            <div class="status-left">
                <?php if ($allServicesOk): ?>
                    <div class="dot dot-md dot-green pulse-green"></div>
                    <span class="status-text">Tous les syst&egrave;mes op&eacute;rationnels</span>
                <?php else: ?>
                    <div class="dot dot-md dot-yellow pulse-yellow"></div>
                    <span class="status-text">Attention requise &mdash; <?= $offlineCount ?> probl&egrave;me(s) d&eacute;tect&eacute;(s)</span>
                <?php endif; ?>
            </div>
            <div class="status-counters">
                <div class="status-counter">
                    <div class="dot dot-sm dot-green"></div>
                    <span><?= $onlineCount ?> En ligne</span>
                </div>
                <div class="status-counter">
                    <div class="dot dot-sm dot-yellow"></div>
                    <span><?= $degradedCount ?> D&eacute;grad&eacute;</span>
                </div>
                <div class="status-counter">
                    <div class="dot dot-sm dot-red"></div>
                    <span><?= $offlineCount ?> Hors ligne</span>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs">
            <a href="?tab=overview" class="tab glass glass-hover <?= $activeTab === 'overview' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                Vue d'ensemble
            </a>
            <a href="?tab=bots" class="tab glass glass-hover <?= $activeTab === 'bots' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2"/>
                    <circle cx="12" cy="5" r="2"/>
                    <path d="M12 7v4"/>
                    <line x1="8" y1="16" x2="8" y2="16"/>
                    <line x1="16" y1="16" x2="16" y2="16"/>
                </svg>
                Bots
            </a>
            <a href="?tab=infrastructure" class="tab glass glass-hover <?= $activeTab === 'infrastructure' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2"/>
                    <line x1="6" y1="6" x2="6.01" y2="6"/>
                    <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
                Infrastructure
            </a>
            <a href="?tab=variables" class="tab glass glass-hover <?= $activeTab === 'variables' ? 'active' : '' ?>">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                Variables
            </a>
        </div>

        <!-- ═══════════════ OVERVIEW TAB ═══════════════ -->
        <div class="tab-content <?= $activeTab === 'overview' ? 'active' : '' ?>">
            <?php if (isset($checks['database']['stats'])): $s = $checks['database']['stats']; ?>
            <!-- Stats Grid -->
            <div class="stats-grid">
                <div class="stat-card glass-sm">
                    <div class="stat-value"><?= number_format($s['total_users']) ?></div>
                    <div class="stat-label">Utilisateurs Total</div>
                    <div class="stat-trend trend-up">+<?= $s['today_users'] ?> aujourd'hui</div>
                </div>
                <div class="stat-card glass-sm">
                    <div class="stat-value"><?= number_format($s['is_registered']) ?></div>
                    <div class="stat-label">Inscrits</div>
                    <div class="stat-trend trend-neutral"><?= round(($s['is_registered']/$s['total_users'])*100, 1) ?>% du total</div>
                </div>
                <div class="stat-card glass-sm">
                    <div class="stat-value"><?= number_format($s['deposited']) ?></div>
                    <div class="stat-label">D&eacute;p&ocirc;ts</div>
                    <div class="stat-trend trend-neutral"><?= round(($s['deposited']/$s['is_registered'])*100, 1) ?>% des inscrits</div>
                </div>
                <div class="stat-card glass-sm">
                    <div class="stat-value">$<?= number_format($s['total_deposits'], 2) ?></div>
                    <div class="stat-label">Total D&eacute;p&ocirc;ts</div>
                    <div class="stat-trend trend-up">$<?= number_format($s['today_deposits'], 2) ?> aujourd'hui</div>
                </div>
            </div>
            <?php endif; ?>

            <!-- Main Service Cards -->
            <div class="cards-grid">
                <!-- Bot API Card -->
                <?php
                $ba = $checks['bot_api'];
                $baOk = $ba['status'] === 'online';
                ?>
                <div class="diag-card glass <?= $baOk ? 'glow-green' : 'glow-red' ?>">
                    <div class="card-top">
                        <div class="card-info">
                            <div class="card-icon" style="background:linear-gradient(to bottom-right,rgba(168,85,247,0.15),rgba(236,72,153,0.15));border:1px solid rgba(168,85,247,0.2)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="11" width="18" height="10" rx="2"/>
                                    <circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
                                    <line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
                                </svg>
                            </div>
                            <div>
                                <div class="card-name">Telegram Bot API</div>
                                <div class="card-meta">Platform: Telegram</div>
                            </div>
                        </div>
                        <div class="status-badge">
                            <div class="dot dot-md <?= $baOk ? 'dot-green pulse-green' : 'dot-red pulse-red' ?>"></div>
                            <span class="status-label" style="color:<?= $baOk ? '#34d399' : '#f87171' ?>"><?= $baOk ? 'En ligne' : 'Hors ligne' ?></span>
                        </div>
                    </div>
                    <div class="health-rows">
                        <div class="health-row">
                            <div class="check-badge check-<?= $baOk ? 'ok' : 'fail' ?>"><?= $baOk ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label">API getMe</span>
                            <span class="health-value"><?= $ba['latency'] ?>ms</span>
                        </div>
                        <?php if ($baOk && $ba['bot_info']): ?>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">@<?= htmlspecialchars($ba['bot_info']['username']) ?></span>
                            <span class="health-value"><?= htmlspecialchars($ba['bot_info']['first_name']) ?></span>
                        </div>
                        <?php endif; ?>
                        <?php
                        $wh = $checks['webhook'];
                        $whOk = $wh['status'] === 'online' && $wh['webhook_info'] && $wh['webhook_info']['url'] !== '';
                        ?>
                        <div class="health-row">
                            <div class="check-badge check-<?= $whOk ? 'ok' : 'warn' ?>"><?= $whOk ? '&#10003;' : '&#9888;' ?></div>
                            <span class="health-label">Webhook <?= $whOk ? 'configur&eacute;' : 'NON configur&eacute;' ?></span>
                            <span class="health-value"><?= $wh['latency'] ?>ms</span>
                        </div>
                        <?php if ($wh['webhook_info']): ?>
                        <?php if ($wh['webhook_info']['last_error_date'] > 0): ?>
                        <div class="health-row">
                            <div class="check-badge check-fail">&#10007;</div>
                            <span class="health-label">Derni&egrave;re erreur webhook</span>
                            <span class="health-value"><?= date('d/m H:i', $wh['webhook_info']['last_error_date']) ?></span>
                        </div>
                        <?php endif; ?>
                        <?php if ($wh['webhook_info']['pending_update_count'] > 0): ?>
                        <div class="health-row">
                            <div class="check-badge check-warn">&#9888;</div>
                            <span class="health-label">Updates en attente</span>
                            <span class="health-value"><?= $wh['webhook_info']['pending_update_count'] ?></span>
                        </div>
                        <?php endif; ?>
                        <?php endif; ?>
                    </div>
                    <?php if (!$baOk && $ba['error']): ?>
                        <div class="error-detail"><?= htmlspecialchars($ba['error']) ?></div>
                    <?php endif; ?>
                    <div class="card-footer">
                        <span>Bot ID: <?= $baOk ? $ba['bot_info']['id'] : 'N/A' ?></span>
                        <span><?= $ba['latency'] ?>ms</span>
                    </div>
                </div>

                <!-- Render Service Card -->
                <?php
                $rs = $checks['render_service'];
                $rsOk = $rs['status'] === 'online';
                ?>
                <div class="diag-card glass <?= $rsOk ? 'glow-green' : 'glow-red' ?>">
                    <div class="card-top">
                        <div class="card-info">
                            <div class="card-icon" style="background:linear-gradient(to bottom-right,rgba(96,165,250,0.15),rgba(59,130,246,0.15));border:1px solid rgba(96,165,250,0.2)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="2" width="20" height="8" rx="2"/>
                                    <rect x="2" y="14" width="20" height="8" rx="2"/>
                                    <line x1="6" y1="6" x2="6.01" y2="6"/>
                                    <line x1="6" y1="18" x2="6.01" y2="18"/>
                                </svg>
                            </div>
                            <div>
                                <div class="card-name">Render Service</div>
                                <div class="card-meta">Platform: Render &bull; <span>rovasb-app.onrender.com</span></div>
                            </div>
                        </div>
                        <div class="status-badge">
                            <div class="dot dot-md <?= $rsOk ? 'dot-green pulse-green' : 'dot-red pulse-red' ?>"></div>
                            <span class="status-label" style="color:<?= $rsOk ? '#34d399' : '#f87171' ?>"><?= $rsOk ? 'En ligne' : 'Hors ligne' ?></span>
                        </div>
                    </div>
                    <div class="health-rows">
                        <div class="health-row">
                            <div class="check-badge check-<?= $rsOk ? 'ok' : 'fail' ?>"><?= $rsOk ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label">Bot.php (Webhook handler)</span>
                            <span class="health-value">HTTP <?= $rs['http_code'] ?> &bull; <?= $rs['latency'] ?>ms</span>
                        </div>
                        <?php
                        $pp = $checks['prediction_page'];
                        $ppOk = $pp['status'] === 'online';
                        ?>
                        <div class="health-row">
                            <div class="check-badge check-<?= $ppOk ? 'ok' : 'fail' ?>"><?= $ppOk ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label">Page de pr&eacute;diction (index.html)</span>
                            <span class="health-value"><?= $pp['latency'] ?>ms</span>
                        </div>
                        <?php
                        $ap = $checks['admin_panel'];
                        $apOk = $ap['status'] === 'online';
                        ?>
                        <div class="health-row">
                            <div class="check-badge check-<?= $apOk ? 'ok' : 'fail' ?>"><?= $apOk ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label">Panneau Admin</span>
                            <span class="health-value"><?= $ap['latency'] ?>ms</span>
                        </div>
                        <?php
                        $gm = $checks['game_manager'];
                        $gmOk = $gm['status'] === 'online';
                        ?>
                        <div class="health-row">
                            <div class="check-badge check-<?= $gmOk ? 'ok' : 'fail' ?>"><?= $gmOk ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label">Game Manager</span>
                            <span class="health-value"><?= $gm['latency'] ?>ms</span>
                        </div>
                    </div>
                    <?php if (!$rsOk): ?>
                        <div class="error-detail"><?= htmlspecialchars($rs['error']) ?></div>
                    <?php endif; ?>
                    <div class="card-footer">
                        <span>Render Web Service</span>
                        <span><?= $rs['latency'] ?>ms</span>
                    </div>
                </div>

                <!-- Database Card -->
                <?php
                $db = $checks['database'];
                $dbOk = $db['status'] === 'online';
                ?>
                <div class="diag-card glass <?= $dbOk ? 'glow-green' : 'glow-red' ?>">
                    <div class="card-top">
                        <div class="card-info">
                            <div class="card-icon" style="background:linear-gradient(to bottom-right,rgba(34,211,238,0.15),rgba(6,182,212,0.15));border:1px solid rgba(34,211,238,0.2)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-linecap="round" stroke-linejoin="round">
                                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                                </svg>
                            </div>
                            <div>
                                <div class="card-name">PostgreSQL (Neon)</div>
                                <div class="card-meta">Host: <?= DB_HOST ?></div>
                            </div>
                        </div>
                        <div class="status-badge">
                            <div class="dot dot-md <?= $dbOk ? 'dot-green pulse-green' : 'dot-red pulse-red' ?>"></div>
                            <span class="status-label" style="color:<?= $dbOk ? '#34d399' : '#f87171' ?>"><?= $dbOk ? 'En ligne' : 'Hors ligne' ?></span>
                        </div>
                    </div>
                    <?php if ($dbOk): ?>
                    <div class="health-rows">
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Connexion PDO</span>
                            <span class="health-value"><?= $db['latency'] ?>ms</span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Table users (<?= $db['stats']['users_table_size'] ?> KB)</span>
                            <span class="health-value"><?= number_format($db['stats']['total_users']) ?> rows</span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Table deposits (<?= $db['stats']['deposits_table_size'] ?> KB)</span>
                            <span class="health-value"><?= number_format($db['stats']['deposited']) ?> rows</span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">DB Size &bull; Connexions actives</span>
                            <span class="health-value"><?= $db['stats']['db_size_mb'] ?> MB &bull; <?= $db['stats']['active_connections'] ?></span>
                        </div>
                    </div>
                    <?php else: ?>
                        <div class="error-detail"><?= htmlspecialchars($db['error']) ?></div>
                    <?php endif; ?>
                    <div class="card-footer">
                        <span>Neon PostgreSQL &bull; <?= $db['stats']['db_size_mb'] ?? 'N/A' ?> MB</span>
                        <span><?= $db['latency'] ?>ms</span>
                    </div>
                </div>

                <!-- Postback + Site Control Card -->
                <?php
                $pb = $checks['postback'];
                $pbOk = $pb['status'] === 'online';
                $sc = $checks['site_control'];
                $scOk = $sc['status'] === 'online';
                ?>
                <div class="diag-card glass <?= ($pbOk && $scOk) ? 'glow-green' : 'glow-yellow' ?>">
                    <div class="card-top">
                        <div class="card-info">
                            <div class="card-icon" style="background:linear-gradient(to bottom-right,rgba(251,191,36,0.15),rgba(245,158,11,0.15));border:1px solid rgba(251,191,36,0.2)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 2L11 13"/>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="card-name">Postback &amp; Site Control</div>
                                <div class="card-meta">Syst&egrave;me 1win &bull; Configuration</div>
                            </div>
                        </div>
                        <div class="status-badge">
                            <div class="dot dot-md <?= ($pbOk && $scOk) ? 'dot-green pulse-green' : 'dot-yellow pulse-yellow' ?>"></div>
                            <span class="status-label" style="color:<?= ($pbOk && $scOk) ? '#34d399' : '#fbbf24' ?>"><?= ($pbOk && $scOk) ? 'En ligne' : 'D&eacute;grad&eacute;' ?></span>
                        </div>
                    </div>
                    <div class="health-rows">
                        <div class="health-row">
                            <div class="check-badge check-<?= $pbOk ? 'ok' : 'fail' ?>"><?= $pbOk ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label">Rovaspost.php (Postback proxy)</span>
                            <span class="health-value"><?= $pb['latency'] ?>ms</span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-<?= $scOk ? 'ok' : 'warn' ?>"><?= $scOk ? '&#10003;' : '&#9888;' ?></div>
                            <span class="health-label">setting.json (Site Control)</span>
                            <span class="health-value"><?= $scOk ? 'OK' : 'Manquant' ?></span>
                        </div>
                        <?php if ($scOk && $sc['settings']): ?>
                        <?php foreach ($sc['settings'] as $key => $val): ?>
                        <div class="health-row">
                            <div class="check-badge <?= $val ? 'check-ok' : 'check-warn' ?>"><?= $val ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label"><?= htmlspecialchars($key) ?></span>
                            <span class="health-value"><?= $val ? 'Activ&eacute;' : 'D&eacute;sactiv&eacute;' ?></span>
                        </div>
                        <?php endforeach; ?>
                        <?php endif; ?>
                        <?php
                        $totalVideos = count($videoStatus);
                        $existingVideos = count(array_filter($videoStatus, fn($v) => $v['exists']));
                        ?>
                        <div class="health-row">
                            <div class="check-badge check-<?= $totalVideos === $existingVideos ? 'ok' : 'warn' ?>"><?= $totalVideos === $existingVideos ? '&#10003;' : '&#9888;' ?></div>
                            <span class="health-label">Vid&eacute;os instruction/d&eacute;p&ocirc;t</span>
                            <span class="health-value"><?= $existingVideos ?>/<?= $totalVideos ?></span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span>1win Affiliate System</span>
                        <span><?= $pb['latency'] ?>ms</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════ BOTS TAB ═══════════════ -->
        <div class="tab-content <?= $activeTab === 'bots' ? 'active' : '' ?>">
            <div class="cards-grid">
                <!-- Bot Detail Card -->
                <?php $ba = $checks['bot_api']; $baOk = $ba['status'] === 'online'; ?>
                <div class="diag-card glass <?= $baOk ? 'glow-green' : 'glow-red' ?>">
                    <div class="card-top">
                        <div class="card-info">
                            <div class="card-icon" style="background:linear-gradient(to bottom-right,rgba(168,85,247,0.15),rgba(236,72,153,0.15));border:1px solid rgba(168,85,247,0.2)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="11" width="18" height="10" rx="2"/>
                                    <circle cx="12" cy="5" r="2"/><path d="M12 7v4"/>
                                    <line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
                                </svg>
                            </div>
                            <div>
                                <div class="card-name"><?= $baOk ? htmlspecialchars($ba['bot_info']['first_name']) : 'ROVAS Bot' ?></div>
                                <div class="card-meta">Telegram &bull; <span>@<?= $baOk ? htmlspecialchars($ba['bot_info']['username']) : 'N/A' ?></span></div>
                            </div>
                        </div>
                        <div class="status-badge">
                            <div class="dot dot-md <?= $baOk ? 'dot-green pulse-green' : 'dot-red pulse-red' ?>"></div>
                            <span class="status-label" style="color:<?= $baOk ? '#34d399' : '#f87171' ?>"><?= $baOk ? 'En ligne' : 'Hors ligne' ?></span>
                        </div>
                    </div>
                    <div class="health-rows">
                        <div class="health-row">
                            <div class="check-badge check-<?= $baOk ? 'ok' : 'fail' ?>"><?= $baOk ? '&#10003;' : '&#10007;' ?></div>
                            <span class="health-label">Bot API (getMe)</span>
                            <span class="health-value"><?= $ba['latency'] ?>ms</span>
                        </div>
                        <?php $wh = $checks['webhook']; $whOk = $wh['status'] === 'online' && $wh['webhook_info'] && $wh['webhook_info']['url'] !== ''; ?>
                        <div class="health-row">
                            <div class="check-badge check-<?= $whOk ? 'ok' : 'warn' ?>"><?= $whOk ? '&#10003;' : '&#9888;' ?></div>
                            <span class="health-label">Webhook configur&eacute;</span>
                            <span class="health-value"><?= $whOk ? 'Oui' : 'Non' ?></span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Webhook URL</span>
                            <span class="health-value"><?= $whOk ? mb_substr($wh['webhook_info']['url'], 0, 40) . '...' : 'N/A' ?></span>
                        </div>
                        <?php if ($wh['webhook_info']): ?>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Dernier message webhook</span>
                            <span class="health-value"><?= $wh['webhook_info']['last_error_date'] > 0 ? date('d/m H:i', $wh['webhook_info']['last_error_date']) : 'Aucune erreur' ?></span>
                        </div>
                        <?php endif; ?>
                    </div>
                    <div class="card-footer">
                        <span>Bot ID: <?= $baOk ? $ba['bot_info']['id'] : 'N/A' ?></span>
                        <span><?= $ba['latency'] ?>ms</span>
                    </div>
                </div>

                <!-- Bot Stats Card -->
                <?php if (isset($checks['database']['stats'])): $s = $checks['database']['stats']; ?>
                <div class="diag-card glass glow-green">
                    <div class="card-top">
                        <div class="card-info">
                            <div class="card-icon" style="background:linear-gradient(to bottom-right,rgba(16,185,129,0.15),rgba(5,150,105,0.15));border:1px solid rgba(16,185,129,0.2)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <div>
                                <div class="card-name">Statistiques Utilisateurs</div>
                                <div class="card-meta">Base de donn&eacute;es PostgreSQL</div>
                            </div>
                        </div>
                    </div>
                    <div class="health-rows">
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Total utilisateurs</span>
                            <span class="health-value"><?= number_format($s['total_users']) ?></span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Inscrits (1win)</span>
                            <span class="health-value"><?= number_format($s['is_registered']) ?></span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">D&eacute;p&ocirc;ts effectu&eacute;s</span>
                            <span class="health-value"><?= number_format($s['deposited']) ?></span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">Nouveaux (aujourd'hui)</span>
                            <span class="health-value"><?= $s['today_users'] ?></span>
                        </div>
                        <div class="health-row">
                            <div class="check-badge check-ok">&#10003;</div>
                            <span class="health-label">D&eacute;p&ocirc;ts (aujourd'hui)</span>
                            <span class="health-value">$<?= number_format($s['today_deposits'], 2) ?></span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span>Conversion: <?= round(($s['deposited']/$s['is_registered'])*100, 1) ?>%</span>
                        <span>$<?= number_format($s['total_deposits'], 2) ?></span>
                    </div>
                </div>
                <?php endif; ?>

                <!-- Videos Card -->
                <div class="diag-card glass glow-green" style="grid-column:1/-1">
                    <div class="card-top">
                        <div class="card-info">
                            <div class="card-icon" style="background:linear-gradient(to bottom-right,rgba(244,63,94,0.15),rgba(225,29,72,0.15));border:1px solid rgba(244,63,94,0.2)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-linecap="round" stroke-linejoin="round">
                                    <polygon points="23 7 16 12 23 17 23 7"/>
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                                </svg>
                            </div>
                            <div>
                                <div class="card-name">Vid&eacute;os Bot</div>
                                <div class="card-meta">FR &amp; Multilingue &bull; Auto/video/</div>
                            </div>
                        </div>
                        <div class="status-badge">
                            <?php $allVidOk = count(array_filter($videoStatus, fn($v) => $v['exists'])) === count($videoStatus); ?>
                            <div class="dot dot-md <?= $allVidOk ? 'dot-green pulse-green' : 'dot-yellow pulse-yellow' ?>"></div>
                            <span class="status-label" style="color:<?= $allVidOk ? '#34d399' : '#fbbf24' ?>"><?= $allVidOk ? 'Complet' : 'Incomplet' ?></span>
                        </div>
                    </div>
                    <div class="video-grid">
                        <?php foreach ($videoStatus as $name => $info): ?>
                        <div class="video-item">
                            <div class="video-icon"><?= $info['exists'] ? '&#9989;' : '&#10060;' ?></div>
                            <div>
                                <div class="video-name <?= $info['exists'] ? '' : 'video-missing' ?>"><?= htmlspecialchars($name) ?></div>
                                <div class="video-size"><?= $info['exists'] ? $info['size_mb'] . ' MB' : 'MANQUANT' ?></div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════ INFRASTRUCTURE TAB ═══════════════ -->
        <div class="tab-content <?= $activeTab === 'infrastructure' ? 'active' : '' ?>">
            <div class="infra-section glass">
                <div class="infra-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3"/>
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                    </svg>
                    Base de donn&eacute;es
                </div>
                <?php $db = $checks['database']; $dbOk = $db['status'] === 'online'; ?>
                <div class="infra-item <?= $dbOk ? '' : 'offline' ?>" style="margin-bottom:12px">
                    <div class="infra-badge"><?= $dbOk ? '&#10003;' : '&#10007;' ?></div>
                    <div>
                        <div class="infra-name">PostgreSQL (Neon)</div>
                        <div class="infra-detail">
                            <?= $dbOk ? 'Host accessible &bull; ' . $db['latency'] . 'ms' : 'Hors ligne &bull; ' . htmlspecialchars($db['error']) ?>
                        </div>
                    </div>
                </div>
                <?php if ($dbOk): ?>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
                    <div class="glass-sm" style="padding:12px;border-radius:12px">
                        <div style="font-size:11px;color:#64748b;margin-bottom:4px">Taille DB</div>
                        <div style="font-size:16px;font-weight:600;color:#fff"><?= $db['stats']['db_size_mb'] ?> MB</div>
                    </div>
                    <div class="glass-sm" style="padding:12px;border-radius:12px">
                        <div style="font-size:11px;color:#64748b;margin-bottom:4px">Connexions actives</div>
                        <div style="font-size:16px;font-weight:600;color:#fff"><?= $db['stats']['active_connections'] ?></div>
                    </div>
                    <div class="glass-sm" style="padding:12px;border-radius:12px">
                        <div style="font-size:11px;color:#64748b;margin-bottom:4px">Table users</div>
                        <div style="font-size:16px;font-weight:600;color:#fff"><?= $db['stats']['users_table_size'] ?> KB</div>
                    </div>
                    <div class="glass-sm" style="padding:12px;border-radius:12px">
                        <div style="font-size:11px;color:#64748b;margin-bottom:4px">Table deposits</div>
                        <div style="font-size:16px;font-weight:600;color:#fff"><?= $db['stats']['deposits_table_size'] ?> KB</div>
                    </div>
                </div>
                <?php endif; ?>
            </div>

            <div class="infra-section glass">
                <div class="infra-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2"/>
                        <rect x="2" y="14" width="20" height="8" rx="2"/>
                        <line x1="6" y1="6" x2="6.01" y2="6"/>
                        <line x1="6" y1="18" x2="6.01" y2="18"/>
                    </svg>
                    Services Render
                </div>
                <?php
                $services = [
                    ['name' => 'Bot.php (Webhook)', 'check' => $checks['render_service']],
                    ['name' => 'Page de prédiction', 'check' => $checks['prediction_page']],
                    ['name' => 'Panneau Admin', 'check' => $checks['admin_panel']],
                    ['name' => 'Game Manager', 'check' => $checks['game_manager']],
                    ['name' => 'Postback Proxy', 'check' => $checks['postback']],
                ];
                foreach ($services as $svc): ?>
                <div class="infra-item <?= $svc['check']['status'] === 'online' ? '' : 'offline' ?>" style="margin-bottom:8px">
                    <div class="infra-badge"><?= $svc['check']['status'] === 'online' ? '&#10003;' : '&#10007;' ?></div>
                    <div style="flex:1">
                        <div class="infra-name"><?= htmlspecialchars($svc['name']) ?></div>
                        <div class="infra-detail">
                            <?= $svc['check']['status'] === 'online' ? 'En ligne' : 'Hors ligne' ?>
                            &bull; HTTP <?= $svc['check']['http_code'] ?? 'N/A' ?>
                            &bull; <?= $svc['check']['latency'] ?>ms
                            <?php if ($svc['check']['error']): ?>
                                &bull; <span style="color:#f87171"><?= htmlspecialchars($svc['check']['error']) ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="infra-section glass">
                <div class="infra-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    Performance
                </div>
                <div class="infra-item" style="margin-bottom:0">
                    <div class="infra-badge">&#9201;</div>
                    <div>
                        <div class="infra-name">Temps de chargement de la page</div>
                        <div class="infra-detail">Diagnostic g&eacute;n&eacute;r&eacute; en <?= $pageLatency ?>ms (toutes les v&eacute;rifications incluses)</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════ VARIABLES TAB ═══════════════ -->
        <div class="tab-content <?= $activeTab === 'variables' ? 'active' : '' ?>">
            <div class="var-section glass">
                <div class="var-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                    Configuration
                </div>
                <table class="var-table">
                    <thead>
                        <tr><th>Variable</th><th>Valeur</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>BASE_URL</td><td><?= htmlspecialchars(BASE_URL) ?></td></tr>
                        <tr><td>WEB_APP_URL</td><td><?= htmlspecialchars(WEB_APP_URL) ?></td></tr>
                        <tr><td>TOKEN</td><td><?= substr(TOKEN, 0, 10) ?>...<?= substr(TOKEN, -6) ?></td></tr>
                        <tr><td>CHANNEL</td><td>@<?= htmlspecialchars(CHANNEL) ?></td></tr>
                        <tr><td>PROMOCODE</td><td><?= htmlspecialchars(PROMOCODE) ?></td></tr>
                        <tr><td>P_PARAM</td><td><?= htmlspecialchars(P_PARAM) ?></td></tr>
                        <tr><td>DB_HOST</td><td><?= htmlspecialchars(DB_HOST) ?></td></tr>
                        <tr><td>DB_NAME</td><td><?= htmlspecialchars(DB_NAME) ?></td></tr>
                        <tr><td>DB_PORT</td><td><?= DB_PORT ?></td></tr>
                        <tr><td>PHP_VERSION</td><td><?= PHP_VERSION ?></td></tr>
                        <tr><td>SERVEUR_TIME</td><td><?= date('Y-m-d H:i:s T') ?></td></tr>
                        <tr><td>MEMORY_LIMIT</td><td><?= ini_get('memory_limit') ?></td></tr>
                        <tr><td>MAX_EXECUTION</td><td><?= ini_get('max_execution_time') ?>s</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="var-section glass">
                <div class="var-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Webhook Info
                </div>
                <?php $wh = $checks['webhook']; if ($wh['webhook_info']): ?>
                <table class="var-table">
                    <thead>
                        <tr><th>Propri&eacute;t&eacute;</th><th>Valeur</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>url</td><td><?= htmlspecialchars($wh['webhook_info']['url'] ?: '(vide)') ?></td></tr>
                        <tr><td>has_custom_certificate</td><td><?= $wh['webhook_info']['has_custom_certificate'] ? 'Oui' : 'Non' ?></td></tr>
                        <tr><td>pending_update_count</td><td><?= $wh['webhook_info']['pending_update_count'] ?></td></tr>
                        <tr><td>last_error_date</td><td><?= $wh['webhook_info']['last_error_date'] ? date('Y-m-d H:i:s', $wh['webhook_info']['last_error_date']) : 'Aucune' ?></td></tr>
                        <tr><td>last_error_message</td><td><?= htmlspecialchars($wh['webhook_info']['last_error_message'] ?: 'Aucune') ?></td></tr>
                        <tr><td>max_connections</td><td><?= $wh['webhook_info']['max_connections'] ?></td></tr>
                    </tbody>
                </table>
                <?php endif; ?>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <span>ROVAS Diagnostic Panel &bull; Monitoring temps r&eacute;el</span>
            <span>Donn&eacute;es mises &agrave; jour automatiquement &bull; Page g&eacute;n&eacute;r&eacute;e en <?= $pageLatency ?>ms</span>
        </div>
    </div>

    <!-- Auto-refresh every 60 seconds -->
    <script>
        setTimeout(function(){ location.reload(); }, 60000);
    </script>
</body>
</html>
