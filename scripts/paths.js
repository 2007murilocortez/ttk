const path = require("path");

/** Raiz do repo = site publicado (Vercel). */
const siteRoot = process.env.SITE_DIR
  ? path.resolve(process.env.SITE_DIR)
  : path.join(__dirname, "..");

module.exports = { siteRoot };
