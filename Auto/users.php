<?php
session_start();
require_once __DIR__ . '/config.php';

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

// Admin authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        if ($username === ADMIN_USER && $password === ADMIN_PASS) {
            $_SESSION['admin_logged_in'] = true;
            header("Location: users.php");
            exit;
        } else {
            $error = "Invalid credentials";
        }
    }

    // Show login form
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            body { background-color: #f5f7fa; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; }
            .login-container { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 30px; width: 100%; max-width: 400px; }
            h1 { text-align: center; margin-bottom: 24px; color: #4361ee; }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 8px; font-weight: 500; }
            input { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid #dee2e6; font-size: 16px; }
            input:focus { outline: none; border-color: #4361ee; }
            button { width: 100%; padding: 12px 16px; border-radius: 8px; border: none; background-color: #4361ee; color: white; font-size: 16px; cursor: pointer; }
            .error { color: #dc3545; text-align: center; margin-bottom: 16px; }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h1>Admin Login</h1>
            <?php if (isset($error)): ?><div class="error"><?php echo $error; ?></div><?php endif; ?>
            <form method="post">
                <div class="form-group"><label for="username">Username</label><input type="text" id="username" name="username" required></div>
                <div class="form-group"><label for="password">Password</label><input type="password" id="password" name="password" required></div>
                <button type="submit" name="login">Login</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: users.php");
    exit;
}

// Handle user deletion
if (isset($_GET['delete'])) {
    $userId = intval($_GET['delete']);
    $stmt = $db->prepare("DELETE FROM users WHERE telegram_id = :tid");
    $stmt->bindValue(':tid', $userId);
    $stmt->execute();
    header("Location: users.php?msg=User+$userId+deleted");
    exit;
}

// Handle adding new user
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_user'])) {
    $telegramId = intval($_POST['telegramId']);
    $language = $_POST['language'] ?? 'en';
    $isRegistered = isset($_POST['isRegistered']) ? 'yes' : 'no';
    $isDeposited = isset($_POST['isDeposited']) ? 'yes' : 'no';
    $depositAmount = floatval($_POST['depositAmount'] ?? 0);
    $oneWinId = $_POST['oneWinUserId'] ?? '';

    $stmt = $db->prepare("INSERT INTO users (telegram_id, language, is_registered, is_deposited, deposit_amount, one_win_user_id) 
                          VALUES (:tid, :lang, :reg, :dep, :amt, :winid)");
    $stmt->bindValue(':tid', $telegramId, PDO::PARAM_INT);
    $stmt->bindValue(':lang', $language);
    $stmt->bindValue(':reg', $isRegistered === 'yes' ? true : false, PDO::PARAM_BOOL);
    $stmt->bindValue(':dep', $isDeposited === 'yes' ? true : false, PDO::PARAM_BOOL);
    $stmt->bindValue(':amt', $depositAmount);
    $stmt->bindValue(':winid', $oneWinId ?: null);

    try {
        $stmt->execute();
        header("Location: users.php?msg=User+added+successfully");
    } catch (Exception $e) {
        header("Location: users.php?msg=Error:+User+already+exists");
    }
    exit;
}

// Search and pagination
$searchId = isset($_GET['search']) ? trim($_GET['search']) : null;
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

if ($searchId) {
    $stmt = $db->prepare("SELECT * FROM users WHERE telegram_id = :tid OR CAST(telegram_id AS TEXT) LIKE :tidstr");
    $stmt->bindValue(':tid', $searchId, PDO::PARAM_INT);
    $stmt->bindValue(':tidstr', '%' . $searchId . '%');
    $stmt->execute();
    $users = $stmt->fetchAll();
    $totalUsers = count($users);
    $totalPages = 1;
} else {
    $totalUsers = $db->query("SELECT COUNT(*) FROM users")->fetchColumn();
    $totalPages = ceil($totalUsers / $limit);
    $stmt = $db->query("SELECT * FROM users ORDER BY id DESC LIMIT $limit OFFSET $offset");
    $users = $stmt->fetchAll();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Management System</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root { --primary: #4361ee; --primary-dark: #3a56d4; --secondary: #f8f9fa; --text: #212529; --success: #28a745; --danger: #dc3545; --warning: #ffc107; --border: #dee2e6; --shadow: 0 4px 12px rgba(0,0,0,0.05); --radius: 12px; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #f5f7fa; padding: 0; color: var(--text); }
    .container { max-width: 1280px; margin: 0 auto; padding: 20px; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 15px; border-bottom: 1px solid var(--border); flex-wrap: wrap; gap: 10px; }
    h1 { font-weight: 600; color: var(--primary); font-size: 28px; }
    .admin-info { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .card { background: white; border-radius: var(--radius); box-shadow: var(--shadow); padding: 24px; margin-bottom: 24px; }
    .search-box { display: flex; gap: 12px; margin-bottom: 24px; }
    input, button, .btn, select { padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border); font-size: 16px; }
    input, select { flex: 1; outline: none; }
    input:focus, select:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(67,97,238,0.15); }
    button, .btn { background-color: var(--primary); color: white; cursor: pointer; border: none; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; }
    button:hover, .btn:hover { background-color: var(--primary-dark); }
    .btn-secondary { background-color: var(--secondary); color: var(--text); }
    .btn-danger { background-color: var(--danger); }
    .btn-add { background: linear-gradient(135deg, var(--primary), #6c63ff); padding: 14px 24px; }
    .message { padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
    .message-success { background-color: #eafaf1; color: #155724; border-left: 4px solid var(--success); }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 14px; text-align: left; border-bottom: 1px solid var(--border); }
    th { background-color: var(--secondary); font-weight: 600; }
    .status-badge { display: inline-block; padding: 5px 10px; border-radius: 50px; font-size: 12px; font-weight: 500; }
    .status-yes { background-color: #eafaf1; color: var(--success); }
    .status-no { background-color: #fdecea; color: var(--danger); }
    .pagination { display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
    .pagination a { min-width: 40px; height: 40px; padding: 0; display: inline-flex; align-items: center; }
    .pagination a.disabled { opacity: 0.5; pointer-events: none; }
    .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
    .modal-content { background-color: white; border-radius: var(--radius); width: 100%; max-width: 600px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; }
    .modal-header { padding: 20px 24px; background-color: var(--primary); color: white; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { font-weight: 600; font-size: 22px; margin: 0; }
    .modal-close { background: none; border: none; color: white; font-size: 24px; cursor: pointer; }
    .modal-body { padding: 24px; }
    .modal-footer { padding: 20px 24px; background-color: var(--secondary); display: flex; justify-content: flex-end; gap: 12px; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
    .form-group input, .form-group select { width: 100%; padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border); }
    .logout-btn { background-color: var(--danger); }
    @media (max-width: 768px) { .container { padding: 16px; } header { flex-direction: column; align-items: flex-start; } .search-box { flex-direction: column; } table { display: block; overflow-x: auto; } }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>User Management</h1>
      <div class="admin-info">
        <button class="btn btn-add" onclick="openAddUserModal()"><i class="fas fa-plus"></i> Add New User</button>
        <a href="?logout" class="btn logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
      </div>
    </header>

    <?php if (isset($_GET['msg'])): ?>
    <div class="message message-success"><i class="fas fa-check-circle"></i> <?= htmlspecialchars(str_replace('+', ' ', $_GET['msg'])) ?></div>
    <?php endif; ?>

    <div class="card">
      <form method="get" class="search-box">
        <input type="text" name="search" placeholder="Search by Telegram ID..." value="<?= htmlspecialchars($searchId ?? '') ?>">
        <button type="submit"><i class="fas fa-search"></i> Search</button>
        <?php if ($searchId): ?><a href="users.php" class="btn btn-secondary"><i class="fas fa-times"></i> Clear</a><?php endif; ?>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Telegram ID</th>
            <th>Username</th>
            <th>Registered</th>
            <th>Deposit</th>
            <th>Amount</th>
            <th>Language</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php if (count($users) > 0): ?>
            <?php foreach ($users as $user): ?>
            <tr>
              <td><?= htmlspecialchars($user['id']) ?></td>
              <td><?= htmlspecialchars($user['telegram_id']) ?></td>
              <td><?= htmlspecialchars($user['username'] ?? '-') ?></td>
              <td><span class="status-badge <?= ($user['is_registered'] == true) ? 'status-yes' : 'status-no' ?>"><?= $user['is_registered'] ? 'Yes' : 'No' ?></span></td>
              <td><span class="status-badge <?= ($user['is_deposited'] == true) ? 'status-yes' : 'status-no' ?>"><?= $user['is_deposited'] ? 'Yes' : 'No' ?></span></td>
              <td>$<?= number_format($user['deposit_amount'] ?? 0, 2) ?></td>
              <td><?= htmlspecialchars($user['language'] ?? '-') ?></td>
              <td><button class="btn btn-danger" onclick="openDeleteModal('<?= $user['telegram_id'] ?>')"><i class="fas fa-trash"></i></button></td>
            </tr>
            <?php endforeach; ?>
          <?php else: ?>
            <tr><td colspan="8" style="text-align:center;padding:40px;">No users found</td></tr>
          <?php endif; ?>
        </tbody>
      </table>

      <?php if (!$searchId && $totalPages > 1): ?>
      <div class="pagination">
        <a href="?page=<?= $page-1 ?>" class="btn <?= ($page <= 1) ? 'disabled' : '' ?>"><i class="fas fa-chevron-left"></i></a>
        <span class="btn btn-secondary">Page <?= $page ?> / <?= $totalPages ?></span>
        <a href="?page=<?= $page+1 ?>" class="btn <?= ($page >= $totalPages) ? 'disabled' : '' ?>"><i class="fas fa-chevron-right"></i></a>
      </div>
      <?php endif; ?>
    </div>
  </div>

  <!-- Add User Modal -->
  <div class="modal" id="addUserModal">
    <div class="modal-content">
      <div class="modal-header"><h2>Add New User</h2><button class="modal-close" onclick="closeAddUserModal()"><i class="fas fa-times"></i></button></div>
      <form method="post">
        <div class="modal-body">
          <div class="form-group"><label>Telegram ID</label><input type="number" name="telegramId" required placeholder="Enter Telegram ID"></div>
          <div class="form-group"><label>Language</label>
            <select name="language">
              <option value="en">English</option><option value="fr">French</option><option value="ru">Russian</option>
              <option value="hi">Hindi</option><option value="pt">Portuguese</option><option value="es">Spanish</option>
              <option value="uz">Uzbek</option><option value="az">Azerbaijani</option><option value="tr">Turkish</option><option value="ar">Arabic</option>
            </select>
          </div>
          <div class="form-group"><label>1Win User ID</label><input type="text" name="oneWinUserId" placeholder="Optional"></div>
          <div class="form-group"><label>Deposit Amount ($)</label><input type="number" name="depositAmount" value="0" step="0.01" min="0"></div>
          <div class="form-group"><label><input type="checkbox" name="isRegistered"> Registered</label></div>
          <div class="form-group"><label><input type="checkbox" name="isDeposited"> Deposited</label></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeAddUserModal()">Cancel</button>
          <button type="submit" name="add_user" class="btn" style="background-color:var(--success)"><i class="fas fa-plus-circle"></i> Add User</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Modal -->
  <div class="modal" id="deleteModal">
    <div class="modal-content">
      <div class="modal-header"><h2>Confirm Delete</h2><button class="modal-close" onclick="closeDeleteModal()"><i class="fas fa-times"></i></button></div>
      <div class="modal-body"><p>Are you sure you want to delete user <span id="userIdText"></span>?</p></div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeDeleteModal()">Cancel</button>
        <button class="btn btn-danger" id="confirmDelete"><i class="fas fa-trash"></i> Delete</button>
      </div>
    </div>
  </div>

  <script>
    let userIdToDelete = null;
    function openAddUserModal() { document.getElementById('addUserModal').style.display = 'flex'; }
    function closeAddUserModal() { document.getElementById('addUserModal').style.display = 'none'; }
    function openDeleteModal(userId) { userIdToDelete = userId; document.getElementById('userIdText').textContent = userId; document.getElementById('deleteModal').style.display = 'flex'; }
    function closeDeleteModal() { document.getElementById('deleteModal').style.display = 'none'; userIdToDelete = null; }
    document.getElementById('confirmDelete').addEventListener('click', function() { if (userIdToDelete) window.location.href = "users.php?delete=" + userIdToDelete; });
    window.addEventListener('click', function(e) { if (e.target === document.getElementById('addUserModal')) closeAddUserModal(); if (e.target === document.getElementById('deleteModal')) closeDeleteModal(); });
  </script>
</body>
</html>
