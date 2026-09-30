import '../styles/main.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { runLoader } from './modules/loader.js';
import { initCarousel } from './modules/carousel.js';
import { initCursor } from './modules/cursor.js';
import { initMascote } from './modules/mascote.js';
import { initStickers } from './modules/stickers.js';
import { initMenu } from './modules/menu.js';
import { initReveals, heroIntro } from './modules/reveal.js';
import { initAbout } from './modules/about.js';
import { initNope } from './modules/nope.js';

gsap.registerPlugin(ScrollTrigger);
export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// header some ao descer e volta ao subir
const header = document.querySelector('[data-header]');
let lastY = 0;
const onScroll = (y) => {
  header?.classList.toggle('is-hidden', y > lastY && y > 200 && !document.documentElement.classList.contains('menu-open'));
  lastY = y;
};
lenis ? lenis.on('scroll', ({ scroll }) => onScroll(scroll)) : addEventListener('scroll', () => onScroll(scrollY));

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

initMenu(lenis);
initCursor();
initMascote();
initStickers();
initCarousel(document.querySelector('[data-c3d]'), lenis);
initAbout();
initNope();

runLoader(reduced).then(() => {
  heroIntro(reduced);
  initReveals(reduced);
});
