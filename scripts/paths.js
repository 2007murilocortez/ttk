const path = require("path");

/** Pasta publicável do funil (HTML + _next + mídia). */
function resolveSiteRoot() {
  if (process.env.SITE_DIR) return path.resolve(process.env.SITE_DIR);
  const site = path.join(__dirname, "..", "site");
  const legacy = path.join(__dirname, "..", "growaiclub.com");
  const fs = require("fs");
  if (fs.existsSync(site)) return site;
  if (fs.existsSync(legacy)) return legacy;
  return site;
}

const siteRoot = resolveSiteRoot();

module.exports = { siteRoot };
