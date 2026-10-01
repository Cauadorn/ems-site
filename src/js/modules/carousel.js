import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects.js';

// raiz do site ("/" aqui, "/ems-site/" no GitHub Pages): toda imagem da pasta public passa por ela
const BASE = import.meta.env.BASE_URL;

// Carrossel 3D dos projetos — mesma lógica do pixel.melbourne (ver docs/referencia-pixel.md):
// os cards formam um cilindro (rotateY + translateZ) e a ROLAGEM gira o cilindro.
// Cada projeto tem um "painel" de 100vh com o nome gigante; as setas rolam até o painel vizinho.

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

export function initCarousel(root, lenis) {
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

  // painéis com o nome (o conteúdo acessível fica aqui)
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
  items.forEach((el, i) => { el.style.transform = `rotateY(${rotateAmount * i}deg) translateZ(${posTranslate})`; });
  gsap.to(wrap, { opacity: 1 });

  gsap.timeline({
    // termina no topo do último painel (e não no fim da seção): assim o giro bate com o painel mesmo quando 100vh ≠ 100svh no celular
    scrollTrigger: { trigger: root, start: 'top top', endTrigger: panels[n - 1], end: 'top top', scrub: true },
  // gira do 1º ao último projeto (a Pixel usa -(360 - passo), que é o mesmo valor quando não há vagas)
  }).fromTo(wrap, { '--c3d-rotate': '0deg' }, { '--c3d-rotate': `${-rotateAmount * (n - 1)}deg`, duration: 30, ease: 'none' });

  // painel ativo + setas
  let active = 0;
  let animating = false;
  let lockT;
  const setActive = (i) => {
    active = i;
    prev.setAttribute('aria-disabled', String(i === 0));
    next.setAttribute('aria-disabled', String(i === n - 1));
    items.forEach((el, k) => el.classList.toggle('is-active', k === i));
  };
  setActive(0);

  panels.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel, start: 'top center', end: 'bottom center',
      onToggle: ({ isActive }) => { if (isActive) setActive(i); },
    });
  });

  // a trava das setas se solta por tempo: se a pessoa girar a roda no meio, o onComplete do Lenis não chega e as setas travariam
  const scrollToActive = () => {
    animating = true;
    clearTimeout(lockT);
    lockT = setTimeout(() => { animating = false; }, 650);
    const y = panels[active].getBoundingClientRect().top + scrollY;
    if (lenis) lenis.scrollTo(y, { duration: .6 });
    else scrollTo({ top: y, behavior: 'auto' }); // sem Lenis = movimento reduzido
  };
  // navegando com Tab, o painel que recebe o foco vira o ativo e o anel gira até ele
  panels.forEach((p, i) => p.addEventListener('focusin', () => { if (i !== active) { setActive(i); scrollToActive(); } }));
  next.addEventListener('click', () => { if (active < n - 1 && !animating) { setActive(active + 1); scrollToActive(); } });
  prev.addEventListener('click', () => { if (active > 0 && !animating) { setActive(active - 1); scrollToActive(); } });

  setTimeout(() => ScrollTrigger.refresh(), 300);
  addEventListener('load', () => ScrollTrigger.refresh());

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
