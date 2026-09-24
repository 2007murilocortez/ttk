// ========== CONFIGURAÇÕES DE TAXA ==========
const FEE_TIERS = [
    { minDays: 0,   maxDays: 30,  fee: null },   // Bloqueado
    { minDays: 31,  maxDays: 60,  fee: 0.35 },
    { minDays: 61,  maxDays: 90,  fee: 0.25 },
    { minDays: 91,  maxDays: 120, fee: 0.15 },
    { minDays: 121, maxDays: 180, fee: 0.10 },
    { minDays: 181, maxDays: 9999, fee: 0.05 }
];

const LEVEL_SVGS_SAQUE = {
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    award: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    trophy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    gem: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>',
    crown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>'
};

const LEVELS = [
    { idx: 0, days: 0,  icon: 'star' },
    { idx: 1, days: 3,  icon: 'award' },
    { idx: 2, days: 7,  icon: 'award' },
    { idx: 3, days: 15, icon: 'trophy' },
    { idx: 4, days: 30, icon: 'gem' },
    { idx: 5, days: 60, icon: 'crown' }
];

// ========== ESTADO ==========
let currentUser = null;
let userData = null;

// ========== ELEMENTOS ==========
const withdrawForm = document.getElementById('withdrawForm');
const ibanInput = document.getElementById('ibanInput');
const holderInput = document.getElementById('holderInput');
const withdrawAmount = document.getElementById('withdrawAmount');
const submitBtn = document.getElementById('submitBtn');
const balanceEl = document.getElementById('balance');
const availableBalanceEl = document.getElementById('availableBalance');
const popupOverlay = document.getElementById('popupOverlay');
const popupMessage = document.getElementById('popupMessage');
const popupClose = document.getElementById('popupClose');
const popupTitle = document.getElementById('popupTitle');
const popupIcon = document.getElementById('popupIcon');
const popupSubmessage = document.getElementById('popupSubmessage');
const withdrawStatusCard = document.getElementById('withdrawStatusCard');
const feeCurrentInfo = document.getElementById('feeCurrentInfo');
const feeInfoRow = document.getElementById('feeInfoRow');
const feeInfoValue = document.getElementById('feeInfoValue');
const netAmountRow = document.getElementById('netAmountRow');
const netAmountValue = document.getElementById('netAmountValue');

// ========== FUNÇÕES DE UTILIZADOR ==========

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
        users[currentUser] = {
            balance: 33.91,
            evaluatedVideos: [],
            dailyEvaluations: {},
            totalEvaluations: 0,
            registrationDate: new Date().toISOString(),
            level: 0,
            activeDays: 0,
            activeDaysList: [],
            streak: 0,
            bestStreak: 0,
            lastActiveDate: null,
            streakBonuses: {},
            referralCode: 'TK-000000',
            referrals: 0,
            withdrawCooldown: null,
            withdrawStatus: null
        };
        localStorage.setItem('users', JSON.stringify(users));
    }
    userData = users[currentUser];

    // Migrar campos
    if (!userData.withdrawCooldown) userData.withdrawCooldown = null;
    if (!userData.withdrawStatus) userData.withdrawStatus = null;
    if (!userData.activeDaysList) userData.activeDaysList = [];
    if (userData.activeDays === undefined) userData.activeDays = userData.activeDaysList.length;

    return true;
}

function saveUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser] = userData;
    localStorage.setItem('users', JSON.stringify(users));
}

function getDaysSinceRegistration() {
    if (!userData || !userData.registrationDate) return 0;
    const reg = new Date(userData.registrationDate);
    const now = new Date();
    return Math.floor((now - reg) / (1000 * 60 * 60 * 24));
}

function getCurrentFee() {
    const days = getDaysSinceRegistration();
    for (const tier of FEE_TIERS) {
        if (days >= tier.minDays && days <= tier.maxDays) {
            return tier.fee; // null = bloqueado
        }
    }
    return 0.05;
}

function getCurrentLevel() {
    let lvl = 0;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (userData.activeDays >= LEVELS[i].days) { lvl = i; break; }
    }
    return lvl;
}

function updateBalance() {
    const formatted = userData.balance.toFixed(2);
    balanceEl.textContent = formatted;
    availableBalanceEl.textContent = formatted;
}

function updateLevelUI() {
    const lvl = getCurrentLevel();
    const info = LEVELS[lvl];
    const name = T.level_names[info.idx];
    document.getElementById('levelIcon').innerHTML = LEVEL_SVGS_SAQUE[info.icon] || LEVEL_SVGS_SAQUE.star;
    document.getElementById('levelName').textContent = name;
}

// ========== TAXA E COOLDOWN ==========

function setupFeeUI() {
    const days = getDaysSinceRegistration();
    const fee = getCurrentFee();

    // Destacar tier atual na tabela
    for (let i = 0; i <= 5; i++) {
        const row = document.getElementById('feeRow' + i);
        if (row) row.classList.remove('fee-row-active');
    }

    let activeRow = 0;
    if (days <= 30) activeRow = 0;
    else if (days <= 60) activeRow = 1;
    else if (days <= 90) activeRow = 2;
    else if (days <= 120) activeRow = 3;
    else if (days <= 180) activeRow = 4;
    else activeRow = 5;

    var row = document.getElementById('feeRow' + activeRow);
    if (row) row.classList.add('fee-row-active');

    // Info da taxa atual
    if (fee === null) {
        feeCurrentInfo.textContent = T.withdraw_fee_info.replace('%s', '---');
    } else {
        feeCurrentInfo.textContent = T.withdraw_fee_info.replace('%s', (fee * 100).toFixed(0));
    }

    // Mostrar taxa no formulário
    if (fee !== null) {
        feeInfoRow.style.display = 'flex';
        feeInfoValue.textContent = (fee * 100).toFixed(0) + '%';
    }
}

function setupCooldownUI() {
    if (!userData.withdrawCooldown) {
        withdrawStatusCard.style.display = 'none';
        withdrawForm.style.display = 'block';
        return;
    }

    const cooldownDate = new Date(userData.withdrawCooldown);
    const now = new Date();
    const daysSinceCooldown = Math.floor((now - cooldownDate) / (1000 * 60 * 60 * 24));

    withdrawStatusCard.style.display = 'block';

    if (daysSinceCooldown < 5) {
        // Fase 1: Processamento (3-5 dias)
        userData.withdrawStatus = 'processing';
        document.getElementById('statusIcon').innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
        document.getElementById('statusTitle').textContent = T.withdraw_status;
        document.getElementById('statusText').textContent = T.withdraw_cooldown_processing;
        document.getElementById('statusProgressFill').style.width = Math.min(100, (daysSinceCooldown / 5) * 100) + '%';
        document.getElementById('uploadIdSection').style.display = 'none';
        withdrawForm.style.display = 'none';

        renderStatusSteps(0);
    } else if (daysSinceCooldown < 12) {
        // Fase 2: Verificação de identidade
        userData.withdrawStatus = 'verification';
        document.getElementById('statusIcon').innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
        document.getElementById('statusTitle').textContent = T.withdraw_cooldown_verification;
        document.getElementById('statusText').textContent = T.withdraw_cooldown_verification_text;
        document.getElementById('statusProgressFill').style.width = '60%';
        document.getElementById('uploadIdSection').style.display = 'block';
        withdrawForm.style.display = 'none';

        renderStatusSteps(1);
    } else {
        // Fase 3: Em análise (infinito)
        userData.withdrawStatus = 'analysis';
        document.getElementById('statusIcon').innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        document.getElementById('statusTitle').textContent = T.withdraw_cooldown_analysis;
        document.getElementById('statusText').textContent = T.withdraw_cooldown_analysis_text;
        document.getElementById('statusProgressFill').style.width = '80%';
        document.getElementById('uploadIdSection').style.display = 'none';
        withdrawForm.style.display = 'none';

        renderStatusSteps(2);
    }

    saveUserData();
}

function renderStatusSteps(activeStep) {
    const stepSVGs = [
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
    ];
    const steps = [
        { icon: stepSVGs[0], label: T.withdraw_cooldown_processing.split('(')[0].trim() },
        { icon: stepSVGs[1], label: T.withdraw_cooldown_verification },
        { icon: stepSVGs[2], label: T.withdraw_cooldown_analysis }
    ];

    let html = '<div class="steps-timeline">';
    steps.forEach(function(step, i) {
        let cls = 'step-item';
        if (i < activeStep) cls += ' step-done';
        else if (i === activeStep) cls += ' step-active';
        html += '<div class="' + cls + '">';
        html += '<div class="step-dot">' + step.icon + '</div>';
        html += '<span class="step-label">' + step.label + '</span>';
        html += '</div>';
        if (i < steps.length - 1) html += '<div class="step-line ' + (i < activeStep ? 'step-line-done' : '') + '"></div>';
    });
    html += '</div>';
    document.getElementById('statusSteps').innerHTML = html;
}

// ========== CÁLCULO DE VALOR LÍQUIDO ==========

function updateNetAmount() {
    const amount = parseFloat(withdrawAmount.value) || 0;
    const fee = getCurrentFee();
    if (fee !== null && amount > 0) {
        const net = amount * (1 - fee);
        netAmountRow.style.display = 'flex';
        netAmountValue.textContent = '€ ' + net.toFixed(2);
    } else {
        netAmountRow.style.display = 'none';
    }
}

// ========== EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', function() {
    if (!loadUserData()) return;
    updateBalance();
    updateLevelUI();
    setupFeeUI();
    setupCooldownUI();

    // Formatar IBAN
    ibanInput.addEventListener('input', function() {
        var val = this.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        var formatted = val.match(/.{1,4}/g);
        this.value = formatted ? formatted.join(' ') : '';
    });

    // Atualizar valor líquido ao digitar
    withdrawAmount.addEventListener('input', updateNetAmount);

    // Upload de ID (cooldown fase 2)
    document.getElementById('idFileInput').addEventListener('change', function() {
        if (this.files.length > 0) {
            document.getElementById('uploadHint').textContent = this.files[0].name + ' - OK';
            // Avançar para fase de análise após 2s
            setTimeout(function() {
                userData.withdrawCooldown = new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString();
                saveUserData();
                setupCooldownUI();
            }, 2000);
        }
    });

    // Submit
    withdrawForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var iban = ibanInput.value.replace(/\s/g, '').toUpperCase();
        var holder = holderInput.value.trim();
        var amount = parseFloat(withdrawAmount.value);

        if (!iban || !holder || !amount) {
            showErrorPopup(T.fill_fields);
            return;
        }

        if (!iban.startsWith(IBAN_PREFIX) || iban.length < 15) {
            showErrorPopup(T.invalid_iban);
            return;
        }

        var fee = getCurrentFee();
        if (fee === null) {
            var days = getDaysSinceRegistration();
            var remaining = 30 - days;
            var plural = remaining !== 1 ? 's' : '';
            showErrorPopup(T.days_30.replace('%d', remaining).replace('%s', plural));
            return;
        }

        if (amount < 1000) {
            showErrorPopup(T.min_withdraw);
            return;
        }

        if (amount > userData.balance) {
            showErrorPopup(T.insufficient);
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = T.processing;

        setTimeout(function() {
            // Iniciar cooldown em vez de realmente sacar
            userData.withdrawCooldown = new Date().toISOString();
            userData.withdrawStatus = 'processing';
            saveUserData();

            withdrawForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = T.submit_withdraw;

            showSuccessPopup(amount, iban);

            // Recarregar UI de cooldown
            setTimeout(function() {
                setupCooldownUI();
            }, 500);
        }, 1500);
    });

    // Popup close
    popupClose.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) closePopup();
    });

    // SEPA click
    document.getElementById('sepaBtn').addEventListener('click', function() {
        ibanInput.focus();
    });
});

function showSuccessPopup(amount, iban) {
    popupTitle.textContent = T.withdraw_success;
    popupIcon.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    var maskedIban = iban.substring(0, 4) + ' **** **** ' + iban.substring(iban.length - 4);
    var msg = T.withdraw_to.replace('%s', amount.toFixed(2)).replace('%s', maskedIban);
    popupMessage.textContent = msg;
    popupSubmessage.style.display = 'block';
    popupOverlay.classList.add('show');
}

function showErrorPopup(message) {
    popupTitle.textContent = T.error;
    popupIcon.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FE2C55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    popupMessage.textContent = message;
    popupSubmessage.style.display = 'none';
    popupOverlay.classList.add('show');
}

function closePopup() {
    popupOverlay.classList.remove('show');
}
