<?php
require_once 'config.php';

// Initialize SQLite database
@mkdir(__DIR__ . '/data', 0777, true);
$db = new SQLite3(DB_PATH);
$db->exec('CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    language TEXT DEFAULT "en",
    isregistered TEXT,
    country TEXT,
    isdeposit TEXT,
    deposit_amount TEXT,
    deposit_transactionid TEXT
)');

// Helper functions
function saveUserData($userId, $key, $value) {
    global $db;

    // Table ke actual columns allow karo
    $allowed = ['language', 'isregistered', 'isdeposit', 'country', 'deposit_amount', 'deposit_transactionid'];
    if (!in_array($key, $allowed)) {
        throw new Exception("Invalid column name: $key");
    }

    // Update karo
    $stmt = $db->prepare("UPDATE users SET $key = :value WHERE user_id = :user_id");
    $stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);
    $stmt->bindValue(':value', $value, SQLITE3_TEXT);
    $stmt->execute();

    // Agar update nahi hua (user exist nahi karta)
    if ($db->changes() === 0) {
        // Nayi row insert karo with defaults
        $stmt = $db->prepare("INSERT INTO users (user_id, $key) VALUES (:user_id, :value)");
        $stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);
        $stmt->bindValue(':value', $value, SQLITE3_TEXT);
        $stmt->execute();
    }
}

function getUserData($userId, $key) {
    global $db;
    $stmt = $db->prepare('SELECT ' . $key . ' FROM users WHERE user_id = :user_id');
    $stmt->bindValue(':user_id', $userId, SQLITE3_INTEGER);
    $result = $stmt->execute();
    $row = $result->fetchArray(SQLITE3_ASSOC);
    return $row ? $row[$key] : null;
}

function telegramRequest($method, $data) {
    $url = "https://api.telegram.org/bot" . TOKEN . "/$method";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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

// Language dictionaries
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
    "en" => "✅ Deposit received successfully!\n\n💰 Amount: {amount}\n🌍 Country: {country}\n🔖 Transaction ID: {transactionid}\n\nYou now have full access to the bot's features.",
    "hi" => "✅ जमा सफलतापूर्वक प्राप्त हुआ!\n\n💰 राशि: {amount}\n🌍 देश: {country}\n🔖 लेनदेन आईडी: {transactionid}\n\nअब आपके पास बॉट की सभी सुविधाओं तक पूर्ण पहुंच है।",
    "ru" => "✅ Депозит успешно получен!\n\n💰 Сумma: {amount}\n🌍 Страна: {country}\n🔖 ID транзакции: {transactionid}\n\nТеперь у вас есть полный доступ к функциям бота.",
    "pt" => "✅ Depósito recebido com sucesso!\n\n💰 Valor: {amount}\n🌍 País: {country}\n🔖 ID da transação: {transactionid}\n\nAgora você tem acesso total aos recursos do bot.",
    "es" => "✅ Depósito recibido con éxito!\n\n💰 Monto: {amount}\n🌍 País: {country}\n🔖 ID de transacción: {transactionid}\n\nAhora tienes acceso completo a las funciones del bot.",
    "uz" => "✅ Depozit muvaffaqiyatli qabul qilindi!\n\n💰 Miqdor: {amount}\n🌍 Mamlakat: {country}\n🔖 Tranzaksiya ID: {transactionid}\n\nEndi siz botning barcha imkoniyatlaridan to'liq foydalanasiz.",
    "az" => "✅ Depozit uğurla qəbul edildi!\n\n💰 Məbləğ: {amount}\n🌍 Ölkə: {country}\n🔖 Əməliyyat ID: {transactionid}\n\nİndi botun bütün funksiyalarına tam girişiniz var.",
    "tr" => "✅ Para yatırma işlemi başarıyla alındı!\n\n💰 Miktar: {amount}\n🌍 Ülke: {country}\n🔖 İşlem Kimliği: {transactionid}\n\nArtık botun tüm özelliklerine tam erişiminiz var.",
    "ar" => "✅ تم استلام الإيداع بنجاح!\n\n💰 المبلغ: {amount}\n🌍 الدولة: {country}\n🔖 معرف المعاملة: {transactionid}\n\nلديك الآن وصول كامل إلى ميزات البوت.",
    "fr" => "✅ Dépôt reçu avec succès !\n\n💰 Montant : {amount}\n🌍 Pays : {country}\n🔖 ID de transaction : {transactionid}\n\nVous avez maintenant un accès complet aux fonctionnalités du bot."
];

$account_status_texts = [
    "en" => "✅ Account Status: Registered & Deposit Completed\n\n● Registration: Completed\n● Deposit: Completed\n● Country: {country}\n\nYou have full access to all features.",
    "hi" => "✅ खाता स्थिति: पंजीकृत और जमा पूर्ण\n\n● पंजीकरण: पूर्ण\n● जमा: पूर्ण\n● देश: {country}\n\nआपके पास सभी सुविधाओं तक पूर्ण पहुंच है।",
    "ru" => "✅ Статус аккаунта: Регистрация и депозит завершены\n\n● Регистрация: Завершена\n● Депозит: Завершен\n● Страна: {country}\n\nУ вас есть полный доступ ко всем функциям.",
    "pt" => "✅ Status da conta: Registro e depósito concluídos\n\n● Registro: Concluído\n● Depósito: Concluído\n● País: {country}\n\nVocê tem acesso total a todos os recursos.",
    "es" => "✅ Estado de la cuenta: Registro y depósito completados\n\n● Registro: Completado\n● Depósito: Completado\n● País: {country}\n\nTienes acceso completo a todas las funciones.",
    "uz" => "✅ Hisob holati: Ro'yxatdan o'tilgan va depozit yakunlangan\n\n● Ro'yxatdan o'tish: Yakunlangan\n● Depozit: Yakunlangan\n● Mamlakat: {country}\n\nSiz barcha funksiyalardan to'liq foydalanasiz.",
    "az" => "✅ Hesab statusu: Qeydiyyat və depozit tamamlandı\n\n● Qeydiyyat: Tamamlandı\n● Depozit: Tamamlandı\n● Ölkə: {country}\n\nBütün funksiyalara tam girişiniz var.",
    "tr" => "✅ Hesap durumu: Kayıt ve para yatırma tamamlandı\n\n● Kayıt: Tamamlandı\n● Para yatırma: Tamamlandı\n● Ülke: {country}\n\nTüm özelliklere tam erişiminiz var.",
    "ar" => "✅ حالة الحساب: التسجيل والإيداع مكتمل\n\n● التسجيل: مكتمل\n● الإيداع: مكتمل\n● الدولة: {country}\n\nلديك وصول كامل إلى جميع الميزات.",
    "fr" => "✅ État du compte : Inscription et dépôt terminés\n\n● Inscription : Terminée\n● Dépôt : Terminé\n● Pays : {country}\n\nVous avez un accès complet à toutes les fonctionnalités."
];

$instructions_translations = [
    "en" => "🤖 The bot is based on and trained with OpenAI's neural network cluster!\n⚜️ To train the bot, 🎰 30,000 games were played.\n\nCurrently, bot users successfully generate 15 to 25% of their 💰 capital each day!\n\nThe bot is still undergoing verification and adjustments! The bot's accuracy is 95%!\nTo achieve maximum profit, follow these instructions:\n\n🟢 1. Sign up on the 1WIN betting site.\n[If it doesn't open, use a VPN (Sweden). Examples: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Without registration and without the promo code (ROVAS), access to signals will not be granted ⚠️\n\n🟢 2. Top up your account balance.\n🟢 3. Go to the 1WIN games section and select the game.\n🟢 4. Request a signal from the bot and place your bets accordingly.\n🟢 5. If you lose, double your bet (x²) to recover your losses.",
    
    "hi" => "🤖 बॉट OpenAI न्यूरल नेटवर्क क्लस्टर पर आधारित और प्रशिक्षित है!\n⚜️ बॉट को प्रशिक्षित करने के लिए 🎰 30,000 गेम खेले गए।\n\nवर्तमान में, बॉट उपयोगकर्ता अपनी 💰 पूंजी से प्रतिदिन 15-25% सफलतापूर्वक उत्पन्न कर रहे हैं!\n\nबॉट अभी भी जांच और सुधार के दौर से गुजर रहा है! बॉट की सटीकता 95% है!\nअधिकतम लाभ प्राप्त करने के लिए, इस निर्देश का पालन करें:\n\n🟢 1. 1WIN बेटिंग साइट पर साइन अप करें।\n[यदि नहीं खुल रहा है, तो VPN (स्वीडन) का उपयोग करें। उदाहरण: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ पंजीकरण और प्रोमो कोड (ROVAS) के बिना, सिग्नल तक पहुंच नहीं मिलेगी ⚠️\n\n🟢 2. अपने खाते की शेष राशि को टॉप अप करें।\n🟢 3. 1WIN गेम्स सेक्शन पर जाएं और गेम चुनें।\n🟢 4. बॉट से सिग्नल का अनुरोध करें और उसके अनुसार दांव लगाएं।\n🟢 5. यदि आप हारते हैं, तो अपने दांव को दोगुना (x²) करें।",
    
    "ru" => "🤖 Бот основан и обучен на кластере нейронных сетей OpenAI!\n⚜️ Для обучения бота было сыграно 🎰 30 000 игр.\n\nВ настоящее время пользователи бота успешно генерируют 15-25% от своего 💰 капитала ежедневно!\n\nБот всё ещё проходит проверку и доработки! Точность бота 95%!\nЧтобы получить максимальную прибыль, следуйте этой инструкции:\n\n🟢 1. Зарегистрируйтесь на сайте ставок 1WIN.\n[Если не открывается, используйте VPN (Швеция). Примеры: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Без регистрации и без промокода (ROVAS) доступ к сигналам не будет предоставлен ⚠️\n\n🟢 2. Пополните баланс своего счета.\n🟢 3. Перейдите в раздел игр 1WIN и выберите игру.\n🟢 4. Запросите сигнал у бота и ставьте соответственно.\n🟢 5. В случае проигрыша удвойте ставку (x²), чтобы возместить потери.",
    
    "pt" => "🤖 O bot é baseado e treinado no cluster de rede neural da OpenAI!\n⚜️ Para treinar o bot, 🎰 foram jogados 30.000 jogos.\n\nAtualmente, os usuários do bot geram com sucesso 15-25% do seu 💰 capital diariamente!\n\nO bot ainda está em verificação e ajustes! A precisão do bot é de 95%!\nPara obter lucro máximo, siga estas instruções:\n\n🟢 1. Cadastre-se no site de apostas 1WIN.\n[Se não abrir, use VPN (Suécia). Exemplos: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Sem registro e sem o código promocional (ROVAS), o acesso aos sinais não será concedido ⚠️\n\n🟢 2. Recarregue o saldo da sua conta.\n🟢 3. Vá para a seção de jogos 1WIN e escolha o jogo.\n🟢 4. Solicite um sinal ao bot e aposte de acordo.\n🟢 5. Se perder, dobre sua aposta (x²) para recuperar as perdas.",
    
    "es" => "🤖 ¡El bot está basado y entrenado en el clúster de redes neuronales de OpenAI!\n⚜️ Para entrenar al bot, 🎰 se jugaron 30,000 partidas.\n\nActualmente, los usuarios del bot generan con éxito un 15-25% de su 💰 capital diariamente!\n\n¡El bot aún está en revisión y ajustes! La precisión del bot es del 95%!\nPara obtener el máximo beneficio, siga estas instrucciones:\n\n🟢 1. Regístrese en el sitio de apuestas 1WIN.\n[Si no se abre, use VPN (Suecia). Ejemplos: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Sin registro y sin el código promocional (ROVAS), no se otorgará acceso a las señales ⚠️\n\n🟢 2. Recargue el saldo de su cuenta.\n🟢 3. Vaya a la sección de juegos 1WIN y elija el juego.\n🟢 4. Solicite una señal al bot y apueste en consecuencia.\n🟢 5. Si pierde, duplique su apuesta (x²) para recuperar pérdidas.",
    
    "uz" => "🤖 Bot OpenAI neyron tarmoq klasterida asoslangan va o'qitilgan!\n⚜️ Botni o'qitish uchun 🎰 30 000 o'yin o'ynaldi.\n\nHozirda bot foydalanuvchilari kuniga o'z 💰 kapitalidan 15-25% daromad olishmoqda!\n\nBot hali tekshirilmoqda va tuzatishlar kiritilmoqda! Botning aniqligi 95%!\nMaksimal foyda olish uchun ushbu ko'rsatmalarga amal qiling:\n\n🟢 1. 1WIN bukmekerlik saytida ro'yxatdan o'ting.\n[Agar ochilmasa, VPN (Shvetsiya) ishlating. Misollar: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Ro'yxatdan o'tmasdan va promo kodsiz (ROVAS) signalga kirish berilmaydi ⚠️\n\n🟢 2. Hisobingiz balansini to'ldiring.\n🟢 3. 1WIN o'yinlar bo'limiga o'ting va o'yinni tanlang.\n🟢 4. Botdan signal so'rang va shunga mos ravishda pul tiking.\n🟢 5. Agar yutsangiz, yo'qotishlarni qoplash uchun tikishingizni ikki baravar oshiring (x²).",
    
    "az" => "🤖 Bot OpenAI neyron şəbəkə klasterində əsaslanıb və öyrədilib!\n⚜️ Botu öyrətmək üçün 🎰 30,000 oyun oynanıldı.\n\nHazırda bot istifadəçiləri gündəlik öz 💰 kapitalından 15-25% gəlir əldə edirlər!\n\nBot hələ yoxlanış və düzəliş mərhələsindədir! Botun dəqiqliyi 95%-dir!\nMaksimum qazanc əldə etmək üçün bu təlimatı izləyin:\n\n🟢 1. 1WIN bahis saytında qeydiyyatdan keçin.\n[Açılmırsa, VPN (İsveç) istifadə edin. Nümunələr: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Qeydiyyat və promo kod (ROVAS) olmadan siqnallara giriş verilmir ⚠️\n\n🟢 2. Hesab balansınızı artırın.\n🟢 3. 1WIN oyun bölməsinə keçin və oyunu seçin.\n🟢 4. Botdan siqnal istəyin və uyğun olaraq mərc edin.\n🟢 5. Əgər uduzsanız, itkiləri bərpa etmək üçün mərci ikiqat artırın (x²).",
    
    "tr" => "🤖 Bot OpenAI sinir ağı kümesinde eğitildi!\n⚜️ Botu eğitmek için 🎰 30.000 oyun oynandı.\n\nŞu anda bot kullanıcıları, günlük olarak 💰 sermayelerinden %15-25 kazanç elde ediyor!\n\nBot hâlâ test ve düzeltme aşamasındadır! Botun doğruluğu %95!\nMaksimum kar elde etmek için bu talimatları izleyin:\n\n🟢 1. 1WIN bahis sitesine kaydolun.\n[Açılmıyorsa, VPN (İsveç) kullanın. Örnekler: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ Kayıt ve promosyon kodu (ROVAS) olmadan sinyallere erişim verilmeyecektir ⚠️\n\n🟢 2. Hesap bakiyenizi artırın.\n🟢 3. 1WIN oyun bölümüne gidin ve oyunu seçin.\n🟢 4. Bottan sinyal isteyin ve ona göre bahis yapın.\n🟢 5. Kaybederseniz, kayıpları telafi etmek için bahsi iki katına çıkarın (x²).",
    
    "ar" => "🤖 يعتمد البوت على مجموعة الشبكات العصبية OpenAI وتم تدريبه عليها!\n⚜️ لتدريب البوت، تم لعب 🎰 30,000 لعبة.\n\nحاليًا، يولد مستخدمو البوت بنجاح 15-25% من رأس مالهم 💰 يوميًا!\n\nلا يزال البوت قيد الفحص والتعديلات! دقة البوت 95%!\nلتحقيق أقصى ربح، اتبع هذه التعليمات:\n\n🟢 1. سجّل في موقع المراهنات 1WIN.\n[إذا لم يفتح، استخدم VPN (السويد). أمثلة: Vpnify, Planet VPN, Hotspot VPN.]\n⚠️ بدون التسجيل وبدون رمز الترويج (ROVAS)، لن يتم منح الوصول إلى الإشارات ⚠️\n\n🟢 2. قم بزيادة رصيد حسابك.\n🟢 3. انتقل إلى قسم ألعاب 1WIN واختر اللعبة.\n🟢 4. اطلب إشارة من البوت واراهن وفقًا لذلك.\n🟢 5. إذا خسرت، ضاعف رهانك (x²) لاستعادة خسائرك.",
    
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

// Handle webhook events

// Handle webhook events
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
            // Check if user is already registered
            $isRegistered = getUserData($tgid, 'isregistered');
            if ($isRegistered === 'yes') {
                http_response_code(200);
                exit('User already registered');
            }
            
            $country = $input['country'] ?? '';
            
            // Validate registration data
            if (empty($country)) {
                http_response_code(400);
                exit('Country is required for registration');
            }
            
            saveUserData($tgid, 'isregistered', 'yes');
            saveUserData($tgid, 'country', $country);
            saveUserData($tgid, 'isdeposit', 'no');
            
            $lang = getUserData($tgid, 'language') ?: 'en';
            $message = $step2_texts[$lang] ?? $step2_texts['en'];
            
            $keyboard = [
                'inline_keyboard' => [
                    [['text' => "💰 Deposit", 'url' => "https://1wyvrz.life/?open=register&p=".P_PARAM."&sub1=$tgid"]],
                    [['text' => "⬅️ Back to Main Menu", 'callback_data' => "main"]]
                ]
            ];
            
            sendPhoto($tgid, "https://i.ibb.co/zWgnCxLB/IMG-20250812-102227-999.jpg", $message, $keyboard);
        } 
        elseif ($event === 'deposit') {
            // Check if user has already made a deposit
            $isDeposit = getUserData($tgid, 'isdeposit');
            if ($isDeposit === 'yes') {
                http_response_code(200);
                exit('User already made a deposit');
            }
            
            // Check if user is registered first
            $isRegistered = getUserData($tgid, 'isregistered');
            if ($isRegistered !== 'yes') {
                http_response_code(400);
                exit('User must register before making a deposit');
            }
            
            $amount = $input['amount'] ?? '0';
            $country = $input['country'] ?? '';
            $transactionid = $input['transactionid'] ?? '';
            
            // Validate deposit data
            $errors = [];
            
            if (empty($amount) || floatval($amount) <= 0) {
                $errors[] = "Deposit amount must be greater than zero";
            }
            
            if (empty($country)) {
                $errors[] = "Country is required";
            }
            
            if (empty($transactionid)) {
                $errors[] = "Transaction ID is required";
            }
            
            // If there are validation errors, return them
            if (!empty($errors)) {
                http_response_code(400);
                exit('Validation failed: ' . implode(', ', $errors));
            }
            
            // All validation passed, process the deposit
            saveUserData($tgid, 'isdeposit', 'yes');
            saveUserData($tgid, 'deposit_amount', $amount);
            saveUserData($tgid, 'deposit_transactionid', $transactionid);
            
            // ... [previous code in deposit event]

$lang = getUserData($tgid, 'language') ?: 'en';
$message = $deposit_success_texts[$lang] ?? $deposit_success_texts['en'];
$message = str_replace(['{amount}', '{country}', '{transactionid}'], [$amount, $country, $transactionid], $message);
$t = $main_menu_translations[$lang] ?? $main_menu_translations['en'];

$keyboard = [
    'inline_keyboard' => [
        [
            [
                'text' => "📡 " . $t['get_signal'],
                'web_app' => [
                    'url' => WEB_APP_URL
                ]
            ]
        ],
        [
            [
                'text' => "⬅ " . $t['back'],
                'callback_data' => "main"
            ]
        ]
    ]
];

// FIX: Replace $chatId with $tgid
sendPhoto(
    $tgid,  // Changed from $chatId to $tgid
    "https://t.me/photoszr/11",
    "✅ BOT ACTIVATED 🟩",
    $keyboard
);
        }
        
        http_response_code(200);
        exit('OK');
    } else {
        http_response_code(400);
        exit('Missing event or tgid');
    }
}

// ... [rest of the code remains the same]

// Handle Telegram updates
$update = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    // Not a valid Telegram update
    exit;
}

if (isset($update['message'])) {
    $message = $update['message'];
    $chatId = $message['chat']['id'];
    $userId = $message['from']['id'];
    $text = $message['text'] ?? '';
    
    if (strpos($text, '/start') === 0) {
        if (checkMembership($userId)) {
            $lang = getUserData($userId, 'language');
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
    elseif ($text === '/gwt') {
        $webhookUrl = BASE_URL . '?action=webhook';
        sendMessage($chatId, "Webhook URL:\n$webhookUrl", null, 'HTML');
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
                    $lang = getUserData($userId, 'language');
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
                $lang = getUserData($userId, 'language') ?: 'en';
                $text = $instructions_translations[$lang] ?? $instructions_translations['en'];
                $keyboard = ['inline_keyboard' => [[['text' => "🔙 Back", 'callback_data' => "main"]]]];
                sendMessage($chatId, $text, $keyboard);
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

// Command handlers
function showLanguageSelection($chatId) {
    global $main_menu_translations;
    
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
    
    $lang = getUserData($userId, 'language') ?: 'en';
    $t = $main_menu_translations[$lang] ?? $main_menu_translations['en'];
    
    $isRegistered = getUserData($userId, 'isregistered');
    $isDeposit = getUserData($userId, 'isdeposit');
    
    // Registration button
    $registrationButton = ['text' => $t['registration'], 'callback_data' => 'registration'];
    if ($isRegistered === 'yes' && $isDeposit === 'yes') {
        $registrationButton = ['text' => $t['account_status'], 'callback_data' => 'account_status'];
    }
    
    // Get signal button logic
    if ($isRegistered === 'yes' && $isDeposit === 'yes') {
        $getSignalButton = ['text' => $t['get_signal'], 'callback_data' => 'get_signal'];
    } else {
        $getSignalButton = ['text' => $t['get_signal'], 'callback_data' => 'registration'];
    }
    
    // Build keyboard
    $keyboard = [
        'inline_keyboard' => [
            [
                $registrationButton,
                ['text' => $t['instruction'], 'callback_data' => 'instruction']
            ],
            [
                ['text' => $t['choose_lang'], 'callback_data' => 'change_lang']
            ],
            [
                $getSignalButton
            ]
        ]
    ];
    
    // Send menu photo
    sendPhoto(
        $chatId,
        "https://i.ibb.co/qLjsWV2W/IMG-20250812-091057-129.jpg",
        $t['main_menu'],
        $keyboard
    );
}

function handleRegistration($chatId, $userId) {
    global $step1_texts, $step2_texts;
    
    $lang = getUserData($userId, 'language') ?: 'en';
    $isRegistered = getUserData($userId, 'isregistered');
    $isDeposit = getUserData($userId, 'isdeposit');
    
    if ($isRegistered !== 'yes') {
        $keyboard = [
            'inline_keyboard' => [
                [
                    [
                        'text' => "📱 🔶 Register",
                        'url'  => "https://1wyvrz.life/?open=register&p=" . P_PARAM . "&sub1=$userId"
                    ]
                ],
                [
                    [
                        'text' => "⬅️ Back to Main Menu",
                        'callback_data' => "main"
                    ]
                ]
            ]
        ];
        
        $text = $step1_texts[$lang] ?? $step1_texts['en'];
        
        sendPhoto(
            $chatId,
            "https://t.me/photoszr/10",
            $text,
            $keyboard,
            'HTML'
        );
    } 
    elseif ($isDeposit !== 'yes') {
        $keyboard = [
            'inline_keyboard' => [
                [
                    [
                        'text' => "💰 Deposit",
                        'url'  => "https://1wtsaw.life/casino/list?open=deposit&p=" . P_PARAM . "&sub1=$userId"
                    ]
                ],
                [
                    [
                        'text' => "⬅️ Back to Main Menu",
                        'callback_data' => "main"
                    ]
                ]
            ]
        ];
        
        $text = $step2_texts[$lang] ?? $step2_texts['en'];
        
        sendPhoto(
            $chatId,
            "https://i.ibb.co/zWgnCxLB/IMG-20250812-102227-999.jpg",
            $text,
            $keyboard,
            'HTML'
        );
    } 
    else {
        handleAccountStatus($chatId, $userId);
    }
}

function handleAccountStatus($chatId, $userId) {
    global $account_status_texts;
    
    $lang = getUserData($userId, 'language') ?: 'en';
    $country = getUserData($userId, 'country') ?: 'Not set';
    
    $text = $account_status_texts[$lang] ?? $account_status_texts['en'];
    $text = str_replace('{country}', $country, $text);
    
    $keyboard = [
        'inline_keyboard' => [
            [['text' => "⬅️ Back to Main Menu", 'callback_data' => "main"]]
        ]
    ];
    
    sendMessage($chatId, $text, $keyboard);
}

function sendGetSignalButton($chatId, $userId) {
    global $main_menu_translations;
    
    $lang = getUserData($userId, 'language') ?: 'en';
    $t = $main_menu_translations[$lang] ?? $main_menu_translations['en'];
    
    $keyboard = [
        'inline_keyboard' => [
            [
                [
                    'text' => "📡 " . $t['get_signal'],
                    'web_app' => [
                        'url' => WEB_APP_URL
                    ]
                ]
            ],
            [
                [
                    'text' => "⬅ " . $t['back'],
                    'callback_data' => "main"
                ]
            ]
        ]
    ];

    sendPhoto(
        $chatId,
        "https://t.me/photoszr/11",
        "✅ BOT ACTIVATED 🟩",
        $keyboard
    );
}
?>
