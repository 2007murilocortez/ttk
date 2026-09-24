// ============================================================================
// 🔎 CTRL+F: [TROCAR-ONECLICK-UPSELL-02]
// A TROCA MANUAL DO ONE-CLICK FICA NO index.html, ENTRE OS MARCADORES INÍCIO/FIM.
// ESTE ARQUIVO AUXILIAR NÃO PRECISA SER SUBSTITUÍDO.
// ============================================================================

(function () {
  "use strict";

  var root = document.querySelector("[data-cooud-flow-root]");
  if (!root) return;

  var configElement = root.querySelector('script[type="application/json"]');
  var primaryButton = root.querySelector("[data-cooud-flow-primary]");

  var trackingKeys = [
    "src",
    "sck",
    "fbclid",
    "gclid",
    "gbraid",
    "wbraid",
    "ttclid",
    "msclkid",
    "ref",
    "subid",
    "sub_id"
  ];

  function isTrackingParameter(key) {
    var normalized = key.toLowerCase();
    return normalized.indexOf("utm_") === 0 || trackingKeys.indexOf(normalized) !== -1;
  }

  function preserveTracking(destination) {
    if (!destination) return destination;

    try {
      var target = new URL(destination, window.location.href);
      var current = new URLSearchParams(window.location.search);

      current.forEach(function (value, key) {
        if (isTrackingParameter(key) && !target.searchParams.has(key)) {
          target.searchParams.set(key, value);
        }
      });

      return target.toString();
    } catch (error) {
      return destination;
    }
  }

  if (!configElement || !primaryButton) return;

  try {
    var config = JSON.parse(configElement.textContent);

    (config.steps || []).forEach(function (step) {
      if (step.primary && step.primary.redirect) {
        step.primary.redirect = preserveTracking(step.primary.redirect);
      }
    });

    configElement.textContent = JSON.stringify(config);
    primaryButton.setAttribute(
      "data-connect-redirect",
      preserveTracking(primaryButton.getAttribute("data-connect-redirect"))
    );
  } catch (error) {
    console.error("No se pudo preparar el flujo de Cooud.", error);
  }
})();


