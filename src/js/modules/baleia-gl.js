// A jubarte da abertura com o corpo flexível (pedido da Emilly em 05/11: a baleia em vídeo nadava "dura").
// O desenho dela (public/img/baleia/baleia-mascara.png: o traço em branco no preto, recortado de docs/baleia/baleia-branco.png)
// vira uma fita de GOMOS pedaços desenhada em WebGL. A cabeça vai na frente pelo caminho e cada pedaço do corpo passa por
// onde a cabeça já passou, então o corpo curva nas voltas em vez de girar duro. Por cima, uma onda que corre da cabeça à
// cauda faz a cauda subir e descer (é assim que a baleia nada) e a cabeça balançar de leve.
// Sem WebGL, criarBaleiaGL devolve null e o loader usa o vídeo antigo.
export const PROPORCAO = 1371 / 780; // largura/altura do desenho (recorte com folga)
const GOMOS = 56;

const VERT = `
attribute vec2 aPos; attribute vec2 aUv; uniform vec2 uTela; varying vec2 vUv;
void main() { vec2 p = aPos / uTela * 2.0 - 1.0; gl_Position = vec4(p.x, -p.y, 0.0, 1.0); vUv = aUv; }`;
const FRAG = `
precision mediump float; uniform sampler2D uDesenho; uniform vec3 uCor; varying vec2 vUv;
void main() { float a = texture2D(uDesenho, vUv).r; gl_FragColor = vec4(uCor * a, a); }`;

// ponto(s): o caminho (em px, a partir de `origem`); vai de sMin a sMax. comprimento/altura: tamanho da baleia em px.
export function criarBaleiaGL(canvas, src, { ponto, sMin, sMax, origem, comprimento, altura }) {
  let gl = null;
  try { gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: true, alpha: true }); } catch (e) { /* sem WebGL */ }
  if (!gl) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = innerWidth, H = innerHeight;
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);

  const sh = (tipo, cod) => { const s = gl.createShader(tipo); gl.shaderSource(s, cod); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const aPos = gl.getAttribLocation(prog, 'aPos'), aUv = gl.getAttribLocation(prog, 'aUv');
  const uCor = gl.getUniformLocation(prog, 'uCor');
  gl.uniform2f(gl.getUniformLocation(prog, 'uTela'), W, H);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(aUv); gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let pronta = false;
  const img = new Image();
  img.onload = () => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D); // 1024 × 512: dá para fazer mipmap (o traço fica liso pequeno)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    pronta = true;
  };
  img.src = src;

  // o caminho medido: pontos a cada passo de s e o comprimento acumulado, para achar "onde a cabeça estava X px atrás"
  const PASSO = 0.0005;
  const n = Math.ceil((sMax - sMin) / PASSO) + 1;
  const px = new Float32Array(n), py = new Float32Array(n), acc = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const [x, y] = ponto(sMin + i * PASSO);
    px[i] = origem[0] + x; py[i] = origem[1] + y;
    acc[i] = i ? acc[i - 1] + Math.hypot(px[i] - px[i - 1], py[i] - py[i - 1]) : 0;
  }
  const noComprimento = (l, out) => {
    if (l <= 0) { out[0] = px[0]; out[1] = py[0]; return; }
    let a = 0, b = n - 1;
    while (b - a > 1) { const m = (a + b) >> 1; if (acc[m] < l) a = m; else b = m; }
    const t = (l - acc[a]) / (acc[b] - acc[a] || 1);
    out[0] = px[a] + (px[b] - px[a]) * t; out[1] = py[a] + (py[b] - py[a]) * t;
  };

  const espinha = new Float32Array((GOMOS + 1) * 2), nadando = new Float32Array((GOMOS + 1) * 2);
  const vert = new Float32Array((GOMOS + 1) * 8);
  // "para cima" da baleia (o lado das costas) no gomo i: a direção da cauda para a cabeça, girada 90°
  const costas = (e, i, out) => {
    const a = Math.max(0, i - 1), b = Math.min(GOMOS, i + 1);
    const dx = e[a * 2] - e[b * 2], dy = e[a * 2 + 1] - e[b * 2 + 1], d = Math.hypot(dx, dy) || 1;
    out[0] = -dy / d; out[1] = dx / d;
  };
  const p = [0, 0];
  const t0 = performance.now();

  return {
    // s: onde a cabeça está no caminho; cor: [r, g, b] de 0 a 1
    desenhar(s, cor) {
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      if (!pronta) return;
      const i0 = Math.min(n - 1, Math.max(0, (s - sMin) / PASSO));
      const k = Math.floor(i0), lCabeca = acc[k] + (acc[Math.min(n - 1, k + 1)] - acc[k]) * (i0 - k);
      const tempo = (performance.now() - t0) / 1000;
      // fase do nado: bate no tempo e um pouco mais rápido quando ela anda mais
      const fase = tempo * 1.25 + lCabeca / (comprimento * 2.2);
      // 1) a espinha: cada gomo onde a cabeça passou
      for (let i = 0; i <= GOMOS; i++) {
        noComprimento(lCabeca - comprimento * (i / GOMOS), p);
        espinha[i * 2] = p[0]; espinha[i * 2 + 1] = p[1];
      }
      // 2) a onda do nado (para cima e para baixo do corpo): quase nada na cabeça, forte na cauda
      for (let i = 0; i <= GOMOS; i++) {
        costas(espinha, i, p);
        const u = i / GOMOS;
        const onda = comprimento * 0.09 * (0.1 + 0.9 * u * u) * Math.sin(2 * Math.PI * (0.8 * u - fase));
        nadando[i * 2] = espinha[i * 2] + p[0] * onda; nadando[i * 2 + 1] = espinha[i * 2 + 1] + p[1] * onda;
      }
      // 3) a fita em volta da espinha já nadando (assim a cauda também inclina quando bate)
      const meia = altura / 2;
      for (let i = 0; i <= GOMOS; i++) {
        costas(nadando, i, p);
        const x = nadando[i * 2], y = nadando[i * 2 + 1], u = i / GOMOS, o = i * 8;
        vert[o] = x + p[0] * meia; vert[o + 1] = y + p[1] * meia; vert[o + 2] = u; vert[o + 3] = 0;
        vert[o + 4] = x - p[0] * meia; vert[o + 5] = y - p[1] * meia; vert[o + 6] = u; vert[o + 7] = 1;
      }
      gl.bufferData(gl.ARRAY_BUFFER, vert, gl.DYNAMIC_DRAW);
      gl.uniform3f(uCor, cor[0], cor[1], cor[2]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, (GOMOS + 1) * 2);
    },
    destruir() { gl.getExtension('WEBGL_lose_context')?.loseContext(); },
  };
}
