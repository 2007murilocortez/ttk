(function () {
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) !== "/" || href.indexOf("/_next/") === 0) return;
      e.preventDefault();
      e.stopPropagation();
      window.location.href = href;
    },
    true
  );
})();
