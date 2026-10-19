(function () {
  var FUNNEL = /^\/(pv11|back)(\/|$)/;

  function norm(path) {
    if (!path) return "/";
    var p = path.split("?")[0].split("#")[0];
    if (p.length > 1 && p.charAt(p.length - 1) === "/") p = p.slice(0, -1);
    return p || "/";
  }

  function pathOf(url) {
    if (!url || typeof url !== "string") return "";
    try {
      if (url.charAt(0) === "/") return norm(url);
      return norm(new URL(url, window.location.origin).pathname);
    } catch (e) {
      return "";
    }
  }

  function currentPath() {
    return norm(window.location.pathname);
  }

  function isFunnelPath(url) {
    var path = pathOf(url);
    return !!path && FUNNEL.test(path + "/");
  }

  function withQuery(path) {
    if (!path || path.indexOf("?") >= 0) return path;
    var q = window.location.search;
    return q ? path + q : path;
  }

  function fullNavigate(url) {
    var next = pathOf(url);
    if (!next || next === currentPath()) return;
    if (url.charAt(0) === "/") {
      window.location.href = withQuery(url.split("#")[0]);
      return;
    }
    window.location.href = withQuery(next);
  }

  var pushState = history.pushState;
  var replaceState = history.replaceState;
  history.pushState = function (state, title, url) {
    if (url && isFunnelPath(url) && pathOf(url) !== currentPath()) {
      fullNavigate(url);
      return;
    }
    return pushState.apply(this, arguments);
  };
  history.replaceState = function (state, title, url) {
    if (url && isFunnelPath(url) && pathOf(url) !== currentPath()) {
      fullNavigate(url);
      return;
    }
    return replaceState.apply(this, arguments);
  };

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) !== "/" || href.indexOf("/_next/") === 0) return;
      if (!isFunnelPath(href) || pathOf(href) === currentPath()) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      fullNavigate(href);
    },
    true
  );
})();
