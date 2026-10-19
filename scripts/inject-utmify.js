/**
 * Coloca os dois scripts da Utmify no <head> de cada página do funil.
 * O bundle do Next também injeta esses scripts depois da hidratação;
 * o guard evita carregar pixel.js e latest.js duas vezes.
 */
const fs = require("fs");
const path = require("path");
const { siteRoot } = require("./paths");

const SNIPPET =
  '<script src="https://cdn.utmify.com.br/scripts/utms/latest.js" data-utmify-prevent-xcod-sck="" data-utmify-prevent-subids="" async="" defer=""></script>' +
  '<script>window.pixelId="6a94ceb5ac72517e00c1d79f";</script>' +
  '<script src="https://cdn.utmify.com.br/scripts/pixel/pixel.js" async="" defer=""></script>';

const GUARDS = [
  [
    "(function(){var v_h=atob",
    "(function(){if(document.querySelector(\"script[src*=\\'pixel/pixel.js\\']\"))return;var v_h=atob",
  ],
  [
    "(function(){var w_akkb=atob",
    "(function(){if(document.querySelector(\"script[src*=\\'utms/latest.js\\']\"))return;var w_akkb=atob",
  ],
  [
    "(function(){if(document.querySelector('script[src*=\"pixel/pixel.js\"]'))return;var v_h=atob",
    "(function(){if(document.querySelector(\"script[src*=\\'pixel/pixel.js\\']\"))return;var v_h=atob",
  ],
  [
    "(function(){if(document.querySelector('script[src*=\"utms/latest.js\"]'))return;var w_akkb=atob",
    "(function(){if(document.querySelector(\"script[src*=\\'utms/latest.js\\']\"))return;var w_akkb=atob",
  ],
];

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

let htmlCount = 0;
let jsCount = 0;

for (const file of walk(siteRoot)) {
  if (file.endsWith(`${path.sep}index.html`)) {
    let html = fs.readFileSync(file, "utf8");
    if (html.includes("cdn.utmify.com.br/scripts/pixel/pixel.js")) continue;
    if (!html.includes("<head>")) continue;
    html = html.replace("<head>", "<head>" + SNIPPET);
    fs.writeFileSync(file, html);
    htmlCount++;
    console.log("utmify:", path.relative(siteRoot, file));
    continue;
  }
  if (!file.endsWith(".js")) continue;
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of GUARDS) {
    if (!text.includes(from) || text.includes(to)) continue;
    text = text.split(from).join(to);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, text);
    jsCount++;
  }
}

console.log(`inject-utmify: ${htmlCount} html, ${jsCount} js`);
