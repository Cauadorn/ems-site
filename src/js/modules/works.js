import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Página "Todos os projetos": os botões de área FILTRAM a página (mostram só aquela área), em vez de rolar até ela.
// "Todos" mostra tudo. O filtro fica no endereço (?area=produtos), então dá pra mandar o link de uma área só.
export function initWorks() {
  const nav = document.querySelector('[data-works-nav]');
  if (!nav) return;
  const sections = [...document.querySelectorAll('[data-area-section]')];
  const ids = sections.map((s) => s.id);

  const show = (id) => {
    if (!ids.includes(id)) id = '';
    sections.forEach((s) => { s.hidden = Boolean(id) && s.id !== id; });
    nav.querySelectorAll('[data-area]').forEach((a) => {
      if (a.dataset.area === id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    ScrollTrigger.refresh();
  };

  nav.addEventListener('click', (e) => {
    const a = e.target.closest('[data-area]');
    if (!a) return;
    e.preventDefault();
    const id = a.dataset.area;
    history.pushState(null, '', id ? `?area=${id}` : location.pathname);
    show(id);
  });
  addEventListener('popstate', () => show(new URLSearchParams(location.search).get('area') || ''));
  show(new URLSearchParams(location.search).get('area') || '');
}
