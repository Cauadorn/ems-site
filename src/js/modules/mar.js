import gsap from 'gsap';

// Fundo do mar no fim da home (pedido da Emilly em 05/11, inspirado no kenjilambert.com, que volta para o começo
// sem parar): bolhas sobem, a jubarte nada e, perto do fim, mergulha conforme a rolagem. A última tela é o violeta do
// topo (a "superfície"): quando ela cobre a tela, o site volta para o começo e a entrada do topo toca de novo.
// Com "reduzir movimento", tudo fica parado e não há volta automática.
export function initMar(lenis, reduced, aoVoltar) {
  const mar = document.querySelector('[data-mar]');
  if (!mar) return;
  if (reduced) { mar.classList.add('is-calmo'); return; }

  // bolhas: tamanhos, lugares e velocidades diferentes
  const bolhas = mar.querySelector('[data-mar-bolhas]');
  for (let i = 0; i < 14; i++) {
    const b = document.createElement('span');
    const t = 6 + Math.random() * 16;
    b.className = 'mar__bolha';
    b.style.cssText = `left:${(Math.random() * 100).toFixed(1)}%;width:${t.toFixed(0)}px;height:${t.toFixed(0)}px;` +
      `animation-duration:${(7 + Math.random() * 8).toFixed(1)}s;animation-delay:-${(Math.random() * 12).toFixed(1)}s;--b-x:${(Math.random() * 60 - 30).toFixed(0)}px`;
    bolhas.append(b);
  }

  // mergulho: enquanto a superfície sobe, a baleia desce devagar, nariz um pouco para baixo, sem parar de nadar
  const superficie = mar.querySelector('[data-mar-superficie]');
  gsap.to(mar.querySelector('[data-mar-baleia]'), {
    y: () => innerHeight * 0.55, rotation: -10, ease: 'sine.inOut',
    scrollTrigger: { trigger: superficie, start: 'top bottom', end: 'top 15%', scrub: true, invalidateOnRefresh: true },
  });

  // chegou ao fim (a superfície cobre a tela): volta para o começo
  let voltando = false;
  function checar(y) {
    if (voltando) return;
    const fim = lenis ? lenis.limit : document.documentElement.scrollHeight - innerHeight;
    if (y < fim - 4 || superficie.getBoundingClientRect().top > 4) return;
    voltando = true;
    lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : scrollTo(0, 0);
    aoVoltar();
    setTimeout(() => { voltando = false; }, 1500);
  }
  if (lenis) lenis.on('scroll', ({ scroll }) => checar(scroll));
  else addEventListener('scroll', () => checar(scrollY), { passive: true });
}
