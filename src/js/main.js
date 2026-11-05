import '../styles/main.css';
import { initSite, reduced } from './modules/site.js';
import { runLoader } from './modules/loader.js';
import { initCarousel } from './modules/carousel.js';
import { initMascote } from './modules/mascote.js';
import { initStickers } from './modules/stickers.js';
import { initReveals, heroIntro } from './modules/reveal.js';
import { initAbout } from './modules/about.js';
import { initNope } from './modules/nope.js';
import { initTapes } from './modules/tapes.js';
import { initCracha } from './modules/cracha.js';
import { initMar } from './modules/mar.js';

const lenis = initSite();
initMascote();
initStickers();
initTapes();
initCarousel(document.querySelector('[data-c3d]'));
initAbout();
initNope();
const soltarCracha = initCracha(reduced);

runLoader(reduced).then(() => {
  heroIntro(reduced);
  initReveals(reduced);
  setTimeout(soltarCracha, reduced ? 0 : 900); // o crachá cai depois que o EMS aparece
  // fim do site no fundo do mar: ao chegar no fim, volta para o começo, o topo entra de novo e o crachá cai outra vez
  initMar(lenis, reduced, () => {
    heroIntro(reduced, true);
    soltarCracha(true);
  });
});
