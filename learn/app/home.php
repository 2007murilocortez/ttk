<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Récompenses TikTok</title>
    <link rel="stylesheet" href="assets/css/home.css?v=2">
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "w40soemo0v");
</script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="header-logo">
                <div class="logo-icon-container">
                    <div class="logo-icon">
                        <svg class="logo-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z"></path>
                        </svg>
                    </div>
                    <div class="logo-pulse"></div>
                </div>
                <div class="logo-text">
                    <span class="logo-title">TikTok</span>
                    <span class="logo-subtitle">Récompenses</span>
                </div>
            </div>
            <div class="header-right">
                <div class="level-badge" id="levelBadge">
                    <span class="level-icon" id="levelIcon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </span>
                    <span class="level-name" id="levelName">Débutant</span>
                </div>
                <div class="header-balance">
                    <span class="balance-text">€ <span id="balance">0.00</span></span>
                </div>
            </div>
        </div>
    </header>

    <!-- Notification Banner -->
    <div class="notification-banner" id="notifBanner">
        <span class="notif-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </span>
        <span class="notif-text" id="notifText"></span>
        <button class="notif-close" id="notifClose">&times;</button>
    </div>

    <!-- Main Content -->
    <main class="main-content-home">
        <!-- Stats Bar -->
        <div class="stats-bar">
            <div class="stat-box">
                <span class="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </span>
                <span class="stat-value" id="streakCount">0</span>
                <span class="stat-label">Série</span>
            </div>
            <div class="stat-box">
                <span class="stat-icon" id="levelIconSmall">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </span>
                <span class="stat-value" id="levelNameSmall">Débutant</span>
                <span class="stat-label">Niveau</span>
            </div>
            <div class="stat-box">
                <span class="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <span class="stat-value" id="activeDaysCount">0</span>
                <span class="stat-label">Jours actifs</span>
            </div>
            <div class="stat-box">
                <span class="stat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </span>
                <span class="stat-value" id="multiplierValue">1.0x</span>
                <span class="stat-label">Multiplicateur</span>
            </div>
        </div>

        <!-- Level Progress -->
        <div class="level-progress-bar">
            <div class="level-progress-fill" id="levelProgressFill" style="width: 0%"></div>
        </div>
        <p class="level-progress-text" id="levelProgressText"></p>

        <!-- Task Card -->
        <div class="evaluation-card">
            <div class="card-header">
                <h2 class="card-title" id="taskTitle"></h2>
                <p class="card-subtitle" id="taskSubtitle"></p>
            </div>
            <div class="progress-text">
                <span id="progressText">0/7 terminées</span>
            </div>

            <!-- Thumbnail Task (type 0) -->
            <div class="task-container" id="taskThumbnails">
                <div class="video-thumbnail-container">
                    <img id="videoThumb" src="" alt="Vidéo" class="video-thumbnail">
                </div>
                <p class="task-question" id="thumbQuestion"></p>
                <div class="action-buttons">
                    <button class="btn-dislike" id="btnDislike">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                        Je n&#039;aime pas                    </button>
                    <button class="btn-like" id="btnLike">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                        J&#039;aime                    </button>
                </div>
            </div>

            <!-- Comment Task (type 1) -->
            <div class="task-container" id="taskComments" style="display:none;">
                <div class="comment-card" id="commentCard">
                    <div class="comment-avatar" id="commentAvatar"></div>
                    <div class="comment-body">
                        <span class="comment-user" id="commentUser"></span>
                        <p class="comment-text" id="commentText"></p>
                    </div>
                </div>
                <p class="task-question" id="commentQuestion"></p>
                <div class="action-buttons">
                    <button class="btn-dislike" id="btnReject">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        <span id="rejectLabel">Rejeter</span>
                    </button>
                    <button class="btn-like" id="btnApprove">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        <span id="approveLabel">Approuver</span>
                    </button>
                </div>
            </div>

            <!-- Hashtag Task (type 2) -->
            <div class="task-container" id="taskHashtags" style="display:none;">
                <div class="hashtag-card" id="hashtagCard">
                    <span class="hashtag-icon">#</span>
                    <span class="hashtag-text" id="hashtagText"></span>
                </div>
                <div class="hashtag-video-preview">
                    <img id="hashtagThumb" src="" alt="Vidéo" class="video-thumbnail-small">
                </div>
                <p class="task-question" id="hashtagQuestion"></p>
                <div class="action-buttons">
                    <button class="btn-dislike" id="btnIrrelevant">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        <span id="irrelevantLabel">Non pertinent</span>
                    </button>
                    <button class="btn-like" id="btnRelevant">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        <span id="relevantLabel">Pertinent</span>
                    </button>
                </div>
            </div>

            <!-- Quality Task (type 3) -->
            <div class="task-container" id="taskQuality" style="display:none;">
                <div class="video-thumbnail-container">
                    <img id="qualityThumb" src="" alt="Vidéo" class="video-thumbnail">
                </div>
                <p class="task-question" id="qualityQuestion"></p>
                <div class="star-rating" id="starRating">
                    <button class="star-btn" data-rating="1">&#9733;</button>
                    <button class="star-btn" data-rating="2">&#9733;</button>
                    <button class="star-btn" data-rating="3">&#9733;</button>
                    <button class="star-btn" data-rating="4">&#9733;</button>
                    <button class="star-btn" data-rating="5">&#9733;</button>
                </div>
            </div>
        </div>

        <!-- Missions Section -->
        <div class="missions-section">
            <h3 class="section-title">Missions</h3>
            <div class="missions-tabs">
                <button class="mission-tab active" id="tabWeekly">Hebdomadaires</button>
                <button class="mission-tab" id="tabMonthly">Mensuelles</button>
            </div>
            <div class="missions-list" id="weeklyMissions"></div>
            <div class="missions-list" id="monthlyMissions" style="display:none;"></div>
        </div>
    </main>

    <!-- Reward Popup -->
    <div class="reward-popup" id="rewardPopup">
        <div class="reward-content">
            <div class="reward-amount" id="rewardAmount">+€0.00</div>
        </div>
    </div>

    <!-- Quick Popup -->
    <div class="quick-popup" id="quickPopup">
        <span id="quickPopupText"></span>
    </div>

    <!-- Daily Limit Popup -->
    <div class="popup-overlay" id="limitPopup">
        <div class="popup">
            <div class="popup-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h2 class="popup-title">Limite quotidienne atteinte ! Revenez demain.</h2>
            <div class="popup-message" id="limitMessage"></div>
            <div class="reward-amount" id="dailyRewardAmount" style="display:none;"></div>
            <button class="popup-close" id="limitClose">OK</button>
        </div>
    </div>

    <!-- Level Up Popup -->
    <div class="popup-overlay" id="levelUpPopup">
        <div class="popup level-up-popup">
            <div class="popup-icon level-up-icon" id="levelUpIcon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6-6 6 6"/><path d="M6 15l6 6 6-6"/></svg>
            </div>
            <h2 class="popup-title">Niveau Supérieur !</h2>
            <p class="popup-message show" id="levelUpText"></p>
            <div class="new-level-display" id="newLevelDisplay"></div>
            <button class="popup-close" id="levelUpClose">OK</button>
        </div>
    </div>

    <!-- Streak Bonus Popup -->
    <div class="popup-overlay" id="streakBonusPopup">
        <div class="popup streak-bonus-popup">
            <div class="popup-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <h2 class="popup-title">Bonus de Série !</h2>
            <p class="popup-message show" id="streakBonusText"></p>
            <div class="streak-bonus-amount" id="streakBonusAmount"></div>
            <button class="popup-close" id="streakBonusClose">OK</button>
        </div>
    </div>

    <!-- Streak Lost Popup -->
    <div class="popup-overlay" id="streakLostPopup">
        <div class="popup">
            <div class="popup-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <h2 class="popup-title">Série Perdue</h2>
            <p class="popup-message show">Vous avez manqué un jour. Votre série a été réinitialisée.</p>
            <button class="popup-close" id="streakLostClose">OK</button>
        </div>
    </div>

    <!-- Mission Claimed Popup -->
    <div class="popup-overlay" id="missionClaimedPopup">
        <div class="popup">
            <div class="popup-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            </div>
            <h2 class="popup-title" id="missionClaimedTitle"></h2>
            <div class="mission-claimed-amount" id="missionClaimedAmount"></div>
            <button class="popup-close" id="missionClaimedClose">OK</button>
        </div>
    </div>

    <audio id="rewardSound" src="assets/audio/reward.mp3" preload="auto"></audio>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <a href="faq.php?pais=FR" class="nav-item" id="navFaq">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>FAQ</span>
        </a>
        <a href="home.php?pais=FR" class="nav-item active" id="navHome">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Accueil</span>
        </a>
        <a href="referral.php?pais=FR" class="nav-item" id="navReferral">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Inviter des Amis</span>
        </a>
        <a href="saque.php?pais=FR" class="nav-item" id="navWithdraw">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="22" height="18" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span>Retrait</span>
        </a>
    </nav>

    <script>
    var COUNTRY = 'FR';
    var T = {
        completed: "termin\u00e9es",
        daily_limit: "Limite quotidienne atteinte ! Revenez demain.",
        quick_messages: [
            "Bon choix ! \ud83d\udcb8",
            "Tr\u00e8s bien ! Continuez ! \ud83c\udfaf",
            "Excellent ! \ud83c\udf1f",
            "Parfait ! \ud83d\udc8e",
            "Fantastique ! \u2b50",
            "Vous \u00eates en forme ! \ud83d\ude80",
            "Continuez comme \u00e7a ! \ud83d\udcaa",
            "Incroyable ! \ud83c\udf89"        ],
        progress: "termin\u00e9es",
        limit_title: "Limite Quotidienne Atteinte",
        limit_remaining: "Vous avez encore %d \u00e9valuation%s disponible%s aujourd'hui",
        limit_done: "Excellent travail ! Vous avez termin\u00e9 les 7 \u00e9valuations d'aujourd'hui. Revenez demain pour gagner plus !",
        all_done_title: "Tout Termin\u00e9 !",
        all_done_text: "Vous avez \u00e9valu\u00e9 toutes les vid\u00e9os disponibles. R\u00e9initialiser pour continuer \u00e0 gagner ?",
        today: "Aujourd'hui",
        total: "Total",
        reset: "R\u00e9initialiser et Continuer",
        cancel: "Annuler",
        ok: "OK",
        congrats: "F\u00e9licitations !",
        won: "Gagn\u00e9 !",
        completed_7: "Vous avez termin\u00e9 les 7 \u00e9valuations d'aujourd'hui !",
        level_names: ["D\u00e9butant", "Bronze", "Argent", "Or", "Diamant", "\u00c9lite"],
        level_up: "Niveau Sup\u00e9rieur !",
        level_up_text: "F\u00e9licitations ! Vous \u00eates pass\u00e9 au niveau %s !",
        level_progress: "%d\/%d jours actifs pour le prochain niveau",
        level_max: "Niveau maximum atteint !",
        streak_bonus: "Bonus de S\u00e9rie !",
        streak_bonus_text: "S\u00e9rie de %d jours ! Vous avez gagn\u00e9 +\u20ac%s !",
        streak_lost: "S\u00e9rie Perdue",
        streak_lost_text: "Vous avez manqu\u00e9 un jour. Votre s\u00e9rie a \u00e9t\u00e9 r\u00e9initialis\u00e9e.",
        task_titles: ["\u00c9valuer des Miniatures", "Mod\u00e9rer des Commentaires", "Classer des Hashtags", "\u00c9valuer la Qualit\u00e9"],
        task_subs: ["Compl\u00e9tez 7 \u00e9valuations pour gagner votre r\u00e9compense quotidienne !", "Aidez \u00e0 mod\u00e9rer les commentaires TikTok !", "\u00c9valuez la pertinence des hashtags !", "Notez la qualit\u00e9 des vid\u00e9os TikTok !"],
        task_questions: ["Quelle est votre r\u00e9action \u00e0 cette miniature ?", "Ce commentaire est-il appropri\u00e9 ?", "Ce hashtag est-il pertinent pour la vid\u00e9o ?", "Comment \u00e9valuez-vous cette vid\u00e9o ?"],
        missions_title: "Missions",
        mission_complete_7days: "Compl\u00e9tez vos t\u00e2ches 7 jours de suite",
        mission_evaluate_49: "\u00c9valuez 49 \u00e9l\u00e9ments cette semaine",
        mission_streak_5: "Maintenez une s\u00e9rie de 5 jours",
        mission_complete_25days: "Compl\u00e9tez 25 jours de t\u00e2ches ce mois",
        mission_reach_gold: "Atteignez le niveau Or",
        mission_refer_3: "Invitez 3 amis",
        mission_evaluate_200: "\u00c9valuez 200 \u00e9l\u00e9ments ce mois",
        mission_completed: "Termin\u00e9e !",
        mission_claimed: "R\u00e9clam\u00e9e",
        claim: "R\u00e9clamer",
        notif_tasks_available: "Vos t\u00e2ches du jour sont disponibles !",
        notif_level_close: "Plus que %d jour(s) pour atteindre le niveau %s !",
        notif_streak_going: "Votre s\u00e9rie est de %d jours ! Ne la perdez pas !",
        notif_streak_risk: "Compl\u00e9tez vos t\u00e2ches aujourd'hui pour maintenir votre s\u00e9rie !",
        notif_withdraw_close: "Plus que \u20ac%s pour pouvoir retirer !"    };
    </script>
    <script src="assets/js/home.js?v=2"></script>
</body>
</html>
