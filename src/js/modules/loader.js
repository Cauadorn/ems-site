import gsap from 'gsap';
import { criarBaleiaGL } from './baleia-gl.js';

// Abertura da jubarte (pedido da Emilly em 05/11, inspirada no peixe em neon do kenjilambert.com). Ela entra pela direita
// em onda, dá uma volta em torno do contador e sai pela esquerda, enquanto o contador vai de 0 a 100 e o traço passa do
// violeta ao rosa. Quando ela sai, o mar violeta sobe, cobre a tela e vira o topo do site.
// A baleia tem o corpo flexível (baleia-gl.js): o corpo segue o caminho e curva nas voltas, e a cauda bate. (A Emilly
// achou "dura" a baleia em vídeo girando inteira; também não gostou do desenho parado, do borrifo, do salto nem dela
// nadando reto.) Sem WebGL, fica o vídeo dela nadando (fonte em docs/baleia/).
// Toca ao abrir ou recarregar a home; quem volta de outra página do site entra direto (decidido no <head> do index.html).
const VIOLETA = [0x62 / 255, 0x25 / 255, 0xd8 / 255];
const ROSA = [0xdd / 255, 0x34 / 255, 0xa8 / 255];

export function runLoader(reduced) {
  const el = document.querySelector('[data-loader]');
  const html = document.documentElement;
  const done = () => html.classList.add('is-loaded');
  if (!el || reduced || html.classList.contains('sem-abertura')) { done(); return Promise.resolve(); }

  const count = el.querySelector('[data-loader-count]');
  const baleia = el.querySelector('[data-loader-baleia]'); // o lugar e o tamanho da baleia (em cima do contador)
  const mar = el.querySelector('[data-loader-mar]');
  const n = { v: 0 };

  // o caminho, a partir do lugar da baleia: 0 a 1 = entra em onda pela direita até o topo da volta; 1 a 2 = a volta em
  // torno do contador (elipse, no sentido anti-horário da tela); 2 a 3 = sai em onda pela esquerda
  // mede o bloco do contador já largo ("100%" + a frase de baixo), para a volta não raspar nos números
  count.textContent = '100';
  const rb = baleia.getBoundingClientRect();
  const r1 = count.parentElement.getBoundingClientRect();
  const r2 = el.querySelector('.loader__line')?.getBoundingClientRect() ?? r1;
  count.textContent = '0';
  const meio = rb.left + rb.width / 2;
  const meiaLargura = Math.max(meio - Math.min(r1.left, r2.left), Math.max(r1.right, r2.right) - meio);
  // centro da volta: no meio do bloco; no alto ela passa onde começa (em cima do número), embaixo passa abaixo da frase
  const cy = ((r1.top + Math.max(r1.bottom, r2.bottom)) / 2) - (rb.top + rb.height / 2);
  const ry = cy;
  const ryBaixo = cy + rb.height * 0.45; // embaixo a volta desce um pouco mais, para não raspar na frase
  // de lado ela não encosta na frase e, no celular, também não sai da tela (com folga para a cauda bater)
  const rx = Math.min(meiaLargura + rb.height * 0.55 + 24, innerWidth / 2 - rb.height * 0.5 - rb.width * 0.1 - 8);
  // longe o bastante para o corpo inteiro (que vem atrás da cabeça) começar e terminar fora da tela
  const fora = innerWidth / 2 + rb.width * 1.15 + 30;
  const lambda = Math.max(220, innerWidth * 0.3);
  const A = Math.min(innerHeight * 0.03, lambda * 0.07);
  const onda = (x) => A * (Math.cos((2 * Math.PI * x) / lambda) - 1); // 0 e reta em x = 0, onde começa e termina a volta
  const ponto = (s) => {
    if (s <= 1) { const x = fora * (1 - s); return [x, onda(x)]; }
    if (s <= 2) { const t = -Math.PI / 2 - 2 * Math.PI * (s - 1); const sn = Math.sin(t); return [rx * Math.cos(t), cy + (sn > 0 ? ryBaixo : ry) * sn]; }
    const x = -fora * (s - 2); return [x, onda(x)];
  };
  const nado = { s: 0 };
  const cor = [...VIOLETA];
  const mistura = () => { const k = n.v / 100; for (let i = 0; i < 3; i++) cor[i] = VIOLETA[i] + (ROSA[i] - VIOLETA[i]) * k; };

  // a baleia de corpo flexível (WebGL) ou, sem WebGL, o vídeo dela girando inteira pelo caminho
  const tela = el.querySelector('[data-loader-tela]');
  const gl = tela && criarBaleiaGL(tela, `${import.meta.env.BASE_URL}img/baleia/baleia-mascara.png`, {
    ponto, sMin: -1.5, sMax: 3.5, origem: [rb.left + rb.width / 2, rb.top + rb.height / 2],
    comprimento: rb.width, altura: rb.height,
  });
  let desenhar;
  let parar = () => {};
  if (gl) {
    desenhar = () => { mistura(); gl.desenhar(nado.s, cor); };
    gsap.ticker.add(desenhar);
    parar = () => { gsap.ticker.remove(desenhar); gl.destruir(); };
  } else {
    const video = baleia.querySelector('video');
    if (video) { video.src = video.dataset.src; video.play().catch(() => {}); }
    let giro = 0;
    desenhar = () => {
      const [x, y] = ponto(nado.s);
      const [x0, y0] = ponto(nado.s - 0.004);
      // a baleia olha para a esquerda (180°): gira conforme a direção do movimento, sem pular de 180 para -180
      let alvo = (Math.atan2(y - y0, x - x0) * 180) / Math.PI - 180;
      while (alvo - giro > 180) alvo -= 360;
      while (alvo - giro < -180) alvo += 360;
      giro = alvo;
      gsap.set(baleia, { x, y, rotation: giro, opacity: 1, filter: `hue-rotate(${(n.v * 0.55).toFixed(1)}deg)` });
    };
    desenhar();
    parar = () => video?.pause();
  }

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: () => { parar(); done(); resolve(); } });
    const passo = gl ? undefined : desenhar;
    tl.to(nado, { s: 1, duration: 1.3, ease: 'power1.out', onUpdate: passo }, .1)
      .to(nado, { s: 2, duration: 1.7, ease: 'sine.inOut', onUpdate: passo })
      .to(nado, { s: 3, duration: 1.2, ease: 'power1.in', onUpdate: passo })
      .from('.loader__line', { opacity: 0, y: 10, duration: .5 }, .2)
      .to(n, { v: 100, duration: 2.9, ease: 'power1.inOut', onUpdate: () => { count.textContent = Math.round(n.v); } }, 0)
      // em 100%: o texto sobe e some; enquanto ela sai pela esquerda, o mar sobe
      .to('.loader__count, .loader__line', { y: -24, opacity: 0, duration: .4, ease: 'power2.in' }, 3.1)
      .to(mar, { y: 0, duration: 1, ease: 'power2.inOut' }, 3.5);
    // quem tiver pressa pula a abertura com um clique
    el.addEventListener('click', () => tl.progress(1), { once: true });
  });
}
