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

initSite();
initMascote();
initStickers();
initTapes();
initCarousel(document.querySelector('[data-c3d]'));
initAbout();
initNope();

runLoader(reduced).then(() => {
  heroIntro(reduced);
  initReveals(reduced);
});
