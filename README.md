# EMS — site da Emilly Silva

Site portfólio da Emilly Silva (@itsemsdesign). Vite + HTML/CSS/JS puro + GSAP + Lenis.

- **No ar:** https://cauadorn.github.io/ems-site/
- **Repositório:** https://github.com/Cauadorn/ems-site
- **Publicação:** cada push na `main` gera e publica o site sozinho (GitHub Actions → GitHub Pages,
  `.github/workflows/deploy.yml`, com `BASE_PATH=/ems-site/`). Localmente o site roda na raiz `/`.
  Imagem da pasta `public` no JS usa `import.meta.env.BASE_URL`; no HTML, `%BASE_URL%`.

## Rodar
Computador novo: cole no Claude Code o texto de `docs/instalar-no-computador.md` (ele instala e abre tudo sozinho).

Na Vercel / no GitHub (ou em qualquer máquina fora do Drive):

    npm install
    npm run dev      # desenvolvimento
    npm run build    # gera dist/

**Nesta máquina:** esta pasta fica no Google Drive, então o `node_modules` NÃO fica aqui. O motor é
`D:\Dev\ems-site` (node_modules + junção `site` → esta pasta). Rodar: `cd D:\Dev\ems-site && npx vite` (porta 5178).

## Como adicionar um projeto
1. Gere a capa (1600×1000) e a prévia de link (og.jpg):
   `python scripts/nova-capa.py "caminho/da/imagem.jpg" meu-projeto` (use `--topo` ou `--base` para escolher o recorte)
2. Coloque a apresentação (a do Behance) em `public/img/projetos/meu-projeto/` como `slide-01.webp`, `slide-02.webp`…
   (1600 px de largura; `scripts/prepare-images.py` fatia uma imagem comprida).
3. Abra `src/data/projects.js` e copie um bloco `{ ... }`, trocando `slug` (o mesmo do passo 1), `title`,
   `category`, `detail`, `year` e `behance` (link, ou `null`). Use `soon: true` para mostrar como "em breve".
4. Pronto: o projeto aparece no carrossel e na lista, na ordem da lista, e ganha sozinho a página
   `projetos/meu-projeto.html` (`scripts/gerar-cases.mjs`, roda junto com o site).

O carrossel é um anel com **no mínimo 8 posições** (como o da Pixel). Enquanto houver menos de 8 projetos,
as posições livres aparecem como cartões "próximo projeto / vaga aberta" do outro lado do anel.
Um projeto novo ocupa uma vaga; a partir do 9º, o anel cresce sozinho. O número fica em
`MIN_SLOTS` em `src/js/modules/carousel.js`.

## Design system (para passar a outra pessoa ou outro Claude)
Pacote em `docs/design-system/`: `DESIGN-SYSTEM.md` (regras), `tokens.json` (valores), `assets/` (selo e ícones) e
`EMS-Design-System.pdf` (16 páginas). Passo a passo e texto pronto para colar no outro Claude: `docs/design-system/README.md`.
Zip para enviar: `Clientes\EMI\EMS-design-system.zip`.

## Onde mexer
- Projetos: `src/data/projects.js` (o layout das páginas de case fica em `scripts/gerar-cases.mjs` e `src/styles/case.css`)
- Contato (WhatsApp, Instagram, e-mail, Behance): `partials/contact.html` (vale para a home e para os cases);
  WhatsApp e Instagram também no menu do celular (`partials/header.html`) e no rodapé (`partials/footer.html`)
- Cores, fontes, espaçamentos: `src/styles/tokens.css`
- Textos: `index.html`
- Selo EMS: `src/assets/illustrations/selo-ems.svg` — arte ORIGINAL da Emilly, não redesenhar
- Ícones da marca (espiral, cereja, XOXO, brilho, estrela em retícula, coração, cursor): `partials/icons.html`
- Imagens: `public/img/` (WebP). Regerar as do Behance: `python scripts/prepare-images.py <pasta_behance>`

## Estado (01/10/2026)
Pronto:
- Home: abertura (selo + contador + cortinas), hero no estilo Pixel (logo EMS em caixas, selo, frase entrando pelos
  lados, etiquetas arrastáveis), faixas, carrossel 3D igual ao da Pixel (anel circular girado pela rolagem, painéis
  de 100vh, setas que rolam) + modo lista, "como eu penso design", serviços, processo, sobre (CPF × CNPJ), contato
  com easter egg, rodapé. Referência técnica da Pixel em `docs/referencia-pixel.md`.
- Build com várias páginas e trechos reaproveitados (`<!-- @include partials/x.html -->`) em `vite.config.js`.
- Páginas de case `projetos/<slug>.html` (geradas de `src/data/projects.js` + slides; os cards do carrossel e da
  lista abrem o case, e o case leva ao Behance), página `404.html`.
- Prévia de link no WhatsApp/Instagram (`public/img/og.jpg` e `og.jpg` de cada projeto), favicon PNG e ícone da tela
  inicial do celular. Endereço do site no ar para essas prévias: `SITE_URL` em `vite.config.js`.
- Corrigido em 01/10: foto do "Sobre" esticada; botões e links com pelo menos 44 px de altura no celular.

Falta:
- Texto de cada case escrito pela Emilly (hoje o case mostra a apresentação do Behance, que já tem o texto).
- `brandbook.html` (definir com a Emilly o que entra).
- Gatinho (ilustração do Instagram) em SVG.

## Sistema visual (base Behance "EMS Personal Brand" + Instagram atual)
Cores: Ivory #FFFBDE · Ameixa #3D1C46 · Violeta #6225D8 (selo: #6125D9) · Lavanda #C0A5C4 · Wine #9E122C · Pink #DD34A8 · Manteiga #F2CF7A
Fontes: Anton (títulos), Instrument Serif itálico (voz), Inter (texto) — self-hosted via @fontsource.

## Pendências com a cliente
- **Cobrar da Emilly (ela pediu):** um resumo curto de cada projeto. Quando ela mandar, entra no campo `resumo` de
  cada projeto em `src/data/projects.js` e aparece no topo do case.
- ALMAH entra no portfólio, mas o case só sai quando o brand book da ALMAH ficar pronto (hoje: logo, rótulos,
  fotos das velas e um vídeo). Até lá fica "em breve" (`soon: true`).
- Página de brand book (`brandbook.html`): definir o que entra.

Resolvido em 01/10: WhatsApp (31) 99271-8754, e-mail contatoemillyss@gmail.com, formação em Design Gráfico pela UNA.
