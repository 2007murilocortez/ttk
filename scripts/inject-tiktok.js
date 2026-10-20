/**
 * Pixel do TikTok no <head> de cada página do funil.
 */
const fs = require("fs");
const path = require("path");
const { siteRoot } = require("./paths");

const PIXEL_ID = "DBBAUDJC77U6RJPJMOL0";

const SNIPPET =
  "<!-- TikTok Pixel Code Start -->" +
  "<script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=[\"page\",\"track\",\"identify\",\"instances\",\"debug\",\"on\",\"off\",\"once\",\"ready\",\"alias\",\"group\",\"enableCookie\",\"disableCookie\",\"holdConsent\",\"revokeConsent\",\"grantConsent\"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r=\"https://analytics.tiktok.com/i18n/pixel/events.js\",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement(\"script\");n.type=\"text/javascript\",n.async=!0,n.src=r+\"?sdkid=\"+e+\"&lib=\"+t;e=document.getElementsByTagName(\"script\")[0];e.parentNode.insertBefore(n,e)};ttq.load('" +
  PIXEL_ID +
  "');ttq.page();}(window,document,'ttq');</script>" +
  "<!-- TikTok Pixel Code End -->";

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (ent.name === "index.html") acc.push(full);
  }
  return acc;
}

let count = 0;
for (const file of walk(siteRoot)) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes(PIXEL_ID) || !html.includes("<head>")) continue;
  html = html.replace("<head>", "<head>" + SNIPPET);
  fs.writeFileSync(file, html);
  count++;
  console.log("tiktok:", path.relative(siteRoot, file));
}

console.log(`inject-tiktok: ${count} html`);
