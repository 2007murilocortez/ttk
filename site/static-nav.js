(function () {
  var FUNNEL = /^\/(pv11|back)(\/|$)/;

  function withQuery(path) {
    if (!path || path.indexOf("?") >= 0) return path;
    var q = window.location.search;
    return q ? path + q : path;
  }

  function fullNavigate(url) {
    if (!url || typeof url !== "string") return;
    if (url.charAt(0) === "/") {
      window.location.href = withQuery(url);
      return;
    }
    try {
      var u = new URL(url, window.location.origin);
      if (FUNNEL.test(u.pathname)) {
        window.location.href = withQuery(u.pathname) + u.hash;
        return;
      }
    } catch (e) {}
    window.location.assign(url);
  }

  function isFunnelPath(url) {
    if (!url || typeof url !== "string") return false;
    try {
      var path = url.charAt(0) === "/" ? url.split("?")[0] : new URL(url, window.location.origin).pathname;
      return FUNNEL.test(path);
    } catch (e) {
      return false;
    }
  }

  var pushState = history.pushState;
  var replaceState = history.replaceState;
  history.pushState = function (_state, _title, url) {
    if (isFunnelPath(url)) {
      fullNavigate(url);
      return;
    }
    return pushState.apply(this, arguments);
  };
  history.replaceState = function (_state, _title, url) {
    if (isFunnelPath(url)) {
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
      if (!isFunnelPath(href)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      fullNavigate(href);
    },
    true
  );

  var nativeFetch = window.fetch;
  if (nativeFetch) {
    window.fetch = function (input, init) {
      var url = typeof input === "string" ? input : input && input.url;
      var headers = init && init.headers;
      var rsc = false;
      if (headers) {
        if (typeof headers.get === "function") {
          rsc = headers.get("RSC") === "1" || headers.get("Next-Router-State-Tree");
        } else {
          rsc = headers.RSC === "1" || headers["Next-Router-State-Tree"];
        }
      }
      if (rsc && url && isFunnelPath(url)) {
        fullNavigate(url);
        return Promise.reject(new Error("static-export"));
      }
      return nativeFetch.apply(this, arguments);
    };
  }
})();
