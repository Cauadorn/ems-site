import gsap from 'gsap';

// Abertura: mascote aparece, contador vai a 100 e três cortinas (creme, violeta, vinho) sobem.
// Só roda na primeira visita da sessão; depois disso o site abre direto.
export function runLoader(reduced) {
  const el = document.querySelector('[data-loader]');
  const done = () => document.documentElement.classList.add('is-loaded');
  let seen = false;
  try { seen = sessionStorage.getItem('ems-loader') === '1'; } catch {}
  if (!el || reduced || seen) { done(); return Promise.resolve(); }
  try { sessionStorage.setItem('ems-loader', '1'); } catch {}

  const count = el.querySelector('[data-loader-count]');
  const layers = [
    el.querySelector('.loader__layer--ivory'),
    el.querySelector('.loader__layer--violeta'),
    el.querySelector('.loader__layer--wine'),
  ];
  const n = { v: 0 };

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: () => { done(); resolve(); } });
    tl.from('.loader__mascote', { scale: 0, rotate: -25, duration: .8, ease: 'back.out(2)' })
      .from('.loader__line', { opacity: 0, y: 10, duration: .5 }, '<.2')
      .to(n, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => (count.textContent = Math.round(n.v)) }, '<')
      .to('.loader__mascote', { scaleY: .1, duration: .08, yoyo: true, repeat: 1, transformOrigin: '50% 55%' }, '-=.4')
      .to('.loader__content', { y: -40, opacity: 0, duration: .45, ease: 'power2.in' }, '+=.1')
      .to(layers, { yPercent: -100, duration: .9, ease: 'expo.inOut', stagger: .12 }, '-=.1');
    // quem tiver pressa pula a abertura com um clique
    el.addEventListener('click', () => tl.progress(1), { once: true });
  });
}
