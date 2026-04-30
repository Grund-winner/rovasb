<?php
session_start();

// Database connection
@mkdir(__DIR__ . '/data', 0777, true);
$db = new SQLite3(__DIR__ . '/data/bot.db');

// Create users table if it doesn't exist
$db->exec("CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    language TEXT DEFAULT 'en',
    isregistered TEXT DEFAULT 'no',
    isdeposit TEXT DEFAULT 'no',
    deposit_amount TEXT DEFAULT '0',
    deposit_transactionid TEXT DEFAULT '',
    country TEXT DEFAULT 'fr',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)");

// Admin authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        
        // Simple authentication - in production use secure password hashing
        if ($username === 'rovas' && $password === 'Patrick2026@####') {
            $_SESSION['admin_logged_in'] = true;
            header("Location: users.php");
            exit;
        } else {
            $error = "Invalid credentials";
        }
    }
    
    // Show login form if not authenticated
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login</title>
        <style>
            :root {
                --primary: #4361ee;
                --primary-dark: #3a56d4;
                --text: #212529;
                --danger: #dc3545;
                --border: #dee2e6;
                --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            }
            
            body {
                background-color: #f5f7fa;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px;
            }
            
            .login-container {
                background: white;
                border-radius: 12px;
                box-shadow: var(--shadow);
                padding: 30px;
                width: 100%;
                max-width: 400px;
                animation: fadeIn 0.5s ease;
            }
            
            h1 {
                text-align: center;
                margin-bottom: 24px;
                color: var(--primary);
                font-weight: 600;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
            }
            
            input {
                width: 100%;
                padding: 12px 16px;
                border-radius: 8px;
                border: 1px solid var(--border);
                font-size: 16px;
            }
            
            input:focus {
                outline: none;
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
            }
            
            button {
                width: 100%;
                padding: 12px 16px;
                border-radius: 8px;
                border: none;
                background-color: var(--primary);
                color: white;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            button:hover {
                background-color: var(--primary-dark);
            }
            
            .error {
                color: var(--danger);
                text-align: center;
                margin-bottom: 16px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h1>Admin Login</h1>
            
            <?php if (isset($error)): ?>
                <div class="error"><?php echo $error; ?></div>
            <?php endif; ?>
            
            <form method="post">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required value="admin">
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required value="password">
                </div>
                
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
    
    $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM users WHERE user_id = :uid");
    $stmt->bindValue(':uid', $userId, SQLITE3_INTEGER);
    $row = $stmt->execute()->fetchArray(SQLITE3_ASSOC);
    
    if ($row && $row['cnt'] > 0) {
        $stmt = $db->prepare("DELETE FROM users WHERE user_id = :uid");
        $stmt->bindValue(':uid', $userId, SQLITE3_INTEGER);
        $stmt->execute();
        header("Location: users.php?msg=User+$userId+deleted+successfully");
        exit;
    } else {
        header("Location: users.php?msg=User+not+found");
        exit;
    }
}

// Handle adding new user
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_user'])) {
    $userId = intval($_POST['userId']);
    $language = $_POST['language'] ?? 'en';
    $isRegistered = isset($_POST['isRegistered']) ? 'yes' : 'no';
    $isDeposited = isset($_POST['isDeposited']) ? 'yes' : 'no';
    $depositAmount = floatval($_POST['depositAmount'] ?? 0);
    $country = $_POST['country'] ?? 'fr';
    
    // Check if user already exists
    $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM users WHERE user_id = :uid");
    $stmt->bindValue(':uid', $userId, SQLITE3_INTEGER);
    $row = $stmt->execute()->fetchArray(SQLITE3_ASSOC);
    
    if ($row && $row['cnt'] > 0) {
        header("Location: users.php?msg=User+already+exists");
        exit;
    }
    
    // Insert new user
    $stmt = $db->prepare("INSERT INTO users (user_id, language, isregistered, isdeposit, deposit_amount, country) 
                         VALUES (:uid, :lang, :reg, :dep, :amt, :country)");
    $stmt->bindValue(':uid', $userId, SQLITE3_INTEGER);
    $stmt->bindValue(':lang', $language, SQLITE3_TEXT);
    $stmt->bindValue(':reg', $isRegistered, SQLITE3_TEXT);
    $stmt->bindValue(':dep', $isDeposited, SQLITE3_TEXT);
    $stmt->bindValue(':amt', $depositAmount, SQLITE3_FLOAT);
    $stmt->bindValue(':country', $country, SQLITE3_TEXT);
    
    if ($stmt->execute()) {
        header("Location: users.php?msg=User+added+successfully");
        exit;
    } else {
        header("Location: users.php?msg=Error+adding+user");
        exit;
    }
}

// Search and pagination logic
$searchId = isset($_GET['search']) ? trim($_GET['search']) : null;
$limit = 10;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

if ($searchId) {
    $stmt = $db->prepare("SELECT * FROM users WHERE user_id = :uid");
    $stmt->bindValue(':uid', $searchId, SQLITE3_TEXT);
    $results = $stmt->execute();
    $users = [];
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $users[] = $row;
    }
    $totalUsers = count($users);
    $totalPages = 1;
} else {
    $totalUsers = $db->querySingle("SELECT COUNT(*) FROM users");
    $totalPages = ceil($totalUsers / $limit);

    $results = $db->query("SELECT * FROM users ORDER BY user_id DESC LIMIT $limit OFFSET $offset");
    $users = [];
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $users[] = $row;
    }
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
    :root {
      --primary: #4361ee;
      --primary-dark: #3a56d4;
      --primary-light: #eef2ff;
      --secondary: #f8f9fa;
      --text: #212529;
      --text-light: #6c757d;
      --success: #28a745;
      --success-light: #eafaf1;
      --danger: #dc3545;
      --danger-light: #fdecea;
      --warning: #ffc107;
      --warning-light: #fff3cd;
      --border: #dee2e6;
      --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
      --transition: all 0.3s ease;
      --radius: 12px;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: var(--text);
      background-color: #f5f7fa;
      padding: 0;
    }
    
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--border);
      animation: fadeInDown 0.5s ease;
    }
    
    h1 {
      font-weight: 600;
      color: var(--primary);
      font-size: 28px;
    }
    
    .admin-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .admin-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
    
    .card {
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 24px;
      margin-bottom: 24px;
      animation: fadeIn 0.5s ease;
    }
    
    .search-box {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    input, button, .btn, select {
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-size: 16px;
      transition: var(--transition);
    }
    
    input, select {
      flex: 1;
      outline: none;
    }
    
    input:focus, select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
    }
    
    button, .btn {
      background-color: var(--primary);
      color: white;
      cursor: pointer;
      border: none;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      gap: 8px;
    }
    
    button:hover, .btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
    }
    
    .btn-secondary {
      background-color: var(--secondary);
      color: var(--text);
    }
    
    .btn-secondary:hover {
      background-color: #e9ecef;
    }
    
    .btn-success {
      background-color: var(--success);
    }
    
    .btn-success:hover {
      background-color: #218838;
    }
    
    .btn-danger {
      background-color: var(--danger);
    }
    
    .btn-danger:hover {
      background-color: #c82333;
    }
    
    .btn-add {
      background: linear-gradient(135deg, var(--primary), #6c63ff);
      padding: 14px 24px;
      font-size: 16px;
      box-shadow: var(--shadow);
    }
    
    .btn-add:hover {
      background: linear-gradient(135deg, var(--primary-dark), #5a52d5);
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
    
    .message {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      animation: slideInRight 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .message-success {
      background-color: var(--success-light);
      color: #155724;
      border-left: 4px solid var(--success);
    }
    
    .message-error {
      background-color: var(--danger-light);
      color: #721c24;
      border-left: 4px solid var(--danger);
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      animation: fadeIn 0.5s ease;
    }
    
    th, td {
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    
    th {
      background-color: var(--secondary);
      font-weight: 600;
      position: sticky;
      top: 0;
    }
    
    tr {
      transition: var(--transition);
    }
    
    tr:hover {
      background-color: rgba(67, 97, 238, 0.03);
    }
    
    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .status-registered {
      background-color: var(--success-light);
      color: var(--success);
    }
    
    .status-deposited {
      background-color: var(--warning-light);
      color: var(--warning);
    }
    
    .status-no {
      background-color: var(--danger-light);
      color: var(--danger);
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 24px;
    }
    
    .pagination a {
      min-width: 40px;
      height: 40px;
      padding: 0;
    }
    
    .pagination a.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    
    /* Modal Styles */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
      padding: 20px;
    }
    
    .modal-content {
      background-color: white;
      border-radius: var(--radius);
      padding: 0;
      width: 100%;
      max-width: 600px;
      box-shadow: var(--shadow-lg);
      animation: modalSlideIn 0.3s ease;
      overflow: hidden;
    }
    
    .modal-header {
      padding: 20px 24px;
      background-color: var(--primary);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .modal-header h2 {
      font-weight: 600;
      font-size: 22px;
    }
    
    .modal-close {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: var(--transition);
    }
    
    .modal-close:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
    }
    
    .modal-body {
      padding: 24px;
      max-height: 70vh;
      overflow-y: auto;
    }
    
    .modal-footer {
      padding: 20px 24px;
      background-color: var(--secondary);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--text);
    }
    
    .form-group input, .form-group select {
      width: 100%;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-size: 16px;
      transition: var(--transition);
    }
    
    .form-group input:focus, .form-group select:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
    }
    
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 30px;
    }
    
    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }
    
    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 22px;
      width: 22px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    input:checked + .toggle-slider {
      background-color: var(--success);
    }
    
    input:checked + .toggle-slider:before {
      transform: translateX(30px);
    }
    
    .toggle-container {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }
    
    .toggle-label {
      font-weight: 500;
    }
    
    .logout-btn {
      background-color: var(--danger);
      margin-left: 15px;
    }
    
    .logout-btn:hover {
      background-color: #c82333;
    }
    
    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-50px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .container {
        padding: 16px;
      }
      
      header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .search-box {
        flex-direction: column;
      }
      
      table {
        display: block;
        overflow-x: auto;
      }
      
      th, td {
        padding: 12px 8px;
      }
      
      .modal {
        padding: 10px;
      }
      
      .modal-content {
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>User Management System</h1>
      <div class="admin-info">
        <div class="admin-avatar">A</div>
        <span>Admin Panel</span>
        <button class="btn btn-add" onclick="openAddUserModal()">
          <i class="fas fa-plus"></i> Add New User
        </button>
        <a href="?logout" class="btn logout-btn">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      </div>
    </header>
    
    <?php if (isset($_GET['msg'])): ?>
    <div class="message message-success">
      <i class="fas fa-check-circle"></i>
      <?= htmlspecialchars($_GET['msg']) ?>
    </div>
    <?php endif; ?>
    
    <div class="card">
      <form method="get" class="search-box">
        <input type="text" name="search" placeholder="Enter User ID..." value="<?= htmlspecialchars($searchId ?? '') ?>">
        <button type="submit">
          <i class="fas fa-search"></i> Search
        </button>
        <?php if ($searchId): ?>
          <a href="users.php" class="btn btn-secondary">
            <i class="fas fa-times"></i> Clear
          </a>
        <?php endif; ?>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Language</th>
            <th>Registered</th>
            <th>Deposit</th>
            <th>Deposit Amount</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php if (count($users) > 0): ?>
            <?php foreach ($users as $user): ?>
            <tr>
              <td><?= htmlspecialchars($user['user_id']) ?></td>
              <td><?= htmlspecialchars($user['language']) ?></td>
              <td>
                <span class="status-badge <?= ($user['isregistered'] === 'yes') ? 'status-registered' : 'status-no' ?>">
                  <?= htmlspecialchars($user['isregistered'] ?? 'no') ?>
                </span>
              </td>
              <td>
                <span class="status-badge <?= ($user['isdeposit'] === 'yes') ? 'status-deposited' : 'status-no' ?>">
                  <?= htmlspecialchars($user['isdeposit'] ?? 'no') ?>
                </span>
              </td>
              <td>$<?= number_format($user['deposit_amount'] ?? 0, 2) ?></td>
              <td><?= htmlspecialchars($user['country'] ?? '-') ?></td>
              <td>
                <button class="btn btn-danger" onclick="openDeleteModal('<?= $user['user_id'] ?>')">
                  <i class="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
            <?php endforeach; ?>
          <?php else: ?>
            <tr>
              <td colspan="7" style="text-align: center; padding: 40px;">
                No users found
              </td>
            </tr>
          <?php endif; ?>
        </tbody>
      </table>
      
      <?php if (!$searchId && $totalPages > 1): ?>
      <div class="pagination">
        <a href="?page=<?= $page-1 ?>" class="btn <?= ($page <= 1) ? 'disabled' : '' ?>">
          <i class="fas fa-chevron-left"></i> Prev
        </a>
        <span class="btn btn-secondary">Page <?= $page ?> of <?= $totalPages ?></span>
        <a href="?page=<?= $page+1 ?>" class="btn <?= ($page >= $totalPages) ? 'disabled' : '' ?>">
          Next <i class="fas fa-chevron-right"></i>
        </a>
      </div>
      <?php endif; ?>
    </div>
  </div>
  
  <!-- Add User Modal -->
  <div class="modal" id="addUserModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New User</h2>
        <button class="modal-close" onclick="closeAddUserModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <form method="post" id="addUserForm">
        <div class="modal-body">
          <div class="form-group">
            <label for="userId">User ID</label>
            <input type="number" id="userId" name="userId" required placeholder="Enter User ID">
          </div>
          
          <div class="form-group">
            <label for="language">Language</label>
            <select id="language" name="language">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="ru">Russian</option>
              <option value="hi">Hindi</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="uz">Uzbek</option>
              <option value="az">Azerbaijani</option>
              <option value="tr">Turkish</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          
          <div class="toggle-container">
            <span class="toggle-label">Registered User</span>
            <label class="toggle-switch">
              <input type="checkbox" id="isRegistered" name="isRegistered" checked>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="toggle-container">
            <span class="toggle-label">Deposit Made</span>
            <label class="toggle-switch">
              <input type="checkbox" id="isDeposited" name="isDeposited">
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="form-group">
            <label for="depositAmount">Deposit Amount ($)</label>
            <input type="number" id="depositAmount" name="depositAmount" placeholder="Enter deposit amount" value="0" step="0.01" min="0">
          </div>
          
          <div class="form-group">
            <label for="country">Country Code</label>
            <input type="text" id="country" name="country" placeholder="e.g. CI, SN, FR" value="" maxlength="5">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeAddUserModal()">Cancel</button>
          <button type="submit" name="add_user" class="btn btn-success">
            <i class="fas fa-plus-circle"></i> Add User
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <!-- Delete Confirmation Modal -->
  <div class="modal" id="deleteModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Confirm Delete</h2>
        <button class="modal-close" onclick="closeDeleteModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete user <span id="userIdText"></span>?</p>
        <p>This action cannot be undone and will permanently remove the user from the system.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeDeleteModal()">Cancel</button>
        <button class="btn btn-danger" id="confirmDelete">
          <i class="fas fa-trash"></i> Delete User
        </button>
      </div>
    </div>
  </div>
  
  <script>
    let userIdToDelete = null;
    
    function openAddUserModal() {
      document.getElementById('addUserModal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    
    function closeAddUserModal() {
      document.getElementById('addUserModal').style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    function openDeleteModal(userId) {
      userIdToDelete = userId;
      document.getElementById('userIdText').textContent = userId;
      document.getElementById('deleteModal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    
    function closeDeleteModal() {
      document.getElementById('deleteModal').style.display = 'none';
      document.body.style.overflow = 'auto';
      userIdToDelete = null;
    }
    
    document.getElementById('confirmDelete').addEventListener('click', function() {
      if (userIdToDelete) {
        window.location.href = "users.php?delete=" + userIdToDelete;
      }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      const addModal = document.getElementById('addUserModal');
      const deleteModal = document.getElementById('deleteModal');
      
      if (event.target === addModal) {
        closeAddUserModal();
      }
      
      if (event.target === deleteModal) {
        closeDeleteModal();
      }
    });
    
    // Toggle deposit amount field based on deposit status
    document.getElementById('isDeposited').addEventListener('change', function() {
      const depositAmount = document.getElementById('depositAmount');
      if (this.checked) {
        depositAmount.removeAttribute('disabled');
        depositAmount.value = depositAmount.value || '100'; // Set default value if empty
      } else {
        depositAmount.setAttribute('disabled', 'disabled');
        depositAmount.value = '0';
      }
    });
    
    // Initialize deposit amount field based on initial state
    document.addEventListener('DOMContentLoaded', function() {
      const isDeposited = document.getElementById('isDeposited');
      const depositAmount = document.getElementById('depositAmount');
      
      if (!isDeposited.checked) {
        depositAmount.setAttribute('disabled', 'disabled');
      }
    });
  </script>
</body>
</html>