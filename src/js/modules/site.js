import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initCursor } from './cursor.js';
import { initMenu } from './menu.js';

gsap.registerPlugin(ScrollTrigger);
export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Base de todas as páginas (home, cases, 404): rolagem suave, links internos, cabeçalho, ano, menu e cursor
export function initSite() {
  // rolagem suave (desligada para quem pede menos movimento)
  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // links internos passam pela rolagem suave
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="#"]');
    if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return;
    const target = a.hash === '#topo' ? 0 : document.querySelector(a.hash);
    if (target === null) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(target, { offset: -20 }) : (target === 0 ? scrollTo(0, 0) : target.scrollIntoView());
  });

  // header sempre visível: ao descer a página ele encolhe numa pílula menor, como o da Apple (pedido da Emilly em
  // 02/10; antes ele sumia ao descer)
  const header = document.querySelector('[data-header]');
  const onScroll = (y) => header?.classList.toggle('is-compact', y > 80);
  onScroll(lenis ? lenis.scroll : scrollY);
  lenis ? lenis.on('scroll', ({ scroll }) => onScroll(scroll)) : addEventListener('scroll', () => onScroll(scrollY));

  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  initMenu(lenis);
  initCursor();
  return lenis;
}
