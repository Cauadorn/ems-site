import gsap from 'gsap';

// Easter egg: "não clica aqui" solta uma chuva de cerejas, corações e brilhos.
export function initNope() {
  const btn = document.querySelector('[data-nope]');
  if (!btn) return;
  const icons = [['i-cereja', '#9E122C'], ['i-coracao', '#DD34A8'], ['i-brilho', '#F2CF7A'], ['i-estrela', '#FFFBDE'], ['i-espiral', '#C0A5C4']];
  const lines = ['eu avisei 😱', 'tá bom, mais uma', 'ok, você venceu', 'agora me chama no direct 💜'];
  let clicks = 0;

  btn.addEventListener('click', () => {
    const r = btn.getBoundingClientRect();
    const x0 = r.left + r.width / 2, y0 = r.top;
    for (let i = 0; i < 28; i++) {
      const [id, color] = icons[i % icons.length];
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.classList.add('burst');
      s.style.color = color;
      s.innerHTML = `<use href="#${id}"/>`;
      document.body.append(s);
      const ang = -Math.PI / 2 + (Math.random() - .5) * 2.2;
      const v = 220 + Math.random() * 380;
      gsap.set(s, { x: x0 - 17, y: y0 - 17, scale: .4 + Math.random() * .9, rotate: Math.random() * 180 });
      gsap.to(s, { x: `+=${Math.cos(ang) * v}`, duration: 1.6, ease: 'power2.out' });
      gsap.to(s, { y: `+=${Math.sin(ang) * v}`, duration: .7, ease: 'power2.out' });
      gsap.to(s, { y: `+=${420 + Math.random() * 200}`, rotate: '+=220', duration: 1.1, delay: .7, ease: 'power2.in', onComplete: () => s.remove() });
    }
    btn.textContent = lines[Math.min(clicks++, lines.length - 1)];
    // na última frase ("agora me chama no direct") o botão vira link para o Instagram (pedido da Emilly em 01/10)
    if (clicks === lines.length) {
      const a = document.createElement('a');
      a.className = 'nope';
      a.href = 'https://www.instagram.com/itsemsdesign/';
      a.target = '_blank';
      a.rel = 'noopener';
      a.dataset.cursorText = 'abrir o insta';
      a.textContent = btn.textContent;
      btn.replaceWith(a);
    }
  });
}
