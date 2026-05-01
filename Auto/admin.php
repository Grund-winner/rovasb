<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: index.php");
    exit();
}
?>
<?php
require_once 'config.php';

$db = getDB();

// Create tables if not exist
$db->exec("CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    one_win_user_id TEXT,
    is_registered BOOLEAN DEFAULT FALSE,
    is_deposited BOOLEAN DEFAULT FALSE,
    deposit_amount NUMERIC DEFAULT 0,
    language TEXT DEFAULT 'en',
    last_message_id INTEGER,
    registered_at TIMESTAMPTZ,
    deposited_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)");

// Get stats
$totalUsers = $db->query("SELECT COUNT(*) FROM users")->fetchColumn();
$totalUsers = $totalUsers ? (int)$totalUsers : 0;

$totalRegistered = $db->query("SELECT COUNT(*) FROM users WHERE is_registered = TRUE")->fetchColumn();
$totalRegistered = $totalRegistered ? (int)$totalRegistered : 0;

$totalUnregistered = $totalUsers - $totalRegistered;

$totalDeposited = $db->query("SELECT COUNT(*) FROM users WHERE is_deposited = TRUE")->fetchColumn();
$totalDeposited = $totalDeposited ? (int)$totalDeposited : 0;

$totalUndeposited = $totalUsers - $totalDeposited;

$totalDepositAmount = $db->query("SELECT COALESCE(SUM(deposit_amount), 0) FROM users WHERE is_deposited = TRUE")->fetchColumn();
$totalDepositAmount = $totalDepositAmount ? (float)$totalDepositAmount : 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <meta charset="UTF-8">
  <title>Dashboard Overview</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
    .navbar { background: #fff; padding: 10px 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; position: relative; }
    .menu-btn { background: #007bff; border: none; padding: 10px 12px; border-radius: 8px; cursor: pointer; }
    .menu-btn i { color: #fff; font-size: 20px; }
    .dropdown { display: none; position: absolute; right: 20px; top: 50px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); overflow: hidden; z-index: 999; }
    .dropdown a { display: block; padding: 12px 20px; text-decoration: none; color: #333; font-weight: 500; }
    .dropdown a:hover { background: #f1f1f1; }
    .container { max-width: 600px; margin: 20px auto; padding: 20px; }
    h2 { text-align: center; margin-bottom: 20px; }
    .card { background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
    .card .text { font-size: 16px; font-weight: bold; }
    .card .value { font-size: 22px; font-weight: bold; }
    .blue { color: #007bff; } .green { color: #28a745; } .red { color: #dc3545; } .cyan { color: #17a2b8; } .orange { color: #fd7e14; }
    .icon { font-size: 28px; margin-left: 10px; }
  </style>
</head>
<body>
  <div class="navbar">
    <h3>Dashboard</h3>
    <button class="menu-btn" onclick="toggleMenu()"><i class="fa fa-bars"></i></button>
    <div class="dropdown" id="menuDropdown">
      <a href="broadcast.php"><i class="fa fa-bullhorn"></i> Broadcast</a>
      <a href="users.php"><i class="fa fa-users"></i> User Management</a>
      <a href="rovas/rovassoft-main/admingjhdsgffx"><i class="fa fa-gamepad"></i> GAME MANAGE</a>
      <a href="logout.php"><i class="fa fa-sign-out-alt"></i> Logout</a>
    </div>
  </div>

  <div class="container">
    <h2>Dashboard Overview</h2>
    <div class="card"><div class="text blue">TOTAL USERS</div><div class="value"><?php echo $totalUsers; ?> <i class="fa fa-users icon blue"></i></div></div>
    <div class="card"><div class="text green">REGISTERED USERS</div><div class="value"><?php echo $totalRegistered; ?> <i class="fa fa-user-check icon green"></i></div></div>
    <div class="card"><div class="text red">UNREGISTERED USERS</div><div class="value"><?php echo $totalUnregistered; ?> <i class="fa fa-user-times icon red"></i></div></div>
    <div class="card"><div class="text cyan">DEPOSITED USERS</div><div class="value"><?php echo $totalDeposited; ?> <i class="fa fa-wallet icon cyan"></i></div></div>
    <div class="card"><div class="text orange">UNDEPOSITED USERS</div><div class="value"><?php echo $totalUndeposited; ?> <i class="fa fa-ban icon orange"></i></div></div>
    <div class="card"><div class="text orange">TOTAL DEPOSITS</div><div class="value">$<?php echo number_format($totalDepositAmount, 2); ?> <i class="fa fa-dollar-sign icon orange"></i></div></div>
  </div>

  <script>
    function toggleMenu() { var menu = document.getElementById("menuDropdown"); menu.style.display = menu.style.display === "block" ? "none" : "block"; }
    window.onclick = function(event) { if (!event.target.matches('.menu-btn, .menu-btn *')) { document.getElementById("menuDropdown").style.display = "none"; } }
  </script>
</body>
</html>
