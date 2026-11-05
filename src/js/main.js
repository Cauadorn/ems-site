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
import { initIdioma } from './modules/idioma.js';

initSite();
initMascote();
initStickers();
initTapes();
initCarousel(document.querySelector('[data-c3d]'));
initAbout();
initNope();
const soltarCracha = initCracha(reduced);
initIdioma(); // português / inglês: depois de montar o carrossel e a lista, que já trazem o inglês ao lado

runLoader(reduced).then(() => {
  heroIntro(reduced);
  initReveals(reduced);
  setTimeout(soltarCracha, reduced ? 0 : 900); // o crachá cai depois que o EMS aparece
  initMar(reduced); // fim do site no fundo do mar (baleia, peixinhos, bolhas e algas)
});
