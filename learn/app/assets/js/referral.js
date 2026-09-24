const LEVEL_SVGS_REF = {
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

let currentUser = null;
let userData = null;

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
        window.location.href = 'index.php?pais=' + COUNTRY;
        return false;
    }
    userData = users[currentUser];
    if (!userData.referralCode) userData.referralCode = generateCode();
    if (userData.referrals === undefined) userData.referrals = 0;
    return true;
}

function saveUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[currentUser] = userData;
    localStorage.setItem('users', JSON.stringify(users));
}

function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'TK-';
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
}

function getCurrentLevel() {
    let lvl = 0;
    if (!userData || !userData.activeDays) return 0;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (userData.activeDays >= LEVELS[i].days) { lvl = i; break; }
    }
    return lvl;
}

function updateUI() {
    // Balance
    document.getElementById('balance').textContent = userData.balance.toFixed(2);

    // Level
    const lvl = getCurrentLevel();
    document.getElementById('levelIcon').innerHTML = LEVEL_SVGS_REF[LEVELS[lvl].icon] || LEVEL_SVGS_REF.star;
    document.getElementById('levelName').textContent = T.level_names[LEVELS[lvl].idx];

    // Referral info
    document.getElementById('referralCode').textContent = userData.referralCode;
    document.getElementById('referralCount').textContent = userData.referrals;
    document.getElementById('referralEarnings').textContent = '€' + (userData.referrals * 50);
    document.getElementById('shareLink').textContent = REFERRAL_LINK;
}

function showCopied() {
    const popup = document.getElementById('copiedPopup');
    popup.classList.add('show');
    setTimeout(function() { popup.classList.remove('show'); }, 2000);
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function() {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopied();
}

document.addEventListener('DOMContentLoaded', function() {
    if (!loadUserData()) return;
    updateUI();

    // Copy code
    document.getElementById('copyCodeBtn').addEventListener('click', function() {
        copyToClipboard(userData.referralCode);
    });

    // Copy link
    document.getElementById('copyLinkBtn').addEventListener('click', function() {
        copyToClipboard(REFERRAL_LINK);
    });

    // Share WhatsApp
    document.getElementById('shareWhatsapp').addEventListener('click', function() {
        var msg = T.referral_share_msg + '\n' + REFERRAL_LINK;
        window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
    });

    // Share Telegram
    document.getElementById('shareTelegram').addEventListener('click', function() {
        var msg = T.referral_share_msg;
        window.open('https://t.me/share/url?url=' + encodeURIComponent(REFERRAL_LINK) + '&text=' + encodeURIComponent(msg), '_blank');
    });
});
