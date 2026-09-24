(function (w, d) {
  "use strict";

  var PIXEL_ID = w.TT_PIXEL_ID || "DAQMPF3C77U6JDP8JH3G";

  !function (win, doc, t) {
    win.TiktokAnalyticsObject = t;
    var ttq = (win[t] = win[t] || []);
    ttq.methods = [
      "page", "track", "identify", "instances", "debug", "on", "off", "once",
      "ready", "alias", "group", "enableCookie", "disableCookie",
      "holdConsent", "revokeConsent", "grantConsent",
    ];
    ttq.setAndDefer = function (obj, method) {
      obj[method] = function () {
        obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }
    ttq.instance = function (id) {
      var inst = ttq._i[id] || [];
      for (var n = 0; n < ttq.methods.length; n++) {
        ttq.setAndDefer(inst, ttq.methods[n]);
      }
      return inst;
    };
    ttq.load = function (id, opts) {
      var src = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = src;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = opts || {};
      var s = doc.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = src + "?sdkid=" + id + "&lib=" + t;
      var first = doc.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(s, first);
    };
  }(w, d, "ttq");

  function isProductPage() {
    var path = w.location.pathname || "";
    return (
      path.indexOf("/learn/front") !== -1 ||
      path.indexOf("/learn/confirmar-saque") !== -1 ||
      path.indexOf("/learn/pre") !== -1
    );
  }

  function fireViewContent() {
    if (!isProductPage()) return;
    if (w.ttPixel && typeof w.ttPixel.viewContent === "function") {
      w.ttPixel.viewContent();
    }
  }

  ttq.load(PIXEL_ID);
  ttq.grantConsent();
  ttq.enableCookie();
  ttq.page();

  // Dispara na fila do ttq imediatamente — não depende só de ttq.ready.
  fireViewContent();

  if (typeof ttq.ready === "function") {
    ttq.ready(fireViewContent);
  }

  // Fallback: Opera/adblock pode travar ttq.ready em eventos passivos.
  setTimeout(fireViewContent, 1500);
  setTimeout(fireViewContent, 4000);
})(window, document);
