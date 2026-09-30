import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Entrada do hero, depois da abertura
export function heroIntro(reduced) {
  if (reduced) return;
  // mesma coreografia da Pixel: logo, frase entrando pelos lados, etiquetas pulando (scale 0 → 1)
  const main = 'expo.inOut'; // aproxima a curva "main" da Pixel (0.65, 0.01, 0.05, 0.99)
  gsap.timeline({ defaults: { ease: main, duration: .9 } })
    .from('[data-hero-box] > span', { yPercent: 105, stagger: .08 })
    .from('[data-hero-seal]', { scale: 0, rotate: -40, duration: .8, ease: 'back.out(2)' }, '-=.3')
    .from('[data-hero-line]', { xPercent: (i, el) => Number(el.dataset.from), opacity: 0, stagger: .1 }, '<-.2')
    .from('[data-hero-pop], .hero .sparkle', { scale: 0, duration: .6, ease: 'back.out(3)', stagger: .08 }, '-=.4')
    .from('[data-hero-item]', { y: 24, opacity: 0, duration: .7 }, '<');

  // o logo "respira" em loop, como o vídeo-logo da Pixel
  gsap.to('[data-hero-box]', { yPercent: -6, rotate: (i) => [-2, 2, -1.5][i], duration: .9, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: .18 }, delay: 1.8 });
}

export function initReveals(reduced) {
  // manifesto: as palavras acendem conforme a rolagem
  const m = document.querySelector('[data-manifesto]');
  if (m) {
    splitWords(m);
    const words = m.querySelectorAll('.w');
    if (reduced) words.forEach((w) => w.classList.add('is-on'));
    else ScrollTrigger.create({
      trigger: m, start: 'top 80%', end: 'bottom 45%', scrub: true,
      onUpdate: (st) => {
        const on = Math.round(st.progress * words.length);
        words.forEach((w, i) => w.classList.toggle('is-on', i < on));
      },
    });
  }

  if (reduced) return;

  // blocos entram de baixo
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.from(els, { y: 60, opacity: 0, rotate: 1.5, duration: 1, ease: 'expo.out', stagger: .1 }),
  });

  // títulos de seção
  gsap.utils.toArray('.section-title').forEach((t) => {
    gsap.from(t, { y: 50, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: t, start: 'top 88%', once: true } });
  });

  // estrelas e espirais com parallax leve
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    gsap.to(el, { yPercent: parseFloat(el.dataset.parallax) * 100, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
  });
  gsap.to('.manifesto__star', { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.manifesto', scrub: true } });
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
