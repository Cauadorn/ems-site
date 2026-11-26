import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { idioma } from './idioma.js';

// Entrada do hero, depois da abertura: o topo se monta peça por peça, como na abertura da Xulia Petit (26/11). O menu
// desce, as caixas do EMS caem uma de cada vez e batem na mesa como post-its, a frase se escreve da esquerda para a
// direita e as etiquetas e os adesivos chegam batendo, um de cada vez. Devolve quando o crachá pode cair (segundos).
export function heroIntro(reduced) {
  if (reduced) return 0;
  const tl = gsap.timeline();
  tl.from('.site-header .nav', { yPercent: -160, opacity: 0, duration: .8, ease: 'expo.out', clearProps: 'transform,opacity' }, 0)
    .from('[data-hero-box]', { scale: 1.45, rotate: (i) => [-9, 7, -6][i], opacity: 0, duration: .5, ease: 'back.out(1.7)', stagger: .15 }, .05)
    .from('[data-hero-box] > span', { yPercent: 105, duration: .7, ease: 'expo.out', stagger: .15 }, .12)
    // a frase "se escreve": cada linha aparece da esquerda para a direita (a folga em cima, embaixo e dos lados é para
    // não cortar as letras inclinadas do itálico)
    .fromTo('[data-hero-line]', { clipPath: 'inset(-25% 100% -25% -6%)' }, { clipPath: 'inset(-25% -6% -25% -6%)', duration: .85, ease: 'power2.inOut', stagger: .4, clearProps: 'clipPath' }, .6)
    // etiquetas e adesivos chegam batendo, grandes, e assentam (como o adesivo "do not copy" dela)
    .from('[data-hero-pop]', { scale: 2.3, opacity: 0, duration: .45, ease: 'back.out(2)', stagger: .18 }, 1.25)
    .from('.hero .sparkle', { scale: 0, duration: .5, ease: 'back.out(3)', stagger: .1 }, 1.6)
    .from('[data-hero-item]', { y: 24, opacity: 0, duration: .7, ease: 'expo.out' }, 1.7);

  // o logo "respira" em loop, como o vídeo-logo da Pixel
  gsap.to('[data-hero-box]', { yPercent: -6, rotate: (i) => [-2, 2, -1.5][i], duration: .9, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: .18 }, delay: 1.9 });
  return 1.5;
}

export function initReveals(reduced) {
  // manifesto: as palavras acendem conforme a rolagem
  const m = document.querySelector('[data-manifesto]');
  if (m) {
    // em inglês (botão PT · EN) o texto vem de data-manifesto-en e as palavras são separadas de novo
    const pt = m.textContent;
    let progresso = reduced ? 1 : 0;
    const acender = () => {
      const words = m.querySelectorAll('.w');
      const on = Math.round(progresso * words.length);
      words.forEach((w, i) => w.classList.toggle('is-on', i < on));
    };
    const montar = () => { m.textContent = idioma === 'en' && m.dataset.manifestoEn ? m.dataset.manifestoEn : pt; splitWords(m); acender(); };
    montar();
    document.addEventListener('idioma', montar);
    if (!reduced) ScrollTrigger.create({
      trigger: m, start: 'top 90%', end: 'top 45%', scrub: true,
      onUpdate: (st) => { progresso = st.progress; acender(); },
    });
  }

  if (reduced) return;

  // blocos entram de baixo
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    // fromTo com o fim explícito: se a entrada disparar de novo no meio, o bloco termina no lugar certo (antes os
    // cartões do processo travavam mais baixos e girados, parecendo uma escadinha)
    onEnter: (els) => gsap.fromTo(els, { y: 60, opacity: 0, rotate: 1.5 }, { y: 0, opacity: 1, rotate: 0, duration: 1, ease: 'expo.out', stagger: .1, overwrite: 'auto' }),
  });

  // títulos de seção
  gsap.utils.toArray('.section-title').forEach((t) => {
    gsap.fromTo(t, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: t, start: 'top 88%', once: true } });
  });

  // estrelas e espirais com parallax leve
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    gsap.to(el, { yPercent: parseFloat(el.dataset.parallax) * 100, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
  });
  if (document.querySelector('.manifesto__star')) gsap.to('.manifesto__star', { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.manifesto', scrub: true } });
}

// quebra o texto em palavras sem perder os <em>
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.append(part);
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s); }
        });
        c.replaceWith(frag);
      } else walk(c);
    });
  };
  walk(el);
}
