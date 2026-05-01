<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    die("Unauthorized");
}

require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

$db = getDB();
$BOT_TOKEN = TOKEN;
define("BATCH_SIZE", 30);

$type    = $_POST['type'] ?? 'text';
$message = $_POST['message'] ?? '';
$caption = $_POST['caption'] ?? '';
$filter  = $_POST['filter'] ?? 'all';

// -------- FILTER USERS from PostgreSQL --------
$stmt = $db->query("SELECT telegram_id, is_registered, is_deposited FROM users");
$users = [];
while ($row = $stmt->fetch()) {
    if ($filter === 'registered'   && $row['is_registered'] != true) continue;
    if ($filter === 'unregistered' && $row['is_registered'] == true) continue;
    if ($filter === 'deposited'    && $row['is_deposited'] != true) continue;
    if ($filter === 'undeposited'  && $row['is_deposited'] == true) continue;
    $users[] = $row['telegram_id'];
}

$total  = count($users);
$sent   = 0;
$failed = 0;

function make_request($BOT_TOKEN, $type, $data, $userId, $caption = '') {
    $url = "https://api.telegram.org/bot$BOT_TOKEN/";
    switch ($type) {
        case 'text':
            $url .= "sendMessage";
            $post = ["chat_id" => $userId, "text" => $data];
            break;
        case 'image':
            $url .= "sendPhoto";
            $post = ["chat_id" => $userId, "photo" => new CURLFile($data)];
            if ($caption) $post["caption"] = $caption;
            break;
        case 'document':
            $url .= "sendDocument";
            $post = ["chat_id" => $userId, "document" => new CURLFile($data)];
            if ($caption) $post["caption"] = $caption;
            break;
        case 'audio':
            $url .= "sendAudio";
            $post = ["chat_id" => $userId, "audio" => new CURLFile($data)];
            if ($caption) $post["caption"] = $caption;
            break;
        default:
            return null;
    }
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $post,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 30,
    ]);
    return $ch;
}

$filePath = isset($_FILES['file']['tmp_name']) ? $_FILES['file']['tmp_name'] : null;

for ($i = 0; $i < $total; $i += BATCH_SIZE) {
    $mh = curl_multi_init();
    $handles = [];

    $batch = array_slice($users, $i, BATCH_SIZE);
    foreach ($batch as $userId) {
        $ch = make_request($BOT_TOKEN, $type, $type === "text" ? $message : $filePath, $userId, $caption);
        if ($ch) {
            curl_multi_add_handle($mh, $ch);
            $handles[$userId] = $ch;
        }
    }

    $running = null;
    do {
        curl_multi_exec($mh, $running);
        curl_multi_select($mh);
    } while ($running > 0);

    foreach ($handles as $uid => $ch) {
        $resp = curl_multi_getcontent($ch);
        $data = json_decode($resp, true);
        if (isset($data['ok']) && $data['ok'] === true) {
            $sent++;
        } else {
            $failed++;
            if (isset($data['description']) && str_contains($data['description'], "Unauthorized")) {
                update_progress($sent, $failed, $total, "error", "Invalid Bot Token!");
                exit;
            }
        }
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
    curl_multi_close($mh);

    update_progress($sent, $failed, $total, "running");
}

update_progress($sent, $failed, $total, "done");

function update_progress($sent, $failed, $total, $status, $error = "") {
    $progress = [
        "sent"   => $sent,
        "failed" => $failed,
        "total"  => $total,
        "status" => $status,
        "error"  => $error,
        "percent"=> $total > 0 ? round(($sent + $failed) / $total * 100) : 0
    ];
    file_put_contents(__DIR__ . "/progress.json", json_encode($progress));
}
