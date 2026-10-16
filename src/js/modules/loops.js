// Loops mudos dos cases em capítulos (campo `capitulos` em projects.js; HTML em scripts/gerar-cases.mjs):
// só baixam e tocam quando aparecem na tela e pausam quando saem (economiza dados e bateria no celular).
// Com "reduzir movimento" ligado, ficam parados na imagem de capa, com os controles para tocar se quiser.
export function initLoops(reduced) {
  const videos = document.querySelectorAll('video[data-loop]');
  if (!videos.length) return;
  if (reduced) {
    videos.forEach((v) => { v.controls = true; });
    return;
  }
  const io = new IntersectionObserver((entradas) => entradas.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); }
    else v.pause();
  }), { rootMargin: '200px 0px', threshold: 0.1 });
  videos.forEach((v) => io.observe(v));
}
