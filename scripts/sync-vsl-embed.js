/**
 * Atualiza o player VTurb/ConverteAI da página /pv11/vsl/
 */
const fs = require("fs");
const path = require("path");

const { siteRoot: SITE } = require("./paths");

const REPLACEMENTS = [
  [
    'N="6a978120b173bb92f8fef13f",k="ab-".concat(N),S="https://scripts.converteai.net/".concat("1af34d35-3e7b-4734-8f04-d5ead575fea0","/ab-test/").concat(N,"/player.js");',
    'N="6ad67d19e83e4f336e01c906",k="vid-".concat(N),S="https://scripts.converteai.net/50ef5c18-6787-4abc-bbce-c80337f7015d/players/6ad67d19e83e4f336e01c906/v4/player.js";',
  ],
  [
    '(0,n.jsx)("link",{rel:"preload",href:"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js",as:"script"}),(0,n.jsx)("link",{rel:"dns-prefetch",href:"https://cdn.converteai.net"})',
    '(0,n.jsx)("link",{rel:"preload",href:"https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js",as:"script"}),(0,n.jsx)("link",{rel:"preload",href:"https://cdn.converteai.net/50ef5c18-6787-4abc-bbce-c80337f7015d/6ad67cfe58b3baf330519e78/main.m3u8",as:"fetch"}),(0,n.jsx)("link",{rel:"dns-prefetch",href:"https://cdn.converteai.net"})',
  ],
  [
    '(0,n.jsx)("link",{rel:"dns-prefetch",href:"https://m3u8.vturb.net"}),',
    "",
  ],
  [
    '(0,n.jsx)("vturb-smartplayer",{id:k,style:{display:"block",margin:"0 auto",width:"100%"}})',
    '(0,n.jsx)("vturb-smartplayer",{id:k,style:{display:"block",margin:"0 auto",width:"100%"},children:(0,n.jsx)("div",{className:"vturb-player-placeholder",style:{position:"relative",width:"100%",padding:"56.25% 0 0",zIndex:0,backgroundColor:"black"}})})',
  ],
  // HTML estático / RSC export (se presente)
  ["6a978120b173bb92f8fef13f", "6ad67d19e83e4f336e01c906"],
  ["ab-6a978120b173bb92f8fef13f", "vid-6ad67d19e83e4f336e01c906"],
  [
    "1af34d35-3e7b-4734-8f04-d5ead575fea0/ab-test/6a978120b173bb92f8fef13f",
    "50ef5c18-6787-4abc-bbce-c80337f7015d/players/6ad67d19e83e4f336e01c906/v4",
  ],
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
    if (!from || !text.includes(from)) continue;
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
  `sync-vsl-embed: ${totalSubs} substituição(ões) em ${filesTouched} arquivo(s).`
);
