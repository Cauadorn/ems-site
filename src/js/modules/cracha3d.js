// Crachá 3D da EMS (pedido da Emilly em 05/11: "igual ao do kenjilambert.com, que vira quando joga e tem reflexo, parece
// um crachá de verdade"). Lá é o crachá da Vercel (modelo 3D + física de corpo rígido); aqui é a mesma ideia sem
// biblioteca de física: a fita é uma corda de pontos e o cartão é um corpo rígido de verdade (posição, giro em 3D,
// massa e inércia), ligados pelo método XPBD. Quando a pessoa joga, ele balança, gira e depois volta a ficar de frente.
// O cartão tem espessura, cantos arredondados, a arte de sempre (desenhada aqui num canvas: o selo original da Emilly, o
// nome e o verso com WhatsApp e Instagram), uma película de plástico que reflete a luz e o prendedor de metal.
// O HTML do crachá (cracha.js) continua por cima, invisível: é ele que recebe o toque (o dedo não rola a página ao
// puxar), o texto do cursor e o teclado (Tab e Enter viram o cartão e abrem os links).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const N = 10; // pedaços da fita
const G = 2200; // gravidade (px/s²)
const SUB = 8; // subpassos por quadro
const PROP = 80 / 54; // altura ÷ largura do cartão
const ESP = 0.022; // espessura (em larguras de cartão)
const RAIO = 0.08; // cantos
const GANCHO = PROP / 2 + 0.165; // topo da argola, onde a fita prende (a partir do centro do cartão)
const TW = 600, TH = Math.round(TW * PROP); // tamanho das artes da frente e do verso

export function initCracha3D(root) {
  const hero = root.parentElement;
  const peca = root.querySelector('[data-cracha-peca]');
  const [frente, verso] = root.querySelector('[data-cracha-cartao]').children;
  const cssVar = (n, el = document.documentElement) => getComputedStyle(el).getPropertyValue(n).trim();

  const canvas = document.createElement('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); // sem WebGL, dá erro e fica o 2D
  canvas.className = 'cracha__tela';
  canvas.setAttribute('aria-hidden', 'true');
  root.prepend(canvas);
  root.classList.add('cracha--3d');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // cena: luz que deixa a arte com a cor certa quando está de frente e mais escura quando vira; reflexo de uma sala
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const sala = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 20000);
  scene.add(new THREE.AmbientLight(0xffffff, Math.PI * 0.3));
  const sol = new THREE.DirectionalLight(0xffffff, Math.PI * 0.7);
  scene.add(sol, sol.target);

  const cor = (n) => new THREE.Color(cssVar(n));
  const matFrente = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const matVerso = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const matBorda = new THREE.MeshLambertMaterial({ color: cor('--lavanda-2') });
  // a película de plástico: só o reflexo (preto somado não muda a cor da arte)
  // (opacity limita o reflexo de lado, que sem isso deixava o cartão todo branco)
  const matBrilho = new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.18, metalness: 0, clearcoat: 0.6, clearcoatRoughness: 0.12, envMap: sala, envMapIntensity: 1.1, transparent: true, opacity: 0.42, blending: THREE.AdditiveBlending, depthWrite: false });
  const matMetal = new THREE.MeshStandardMaterial({ color: cor('--lavanda-2'), metalness: 1, roughness: 0.25, envMap: sala, envMapIntensity: 1.3 });
  const matFita = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });

  // o cartão (1 = largura; a escala do grupo dá o tamanho em px)
  const forma = new THREE.Shape();
  { const w = 1, h = PROP, r = RAIO, x = -w / 2, y = -h / 2;
    forma.moveTo(x + r, y); forma.lineTo(x + w - r, y); forma.quadraticCurveTo(x + w, y, x + w, y + r);
    forma.lineTo(x + w, y + h - r); forma.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    forma.lineTo(x + r, y + h); forma.quadraticCurveTo(x, y + h, x, y + h - r);
    forma.lineTo(x, y + r); forma.quadraticCurveTo(x, y, x + r, y); }
  const geoFace = new THREE.ShapeGeometry(forma, 10);
  { const p = geoFace.attributes.position, uv = geoFace.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i) + 0.5, p.getY(i) / PROP + 0.5); }
  const geoBorda = (() => {
    const pts = forma.getPoints(10), n = pts.length, v = [];
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      if (a.distanceTo(b) < 1e-6) continue;
      v.push(a.x, a.y, ESP / 2, b.x, b.y, -ESP / 2, b.x, b.y, ESP / 2, a.x, a.y, ESP / 2, a.x, a.y, -ESP / 2, b.x, b.y, -ESP / 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    g.computeVertexNormals();
    return g;
  })();
  const grupo = new THREE.Group();
  const faceF = new THREE.Mesh(geoFace, matFrente); faceF.position.z = ESP / 2;
  const faceV = new THREE.Mesh(geoFace, matVerso); faceV.position.z = -ESP / 2; faceV.rotation.y = Math.PI;
  const brilhoF = new THREE.Mesh(geoFace, matBrilho); brilhoF.position.z = ESP / 2 + 0.003;
  const brilhoV = new THREE.Mesh(geoFace, matBrilho); brilhoV.position.z = -ESP / 2 - 0.003; brilhoV.rotation.y = Math.PI;
  const placa = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.15, ESP * 3), matMetal); placa.position.y = PROP / 2 - 0.02;
  const argola = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.014, 10, 32), matMetal); argola.position.y = PROP / 2 + 0.1;
  grupo.add(faceF, faceV, new THREE.Mesh(geoBorda, matBorda), brilhoF, brilhoV, placa, argola);
  grupo.visible = false;
  scene.add(grupo);

  // a fita: uma tira que segue a corda, sempre de frente para quem vê, com "ITSEMSDESIGN ·" repetido
  const AMOSTRAS = 56;
  const geoFita = new THREE.BufferGeometry();
  const fitaPos = new Float32Array((AMOSTRAS + 1) * 6), fitaUv = new Float32Array((AMOSTRAS + 1) * 4), idx = [];
  for (let i = 0; i < AMOSTRAS; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  geoFita.setIndex(idx);
  geoFita.setAttribute('position', new THREE.BufferAttribute(fitaPos, 3));
  geoFita.setAttribute('uv', new THREE.BufferAttribute(fitaUv, 2));
  const fita = new THREE.Mesh(geoFita, matFita);
  fita.frustumCulled = false;
  fita.visible = false;
  scene.add(fita);
  let fitaTile = 10; // comprimento (em larguras da fita) de um "ITSEMSDESIGN ·"

  // ---------- física (px; y para cima, como no three.js; a origem é o canto de cima à esquerda do topo) ----------
  let W = 1, H = 1, Wc = 160, corda = 290, L = 29, ax = 0, ay = 40, dist = 1;
  const pos = Array.from({ length: N + 1 }, () => new THREE.Vector3());
  const ant = Array.from({ length: N + 1 }, () => new THREE.Vector3());
  const vel = Array.from({ length: N + 1 }, () => new THREE.Vector3());
  const WFITA = 25; // a fita pesa bem menos que o cartão (1/massa)
  const c = new THREE.Vector3(), cAnt = new THREE.Vector3(), v = new THREE.Vector3();
  const q = new THREE.Quaternion(), qAnt = new THREE.Quaternion(), w = new THREE.Vector3();
  let iIx = 1, iIy = 1, iIz = 1;
  const gancho = new THREE.Vector3();
  let virado = false, solto = false, pronto = false, pegando = null;

  const _r = new THREE.Vector3(), _n = new THREE.Vector3(), _a = new THREE.Vector3(), _b = new THREE.Vector3();
  const _pb = new THREE.Vector3(), _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _qi = new THREE.Quaternion();
  const invI = (vec, out) => { // inércia inversa no mundo × vetor
    out.copy(vec).applyQuaternion(_qi.copy(q).invert());
    out.set(out.x * iIx, out.y * iIy, out.z * iIz).applyQuaternion(q);
    return out;
  };
  const empurrar = (r, p) => { // correção de posição p aplicada no ponto r (a partir do centro) do cartão
    c.add(p);
    invI(_b.crossVectors(r, p), _b);
    _q.set(_b.x, _b.y, _b.z, 0).multiply(q);
    q.set(q.x + 0.5 * _q.x, q.y + 0.5 * _q.y, q.z + 0.5 * _q.z, q.w + 0.5 * _q.w).normalize();
  };
  // prende o ponto `local` do cartão no ponto `alvo` (outro ponto com 1/massa = wAlvo, ou fixo com 0)
  const prender = (local, alvo, wAlvo, h, maciez = 0) => {
    const r = _r.copy(local).applyQuaternion(q);
    const d = _n.subVectors(alvo, _pb.copy(c).add(r));
    const C = d.length();
    if (C < 1e-6) return;
    d.divideScalar(C);
    const rn = _a.crossVectors(r, d);
    const wc = 1 + rn.dot(invI(rn, _b));
    const lam = C / (wc + wAlvo + maciez / (h * h));
    empurrar(r, _p.copy(d).multiplyScalar(lam));
    if (wAlvo) alvo.addScaledVector(d, -lam * wAlvo);
  };
  const esticar = (i) => { // um pedaço da fita volta ao tamanho L
    const a = pos[i], b = pos[i + 1], wa = i === 0 ? 0 : WFITA, wb = WFITA;
    const d = _n.subVectors(b, a), len = d.length();
    if (len < 1e-6) return;
    const k = (len - L) / len / (wa + wb);
    a.addScaledVector(d, k * wa); b.addScaledVector(d, -k * wb);
  };

  function passo(h) {
    for (let i = 1; i <= N; i++) { vel[i].y -= G * h; ant[i].copy(pos[i]); pos[i].addScaledVector(vel[i], h); }
    v.y -= G * h; cAnt.copy(c); c.addScaledVector(v, h);
    qAnt.copy(q);
    _q.set(w.x, w.y, w.z, 0).multiply(q);
    q.set(q.x + 0.5 * h * _q.x, q.y + 0.5 * h * _q.y, q.z + 0.5 * h * _q.z, q.w + 0.5 * h * _q.w).normalize();
    if (pegando) prender(pegando.local, pegando.alvo, 0, h, 2e-7);
    for (let k = 0; k < 2; k++) {
      for (let i = 0; i < N; i++) esticar(i);
      prender(gancho, pos[N], WFITA, h);
    }
    for (let i = 1; i <= N; i++) vel[i].subVectors(pos[i], ant[i]).divideScalar(h).multiplyScalar(Math.exp(-2.2 * h));
    v.subVectors(c, cAnt).divideScalar(h).multiplyScalar(Math.exp(-1.1 * h));
    _q.copy(q).multiply(_qi.copy(qAnt).invert());
    w.set(_q.x, _q.y, _q.z).multiplyScalar((_q.w >= 0 ? 2 : -2) / h).multiplyScalar(Math.exp(-(pegando ? 5 : 1.5) * h));
    // aos poucos ele volta a ficar de frente (ou de costas, se foi virado), como no crachá da Vercel
    const nz = _a.set(0, 0, 1).applyQuaternion(q);
    let erro = (virado ? Math.PI : 0) - Math.atan2(nz.x, nz.z);
    erro = Math.atan2(Math.sin(erro), Math.cos(erro));
    w.y += (erro * 26 - w.y * 4.2) * h;
  }

  // ---------- medidas, posição inicial ----------
  function medir() {
    W = hero.clientWidth; H = hero.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    dist = (H / 2) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.set(W / 2, -H / 2, dist);
    camera.lookAt(W / 2, -H / 2, 0);
    camera.near = dist / 20; camera.far = dist * 4;
    camera.updateProjectionMatrix();
    sol.position.set(W / 2 - dist * 0.25, -H / 2 + dist * 0.35, dist);
    sol.target.position.set(W / 2, -H / 2, 0);
    const cs = getComputedStyle(root);
    Wc = parseFloat(cs.getPropertyValue('--cracha-w')) || 160;
    corda = parseFloat(cs.getPropertyValue('--cracha-corda')) || 290;
    L = corda / N;
    ax = W * parseFloat(cs.getPropertyValue('--cracha-x'));
    ay = 40;
    const Hc = Wc * PROP, Tc = Wc * ESP;
    iIx = 12 / (Hc * Hc + Tc * Tc); iIy = 12 / (Wc * Wc + Tc * Tc); iIz = 12 / (Wc * Wc + Hc * Hc);
    gancho.set(0, GANCHO * Wc, 0);
    grupo.scale.setScalar(Wc);
  }
  // pendurado reto, parado (ou esticado lá em cima, fora da tela, antes de cair)
  function posicionar(paraCima) {
    for (let i = 0; i <= N; i++) {
      pos[i].set(ax + (paraCima ? i * L * 0.2 : 0), ay + (paraCima ? i * L : -i * L), 0);
      ant[i].copy(pos[i]); vel[i].set(0, 0, 0);
    }
    q.identity(); w.set(0, 0, 0); v.set(0, 0, 0);
    c.copy(pos[N]).sub(gancho);
  }

  // ---------- desenho ----------
  const _ndc = new THREE.Vector3();
  const cantos = [[-0.5, PROP / 2], [0.5, PROP / 2], [0.5, -PROP / 2], [-0.5, -PROP / 2], [0, GANCHO]].map(([x, y]) => new THREE.Vector3(x, y, 0));
  function desenhar() {
    grupo.position.copy(c);
    grupo.quaternion.copy(q);
    grupo.updateMatrixWorld();
    // a fita: curva suave pelos pontos, uma tira virada para a câmera
    const curva = new THREE.CatmullRomCurve3(pos, false, 'centripetal');
    const pts = curva.getPoints(AMOSTRAS);
    const larg = Wc * 0.14, meia = larg / 2;
    let s = 0;
    for (let i = 0; i <= AMOSTRAS; i++) {
      const P = pts[i];
      if (i) s += P.distanceTo(pts[i - 1]);
      _a.subVectors(pts[Math.min(AMOSTRAS, i + 1)], pts[Math.max(0, i - 1)]);
      _b.subVectors(camera.position, P);
      _r.crossVectors(_a, _b).normalize().multiplyScalar(meia);
      fitaPos.set([P.x + _r.x, P.y + _r.y, P.z + _r.z, P.x - _r.x, P.y - _r.y, P.z - _r.z], i * 6);
      const u = s / (larg * fitaTile);
      fitaUv.set([u, 0, u, 1], i * 4);
    }
    geoFita.attributes.position.needsUpdate = true;
    geoFita.attributes.uv.needsUpdate = true;
    renderer.render(scene, camera);
    // a área de toque (o HTML invisível) acompanha o cartão na tela
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const k of cantos) {
      _ndc.copy(k).applyMatrix4(grupo.matrixWorld).project(camera);
      const sx = (_ndc.x + 1) / 2 * W, sy = (1 - _ndc.y) / 2 * H;
      x0 = Math.min(x0, sx); y0 = Math.min(y0, sy); x1 = Math.max(x1, sx); y1 = Math.max(y1, sy);
    }
    peca.style.transform = `translate(${x0.toFixed(1)}px, ${y0.toFixed(1)}px)`;
    peca.style.width = `${(x1 - x0).toFixed(1)}px`;
    peca.style.height = `${(y1 - y0).toFixed(1)}px`;
  }

  // ---------- laço (dorme quando para; acorda ao puxar, virar ou mudar o tamanho da tela) ----------
  let raf = 0, antes = 0, quieto = 0, visivel = true;
  function quadro(agora) {
    raf = 0;
    const dt = Math.min(1 / 30, antes ? (agora - antes) / 1000 : 1 / 60);
    antes = agora;
    for (let i = 0; i < SUB; i++) passo(dt / SUB);
    desenhar();
    const mov = v.length() + w.length() * Wc + vel[N >> 1].length();
    quieto = !pegando && mov < 1.5 ? quieto + 1 : 0;
    if (visivel && quieto < 60) raf = requestAnimationFrame(quadro);
  }
  const acordar = () => { quieto = 0; if (!raf && solto && pronto) { antes = 0; raf = requestAnimationFrame(quadro); } };

  // ---------- virar e tocar ----------
  function virar(foco) {
    virado = !virado;
    w.y += virado ? 15 : -15; // um tranco para ele girar até o outro lado
    frente.inert = virado; verso.inert = !virado;
    frente.setAttribute('aria-hidden', virado); verso.setAttribute('aria-hidden', !virado);
    if (foco) (virado ? verso.querySelector('a') : frente).focus({ preventScroll: true });
    acordar();
  }
  root.querySelectorAll('[data-cracha-virar]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); if (e.detail === 0) virar(true); }));
  verso.setAttribute('aria-hidden', 'true');
  verso.inert = true;

  const raio = new THREE.Raycaster();
  const tocar = (cx, cy) => { // o que está debaixo do dedo: face, ponto e uv
    const r = hero.getBoundingClientRect();
    raio.setFromCamera({ x: (cx - r.left) / W * 2 - 1, y: -((cy - r.top) / H * 2 - 1) }, camera);
    return raio.intersectObjects([faceF, faceV, placa, argola], false)[0] || null;
  };
  const noPlano = (cx, cy, z, out) => { // ponto do mundo sob o dedo, na profundidade z
    const r = hero.getBoundingClientRect();
    const t = 1 - z / dist;
    return out.set(camera.position.x + t * (cx - r.left - camera.position.x), camera.position.y + t * (-(cy - r.top) - camera.position.y), z);
  };

  let inicio = null;
  peca.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !pronto) return;
    const hit = tocar(e.clientX, e.clientY);
    if (!hit) return;
    e.preventDefault();
    inicio = { x: e.clientX, y: e.clientY, mexeu: false };
    const local = grupo.worldToLocal(hit.point.clone()).multiplyScalar(Wc); // em px, a partir do centro
    pegando = { local, alvo: hit.point.clone(), z: hit.point.z };
    peca.setPointerCapture(e.pointerId);
    peca.classList.add('is-puxando');
    acordar();
  });
  peca.addEventListener('pointermove', (e) => {
    if (!inicio) return;
    if (!inicio.mexeu && Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) > 6) inicio.mexeu = true;
    noPlano(e.clientX, e.clientY, pegando.z, pegando.alvo);
    // não deixa puxar além do que a fita alcança
    const dx = pegando.alvo.x - ax, dy = pegando.alvo.y - ay, d = Math.hypot(dx, dy), max = corda + Wc * PROP;
    if (d > max) { pegando.alvo.x = ax + dx / d * max; pegando.alvo.y = ay + dy / d * max; }
    acordar();
  });
  const soltar = (e) => {
    if (!inicio) return;
    const foiClique = !inicio.mexeu && e.type === 'pointerup';
    inicio = null; pegando = null;
    peca.classList.remove('is-puxando');
    if (foiClique) {
      const hit = tocar(e.clientX, e.clientY);
      const alvo = hit && hit.object === faceV && hit.uv && regiaoVerso(hit.uv);
      if (alvo === 'voltar' || !alvo) virar(false);
      else alvo.click(); // o link de verdade do crachá (o navegador abre como um link comum)
    } else {
      // jogou: gira conforme a força para o lado (é o que faz ele "virar" no ar)
      w.y += THREE.MathUtils.clamp(v.x * 0.011, -22, 22);
      w.x += THREE.MathUtils.clamp(-v.y * 0.003, -6, 6);
    }
    acordar();
  };
  peca.addEventListener('pointerup', soltar);
  peca.addEventListener('pointercancel', soltar);

  // ---------- as artes (canvas): frente, verso e a fita ----------
  const regioes = []; // áreas clicáveis do verso, em px da arte
  const regiaoVerso = (uv) => {
    const x = uv.x * TW, y = (1 - uv.y) * TH;
    const r = regioes.find((k) => x >= k.x && x <= k.x + k.w && y >= k.y && y <= k.y + k.h);
    return r ? r.alvo : null;
  };
  const carregar = (src) => new Promise((ok, erro) => { const i = new Image(); i.onload = () => ok(i); i.onerror = erro; i.src = src; });
  const icone = (id, corIcone) => {
    const s = document.getElementById(id);
    if (!s) return Promise.resolve(null);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.getAttribute('viewBox')}" style="color:${corIcone}">${s.innerHTML}</svg>`;
    return carregar(URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))).catch(() => null);
  };

  async function artes() {
    const k = {
      ivory: cssVar('--ivory'), ink: cssVar('--ink'), ameixa: cssVar('--ameixa'), violeta: cssVar('--violeta'),
      lavanda: cssVar('--lavanda'), manteiga: cssVar('--manteiga'),
      display: cssVar('--f-display'), serif: cssVar('--f-serif'), sans: cssVar('--f-sans'),
    };
    await Promise.all([`400 40px ${k.display}`, `italic 400 40px ${k.serif}`, `700 40px ${k.sans}`, `400 40px ${k.sans}`].map((f) => document.fonts.load(f).catch(() => {})));
    const seloSrc = root.querySelector('.cracha__selo')?.currentSrc || root.querySelector('.cracha__selo')?.src;
    const [selo, zap, insta] = await Promise.all([carregar(seloSrc), icone('i-whatsapp', k.ivory), icone('i-instagram', k.ivory)]);
    const novo = () => { const cv = document.createElement('canvas'); cv.width = TW; cv.height = TH; return [cv, cv.getContext('2d')]; };
    const s = TW;
    const arredondado = (ctx, x, y, ww, hh, rr) => { ctx.beginPath(); ctx.roundRect(x, y, ww, hh, rr); };
    const furo = (ctx) => { ctx.fillStyle = k.violeta; arredondado(ctx, s * 0.35, TH * 0.05, s * 0.3, TH * 0.044, 99); ctx.fill(); };
    const texto = (ctx, t, x, y, fonte, corT, espaco = 0) => { ctx.font = fonte; ctx.fillStyle = corT; ctx.letterSpacing = `${espaco}px`; ctx.fillText(t, x, y); ctx.letterSpacing = '0px'; };

    // frente: marfim, o selo, "hello, my name is", o nome, o cargo e a faixa violeta com o @
    const [cf, f] = novo();
    f.fillStyle = k.ivory; f.fillRect(0, 0, TW, TH);
    furo(f);
    f.textAlign = 'center'; f.textBaseline = 'top';
    let y = s * 0.16;
    const sw = s * 0.48, sh = sw * ((selo.naturalHeight / selo.naturalWidth) || (705 / 544));
    f.drawImage(selo, (s - sw) / 2, y, sw, sh);
    y += sh + s * 0.05;
    texto(f, 'hello, my name is', s / 2, y, `italic 400 ${s * 0.085}px ${k.serif}`, k.violeta);
    y += s * 0.085 + s * 0.02;
    texto(f, 'EMILLY SILVA', s / 2, y, `400 ${s * 0.145}px ${k.display}`, k.ink);
    y += s * 0.145 + s * 0.04;
    texto(f, 'graphic & UX/UI designer', s / 2, y, `400 ${s * 0.074}px ${k.sans}`, k.ameixa);
    const faixa = s * 0.194;
    f.fillStyle = k.violeta; f.fillRect(0, TH - faixa, TW, faixa);
    texto(f, '@itsemsdesign', s / 2, TH - faixa + s * 0.06, `700 ${s * 0.07}px ${k.sans}`, k.ivory, s * 0.07 * 0.06);

    // verso: ameixa, "LET'S CREATE together", WhatsApp, Instagram e "flip back" (clicáveis)
    const [cv, b] = novo();
    b.fillStyle = k.ameixa; b.fillRect(0, 0, TW, TH);
    furo(b);
    b.textAlign = 'center'; b.textBaseline = 'top';
    const fp = s * 0.075, pilulaH = fp * 2.1;
    const blocos = s * 0.13 * 0.95 + s * 0.156 * 0.95 + pilulaH * 2 + s * 0.066 * 1.3;
    const util = TH - s * 0.22, vao = Math.min(util * 0.07, (util - blocos) / 3);
    y = s * 0.14 + (util - blocos - vao * 3) / 2;
    texto(b, 'LET’S CREATE', s / 2, y, `400 ${s * 0.13}px ${k.display}`, k.ivory);
    y += s * 0.13 * 0.95;
    texto(b, 'together', s / 2, y, `italic 400 ${s * 0.156}px ${k.serif}`, k.manteiga);
    y += s * 0.156 * 0.95 + vao;
    regioes.length = 0;
    const pilula = (rotulo, img, alvo) => {
      b.font = `700 ${fp}px ${k.sans}`;
      const tw = b.measureText(rotulo).width, iw = fp * 1.25, gap = fp * 0.45, pw = tw + iw + gap + fp * 1.6;
      const x = (s - pw) / 2;
      b.lineWidth = s * 0.012; b.strokeStyle = 'rgba(255, 251, 222, .35)';
      arredondado(b, x, y, pw, pilulaH, pilulaH / 2); b.stroke();
      if (img) b.drawImage(img, x + fp * 0.8, y + (pilulaH - iw) / 2, iw, iw);
      b.textAlign = 'left'; b.textBaseline = 'middle';
      texto(b, rotulo, x + fp * 0.8 + iw + gap, y + pilulaH / 2 + fp * 0.04, `700 ${fp}px ${k.sans}`, k.ivory);
      b.textAlign = 'center'; b.textBaseline = 'top';
      regioes.push({ x, y, w: pw, h: pilulaH, alvo });
      y += pilulaH + vao;
    };
    const links = verso.querySelectorAll('a');
    pilula('(31) 92006-0754', zap, links[0]);
    pilula('@itsemsdesign', insta, links[1]);
    b.font = `400 ${s * 0.066}px ${k.sans}`;
    const vw = b.measureText('flip back').width;
    texto(b, 'flip back', s / 2, y, `400 ${s * 0.066}px ${k.sans}`, k.lavanda);
    b.fillStyle = k.lavanda; b.fillRect((s - vw) / 2, y + s * 0.066 * 1.08, vw, s * 0.005);
    regioes.push({ x: (s - vw) / 2 - 20, y: y - 10, w: vw + 40, h: s * 0.066 * 1.3 + 20, alvo: 'voltar' });

    // a fita: ameixa com "ITSEMSDESIGN ·" em marfim (como o cordão de antes)
    const ft = document.createElement('canvas'), fc = ft.getContext('2d');
    const fh = 64, ff = `700 ${fh * 0.5}px ${k.sans}`, palavra = 'ITSEMSDESIGN  ·  ';
    fc.font = ff; fc.letterSpacing = `${fh * 0.5 * 0.16}px`;
    ft.width = Math.ceil(fc.measureText(palavra).width); ft.height = fh;
    fc.fillStyle = k.ameixa; fc.fillRect(0, 0, ft.width, fh);
    fc.font = ff; fc.letterSpacing = `${fh * 0.5 * 0.16}px`; fc.fillStyle = k.ivory; fc.textBaseline = 'middle';
    fc.fillText(palavra, 0, fh / 2 + 1);
    fitaTile = ft.width / fh;

    const tex = (cvs) => {
      const t = new THREE.CanvasTexture(cvs);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    };
    matFrente.map = tex(cf); matVerso.map = tex(cv);
    const tf = tex(ft); tf.wrapS = THREE.RepeatWrapping; matFita.map = tf;
    [matFrente, matVerso, matFita].forEach((m) => { m.needsUpdate = true; });
  }

  // ---------- começo ----------
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; if (visivel) acordar(); }).observe(hero);
  let largura = 0;
  new ResizeObserver(() => {
    if (hero.clientWidth === largura && Math.abs(hero.clientHeight - H) < 2) return;
    largura = hero.clientWidth;
    medir(); posicionar(!solto);
    if (pronto && solto) desenhar();
    acordar();
  }).observe(hero);
  medir();
  posicionar(true);

  let pedido = false;
  const cair = () => {
    if (solto || !pronto || !pedido) return;
    solto = true;
    grupo.visible = fita.visible = true;
    w.y = 9; // cai girando no ar e depois para de frente
    root.classList.add('is-solto');
    acordar();
  };
  const prontoP = artes().then(() => { pronto = true; cair(); });
  // solta o crachá (chamado depois da abertura): ele cai do alto e balança até parar
  const soltarCracha = () => { pedido = true; cair(); };
  soltarCracha.pronto = prontoP;
  return soltarCracha;
}
