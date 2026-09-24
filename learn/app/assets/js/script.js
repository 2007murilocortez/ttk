document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');

    // Preservar parâmetro de país
    const urlParams = new URLSearchParams(window.location.search);
    const pais = urlParams.get('pais') || '';

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    emailInput.addEventListener('input', function() {
        if (this.value && !validateEmail(this.value)) {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email || !validateEmail(email)) {
            errorMessage.style.display = 'block';
            emailInput.focus();
            return;
        }

        loginBtn.disabled = true;
        loginBtn.classList.add('loading');

        // Guardar utilizador
        localStorage.setItem('currentUser', email);

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (!users[email]) {
            users[email] = {
                balance: 33.91,
                evaluatedVideos: [],
                dailyEvaluations: {},
                dailyRewards: {},
                totalEvaluations: 0,
                registrationDate: new Date().toISOString()
            };
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            // Backfill campos em falta
            if (!users[email].dailyRewards) users[email].dailyRewards = {};
            if (!users[email].totalEvaluations) users[email].totalEvaluations = 0;
            if (!users[email].registrationDate) users[email].registrationDate = new Date().toISOString();
            localStorage.setItem('users', JSON.stringify(users));
        }

        setTimeout(function() {
            var redirect = 'home.php';
            if (pais) redirect += '?pais=' + pais;
            window.location.href = redirect;
        }, 800);
    });
});
