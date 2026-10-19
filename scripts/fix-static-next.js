const fs = require("fs");
const path = require("path");

const { siteRoot } = require("./paths");
const nextStatic = path.join(siteRoot, "_next", "static");
const DPL = "_dpl=dpl_5qvmg8KcPAEukPos56R5oYe9Eaxn";

/** Create copies without _dpl=... suffix so runtime can load /_next/static/.../file.js?dpl= */
function aliasNextAssets(dir) {
  let count = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      count += aliasNextAssets(full);
      continue;
    }
    if (!ent.name.includes(DPL)) continue;
    const canonical = ent.name.replace(DPL, "");
    const dest = path.join(dir, canonical);
    fs.copyFileSync(full, dest);
    count++;
  }
  return count;
}

/** Replace client router.push/replace with full page loads (static export has no RSC server). */
function patchRouterNavigation(dir) {
  let files = 0;
  let repl = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const r = patchRouterNavigation(full);
      files += r.files;
      repl += r.repl;
      continue;
    }
    if (!ent.name.endsWith(".js")) continue;
    let text = fs.readFileSync(full, "utf8");
    const before = text;
    const navToLocation = (m, url) => {
      repl++;
      return `&&(window.location.href=${url})`;
    };
    text = text.replace(/\.push\((\"\/[^\"]+\")\)/g, navToLocation);
    text = text.replace(/\.push\((\'\/[^\']+\')\)/g, navToLocation);
    text = text.replace(/\.replace\((\"\/[^\"]+\")\)/g, navToLocation);
    text = text.replace(/\.replace\((\'\/[^\']+\')\)/g, navToLocation);
    if (text.includes('return"?dpl=dpl_5qvmg8KcPAEukPos56R5oYe9Eaxn"')) {
      text = text.replace(
        /return"\?dpl=dpl_5qvmg8KcPAEukPos56R5oYe9Eaxn"/g,
        'return""'
      );
      repl++;
    }
    if (text !== before) {
      fs.writeFileSync(full, text);
      files++;
    }
  }
  return { files, repl };
}

/** HTML still points at _dpl= filenames; canonical copies exist without suffix. */
function normalizeHtmlAssets(dir) {
  const enc = "_dpl%3Ddpl_5qvmg8KcPAEukPos56R5oYe9Eaxn";
  const dplQuery = "?dpl=dpl_5qvmg8KcPAEukPos56R5oYe9Eaxn";
  let count = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) count += normalizeHtmlAssets(full);
    else if (ent.name === "index.html") {
      let html = fs.readFileSync(full, "utf8");
      const next = html
        .split(enc)
        .join("")
        .split(dplQuery)
        .join("");
      if (next === html) continue;
      fs.writeFileSync(full, next);
      count++;
    }
  }
  return count;
}

const patched = patchRouterNavigation(path.join(nextStatic, "chunks"));
const aliases = aliasNextAssets(nextStatic);
const htmlFixed = normalizeHtmlAssets(siteRoot);

console.log("Arquivos JS patchados:", patched.files, "substituicoes:", patched.repl);
console.log("Aliases sincronizados:", aliases);
console.log("HTML com assets normalizados:", htmlFixed);
