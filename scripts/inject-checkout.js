/**
 * Carrega o redirecionamento de checkout em todas as páginas do funil.
 */
const fs = require("fs");
const path = require("path");
const { siteRoot } = require("./paths");

const TAG = '<script src="/checkout.js"></script>';

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name === "index.html") {
      let html = fs.readFileSync(full, "utf8");
      if (html.includes('src="/checkout.js"') || !html.includes("<head>")) continue;
      html = html.replace("<head>", "<head>" + TAG);
      fs.writeFileSync(full, html);
      console.log("checkout:", path.relative(siteRoot, full));
    }
  }
}

walk(siteRoot);
