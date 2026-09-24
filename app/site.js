'use strict';
const config=window.DECLIC_CONFIG;
const euro=n=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const offer=document.body.dataset.offer;
const dialog=document.querySelector('#purchase-preview');
const routes={front:'/app/up1/',up1:'/app/up2/',up2:'/app/up3/',up3:'/app/merci/',downsell:'/app/merci/'};
const allowedUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'&&(['digistore24.com','www.digistore24.com','app.digistore24.com'].includes(u.hostname)||u.hostname.endsWith('.digistore24.com'));}catch{return false;}};
document.querySelectorAll('[data-price]').forEach(el=>{const o=config.offers[el.dataset.price];if(o)el.textContent=euro(o.price)});
if(!config.preview)document.querySelectorAll('.preview').forEach(el=>el.remove());
if(config.supportEmail){document.querySelectorAll('[data-support]').forEach(el=>{el.textContent=config.supportEmail;el.href='mailto:'+config.supportEmail;el.classList.remove('status-missing')})}
for(const [selector,key] of [['[data-publisher]','publisherName'],['[data-address]','publisherAddress'],['[data-registration]','publisherRegistration']]){
 if(config[key])document.querySelectorAll(selector).forEach(el=>el.textContent=config[key]);
}
document.querySelectorAll('[data-buy],[data-decline]').forEach(btn=>{
 btn.addEventListener('click',ev=>{
  const key=btn.dataset.buy||btn.dataset.decline||offer;
  const item=config.offers[key];const decline=btn.hasAttribute('data-decline');const url=item?.[decline?'noUrl':'buyUrl'];
  if(!config.preview&&allowedUrl(url)){return;}
  ev.preventDefault();
  const next=document.querySelector('#preview-next');
  if(next){next.href=routes[key]||'/app/';next.textContent=key==='up3'||key==='downsell'?'Voir la page de livraison':'Voir la page suivante';}
  if(dialog){dialog.querySelector('h2').textContent=config.preview?'Aperçu du parcours':'Commande indisponible';dialog.querySelector('[data-dialog-text]').textContent=config.preview?'Aucun paiement ne sera effectué. Les boutons Digistore24 seront activés après la configuration des produits. Vous pouvez consulter la page suivante pour vérifier le parcours.':'La commande n’est pas encore ouverte. Revenez plus tard pour consulter sa disponibilité.';if(next)next.hidden=!config.preview;dialog.showModal();}
 });
 const key=btn.dataset.buy||btn.dataset.decline;const item=config.offers[key];const url=item?.[btn.hasAttribute('data-decline')?'noUrl':'buyUrl'];
 if(!config.preview&&allowedUrl(url)&&btn.tagName==='A')btn.href=url;
});
document.querySelectorAll('[data-close-dialog]').forEach(el=>el.addEventListener('click',()=>dialog.close()));
if(dialog)dialog.addEventListener('click',ev=>{if(ev.target===dialog){const r=dialog.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)dialog.close()}});
// Use only the actual JavaScript URL provided by the Digistore24 Conversion Cockpit.
// It owns the transactional session; local preview navigation never creates a purchase.
if(!config.preview&&offer&&config.offers[offer]?.integrationScript){
 const src=config.offers[offer].integrationScript;
 if(allowedUrl(src)){const s=document.createElement('script');s.src=src;s.async=false;document.head.appendChild(s);}
}
