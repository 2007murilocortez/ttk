(function () {
  var FUNNEL = /^\/(pv11|back)(\/|$)/;

  function norm(path) {
    if (!path) return "/";
    var p = String(path).split("?")[0].split("#")[0];
    if (p.length > 1 && p.charAt(p.length - 1) === "/") p = p.slice(0, -1);
    return p || "/";
  }

  function currentPath() {
    return norm(window.location.pathname);
  }

  document.addEventListener(
    "click",
    function (e) {
      var el = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!el || el.target === "_blank" || el.hasAttribute("download")) return;
      var href = el.getAttribute("href");
      if (!href || href.charAt(0) !== "/") return;
      var path = norm(href);
      if (!FUNNEL.test(path + "/") || path === currentPath()) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      var search = href.indexOf("?") >= 0 ? href.slice(href.indexOf("?")) : window.location.search;
      window.location.assign(path + "/" + search);
    },
    true
  );
})();
