<?php
require_once __DIR__ . '/config.php';

// SECURITY: IP restriction — only allow access from Render internal IPs or admin IPs
$allowedIps = getenv('DIAG_ALLOWED_IPS') ?: '';
if (!empty($allowedIps)) {
    $clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
    $trusted = false;
    foreach (explode(',', $allowedIps) as $ip) {
        if (trim($ip) === $clientIp) { $trusted = true; break; }
    }
    // Also allow Render internal IPs
    if (strpos($clientIp, '10.') === 0 || strpos($clientIp, '172.') === 0 || $clientIp === '127.0.0.1') {
        $trusted = true;
    }
    if (!$trusted) {
        http_response_code(403);
        exit('Access Denied');
    }
}

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
$t0 = microtime(true);

function checkUrl($url, $timeout = 10) {
    $s = microtime(true);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url, CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout, CURLOPT_CONNECTTIMEOUT => $timeout,
        CURLOPT_FOLLOWLOCATION => true, CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER => ['User-Agent: RovasDiag/1.0']
    ]);
    $r = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    return ['status' => ($code >= 200 && $code < 500) ? 'online' : 'offline', 'code' => $code, 'ms' => round((microtime(true)-$s)*1000), 'err' => $err];
}
function checkBotApi($token) {
    $s = microtime(true);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.telegram.org/bot{$token}/getMe",
        CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10, CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => false, CURLOPT_HTTPHEADER => ['User-Agent: RovasDiag/1.0']
    ]);
    $r = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $d = json_decode($r, true);
    $bot = ($d && isset($d['ok']) && $d['ok']) ? $d['result'] : null;
    return ['status' => $bot ? 'online' : 'offline', 'code' => $code, 'ms' => round((microtime(true)-$s)*1000), 'bot' => $bot];
}
function checkWebhook($token) {
    $s = microtime(true);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.telegram.org/bot{$token}/getWebhookInfo",
        CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10, CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => false, CURLOPT_HTTPHEADER => ['User-Agent: RovasDiag/1.0']
    ]);
    $r = curl_exec($ch); curl_close($ch);
    $d = json_decode($r, true);
    $wh = ($d && isset($d['ok']) && $d['ok']) ? $d['result'] : null;
    return ['status' => $wh ? 'online' : 'offline', 'ms' => round((microtime(true)-$s)*1000), 'wh' => $wh];
}
function checkDb() {
    $s = microtime(true);
    try {
        $db = getDB();
        $db->query('SELECT 1');
        $ms = round((microtime(true)-$s)*1000);
        $tu = (int)$db->query("SELECT COUNT(*) FROM users")->fetchColumn();
        $reg = (int)$db->query("SELECT COUNT(*) FROM users WHERE is_registered = TRUE")->fetchColumn();
        $dep = (int)$db->query("SELECT COUNT(*) FROM users WHERE is_deposited = TRUE")->fetchColumn();
        $td = (float)$db->query("SELECT COALESCE(SUM(deposit_amount),0) FROM users WHERE is_deposited = TRUE")->fetchColumn();
        $tod = (int)$db->query("SELECT COUNT(*) FROM users WHERE DATE(updated_at) = CURRENT_DATE")->fetchColumn();
        $tdd = (float)$db->query("SELECT COALESCE(SUM(deposit_amount),0) FROM users WHERE is_deposited = TRUE AND DATE(deposited_at) = CURRENT_DATE")->fetchColumn();
        $dbsz = round((int)$db->query("SELECT pg_database_size('".DB_NAME."')")->fetchColumn()/(1024*1024),2);
        $aconns = (int)$db->query("SELECT count(*) FROM pg_stat_activity WHERE datname='".DB_NAME."'")->fetchColumn();
        $usz = round((int)$db->query("SELECT pg_total_relation_size('users')")->fetchColumn()/1024,1);
        return ['status'=>'online','ms'=>$ms,'tu'=>$tu,'reg'=>$reg,'dep'=>$dep,'td'=>$td,'tod'=>$tod,'tdd'=>$tdd,'dbsz'=>$dbsz,'aconns'=>$aconns,'usz'=>$usz];
    } catch (Exception $e) {
        return ['status'=>'offline','ms'=>round((microtime(true)-$s)*1000),'err'=>$e->getMessage()];
    }
}

$baseUrl = 'https://rovasb-app.onrender.com';
$api = checkBotApi(TOKEN);
$wh = checkWebhook(TOKEN);
$render = checkUrl($baseUrl.'/Auto/Bot.php');
$pred = checkUrl($baseUrl.'/Auto/rovas/rovassoft-main/index.html');
$admin = checkUrl($baseUrl.'/Auto/admin.php');
$gm = checkUrl($baseUrl.'/Auto/rovas/rovassoft-main/admingjhdsgffx/');
$postback = checkUrl($baseUrl.'/Auto/Rovaspost.php');
$db = checkDb();

$settingPath = __DIR__.'/rovas/rovassoft-main/setting.json';
$sc = file_exists($settingPath) ? json_decode(file_get_contents($settingPath), true) : null;

$vids = ['fr_inscription.mp4','fr_depot.mp4','other_inscription.mp4','other_depot.mp4'];
$vidSt = [];
foreach ($vids as $v) {
    $p = __DIR__.'/video/'.$v;
    $vidSt[$v] = ['ok' => file_exists($p), 'sz' => file_exists($p) ? round(filesize($p)/(1024*1024),2) : 0];
}

$services = [$api, $render, $pred, $admin, $gm, $postback, $db];
$on = 0; foreach ($services as $s) { if ($s['status']==='online') $on++; }
$off = count($services) - $on;
$allOk = $off === 0;
$pageMs = round((microtime(true)-$t0)*1000);
$now = date('H:i:s');
$tab = isset($_GET['tab']) && in_array($_GET['tab'],['overview','bots','infra','config']) ? $_GET['tab'] : 'overview';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>ROVAS Diagnostic</title>
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#000000;
  --card:rgba(28,28,30,0.72);
  --card-border:rgba(255,255,255,0.08);
  --card-hover:rgba(44,44,46,0.8);
  --green:#30D158;--red:#FF453A;--yellow:#FFD60A;--blue:#0A84FF;--purple:#BF5AF2;--cyan:#64D2FF;--pink:#FF375F;--orange:#FF9F0A;
  --text1:rgba(255,255,255,0.92);--text2:rgba(255,255,255,0.55);--text3:rgba(255,255,255,0.32);
  --radius:16px;--radius-sm:12px;
}
html{background:var(--bg)}
body{
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","SF Pro Text","Helvetica Neue",Arial,sans-serif;
  background:var(--bg);color:var(--text1);
  -webkit-font-smoothing:antialiased;
  min-height:100vh;min-height:100dvh;
  line-height:1.47;
}
.page{max-width:900px;margin:0 auto;padding:20px 16px 40px}

/* Ambient glow */
.glow{position:fixed;top:-200px;left:50%;transform:translateX(-50%);width:600px;height:400px;border-radius:50%;background:radial-gradient(ellipse,rgba(48,209,88,0.06),transparent 70%);pointer-events:none;z-index:0}
.glow2{position:fixed;bottom:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(ellipse,rgba(10,132,255,0.04),transparent 70%);pointer-events:none;z-index:0}

/* Header */
.hdr{position:relative;z-index:1;margin-bottom:28px}
.hdr-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.hdr-left{display:flex;align-items:center;gap:14px}
.hdr-icon{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,rgba(48,209,88,0.18),rgba(10,132,255,0.18));display:flex;align-items:center;justify-content:center;flex-shrink:0}
.hdr-icon svg{width:24px;height:24px;color:var(--green)}
.hdr-title{font-size:28px;font-weight:700;letter-spacing:-0.4px;background:linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.7) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hdr-sub{font-size:13px;color:var(--text2);margin-top:1px;font-weight:400}
.hdr-right{text-align:right}
.hdr-time{font-size:12px;color:var(--text3);font-variant-numeric:tabular-nums}
.hdr-refresh{display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:6px 14px;border-radius:20px;background:rgba(255,255,255,0.06);border:1px solid var(--card-border);color:var(--text2);font-size:12px;cursor:pointer;transition:all .25s ease;text-decoration:none}
.hdr-refresh:hover{background:rgba(255,255,255,0.1);color:var(--text1)}
.hdr-refresh svg{width:14px;height:14px;transition:transform .4s ease}
.hdr-refresh:active svg{transform:rotate(180deg)}

/* Status Pill */
.status-pill{
  position:relative;z-index:1;
  display:flex;align-items:center;gap:10px;
  padding:12px 16px;margin-bottom:24px;
  border-radius:var(--radius);
  background:<?=$allOk?'rgba(48,209,88,0.08)':'rgba(255,69,58,0.08)'?>;
  border:1px solid <?=$allOk?'rgba(48,209,88,0.15)':'rgba(255,69,58,0.15)'?>;
}
.pulse-dot{position:relative;width:10px;height:10px;border-radius:50%;flex-shrink:0}
.pulse-dot::after{content:'';position:absolute;inset:-3px;border-radius:50%;animation:pulse 2s ease-in-out infinite}
.pulse-dot.green{background:var(--green)}
.pulse-dot.green::after{border:2px solid var(--green)}
.pulse-dot.red{background:var(--red)}
.pulse-dot.red::after{border:2px solid var(--red)}
@keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:0;transform:scale(1.8)}}
.status-pill-label{font-size:14px;font-weight:600;flex:1}
.status-pill-label.ok{color:var(--green)}
.status-pill-label.bad{color:var(--red)}
.status-pill-counts{display:flex;gap:14px}
.spc{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--text2)}
.spc .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}

/* Tabs */
.tabs{position:relative;z-index:1;display:flex;gap:6px;margin-bottom:24px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px}
.tab{
  flex-shrink:0;display:flex;align-items:center;gap:7px;
  padding:9px 16px;border-radius:22px;
  font-size:13px;font-weight:500;color:var(--text2);
  background:transparent;border:none;cursor:pointer;
  transition:all .3s cubic-bezier(.4,0,.2,1);
  text-decoration:none;
}
.tab svg{width:16px;height:16px;opacity:.7;transition:opacity .3s}
.tab:hover{color:var(--text1);background:rgba(255,255,255,0.04)}
.tab:hover svg{opacity:1}
.tab.on{color:var(--text1);background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.1)}
.tab.on svg{opacity:1}

/* Cards */
.card{
  position:relative;z-index:1;
  background:var(--card);
  backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);
  border:1px solid var(--card-border);
  border-radius:var(--radius);
  padding:20px;margin-bottom:16px;
  transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s ease,border-color .3s ease;
}
.card:hover{transform:translateY(-1px);border-color:rgba(255,255,255,0.12)}
.card-glow-green{box-shadow:0 0 40px -12px rgba(48,209,88,0.12)}
.card-glow-red{box-shadow:0 0 40px -12px rgba(255,69,58,0.15)}

/* Card Header */
.ch{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px}
.ch-left{display:flex;align-items:center;gap:12px}
.ch-icon{width:42px;height:42px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ch-icon svg{width:20px;height:20px}
.ch-name{font-size:15px;font-weight:600;letter-spacing:-0.1px}
.ch-meta{font-size:12px;color:var(--text3);margin-top:2px}
.ch-meta b{color:var(--cyan);font-weight:500}
.ch-status{display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:500}
.ch-status.on{background:rgba(48,209,88,0.1);color:var(--green)}
.ch-status.off{background:rgba(255,69,58,0.1);color:var(--red)}
.ch-status .mini-dot{width:7px;height:7px;border-radius:50%}
.ch-status.on .mini-dot{background:var(--green);animation:mini-pulse 2s infinite}
.ch-status.off .mini-dot{background:var(--red);animation:mini-pulse-red 2s infinite}
@keyframes mini-pulse{0%,100%{box-shadow:0 0 0 0 rgba(48,209,88,0.4)}50%{box-shadow:0 0 0 4px rgba(48,209,88,0)}}
@keyframes mini-pulse-red{0%,100%{box-shadow:0 0 0 0 rgba(255,69,58,0.4)}50%{box-shadow:0 0 0 4px rgba(255,69,58,0)}}

/* Health Rows */
.hr{display:flex;align-items:center;gap:10px;padding:7px 0}
.hr+.hr{border-top:1px solid rgba(255,255,255,0.03)}
.hr-icon{width:22px;height:22px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.hr-icon svg{width:12px;height:12px}
.hr-icon.ok{background:rgba(48,209,88,0.12)}
.hr-icon.ok svg{color:var(--green)}
.hr-icon.err{background:rgba(255,69,58,0.12)}
.hr-icon.err svg{color:var(--red)}
.hr-icon.warn{background:rgba(255,214,10,0.12)}
.hr-icon.warn svg{color:var(--yellow)}
.hr-label{font-size:13px;color:var(--text2);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hr-val{font-size:12px;color:var(--text3);font-variant-numeric:tabular-nums;flex-shrink:0;font-weight:500}

/* Card Footer */
.cf{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.04)}
.cf span{font-size:11px;color:var(--text3)}

/* Error Box */
.err-box{margin-top:12px;padding:10px 12px;border-radius:10px;background:rgba(255,69,58,0.06);border:1px solid rgba(255,69,58,0.12);font-size:11px;color:var(--red);font-family:"SF Mono",Menlo,monospace;word-break:break-all;max-height:60px;overflow-y:auto;line-height:1.5}

/* Stats Row */
.stats{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px}
@media(min-width:500px){.stats{grid-template-columns:repeat(4,1fr)}}
.stat{background:var(--card);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid var(--card-border);border-radius:var(--radius);padding:16px;text-align:center;transition:transform .3s ease}
.stat:hover{transform:translateY(-2px)}
.stat-val{font-size:26px;font-weight:700;letter-spacing:-0.5px;background:linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.65) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px}
.stat-lbl{font-size:12px;color:var(--text2);font-weight:400}
.stat-sub{font-size:11px;margin-top:4px;font-weight:500}
.stat-sub.up{color:var(--green)}
.stat-sub.neutral{color:var(--text3)}

/* Infra Grid */
.infra-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
.ig{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:14px}
.ig-lbl{font-size:11px;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:.3px;font-weight:500}
.ig-val{font-size:18px;font-weight:600;letter-spacing:-0.3px}
.ig-val.green{color:var(--green)}

/* Config Table */
.tbl{width:100%;border-collapse:separate;border-spacing:0 3px;margin-top:4px}
.tbl th{text-align:left;font-size:11px;color:var(--text3);padding:6px 14px;font-weight:500;text-transform:uppercase;letter-spacing:.4px}
.tbl td{padding:10px 14px;font-size:13px}
.tbl tbody tr{background:rgba(255,255,255,0.03);border-radius:10px;transition:background .2s}
.tbl tbody tr:hover{background:rgba(255,255,255,0.06)}
.tbl tbody tr td:first-child{border-radius:10px 0 0 10px;color:var(--text2);font-family:"SF Mono",Menlo,monospace;font-size:12px}
.tbl tbody tr td:last-child{border-radius:0 10px 10px 0;color:var(--text1);word-break:break-all;font-size:12px}

/* Video Grid */
.vid-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.vg{display:flex;align-items:center;gap:10px;padding:12px;border-radius:var(--radius-sm);background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);transition:border-color .2s}
.vg:hover{border-color:rgba(255,255,255,0.1)}
.vg-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.vg-icon.ok{background:rgba(48,209,88,0.1)}
.vg-icon.ok svg{color:var(--green);width:16px;height:16px}
.vg-icon.miss{background:rgba(255,69,58,0.1)}
.vg-icon.miss svg{color:var(--red);width:16px;height:16px}
.vg-name{font-size:12px;color:var(--text1);word-break:break-all;font-weight:500}
.vg-sz{font-size:11px;color:var(--text3);margin-top:2px}
.vg-sz.miss{color:var(--red)}

/* Service List */
.svc{display:flex;align-items:center;gap:12px;padding:12px 0}
.svc+.svc{border-top:1px solid rgba(255,255,255,0.04)}
.svc-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.svc-icon.ok{background:rgba(48,209,88,0.1)}
.svc-icon.ok svg{color:var(--green);width:14px;height:14px}
.svc-icon.off{background:rgba(255,69,58,0.1)}
.svc-icon.off svg{color:var(--red);width:14px;height:14px}
.svc-info{flex:1;min-width:0}
.svc-name{font-size:13px;font-weight:500}
.svc-detail{font-size:11px;color:var(--text3);margin-top:2px}
.svc-detail .hl{color:var(--red)}
.svc-ms{font-size:12px;color:var(--text3);font-variant-numeric:tabular-nums;font-weight:500;flex-shrink:0}

/* Section Title */
.sec-title{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.5px;margin-bottom:14px}
.sec-title svg{width:16px;height:16px}

/* Tab Content */
.tc{display:none}.tc.on{display:block}

/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.anim{animation:fadeUp .5s cubic-bezier(.4,0,.2,1) both}
.d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}.d4{animation-delay:.2s}.d5{animation-delay:.25s}.d6{animation-delay:.3s}.d7{animation-delay:.35s}.d8{animation-delay:.4s}

/* Footer */
.foot{position:relative;z-index:1;margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.04);text-align:center}
.foot span{font-size:11px;color:var(--text3)}

/* Scrollbar */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.15)}

/* Responsive */
@media(max-width:400px){
  .hdr-title{font-size:22px}
  .stats{grid-template-columns:repeat(2,1fr)}
  .vid-grid{grid-template-columns:1fr}
  .infra-grid{grid-template-columns:1fr}
}
</style>
</head>
<body>
<div class="glow"></div>
<div class="glow2"></div>
<div class="page">

<!-- Header -->
<header class="hdr anim">
  <div class="hdr-top">
    <div class="hdr-left">
      <div class="hdr-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
      </div>
      <div>
        <div class="hdr-title">ROVAS Diagnostic</div>
        <div class="hdr-sub">Monitoring temps reel</div>
      </div>
    </div>
    <div class="hdr-right">
      <div class="hdr-time"><?= $now ?></div>
      <a class="hdr-refresh" href="?" onclick="this.querySelector('svg').style.transform='rotate(360deg)'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3.36-7"/><path d="M21 3v6h-6"/></svg>
        Actualiser
      </a>
    </div>
  </div>
</header>

<!-- Status Pill -->
<div class="status-pill anim d1">
  <div class="pulse-dot <?=$allOk?'green':'red'?>"></div>
  <span class="status-pill-label <?=$allOk?'ok':'bad'?>"><?=$allOk?'Tous les systemes sont operationnels':$off.' probleme(s) detecte(s)'?></span>
  <div class="status-pill-counts">
    <div class="spc"><div class="dot" style="background:var(--green)"></div><?= $on ?> OK</div>
    <div class="spc"><div class="dot" style="background:var(--red)"></div><?= $off ?> KO</div>
  </div>
</div>

<!-- Tabs -->
<nav class="tabs anim d2">
  <a href="?tab=overview" class="tab <?=$tab==='overview'?'on':''?>">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>
    Vue d'ensemble
  </a>
  <a href="?tab=bots" class="tab <?=$tab==='bots'?'on':''?>">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><circle cx="8.5" cy="16" r="1" fill="currentColor"/><circle cx="15.5" cy="16" r="1" fill="currentColor"/></svg>
    Bots
  </a>
  <a href="?tab=infra" class="tab <?=$tab==='infra'?'on':''?>">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/></svg>
    Infrastructure
  </a>
  <a href="?tab=config" class="tab <?=$tab==='config'?'on':''?>">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    Config
  </a>
</nav>

<!-- ═══════ OVERVIEW ═══════ -->
<div class="tc <?=$tab==='overview'?'on':''?>">
  <?php if($db['status']==='online'): ?>
  <div class="stats anim d3">
    <div class="stat">
      <div class="stat-val"><?= number_format($db['tu']) ?></div>
      <div class="stat-lbl">Utilisateurs</div>
      <div class="stat-sub up">+<?= $db['tod'] ?> aujourd'hui</div>
    </div>
    <div class="stat">
      <div class="stat-val"><?= number_format($db['reg']) ?></div>
      <div class="stat-lbl">Inscrits</div>
      <div class="stat-sub neutral"><?= round($db['reg']/$db['tu']*100,1) ?>%</div>
    </div>
    <div class="stat">
      <div class="stat-val"><?= number_format($db['dep']) ?></div>
      <div class="stat-lbl">Depots</div>
      <div class="stat-sub neutral"><?= round($db['dep']/$db['reg']*100,1) ?>%</div>
    </div>
    <div class="stat">
      <div class="stat-val">$<?= number_format($db['td'],2) ?></div>
      <div class="stat-lbl">Total Depots</div>
      <div class="stat-sub up">$<?= number_format($db['tdd'],2) ?> ajd</div>
    </div>
  </div>
  <?php endif; ?>

  <!-- Telegram Bot API -->
  <?php $ok=$api['status']==='online'; ?>
  <div class="card <?=($ok?'card-glow-green':'card-glow-red')?> anim d3">
    <div class="ch">
      <div class="ch-left">
        <div class="ch-icon" style="background:linear-gradient(135deg,rgba(0,136,204,0.15),rgba(38,165,219,0.15))">
          <svg viewBox="0 0 24 24" fill="none" stroke="#26A5DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <div>
          <div class="ch-name">Telegram Bot API</div>
          <div class="ch-meta">Platform <b><?= $ok?$api['bot']['username']:'N/A' ?></b></div>
        </div>
      </div>
      <div class="ch-status <?=$ok?'on':'off'?>"><div class="mini-dot"></div><?=$ok?'En ligne':'Hors ligne'?></div>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$ok?'ok':'err'?>">
        <?php if($ok):?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <?php else:?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <?php endif;?>
      </div>
      <span class="hr-label">API getMe</span>
      <span class="hr-val"><?= $api['ms'] ?>ms</span>
    </div>
    <?php
    $whOk = $wh['status']==='online' && $wh['wh'] && $wh['wh']['url']!=='';
    ?>
    <div class="hr">
      <div class="hr-icon <?=$whOk?'ok':'warn'?>">
        <?php if($whOk):?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <?php else:?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <?php endif;?>
      </div>
      <span class="hr-label">Webhook</span>
      <span class="hr-val"><?=$whOk?'Configure':'Non configure'?></span>
    </div>
    <?php if($wh['wh'] && $wh['wh']['pending_update_count']>0):?>
    <div class="hr">
      <div class="hr-icon warn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <span class="hr-label">Updates en attente</span>
      <span class="hr-val"><?=$wh['wh']['pending_update_count']?></span>
    </div>
    <?php endif;?>
    <div class="cf"><span>Bot ID: <?=$ok?$api['bot']['id']:'N/A'?></span><span><?=$api['ms']?>ms</span></div>
  </div>

  <!-- Render Service -->
  <?php $ok=$render['status']==='online';$ppOk=$pred['status']==='online';$apOk=$admin['status']==='online';$gmOk=$gm['status']==='online'; ?>
  <div class="card <?=($ok?'card-glow-green':'card-glow-red')?> anim d4">
    <div class="ch">
      <div class="ch-left">
        <div class="ch-icon" style="background:linear-gradient(135deg,rgba(10,132,255,0.15),rgba(100,210,255,0.15))">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="#0A84FF"/><circle cx="6" cy="18" r="1" fill="#0A84FF"/></svg>
        </div>
        <div>
          <div class="ch-name">Render Service</div>
          <div class="ch-meta">Platform <b>rovasb-app.onrender.com</b></div>
        </div>
      </div>
      <div class="ch-status <?=$ok?'on':'off'?>"><div class="mini-dot"></div><?=$ok?'En ligne':'Hors ligne'?></div>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$ok?'ok':'err'?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="hr-label">Bot.php (Webhook handler)</span>
      <span class="hr-val">HTTP <?=$render['code']?> &middot; <?=$render['ms']?>ms</span>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$ppOk?'ok':'err'?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="hr-label">Page prediction</span>
      <span class="hr-val"><?=$pred['ms']?>ms</span>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$apOk?'ok':'err'?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="hr-label">Panneau Admin</span>
      <span class="hr-val"><?=$admin['ms']?>ms</span>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$gmOk?'ok':'err'?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="hr-label">Game Manager</span>
      <span class="hr-val"><?=$gm['ms']?>ms</span>
    </div>
    <?php if(!$ok):?>
    <div class="err-box"><?= htmlspecialchars($render['err']) ?></div>
    <?php endif;?>
    <div class="cf"><span>Render Web Service</span><span><?=$render['ms']?>ms</span></div>
  </div>

  <!-- Database -->
  <?php $dok=$db['status']==='online'; ?>
  <div class="card <?=($dok?'card-glow-green':'card-glow-red')?> anim d5">
    <div class="ch">
      <div class="ch-left">
        <div class="ch-icon" style="background:linear-gradient(135deg,rgba(100,210,255,0.15),rgba(10,132,255,0.15))">
          <svg viewBox="0 0 24 24" fill="none" stroke="#64D2FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
        </div>
        <div>
          <div class="ch-name">PostgreSQL (Neon)</div>
          <div class="ch-meta"><?= DB_HOST ?></div>
        </div>
      </div>
      <div class="ch-status <?=$dok?'on':'off'?>"><div class="mini-dot"></div><?=$dok?'En ligne':'Hors ligne'?></div>
    </div>
    <?php if($dok):?>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Connexion PDO</span><span class="hr-val"><?=$db['ms']?>ms</span>
    </div>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Table users</span><span class="hr-val"><?= number_format($db['tu'])?> rows &middot; <?=$db['usz']?> KB</span>
    </div>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">DB Size &middot; Connexions</span><span class="hr-val"><?=$db['dbsz']?> MB &middot; <?=$db['aconns']?></span>
    </div>
    <?php else:?>
    <div class="err-box"><?= htmlspecialchars($db['err']) ?></div>
    <?php endif;?>
    <div class="cf"><span>Neon PostgreSQL</span><span><?=$db['ms']?>ms</span></div>
  </div>

  <!-- Postback & Config -->
  <?php $pbOk=$postback['status']==='online';$scOk=$sc!==null;$vidOk=0; foreach ($vidSt as $v) { if ($v['ok']) $vidOk++; } $allVid=($vidOk===count($vidSt)); ?>
  <div class="card card-glow-<?=($pbOk&&$scOk)?'green':'red'?> anim d6">
    <div class="ch">
      <div class="ch-left">
        <div class="ch-icon" style="background:linear-gradient(135deg,rgba(255,159,10,0.15),rgba(255,214,10,0.15))">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF9F0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
        </div>
        <div>
          <div class="ch-name">Postback &amp; Control</div>
          <div class="ch-meta">Systeme 1win &middot; Configuration</div>
        </div>
      </div>
      <div class="ch-status <?=($pbOk&&$scOk)?'on':'off'?>"><div class="mini-dot"></div><?=($pbOk&&$scOk)?'En ligne':'Probleme'?></div>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$pbOk?'ok':'err'?>"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Rovaspost.php (Proxy)</span><span class="hr-val"><?=$postback['ms']?>ms</span>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$scOk?'ok':'warn'?>">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="hr-label">setting.json</span><span class="hr-val"><?=$scOk?'OK':'Manquant'?></span>
    </div>
    <?php if($scOk): foreach($sc as $k=>$v): ?>
    <div class="hr">
      <div class="hr-icon <?=$v?'ok':'warn'?>"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><?=$v?'<polyline points="20 6 9 17 4 12"/>':'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'?></svg></div>
      <span class="hr-label"><?= htmlspecialchars($k) ?></span><span class="hr-val"><?=$v?'Actif':'Inactif'?></span>
    </div>
    <?php endforeach; endif;?>
    <div class="hr">
      <div class="hr-icon <?=$allVid?'ok':'warn'?>"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Videos instruction/depot</span><span class="hr-val"><?=$vidOk?>/<?=count($vidSt)?></span>
    </div>
    <div class="cf"><span>1win Affiliate</span><span><?=$postback['ms']?>ms</span></div>
  </div>
</div>

<!-- ═══════ BOTS ═══════ -->
<div class="tc <?=$tab==='bots'?'on':''?>">
  <?php $ok=$api['status']==='online'; ?>
  <div class="card <?=($ok?'card-glow-green':'card-glow-red')?> anim d3">
    <div class="ch">
      <div class="ch-left">
        <div class="ch-icon" style="background:linear-gradient(135deg,rgba(0,136,204,0.15),rgba(38,165,219,0.15))">
          <svg viewBox="0 0 24 24" fill="none" stroke="#26A5DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><circle cx="8.5" cy="16" r="1" fill="#26A5DB"/><circle cx="15.5" cy="16" r="1" fill="#26A5DB"/></svg>
        </div>
        <div>
          <div class="ch-name"><?=$ok?$api['bot']['first_name']:'ROVAS Bot'?></div>
          <div class="ch-meta">Telegram &middot; <b>@<?=$ok?$api['bot']['username']:'N/A'?></b></div>
        </div>
      </div>
      <div class="ch-status <?=$ok?'on':'off'?>"><div class="mini-dot"></div><?=$ok?'En ligne':'Hors ligne'?></div>
    </div>
    <div class="hr">
      <div class="hr-icon <?=$ok?'ok':'err'?>"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Bot API (getMe)</span><span class="hr-val"><?=$api['ms']?>ms</span>
    </div>
    <?php $whOk=$wh['status']==='online'&&$wh['wh']&&$wh['wh']['url']!=='';?>
    <div class="hr">
      <div class="hr-icon <?=$whOk?'ok':'warn'?>"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Webhook</span><span class="hr-val"><?=$whOk?'Configure':'Non configure'?></span>
    </div>
    <?php if($wh['wh']&&$wh['wh']['url']):?>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Webhook URL</span><span class="hr-val"><?= mb_substr($wh['wh']['url'],0,35)?>...</span>
    </div>
    <?php endif;?>
    <?php if($wh['wh']&&$wh['wh']['last_error_date']>0):?>
    <div class="hr">
      <div class="hr-icon err"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
      <span class="hr-label">Derniere erreur webhook</span><span class="hr-val"><?= date('d/m H:i',$wh['wh']['last_error_date'])?></span>
    </div>
    <?php endif;?>
    <div class="cf"><span>Bot ID: <?=$ok?$api['bot']['id']:'N/A'?></span><span><?=$api['ms']?>ms</span></div>
  </div>

  <?php if($db['status']==='online'): $s=$db; ?>
  <div class="card card-glow-green anim d4">
    <div class="ch">
      <div class="ch-left">
        <div class="ch-icon" style="background:linear-gradient(135deg,rgba(48,209,88,0.15),rgba(52,199,89,0.15))">
          <svg viewBox="0 0 24 24" fill="none" stroke="#30D158" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div>
          <div class="ch-name">Statistiques Utilisateurs</div>
          <div class="ch-meta">PostgreSQL</div>
        </div>
      </div>
    </div>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Total utilisateurs</span><span class="hr-val"><?= number_format($s['tu'])?></span>
    </div>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Inscrits (1win)</span><span class="hr-val"><?= number_format($s['reg'])?></span>
    </div>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Depots effectues</span><span class="hr-val"><?= number_format($s['dep'])?></span>
    </div>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Nouveaux (aujourd'hui)</span><span class="hr-val"><?= $s['tod']?></span>
    </div>
    <div class="hr">
      <div class="hr-icon ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
      <span class="hr-label">Depots (aujourd'hui)</span><span class="hr-val">$<?= number_format($s['tdd'],2)?></span>
    </div>
    <div class="cf"><span>Conversion: <?= round($s['dep']/$s['reg']*100,1)?>%</span><span>$<?= number_format($s['td'],2)?></span></div>
  </div>
  <?php endif; ?>

  <!-- Videos -->
  <div class="card card-glow-<?= $allVid?'green':'red'?> anim d5">
    <div class="ch">
      <div class="ch-left">
        <div class="ch-icon" style="background:linear-gradient(135deg,rgba(255,55,95,0.15),rgba(191,90,242,0.15))">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF375F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        </div>
        <div>
          <div class="ch-name">Videos Bot</div>
          <div class="ch-meta">FR &amp; Multilingue</div>
        </div>
      </div>
      <div class="ch-status <?=$allVid?'on':'off'?>"><div class="mini-dot"></div><?=$allVid?'Complet':'Incomplet'?></div>
    </div>
    <div class="vid-grid">
      <?php foreach($vidSt as $name=>$info): ?>
      <div class="vg">
        <div class="vg-icon <?=$info['ok']?'ok':'miss'?>">
          <?php if($info['ok']):?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <?php else:?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <?php endif;?>
        </div>
        <div>
          <div class="vg-name"><?= htmlspecialchars($name) ?></div>
          <div class="vg-sz <?=$info['ok']?'':'miss'?>"><?=$info['ok']?$info['sz'].' MB':'MANQUANT'?></div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<!-- ═══════ INFRASTRUCTURE ═══════ -->
<div class="tc <?=$tab==='infra'?'on':''?>">
  <div class="card anim d3">
    <div class="sec-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      Base de donnees
    </div>
    <?php $dok=$db['status']==='online'; ?>
    <div class="svc">
      <div class="svc-icon <?=$dok?'ok':'off'?>">
        <?php if($dok):?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <?php else:?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <?php endif;?>
      </div>
      <div class="svc-info">
        <div class="svc-name">PostgreSQL (Neon)</div>
        <div class="svc-detail"><?=$dok?'Host accessible &middot; '.$db['ms'].'ms':'<span class="hl">'.htmlspecialchars($db['err']).'</span>'?></div>
      </div>
      <span class="svc-ms"><?=$db['ms']?>ms</span>
    </div>
    <?php if($dok):?>
    <div class="infra-grid">
      <div class="ig"><div class="ig-lbl">Taille DB</div><div class="ig-val"><?=$db['dbsz']?> MB</div></div>
      <div class="ig"><div class="ig-lbl">Connexions actives</div><div class="ig-val"><?=$db['aconns']?></div></div>
      <div class="ig"><div class="ig-lbl">Table users</div><div class="ig-val"><?=$db['usz']?> KB</div></div>
      <div class="ig"><div class="ig-lbl">Latence DB</div><div class="ig-val green"><?=$db['ms']?>ms</div></div>
    </div>
    <?php endif;?>
  </div>

  <div class="card anim d4">
    <div class="sec-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="var(--blue)"/><circle cx="6" cy="18" r="1" fill="var(--blue)"/></svg>
      Services Render
    </div>
    <?php
    $svcs = [
      ['n'=>'Bot.php (Webhook)','c'=>$render],
      ['n'=>'Page prediction','c'=>$pred],
      ['n'=>'Panneau Admin','c'=>$admin],
      ['n'=>'Game Manager','c'=>$gm],
      ['n'=>'Postback Proxy','c'=>$postback],
    ];
    foreach($svcs as $sv):
    ?>
    <div class="svc">
      <div class="svc-icon <?=$sv['c']['status']==='online'?'ok':'off'?>">
        <?php if($sv['c']['status']==='online'):?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <?php else:?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <?php endif;?>
      </div>
      <div class="svc-info">
        <div class="svc-name"><?= htmlspecialchars($sv['n']) ?></div>
        <div class="svc-detail"><?=$sv['c']['status']==='online'?'En ligne':'<span class="hl">Hors ligne</span>'?> &middot; HTTP <?=$sv['c']['code']?><?php if($sv['c']['err']):?> &middot; <span class="hl"><?= htmlspecialchars($sv['c']['err'])?></span><?php endif;?></div>
      </div>
      <span class="svc-ms"><?=$sv['c']['ms']?>ms</span>
    </div>
    <?php endforeach;?>
  </div>

  <div class="card anim d5">
    <div class="sec-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      Performance
    </div>
    <div class="svc" style="border:none;padding-bottom:0">
      <div class="svc-icon ok">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="svc-info">
        <div class="svc-name">Generation de la page</div>
        <div class="svc-detail">Toutes les verifications executees en <?=$pageMs?>ms</div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════ CONFIG ═══════ -->
<div class="tc <?=$tab==='config'?'on':''?>">
  <div class="card anim d3">
    <div class="sec-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--purple)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      Configuration
    </div>
    <table class="tbl">
      <thead><tr><th>Variable</th><th>Valeur</th></tr></thead>
      <tbody>
        <tr><td>BASE_URL</td><td><?= htmlspecialchars(BASE_URL) ?></td></tr>
        <tr><td>WEB_APP_URL</td><td><?= htmlspecialchars(WEB_APP_URL) ?></td></tr>
        <tr><td>TOKEN</td><td><?= substr(TOKEN,0,10)?>...<?= substr(TOKEN,-6) ?></td></tr>
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

  <?php if($wh['wh']): ?>
  <div class="card anim d4">
    <div class="sec-title">
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      Webhook Info
    </div>
    <table class="tbl">
      <thead><tr><th>Propriete</th><th>Valeur</th></tr></thead>
      <tbody>
        <tr><td>url</td><td><?= htmlspecialchars($wh['wh']['url']?:'(vide)') ?></td></tr>
        <tr><td>custom_certificate</td><td><?= $wh['wh']['has_custom_certificate']?'Oui':'Non' ?></td></tr>
        <tr><td>pending_updates</td><td><?= $wh['wh']['pending_update_count'] ?></td></tr>
        <tr><td>last_error_date</td><td><?= $wh['wh']['last_error_date']?date('Y-m-d H:i:s',$wh['wh']['last_error_date']):'Aucune' ?></td></tr>
        <tr><td>last_error_msg</td><td><?= htmlspecialchars($wh['wh']['last_error_message']?:'Aucune') ?></td></tr>
        <tr><td>max_connections</td><td><?= $wh['wh']['max_connections'] ?></td></tr>
      </tbody>
    </table>
  </div>
  <?php endif; ?>
</div>

<div class="foot">
  <span>ROVAS Diagnostic &middot; Monitoring temps reel</span>
</div>
</div>
<script>setTimeout(function(){location.reload()},60000)</script>
</body>
</html>
