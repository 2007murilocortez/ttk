(function () {
  "use strict";

  var PRODUCT = {
    contentId: "736912",
    contentName: "Contribution de sécurité TikTok",
    contentType: "product",
    value: 27,
    currency: "EUR",
  };

  function productPayload() {
    return {
      contents: [
        {
          content_id: PRODUCT.contentId,
          content_type: PRODUCT.contentType,
          content_name: PRODUCT.contentName,
        },
      ],
      value: PRODUCT.value,
      currency: PRODUCT.currency,
    };
  }

  function readBuyer() {
    try {
      var raw =
        localStorage.getItem("userWeroData") ||
        localStorage.getItem("userBizumData");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function isValidE164(phone) {
    return /^\+[1-9]\d{7,14}$/.test(phone);
  }

  function isPlausibleFrenchMobile(phone) {
    if (!/^\+33[67]\d{8}$/.test(phone)) return false;
    var local = phone.slice(3);
    if (/^(\d)\1+$/.test(local)) return false;
    if (/0{5,}/.test(local)) return false;
    if (local === "600000000" || local === "700000000") return false;
    return true;
  }

  // Funil FR: telefone Wero em E.164 (+33XXXXXXXXX).
  function normalizePhone(phone) {
    var raw = String(phone || "").trim();
    if (!raw) return "";

    var compact = raw.replace(/[\s().-]/g, "");
    if (/^\+\d{8,15}$/.test(compact)) return compact;

    var digits = raw.replace(/\D/g, "");
    if (!digits) return "";

    if (digits.length === 10 && digits.charAt(0) === "0") {
      return "+33" + digits.slice(1);
    }
    if (digits.length === 9 && /^[67]/.test(digits)) {
      return "+33" + digits;
    }
    if (digits.length === 11 && digits.indexOf("33") === 0) {
      return "+" + digits;
    }
    if (digits.length === 12 && digits.indexOf("0033") === 0) {
      return "+33" + digits.slice(4);
    }

    return "";
  }

  function identify(overrides) {
    if (!window.ttq) return;
    var buyer = readBuyer() || {};
    var src = overrides || {};
    var email = (src.email || buyer.email || "").trim().toLowerCase();
    var phone = normalizePhone(src.phone || buyer.chaveWero || buyer.chaveBizum);
    var pii = {};
    if (email) pii.email = email;
    if (phone && isValidE164(phone) && isPlausibleFrenchMobile(phone)) {
      pii.phone_number = phone;
    }
    if (email) pii.external_id = email;
    if (Object.keys(pii).length) ttq.identify(pii);
  }

  function viewContent() {
    if (!window.ttq) return;
    ttq.track("ViewContent", productPayload());
  }

  function initiateCheckout(overrides) {
    if (!window.ttq) return;
    identify(overrides);
    ttq.track("InitiateCheckout", productPayload());
  }

  window.ttPixel = {
    product: PRODUCT,
    identify: identify,
    viewContent: viewContent,
    initiateCheckout: initiateCheckout,
  };
})();
