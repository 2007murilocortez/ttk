(function () {
  "use strict";

  var cfg = window.LEARN_CONFIG || { ds24: {}, pages: {} };
  var nextByStep = { up1: cfg.pages.up2, up2: cfg.pages.up3, up3: cfg.pages.final };

  function appendTracking(base) {
    if (!base) return base;
    try {
      var url = new URL(base);
      var current = new URLSearchParams(window.location.search || "");
      var stored = {};
      try {
        stored = JSON.parse(localStorage.getItem("ttk:utm") || "{}");
      } catch (e) {}

      Object.keys(stored).forEach(function (key) {
        if (!url.searchParams.has(key) && stored[key]) {
          url.searchParams.set(key, String(stored[key]));
        }
      });

      current.forEach(function (value, key) {
        if (value && !url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });

      url.searchParams.set("funnel", "learn");
      return url.toString();
    } catch (e) {
      return base;
    }
  }

  document.querySelectorAll("[data-ds24-upsell-root]").forEach(function (root) {
    var step = root.getAttribute("data-step") || "";
    var buyUrl = cfg.ds24 && cfg.ds24[step];
    var nextUrl = nextByStep[step] || cfg.pages.final || "/learn/final/";
    var buyBtn = root.querySelector("[data-ds24-buy]");
    var skipBtn = root.querySelector("[data-ds24-skip]");

    if (buyBtn) {
      if (buyUrl) {
        buyBtn.href = appendTracking(buyUrl);
        buyBtn.addEventListener("click", function (e) {
          e.preventDefault();
          try {
            sessionStorage.setItem("ttk:funnel", "learn");
          } catch (err) {}
          window.location.href = buyBtn.href;
        });
      } else {
        buyBtn.addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = nextUrl;
        });
      }
    }

    if (skipBtn) {
      skipBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = nextUrl;
      });
    }
  });
})();
