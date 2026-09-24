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

  function normalizePhone(phone) {
    var ph = String(phone || "").replace(/[^\d+]/g, "");
    if (ph && ph.charAt(0) !== "+" && ph.length === 9) ph = "+34" + ph;
    return ph || "";
  }

  function identify(overrides) {
    if (!window.ttq) return;
    var buyer = readBuyer() || {};
    var src = overrides || {};
    var email = (src.email || buyer.email || "").trim().toLowerCase();
    var phone = normalizePhone(src.phone || buyer.chaveWero || buyer.chaveBizum);
    var pii = {};
    if (email) pii.email = email;
    if (phone) pii.phone_number = phone;
    if (email) pii.external_id = email;
    if (Object.keys(pii).length) ttq.identify(pii);
  }

  function viewContent() {
    if (!window.ttq) return;
    ttq.track("ViewContent", productPayload());
  }

  function initiateCheckout() {
    if (!window.ttq) return;
    identify();
    ttq.track("InitiateCheckout", productPayload());
  }

  window.ttPixel = {
    product: PRODUCT,
    identify: identify,
    viewContent: viewContent,
    initiateCheckout: initiateCheckout,
  };
})();
