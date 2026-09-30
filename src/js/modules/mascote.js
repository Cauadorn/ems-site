import gsap from 'gsap';

// Selo EMS (arte original da Emilly, sem alterar o desenho): inclina levemente seguindo o cursor.
export function initMascote() {
  const wrap = document.querySelector('[data-mascote]');
  if (!wrap) return;
  const svg = wrap.querySelector('svg');
  const rx = gsap.quickTo(svg, 'rotationY', { duration: .6, ease: 'power3' });
  const ry = gsap.quickTo(svg, 'rotationX', { duration: .6, ease: 'power3' });
  gsap.set(wrap, { perspective: 800 });
  addEventListener('pointermove', (e) => {
    rx(((e.clientX / innerWidth) - .5) * 18);
    ry(((e.clientY / innerHeight) - .5) * -14);
  });
  wrap.addEventListener('click', () => gsap.fromTo(svg, { rotate: 0 }, { rotate: -8, duration: .2, yoyo: true, repeat: 1 }));
  wrap.dataset.cursorText = 'oi!';
}
