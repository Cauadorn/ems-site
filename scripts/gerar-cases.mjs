// Gera uma página de case por projeto de src/data/projects.js: projetos/<slug>.html.
// Roda sozinho toda vez que o site abre ou é publicado (vite.config.js), e também à mão: node scripts/gerar-cases.mjs
// Para mudar o layout de TODAS as páginas de case, edite este arquivo (estilos em src/styles/case.css).
// Não edite os projetos/*.html: eles são refeitos a cada vez.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const MARCA = '<!-- gerado por scripts/gerar-cases.mjs: edite src/data/projects.js, não este arquivo -->';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nn = (n) => String(n).padStart(2, '0');

// largura e altura de um .webp lendo só o cabeçalho (evita a página "pular" enquanto as imagens carregam)
function webpSize(file) {
  const b = readFileSync(file);
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const [b0, b1, b2, b3] = b.subarray(21, 25);
    return { w: 1 + (((b1 & 0x3f) << 8) | b0), h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
  }
  throw new Error(`não consegui ler o tamanho de ${file}`);
}

function page(p, i, total, next, slides) {
  const t = esc(p.title);
  const url = `%SITE_URL%projetos/${p.slug}.html`;
  const img = (f) => `%BASE_URL%img/projetos/${p.slug}/${f}`;
  const og = existsSync(slides.dir + '/og.jpg') ? `%SITE_URL%img/projetos/${p.slug}/og.jpg` : '%SITE_URL%img/og.jpg';
  return `<!doctype html>
${MARCA}
<html lang="pt-BR">
<head>
<!-- @include partials/head.html -->
  <title>${t} — ${esc(p.category)} | Emilly Silva</title>
  <meta name="description" content="${t} — ${esc(p.detail)}. Projeto de ${esc(p.category.toLowerCase())} de Emilly Silva, designer gráfica e UX/UI em Belo Horizonte.">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${t} — ${esc(p.category)} | Emilly Silva">
  <meta property="og:description" content="${esc(p.detail)}.">
  <meta property="og:image" content="${og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <script type="module" src="/src/js/page.js"></script>
</head>
<body id="topo">
<!-- @include partials/icons.html -->
<!-- @include partials/header.html -->

<main id="conteudo">
  <section class="case-hero" aria-labelledby="case-titulo">
    <div class="case-hero__inner container">
      <a class="case-back" href="%BASE_URL%#projetos" data-intro><svg aria-hidden="true"><use href="#i-seta"/></svg> Todos os projetos</a>
      <p class="eyebrow" data-intro>(${nn(i + 1)}/${nn(total)}) ${esc(p.category)} · ${esc(p.year)}</p>
      <h1 id="case-titulo" class="case-hero__title" data-intro>${t}</h1>
      <p class="case-hero__lead" data-intro>${esc(p.detail)}</p>
${p.resumo ? `      <p class="case-hero__text" data-intro>${esc(p.resumo)}</p>
` : ''}    </div>
    <figure class="case-cover" data-intro>
      <div class="frame">
        <span class="frame__h frame__h--tl"></span><span class="frame__h frame__h--tr"></span>
        <span class="frame__h frame__h--bl"></span><span class="frame__h frame__h--br"></span>
        <img src="${img('capa.webp')}" alt="${t}: capa do projeto" width="1600" height="1000">
      </div>
    </figure>
  </section>

  <section class="case-body" aria-label="Apresentação do projeto">
    <div class="case-slides">
${slides.list.map((s, k) => `      <img src="${img(s.file)}" alt="${t}: apresentação, parte ${k + 1} de ${slides.list.length}" width="${s.w}" height="${s.h}"${k ? ' loading="lazy"' : ''} decoding="async">`).join('\n')}
    </div>
${p.behance ? `    <p class="case-behance"><a class="btn btn--ghost" href="${esc(p.behance)}" target="_blank" rel="noopener"><svg><use href="#i-behance"/></svg> Ver também no Behance</a></p>\n` : ''}  </section>

  <a class="case-next" href="%BASE_URL%projetos/${next.slug}.html" data-cursor-text="próximo">
    <span class="case-next__inner container">
      <span class="eyebrow">Próximo projeto</span>
      <span class="case-next__title">${esc(next.title)} <svg aria-hidden="true"><use href="#i-seta"/></svg></span>
      <span class="case-next__cat">${esc(next.category)} · ${esc(next.detail)}</span>
      <img class="case-next__thumb" src="%BASE_URL%img/projetos/${next.slug}/capa.webp" alt="" width="1600" height="1000" loading="lazy">
    </span>
  </a>

<!-- @include partials/contact.html -->
</main>

<!-- @include partials/footer.html -->
</body>
</html>
`;
}

export function gerarCases(root, projects) {
  const dir = resolve(root, 'projetos');
  mkdirSync(dir, { recursive: true });
  const cases = projects.filter((p) => !p.soon);
  const feitos = new Set();

  cases.forEach((p, i) => {
    const imgDir = resolve(root, 'public/img/projetos', p.slug);
    const files = existsSync(imgDir) ? readdirSync(imgDir).filter((f) => /^slide-\d+\.webp$/.test(f)).sort() : [];
    if (!files.length) console.warn(`[cases] ${p.slug}: nenhuma imagem slide-01.webp em public/img/projetos/${p.slug}/`);
    const slides = { dir: imgDir, list: files.map((file) => ({ file, ...webpSize(resolve(imgDir, file)) })) };
    const html = page(p, i, cases.length, cases[(i + 1) % cases.length], slides);
    const out = resolve(dir, `${p.slug}.html`);
    // só grava se mudou: assim o servidor não recarrega à toa
    if (!existsSync(out) || readFileSync(out, 'utf-8') !== html) writeFileSync(out, html);
    feitos.add(`${p.slug}.html`);
  });

  // projeto que saiu da lista (ou virou "em breve") perde a página; páginas feitas à mão ficam
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.html') && !feitos.has(f) && readFileSync(resolve(dir, f), 'utf-8').includes(MARCA)) rmSync(resolve(dir, f));
  }
}

// node scripts/gerar-cases.mjs
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  // sem await no topo: este arquivo também é carregado pelo vite.config.js
  import(pathToFileURL(resolve(root, 'src/data/projects.js')).href).then(({ projects }) => {
    gerarCases(root, projects);
    console.log('ok: páginas de case em projetos/');
  });
}
