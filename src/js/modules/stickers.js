import gsap from 'gsap';

// Adesivos do hero: flutuam sozinhos e dá para arrastar (mouse ou dedo).
export function initStickers() {
  document.querySelectorAll('[data-sticker]').forEach((s, i) => {
    const float = gsap.to(s, { y: '+=12', rotate: i % 2 ? 6 : -6, duration: 2.2 + i * .3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    let sx = 0, sy = 0, ox = 0, oy = 0, down = false;

    s.addEventListener('pointerdown', (e) => {
      down = true; float.pause();
      s.setPointerCapture(e.pointerId);
      s.classList.add('is-dragging');
      sx = e.clientX; sy = e.clientY;
      ox = gsap.getProperty(s, 'x'); oy = gsap.getProperty(s, 'y');
      gsap.to(s, { scale: 1.15, duration: .25, ease: 'back.out(3)' });
    });
    s.addEventListener('pointermove', (e) => {
      if (!down) return;
      gsap.set(s, { x: ox + e.clientX - sx, y: oy + e.clientY - sy, rotate: (e.clientX - sx) * .08 });
    });
    const up = () => {
      if (!down) return;
      down = false;
      s.classList.remove('is-dragging');
      gsap.to(s, { scale: 1, rotate: 0, duration: .5, ease: 'elastic.out(1, .5)' });
    };
    s.addEventListener('pointerup', up);
    s.addEventListener('pointercancel', up);
  });
}
