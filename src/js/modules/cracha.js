// Crachá da EMS no topo da home (pedido da Emilly em 05/11, inspirado no crachá do kenjilambert.com): um cordão de
// verdade (pontos ligados, física de Verlet) preso atrás do menu, com o cartão na ponta. Ele cai quando o site abre,
// balança, dá para puxar e jogar com o mouse ou o dedo, e vira no clique (verso com WhatsApp e Instagram).
// Com "reduzir movimento", fica parado pendurado e só vira.

const N = 10; // pontos do cordão
const G = 2200; // gravidade (px/s²)

export function initCracha(reduced) {
  const root = document.querySelector('[data-cracha]');
  if (!root) return () => {};
  const hero = root.parentElement;
  const peca = root.querySelector('[data-cracha-peca]');
  const cartao = root.querySelector('[data-cracha-cartao]');
  const cordao = root.querySelector('[data-cracha-cordao]');
  const [frente, verso] = cartao.children;

  let W = 0, ax = 0, ay = -40, L = 30, pw = 150;
  const p = Array.from({ length: N + 1 }, () => ({ x: 0, y: 0, ox: 0, oy: 0 }));
  let angulo = 0, inclina = 0, giro = 0, virado = false;
  let puxando = null, raf = 0, parado = 0, visivel = true, solto = false;

  function medir() {
    const cs = getComputedStyle(root);
    W = hero.clientWidth;
    ax = W * parseFloat(cs.getPropertyValue('--cracha-x'));
    L = parseFloat(cs.getPropertyValue('--cracha-corda')) / N;
    pw = peca.offsetWidth;
  }
  // pendurado reto, parado (ou esticado para cima, fora da tela, antes de cair)
  function posicionar(paraCima) {
    p.forEach((q, i) => {
      q.x = q.ox = ax + (paraCima ? i * L * 0.35 : 0);
      q.y = q.oy = ay + (paraCima ? -i * L : i * L);
    });
  }

  function passo(dt) {
    const g = G * dt * dt;
    for (let i = 1; i <= N; i++) {
      const q = p[i];
      if (puxando && i === N) continue;
      const vx = (q.x - q.ox) * 0.985, vy = (q.y - q.oy) * 0.985;
      q.ox = q.x; q.oy = q.y;
      q.x += vx; q.y += vy + g;
    }
    // o cordão não estica: cada trecho volta ao tamanho L; a ponta (o cartão) pesa mais que o cordão
    for (let k = 0; k < 12; k++) {
      for (let i = 0; i < N; i++) {
        const a = p[i], b = p[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-6, e = (d - L) / d;
        let wa = i === 0 ? 0 : 1, wb = i + 1 === N ? (puxando ? 0 : 0.35) : 1;
        if (!wa && !wb) continue;
        const s = e / (wa + wb);
        a.x += dx * s * wa; a.y += dy * s * wa;
        b.x -= dx * s * wb; b.y -= dy * s * wb;
      }
    }
  }

  function desenhar() {
    let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
    for (let i = 1; i < N; i++) d += ` Q${p[i].x.toFixed(1)} ${p[i].y.toFixed(1)} ${((p[i].x + p[i + 1].x) / 2).toFixed(1)} ${((p[i].y + p[i + 1].y) / 2).toFixed(1)}`;
    d += ` L${p[N].x.toFixed(1)} ${p[N].y.toFixed(1)}`;
    cordao.setAttribute('d', d);
    // o cartão segue a direção do último trecho; a velocidade de lado dá a inclinação 3D
    const a = p[N], b = p[N - 2];
    const alvo = Math.atan2(-(a.x - b.x), a.y - b.y) * 180 / Math.PI;
    angulo += (alvo - angulo) * 0.35;
    inclina += (Math.max(-40, Math.min(40, (a.x - a.ox) * 2.4)) - inclina) * 0.2;
    giro += ((virado ? 180 : 0) - giro) * (reduced ? 1 : 0.14);
    peca.style.transform = `translate(${(a.x - pw / 2).toFixed(1)}px, ${a.y.toFixed(1)}px) rotate(${angulo.toFixed(2)}deg)`;
    cartao.style.transform = `rotateY(${(inclina + giro).toFixed(1)}deg)`;
  }

  let antes = 0;
  function quadro(agora) {
    raf = 0;
    const dt = Math.min(0.033, antes ? (agora - antes) / 1000 : 0.016);
    antes = agora;
    if (!reduced) { passo(dt / 2); passo(dt / 2); }
    desenhar();
    // dorme quando para de mexer (economiza bateria); acorda ao puxar, virar ou mudar o tamanho da tela
    const mov = Math.abs(p[N].x - p[N].ox) + Math.abs(p[N].y - p[N].oy) + Math.abs((virado ? 180 : 0) - giro) + Math.abs(inclina);
    parado = mov < 0.02 && !puxando ? parado + 1 : 0;
    if (visivel && parado < 90) raf = requestAnimationFrame(quadro);
  }
  const acordar = () => { parado = 0; if (!raf && solto) { antes = 0; raf = requestAnimationFrame(quadro); } };

  // puxar: a ponta segue o dedo/mouse (sem passar do tamanho do cordão); soltar joga com a velocidade do gesto
  let inicio = null, alvoPuxar = null, arrastou = false;
  peca.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || reduced) return;
    arrastou = false;
    const r = hero.getBoundingClientRect();
    inicio = { x: e.clientX, y: e.clientY, mexeu: false, link: e.target.closest('a') };
    alvoPuxar = { dx: p[N].x - (e.clientX - r.left), dy: p[N].y - (e.clientY - r.top) };
    peca.setPointerCapture(e.pointerId);
  });
  peca.addEventListener('pointermove', (e) => {
    if (!inicio) return;
    if (!inicio.mexeu && Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) < 6) return;
    inicio.mexeu = true;
    puxando = true;
    peca.classList.add('is-puxando');
    const r = hero.getBoundingClientRect();
    let x = e.clientX - r.left + alvoPuxar.dx, y = e.clientY - r.top + alvoPuxar.dy;
    const dx = x - ax, dy = y - ay, d = Math.hypot(dx, dy), max = L * N * 1.02;
    if (d > max) { x = ax + dx / d * max; y = ay + dy / d * max; }
    const q = p[N];
    q.ox = q.x; q.oy = q.y; q.x = x; q.y = y;
    acordar();
  });
  const soltar = (e) => {
    if (!inicio) return;
    const foiClique = !inicio.mexeu && e.type === 'pointerup';
    const link = inicio.link;
    arrastou = inicio.mexeu;
    if (puxando) { const q = p[N]; q.ox = q.x - (q.x - q.ox) * 0.5; q.oy = q.y - (q.y - q.oy) * 0.5; } // jogada mais macia
    inicio = null; puxando = false;
    peca.classList.remove('is-puxando');
    if (foiClique && !link && !e.target.closest('[data-cracha-virar]')) virar(false);
    acordar();
  };
  peca.addEventListener('pointerup', soltar);
  peca.addEventListener('pointercancel', soltar);
  // um arrasto não vira o cartão nem abre link
  peca.addEventListener('click', (e) => { if (arrastou) { e.preventDefault(); e.stopPropagation(); arrastou = false; } }, true);

  function virar(foco) {
    virado = !virado;
    frente.inert = virado; verso.inert = !virado;
    frente.setAttribute('aria-hidden', virado); verso.setAttribute('aria-hidden', !virado);
    if (foco) (virado ? verso.querySelector('a') : frente).focus({ preventScroll: true }); // só pelo teclado
    acordar();
  }
  root.querySelectorAll('[data-cracha-virar]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); virar(e.detail === 0); }));
  verso.setAttribute('aria-hidden', 'true');

  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (visivel) acordar(); }).observe(hero);
  let largura = 0;
  new ResizeObserver(() => {
    if (hero.clientWidth === largura) return;
    largura = hero.clientWidth;
    medir(); posicionar(!solto && !reduced); acordar(); // antes de cair, continua esticado lá em cima
  }).observe(hero);

  medir();
  posicionar(!reduced);
  // solta o crachá (chamado depois da abertura): ele cai do alto e balança até parar. deNovo: cai outra vez (quando a
  // pessoa chega ao fim do site e volta para o começo)
  return function soltarCracha(deNovo = false) {
    if (solto && !deNovo) return;
    solto = true;
    if (reduced) posicionar(false);
    else if (deNovo) { if (virado) virar(false); posicionar(true); }
    root.classList.add('is-solto');
    acordar();
  };
}
