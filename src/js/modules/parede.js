// Parede 3D da abertura do Encontro de Lideranças (mídia com `parede` em src/data/projects.js): a mesma cena do site
// da proposta (cauadorn.github.io/encontro-lideranca-comercial). A parede de peças do squircle balança e vira com o
// mouse; na entrada, três peças saem da parede e encaixam em cima do título. A cena é montada como se a tela tivesse
// 1440 x 900 (o tamanho em que o título foi recortado do site) e só a faixa de 790 px do meio aparece, em qualquer
// largura. Sem WebGL, a imagem parada (abertura.webp) fica no lugar (pedido da Emilly em 30/10).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';
import FORMAS from '../../data/formas-encontro.js';

const W = 1440, H = 900, CORTE = { y: 55, h: 790 };
// onde ficam as três peças do selo no título do site (left, top, largura, altura em px, tela de 1440 x 900)
const ALVOS = [[716.09, 300.89, 76.2, 96.14], [807.05, 271.42, 99.56, 125.61], [921.38, 241.97, 122.91, 155.08]];
const COR_PECA = ['#F6C9CD', '#FBE4E6', '#FFFFFF'];
const SEM_ROSA = { '#F6C9CD': '#A3142A' }; // na parede, o rosa-claro vira um vermelho fundo (não apaga o título)
const PAREDE_Z = -520;
const D = (H / 2) / Math.tan(THREE.MathUtils.degToRad(15)); // em z = 0, 1 unidade = 1 px da tela de 1440 x 900
const F1 = FORMAS.formas.find((f) => f.linha === 0 && f.col === 0); // a forma do selo
const k1 = FORMAS.formas.indexOf(F1);

function palco(canvas) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.toneMapping = THREE.NoToneMapping;
  const cena = new THREE.Scene();
  cena.environment = new THREE.PMREMGenerator(r).fromScene(new RoomEnvironment(), 0.04).texture;
  const luz = new THREE.DirectionalLight(0xffffff, 1.35);
  luz.position.set(-0.6, 1, 1.2);
  cena.add(luz, new THREE.AmbientLight(0xffffff, 0.22));
  const cam = new THREE.PerspectiveCamera(30, W / H, 10, 20000);
  cam.position.set(0, 0, D);
  cam.setViewOffset(W, H, 0, CORTE.y, W, CORTE.h);
  return { r, cena, cam, canvas };
}

// o contorno real de cada forma, extrudado com chanfro, do mesmo tamanho da forma plana
function geometria(f, unidade, passos = 5, fundo = 0.24) {
  const s = new THREE.Shape(), bev = 0.035;
  f.pts.forEach((p, i) => { const x = (p[0] - f.w / 2) / unidade, y = -(p[1] - f.h / 2) / unidade; i ? s.lineTo(x, y) : s.moveTo(x, y); });
  const g = new THREE.ExtrudeGeometry(s, { depth: fundo, bevelEnabled: true, bevelThickness: 0.05, bevelSize: bev, bevelSegments: passos, curveSegments: 4 });
  const sw = f.w / unidade, k = sw / (sw + 2 * bev);
  g.translate(0, 0, -fundo / 2); g.scale(k, k, 1); g.computeVertexNormals();
  return g;
}

export function initParede(fig) {
  const viva = document.createElement('div');
  viva.className = 'parede__viva';
  viva.setAttribute('aria-hidden', 'true');
  viva.innerHTML = `<canvas class="parede__fundo"></canvas><div class="parede__veu"></div><img class="parede__titulo" src="${fig.dataset.parede}" alt="" decoding="async"><canvas class="parede__frente"></canvas>`;
  fig.append(viva);
  const [cFundo, , titulo, cFrente] = viva.children;

  let A, B;
  try { A = palco(cFundo); B = palco(cFrente); } catch (e) { viva.remove(); return; } // sem WebGL: fica a imagem

  // parede: uma instância por forma, ladrilhada
  const meiaH = Math.tan(THREE.MathUtils.degToRad(15)) * (D - PAREDE_Z), meiaW = meiaH * W / H;
  const tileW = W * 0.42, s = tileW / FORMAS.tile[0], tileH = FORMAS.tile[1] * s;
  const nx = Math.ceil((meiaW * 2) / tileW) + 3, ny = Math.ceil((meiaH * 2) / tileH) + 3, tiles = [];
  for (let iy = -1; iy < ny; iy++) for (let ix = -1; ix < nx; ix++) tiles.push([-meiaW + ix * tileW - tileW * 0.18, meiaH - iy * tileH + tileH * 0.12]);
  const escParede = s * 321;
  const parede = new THREE.Group();
  A.cena.add(parede);
  const inst = FORMAS.formas.map((f) => {
    const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(SEM_ROSA[f.cor.toUpperCase()] || f.cor).multiplyScalar(0.66), roughness: 0.55, metalness: 0, envMapIntensity: 0.28 });
    const im = new THREE.InstancedMesh(geometria(f, 321, 2), mat, tiles.length);
    im.frustumCulled = false;
    im.userData = { base: tiles.map(([ox, oy]) => new THREE.Vector3(ox + (f.x + f.w / 2) * s, oy - (f.y + f.h / 2) * s, PAREDE_Z)), fase: tiles.map(() => Math.random() * 6.283) };
    parede.add(im);
    return im;
  });
  // as três que saem: a forma do selo mais perto do centro, da esquerda para a direita
  const saidas = inst[k1].userData.base.map((p, idx) => ({ idx, p })).sort((a, b) => Math.hypot(a.p.x, a.p.y * 1.4) - Math.hypot(b.p.x, b.p.y * 1.4))
    .slice(0, 3).sort((a, b) => a.p.x - b.p.x).map((c) => c.idx);

  // as três peças do selo (palco da frente, por cima do título)
  const geoPeca = geometria(F1, F1.w, 5, 0.14);
  const pecas = COR_PECA.map((c) => {
    const m = new THREE.Mesh(geoPeca, new THREE.MeshPhysicalMaterial({ color: c, emissive: c, emissiveIntensity: 0.1, roughness: 0.34, envMapIntensity: 0.55, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12 }));
    m.visible = false;
    B.cena.add(m);
    return m;
  });
  const alvos = ALVOS.map(([l, t, w, h]) => ({ p: new THREE.Vector3(l + w / 2 - W / 2, H / 2 - (t + h / 2), 0), w }));

  function medir() {
    const w = fig.clientWidth, h = fig.clientHeight;
    if (!w || !h) return;
    for (const P of [A, B]) P.r.setSize(w, h, false);
  }
  medir();
  new ResizeObserver(medir).observe(fig);

  // mouse: a posição em cima da imagem (de -0,5 a 0,5) vira a parede; sem mouse (celular), ela balança sozinha
  const E = { forma: 0, tx: 0, ty: 0 };
  const semMouse = matchMedia('(hover: none)').matches;
  addEventListener('pointermove', (ev) => {
    const r = fig.getBoundingClientRect();
    E.tx = Math.max(-0.6, Math.min(0.6, (ev.clientX - r.left) / r.width - 0.5));
    E.ty = Math.max(-0.6, Math.min(0.6, (ev.clientY - r.top) / r.height - 0.5));
  }, { passive: true });

  // entrada (a primeira vez que aparece): a parede chega, as peças saem dela e encaixam no título, o texto sobe
  let entrou = false;
  function entrada() {
    entrou = true;
    fig.classList.add('is-viva');
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(parede.position, { z: -300 }, { z: 0, duration: 1.5, ease: 'power3.out' }, 0);
    tl.fromTo(cFundo, { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power1.out' }, 0);
    tl.to(E, { forma: 1, duration: 2.4, ease: 'none' }, 0.6);
    tl.fromTo(titulo, { opacity: 0, y: 14, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', clearProps: 'filter,transform', duration: 1, ease: 'power3.out' }, 2.1);
  }

  const m4 = new THREE.Matrix4(), q0 = new THREE.Quaternion(), sv = new THREE.Vector3(), pv = new THREE.Vector3();
  const ini = new THREE.Vector3(), meio = new THREE.Vector3(), q1 = new THREE.Vector3(), q2 = new THREE.Vector3(), pos = new THREE.Vector3();
  const cIni = new THREE.Color(F1.cor).multiplyScalar(0.7), cA = new THREE.Color();
  const prog = (i) => Math.min(1, Math.max(0, (E.forma - i * 0.13) / 0.62)); // cada peça sai um pouco depois da outra
  let mx = 0, my = 0, ultimo = 0, media = 16, leve = false, raf = 0;
  function quadro(agora) {
    raf = requestAnimationFrame(quadro);
    const t = agora / 1000;
    if (ultimo) media += ((agora - ultimo) - media) * 0.05;
    ultimo = agora;
    if (!leve && t > 1.5 && media > 34) { leve = true; A.r.setPixelRatio(0.75); medir(); } // aparelho lento: parede em resolução menor
    if (semMouse) { E.tx = Math.sin(t * 0.35) * 0.35; E.ty = Math.sin(t * 0.27) * 0.25; }
    mx += (E.tx - mx) * 0.06; my += (E.ty - my) * 0.06;

    parede.rotation.y = -0.1 + mx * 0.1;
    parede.rotation.x = -0.2 + my * 0.06;
    parede.updateMatrixWorld(true);
    inst.forEach((im, k) => {
      const u = im.userData;
      for (let j = 0; j < u.base.length; j++) {
        const b = u.base[j];
        pv.set(b.x, b.y, b.z + Math.sin(t * 0.7 + u.fase[j]) * 9);
        const sai = k === k1 ? saidas.indexOf(j) : -1;
        const esc = sai >= 0 && prog(sai) > 0 ? 1e-4 : escParede; // a peça que saiu deixa o buraco
        sv.set(esc, esc, esc);
        m4.compose(pv, q0, sv);
        im.setMatrixAt(j, m4);
      }
      im.instanceMatrix.needsUpdate = true;
    });
    A.r.render(A.cena, A.cam);

    pecas.forEach((m, i) => {
      const p = prog(i), pe = 1 - Math.pow(1 - p, 3);
      ini.copy(inst[k1].userData.base[saidas[i]]).applyMatrix4(parede.matrixWorld);
      const alvo = alvos[i];
      meio.lerpVectors(ini, alvo.p, 0.5); meio.z = 300 + i * 70; // sobem em arco, na direção de quem olha
      q1.lerpVectors(ini, meio, pe); q2.lerpVectors(meio, alvo.p, pe); pos.lerpVectors(q1, q2, pe);
      m.position.copy(pos);
      m.scale.setScalar(THREE.MathUtils.lerp(escParede * F1.w / 321, alvo.w, pe));
      const voo = Math.sin(pe * Math.PI);
      m.rotation.set(voo * 0.9 + my * 0.3, pe * Math.PI * 2 * (i % 2 ? -1 : 1) + mx * 0.4, voo * 0.25 * (i - 1));
      cA.set(COR_PECA[i]);
      m.material.color.copy(cIni).lerp(cA, Math.min(1, pe * 1.3));
      m.material.emissive.copy(m.material.color);
      m.visible = p > 0;
    });
    B.r.render(B.cena, B.cam);
  }

  // só desenha enquanto aparece na tela
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (!entrou) entrada();
      if (!raf) raf = requestAnimationFrame(quadro);
    } else if (raf) { cancelAnimationFrame(raf); raf = 0; ultimo = 0; }
  }, { threshold: 0.25 }).observe(fig);
}
