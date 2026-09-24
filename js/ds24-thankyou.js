(function () {
  "use strict";
  var ds24visitkey = "";
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src =
    "https://www.digistore24.com/buy/track/thankyou_page/?url=" +
    encodeURIComponent(window.location.href) +
    "&ds24visitkey=" +
    encodeURIComponent(ds24visitkey);
  document.head.appendChild(s);
})();
