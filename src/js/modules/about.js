import gsap from 'gsap';

// Chave CPF × CNPJ (vem do post dela "o que a Emi faz")
export function initAbout() {
  const box = document.querySelector('[data-cpfcnpj]');
  if (!box) return;
  const tabs = [...box.querySelectorAll('[role="tab"]')];

  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) gsap.from(panel.children, { y: 14, opacity: 0, scale: .9, duration: .45, ease: 'back.out(2)', stagger: .04 });
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.focus(); select(next);
    });
  });
}
