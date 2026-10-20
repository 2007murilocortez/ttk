/**
 * Checkout do funil.
 * O clique na oferta abre nome e e-mail e segue para a Syze.
 * O e-mail vai na URL com a última letra do local dobrada
 * (teste@gmail.com → testee@gmail.com). UTMs acompanham.
 */
(function () {
  var CHECKOUT = "https://syzehub.com/c/7113a838-490a-4076-b90c-1a51899c4316";
  var LEAD_KEY = "pv11_lead_v1";
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
  var pendingUrl = CHECKOUT;

  function allowed(url) {
    try {
      var u = new URL(url, window.location.href);
      if (u.protocol !== "https:") return null;
      if (!/(^|\.)syzehub\.com$/i.test(u.hostname)) return null;
      return u;
    } catch (e) {
      return null;
    }
  }

  function bendEmail(email) {
    var clean = String(email || "").trim();
    var at = clean.lastIndexOf("@");
    if (at < 1) return clean;
    var local = clean.slice(0, at);
    var domain = clean.slice(at);
    if (!local || domain.indexOf(".") < 2) return clean;
    return local + local.charAt(local.length - 1) + domain;
  }

  function withParams(target, lead) {
    var current = new URLSearchParams(window.location.search);
    current.delete("to");
    for (var i = 0; i < PASS.length; i++) {
      var key = PASS[i];
      var value = current.get(key);
      if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    if (lead) {
      target.searchParams.set("name", lead.name);
      target.searchParams.set("email", bendEmail(lead.email));
    }
    return target;
  }

  function go(url, lead) {
    var target = allowed(url) || allowed(CHECKOUT);
    if (!target) return;
    window.location.assign(withParams(target, lead).toString());
  }

  function readLead() {
    try {
      var saved = JSON.parse(sessionStorage.getItem(LEAD_KEY) || "null");
      if (!saved || !saved.name || !saved.email) return null;
      return { name: String(saved.name), email: String(saved.email) };
    } catch (e) {
      return null;
    }
  }

  function css() {
    if (document.getElementById("lead-gate-css")) return;
    var style = document.createElement("style");
    style.id = "lead-gate-css";
    style.textContent =
      "#lead-gate[hidden]{display:none!important}" +
      "#lead-gate{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(2,6,23,.82);font-family:Inter,ui-sans-serif,system-ui,sans-serif}" +
      "#lead-gate form{position:relative;width:min(100%,420px);margin:0;background:#0b1220;color:#f8fafc;border:1px solid rgba(148,163,184,.28);border-radius:18px;padding:26px 20px 18px;box-shadow:0 24px 60px rgba(0,0,0,.45)}" +
      "#lead-gate h2{margin:0 0 6px;font-size:22px;line-height:1.2;font-weight:700}" +
      "#lead-gate p{margin:0 0 16px;color:#94a3b8;font-size:14px;line-height:1.45}" +
      "#lead-gate label{display:block;margin:0 0 12px;color:#cbd5e1;font-size:13px;font-weight:600}" +
      "#lead-gate input{display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px 12px;border-radius:12px;border:1px solid #334155;background:#020617;color:#f8fafc;font-size:16px;outline:none}" +
      "#lead-gate input:focus{border-color:#34d399}" +
      "#lead-gate .lead-error{min-height:18px;margin:0 0 8px;color:#fca5a5;font-size:13px}" +
      "#lead-gate button[type=submit]{width:100%;border:0;border-radius:12px;padding:13px 16px;background:#16a34a;color:#fff;font-size:16px;font-weight:700;cursor:pointer}" +
      "#lead-gate button[type=submit]:active{transform:translateY(1px)}" +
      "#lead-gate .lead-close{position:absolute;top:8px;right:8px;width:32px;height:32px;border:0;border-radius:999px;background:transparent;color:#94a3b8;font-size:22px;line-height:1;cursor:pointer}";
    document.head.appendChild(style);
  }

  function ensureForm() {
    css();
    if (document.getElementById("lead-gate")) return;
    var gate = document.createElement("div");
    gate.id = "lead-gate";
    gate.hidden = true;
    var form = document.createElement("form");
    form.setAttribute("novalidate", "novalidate");
    form.innerHTML =
      '<button type="button" class="lead-close" aria-label="Close">×</button>' +
      "<h2>Continue to checkout</h2>" +
      "<p>Add your name and email. On the next page you only enter your card.</p>" +
      '<label>Full name<input name="lead_name" autocomplete="name" required></label>' +
      '<label>Email<input name="lead_email" type="email" autocomplete="email" inputmode="email" required></label>' +
      '<p class="lead-error" role="alert"></p>' +
      '<button type="submit">Continue</button>';
    gate.appendChild(form);
    document.body.appendChild(gate);

    form.querySelector(".lead-close").addEventListener("click", function () {
      if (/\/checkout\/?$/i.test(window.location.pathname)) return;
      gate.hidden = true;
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = form.querySelector("[name=lead_name]").value.trim();
      var email = form.querySelector("[name=lead_email]").value.trim();
      var err = form.querySelector(".lead-error");
      if (name.length < 2) {
        err.textContent = "Enter your full name.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.textContent = "Enter a valid email.";
        return;
      }
      err.textContent = "";
      try {
        sessionStorage.setItem(LEAD_KEY, JSON.stringify({ name: name, email: email }));
      } catch (e) {}
      go(pendingUrl, { name: name, email: email });
    });
  }

  function showForm(url) {
    pendingUrl = url || CHECKOUT;
    ensureForm();
    var gate = document.getElementById("lead-gate");
    var saved = readLead();
    if (saved) {
      gate.querySelector("[name=lead_name]").value = saved.name;
      gate.querySelector("[name=lead_email]").value = saved.email;
    }
    var close = gate.querySelector(".lead-close");
    close.hidden = /\/checkout\/?$/i.test(window.location.pathname);
    gate.hidden = false;
    var nameInput = gate.querySelector("[name=lead_name]");
    if (!nameInput.value) nameInput.focus();
  }

  function whenReady(fn) {
    if (document.body) fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function checkoutHref(href) {
    var low = String(href || "").toLowerCase();
    if (
      low.indexOf("centerpag.com") === -1 &&
      low.indexOf("growaiclub.com") === -1 &&
      low.indexOf("syzehub.com") === -1
    ) {
      return "";
    }
    try {
      var abs = new URL(href, window.location.href);
      if (allowed(abs.href)) return abs.href;
    } catch (err) {}
    return CHECKOUT;
  }

  function buyText(node) {
    if (!node || node.nodeType !== 1) return false;
    var text = (node.textContent || "").replace(/\s+/g, " ").trim();
    if (!text || text.length > 80) return false;
    return /\$29|29\.90|UNLOCK|GET ACCESS|BUY NOW/i.test(text);
  }

  function inPlayer(nodes) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (!node || node.nodeType !== 1) continue;
      var tag = (node.tagName || "").toLowerCase();
      if (tag === "vturb-smartplayer") return true;
      if (node.id && node.id.indexOf("vid-") === 0) return true;
    }
    return false;
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
      var dest = checkoutHref(href);
      if (!dest && inPlayer(nodes)) {
        for (var j = 0; j < nodes.length && j < 6; j++) {
          if (buyText(nodes[j])) {
            dest = CHECKOUT;
            break;
          }
        }
      }
      if (!dest) return;
      e.preventDefault();
      e.stopPropagation();
      showForm(dest);
    },
    true
  );

  var to = new URLSearchParams(window.location.search).get("to");
  if (to && allowed(to)) {
    whenReady(function () {
      showForm(to);
    });
    return;
  }
  if (/\/checkout\/?$/i.test(window.location.pathname)) {
    whenReady(function () {
      document.documentElement.style.background = "#070b14";
      if (document.body) document.body.style.background = "#070b14";
      showForm(CHECKOUT);
    });
  }
})();
