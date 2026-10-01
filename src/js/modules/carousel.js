import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects as todos } from '../../data/projects.js';
import { reduced } from './site.js';

// raiz do site ("/" aqui, "/ems-site/" no GitHub Pages): toda imagem da pasta public passa por ela
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

  // painéis com o nome (o conteúdo acessível fica aqui); só o do projeto ativo aparece
  panelsEl.innerHTML = projects.map((p, i) => `
    <article class="c3d__panel" data-c3d-panel>
      <p class="c3d__count">${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}</p>
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

  // rotação atual do anel, em graus (0 = primeiro projeto; cada projeto à frente é −passo)
  const step = rotateAmount;
  const rot = { v: 0 };
  const apply = () => wrap.style.setProperty('--c3d-rotate', `${rot.v}deg`);
  const minRot = -step * (n - 1);
  const clampRot = (v) => Math.max(minRot - step * .3, Math.min(step * .3, v)); // passa um pouco das pontas e volta
  const pxPerStep = () => root.offsetWidth * .45; // quanto arrastar para andar um projeto

  // painel e setas do projeto mais à frente
  let active = -1;
  const setActive = (i) => {
    if (i === active) return;
    active = i;
    panels.forEach((el, k) => { el.classList.toggle('is-active', k === i); el.inert = k !== i; });
    items.forEach((el, k) => {
      el.classList.toggle('is-active', k === i);
      // o card da frente abre o case; os do lado trazem o projeto para a frente
      el.querySelector('a.c3d__face')?.setAttribute('data-cursor-text', k === i ? 'ver case' : 'ver este');
    });
    prev.setAttribute('aria-disabled', String(i === 0));
    next.setAttribute('aria-disabled', String(i === n - 1));
  };
  const nearest = () => Math.max(0, Math.min(n - 1, Math.round(-rot.v / step)));

  // encaixa num projeto: o anel gira até ele e o card cresce até a frente
  const go = (i, animate = true) => {
    i = Math.max(0, Math.min(n - 1, i));
    setActive(i);
    gsap.to(rot, { v: -step * i, duration: animate && !reduced ? .9 : 0, ease: 'expo.out', overwrite: true, onUpdate: apply });
  };
  go(0, false);

  // clicar num card do lado traz aquele projeto para a frente (o da frente segue o link do case)
  items.forEach((el, k) => {
    if (!projects[k]) return;
    el.addEventListener('click', (e) => { if (k !== active) { e.preventDefault(); go(k); } });
  });

  next.addEventListener('click', () => go(active + 1));
  prev.addEventListener('click', () => go(active - 1));

  // setas do teclado com o foco dentro do carrossel
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
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
    rot.v = clampRot(drag.start + (dx / pxPerStep()) * step);
    apply();
    setActive(nearest());
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
    const pos = -rot.v / step;
    // um gesto rápido já passa para o vizinho, mesmo sem chegar na metade (se parou antes de soltar, não conta)
    const flick = performance.now() - d.t < 100 && Math.abs(d.v) > .4;
    go(flick ? (d.v < 0 ? Math.ceil(pos) : Math.floor(pos)) : Math.round(pos));
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
    rot.v = clampRot(rot.v - (e.deltaX / pxPerStep()) * step);
    apply();
    setActive(nearest());
    clearTimeout(wheelT);
    wheelT = setTimeout(() => go(nearest()), 160);
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
