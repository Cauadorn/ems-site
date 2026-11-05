// Fundo do mar no fim da home (pedido da Emilly em 05/11: "não quero vetor, quero movimentos fluidos"): a cena inteira é
// um vídeo em loop pintado e animado no Higgsfield (jubarte, cardume, algas, raios de luz, bolhas). Há uma versão deitada
// (computador) e uma em pé (celular e tablet em pé); o vídeo só carrega perto da tela e só toca enquanto aparece.
// Com "reduzir movimento", fica a imagem parada. Sem volta automática para o começo: a página termina no rodapé.
export function initMar(reduced) {
  const mar = document.querySelector('[data-mar]');
  const video = mar?.querySelector('[data-mar-video]');
  if (!mar || !video) return;
  if (reduced) mar.classList.add('is-calmo');

  const emPe = matchMedia('(orientation: portrait)');
  let visivel = false;
  let carregar = false;
  const escolher = () => {
    const lado = emPe.matches ? 'alto' : 'largo';
    if (video.dataset.lado === lado) return;
    video.dataset.lado = lado;
    video.poster = video.dataset[`${lado}Poster`];
    if (carregar && !reduced) { video.src = video.dataset[lado]; if (visivel) video.play().catch(() => {}); }
  };
  escolher();
  emPe.addEventListener?.('change', escolher);
  if (reduced) return;

  // começa a baixar um pouco antes de a seção aparecer; toca só enquanto ela está na tela
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !carregar) { carregar = true; video.src = video.dataset[video.dataset.lado]; }
  }, { rootMargin: '800px 0px' }).observe(mar);
  new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel) video.play().catch(() => {}); else video.pause();
  }).observe(mar);
}
