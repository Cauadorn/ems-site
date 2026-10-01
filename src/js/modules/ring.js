import gsap from 'gsap';
import { reduced } from './site.js';

// Anel 3D das artes nas páginas de social media (pedido da Emilly em 01/10: descer a página até o fim para ver
// todos os posts era maçante). É o mesmo anel do carrossel da home (ver carousel.js e docs/referencia-pixel.md):
// cada post 4:5 e cada card dos carrosséis do Instagram vira um card do anel (o HTML vem pronto de
// scripts/gerar-cases.mjs). Arrastar para o lado, as setas da tela e as do teclado giram; clicar num vizinho
// traz ele para a frente. A rolagem da página nunca fica presa aqui.

// como no da home: com menos de 8 artes o anel completa com posições vazias (invisíveis)
const MIN_SLOTS = 8;

export function initRings() {
  document.querySelectorAll('[data-ring]').forEach(initRing);
}

function initRing(root) {
  const wrap = root.querySelector('[data-c3d-wrap]');
  const list = root.querySelector('[data-c3d-list]');
  const prev = root.querySelector('[data-c3d-prev]');
  const next = root.querySelector('[data-c3d-next]');
  const countEl = root.querySelector('[data-ring-count]');
  const n = list.children.length;
  const slots = Math.max(n, MIN_SLOTS);
  for (let i = n; i < slots; i++) {
    const vazio = document.createElement('div');
    vazio.className = 'c3d__item c3d__item--vazio';
    vazio.innerHTML = '<div class="c3d__ratio"></div>';
    list.append(vazio);
  }
  const items = [...list.children];

  const rotateAmount = 360 / slots;
  const zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 180));
  const negTranslate = `calc(var(--c3d-item-width) / -${zTranslate} - var(--c3d-gap))`;
  const posTranslate = `calc(var(--c3d-item-width) / ${zTranslate} + var(--c3d-gap))`;
  wrap.style.setProperty('--c3d-z', negTranslate);
  wrap.style.perspective = posTranslate;
  items.forEach((el, i) => { el.style.transform = `rotateY(${rotateAmount * i}deg) translateZ(${posTranslate}) scale(var(--s, 1))`; });
  gsap.to(wrap, { opacity: 1 });

  const step = rotateAmount;
  const rot = { v: 0 };
  const apply = () => wrap.style.setProperty('--c3d-rotate', `${rot.v}deg`);
  const pxPerStep = () => Math.min(root.offsetWidth * .3, 360); // quanto arrastar para andar uma arte
  const mod = (a, m) => ((a % m) + m) % m;
  const posNow = () => -rot.v / step;
  const snap = (p, dir = 0) => {
    let best = null;
    for (let k = Math.floor(p) - slots; k <= Math.ceil(p) + slots; k++) {
      if (mod(k, slots) >= n || (dir > 0 && k < p - 1e-6) || (dir < 0 && k > p + 1e-6)) continue;
      if (best === null || Math.abs(k - p) < Math.abs(best - p)) best = k;
    }
    return best;
  };

  // arte da frente: contador "07 / 30" e os vizinhos (esquerda e direita) ficam clicáveis
  let cur = 0, active = -1;
  const pad = (v) => String(v).padStart(2, '0');
  const setActive = (pos) => {
    const i = mod(pos, slots);
    if (i === active) return;
    active = i;
    if (countEl) countEl.textContent = `${pad(i + 1)} / ${pad(n)}`;
    const near = [mod(pos - 1, slots), mod(pos + 1, slots)];
    items.forEach((el, k) => {
      el.classList.toggle('is-active', k === i);
      el.classList.toggle('is-near', k !== i && k < n && near.includes(k));
    });
  };
  const go = (pos, animate = true) => {
    cur = pos;
    setActive(pos);
    gsap.to(rot, { v: -step * pos, duration: animate && !reduced ? .9 : 0, ease: 'expo.out', overwrite: true, onUpdate: apply });
  };
  go(0, false);

  const neighbor = (dir) => { let p = cur + dir; while (mod(p, slots) >= n) p += dir; return p; };
  next.addEventListener('click', () => go(neighbor(1)));
  prev.addEventListener('click', () => go(neighbor(-1)));

  items.forEach((el, k) => {
    if (k >= n) return;
    el.addEventListener('click', () => {
      if (k === active || !el.classList.contains('is-near')) return;
      go(cur + mod(k - mod(cur, slots) + slots / 2, slots) - slots / 2); // pelo caminho mais curto
    });
  });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(neighbor(1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(neighbor(-1)); }
  });

  // arrastar para o lado (mouse ou dedo); gesto vertical continua rolando a página
  let drag = null, dragged = false;
  root.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || e.target.closest('button')) return;
    drag = { x: e.clientX, y: e.clientY, start: rot.v, moved: false, lastX: e.clientX, t: performance.now(), v: 0 };
  });
  addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      drag.moved = true;
      gsap.killTweensOf(rot);
      root.classList.add('is-dragging');
    }
    rot.v = drag.start + (dx / pxPerStep()) * step;
    apply();
    setActive(snap(posNow()));
    const now = performance.now();
    drag.v = (e.clientX - drag.lastX) / Math.max(1, now - drag.t);
    drag.lastX = e.clientX; drag.t = now;
  });
  const endDrag = () => {
    if (!drag) return;
    const d = drag;
    drag = null;
    root.classList.remove('is-dragging');
    if (!d.moved) return;
    dragged = true;
    const flick = performance.now() - d.t < 100 && Math.abs(d.v) > .4;
    go(snap(posNow(), flick ? (d.v < 0 ? 1 : -1) : 0));
  };
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', endDrag);
  root.addEventListener('click', (e) => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);

  // deslizar para o lado no touchpad
  let wheelT;
  root.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    gsap.killTweensOf(rot);
    rot.v -= (e.deltaX / pxPerStep()) * step;
    apply();
    setActive(snap(posNow()));
    clearTimeout(wheelT);
    wheelT = setTimeout(() => go(snap(posNow())), 160);
  }, { passive: false });
}
