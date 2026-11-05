import gsap from 'gsap';

// Abertura da jubarte (pedido da Emilly em 05/11, inspirada no peixe em neon do kenjilambert.com): uma baleia pequena
// atravessa a tela nadando em onda (sobe e desce, com o nariz acompanhando a onda), devagar quando passa pelo contador,
// enquanto ele vai de 0 a 100 e o traço passa do violeta ao rosa. Ao sair pela esquerda, o mar violeta sobe, cobre a
// tela e vira o topo do site. (Ela não gostou da baleia grande, do borrifo, do salto nem dela nadando reto.)
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

  // o caminho: uma onda no espaço (a baleia olha para a esquerda e vai para a esquerda). y = -A·cos(2πx/λ): no meio da
  // tela ela passa na crista, reta; fora dali o nariz segue a inclinação da onda
  const fora = (innerWidth + baleia.offsetWidth) / 2 + 40;
  const lambda = Math.max(240, innerWidth * 0.42);
  const A = Math.min(innerHeight * 0.035, lambda * 0.07);
  const k = (2 * Math.PI) / lambda;
  const nado = { x: fora };
  const posicionar = () => {
    const inclinacao = Math.atan(A * k * Math.sin(k * nado.x)) * (180 / Math.PI);
    gsap.set(baleia, { x: nado.x, y: -A * Math.cos(k * nado.x), rotation: inclinacao });
  };
  posicionar();
  gsap.set(baleia, { opacity: 1 });
  // rápido nas bordas e devagar no meio (passa sem pressa pelo contador)
  const devagarNoMeio = (t) => t + (0.72 * Math.sin(2 * Math.PI * t)) / (2 * Math.PI);
  const cauda = gsap.fromTo(baleia.querySelector('.jubarte__cauda'), { rotation: -9, svgOrigin: '1410 520' }, { rotation: 9, svgOrigin: '1410 520', duration: .45, ease: 'sine.inOut', repeat: -1, yoyo: true });

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: () => { cauda.kill(); done(); resolve(); } });
    tl.to(nado, { x: -fora, duration: 4.6, ease: devagarNoMeio, onUpdate: posicionar }, .1)
      .from('.loader__line', { opacity: 0, y: 10, duration: .5 }, .2)
      .to(n, { v: 100, duration: 2.8, ease: 'power1.inOut', onUpdate: () => { count.textContent = Math.round(n.v); baleia.style.color = cor(n.v / 100); } }, 0)
      // em 100%: o texto sobe e some; enquanto ela sai pela esquerda, o mar sobe
      .to('.loader__count, .loader__line', { y: -24, opacity: 0, duration: .4, ease: 'power2.in' }, 3)
      .to(mar, { y: 0, duration: 1, ease: 'power2.inOut' }, 3.5);
    // quem tiver pressa pula a abertura com um clique
    el.addEventListener('click', () => tl.progress(1), { once: true });
  });
}
