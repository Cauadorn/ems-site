import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from './src/data/projects.js';
import { gerarCases } from './scripts/gerar-cases.mjs';

const root = dirname(fileURLToPath(import.meta.url));

// endereço do site no ar: vai nas prévias de link (WhatsApp, Instagram), que exigem o endereço completo
const SITE_URL = process.env.SITE_URL || 'https://cauadorn.github.io/ems-site/';

// uma página de case por projeto (projetos/<slug>.html); mudou src/data/projects.js, o Vite reinicia e refaz
gerarCases(root, projects);

// Inclui trechos de HTML reaproveitados: <!-- @include partials/header.html -->
function htmlPartials() {
  const include = (html, depth = 0) =>
    html.replace(/<!--\s*@include\s+(\S+)\s*-->/g, (_, file) => {
      const content = readFileSync(resolve(root, file), 'utf-8');
      return depth < 5 ? include(content, depth + 1) : content;
    });
  return {
    name: 'html-partials',
    transformIndexHtml: { order: 'pre', handler: (html) => include(html).replaceAll('%SITE_URL%', SITE_URL) },
    handleHotUpdate({ file, server }) {
      if (file.includes('partials') || file.endsWith('.svg')) server.ws.send({ type: 'full-reload' });
      if (file.includes('public/img/projetos')) { gerarCases(root, projects); server.ws.send({ type: 'full-reload' }); }
    },
  };
}

// Toda página .html na raiz (ex.: 404.html) e em /projetos vira uma entrada do build
const pages = { main: resolve(root, 'index.html') };
for (const dir of ['', 'projetos']) {
  const abs = resolve(root, dir);
  if (!existsSync(abs)) continue;
  for (const f of readdirSync(abs)) {
    if (f.endsWith('.html') && f !== 'index.html') pages[`${dir}${dir ? '/' : ''}${f.replace('.html', '')}`] = resolve(abs, f);
  }
}

// sem import de 'vite': assim o motor em D:\Dev\ems-site consegue reaproveitar esta config
export default {
  // no GitHub Pages o site fica em /ems-site/ (a Action passa BASE_PATH); localmente é a raiz
  base: process.env.BASE_PATH || '/',
  plugins: [htmlPartials()],
  build: { rollupOptions: { input: pages } },
  server: { port: 5178 },
};
