# EMS — site da Emilly Silva

Site portfólio da Emilly Silva (@itsemsdesign). Vite + HTML/CSS/JS puro + GSAP + Lenis. Deploy: Vercel (detecta Vite sozinho).

## Rodar
Na Vercel / no GitHub (ou em qualquer máquina fora do Drive):

    npm install
    npm run dev      # desenvolvimento
    npm run build    # gera dist/

**Nesta máquina:** esta pasta fica no Google Drive, então o `node_modules` NÃO fica aqui. O motor é
`D:\Dev\ems-site` (node_modules + junção `site` → esta pasta). Rodar: `cd D:\Dev\ems-site && npx vite` (porta 5178).

## Como adicionar um projeto
1. Gere a capa (1600×1000):
   `python scripts/nova-capa.py "caminho/da/imagem.jpg" meu-projeto` (use `--topo` ou `--base` para escolher o recorte)
2. Abra `src/data/projects.js` e copie um bloco `{ ... }`, trocando `slug` (o mesmo do passo 1), `title`,
   `category`, `detail`, `year` e `link` (Behance, ou `null` para "em breve").
3. Pronto: o projeto aparece no carrossel e na lista, na ordem da lista.

O carrossel é um anel com **no mínimo 8 posições** (como o da Pixel). Enquanto houver menos de 8 projetos,
as posições livres aparecem como cartões "próximo projeto / vaga aberta" do outro lado do anel.
Um projeto novo ocupa uma vaga; a partir do 9º, o anel cresce sozinho. O número fica em
`MIN_SLOTS` em `src/js/modules/carousel.js`.

## Design system (para passar a outra pessoa ou outro Claude)
Pacote em `docs/design-system/`: `DESIGN-SYSTEM.md` (regras), `tokens.json` (valores), `assets/` (selo e ícones) e
`EMS-Design-System.pdf` (16 páginas). Passo a passo e texto pronto para colar no outro Claude: `docs/design-system/README.md`.
Zip para enviar: `Clientes\EMI\EMS-design-system.zip`.

## Onde mexer
- Projetos: `src/data/projects.js`
- Cores, fontes, espaçamentos: `src/styles/tokens.css`
- Textos: `index.html`
- Selo EMS: `src/assets/illustrations/selo-ems.svg` — arte ORIGINAL da Emilly, não redesenhar
- Ícones da marca (espiral, cereja, XOXO, brilho, estrela em retícula, coração, cursor): `partials/icons.html`
- Imagens: `public/img/` (WebP). Regerar as do Behance: `python scripts/prepare-images.py <pasta_behance>`

## Estado (30/09/2026)
Pronto:
- Home: abertura (selo + contador + cortinas), hero no estilo Pixel (logo EMS em caixas, selo, frase entrando pelos
  lados, etiquetas arrastáveis), faixas, carrossel 3D igual ao da Pixel (anel circular girado pela rolagem, painéis
  de 100vh, setas que rolam) + modo lista, "como eu penso design", serviços, processo, sobre (CPF × CNPJ), contato
  com easter egg, rodapé. Referência técnica da Pixel em `docs/referencia-pixel.md`.
- Build com várias páginas e trechos reaproveitados (`<!-- @include partials/x.html -->`) em `vite.config.js`.

Falta:
- Páginas de case `projetos/*.html` (hoje os cards abrem o Behance), `brandbook.html`, `404.html`.
- Gatinho (ilustração do Instagram) em SVG.

## Sistema visual (base Behance "EMS Personal Brand" + Instagram atual)
Cores: Ivory #FFFBDE · Ameixa #3D1C46 · Violeta #6225D8 (selo: #6125D9) · Lavanda #C0A5C4 · Wine #9E122C · Pink #DD34A8 · Manteiga #F2CF7A
Fontes: Anton (títulos), Instrument Serif itálico (voz), Inter (texto) — self-hosted via @fontsource.

## Pendências com a cliente
- Confirmar se ALMAH entra no portfólio; WhatsApp; e-mail atual (Behance mostra contact.emsdesigner@gmail.com);
  formação para o "sobre".
