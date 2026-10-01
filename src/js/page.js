import '../styles/main.css';
import '../styles/case.css';
import gsap from 'gsap';
import { initSite, reduced } from './modules/site.js';
import { initMascote } from './modules/mascote.js';
import { initReveals } from './modules/reveal.js';
import { initNope } from './modules/nope.js';

// Páginas internas (cases e 404): a mesma base da home, sem a abertura.
// Quem chegou por aqui já está no site: a home abre direto, sem repetir a abertura.
try { sessionStorage.setItem('ems-loader', '1'); } catch {}
document.documentElement.classList.add('is-loaded');

initSite();
initMascote();
initNope();
initReveals(reduced);

// entrada do topo da página
if (!reduced) gsap.from('[data-intro]', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08 });
