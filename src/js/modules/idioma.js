// Português / English (botão PT · EN no menu, pedido da Emilly em 05/11, inspirada no kenjilambert.com).
// O português está no HTML; o inglês fica ao lado, no próprio elemento:
//   data-en="..."        o conteúdo em inglês (pode ter <em>)
//   data-en-aria / -alt / -title / -content / -cursor   o atributo em inglês (aria-label, alt, title, content,
//                         data-cursor-text)
// A escolha fica guardada no navegador. O <head> (partials/head.html) já marca a página antes de ela aparecer, para o
// português não piscar. Conteúdo criado pelo JS chama traduzir(raiz) depois de entrar na página; textos que o JS
// escreve usam t('pt', 'en') e ouvem o evento "idioma".
const CHAVE = 'ems-idioma';
const ATRIBUTOS = { aria: 'aria-label', alt: 'alt', title: 'title', content: 'content', cursor: 'data-cursor-text' };
const html = document.documentElement;

export let idioma = html.classList.contains('idioma-en') ? 'en' : 'pt';
export const t = (pt, en) => (idioma === 'en' ? en : pt);

export function traduzir(raiz = document) {
  const en = idioma === 'en';
  raiz.querySelectorAll('[data-en]').forEach((el) => {
    if (!('pt' in el.dataset)) el.dataset.pt = el.innerHTML;
    const novo = en ? el.dataset.en : el.dataset.pt;
    if (el.innerHTML !== novo) el.innerHTML = novo;
  });
  for (const [k, attr] of Object.entries(ATRIBUTOS)) {
    const de = `data-en-${k}`, guarda = `data-pt-${k}`;
    raiz.querySelectorAll(`[${de}]`).forEach((el) => {
      if (!el.hasAttribute(guarda)) el.setAttribute(guarda, el.getAttribute(attr) ?? '');
      el.setAttribute(attr, en ? el.getAttribute(de) : el.getAttribute(guarda));
    });
  }
}

function definir(novo, avisar = true) {
  idioma = novo;
  try { localStorage.setItem(CHAVE, novo); } catch (e) { /* navegador sem armazenamento: vale só nesta página */ }
  html.lang = novo === 'en' ? 'en' : 'pt-BR';
  html.classList.toggle('idioma-en', novo === 'en');
  traduzir();
  document.querySelectorAll('[data-idioma]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.idioma === novo)));
  if (avisar) document.dispatchEvent(new CustomEvent('idioma', { detail: novo }));
}

export function initIdioma() {
  document.querySelectorAll('[data-idioma]').forEach((b) => b.addEventListener('click', () => { if (b.dataset.idioma !== idioma) definir(b.dataset.idioma); }));
  definir(idioma, false);
  html.classList.remove('idioma-esperando');
}
