<?php
require_once 'config.php';

// ========================
// OPTIMIZED DB INIT (runs once per process)
// ========================
$_bot_tables_ready = false;

function initDB() {
    global $_bot_tables_ready;
    if ($_bot_tables_ready) return;

    try {
        $db = getDB();
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

        $db->exec("CREATE TABLE IF NOT EXISTS access_codes (
            id SERIAL PRIMARY KEY,
            code TEXT NOT NULL,
            telegram_id BIGINT,
            used BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )");

        $db->exec("CREATE TABLE IF NOT EXISTS bot_sessions (
            bot_type TEXT NOT NULL,
            admin_id BIGINT NOT NULL,
            action TEXT,
            step INTEGER,
            temp_data TEXT,
            updated_at TIMESTAMPTZ DEFAULT NOW()
        )");
    } catch (Exception $e) {
        // Tables likely already exist, continue
    }

    $_bot_tables_ready = true;
}

initDB();

// ========================
// OPTIMIZED DB HELPERS (single query per user)
// ========================
function getUserRow($telegramId) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM users WHERE telegram_id = :tid");
    $stmt->bindValue(':tid', $telegramId, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch();
}

function getUserByTelegramId($telegramId) {
    return getUserRow($telegramId);
}

function saveUserData($telegramId, $key, $value) {
    $db = getDB();

    $allowed = ['language', 'is_registered', 'is_deposited', 'deposit_amount', 'one_win_user_id', 'username', 'first_name'];
    if (!in_array($key, $allowed)) return;

    // Check if user exists
    $stmt = $db->prepare("SELECT id FROM users WHERE telegram_id = :tid");
    $stmt->bindValue(':tid', $telegramId, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->fetch()) {
        $stmt = $db->prepare("UPDATE users SET $key = :value, updated_at = NOW() WHERE telegram_id = :tid");
    } else {
        $stmt = $db->prepare("INSERT INTO users (telegram_id, $key, updated_at) VALUES (:tid, :value, NOW())");
    }

    if ($key === 'is_registered' || $key === 'is_deposited') {
        $stmt->bindValue(':value', ($value === true || $value === 'yes' || $value === 1 || $value === 'true') ? true : false, PDO::PARAM_BOOL);
    } else {
        $stmt->bindValue(':value', $value);
    }
    $stmt->bindValue(':tid', $telegramId, PDO::PARAM_INT);
    $stmt->execute();
}

function getUserData($telegramId, $key) {
    $user = getUserByTelegramId($telegramId);
    if (!$user) return null;
    if (($key === 'is_registered' || $key === 'is_deposited') && isset($user[$key])) {
        return $user[$key] ? 'yes' : 'no';
    }
    return $user[$key] ?? null;
}

// ========================
// TELEGRAM API (with timeout)
// ========================
function telegramRequest($method, $data) {
    $url = "https://api.telegram.org/bot" . TOKEN . "/$method";
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 5
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

function sendMessage($chatId, $text, $replyMarkup = null, $parseMode = null) {
    $data = [
        'chat_id' => $chatId,
        'text' => $text
    ];
    if ($replyMarkup) $data['reply_markup'] = json_encode($replyMarkup);
    if ($parseMode) $data['parse_mode'] = $parseMode;
    return telegramRequest('sendMessage', $data);
}

function sendVideo($chatId, $videoPath, $caption = null, $replyMarkup = null, $parseMode = null) {
    $data = [
        'chat_id' => $chatId,
        'video' => new CURLFile($videoPath)
    ];
    if ($caption) $data['caption'] = $caption;
    if ($replyMarkup) $data['reply_markup'] = json_encode($replyMarkup);
    if ($parseMode) $data['parse_mode'] = $parseMode;
    return telegramRequest('sendVideo', $data);
}

function sendVideoByUrl($chatId, $videoUrl, $caption = null, $replyMarkup = null, $parseMode = null) {
    $data = [
        'chat_id' => $chatId,
        'video' => $videoUrl
    ];
    if ($caption) $data['caption'] = $caption;
    if ($replyMarkup) $data['reply_markup'] = json_encode($replyMarkup);
    if ($parseMode) $data['parse_mode'] = $parseMode;
    return telegramRequest('sendVideo', $data);
}

function sendPhoto($chatId, $photo, $caption = null, $replyMarkup = null, $parseMode = null) {
    $data = [
        'chat_id' => $chatId,
        'photo' => $photo
    ];
    if ($caption) $data['caption'] = $caption;
    if ($replyMarkup) $data['reply_markup'] = json_encode($replyMarkup);
    if ($parseMode) $data['parse_mode'] = $parseMode;
    return telegramRequest('sendPhoto', $data);
}

function deleteMessage($chatId, $messageId) {
    return telegramRequest('deleteMessage', [
        'chat_id' => $chatId,
        'message_id' => $messageId
    ]);
}

function answerCallbackQuery($callbackId, $text = null, $showAlert = false) {
    $data = ['callback_query_id' => $callbackId];
    if ($text) $data['text'] = $text;
    if ($showAlert) $data['show_alert'] = true;
    return telegramRequest('answerCallbackQuery', $data);
}

function checkMembership($userId) {
    $response = telegramRequest('getChatMember', [
        'chat_id' => '@' . CHANNEL,
        'user_id' => $userId
    ]);
    return isset($response['result']['status']) &&
           in_array($response['result']['status'], ['member', 'administrator', 'creator']);
}

// ========================
// LANGUAGE DICTIONARIES
// ========================
$step1_texts = [
    "en" => "⚠️ Error: Registration not completed!\n\n✦ Please enter the promo code <b>ROVAS</b> during registration.\n\n● Once registration is complete, you will receive an automatic notification from the bot.",
    "hi" => "⚠️ त्रुटि: पंजीकरण पूरा नहीं हुआ!\n\n✦ कृपया पंजीकरण के दौरान प्रोमो कोड <b>ROVAS</b> दर्ज करें।\n\n● पंजीकरण पूरा होते ही, आपको बॉट से स्वत: सूचना प्राप्त होगी।",
    "ru" => "⚠️ Ошибка: Регистрация не завершена!\n\n✦ Пожалуйста, введите промокод <b>ROVAS</b> при регистрации.\n\n● После завершения регистрации вы автоматически получите уведомление от бота.",
    "pt" => "⚠️ Erro: Registro não concluído!\n\n✦ Insira o código promocional <b>ROVAS</b> durante o registro.\n\n● Assim que o registro for concluído, você receberá uma notificação automática do bot.",
    "es" => "⚠️ Error: ¡Registro no completado!\n\n✦ Ingrese el código promocional <b>ROVAS</b> durante el registro.\n\n● Una vez que el registro esté completo, recibirá una notificación automática del bot.",
    "uz" => "⚠️ Xato: Ro'yxatdan o'tish yakunlanmadi!\n\n✦ Ro'yxatdan o'tishda <b>ROVAS</b> promo kodini kiriting.\n\n● Ro'yxatdan o'tgach, botdan avtomatik bildirishnoma olasiz.",
    "az" => "⚠️ Xəta: Qeydiyyat tamamlanmayıb!\n\n✦ Qeydiyyat zamanı <b>ROVAS</b> promo kodunu daxil edin.\n\n● Qeydiyyat başa çatdıqdan sonra botdan avtomatik bildiriş alacaqsınız.",
    "tr" => "⚠️ Hata: Kayıt tamamlanmadı!\n\n✦ Kayıt sırasında <b>ROVAS</b> promosyon kodunu girin.\n\n● Kayıt tamamlandığında bottan otomatik bildirim alacaksınız.",
    "ar" => "⚠️ خطأ: لم تكتمل عملية التسجيل!\n\n✦ يرجى إدخال رمز العرض الترويجي <b>ROVAS</b> أثناء التسجيل.\n\n● بمجرد إكمال التسجيل، ستتلقى إشعارًا تلقائيًا من الروبوت.",
    "fr" => "⚠️ Erreur : Inscription non terminée !\n\n✦ Veuillez entrer le code promo <b>ROVAS</b> lors de l'inscription.\n\n● Une fois l'inscription terminée, vous recevrez automatiquement une notification du bot."
];

$step2_texts = [
    "en" => "🎉 Congratulations on successful registration! 🥳\n\n🌐 Step 2 – Make your first deposit.\n\n✦ The higher the deposit, the higher your LEVEL in the bot.\nHigher levels allow you to receive more signals with a higher probability of success.\n\n● After completing your first deposit, you will automatically receive a notification from the bot.",
    "hi" => "🎉 सफल पंजीकरण के लिए बधाई! 🥳\n\n🌐 चरण 2 – अपनी पहली जमा राशि करें।\n\n✦ जितनी अधिक जमा, उतना ऊंचा बॉट में आपका स्तर।\nउच्च स्तर पर आपको अधिक सटीक सिग्नल मिलेंगे।\n\n● पहली जमा पूरी करने के बाद आपको बॉट से स्वत: सूचना मिलेगी।",
    "ru" => "🎉 Поздравляем с успешной регистрацией! 🥳\n\n🌐 Шаг 2 – Сделайте свой первый депозит.\n\n✦ Чем выше депозит, тем выше ваш УРОВЕНЬ в боте.\nБолее высокий уровень — больше сигналов и выше вероятность успеха.\n\n● После первого депозита вы автоматически получите уведомление от бота.",
    "pt" => "🎉 Parabéns pelo registro bem-sucedido! 🥳\n\n🌐 Etapa 2 – Faça seu primeiro depósito.\n\n✦ Quanto maior o depósito, maior o seu NÍVEL no bot.\nNíveis mais altos permitem receber mais sinais com maior taxa de acerto.\n\n● Após concluir o primeiro depósito, você receberá uma notificação automática do bot.",
    "es" => "🎉 ¡Felicidades por tu registro exitoso! 🥳\n\n🌐 Paso 2 – Realiza tu primer depósito.\n\n✦ Cuanto mayor sea el depósito, mayor será tu NIVEL en el bot.\nLos niveles más altos permitem recibir más señales con mayor probabilidad de éxito.\n\n● Después de tu primer depósito, recibirás una notificación automática del bot.",
    "uz" => "🎉 Muvaffaqiyatli ro'yxatdan o'tganingiz bilan tabriklaymiz! 🥳\n\n🌐 2-qadam – Birinchi depozitingizni qiling.\n\n✦ Depozit qancha katta bo'lsa, botdagi DARAJANGIZ shuncha yuqori bo'ladi.\nYuqori daraja – ko'proq va aniqroq signallar.\n\n● Birincho depozitdan so'ng bot sizga avtomatik xabar yuboradi.",
    "az" => "🎉 Uğurlu qeydiyyatınızla təbrik edirik! 🥳\n\n🌐 Addım 2 – İlk depozitinizi edin.\n\n✦ Depozit nə qədər yüksəkdirsə, botdakı SƏVİYYƏNİZ o qədər yüksək olacaq.\nYüksək səviyyə – daha çox və dəqiq siqnallar.\n\n● İlk depozitdən sonra bot sizə avtomatik bildiriş göndərəcək.",
    "tr" => "🎉 Başarılı kayıt için tebrikler! 🥳\n\n🌐 Adım 2 – İlk para yatırma işleminizi yapın.\n\n✦ Yatırılan miktar ne kadar yüksekse, bottaki SEVİYENİZ o kadar yüksek olur.\nYüksek seviyeler daha fazla ve daha doğru sinyal almanızı sağlar.\n\n● İlk para yatırma işleminden sonra bottan otomatik bildirim alırsınız.",
    "ar" => "🎉 تهانينا على التسجيل الناجح! 🥳\n\n🌐 الخطوة 2 – قم بإيداعك الأول.\n\n✦ كلما كان الإيداع أكبر، ارتفع مستواك في البوت.\nالمستويات الأعلى تمنحك المزيد من الإشارات بدقة أعلى.\n\n● بعد إكمال إيداعك الأول، ستتلقى إشعارًا تلقائيًا من البوت.",
    "fr" => "🎉 Félicitations pour votre inscription réussie ! 🥳\n\n🌐 Étape 2 – Effectuez votre premier dépôt.\n\n✦ Plus le dépôt est élevé, plus votre NIVEAU dans le bot sera élevé.\nDes niveaux plus élevés vous permettent de recevoir plus de signaux avec une probabilité de succès plus importante.\n\n● Après avoir effectué votre premier dépôt, vous recevrez automatiquement une notification du bot."
];

$deposit_success_texts = [
    "en" => "✅ Deposit received successfully!\n\n💰 Amount: {amount}\n🔖 Transaction ID: {transactionid}\n\nYou now have full access to the bot's features.",
    "hi" => "✅ जमा सफलतापूर्वक प्राप्त हुआ!\n\n💰 राशि: {amount}\n🔖 लेनदेन आईडी: {transactionid}\n\nअब आपके पास बॉट की सभी सुविधाओं तक पूर्ण पहुंच है।",
    "ru" => "✅ Депозит успешно получен!\n\n💰 Сумma: {amount}\n🔖 ID транзакции: {transactionid}\n\nТеперь у вас есть полный доступ к функциям бота.",
    "pt" => "✅ Depósito recebido com sucesso!\n\n💰 Valor: {amount}\n🔖 ID da transação: {transactionid}\n\nAgora você tem acesso total aos recursos do bot.",
    "es" => "✅ Depósito recibido con éxito!\n\n💰 Monto: {amount}\n🔖 ID de transacción: {transactionid}\n\nAhora tienes acceso completo a las funciones del bot.",
    "fr" => "✅ Dépôt reçu avec succès !\n\n💰 Montant : {amount}\n🔖 ID de transaction : {transactionid}\n\nVous avez maintenant un accès complet aux fonctionnalités du bot."
];

$account_status_texts = [
    "en" => "✅ Account Status: Registered & Deposit Completed\n\n● Registration: Completed\n● Deposit: Completed\n\nYou have full access to all features.",
    "hi" => "✅ खाता स्थिति: पंजीकृत और जमा पूर्ण\n\n● पंजीकरण: पूर्ण\n● जमा: पूर्ण\n\nआपके पास सभी सुविधाओं तक पूर्ण पहुंच है।",
    "ru" => "✅ Статус аккаунта: Регистрация и депозит завершены\n\n● Регистрация: Завершена\n● Депозит: Завершен\n\nУ вас есть полный доступ ко всем функциям.",
    "pt" => "✅ Status da conta: Registro e depósito concluídos\n\n● Registro: Concluído\n● Depósito: Concluído\n\nVocê tem acesso total a todos os recursos.",
    "es" => "✅ Estado de la cuenta: Registro y depósito completados\n\n● Registro: Completado\n● Depósito: Completado\n\nTienes acceso completo a todas las funciones.",
    "fr" => "✅ État du compte : Inscription et dépôt terminés\n\n● Inscription : Terminée\n● Dépôt : Terminé\n\nVous avez un accès complet à toutes les fonctionnalités."
];

$instructions_translations = [
    "en" => "🤖 The bot is based on and trained with OpenAI's neural network cluster!\n⚜️ To train the bot, 🎰 30,000 games were played.\n\nCurrently, bot users successfully generate 15 to 25% of their 💰 capital each day!\n\nThe bot is still undergoing verification and adjustments! The bot's accuracy is 95%!\nTo achieve maximum profit, follow these instructions:\n\n🟢 1. Sign up on the 1WIN betting site.\n[If it doesn't open, use a VPN (Sweden). Examples: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Without registration and without the promo code (ROVAS), access to signals will not be granted ⚠️\n\n🟢 2. Top up your account balance.\n🟢 3. Go to the 1WIN games section and select the game.\n🟢 4. Request a signal from the bot and place your bets accordingly.\n🟢 5. If you lose, double your bet (x²) to recover your losses.",
    "fr" => "🤖 Le bot est basé et entraîné sur le cluster de réseaux neuronaux d'OpenAI !\n⚜️ Pour entraîner le bot, 🎰 30 000 parties ont été jouées.\n\nActuellement, les utilisateurs du bot génèrent avec succès 15 à 25 % de leur 💰 capital chaque jour !\n\nLe bot est encore en cours de vérifications et d'ajustements ! La précision du bot est de 95 % !\nPour obtenir un profit maximal, suivez cette instruction :\n\n🟢 1. Inscrivez-vous sur le site de paris 1WIN.\n[Si cela ne s'ouvre pas, utilisez un VPN (Suède). Exemples : Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Sans inscription et sans code promo (ROVAS), l'accès aux signaux ne sera pas accordé ⚠️\n\n🟢 2. Rechargez le solde de votre compte.\n🟢 3. Allez dans la section des jeux 1WIN et sélectionnez le jeu.\n🟢 4. Demandez un signal au bot et placez vos mises en conséquence.\n🟢 5. En cas de perte, doublez votre mise (x²) pour récupérer vos pertes."
];

$main_menu_translations = [
    "ru" => ["main_menu" => "Главное меню:", "registration" => "📱 Регистрация", "instruction" => "📚 Инструкция", "choose_lang" => "🌐 Выбрать язык", "get_signal" => "⚜ ПОЛУЧИТЬ СИГНАЛ ⚜", "account_status" => "✅ Статус аккаунта", "back" => "🔙 Назад"],
    "en" => ["main_menu" => "Main Menu:", "registration" => "📱 Registration", "instruction" => "📚 Instruction", "choose_lang" => "🌐 Choose language", "get_signal" => "⚜ GET SIGNAL ⚜", "account_status" => "✅ Account Status", "back" => "🔙 Back"],
    "hi" => ["main_menu" => "मुख्य मेन्यू:", "registration" => "📱 पंजीकरण", "instruction" => "📚 निर्देश", "choose_lang" => "🌐 भाषा चुनें", "get_signal" => "⚜ सिग्नल प्राप्त करें ⚜", "account_status" => "✅ खाता स्थिति", "back" => "🔙 वापस"],
    "pt" => ["main_menu" => "Menu Principal:", "registration" => "📱 Registro", "instruction" => "📚 Instruções", "choose_lang" => "🌐 Escolher idioma", "get_signal" => "⚜ OBTER SINAL ⚜", "account_status" => "✅ Status da conta", "back" => "🔙 Voltar"],
    "es" => ["main_menu" => "Menú principal:", "registration" => "📱 Registro", "instruction" => "📚 Instrucciones", "choose_lang" => "🌐 Elegir idioma", "get_signal" => "⚜ OBTENER SEÑAL ⚜", "account_status" => "✅ Estado de la cuenta", "back" => "🔙 Atrás"],
    "uz" => ["main_menu" => "Asosiy menyu:", "registration" => "📱 Ro'yxatdan o'tish", "instruction" => "📚 Ko'rsatmalar", "choose_lang" => "🌐 Tilni tanlash", "get_signal" => "⚜ SIGNAL OLISH ⚜", "account_status" => "✅ Hisob holati", "back" => "🔙 Orqaga"],
    "az" => ["main_menu" => "Əsas menyu:", "registration" => "📱 Qeydiyyat", "instruction" => "📚 Təlimat", "choose_lang" => "🌐 Dil seçin", "get_signal" => "⚜ SİQNAL AL ⚜", "account_status" => "✅ Hesab statusu", "back" => "🔙 Geri"],
    "tr" => ["main_menu" => "Ana Menü:", "registration" => "📱 Kayıt", "instruction" => "📚 Talimat", "choose_lang" => "🌐 Dil seç", "get_signal" => "⚜ SİNYAL AL ⚜", "account_status" => "✅ Hesap durumu", "back" => "🔙 Geri"],
    "ar" => ["main_menu" => "القائمة الرئيسية:", "registration" => "📱 تسجيل", "instruction" => "📚 تعليمات", "choose_lang" => "🌐 اختر اللغة", "get_signal" => "⚜ الحصول على الإشارة ⚜", "account_status" => "✅ حالة الحساب", "back" => "🔙 رجوع"],
    "fr" => ["main_menu" => "Menu principal :", "registration" => "📱 Inscription", "instruction" => "📚 Instruction", "choose_lang" => "🌐 Choisir la langue", "get_signal" => "⚜ OBTENIR LE SIGNAL ⚜", "account_status" => "✅ État du compte", "back" => "🔙 Retour"]
];

// ========================
// WEBHOOK EVENTS (from Rovaspost.php)
// ========================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'webhook') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        exit('Invalid JSON');
    }

    $event = $input['event'] ?? null;
    $tgid = $input['tgid'] ?? null;

    if ($event && $tgid) {
        if ($event === 'registration') {
            $user = getUserRow($tgid);
            if ($user && $user['is_registered']) {
                http_response_code(200);
                exit('User already registered');
            }

            $country = $input['country'] ?? '';
            $userid = $input['userid'] ?? '';

            if (empty($country)) {
                http_response_code(400);
                exit('Country is required for registration');
            }

            // Register user in PostgreSQL
            $db = getDB();
            $stmt = $db->prepare("INSERT INTO users (telegram_id, is_registered, registered_at, updated_at, one_win_user_id)
                                  VALUES (:tid, TRUE, NOW(), NOW(), :winid)
                                  ON CONFLICT DO NOTHING");
            $stmt->bindValue(':tid', $tgid, PDO::PARAM_INT);
            $stmt->bindValue(':winid', $userid ?: null);
            $stmt->execute();

            // Update deposit status to false if was null
            $stmt = $db->prepare("UPDATE users SET is_deposited = FALSE WHERE telegram_id = :tid AND is_deposited IS NULL");
            $stmt->bindValue(':tid', $tgid, PDO::PARAM_INT);
            $stmt->execute();

            $user = getUserRow($tgid);
            $lang = ($user && $user['language']) ? $user['language'] : 'en';
            $message = $step2_texts[$lang] ?? $step2_texts['en'];

            $keyboard = [
                'inline_keyboard' => [
                    [['text' => "💰 Deposit", 'url' => "https://one-vv908.com/?open=deposit&p=583j&sub1=$tgid"]],
                    [['text' => "⬅️ Back to Main Menu", 'callback_data' => "main"]]
                ]
            ];

            sendPhoto($tgid, "https://i.ibb.co/zWgnCxLB/IMG-20250812-102227-999.jpg", $message, $keyboard);
        }
        elseif ($event === 'deposit') {
            $user = getUserRow($tgid);
            if ($user && $user['is_deposited']) {
                http_response_code(200);
                exit('User already made a deposit');
            }

            if (!$user || !$user['is_registered']) {
                http_response_code(400);
                exit('User must register before making a deposit');
            }

            $amount = $input['amount'] ?? '0';
            $country = $input['country'] ?? '';
            $transactionid = $input['transactionid'] ?? '';

            if (empty($amount) || floatval($amount) <= 0) {
                http_response_code(400);
                exit('Deposit amount must be greater than zero');
            }

            // Update deposit in PostgreSQL
            $db = getDB();
            $stmt = $db->prepare("UPDATE users SET is_deposited = TRUE, deposit_amount = :amount, deposited_at = NOW(), updated_at = NOW() WHERE telegram_id = :tid");
            $stmt->bindValue(':amount', floatval($amount));
            $stmt->bindValue(':tid', $tgid, PDO::PARAM_INT);
            $stmt->execute();

            $lang = ($user && $user['language']) ? $user['language'] : 'en';
            $message = $deposit_success_texts[$lang] ?? $deposit_success_texts['en'];
            $message = str_replace(['{amount}', '{transactionid}'], [$amount, $transactionid], $message);

            $t = $main_menu_translations[$lang] ?? $main_menu_translations['en'];

            $keyboard = [
                'inline_keyboard' => [
                    [['text' => "📡 " . $t['get_signal'], 'web_app' => ['url' => WEB_APP_URL]]],
                    [['text' => "⬅ " . $t['back'], 'callback_data' => "main"]]
                ]
            ];

            sendPhoto($tgid, "https://t.me/photoszr/11", "✅ BOT ACTIVATED 🟩", $keyboard);
        }

        http_response_code(200);
        exit('OK');
    } else {
        http_response_code(400);
        exit('Missing event or tgid');
    }
}

// ========================
// TELEGRAM WEBHOOK SECRET VERIFICATION
// ========================
if (isset($_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'])) {
    if ($_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] !== WEBHOOK_SECRET) {
        http_response_code(403);
        exit('Forbidden');
    }
}

// ========================
// HANDLE TELEGRAM UPDATES
// ========================
$update = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    exit;
}

if (isset($update['message'])) {
    $message = $update['message'];
    $chatId = $message['chat']['id'];
    $userId = $message['from']['id'];
    $text = $message['text'] ?? '';

    // Save user info on first interaction
    if ($text && strpos($text, '/start') === 0) {
        $db = getDB();
        $stmt = $db->prepare("INSERT INTO users (telegram_id, username, first_name, last_name, language, updated_at)
                              VALUES (:tid, :uname, :fname, :lname, :lang, NOW())
                              ON CONFLICT DO NOTHING");
        $stmt->bindValue(':tid', $userId, PDO::PARAM_INT);
        $stmt->bindValue(':uname', $message['from']['username'] ?? null);
        $stmt->bindValue(':fname', $message['from']['first_name'] ?? null);
        $stmt->bindValue(':lname', $message['from']['last_name'] ?? null);
        $stmt->bindValue(':lang', $message['from']['language_code'] ?? 'en');
        $stmt->execute();
    }

    if (strpos($text, '/start') === 0) {
        if (checkMembership($userId)) {
            $user = getUserRow($userId);
            $lang = $user['language'] ?? null;
            if ($lang) {
                runMain($chatId, $userId);
            } else {
                showLanguageSelection($chatId);
            }
        } else {
            $keyboard = [
                'inline_keyboard' => [
                    [['text' => "📢 Join Channel", 'url' => "https://t.me/".CHANNEL]],
                    [['text' => "✅ I've Joined", 'callback_data' => "verify_join"]]
                ]
            ];
            sendMessage($chatId, "Please join our channel to continue.", $keyboard);
        }
    }

}
elseif (isset($update['callback_query'])) {
    $callback = $update['callback_query'];
    $data = $callback['data'];
    $chatId = $callback['message']['chat']['id'];
    $userId = $callback['from']['id'];
    $messageId = $callback['message']['message_id'];
    $callbackId = $callback['id'];

    if (strpos($data, '/lang') === 0) {
        $lang = explode(' ', $data)[1] ?? '';
        if ($lang && array_key_exists($lang, $main_menu_translations)) {
            saveUserData($userId, 'language', $lang);
            answerCallbackQuery($callbackId, "✅ Language set to: ".strtoupper($lang));
            deleteMessage($chatId, $messageId);
            runMain($chatId, $userId);
        } else {
            answerCallbackQuery($callbackId, "❌ Invalid language selection", true);
        }
    }
    else {
        switch ($data) {
            case 'verify_join':
                if (checkMembership($userId)) {
                    answerCallbackQuery($callbackId, "✅ Joined");
                    deleteMessage($chatId, $messageId);
                    $user = getUserRow($userId);
                    $lang = $user['language'] ?? null;
                    if ($lang) {
                        runMain($chatId, $userId);
                    } else {
                        showLanguageSelection($chatId);
                    }
                } else {
                    answerCallbackQuery($callbackId, "❌ Please join the channel first", true);
                }
                break;

            case 'change_lang':
                answerCallbackQuery($callbackId);
                deleteMessage($chatId, $messageId);
                showLanguageSelection($chatId);
                break;

            case 'instruction':
                answerCallbackQuery($callbackId);
                deleteMessage($chatId, $messageId);
                $user = getUserRow($userId);
                $lang = ($user && $user['language']) ? $user['language'] : 'en';
                $text = $instructions_translations[$lang] ?? $instructions_translations['en'];
                $keyboard = ['inline_keyboard' => [[['text' => "🔙 Back", 'callback_data' => "main"]]]];
                // Send instruction video (FR or other languages)
                $videoPath = ($lang === 'fr') ? __DIR__ . '/video/fr_inscription.mp4' : __DIR__ . '/video/other_inscription.mp4';
                sendVideo($chatId, $videoPath, $text, $keyboard);
                break;

            case 'main':
                answerCallbackQuery($callbackId);
                deleteMessage($chatId, $messageId);
                runMain($chatId, $userId);
                break;

            case 'get_signal':
                answerCallbackQuery($callbackId);
                deleteMessage($chatId, $messageId);
                sendGetSignalButton($chatId, $userId);
                break;

            case 'registration':
                answerCallbackQuery($callbackId);
                deleteMessage($chatId, $messageId);
                handleRegistration($chatId, $userId);
                break;

            case 'account_status':
                answerCallbackQuery($callbackId);
                deleteMessage($chatId, $messageId);
                handleAccountStatus($chatId, $userId);
                break;

            default:
                answerCallbackQuery($callbackId, "❌ Unknown command", true);
                break;
        }
    }
}

// ========================
// COMMAND HANDLERS (OPTIMIZED - single DB query)
// ========================
function showLanguageSelection($chatId) {
    $keyboard = [
        'inline_keyboard' => [
            [['text' => "🇷🇺 Русский", 'callback_data' => "/lang ru"], ['text' => "🇬🇧 English", 'callback_data' => "/lang en"]],
            [['text' => "🇮🇳 हिंदी", 'callback_data' => "/lang hi"], ['text' => "🇧🇷 Brazilian", 'callback_data' => "/lang pt"]],
            [['text' => "🇪🇸 Español", 'callback_data' => "/lang es"], ['text' => "🇺🇿 O'zbek", 'callback_data' => "/lang uz"]],
            [['text' => "🇦🇿 Azərbaycan", 'callback_data' => "/lang az"], ['text' => "🇹🇷 Türkçe", 'callback_data' => "/lang tr"]],
            [['text' => "🇫🇷 Français", 'callback_data' => "/lang fr"], ['text' => "🇸🇦 العربية", 'callback_data' => "/lang ar"]],
            [['text' => "🔙 Back", 'callback_data' => "main"]]
        ]
    ];
    sendMessage($chatId, "🌐 Please select your language:", $keyboard);
}

function runMain($chatId, $userId) {
    global $main_menu_translations;

    // Single DB query instead of 3
    $user = getUserRow($userId);
    $lang = ($user && $user['language']) ? $user['language'] : 'en';
    $t = $main_menu_translations[$lang] ?? $main_menu_translations['en'];

    $isRegistered = ($user && $user['is_registered']) ? 'yes' : 'no';
    $isDeposit = ($user && $user['is_deposited']) ? 'yes' : 'no';

    $registrationButton = ['text' => $t['registration'], 'callback_data' => 'registration'];
    if ($isRegistered === 'yes' && $isDeposit === 'yes') {
        $registrationButton = ['text' => $t['account_status'], 'callback_data' => 'account_status'];
    }

    if ($isRegistered === 'yes' && $isDeposit === 'yes') {
        $getSignalButton = ['text' => $t['get_signal'], 'callback_data' => 'get_signal'];
    } else {
        $getSignalButton = ['text' => $t['get_signal'], 'callback_data' => 'registration'];
    }

    $keyboard = [
        'inline_keyboard' => [
            [$registrationButton, ['text' => $t['instruction'], 'callback_data' => 'instruction']],
            [['text' => $t['choose_lang'], 'callback_data' => 'change_lang']],
            [$getSignalButton]
        ]
    ];

    sendPhoto($chatId, new CURLFile(__DIR__ . '/menu.png', 'image/png'), $t['main_menu'], $keyboard);
}

function handleRegistration($chatId, $userId) {
    global $step1_texts, $step2_texts;

    // Single DB query instead of 2
    $user = getUserRow($userId);
    $lang = ($user && $user['language']) ? $user['language'] : 'en';
    $isRegistered = ($user && $user['is_registered']) ? 'yes' : 'no';
    $isDeposit = ($user && $user['is_deposited']) ? 'yes' : 'no';

    if ($isRegistered !== 'yes') {
        $keyboard = [
            'inline_keyboard' => [
                [['text' => "📱 🔶 Register", 'url' => "https://one-vv908.com/?open=register&p=583j&sub1=$userId"]],
                [['text' => "⬅️ Back to Main Menu", 'callback_data' => "main"]]
            ]
        ];
        $text = $step1_texts[$lang] ?? $step1_texts['en'];
        // Send instruction video (FR or other languages)
        $videoPath = ($lang === 'fr') ? __DIR__ . '/video/fr_inscription.mp4' : __DIR__ . '/video/other_inscription.mp4';
        sendVideo($chatId, $videoPath, $text, $keyboard, 'HTML');
    }
    elseif ($isDeposit !== 'yes') {
        $keyboard = [
            'inline_keyboard' => [
                [['text' => "💰 Deposit", 'url' => "https://one-vv908.com/?open=deposit&p=583j&sub1=$userId"]],
                [['text' => "⬅️ Back to Main Menu", 'callback_data' => "main"]]
            ]
        ];
        $text = $step2_texts[$lang] ?? $step2_texts['en'];
        // Send deposit video (FR or other languages)
        $videoPath = ($lang === 'fr') ? __DIR__ . '/video/fr_depot.mp4' : __DIR__ . '/video/other_depot.mp4';
        sendVideo($chatId, $videoPath, $text, $keyboard, 'HTML');
    }
    else {
        handleAccountStatus($chatId, $userId);
    }
}

function handleAccountStatus($chatId, $userId) {
    global $account_status_texts;

    $user = getUserRow($userId);
    $lang = ($user && $user['language']) ? $user['language'] : 'en';
    $text = $account_status_texts[$lang] ?? $account_status_texts['en'];

    $keyboard = [
        'inline_keyboard' => [
            [['text' => "⬅️ Back to Main Menu", 'callback_data' => "main"]]
        ]
    ];

    sendMessage($chatId, $text, $keyboard);
}

function sendGetSignalButton($chatId, $userId) {
    global $main_menu_translations;

    $user = getUserRow($userId);
    $lang = ($user && $user['language']) ? $user['language'] : 'en';
    $t = $main_menu_translations[$lang] ?? $main_menu_translations['en'];

    $keyboard = [
        'inline_keyboard' => [
            [['text' => "📡 " . $t['get_signal'], 'web_app' => ['url' => WEB_APP_URL]]],
            [['text' => "⬅ " . $t['back'], 'callback_data' => "main"]]
        ]
    ];

    sendPhoto($chatId, "https://t.me/photoszr/11", "✅ BOT ACTIVATED 🟩", $keyboard);
}
?>
