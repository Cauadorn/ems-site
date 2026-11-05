// Fundo do mar no fim da home (pedido da Emilly em 05/11): a jubarte (vídeo dela nadando, do Higgsfield + Remotion) passa
// em onda e passam peixinhos e bolhas, cada um numa altura, tamanho, cor e velocidade (o movimento é em CSS, em sections.css).
// Sem volta automática para o começo: a página termina no rodapé, com o botão de voltar ao topo. Com "reduzir movimento", tudo fica parado.
const CORES = ['var(--lavanda-2)', 'var(--manteiga)', 'var(--lavanda)', 'var(--pink)'];
const sorte = (a, b) => a + Math.random() * (b - a);

export function initMar(reduced) {
  const mar = document.querySelector('[data-mar]');
  if (!mar) return;
  if (reduced) { mar.classList.add('is-calmo'); return; }

  // a baleia (vídeo) só nada enquanto o mar aparece na tela
  const video = mar.querySelector('[data-mar-video]');
  if (video) new IntersectionObserver(([e]) => { if (e.isIntersecting) video.play().catch(() => {}); else video.pause(); }).observe(mar);

  const bolhas = mar.querySelector('[data-mar-bolhas]');
  for (let i = 0; i < 14; i++) {
    const b = document.createElement('span');
    const t = sorte(6, 22);
    b.className = 'mar__bolha';
    b.style.cssText = `left:${sorte(0, 100).toFixed(1)}%;width:${t.toFixed(0)}px;height:${t.toFixed(0)}px;` +
      `animation-duration:${sorte(7, 15).toFixed(1)}s;animation-delay:-${sorte(0, 12).toFixed(1)}s;--b-x:${sorte(-30, 30).toFixed(0)}px`;
    bolhas.append(b);
  }

  const peixes = mar.querySelector('[data-mar-peixes]');
  for (let i = 0; i < 9; i++) {
    const p = document.createElement('span');
    p.className = `mar__peixe${i % 3 === 1 ? ' mar__peixe--direita' : ''}`;
    p.style.cssText = `top:${sorte(8, 78).toFixed(1)}%;width:${sorte(26, 52).toFixed(0)}px;color:${CORES[i % CORES.length]};` +
      `animation-duration:${sorte(11, 24).toFixed(1)}s;animation-delay:-${sorte(0, 20).toFixed(1)}s`;
    p.innerHTML = '<svg><use href="#peixinho"/></svg>';
    peixes.append(p);
  }
}
