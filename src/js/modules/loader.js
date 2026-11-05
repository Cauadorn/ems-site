import gsap from 'gsap';

// Abertura da jubarte (pedido da Emilly em 05/11, inspirada no peixe em neon do kenjilambert.com): uma baleia pequena
// entra pela direita nadando em onda, dá uma volta em torno do contador (o nariz sempre segue o caminho) e sai pela
// esquerda, enquanto o contador vai de 0 a 100 e o traço passa do violeta ao rosa. Quando ela sai, o mar violeta sobe,
// cobre a tela e vira o topo do site. (Ela não gostou da baleia grande, do borrifo, do salto nem dela nadando reto.)
// Toca ao abrir ou recarregar a home; quem volta de outra página do site entra direto (decidido no <head> do index.html).
export function runLoader(reduced) {
  const el = document.querySelector('[data-loader]');
  const html = document.documentElement;
  const done = () => html.classList.add('is-loaded');
  if (!el || reduced || html.classList.contains('sem-abertura')) { done(); return Promise.resolve(); }

  const count = el.querySelector('[data-loader-count]');
  const baleia = el.querySelector('[data-loader-baleia]');
  const mar = el.querySelector('[data-loader-mar]');
  const cor = gsap.utils.interpolate('#6225D8', '#DD34A8'); // --violeta → --pink
  const n = { v: 0 };

  // o caminho, a partir do lugar da baleia (em cima do contador): 0 a 1 = entra em onda pela direita até o topo da
  // volta; 1 a 2 = a volta em torno do contador (elipse, no sentido anti-horário da tela); 2 a 3 = sai em onda pela esquerda
  count.textContent = '100'; // mede o contador já largo (100%), para a volta não raspar nos números
  const rb = baleia.getBoundingClientRect(), rc = count.getBoundingClientRect();
  count.textContent = '0';
  // centro da volta: um pouco abaixo do meio do contador, para ela passar por baixo da frase e não em cima
  const cy = (rc.top + rc.height * 0.62) - (rb.top + rb.height / 2);
  const ry = cy;
  const rx = rc.width / 2 + rb.height / 2 + 18;
  const fora = (innerWidth + rb.width) / 2 + 40;
  const lambda = Math.max(220, innerWidth * 0.3);
  const A = Math.min(innerHeight * 0.03, lambda * 0.07);
  const onda = (x) => A * (Math.cos((2 * Math.PI * x) / lambda) - 1); // 0 e reta em x = 0, onde começa e termina a volta
  const ponto = (s) => {
    if (s <= 1) { const x = fora * (1 - s); return [x, onda(x)]; }
    if (s <= 2) { const t = -Math.PI / 2 - 2 * Math.PI * (s - 1); return [rx * Math.cos(t), cy + ry * Math.sin(t)]; }
    const x = -fora * (s - 2); return [x, onda(x)];
  };
  const nado = { s: 0 };
  let giro = 0;
  const posicionar = () => {
    const [x, y] = ponto(nado.s);
    const [x0, y0] = ponto(Math.max(0, nado.s - 0.004));
    if (nado.s > 0.004) {
      // a baleia olha para a esquerda (180°): gira conforme a direção do movimento, sem pular de 180 para -180
      let alvo = (Math.atan2(y - y0, x - x0) * 180) / Math.PI - 180;
      while (alvo - giro > 180) alvo -= 360;
      while (alvo - giro < -180) alvo += 360;
      giro = alvo;
    }
    gsap.set(baleia, { x, y, rotation: giro });
  };
  posicionar();
  gsap.set(baleia, { opacity: 1 });
  const cauda = gsap.fromTo(baleia.querySelector('.jubarte__cauda'), { rotation: -9, svgOrigin: '1410 520' }, { rotation: 9, svgOrigin: '1410 520', duration: .45, ease: 'sine.inOut', repeat: -1, yoyo: true });

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: () => { cauda.kill(); done(); resolve(); } });
    tl.to(nado, { s: 1, duration: 1.3, ease: 'power1.out', onUpdate: posicionar }, .1)
      .to(nado, { s: 2, duration: 1.7, ease: 'sine.inOut', onUpdate: posicionar })
      .to(nado, { s: 3, duration: 1.2, ease: 'power1.in', onUpdate: posicionar })
      .from('.loader__line', { opacity: 0, y: 10, duration: .5 }, .2)
      .to(n, { v: 100, duration: 2.9, ease: 'power1.inOut', onUpdate: () => { count.textContent = Math.round(n.v); baleia.style.color = cor(n.v / 100); } }, 0)
      // em 100%: o texto sobe e some; enquanto ela sai pela esquerda, o mar sobe
      .to('.loader__count, .loader__line', { y: -24, opacity: 0, duration: .4, ease: 'power2.in' }, 3.1)
      .to(mar, { y: 0, duration: 1, ease: 'power2.inOut' }, 3.5);
    // quem tiver pressa pula a abertura com um clique
    el.addEventListener('click', () => tl.progress(1), { once: true });
  });
}
