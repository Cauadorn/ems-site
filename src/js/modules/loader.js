import gsap from 'gsap';

// Abertura da jubarte (pedido da Emilly em 05/11, inspirada no peixe em neon do kenjilambert.com): a baleia entra
// nadando pela direita e nada no lugar enquanto o contador vai de 0 a 100 e o traço passa do violeta ao rosa; em 100%
// ela sai nadando pela esquerda e o mar violeta sobe, cobre a tela e vira o topo do site. (Ela pediu sem o borrifo e
// sem o salto: a baleia só nada.)
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
  // fora da tela, à direita (a baleia olha para a esquerda)
  const fora = () => (innerWidth + baleia.offsetWidth) / 2 + 40;
  gsap.set(baleia, { x: fora(), opacity: 1 });

  // nadando: a cauda bate em volta da junta e o corpo sobe, desce e inclina de leve
  const nado = [
    gsap.fromTo(baleia.querySelector('.jubarte__cauda'), { rotation: -8, svgOrigin: '1410 520' }, { rotation: 8, svgOrigin: '1410 520', duration: .55, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.fromTo(baleia.querySelector('.jubarte'), { y: -6, rotation: 1.5 }, { y: 6, rotation: -1.5, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true }),
  ];

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: () => { nado.forEach((t) => t.kill()); done(); resolve(); } });
    tl.to(baleia, { x: 0, duration: 1.8, ease: 'power3.out' }, .1)
      .from('.loader__line', { opacity: 0, y: 10, duration: .5 }, .2)
      .to(n, { v: 100, duration: 2.4, ease: 'power1.inOut', onUpdate: () => { count.textContent = Math.round(n.v); baleia.style.color = cor(n.v / 100); } }, 0)
      // em 100%: sai nadando pela esquerda, descendo de leve; o mar sobe junto
      .to('.loader__count, .loader__line', { y: -24, opacity: 0, duration: .4, ease: 'power2.in' }, '+=.15')
      .to(baleia, { x: () => -fora(), y: 30, rotation: -5, duration: 1.2, ease: 'power2.in' }, '<')
      .to(mar, { y: 0, duration: 1, ease: 'power2.inOut' }, '<.45');
    // quem tiver pressa pula a abertura com um clique
    el.addEventListener('click', () => tl.progress(1), { once: true });
  });
}
