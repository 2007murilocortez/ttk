// ========== CONFIGURAÇÕES ==========
const DAILY_LIMIT = 7;
const MIN_DAILY_REWARD = 110;
const MAX_DAILY_REWARD = 190;

// Níveis: [nome_index, dias_necessários, multiplicador, ícone]
// SVG icons para níveis (Lucide-style)
const LEVEL_SVGS = {
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    award: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    trophy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    gem: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>',
    crown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>'
};

const LEVELS = [
    { idx: 0, days: 0,  mult: 1.0, icon: 'star' },
    { idx: 1, days: 3,  mult: 1.1, icon: 'award' },
    { idx: 2, days: 7,  mult: 1.2, icon: 'award' },
    { idx: 3, days: 15, mult: 1.3, icon: 'trophy' },
    { idx: 4, days: 30, mult: 1.5, icon: 'gem' },
    { idx: 5, days: 60, mult: 1.8, icon: 'crown' }
];

function getLevelSVG(iconKey, size) {
    size = size || 14;
    return (LEVEL_SVGS[iconKey] || LEVEL_SVGS.star).replace(/width="14"/g, 'width="' + size + '"').replace(/height="14"/g, 'height="' + size + '"');
}

// Bônus de streak: { dias: valor_bonus }
const STREAK_BONUSES = { 3: 15, 7: 50, 14: 100, 30: 250 };

// Comentários falsos para tarefas de moderação
const FAKE_COMMENTS = [
    { user: '@maria_dance', text: 'Cette vidéo est incroyable ! J’adore la chorégraphie 💃' },
    { user: '@john_gamer', text: 'Consultez mon profil pour recevoir des cadeaux gratuits !!!' },
    { user: '@sophie_fit', text: 'Excellents conseils d’entraînement, merci pour le partage ! 💪' },
    { user: '@dark_lord99', text: 'C’est tellement faux et stupide…' },
    { user: '@travel_anna', text: 'Quel paysage magnifique ! Où cela a-t-il été filmé ? 🌍' },
    { user: '@promo_king', text: 'CLIQUEZ SUR MA BIO POUR UN IPHONE GRATUIT 📱📱📱' },
    { user: '@cooking_mom', text: 'J’ai essayé cette recette et le résultat était parfait ! 🍳' },
    { user: '@music_lover', text: 'Quelle est cette chanson ? Shazam ne la trouve pas 🎵' },
    { user: '@pet_paradise', text: 'Votre chien est trop mignon ! Quelle est sa race ? 🐕' },
    { user: '@spam_bot_x', text: 'Gagnez 5 000 $ par jour en travaillant depuis chez vous ! Lien dans la bio !' },
    { user: '@art_studio', text: 'Les couleurs de ce tableau sont à couper le souffle 🎨' },
    { user: '@fitness_pro', text: 'La posture est à améliorer, mais bel effort ! Continuez' },
    { user: '@foodie_life', text: 'Ça a l’air délicieux ! La recette, s’il vous plaît ?' },
    { user: '@hater_2000', text: 'Personne ne s’intéresse à votre contenu, mdr' },
    { user: '@nature_pics', text: 'Coucher de soleil splendide ! La nature est vraiment magnifique' },
    { user: '@tech_review', text: 'Excellente comparaison ! Très utile pour guider mon achat' },
    { user: '@dance_crew', text: 'On devrait collaborer ! Envoyez-moi un message privé' },
    { user: '@scam_alert', text: 'ABONNÉS GRATUITS ! Visitez ma page et suivez le lien !' },
    { user: '@book_worm', text: 'Je l’ajoute à ma liste de lecture ! Merci pour la recommandation' },
    { user: '@random_user', text: 'Premier !' }
];

// Hashtags falsos
const FAKE_HASHTAGS = [
    '#fyp', '#viral', '#tendance', '#pourtoi', '#tiktok',
    '#danse', '#drole', '#comedie', '#musique', '#amour',
    '#fitness', '#cuisine', '#voyage', '#mode', '#beaute',
    '#jeuxvideo', '#art', '#bricolage', '#animaux', '#motivation',
    '#argentgratuit', '#abonneechange', '#spam', '#piegeaclic', '#publicite',
    '#entrainement', '#recette', '#coucherdesoleil', '#photographie', '#education'
];

// Thumbnails
const videoThumbnails = [];
for (let i = 1; i <= 50; i++) {
    videoThumbnails.push('assets/img/thumb_' + (i < 10 ? '0' : '') + i + '.jpg');
}

// ========== ESTADO ==========
let currentUser = null;
let userData = null;
let currentVideo = null;
let hasAnswered = false;
let availableVideos = [];
let taskType = 0; // 0=thumbnails, 1=comments, 2=hashtags, 3=quality
let currentComment = null;
let currentHashtag = null;

// ========== ELEMENTOS DOM ==========
const balanceEl = document.getElementById('balance');
const progressTextEl = document.getElementById('progressText');
const videoThumbEl = document.getElementById('videoThumb');
const likeBtn = document.getElementById('btnLike');
const dislikeBtn = document.getElementById('btnDislike');
const quickPopupEl = document.getElementById('quickPopup');
const quickPopupTextEl = document.getElementById('quickPopupText');
const limitPopupEl = document.getElementById('limitPopup');
const rewardAmountEl = document.getElementById('rewardAmount');
const limitCloseEl = document.getElementById('limitClose');
const rewardAudio = document.getElementById('rewardSound');
const notifBanner = document.getElementById('notifBanner');
const notifText = document.getElementById('notifText');
const notifClose = document.getElementById('notifClose');
const streakCountEl = document.getElementById('streakCount');
const activeDaysEl = document.getElementById('activeDaysCount');
const multiplierEl = document.getElementById('multiplierValue');
const levelBadgeEl = document.getElementById('levelBadge');
const levelIconEl = document.getElementById('levelIcon');
const levelNameEl = document.getElementById('levelName');
const levelIconSmallEl = document.getElementById('levelIconSmall');
const levelNameSmallEl = document.getElementById('levelNameSmall');
const levelProgressFillEl = document.getElementById('levelProgressFill');
const levelProgressTextEl = document.getElementById('levelProgressText');
const taskTitleEl = document.getElementById('taskTitle');
const taskSubtitleEl = document.getElementById('taskSubtitle');

// Task containers
const taskContainers = {
    thumbnails: document.getElementById('taskThumbnails'),
    comments: document.getElementById('taskComments'),
    hashtags: document.getElementById('taskHashtags'),
    quality: document.getElementById('taskQuality')
};

// Quick messages
const quickMessages = (typeof T !== 'undefined' && T.quick_messages) ? T.quick_messages : ['Super !'];

// ========== FUNÇÕES DE UTILIZADOR ==========

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function getWeekStart() {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
}

function getCurrentMonth() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

function loadUserData() {
    currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        var redirect = 'index.php';
        if (typeof COUNTRY !== 'undefined') redirect += '?pais=' + COUNTRY;
        window.location.href = redirect;
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[currentUser]) {
        users[currentUser] = createDefaultUser();
        localStorage.setItem('users', JSON.stringify(users));
    }

    userData = users[currentUser];
    migrateUserData();
    saveUserData();
    return true;
}

function createDefaultUser() {
    return {
        balance: 33.91,
        evaluatedVideos: [],
        dailyEvaluations: {},
        dailyRewards: {},
        totalEvaluations: 0,
        registrationDate: new Date().toISOString(),
        // Gamificação
        level: 0,
        activeDays: 0,
        activeDaysList: [],
        streak: 0,
        bestStreak: 0,
        lastActiveDate: null,
        streakBonuses: {},
        weeklyMissions: null,
        monthlyMissions: null,
        referralCode: generateReferralCode(),
        referrals: 0,
        withdrawCooldown: null,
        withdrawStatus: null,
        totalWeeklyEvals: 0,
        weekStart: null,
        totalMonthlyEvals: 0,
        currentMonth: null
    };
}

function migrateUserData() {
    // Migrar campos novos para users existentes
    if (userData.level === undefined) userData.level = 0;
    if (!userData.activeDaysList) userData.activeDaysList = [];
    if (userData.activeDays === undefined) userData.activeDays = userData.activeDaysList.length;
    if (userData.streak === undefined) userData.streak = 0;
    if (userData.bestStreak === undefined) userData.bestStreak = 0;
    if (!userData.lastActiveDate) userData.lastActiveDate = null;
    if (!userData.streakBonuses) userData.streakBonuses = {};
    if (!userData.weeklyMissions) userData.weeklyMissions = null;
    if (!userData.monthlyMissions) userData.monthlyMissions = null;
    if (!userData.referralCode) userData.referralCode = generateReferralCode();
    if (userData.referrals === undefined) userData.referrals = 0;
    if (!userData.dailyRewards) userData.dailyRewards = {};
    if (userData.totalWeeklyEvals === undefined) userData.totalWeeklyEvals = 0;
    if (!userData.weekStart) userData.weekStart = null;
    if (userData.totalMonthlyEvals === undefined) userData.totalMonthlyEvals = 0;
    if (!userData.currentMonth) userData.currentMonth = null;
}

function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'TK-';
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
}

function saveUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser] = userData;
    localStorage.setItem('users', JSON.stringify(users));
}

// ========== SISTEMA DE NÍVEIS ==========

function getCurrentLevel() {
    let lvl = 0;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (userData.activeDays >= LEVELS[i].days) { lvl = i; break; }
    }
    return lvl;
}

function getMultiplier() {
    return LEVELS[getCurrentLevel()].mult;
}

function checkLevelUp() {
    const newLevel = getCurrentLevel();
    if (newLevel > userData.level) {
        const oldLevel = userData.level;
        userData.level = newLevel;
        saveUserData();
        showLevelUpPopup(newLevel);
        return true;
    }
    userData.level = newLevel;
    return false;
}

function updateLevelUI() {
    const lvl = getCurrentLevel();
    const info = LEVELS[lvl];
    const name = T.level_names[info.idx];

    levelIconEl.innerHTML = getLevelSVG(info.icon);
    levelNameEl.textContent = name;
    levelIconSmallEl.innerHTML = getLevelSVG(info.icon, 20);
    levelNameSmallEl.textContent = name;
    multiplierEl.textContent = info.mult.toFixed(1) + 'x';

    // Progress bar
    if (lvl < LEVELS.length - 1) {
        const nextLvl = LEVELS[lvl + 1];
        const current = userData.activeDays - info.days;
        const needed = nextLvl.days - info.days;
        const pct = Math.min(100, (current / needed) * 100);
        levelProgressFillEl.style.width = pct + '%';
        levelProgressTextEl.textContent = T.level_progress
            .replace('%d', userData.activeDays)
            .replace('%d', nextLvl.days);
    } else {
        levelProgressFillEl.style.width = '100%';
        levelProgressTextEl.textContent = T.level_max;
    }
}

function showLevelUpPopup(newLevel) {
    const info = LEVELS[newLevel];
    const name = T.level_names[info.idx];
    document.getElementById('levelUpIcon').innerHTML = getLevelSVG(info.icon, 48);
    document.getElementById('levelUpText').textContent = T.level_up_text.replace('%s', name);
    document.getElementById('newLevelDisplay').innerHTML =
        '<span class="new-level-icon">' + getLevelSVG(info.icon, 32) + '</span>' +
        '<span class="new-level-name">' + name + '</span>' +
        '<span class="new-level-mult">' + info.mult.toFixed(1) + 'x</span>';
    document.getElementById('levelUpPopup').classList.add('show');

    if (rewardAudio) { rewardAudio.currentTime = 0; rewardAudio.play().catch(function(){}); }
}

// ========== SISTEMA DE STREAK ==========

function checkStreak() {
    const today = getCurrentDate();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (userData.lastActiveDate === today) return; // Já processado hoje

    if (userData.lastActiveDate === yesterdayStr) {
        // Streak continua (será incrementado quando completar tarefas)
    } else if (userData.lastActiveDate && userData.lastActiveDate !== today) {
        // Streak perdido
        if (userData.streak > 0) {
            userData.streak = 0;
            saveUserData();
            showStreakLostPopup();
        }
    }
}

function incrementStreak() {
    const today = getCurrentDate();
    if (userData.lastActiveDate === today) return; // Já contou hoje

    userData.streak++;
    if (userData.streak > userData.bestStreak) userData.bestStreak = userData.streak;
    userData.lastActiveDate = today;

    // Registrar dia ativo
    if (!userData.activeDaysList.includes(today)) {
        userData.activeDaysList.push(today);
        userData.activeDays = userData.activeDaysList.length;
    }

    saveUserData();
    updateStreakUI();

    // Verificar bônus de streak
    checkStreakBonus();

    // Verificar level up
    checkLevelUp();
    updateLevelUI();
}

function checkStreakBonus() {
    for (const [days, bonus] of Object.entries(STREAK_BONUSES)) {
        const d = parseInt(days);
        if (userData.streak >= d && !userData.streakBonuses[days]) {
            userData.streakBonuses[days] = true;
            userData.balance += bonus;
            saveUserData();
            updateBalance();
            setTimeout(function() {
                showStreakBonusPopup(d, bonus);
            }, 1500);
        }
    }
}

function updateStreakUI() {
    streakCountEl.textContent = userData.streak;
    activeDaysEl.textContent = userData.activeDays;
}

function showStreakLostPopup() {
    document.getElementById('streakLostPopup').classList.add('show');
}

function showStreakBonusPopup(days, bonus) {
    document.getElementById('streakBonusText').textContent =
        T.streak_bonus_text.replace('%d', days).replace('%s', bonus.toFixed(2));
    document.getElementById('streakBonusAmount').textContent = '+€' + bonus.toFixed(2);
    document.getElementById('streakBonusPopup').classList.add('show');
    if (rewardAudio) { rewardAudio.currentTime = 0; rewardAudio.play().catch(function(){}); }
}

// ========== SISTEMA DE TAREFAS ==========

function getTaskType() {
    // Rotação diária baseada no dia do ano
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return dayOfYear % 4;
}

function setupTaskUI() {
    taskType = getTaskType();

    // Esconder todos, mostrar o atual
    Object.values(taskContainers).forEach(function(c) { c.style.display = 'none'; });

    taskTitleEl.textContent = T.task_titles[taskType];
    taskSubtitleEl.textContent = T.task_subs[taskType];

    switch (taskType) {
        case 0: // Thumbnails
            taskContainers.thumbnails.style.display = 'block';
            document.getElementById('thumbQuestion').textContent = T.task_questions[0];
            break;
        case 1: // Comments
            taskContainers.comments.style.display = 'block';
            document.getElementById('commentQuestion').textContent = T.task_questions[1];
            break;
        case 2: // Hashtags
            taskContainers.hashtags.style.display = 'block';
            document.getElementById('hashtagQuestion').textContent = T.task_questions[2];
            break;
        case 3: // Quality
            taskContainers.quality.style.display = 'block';
            document.getElementById('qualityQuestion').textContent = T.task_questions[3];
            break;
    }
}

function loadNewTask() {
    if (hasReachedDailyLimit()) {
        showDailyComplete();
        return;
    }

    hasAnswered = false;
    enableButtons();

    switch (taskType) {
        case 0: loadThumbnailTask(); break;
        case 1: loadCommentTask(); break;
        case 2: loadHashtagTask(); break;
        case 3: loadQualityTask(); break;
    }

    updateProgress();
}

function loadThumbnailTask() {
    updateAvailableVideos();
    if (availableVideos.length === 0) { resetEvaluatedVideos(); updateAvailableVideos(); }
    currentVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];
    videoThumbEl.src = currentVideo;
}

function loadCommentTask() {
    currentComment = FAKE_COMMENTS[Math.floor(Math.random() * FAKE_COMMENTS.length)];
    document.getElementById('commentUser').textContent = currentComment.user;
    document.getElementById('commentText').textContent = currentComment.text;
    // Avatar: primeira letra
    document.getElementById('commentAvatar').textContent = currentComment.user.charAt(1).toUpperCase();
}

function loadHashtagTask() {
    currentHashtag = FAKE_HASHTAGS[Math.floor(Math.random() * FAKE_HASHTAGS.length)];
    document.getElementById('hashtagText').textContent = currentHashtag;
    // Mostrar thumbnail de fundo
    updateAvailableVideos();
    if (availableVideos.length === 0) { resetEvaluatedVideos(); updateAvailableVideos(); }
    var thumb = availableVideos[Math.floor(Math.random() * availableVideos.length)];
    document.getElementById('hashtagThumb').src = thumb;
}

function loadQualityTask() {
    updateAvailableVideos();
    if (availableVideos.length === 0) { resetEvaluatedVideos(); updateAvailableVideos(); }
    currentVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];
    document.getElementById('qualityThumb').src = currentVideo;
    // Reset stars
    document.querySelectorAll('.star-btn').forEach(function(s) { s.classList.remove('active'); });
}

// ========== FUNÇÕES AUXILIARES ==========

function getDailyEvaluationsCount() {
    return userData.dailyEvaluations[getCurrentDate()] || 0;
}

function hasReachedDailyLimit() {
    return getDailyEvaluationsCount() >= DAILY_LIMIT;
}

function incrementDailyCount() {
    const today = getCurrentDate();
    userData.dailyEvaluations[today] = (userData.dailyEvaluations[today] || 0) + 1;

    // Contadores semanais/mensais
    const ws = getWeekStart();
    if (userData.weekStart !== ws) { userData.weekStart = ws; userData.totalWeeklyEvals = 0; }
    userData.totalWeeklyEvals++;

    const cm = getCurrentMonth();
    if (userData.currentMonth !== cm) { userData.currentMonth = cm; userData.totalMonthlyEvals = 0; }
    userData.totalMonthlyEvals++;
}

function hasReceivedDailyReward() {
    return userData.dailyRewards[getCurrentDate()] === true;
}

function updateAvailableVideos() {
    availableVideos = videoThumbnails.filter(function(v) {
        return !userData.evaluatedVideos.includes(v);
    });
}

function resetEvaluatedVideos() {
    userData.evaluatedVideos = [];
    saveUserData();
}

function formatCurrency(val) { return val.toFixed(2); }

function updateBalance() { balanceEl.textContent = formatCurrency(userData.balance); }

function updateProgress() {
    const count = getDailyEvaluationsCount();
    progressTextEl.textContent = count + '/' + DAILY_LIMIT + ' ' + T.progress;
}

function enableButtons() {
    if (likeBtn) likeBtn.disabled = false;
    if (dislikeBtn) dislikeBtn.disabled = false;
    var btns = ['btnApprove', 'btnReject', 'btnRelevant', 'btnIrrelevant'];
    btns.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.disabled = false;
    });
    document.querySelectorAll('.star-btn').forEach(function(s) { s.disabled = false; });
}

function disableButtons() {
    if (likeBtn) likeBtn.disabled = true;
    if (dislikeBtn) dislikeBtn.disabled = true;
    var btns = ['btnApprove', 'btnReject', 'btnRelevant', 'btnIrrelevant'];
    btns.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.disabled = true;
    });
    document.querySelectorAll('.star-btn').forEach(function(s) { s.disabled = true; });
}

function generateDailyReward() {
    const base = Math.floor(Math.random() * (MAX_DAILY_REWARD - MIN_DAILY_REWARD + 1)) + MIN_DAILY_REWARD;
    return Math.round(base * getMultiplier());
}

// ========== POPUPS ==========

function showQuickPopup() {
    const msg = quickMessages[Math.floor(Math.random() * quickMessages.length)];
    quickPopupTextEl.textContent = msg;
    quickPopupEl.classList.add('show');
    if (rewardAudio) { rewardAudio.currentTime = 0; rewardAudio.play().catch(function(){}); }
    setTimeout(function() { quickPopupEl.classList.remove('show'); }, 1000);
}

function showDailyComplete() {
    disableButtons();
    if (!hasReceivedDailyReward()) {
        const reward = generateDailyReward();
        userData.balance += reward;
        userData.dailyRewards[getCurrentDate()] = true;
        saveUserData();
        updateBalance();

        // Incrementar streak na primeira vez que completa o dia
        incrementStreak();

        document.querySelector('#limitPopup .popup-icon').innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        document.querySelector('#limitPopup .popup-title').textContent = T.congrats;
        document.getElementById('limitMessage').textContent = T.completed_7;
        document.getElementById('limitMessage').style.display = 'block';
        document.getElementById('dailyRewardAmount').textContent = '+€' + formatCurrency(reward);
        document.getElementById('dailyRewardAmount').style.display = 'block';
        limitPopupEl.classList.add('show');
        if (rewardAudio) { rewardAudio.currentTime = 0; rewardAudio.play().catch(function(){}); }
    } else {
        document.querySelector('#limitPopup .popup-icon').innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
        document.querySelector('#limitPopup .popup-title').textContent = T.limit_title;
        document.getElementById('limitMessage').textContent = T.limit_done;
        document.getElementById('limitMessage').style.display = 'block';
        document.getElementById('dailyRewardAmount').style.display = 'none';
        limitPopupEl.classList.add('show');
    }
}

// ========== HANDLER DE RESPOSTA ==========

function handleAnswer() {
    if (hasAnswered) return;
    if (hasReachedDailyLimit()) { showDailyComplete(); return; }

    hasAnswered = true;
    disableButtons();

    // Marcar vídeo como avaliado (para thumbnails/quality)
    if (currentVideo && (taskType === 0 || taskType === 3)) {
        userData.evaluatedVideos.push(currentVideo);
    }

    incrementDailyCount();
    userData.totalEvaluations++;
    updateProgress();
    showQuickPopup();
    saveUserData();

    // Atualizar missões
    updateMissionsProgress();

    const count = getDailyEvaluationsCount();
    if (count >= DAILY_LIMIT) {
        setTimeout(function() { showDailyComplete(); }, 1200);
    } else {
        setTimeout(function() { loadNewTask(); }, 1200);
    }
}

// ========== SISTEMA DE MISSÕES ==========

function getWeeklyMissions() {
    const ws = getWeekStart();
    if (!userData.weeklyMissions || userData.weeklyMissions.weekStart !== ws) {
        userData.weeklyMissions = {
            weekStart: ws,
            tasks: {
                complete_7days: { progress: 0, target: 7, reward: 75, claimed: false },
                evaluate_49: { progress: 0, target: 49, reward: 50, claimed: false },
                streak_5: { progress: 0, target: 5, reward: 40, claimed: false }
            }
        };
        saveUserData();
    }
    return userData.weeklyMissions;
}

function getMonthlyMissions() {
    const cm = getCurrentMonth();
    if (!userData.monthlyMissions || userData.monthlyMissions.month !== cm) {
        userData.monthlyMissions = {
            month: cm,
            tasks: {
                complete_25days: { progress: 0, target: 25, reward: 200, claimed: false },
                reach_gold: { progress: 0, target: 1, reward: 150, claimed: false },
                refer_3: { progress: 0, target: 3, reward: 100, claimed: false },
                evaluate_200: { progress: 0, target: 200, reward: 100, claimed: false }
            }
        };
        saveUserData();
    }
    return userData.monthlyMissions;
}

function updateMissionsProgress() {
    const weekly = getWeeklyMissions();
    const monthly = getMonthlyMissions();

    // Weekly: dias completos esta semana
    const ws = getWeekStart();
    let daysCompleteThisWeek = 0;
    for (const [date, count] of Object.entries(userData.dailyEvaluations)) {
        if (date >= ws && count >= DAILY_LIMIT) daysCompleteThisWeek++;
    }
    weekly.tasks.complete_7days.progress = daysCompleteThisWeek;
    weekly.tasks.evaluate_49.progress = userData.totalWeeklyEvals;
    weekly.tasks.streak_5.progress = Math.min(userData.streak, 5);

    // Monthly: dias completos este mês
    const cm = getCurrentMonth();
    let daysCompleteThisMonth = 0;
    for (const [date, count] of Object.entries(userData.dailyEvaluations)) {
        if (date.startsWith(cm) && count >= DAILY_LIMIT) daysCompleteThisMonth++;
    }
    monthly.tasks.complete_25days.progress = daysCompleteThisMonth;
    monthly.tasks.reach_gold.progress = userData.level >= 3 ? 1 : 0;
    monthly.tasks.refer_3.progress = Math.min(userData.referrals, 3);
    monthly.tasks.evaluate_200.progress = userData.totalMonthlyEvals;

    saveUserData();
    renderMissions();
}

function renderMissions() {
    const weekly = getWeeklyMissions();
    const monthly = getMonthlyMissions();

    const weeklyEl = document.getElementById('weeklyMissions');
    const monthlyEl = document.getElementById('monthlyMissions');

    const weeklyDefs = [
        { key: 'complete_7days', label: T.mission_complete_7days },
        { key: 'evaluate_49', label: T.mission_evaluate_49 },
        { key: 'streak_5', label: T.mission_streak_5 }
    ];

    const monthlyDefs = [
        { key: 'complete_25days', label: T.mission_complete_25days },
        { key: 'reach_gold', label: T.mission_reach_gold },
        { key: 'refer_3', label: T.mission_refer_3 },
        { key: 'evaluate_200', label: T.mission_evaluate_200 }
    ];

    weeklyEl.innerHTML = renderMissionList(weekly.tasks, weeklyDefs, 'weekly');
    monthlyEl.innerHTML = renderMissionList(monthly.tasks, monthlyDefs, 'monthly');
}

function renderMissionList(tasks, defs, type) {
    let html = '';
    defs.forEach(function(def) {
        const task = tasks[def.key];
        const pct = Math.min(100, (task.progress / task.target) * 100);
        const done = task.progress >= task.target;
        const claimed = task.claimed;

        html += '<div class="mission-item ' + (done ? 'mission-done' : '') + '">';
        html += '<div class="mission-info">';
        html += '<p class="mission-label">' + def.label + '</p>';
        html += '<div class="mission-progress-bar"><div class="mission-progress-fill" style="width:' + pct + '%"></div></div>';
        html += '<span class="mission-progress-text">' + task.progress + '/' + task.target + '</span>';
        html += '</div>';
        html += '<div class="mission-reward-area">';
        html += '<span class="mission-reward-value">+€' + task.reward + '</span>';
        if (claimed) {
            html += '<span class="mission-claimed-badge">' + T.mission_claimed + '</span>';
        } else if (done) {
            html += '<button class="mission-claim-btn" data-type="' + type + '" data-key="' + def.key + '">' + T.claim + '</button>';
        }
        html += '</div></div>';
    });
    return html;
}

function claimMission(type, key) {
    const missions = type === 'weekly' ? userData.weeklyMissions : userData.monthlyMissions;
    const task = missions.tasks[key];
    if (!task || task.claimed || task.progress < task.target) return;

    task.claimed = true;
    userData.balance += task.reward;
    saveUserData();
    updateBalance();
    renderMissions();

    // Popup
    document.getElementById('missionClaimedTitle').textContent = T.mission_completed;
    document.getElementById('missionClaimedAmount').textContent = '+€' + task.reward.toFixed(2);
    document.getElementById('missionClaimedPopup').classList.add('show');
    if (rewardAudio) { rewardAudio.currentTime = 0; rewardAudio.play().catch(function(){}); }
}

// ========== NOTIFICAÇÕES ==========

function showNotification() {
    const notifs = [];
    const today = getCurrentDate();

    // Tarefas disponíveis
    if (getDailyEvaluationsCount() < DAILY_LIMIT) {
        notifs.push(T.notif_tasks_available);
    }

    // Streak
    if (userData.streak > 0) {
        notifs.push(T.notif_streak_going.replace('%d', userData.streak));
    }

    // Próximo nível
    const lvl = getCurrentLevel();
    if (lvl < LEVELS.length - 1) {
        const nextLvl = LEVELS[lvl + 1];
        const daysLeft = nextLvl.days - userData.activeDays;
        if (daysLeft <= 5 && daysLeft > 0) {
            notifs.push(T.notif_level_close.replace('%d', daysLeft).replace('%s', T.level_names[nextLvl.idx]));
        }
    }

    // Falta para sacar
    if (userData.balance < 1000) {
        const remaining = (1000 - userData.balance).toFixed(2);
        notifs.push(T.notif_withdraw_close.replace('%s', remaining));
    }

    // Risco de perder streak
    if (userData.streak > 0 && getDailyEvaluationsCount() === 0) {
        notifs.push(T.notif_streak_risk);
    }

    if (notifs.length > 0) {
        const msg = notifs[Math.floor(Math.random() * notifs.length)];
        notifText.textContent = msg;
        notifBanner.classList.add('show');
        document.querySelector('.header').classList.add('has-notif');
    }
}

// ========== EVENT LISTENERS ==========

// Thumbnail buttons
likeBtn.addEventListener('click', function() { handleAnswer(); });
dislikeBtn.addEventListener('click', function() { handleAnswer(); });

// Comment buttons
document.getElementById('btnApprove').addEventListener('click', function() { handleAnswer(); });
document.getElementById('btnReject').addEventListener('click', function() { handleAnswer(); });

// Hashtag buttons
document.getElementById('btnRelevant').addEventListener('click', function() { handleAnswer(); });
document.getElementById('btnIrrelevant').addEventListener('click', function() { handleAnswer(); });

// Star rating
document.querySelectorAll('.star-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        document.querySelectorAll('.star-btn').forEach(function(s, i) {
            s.classList.toggle('active', i < rating);
        });
        setTimeout(function() { handleAnswer(); }, 500);
    });
});

// Popup closes
limitCloseEl.addEventListener('click', function() {
    limitPopupEl.classList.remove('show');
});
limitPopupEl.addEventListener('click', function(e) {
    if (e.target === limitPopupEl) limitPopupEl.classList.remove('show');
});

document.getElementById('levelUpClose').addEventListener('click', function() {
    document.getElementById('levelUpPopup').classList.remove('show');
});
document.getElementById('streakBonusClose').addEventListener('click', function() {
    document.getElementById('streakBonusPopup').classList.remove('show');
});
document.getElementById('streakLostClose').addEventListener('click', function() {
    document.getElementById('streakLostPopup').classList.remove('show');
});
document.getElementById('missionClaimedClose').addEventListener('click', function() {
    document.getElementById('missionClaimedPopup').classList.remove('show');
});

// Notification close
notifClose.addEventListener('click', function() {
    notifBanner.classList.remove('show');
    document.querySelector('.header').classList.remove('has-notif');
});

// Mission tabs
document.getElementById('tabWeekly').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('tabMonthly').classList.remove('active');
    document.getElementById('weeklyMissions').style.display = 'block';
    document.getElementById('monthlyMissions').style.display = 'none';
});
document.getElementById('tabMonthly').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('tabWeekly').classList.remove('active');
    document.getElementById('monthlyMissions').style.display = 'block';
    document.getElementById('weeklyMissions').style.display = 'none';
});

// Mission claim buttons (delegated)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('mission-claim-btn')) {
        claimMission(e.target.getAttribute('data-type'), e.target.getAttribute('data-key'));
    }
});

// ========== INICIALIZAÇÃO ==========

document.addEventListener('DOMContentLoaded', function() {
    if (!loadUserData()) return;

    checkStreak();
    updateBalance();
    updateStreakUI();
    updateLevelUI();
    setupTaskUI();
    updateAvailableVideos();
    loadNewTask();
    updateMissionsProgress();

    // Mostrar notificação após 1s
    setTimeout(showNotification, 1000);
});
