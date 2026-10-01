import '../styles/main.css';
import '../styles/case.css';
import gsap from 'gsap';
import { initSite, reduced } from './modules/site.js';
import { initMascote } from './modules/mascote.js';
import { initReveals } from './modules/reveal.js';
import { initNope } from './modules/nope.js';
import { initWorks } from './modules/works.js';

// Páginas internas (cases, todos os projetos e 404): a mesma base da home, sem a abertura.
document.documentElement.classList.add('is-loaded');

initSite();
initMascote();
initNope();
initWorks();
initReveals(reduced);

// entrada do topo da página
if (!reduced) gsap.from('[data-intro]', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08 });
