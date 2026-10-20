/**
 * Checkout do funil.
 * - /?to=https://go.centerpag.com/... sai do site e abre o checkout
 * - clique no botão do player (Centerpag ou domínio antigo) vai para o mesmo link
 * UTMs da URL atual acompanham o checkout.
 */
(function () {
  var CHECKOUT = "https://go.centerpag.com/PPU38CQFOA2";
  var PASS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "ttclid",
    "gclid",
    "fbclid",
  ];

  function allowed(url) {
    try {
      var u = new URL(url, window.location.href);
      if (u.protocol !== "https:") return null;
      if (!/(^|\.)centerpag\.com$/i.test(u.hostname)) return null;
      return u;
    } catch (e) {
      return null;
    }
  }

  function withParams(target) {
    var current = new URLSearchParams(window.location.search);
    current.delete("to");
    for (var i = 0; i < PASS.length; i++) {
      var key = PASS[i];
      var value = current.get(key);
      if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    return target;
  }

  function go(url) {
    var target = allowed(url) || allowed(CHECKOUT);
    if (!target) return;
    window.location.assign(withParams(target).toString());
  }

  var to = new URLSearchParams(window.location.search).get("to");
  if (to && allowed(to)) {
    go(to);
    return;
  }
  if (/\/checkout\/?$/i.test(window.location.pathname)) {
    go(CHECKOUT);
    return;
  }

  document.addEventListener(
    "click",
    function (e) {
      var nodes = e.composedPath ? e.composedPath() : [e.target];
      var href = "";
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (!node || !node.getAttribute) continue;
        href = node.getAttribute("href") || node.getAttribute("data-href") || "";
        if (href) break;
      }
      if (!href) return;
      var low = href.toLowerCase();
      if (low.indexOf("centerpag.com") === -1 && low.indexOf("growaiclub.com") === -1) return;
      var dest = CHECKOUT;
      try {
        var abs = new URL(href, window.location.href);
        var nested = abs.searchParams.get("to");
        if (nested && allowed(nested)) dest = nested;
        else if (allowed(abs.href)) dest = abs.href;
      } catch (err) {}
      e.preventDefault();
      e.stopPropagation();
      go(dest);
    },
    true
  );
})();
