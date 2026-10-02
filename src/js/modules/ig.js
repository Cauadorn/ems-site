// Carrosséis de Instagram nas páginas de case (campo `carrosseis` em projects.js; HTML em scripts/gerar-cases.mjs):
// uma lâmina por vez. Passa com o dedo ou o touchpad (rolagem com encaixe), pelas setas ou pelas setas do teclado;
// os pontinhos mostram em qual lâmina está. Vídeo só toca quando a lâmina dele está na tela.
export function initIg() {
  document.querySelectorAll('[data-ig]').forEach((root) => {
    const trilho = root.querySelector('[data-ig-trilho]');
    const laminas = [...trilho.children];
    const pontos = [...root.querySelectorAll('.ig-carrossel__pontos span')];
    const prev = root.querySelector('[data-ig-prev]');
    const next = root.querySelector('[data-ig-next]');
    let atual = -1;
    const visivel = { v: false };

    const marca = () => {
      const i = Math.round(trilho.scrollLeft / trilho.clientWidth);
      if (i === atual) return;
      atual = i;
      pontos.forEach((p, k) => p.classList.toggle('is-active', k === i));
      prev.disabled = i <= 0;
      next.disabled = i >= laminas.length - 1;
      laminas.forEach((l, k) => {
        const v = l.querySelector('video');
        if (!v) return;
        if (k === i && visivel.v) v.play().catch(() => {});
        else v.pause();
      });
    };
    const vai = (dir) => trilho.scrollTo({ left: (atual + dir) * trilho.clientWidth, behavior: 'smooth' });

    trilho.addEventListener('scroll', marca, { passive: true });
    prev.addEventListener('click', () => vai(-1));
    next.addEventListener('click', () => vai(1));
    trilho.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); vai(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); vai(-1); }
    });
    // o vídeo só roda com o carrossel na tela (economiza bateria no celular)
    new IntersectionObserver(([e]) => { visivel.v = e.isIntersecting; atual = -1; marca(); }, { threshold: 0.4 }).observe(root);
    addEventListener('resize', () => { atual = -1; trilho.scrollLeft = Math.max(0, pontos.findIndex((p) => p.classList.contains('is-active'))) * trilho.clientWidth; marca(); });
    marca();
  });
}
