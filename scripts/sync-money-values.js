/**
 * Funil pv11 — USD $50, três modos alinhados:
 *
 * - Trades (soma dos % das operations): 102,86% → +$51,43 → saldo de sessão $101,43 (header)
 * - Modal / saque (totalProfit %): 151,14% → +$75,57 → US$50 → US$125,57
 *
 * Safe: 5 vitórias | Moderate: 2 vitórias | Max: 3 vitórias, 2 perdas (mesmo saldo final de sessão)
 */
const fs = require("fs");
const path = require("path");

const { siteRoot: SITE } = require("./paths");

const REPLACEMENTS = [
  [
    'safe:{id:"safe",label:"Safe Gains",short:"Safe",estimatedGain:70.36,accuracy:96,wins:5,losses:0,operations:[{profit:14.24,isWin:!0},{profit:11.66,isWin:!0},{profit:19.36,isWin:!0},{profit:12.74,isWin:!0},{profit:12.36,isWin:!0}],totalProfit:70.36}',
    'safe:{id:"safe",label:"Safe Gains",short:"Safe",estimatedGain:151.14,accuracy:96,wins:5,losses:0,operations:[{profit:20.82,isWin:!0},{profit:17.05,isWin:!0},{profit:28.31,isWin:!0},{profit:18.63,isWin:!0},{profit:18.05,isWin:!0}],totalProfit:151.14}',
  ],
  [
    'moderate:{id:"moderate",label:"Moderate Gains",short:"Moderate",estimatedGain:102.86,accuracy:92,wins:4,losses:1,operations:[{profit:49.68,isWin:!0},{profit:30.28,isWin:!0},{profit:40.92,isWin:!0},{profit:-27.82,isWin:!1},{profit:9.8,isWin:!0}],totalProfit:102.86}',
    'moderate:{id:"moderate",label:"Moderate Gains",short:"Moderate",estimatedGain:151.14,accuracy:100,wins:2,losses:0,operations:[{profit:50.36,isWin:!0},{profit:52.5,isWin:!0}],totalProfit:151.14}',
  ],
  [
    'max:{id:"max",label:"Maximum Gains",short:"Max",estimatedGain:151.14,accuracy:82,wins:3,losses:2,operations:[{profit:50.36,isWin:!0},{profit:-22.32,isWin:!1},{profit:59.88,isWin:!0},{profit:68.92,isWin:!0},{profit:-5.7,isWin:!1}],totalProfit:151.14}',
    'max:{id:"max",label:"Maximum Gains",short:"Max",estimatedGain:151.14,accuracy:82,wins:3,losses:2,operations:[{profit:34.31,isWin:!0},{profit:-15.19,isWin:!1},{profit:40.79,isWin:!0},{profit:46.84,isWin:!0},{profit:-3.89,isWin:!1}],totalProfit:151.14}',
  ],
  [
    'max:{id:"max",label:"Maximum Gains",short:"Max",estimatedGain:151.14,accuracy:82,wins:3,losses:2,operations:[{profit:34.31,isWin:!0},{profit:-15.19,isWin:!1},{profit:40.79,isWin:!0},{profit:45.84,isWin:!0},{profit:-3.89,isWin:!1}],totalProfit:151.14}',
    'max:{id:"max",label:"Maximum Gains",short:"Max",estimatedGain:151.14,accuracy:82,wins:3,losses:2,operations:[{profit:34.31,isWin:!0},{profit:-15.19,isWin:!1},{profit:40.79,isWin:!0},{profit:46.84,isWin:!0},{profit:-3.89,isWin:!1}],totalProfit:151.14}',
  ],
  ["?a:51.43", "?a:75.57"],
  ['l?"100.00":"101.43"', 'l?"50.00":"101.43"'],
];

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name.endsWith(".js") || ent.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

let filesTouched = 0;
let totalSubs = 0;

for (const file of walk(SITE)) {
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of REPLACEMENTS) {
    if (!text.includes(from)) continue;
    const n = text.split(from).length - 1;
    text = text.split(from).join(to);
    totalSubs += n;
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, text);
    filesTouched++;
  }
}

console.log(
  `sync-money-values: ${totalSubs} substituição(ões) em ${filesTouched} arquivo(s).`
);

const verify = (name, ops) => {
  const sum = ops.reduce((a, b) => a + b, 0);
  const dollars = (sum / 100) * 50;
  console.log(
    `  ${name}: ops=${sum.toFixed(2)}% → sessão $${(50 + dollars).toFixed(2)}`
  );
};
verify("safe", [20.82, 17.05, 28.31, 18.63, 18.05]);
verify("moderate", [50.36, 52.5]);
verify("max", [34.31, -15.19, 40.79, 46.84, -3.89]);
console.log("  modal/saque: totalProfit 151.14% → $125.57");

if (!filesTouched) {
  console.warn("Aviso: nenhum arquivo alterado (já aplicado ou padrão mudou).");
}
