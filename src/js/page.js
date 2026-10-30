import '../styles/main.css';
import '../styles/case.css';
import gsap from 'gsap';
import { initSite, reduced } from './modules/site.js';
import { initMascote } from './modules/mascote.js';
import { initReveals } from './modules/reveal.js';
import { initNope } from './modules/nope.js';
import { initWorks } from './modules/works.js';
import { initRings } from './modules/ring.js';
import { initIg } from './modules/ig.js';
import { initLoops } from './modules/loops.js';

// Páginas internas (cases, todos os projetos e 404): a mesma base da home, sem a abertura.
document.documentElement.classList.add('is-loaded');

initSite();
initMascote();
initNope();
initWorks();
initRings(); // anel 3D dos posts nas páginas de social media
initIg(); // carrosséis de Instagram que passam para o lado
initLoops(reduced); // vídeos curtos dos cases em capítulos: tocam só na tela
// parede 3D da abertura do Encontro de Lideranças: o three.js só carrega na página que tem a parede
const parede = document.querySelector('[data-parede]');
if (parede && !reduced) import('./modules/parede.js').then((m) => m.initParede(parede));
initReveals(reduced);

// entrada do topo da página
if (!reduced) gsap.from('[data-intro]', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08 });
