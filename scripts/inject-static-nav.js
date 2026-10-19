const fs = require("fs");
const path = require("path");

const { siteRoot } = require("./paths");
/** Runs before Next — blocks soft navigation on static export. */
const headTag = '<script src="/static-nav.js"></script>';

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name === "index.html") {
      let html = fs.readFileSync(full, "utf8");
      html = html.replace(
        /<script src="[^"]*static-nav\.js" defer><\/script>/g,
        ""
      );
      html = html.replace(/<script src="[^"]*static-nav\.js"><\/script>/g, "");
      if (html.includes('src="/static-nav.js"')) continue;
      if (html.includes("<head>")) {
        html = html.replace("<head>", "<head>" + headTag);
      } else {
        html = html.replace("</body>", headTag + "</body>");
      }
      fs.writeFileSync(full, html);
      console.log("injected:", path.relative(siteRoot, full));
    }
  }
}

walk(siteRoot);
