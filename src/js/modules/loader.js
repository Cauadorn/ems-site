import gsap from 'gsap';

// Abertura da jubarte (pedido da Emilly em 05/11, inspirada no peixe em neon do kenjilambert.com): a baleia se
// desenha e nada no lugar enquanto o contador vai de 0 a 100 e o traço passa do violeta ao rosa; em 100% ela borrifa,
// salta e mergulha, e o mar violeta sobe, cobre a tela e vira o topo do site.
// Toca ao abrir ou recarregar a home; quem volta de outra página do site entra direto (decidido no <head> do index.html).
export function runLoader(reduced) {
  const el = document.querySelector('[data-loader]');
  const html = document.documentElement;
  const done = () => html.classList.add('is-loaded');
  if (!el || reduced || html.classList.contains('sem-abertura')) { done(); return Promise.resolve(); }

  const count = el.querySelector('[data-loader-count]');
  const baleia = el.querySelector('[data-loader-baleia]');
  const tracos = baleia.querySelectorAll('.jubarte__corpo path, .jubarte__nadadeira path, .jubarte__cauda path');
  const borrifo = baleia.querySelectorAll('.jubarte__borrifo path');
  const pontos = baleia.querySelectorAll('.jubarte__pontos circle');
  const mar = el.querySelector('[data-loader-mar]');
  const cor = gsap.utils.interpolate('#6225D8', '#DD34A8'); // --violeta → --pink
  const n = { v: 0 };

  gsap.set([...tracos, ...borrifo], { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(pontos, { scale: 0, transformOrigin: '50% 50%' });
  gsap.set(baleia.querySelector('.jubarte__pontos'), { opacity: 1 });

  // nadando no lugar: a cauda e a nadadeira batem e o corpo sobe e desce
  const nado = [
    gsap.fromTo(baleia.querySelector('.jubarte__cauda'), { rotation: -9, svgOrigin: '528 149' }, { rotation: 9, svgOrigin: '528 149', duration: .6, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.fromTo(baleia.querySelector('.jubarte__nadadeira'), { rotation: 5, svgOrigin: '252 222' }, { rotation: -7, svgOrigin: '252 222', duration: .9, ease: 'sine.inOut', repeat: -1, yoyo: true }),
    gsap.fromTo(baleia, { y: -6 }, { y: 6, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true }),
  ];

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: () => { nado.forEach((t) => t.kill()); done(); resolve(); } });
    tl.to(tracos, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: .08 }, .1)
      .to(pontos, { scale: 1, duration: .4, ease: 'back.out(3)', stagger: .05 }, .9)
      .from('.loader__line', { opacity: 0, y: 10, duration: .5 }, .2)
      .to(n, { v: 100, duration: 2.4, ease: 'power1.inOut', onUpdate: () => { count.textContent = Math.round(n.v); baleia.style.color = cor(n.v / 100); } }, 0)
      // em 100%: borrifa, salta (nariz para cima) e mergulha (nariz para baixo, para a frente); o mar sobe junto
      .to(borrifo, { strokeDashoffset: 0, duration: .35, ease: 'power2.out', stagger: .05 })
      .add(() => nado.forEach((t) => t.pause()))
      .to(baleia, { y: -34, rotation: 12, duration: .35, ease: 'power2.out' }, '+=.05')
      .to(borrifo, { opacity: 0, duration: .25 }, '<.1')
      .to('.loader__count, .loader__line', { y: -24, opacity: 0, duration: .4, ease: 'power2.in' }, '<')
      .to(baleia, { x: '-10vw', y: '58vh', rotation: -38, duration: .9, ease: 'power2.in' })
      .to(mar, { y: 0, duration: 1, ease: 'power2.inOut' }, '<.15');
    // quem tiver pressa pula a abertura com um clique
    el.addEventListener('click', () => tl.progress(1), { once: true });
  });
}
