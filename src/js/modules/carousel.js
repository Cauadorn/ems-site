import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects as todos } from '../../data/projects.js';
import { reduced } from './site.js';

// raiz do site ("/" aqui e no emsdesign.com.br): toda imagem da pasta public passa por ela
const BASE = import.meta.env.BASE_URL;

// a home mostra só os projetos com destaque: true; a página "Todos os projetos" mostra todos
const projects = todos.filter((p) => p.destaque);

// Carrossel 3D dos projetos — o anel da pixel.melbourne (ver docs/referencia-pixel.md):
// os cards formam um cilindro (rotateY + translateZ) e giram até o projeto escolhido.
// Pedido da Emilly (01/10): o carrossel NÃO prende a rolagem da página. Ele ocupa uma tela só; arrastando
// para o lado (mouse, dedo ou touchpad) o anel acompanha, o próximo card cresce até a frente e, ao soltar,
// encaixa no projeto mais próximo. Setas da tela e do teclado também funcionam.

// O anel tem no mínimo 8 posições (como o da Pixel). Posição sem projeto vira uma vaga
// "próximo projeto"; ao incluir um projeto em src/data/projects.js ele ocupa a vaga sozinho.
// Com mais de 8 projetos o anel cresce junto.
const MIN_SLOTS = 8;

// página de case do projeto (gerada por scripts/gerar-cases.mjs); projeto "em breve" não tem
const caseUrl = (p) => (p.soon ? null : `${BASE}projetos/${p.slug}.html`);

const face = (p, back, lazy) => {
  const cls = `c3d__face${back ? ' c3d__face--back' : ''}`;
  if (!p) {
    return `<div class="${cls} c3d__slot"><svg aria-hidden="true"><use href="#i-espiral"/></svg><span>próximo projeto</span><small>vaga aberta</small></div>`;
  }
  const img = `<img src="${BASE}img/projetos/${p.slug}/capa.webp" alt="" ${lazy ? 'loading="lazy"' : ''} draggable="false">`;
  // só a frente é clicável; o verso aparece quando o card está do outro lado do anel
  return caseUrl(p) && !back
    ? `<a class="${cls}" href="${caseUrl(p)}" tabindex="-1" data-cursor-text="ver case">${img}</a>`
    : `<div class="${cls}">${img}</div>`;
};

export function initCarousel(root) {
  if (!root) return;
  const wrap = root.querySelector('[data-c3d-wrap]');
  const list = root.querySelector('[data-c3d-list]');
  const panelsEl = root.querySelector('[data-c3d-panels]');
  const prev = root.querySelector('[data-c3d-prev]');
  const next = root.querySelector('[data-c3d-next]');
  const n = projects.length;
  const slots = Math.max(n, MIN_SLOTS);

  // itens do cilindro: frente + verso (o verso não fica espelhado, então o texto das capas continua legível)
  for (let i = 0; i < slots; i++) {
    const p = projects[i];
    const item = document.createElement('div');
    item.className = `c3d__item${p ? '' : ' c3d__item--slot'}`;
    item.setAttribute('aria-hidden', 'true');
    item.innerHTML = `<div class="c3d__ratio"></div>${face(p, false, i > 1)}${face(p, true, true)}`;
    list.append(item);
  }

  // painéis com o nome (o conteúdo acessível fica aqui); só o do projeto ativo aparece.
  // Sem o contador "01 / 06" na frente do card (pedido da Emilly em 01/10)
  panelsEl.innerHTML = projects.map((p) => `
    <article class="c3d__panel" data-c3d-panel>
      <h3 class="c3d__name">${p.title}</h3>
      <p class="c3d__cat">${p.category} · ${p.detail}</p>
      ${caseUrl(p)
        ? `<a class="c3d__btn" href="${caseUrl(p)}" data-cursor-text="ver case">ver case</a>`
        : '<span class="c3d__btn c3d__btn--soon">em breve</span>'}
    </article>`).join('');

  const items = [...list.children];
  const panels = [...panelsEl.children];

  const rotateAmount = 360 / slots;
  const zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 180));
  const negTranslate = `calc(var(--c3d-item-width) / -${zTranslate} - var(--c3d-gap))`;
  const posTranslate = `calc(var(--c3d-item-width) / ${zTranslate} + var(--c3d-gap))`;

  wrap.style.setProperty('--c3d-z', negTranslate);
  wrap.style.perspective = posTranslate;
  // scale(var(--s)): o card do lado cresce um pouco quando o mouse passa por ele (ver sections.css)
  items.forEach((el, i) => { el.style.transform = `rotateY(${rotateAmount * i}deg) translateZ(${posTranslate}) scale(var(--s, 1))`; });
  gsap.to(wrap, { opacity: 1 });

  // posição do anel em "passos" (0 = primeiro projeto na frente; cada passo gira uma posição do anel).
  // Não tem fim: depois do último projeto vêm as vagas e o anel volta ao primeiro, para os dois lados.
  const step = rotateAmount;
  const rot = { v: 0 }; // graus
  const apply = () => wrap.style.setProperty('--c3d-rotate', `${rot.v}deg`);
  const pxPerStep = () => root.offsetWidth * .45; // quanto arrastar para andar uma posição
  const mod = (a, m) => ((a % m) + m) % m;
  const posNow = () => -rot.v / step;
  // posição inteira mais perto de p que tem projeto na frente (vaga não conta); dir: só para frente (1) ou para trás (−1)
  const snap = (p, dir = 0) => {
    let best = null;
    for (let k = Math.floor(p) - slots; k <= Math.ceil(p) + slots; k++) {
      if (mod(k, slots) >= n || (dir > 0 && k < p - 1e-6) || (dir < 0 && k > p + 1e-6)) continue;
      if (best === null || Math.abs(k - p) < Math.abs(best - p)) best = k;
    }
    return best;
  };

  // projeto da frente: mostra o painel dele e marca os cards vizinhos (esquerda e direita),
  // que são os únicos clicáveis além do da frente; o resto do anel, lá atrás, é só paisagem
  let cur = 0; // posição do projeto da frente
  let active = -1;
  const setActive = (pos) => {
    const i = mod(pos, slots);
    if (i === active) return;
    active = i;
    panels.forEach((el, k) => { el.classList.toggle('is-active', k === i); el.inert = k !== i; });
    const near = [mod(pos - 1, slots), mod(pos + 1, slots)];
    items.forEach((el, k) => {
      el.classList.toggle('is-active', k === i);
      el.classList.toggle('is-near', k !== i && k < n && near.includes(k));
      el.querySelector('a.c3d__face')?.setAttribute('data-cursor-text', k === i ? 'ver case' : 'ver este');
    });
  };

  // encaixa numa posição: o anel gira até ela e o card cresce até a frente
  const go = (pos, animate = true) => {
    cur = pos;
    setActive(pos);
    gsap.to(rot, { v: -step * pos, duration: animate && !reduced ? .9 : 0, ease: 'expo.out', overwrite: true, onUpdate: apply });
  };
  go(0, false);

  // próximo/anterior sem fim: do último vai para o primeiro (e vice-versa), passando pelas vagas
  const neighbor = (dir) => { let p = cur + dir; while (mod(p, slots) >= n) p += dir; return p; };
  next.addEventListener('click', () => go(neighbor(1)));
  prev.addEventListener('click', () => go(neighbor(-1)));
  prev.setAttribute('aria-disabled', 'false');
  next.setAttribute('aria-disabled', 'false');

  // clicar num card vizinho traz aquele projeto para a frente (o da frente segue o link do case)
  items.forEach((el, k) => {
    if (k >= n) return;
    el.addEventListener('click', (e) => {
      if (k === active) return;
      e.preventDefault();
      if (!el.classList.contains('is-near')) return;
      go(cur + mod(k - mod(cur, slots) + slots / 2, slots) - slots / 2); // pelo caminho mais curto
    });
  });

  // setas do teclado com o foco dentro do carrossel
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(neighbor(1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(neighbor(-1)); }
  });

  // arrastar para o lado (mouse ou dedo): o anel acompanha e, ao soltar, encaixa no projeto mais próximo.
  // Arrastar para cima/baixo é da página: a rolagem nunca fica presa no carrossel.
  let drag = null, dragged = false;
  root.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || e.target.closest('button')) return;
    drag = { x: e.clientX, y: e.clientY, start: rot.v, moved: false, lastX: e.clientX, t: performance.now(), v: 0 };
  });
  addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; } // gesto vertical: deixa a página rolar
      drag.moved = true;
      gsap.killTweensOf(rot);
      root.classList.add('is-dragging');
    }
    rot.v = drag.start + (dx / pxPerStep()) * step;
    apply();
    setActive(snap(posNow()));
    const now = performance.now();
    drag.v = (e.clientX - drag.lastX) / Math.max(1, now - drag.t);
    drag.lastX = e.clientX; drag.t = now;
  });
  const endDrag = () => {
    if (!drag) return;
    const d = drag;
    drag = null;
    root.classList.remove('is-dragging');
    if (!d.moved) return;
    dragged = true;
    // um gesto rápido já passa para o vizinho, mesmo sem chegar na metade (se parou antes de soltar, não conta)
    const flick = performance.now() - d.t < 100 && Math.abs(d.v) > .4;
    go(snap(posNow(), flick ? (d.v < 0 ? 1 : -1) : 0));
  };
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', endDrag);
  // depois de arrastar, o "soltar" não abre o case
  root.addEventListener('click', (e) => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);

  // deslizar para o lado no touchpad: mesmo efeito do arrastar; rolagem vertical continua sendo da página
  let wheelT;
  root.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    gsap.killTweensOf(rot);
    rot.v -= (e.deltaX / pxPerStep()) * step;
    apply();
    setActive(snap(posNow()));
    clearTimeout(wheelT);
    wheelT = setTimeout(() => go(snap(posNow())), 160);
  }, { passive: false });

  initList(root.closest('section'), root);
}

// Modo lista: alternativa mais direta ao carrossel
function initList(section, carousel) {
  const list = section.querySelector('[data-project-list]');
  list.innerHTML = projects.map((p) => `
    <a class="project-row" ${caseUrl(p) ? `href="${caseUrl(p)}"` : 'aria-disabled="true"'} data-preview="${BASE}img/projetos/${p.slug}/capa.webp" data-cursor-text="${caseUrl(p) ? 'ver case' : 'em breve'}">
      <span class="project-row__title">${p.title}</span>
      <span class="project-row__cat">${p.category}</span>
      <span class="project-row__year">${p.year}</span>
      <svg aria-hidden="true"><use href="#i-seta-diag"/></svg>
    </a>`).join('');

  section.querySelectorAll('[data-view]').forEach((btn) => btn.addEventListener('click', () => {
    const lista = btn.dataset.view === 'lista';
    section.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    list.hidden = !lista;
    carousel.hidden = lista;
    ScrollTrigger.refresh();
  }));

  if (!matchMedia('(hover: hover)').matches) return;
  const prev = document.createElement('div');
  prev.className = 'project-preview';
  prev.innerHTML = '<img alt="">';
  document.body.append(prev);
  const img = prev.querySelector('img');
  const xTo = gsap.quickTo(prev, 'x', { duration: .5, ease: 'power3' });
  const yTo = gsap.quickTo(prev, 'y', { duration: .5, ease: 'power3' });
  list.addEventListener('pointermove', (e) => { xTo(e.clientX + 24); yTo(e.clientY - 100); });
  list.querySelectorAll('.project-row').forEach((r) => {
    r.addEventListener('pointerenter', () => { img.src = r.dataset.preview; prev.classList.add('is-on'); });
    r.addEventListener('pointerleave', () => prev.classList.remove('is-on'));
  });
}
