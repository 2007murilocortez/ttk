'use strict';
const config = window.DECLIC_CONFIG;
const euro = (n) => {
  const value = Number(n);
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0
  }).format(value);
};
const offer = document.body.dataset.offer;
const dialog = document.querySelector('#purchase-preview');
const approvalMode = !!config.approvalMode;

const allowedUrl = (value) => {
  try {
    const u = new URL(value);
    return (
      u.protocol === 'https:' &&
      (['digistore24.com', 'www.digistore24.com', 'app.digistore24.com', 'checkout-ds24.com', 'www.checkout-ds24.com'].includes(u.hostname) ||
        u.hostname.endsWith('.digistore24.com') ||
        u.hostname.endsWith('.checkout-ds24.com'))
    );
  } catch {
    return false;
  }
};

document.querySelectorAll('[data-price]').forEach((el) => {
  const o = config.offers[el.dataset.price] || config.offers.front;
  if (o) el.textContent = euro(o.price);
});

if (!config.preview || approvalMode) {
  document.querySelectorAll('.preview').forEach((el) => el.remove());
}

if (approvalMode) {
  document.querySelectorAll('#preview-next').forEach((el) => el.remove());
}

if (config.supportEmail) {
  document.querySelectorAll('[data-support]').forEach((el) => {
    el.textContent = config.supportEmail;
    el.href = 'mailto:' + config.supportEmail;
    el.classList.remove('status-missing');
  });
}

for (const [selector, key] of [
  ['[data-publisher]', 'publisherName'],
  ['[data-address]', 'publisherAddress'],
  ['[data-registration]', 'publisherRegistration'],
  ['[data-phone]', 'publisherPhone'],
  ['[data-refund-days]', 'refundDays'],
]) {
  if (config[key] !== undefined && config[key] !== null && config[key] !== '') {
    document.querySelectorAll(selector).forEach((el) => (el.textContent = config[key]));
  }
}

document.querySelectorAll('[data-buy],[data-decline]').forEach((btn) => {
  btn.addEventListener('click', (ev) => {
    const key = btn.dataset.buy || btn.dataset.decline || offer || 'front';
    const item = config.offers[key] || config.offers.front;
    const decline = btn.hasAttribute('data-decline');
    const url = item?.[decline ? 'noUrl' : 'buyUrl'];

    if (!config.preview && allowedUrl(url)) {
      return;
    }

    ev.preventDefault();

    if (dialog) {
      dialog.querySelector('h2').textContent = allowedUrl(url)
        ? 'Redirection vers le paiement'
        : 'Paiement via Digistore24';
      dialog.querySelector('[data-dialog-text]').textContent = allowedUrl(url)
        ? 'Vous allez être redirigé vers le formulaire de commande sécurisé Digistore24.'
        : 'Le lien de paiement Digistore24 sera activé dès la finalisation du produit. Aucun upsell n’est proposé : un seul guide PDF est vendu sur cette page.';
      dialog.showModal();
    }
  });

  const key = btn.dataset.buy || btn.dataset.decline || 'front';
  const item = config.offers[key] || config.offers.front;
  const url = item?.[btn.hasAttribute('data-decline') ? 'noUrl' : 'buyUrl'];
  if (!config.preview && allowedUrl(url) && btn.tagName === 'A') {
    btn.href = url;
  }
});

document.querySelectorAll('[data-close-dialog]').forEach((el) =>
  el.addEventListener('click', () => dialog && dialog.close())
);

if (dialog) {
  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) {
        dialog.close();
      }
    }
  });
}

if (!config.preview && offer && config.offers[offer]?.integrationScript) {
  const src = config.offers[offer].integrationScript;
  if (allowedUrl(src)) {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    document.head.appendChild(s);
  }
}
