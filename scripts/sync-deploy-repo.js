/**
 * Sincroniza funil/site → clone do repo de deploy (ex.: ../ttk-git/site).
 * Uso: node scripts/sync-deploy-repo.js [caminho-do-repo]
 */
const fs = require("fs");
const path = require("path");
const { siteRoot } = require("./paths");

const repoRoot = path.resolve(
  process.argv[2] || path.join(__dirname, "..", "..", "ttk-git")
);
const destSite = path.join(repoRoot, "site");

/** Entradas antigas na raiz do repo (deploy flat); removidas após migrar para site/. */
const LEGACY_REPO_ROOT = new Set([
  "_next",
  "pv11",
  "back",
  "presell",
  "audios",
  "favicon.ico",
  "serve.json",
  "static-nav.js",
  "vercel.json",
  "Mulher 01.jpg",
  "Mulher 02.jpg",
  "Mulher 03.jpg",
  "Mulher 04.jpg",
  "Mulher 05.jpg",
  "perfil3.jpg",
  "perfil4.jpg",
  "perfil5.jpg",
  "perfil6.jpg",
  "perfil7.jpg",
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

if (!fs.existsSync(siteRoot)) {
  console.error("Site não encontrado:", siteRoot);
  process.exit(1);
}

for (const name of fs.readdirSync(repoRoot)) {
  if (!LEGACY_REPO_ROOT.has(name)) continue;
  const full = path.join(repoRoot, name);
  fs.rmSync(full, { recursive: true, force: true });
  console.log("Removido legado na raiz do repo:", name);
}

fs.mkdirSync(destSite, { recursive: true });
copyDir(siteRoot, destSite);

const vercelSrc = path.join(siteRoot, "vercel.json");
if (!fs.existsSync(vercelSrc)) {
  const fallback = path.join(__dirname, "..", "..", "deploy-ttk", "vercel.json");
  if (fs.existsSync(fallback)) {
    fs.copyFileSync(fallback, path.join(destSite, "vercel.json"));
  }
}

const scriptNames = [
  "paths.js",
  "fix-static-next.js",
  "inject-static-nav.js",
  "sync-money-values.js",
  "sync-vsl-embed.js",
  "sync-deploy-repo.js",
];
const scriptsDest = path.join(repoRoot, "scripts");
fs.mkdirSync(scriptsDest, { recursive: true });
for (const name of scriptNames) {
  fs.copyFileSync(path.join(__dirname, name), path.join(scriptsDest, name));
}

const pkg = {
  name: "moneyclub-funnel-deploy",
  private: true,
  scripts: {
    fix: "node scripts/fix-static-next.js && node scripts/sync-money-values.js && node scripts/sync-vsl-embed.js && node scripts/inject-static-nav.js",
    sync: "node scripts/sync-deploy-repo.js",
  },
};
fs.writeFileSync(
  path.join(repoRoot, "package.json"),
  JSON.stringify(pkg, null, 2) + "\n"
);

const readme = `# ttk — funil estático

Site publicado na pasta \`site/\`. Na Vercel: **Root Directory = site**.

## Manutenção

Edite em \`projeto-moneyclub/funil/\`, rode \`npm run deploy:sync\` e faça push deste repo.

## Scripts (raiz)

\`npm run fix\` — reaplica patches em \`site/\` (útil se clonar só este repo).
`;
fs.writeFileSync(path.join(repoRoot, "README.md"), readme);

console.log("Deploy sync:", siteRoot, "→", destSite);
