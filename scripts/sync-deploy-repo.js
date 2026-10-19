/**
 * Sincroniza funil/site → raiz do repo de deploy (Vercel publica a raiz, não site/).
 * Uso: node scripts/sync-deploy-repo.js [caminho-do-repo]
 */
const fs = require("fs");
const path = require("path");
const { siteRoot } = require("./paths");

const repoRoot = path.resolve(
  process.argv[2] || path.join(__dirname, "..", "..", "ttk-git")
);

/** Não sobrescrever metadados do repo Git. */
const REPO_KEEP = new Set([
  ".git",
  ".gitignore",
  "scripts",
  "package.json",
  "README.md",
  "node_modules",
]);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function rmIfExists(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

if (!fs.existsSync(siteRoot)) {
  console.error("Site não encontrado:", siteRoot);
  process.exit(1);
}

function publishSiteTo(destRoot) {
  for (const ent of fs.readdirSync(siteRoot, { withFileTypes: true })) {
    const from = path.join(siteRoot, ent.name);
    const to = path.join(destRoot, ent.name);
    rmIfExists(to);
    if (ent.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
  const vercelSrc = path.join(siteRoot, "vercel.json");
  if (fs.existsSync(vercelSrc)) {
    fs.copyFileSync(vercelSrc, path.join(destRoot, "vercel.json"));
  }
}

// Raiz (padrão Vercel) + site/ (se Root Directory = site no painel).
publishSiteTo(repoRoot);
const nested = path.join(repoRoot, "site");
rmIfExists(nested);
publishSiteTo(nested);

const scriptNames = [
  "paths.js",
  "fix-static-next.js",
  "inject-static-nav.js",
  "sync-money-values.js",
  "sync-vsl-embed.js",
  "sync-deploy-repo.js",
  "inject-utmify.js",
];
const scriptsDest = path.join(repoRoot, "scripts");
fs.mkdirSync(scriptsDest, { recursive: true });
for (const name of scriptNames) {
  if (name === "paths.js") {
    const deployPaths = `const path = require("path");

/** Raiz do repo = site publicado (Vercel). */
const siteRoot = process.env.SITE_DIR
  ? path.resolve(process.env.SITE_DIR)
  : path.join(__dirname, "..");

module.exports = { siteRoot };
`;
    fs.writeFileSync(path.join(scriptsDest, name), deployPaths);
  } else {
    fs.copyFileSync(path.join(__dirname, name), path.join(scriptsDest, name));
  }
}

const pkg = {
  name: "moneyclub-funnel-deploy",
  private: true,
  scripts: {
    fix: "node scripts/fix-static-next.js && node scripts/sync-money-values.js && node scripts/sync-vsl-embed.js && node scripts/inject-static-nav.js && node scripts/inject-utmify.js",
    sync: "node scripts/sync-deploy-repo.js",
  },
};
fs.writeFileSync(
  path.join(repoRoot, "package.json"),
  JSON.stringify(pkg, null, 2) + "\n"
);

const readme = `# ttk — funil estático

Arquivos do funil na **raiz** e cópia em \`site/\` (funciona com ou sem Root Directory na Vercel).

## Manutenção

Edite em \`projeto-moneyclub/funil/\`, rode \`npm run deploy:sync\` e faça push.

\`npm run fix\` — reaplica patches nos arquivos da raiz.
`;
fs.writeFileSync(path.join(repoRoot, "README.md"), readme);

console.log("Deploy sync:", siteRoot, "→", repoRoot);
