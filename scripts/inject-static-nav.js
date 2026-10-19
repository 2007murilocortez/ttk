const fs = require("fs");
const path = require("path");

const { siteRoot } = require("./paths");
const tag = '<script src="/static-nav.js" defer></script>';

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name === "index.html") {
      let html = fs.readFileSync(full, "utf8");
      if (html.includes("static-nav.js")) continue;
      const depth = path.relative(siteRoot, dir).split(path.sep).filter(Boolean).length;
      const prefix = depth ? "../".repeat(depth) : "./";
      const localTag = tag.replace('src="/static-nav.js"', `src="${prefix}static-nav.js"`);
      html = html.replace("</body>", localTag + "</body>");
      fs.writeFileSync(full, html);
      console.log("injected:", path.relative(siteRoot, full));
    }
  }
}

walk(siteRoot);
