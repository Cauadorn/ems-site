// Gera, a partir de src/data/projects.js, uma página de case por projeto (projetos/<slug>.html) e a página
// "Todos os projetos" separada por área (projetos/index.html).
// Roda sozinho toda vez que o site abre ou é publicado (vite.config.js), e também à mão: node scripts/gerar-cases.mjs
// Para mudar o layout de TODAS as páginas de case, edite este arquivo (estilos em src/styles/case.css).
// Não edite os projetos/*.html: eles são refeitos a cada vez.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// "versão" de cada capa (pedaço do hash do arquivo): vai no endereço da imagem (capa.webp?v=…) para o navegador
// buscar a capa nova quando ela é trocada, em vez de mostrar a antiga guardada (pedido da Emilly em 02/10)
export function versoesDasCapas(root, projects) {
  const v = {};
  for (const p of projects) {
    const f = resolve(root, 'public/img/projetos', p.slug, 'capa.webp');
    if (existsSync(f)) v[p.slug] = createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8);
  }
  return v;
}
let VERSOES = {};
const capa = (slug) => `%BASE_URL%img/projetos/${slug}/capa.webp${VERSOES[slug] ? `?v=${VERSOES[slug]}` : ''}`;

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

// imagens do case: apresentação empilhada, galeria de fotos/páginas, ou posts de rede social (anel 3D + carrosséis + stories)
function galeria(p, t, list, img) {
  const tag = (s, k, n, nome, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${img(s.file)}" alt="${t}: ${nome} ${k + 1} de ${n}" width="${s.w}" height="${s.h}"${p.galeria === 'posts' || k ? ' loading="lazy"' : ''} decoding="async">`;
  if (p.galeria !== 'posts') {
    const nome = { paginas: 'página' }[p.galeria] || (p.galeria ? 'foto' : 'apresentação, parte');
    const cls = p.galeria ? `case-gallery${p.galeria === 'paginas' ? ' case-gallery--paginas' : ''}` : 'case-slides';
    return `    <div class="${cls}">\n${list.map((s, k) => `      ${tag(s, k, list.length, nome, p.galeria && s.w > s.h * 1.5 ? 'is-wide' : '')}`).join('\n')}\n    </div>`;
  }
  // posts: os posts 4:5 giram num anel 3D igual ao da home (src/js/modules/ring.js); com poucos (menos de 5) o anel
  // ficaria vazio, então eles ficam em grade. Os carrosséis (a imagem deitada com todos os cards) e os stories (9:16)
  // ficam embaixo, cada um na sua parte (pedido da Emilly em 01/10).
  // carrosselNoAnel: true = cada card dos carrosséis também entra no anel, em sequência (projeto que é quase só
  // carrossel, como o Dr. Pedro Caetano); aí só os stories ficam embaixo
  const posts = list.filter((s) => s.w >= s.h * 0.7 && s.w <= s.h * 1.2);
  const carrosseis = list.filter((s) => s.w > s.h * 1.2);
  const stories = list.filter((s) => s.w < s.h * 0.7);
  const artes = [];
  let nc = 0;
  list.forEach((s) => {
    if (s.w < s.h * 0.7) return;
    if (s.w <= s.h * 1.2) return artes.push({ s, nome: 'post' });
    if (!p.carrosselNoAnel) return;
    // a imagem deitada tem k cards 4:5 lado a lado; cada card do anel mostra só a sua parte
    const k = Math.max(2, Math.round(s.w / s.h / 0.8));
    nc++;
    for (let c = 0; c < k; c++) artes.push({ s, k, c, nome: `carrossel ${nc}, card ${c + 1} de ${k}` });
  });
  let np = 0;
  artes.forEach((a) => { if (a.nome === 'post') a.nome = `post ${++np}`; });
  const face = (a, alt) => `<img${a.k ? ` class="c3d__faixa" style="width:${a.k * 100}%;left:-${a.c * 100}%"` : ''} src="${img(a.s.file)}" alt="${alt}" loading="lazy" decoding="async" draggable="false">`;
  const bloco = (titulo, n, corpo) => `    <section class="case-posts__grupo" aria-label="${titulo}">
      <h2 class="eyebrow case-posts__titulo">${titulo} · ${n}</h2>
${corpo}
    </section>\n`;
  const rotulo = p.anelTitulo || (p.carrosselNoAnel && carrosseis.length ? 'Posts e carrosséis' : 'Posts');
  let html = '';
  if (artes.length >= 5) html += `    <section class="case-ring" aria-label="${rotulo}">
      <h2 class="eyebrow case-posts__titulo">${rotulo} · ${artes.length}${rotulo === 'Posts' ? '' : p.anelTitulo ? ' lâminas' : ' artes'}</h2>
      <div class="c3d c3d--posts" data-ring data-cursor-text="arrasta pro lado" tabindex="0">
        <div class="c3d__track"><div class="c3d__sticky"><div class="c3d__wrap" data-c3d-wrap><div class="c3d__list" data-c3d-list>
${artes.map((a) => `          <div class="c3d__item"><div class="c3d__ratio"></div><div class="c3d__face">${face(a, `${t}: ${a.nome}`)}</div><div class="c3d__face c3d__face--back" aria-hidden="true">${face(a, '')}</div></div>`).join('\n')}
        </div></div></div></div>
        <div class="c3d__arrows"><div class="c3d__arrows-sticky">
          <button class="c3d__arrow" type="button" data-c3d-prev aria-label="Arte anterior"><svg><use href="#i-seta"/></svg></button>
          <p class="c3d__count" data-ring-count aria-live="polite">01 / ${nn(artes.length)}</p>
          <button class="c3d__arrow c3d__arrow--next" type="button" data-c3d-next aria-label="Próxima arte"><svg><use href="#i-seta"/></svg></button>
        </div></div>
      </div>
    </section>\n`;
  else if (posts.length) html += bloco('Posts', posts.length, `      <div class="case-gallery case-gallery--posts">
${posts.map((s, k) => `        ${tag(s, k, posts.length, 'post')}`).join('\n')}
      </div>`);
  // no celular cada carrossel fica na altura de um post e desliza para o lado, como no Instagram
  if (carrosseis.length && !(p.carrosselNoAnel && artes.length >= 5)) html += bloco('Carrosséis', carrosseis.length, `      <div class="case-carrosseis">
${carrosseis.map((s, k) => `        <div class="case-carrossel">${tag(s, k, carrosseis.length, 'carrossel')}</div>`).join('\n')}
      </div>`);
  if (stories.length) html += bloco('Stories', stories.length, `      <div class="case-gallery case-gallery--posts case-gallery--stories">
${stories.map((s, k) => `        ${tag(s, k, stories.length, 'story')}`).join('\n')}
      </div>`);
  return html.replace(/\n$/, '');
}

// carrosséis que passam para o lado, como no Instagram (campo `carrosseis` do projeto): uma lâmina por vez, setas,
// pontinhos e arrastar com o dedo; uma lâmina .mp4 vira vídeo mudo em loop (com .webm e -poster.webp do mesmo nome)
function igCarrosseis(p, t, img, dir) {
  if (!p.carrosseis?.length) return '';
  const lamina = (f, k, n, nome) => {
    if (f.endsWith('.mp4')) {
      const base = f.replace(/\.mp4$/, '');
      return `<video poster="${img(base + '-poster.webp')}" muted loop playsinline preload="metadata" aria-label="${t}: ${nome}, lâmina ${k + 1} de ${n} (vídeo)"><source src="${img(base + '.webm')}" type="video/webm"><source src="${img(f)}" type="video/mp4"></video>`;
    }
    const d = webpSize(resolve(dir, f));
    return `<img src="${img(f)}" alt="${t}: ${nome}, lâmina ${k + 1} de ${n}" width="${d.w}" height="${d.h}" loading="lazy" decoding="async" draggable="false">`;
  };
  return `    <section class="case-posts__grupo" aria-label="Carrosséis">
      <h2 class="eyebrow case-posts__titulo">Carrosséis · ${p.carrosseis.length}</h2>
      <div class="ig-carrosseis">
${p.carrosseis.map((c) => `        <div class="ig-carrossel" data-ig>
          <p class="ig-carrossel__nome">${esc(c.titulo)}</p>
          <div class="ig-carrossel__janela">
            <div class="ig-carrossel__trilho" data-ig-trilho tabindex="0" aria-label="${esc(c.titulo)}: ${c.laminas.length} lâminas, passe para o lado">
${c.laminas.map((f, k) => `              <figure class="ig-carrossel__lamina">${lamina(f, k, c.laminas.length, esc(c.titulo))}</figure>`).join('\n')}
            </div>
            <button class="ig-carrossel__seta" type="button" data-ig-prev aria-label="Lâmina anterior"><svg aria-hidden="true"><use href="#i-seta"/></svg></button>
            <button class="ig-carrossel__seta ig-carrossel__seta--next" type="button" data-ig-next aria-label="Próxima lâmina"><svg aria-hidden="true"><use href="#i-seta"/></svg></button>
          </div>
          <div class="ig-carrossel__pontos" aria-hidden="true">${c.laminas.map(() => '<span></span>').join('')}</div>
        </div>`).join('\n')}
      </div>
    </section>\n`;
}

// convite discreto no fim de cada case (pedido da Emilly): a bonequinha da EMS (o selo, sem girar nem recolorir)
// e o WhatsApp já com o nome do projeto na mensagem
function cta(p) {
  const msg = encodeURIComponent(`Oi, Emilly! Vi o projeto ${p.title} no seu site e quero conversar sobre um projeto.`);
  return `    <aside class="case-cta" aria-label="Fale comigo">
      <img class="case-cta__selo" src="/src/assets/illustrations/selo-ems.svg" alt="" width="200" height="240" loading="lazy">
      <div class="case-cta__txt">
        <p class="case-cta__titulo">Curtiu este <em>projeto?</em></p>
        <p>Me chama no WhatsApp e a gente conversa sobre o seu.</p>
      </div>
      <a class="btn btn--ivory" href="https://wa.me/5531920060754?text=${msg}" target="_blank" rel="noopener"><svg><use href="#i-whatsapp"/></svg> Me chama</a>
    </aside>`;
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
  <meta name="description" content="${t} — ${esc(p.detail)}. Projeto de ${esc(p.category.toLowerCase())} de Emilly Silva, designer gráfico e UX/UI que atende todo o Brasil.">
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
  <section class="case-hero${p.capaNoCase === false ? '' : ' case-hero--thumb'}" aria-labelledby="case-titulo">
    <div class="case-hero__inner container">
      <div class="case-hero__txt">
        <a class="case-back" href="%BASE_URL%projetos/" data-intro><svg aria-hidden="true"><use href="#i-seta"/></svg> Todos os projetos</a>
        <p class="eyebrow" data-intro>(${nn(i + 1)}/${nn(total)}) ${esc(p.category)}${p.year ? ` · ${esc(p.year)}` : ''}</p>
        <h1 id="case-titulo" class="case-hero__title" data-intro>${t}</h1>
        <p class="case-hero__lead" data-intro>${esc(p.detail)}</p>
${p.resumo ? `        <p class="case-hero__text" data-intro>${esc(p.resumo)}</p>
` : ''}      </div>
${p.capaNoCase === false ? '' : `      <figure class="case-hero__thumb" data-intro><img src="${capa(p.slug)}" alt="${t}: capa do projeto" width="1600" height="1000" fetchpriority="high"></figure>
`}    </div>
  </section>

  <section class="case-body" aria-label="Apresentação do projeto">
${p.video ? `    <figure class="case-video${slides.wide ? ' case-video--wide' : ''}"><video poster="${img('video-poster.webp')}" autoplay muted loop playsinline controls preload="metadata" aria-label="${t}: vídeo do projeto"><source src="${img(p.video.replace(/\.mp4$/, '.webm'))}" type="video/webm"><source src="${img(p.video)}" type="video/mp4"></video></figure>\n` : ''}${slides.mockup ? `    <figure class="case-mockup"><img src="${img(p.mockup)}" alt="${t}: ${p.galeria === 'paginas' ? 'página impressa' : 'projeto aplicado'} sobre a mesa (mockup)" width="${slides.mockup.w}" height="${slides.mockup.h}"${p.capaNoCase === false ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></figure>\n` : ''}${galeria(p, t, slides.list, img)}
${igCarrosseis(p, t, img, slides.dir)}${p.site || p.instagram || p.behance ? `    <p class="case-behance">${p.site ? `<a class="btn btn--ivory" href="${esc(p.site)}" target="_blank" rel="noopener">Ver o site no ar <svg><use href="#i-seta-diag"/></svg></a>` : ''}${p.instagram ? `<a class="btn btn--ivory" href="${esc(p.instagram)}" target="_blank" rel="noopener"><svg><use href="#i-instagram"/></svg> ${esc(p.instagramTexto || 'Ver no Instagram')}</a>` : ''}${p.behance ? `<a class="btn btn--ghost" href="${esc(p.behance)}" target="_blank" rel="noopener"><svg><use href="#i-behance"/></svg> Ver também no Behance</a>` : ''}</p>\n` : ''}${cta(p)}
    <p class="case-voltar"><a class="case-back" href="%BASE_URL%projetos/"><svg aria-hidden="true"><use href="#i-seta"/></svg> Todos os projetos</a></p>
  </section>

  <a class="case-next" href="%BASE_URL%projetos/${next.slug}.html" data-cursor-text="próximo">
    <span class="case-next__inner container">
      <span class="eyebrow">Próximo projeto</span>
      <span class="case-next__title">${esc(next.title)} <svg aria-hidden="true"><use href="#i-seta"/></svg></span>
      <span class="case-next__cat">${esc(next.category)} · ${esc(next.detail)}</span>
      <img class="case-next__thumb" src="${capa(next.slug)}" alt="" width="1600" height="1000" loading="lazy">
    </span>
  </a>

<!-- @include partials/contact.html -->
</main>

<!-- @include partials/footer.html -->
</body>
</html>
`;
}

// card de projeto na página "Todos os projetos"
function card(p) {
  const img = `<span class="work-card__img"><img src="${capa(p.slug)}" alt="" width="1600" height="1000" loading="lazy"></span>`;
  const body = `<span class="work-card__body"><span class="work-card__title">${esc(p.title)}</span><span class="work-card__cat">${esc(p.category)} · ${esc(p.detail)}</span>${p.year ? `<span class="work-card__year">${esc(p.year)}</span>` : ''}</span>`;
  return p.soon
    ? `<li><div class="work-card work-card--soon">${img}<span class="work-card__badge">em breve</span>${body}</div></li>`
    : `<li><a class="work-card" href="%BASE_URL%projetos/${p.slug}.html" data-cursor-text="ver case">${img}${body}</a></li>`;
}

// card que leva para fora do site (ex.: Instagram de fotografia)
function linkCard(l) {
  return `<li><a class="work-card work-card--link" href="${esc(l.href)}" target="_blank" rel="noopener" data-cursor-text="abrir"><span class="work-card__img"><svg aria-hidden="true"><use href="#i-instagram"/></svg></span><span class="work-card__body"><span class="work-card__title">${esc(l.titulo)}</span><span class="work-card__cat">${esc(l.detalhe)}</span></span></a></li>`;
}

function listing(projects, areas) {
  const comProjetos = (a) => projects.filter((p) => p.area === a.id);
  const vaga = '<li><div class="work-card work-card--slot"><span class="work-card__img"><svg aria-hidden="true"><use href="#i-espiral"/></svg></span><span class="work-card__body"><span class="work-card__title">Em breve</span><span class="work-card__cat">próximo projeto</span></span></div></li>';
  const secoes = areas.map((a, i) => {
    const lista = comProjetos(a);
    return `
  <section class="works__area" id="${a.id}" aria-labelledby="area-${a.id}" data-area-section>
    <div class="container">
      <div class="works__head">
        <p class="eyebrow">(${nn(i + 1)}) ${lista.length ? `${lista.length} ${lista.length === 1 ? 'projeto' : 'projetos'}` : 'em breve'}</p>
        <h2 id="area-${a.id}" class="section-title">${a.titulo}</h2>
      </div>
      <ul class="works__grid">
${[...(lista.length ? lista.map(card) : a.link ? [] : [vaga]), ...(a.link ? [linkCard(a.link)] : [])].map((c) => `        ${c}`).join('\n')}
      </ul>
    </div>
  </section>`;
  }).join('\n');
  return `<!doctype html>
${MARCA}
<html lang="pt-BR">
<head>
<!-- @include partials/head.html -->
  <title>Todos os projetos | Emilly Silva</title>
  <meta name="description" content="Portfólio completo de Emilly Silva, designer gráfico e UX/UI: identidade visual, web e UX/UI, social media, fotografia e produtos personalizados.">
  <link rel="canonical" href="%SITE_URL%projetos/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="%SITE_URL%projetos/">
  <meta property="og:title" content="Todos os projetos | Emilly Silva">
  <meta property="og:description" content="Identidade visual, web e UX/UI, social media, fotografia e produtos personalizados.">
  <meta property="og:image" content="%SITE_URL%img/og.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <script type="module" src="/src/js/page.js"></script>
</head>
<body id="topo">
<!-- @include partials/icons.html -->
<!-- @include partials/header.html -->

<main id="conteudo" class="works">
  <section class="works__hero" aria-labelledby="works-titulo">
    <div class="container">
      <a class="case-back" href="%BASE_URL%#projetos" data-intro><svg aria-hidden="true"><use href="#i-seta"/></svg> Início</a>
      <p class="eyebrow" data-intro>Portfólio · ${projects.length} projetos</p>
      <h1 id="works-titulo" class="section-title">Todos os <em>projetos</em></h1>
      <nav class="works__nav" aria-label="Filtrar por área" data-works-nav data-intro>
        <a href="%BASE_URL%projetos/" data-area="" aria-current="page">Todos</a>
${areas.map((a) => `        <a href="?area=${a.id}" data-area="${a.id}">${a.titulo.replace(/<\/?em>/g, '')}</a>`).join('\n')}
      </nav>
    </div>
  </section>
${secoes}

<!-- @include partials/contact.html -->
</main>

<!-- @include partials/footer.html -->
</body>
</html>
`;
}

export function gerarCases(root, projects, areas = []) {
  VERSOES = versoesDasCapas(root, projects);
  const dir = resolve(root, 'projetos');
  mkdirSync(dir, { recursive: true });
  const cases = projects.filter((p) => !p.soon);
  const feitos = new Set();

  cases.forEach((p, i) => {
    const imgDir = resolve(root, 'public/img/projetos', p.slug);
    const files = existsSync(imgDir) ? readdirSync(imgDir).filter((f) => /^slide-\d+\.webp$/.test(f)).sort() : [];
    if (!files.length) console.warn(`[cases] ${p.slug}: nenhuma imagem slide-01.webp em public/img/projetos/${p.slug}/`);
    const slides = { dir: imgDir, list: files.map((file) => ({ file, ...webpSize(resolve(imgDir, file)) })) };
    // vídeo deitado (pelo poster) ocupa a largura da apresentação; o em pé fica estreito
    const poster = resolve(imgDir, 'video-poster.webp');
    if (p.video && existsSync(poster)) { const d = webpSize(poster); slides.wide = d.w > d.h; }
    if (p.mockup && existsSync(resolve(imgDir, p.mockup))) slides.mockup = webpSize(resolve(imgDir, p.mockup));
    const html = page(p, i, cases.length, cases[(i + 1) % cases.length], slides);
    const out = resolve(dir, `${p.slug}.html`);
    // só grava se mudou: assim o servidor não recarrega à toa
    if (!existsSync(out) || readFileSync(out, 'utf-8') !== html) writeFileSync(out, html);
    feitos.add(`${p.slug}.html`);
  });

  // página "Todos os projetos", separada por área
  if (areas.length) {
    const html = listing(projects, areas);
    const out = resolve(dir, 'index.html');
    if (!existsSync(out) || readFileSync(out, 'utf-8') !== html) writeFileSync(out, html);
    feitos.add('index.html');
  }

  // projeto que saiu da lista (ou virou "em breve") perde a página; páginas feitas à mão ficam
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.html') && !feitos.has(f) && readFileSync(resolve(dir, f), 'utf-8').includes(MARCA)) rmSync(resolve(dir, f));
  }
}

// node scripts/gerar-cases.mjs
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  // sem await no topo: este arquivo também é carregado pelo vite.config.js
  import(pathToFileURL(resolve(root, 'src/data/projects.js')).href).then(({ projects, areas }) => {
    gerarCases(root, projects, areas);
    console.log('ok: páginas de case em projetos/');
  });
}
