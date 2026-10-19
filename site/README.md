# Site estático (publicável)

Conteúdo servido na Vercel. **Não edite os bundles `_next/` manualmente** — use `npm run fix` na pasta `funil/`.

## Rotas

| Caminho | Descrição |
|---------|-----------|
| `/pv11/` | Presell |
| `/pv11/trading/` | Simulação de trades |
| `/pv11/vsl/` | VSL (VTurb) |
| `/pv11/withdraw/` | Saque (US) |
| `/back/` | Página pós-compra |

## Pastas

- `_next/` — assets do export Next.js
- `pv11/`, `back/` — páginas HTML do funil
- `audios/` — sons da UI
- `presell/` — imagens da presell
- `static-nav.js` — navegação full-page (export estático)
- Arquivos `.jpg` na raiz — avatares de depoimentos (paths fixos no bundle)

Config de deploy: `vercel.json` nesta pasta.
