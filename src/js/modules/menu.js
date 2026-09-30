// Menu de tela cheia (celular e tablet)
export function initMenu(lenis) {
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!btn || !menu) return;
  const html = document.documentElement;

  const set = (open) => {
    html.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.nav__toggle-label').textContent = open ? 'Fechar' : 'Menu';
    if (open) { menu.hidden = false; lenis?.stop(); menu.querySelector('a')?.focus({ preventScroll: true }); }
    else { lenis?.start(); setTimeout(() => { if (!html.classList.contains('menu-open')) menu.hidden = true; }, 700); }
  };
  btn.addEventListener('click', () => set(!html.classList.contains('menu-open')));
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => set(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && html.classList.contains('menu-open')) { set(false); btn.focus(); } });
}
