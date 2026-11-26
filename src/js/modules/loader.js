import gsap from 'gsap';
import seloSvg from '../../assets/illustrations/selo-ems.svg?raw';

// Abertura da bonequinha (pedido da Emilly em 26/11, inspirada na abertura da Xulia Petit: o rosto ilustrado dela ganha
// vida e uma estrela explode e vira o site). O selo da EMS aparece no marfim, pisca, olha de um lado para o outro e
// desconfia; depois as estrelas da EMS (src/assets/illustrations/estrela-ems.svg) nascem do rosto dela, uma dentro da
// outra (rosa, ameixa, violeta), e a última, violeta, vira o topo do site, que se monta em seguida (heroIntro).
// O selo é a arte original: nada nele é redesenhado. Só os olhos se mexem, com uma camada por cima feita das próprias
// formas dele (a íris é um círculo e a lente também, medidos no SVG), que parada fica idêntica ao desenho.
// (A abertura anterior, a jubarte nadando em volta do contador, está no histórico do Git: ver docs/baleia/README.md.)
// Toca ao abrir ou recarregar a home; quem volta de outra página do site entra direto (decidido no <head> do index.html).

const NS = 'http://www.w3.org/2000/svg';
const ROXO = '#6125D9'; // as duas cores do selo, como estão no arquivo
const BRANCO = '#FEFEFE';

// os olhos, nas medidas do selo (viewBox 0 0 544 705): a lente (o vidro dos óculos), a íris, o brilho e a parte de baixo
// da pálpebra (a linha dos cílios), que é onde a íris fica pendurada. A íris anda e fecha só dentro dessa área.
const OLHOS = [
  {
    lente: [198.73, 316.21, 42.2], iris: [194.6, 316.84, 21.17],
    brilho: 'M203.682 309.987C205.425 309.219 207.459 310.02 208.211 311.769C208.963 313.518 208.144 315.545 206.388 316.281C204.654 317.007 202.658 316.201 201.916 314.474C201.174 312.747 201.962 310.745 203.682 309.987Z',
    abaixo: 'M150 322.41L156.59 322.41C157.64 319.55 159.73 315.48 161.12 312.62C165.12 315.42 167.67 313.17 171.46 311.16L174.62 309.53C187.62 302.82 201.62 302.24 214.62 309.39C223.77 314.43 225.38 316.26 232.34 323.68L250 323.68L250 370L150 370Z',
  },
  {
    lente: [327.09, 316.28, 42.2], iris: [331.23, 316.83, 21.16],
    brilho: 'M340.853 309.987C342.002 309.466 343.344 309.615 344.352 310.378C345.357 311.139 345.863 312.391 345.674 313.638C345.485 314.885 344.624 315.928 343.437 316.355C341.7 316.979 339.78 316.122 339.086 314.411C338.392 312.702 339.172 310.749 340.853 309.987Z',
    abaixo: 'M280 321.69L294.89 321.69C296.535 320.652 299.987 316.878 301.951 315.215C304.84 312.98 308.05 311.2 311.21 309.36C324.21 301.79 338.14 302.93 351.14 309.56C355.28 311.67 358.5 313.23 362.88 314.3C365.01 314.83 367.55 322.83 368.56 325.49L380 325.49L380 370L280 370Z',
  },
];
const LINHA_DOS_CILIOS = 304; // a íris fecha (pisca) subindo até aqui, onde some embaixo dos cílios
const ROSTO = [263, 335]; // entre os olhos, em cima do nariz: de onde nasce a estrela

// a estrela da EMS (o mesmo contorno de estrela-ems.svg, sem a auréola de retícula): centro (501, 518), raio 311
const ESTRELA = '501,207 579.6,409.8 796.8,421.9 628.2,559.3 683.8,769.6 501,651.7 318.2,769.6 373.8,559.3 205.2,421.9 422.4,409.8';
const RAIO_ESTRELA = 311;
const DENTRO_DA_ESTRELA = 0.43; // o raio de dentro (as "cinturas" entre as pontas) em relação ao de fora

const el_ = (nome, attrs, pai) => {
  const e = document.createElementNS(NS, nome);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (pai) pai.appendChild(e);
  return e;
};

// põe o selo na abertura e, por cima, a camada dos olhos; devolve o que mexe neles
function montarSelo(lugar) {
  lugar.innerHTML = seloSvg;
  const svg = lugar.querySelector('svg');
  svg.removeAttribute('role');
  svg.removeAttribute('aria-label');
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  const defs = el_('defs', {}, svg);
  const irises = OLHOS.map((o, i) => {
    el_('circle', { cx: o.lente[0], cy: o.lente[1], r: o.lente[2] }, el_('clipPath', { id: `olho-lente-${i}` }, defs));
    el_('path', { d: o.abaixo }, el_('clipPath', { id: `olho-abaixo-${i}` }, defs));
    const g = el_('g', { 'clip-path': `url(#olho-abaixo-${i})` }, el_('g', { 'clip-path': `url(#olho-lente-${i})` }, svg));
    el_('rect', { x: o.lente[0] - 50, y: o.lente[1] - 50, width: 100, height: 100, fill: BRANCO }, g);
    const iris = el_('g', {}, g);
    el_('circle', { cx: o.iris[0], cy: o.iris[1], r: o.iris[2], fill: ROXO }, iris);
    el_('path', { d: o.brilho, fill: BRANCO }, iris);
    return { iris, cx: o.iris[0] };
  });
  // olhar: dx/dy = para onde a íris anda; aberto = 1 (normal) até 0 (fechado, piscando)
  const olhar = { dx: 0, dy: 0, aberto: 1 };
  const aplicar = () => irises.forEach(({ iris, cx }) => iris.setAttribute('transform',
    `translate(${olhar.dx} ${olhar.dy}) translate(${cx} ${LINHA_DOS_CILIOS}) scale(1 ${Math.max(olhar.aberto, 0.001)}) translate(${-cx} ${-LINHA_DOS_CILIOS})`));
  return { svg, olhar, aplicar };
}

export function runLoader(reduced) {
  const el = document.querySelector('[data-loader]');
  const html = document.documentElement;
  const done = () => html.classList.add('is-loaded');
  if (!el || reduced || html.classList.contains('sem-abertura')) { done(); return Promise.resolve(); }

  const lugar = el.querySelector('[data-loader-selo]');
  const ceu = el.querySelector('.loader__ceu');
  const tela = el.querySelector('[data-loader-estrelas]');
  const { svg, olhar, aplicar } = montarSelo(lugar);

  // as estrelas: uma tela do tamanho da janela; cada uma cresce a partir do rosto até cobrir tudo
  const W = innerWidth, H = innerHeight;
  tela.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const cores = ['var(--pink)', 'var(--ameixa)', 'var(--violeta)'];
  const estrelas = cores.map((cor) => {
    const g = el_('g', {}, tela);
    const p = el_('polygon', { points: ESTRELA, transform: 'translate(-501 -518)', 'stroke-width': 16, 'stroke-linejoin': 'round' }, g);
    p.style.fill = cor; p.style.stroke = cor; // as cores vêm dos tokens (var() só vale como estilo)
    return { g, s: 0, r: 0 };
  });
  let origem = [W / 2, H / 2];
  const medirRosto = () => {
    const r = svg.getBoundingClientRect();
    origem = [r.left + (ROSTO[0] / 544) * r.width, r.top + (ROSTO[1] / 705) * r.height];
  };
  const cobre = () => { // escala em que a cintura da estrela passa do canto mais longe da tela
    const [x, y] = origem;
    const longe = Math.max(Math.hypot(x, y), Math.hypot(W - x, y), Math.hypot(x, H - y), Math.hypot(W - x, H - y));
    return (longe / DENTRO_DA_ESTRELA / RAIO_ESTRELA) * 1.08;
  };
  const desenharEstrelas = () => estrelas.forEach((e) => {
    e.g.setAttribute('transform', `translate(${origem[0]} ${origem[1]}) rotate(${e.r}) scale(${e.s})`);
  });
  desenharEstrelas();

  return new Promise((resolve) => {
    const tl = gsap.timeline();
    const olho = (vars, t, dur = 0.18, ease = 'power2.out') => tl.to(olhar, { ...vars, duration: dur, ease, onUpdate: aplicar }, t);
    const piscar = (t) => tl.to(olhar, { aberto: 0, duration: 0.07, ease: 'power1.in', onUpdate: aplicar }, t)
      .to(olhar, { aberto: 1, duration: 0.11, ease: 'power1.out', onUpdate: aplicar }, t + 0.07);

    // ela chega, pisca e olha em volta (a coreografia da Xulia: olha de lado, desconfia, pisca e encara)
    tl.fromTo(lugar, { opacity: 0, scale: 0.7, y: 26 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'back.out(1.8)' }, 0)
      .from('.loader__line', { opacity: 0, y: 10, duration: 0.5 }, 0.25);
    olho({ dx: 7, dy: 1 }, 0.55);
    olho({ dx: -7, dy: 1 }, 1.1, 0.22, 'power2.inOut');
    olho({ dx: 0, dy: 0 }, 1.6);
    piscar(1.78);
    olho({ dx: 5, dy: 2, aberto: 0.5 }, 2.15, 0.2); // "hmm…" (desconfiada, de olho meio fechado)
    olho({ dx: 0, dy: 0, aberto: 1 }, 2.75, 0.16);
    piscar(2.95);
    piscar(3.2);

    // as estrelas nascem do rosto, uma dentro da outra, e a violeta vira o topo do site
    const T = 3.45;
    tl.call(medirRosto, null, T)
      .to(lugar, { scale: 1.12, duration: 0.5, ease: 'power2.in' }, T);
    estrelas.forEach((e, i) => {
      tl.fromTo(e, { s: 0, r: -24 }, { s: () => cobre(), r: 18, duration: 0.8, ease: 'power2.in', onUpdate: desenharEstrelas, immediateRender: false }, T + i * 0.2);
    });
    tl.set(ceu, { visibility: 'hidden' }, T + 0.8);

    // o selo dá uma flutuada enquanto espera (some com a abertura)
    const flutua = gsap.to(svg, { y: -6, duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.55 });
    tl.eventCallback('onComplete', () => { flutua.kill(); done(); resolve(); });
    // quem tiver pressa pula a abertura com um clique
    el.addEventListener('click', () => tl.progress(1), { once: true });
  });
}
