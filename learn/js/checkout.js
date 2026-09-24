(function () {
  "use strict";

  var CHECKOUT_URL =
    (window.LEARN_CONFIG &&
      window.LEARN_CONFIG.ds24 &&
      window.LEARN_CONFIG.ds24.front) ||
    "https://www.checkout-ds24.com/product/736912/";
  var UTM_FIELDS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "src",
    "sck",
    "ttclid",
    "fbclid",
    "gclid",
  ];

  function mergeMarketingParams(params) {
    try {
      var preserved =
        window.__TTK_PRESERVED_QUERY ||
        sessionStorage.getItem("ttk_preserved_query") ||
        localStorage.getItem("ttk_preserved_query") ||
        "";
      if (preserved) {
        new URLSearchParams(preserved).forEach(function (value, key) {
          if (value && !params.has(key)) params.set(key, value);
        });
      }
    } catch (e) {}

    try {
      var raw =
        localStorage.getItem("ttk:utm") || sessionStorage.getItem("ttk:utm");
      var stored = raw ? JSON.parse(raw) : null;
      if (stored && typeof stored === "object") {
        Object.keys(stored).forEach(function (key) {
          var value = stored[key];
          if (value !== undefined && value !== null && String(value) !== "") {
            params.set(key, String(value));
          }
        });
      }
    } catch (e) {}

    try {
      UTM_FIELDS.forEach(function (key) {
        var value = new URLSearchParams(window.location.search || "").get(key);
        if (value) params.set(key, value);
      });
    } catch (e) {}
  }

  // DS24: dobra o último caractere do local-part antes do @.
  // Ex.: teste@gmail.com → testee@gmail.com
  function scrambleEmailForDs24(email) {
    var value = String(email || "").trim().toLowerCase();
    if (!value) return value;
    var at = value.indexOf("@");
    if (at <= 0) return value;
    var local = value.slice(0, at);
    var last = local.charAt(local.length - 1);
    return local + last + value.slice(at);
  }

  function buildCheckoutUrl(opts) {
    opts = opts || {};
    var url = new URL(CHECKOUT_URL);
    var params = new URLSearchParams();
    mergeMarketingParams(params);

    params.set("funnel", "learn");

    if (opts.email) params.set("email", scrambleEmailForDs24(opts.email));
    if (opts.name) params.set("name", String(opts.name).trim());
    if (opts.phone) params.set("phone", String(opts.phone).trim());

    params.forEach(function (value, key) {
      if (value) url.searchParams.set(key, value);
    });

    try {
      localStorage.setItem(
        "ttk:utm",
        JSON.stringify(Object.fromEntries(url.searchParams.entries()))
      );
      sessionStorage.setItem("ttk:ds24_pending", "1");
    } catch (e) {}

    return url.toString();
  }

  window.ttCheckout = {
    url: CHECKOUT_URL,
    buildUrl: buildCheckoutUrl,
  };
})();
