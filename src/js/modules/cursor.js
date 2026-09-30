import gsap from 'gsap';

// Cursor da marca (a setinha das artes dela) com etiqueta contextual.
// Só em aparelhos com mouse; no celular fica o toque normal.
export function initCursor() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const el = document.querySelector('[data-cursor]');
  if (!el) return;
  const label = el.querySelector('[data-cursor-label]');
  document.documentElement.classList.add('has-cursor');

  const xTo = gsap.quickTo(el, 'x', { duration: .18, ease: 'power3' });
  const yTo = gsap.quickTo(el, 'y', { duration: .18, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    xTo(e.clientX - 4); yTo(e.clientY - 2);
    const t = e.target.closest?.('[data-cursor-text]');
    const text = t?.dataset.cursorText;
    if (text && label.textContent !== text) label.textContent = text;
    el.classList.toggle('is-label', !!text);
  });
  addEventListener('pointerdown', () => el.classList.add('is-down'));
  addEventListener('pointerup', () => el.classList.remove('is-down'));
  document.addEventListener('pointerleave', () => gsap.to(el, { opacity: 0, duration: .2 }));
  document.addEventListener('pointerenter', () => gsap.to(el, { opacity: 1, duration: .2 }));
}
