// Objetos 3D entre parênteses na frase do topo (pedido da Emilly em 05/11, inspirado no kenjilambert.com, que mostra
// renders dos trabalhos 3D dele no meio do título). Aqui são produtos de verdade do portfólio dela (os copos 24 da
// Bruninha e Carnaval 2026 e a vela Selene da ALMAH), feitos em 3D a partir das fotos e animados (WebP com fundo
// transparente em public/img/objetos/; como foram feitos: docs/objetos-3d/README.md).
// As duas vagas trocam de objeto uma de cada vez, com um pulinho, e nunca mostram o mesmo objeto ao mesmo tempo.
// Com "reduzir movimento", ficam paradas (a versão sem animação). Só troca enquanto o topo aparece na tela.
// O HTML já vem com a versão parada (leve); a animada entra quando a abertura termina (main.js chama isto depois).
const OBJETOS = ['copo-bruninha', 'copo-carnaval', 'vela-almah'];
const INTERVALO = 1300; // ms entre uma troca e outra (cada vaga troca a cada 2,6 s)

export function initParenteses(reduced) {
  const vagas = () => [...document.querySelectorAll('[data-parenteses] img')];
  if (!vagas().length) return;
  const pasta = `${import.meta.env.BASE_URL}img/objetos/`;
  const url = (nome) => `${pasta}${nome}${reduced ? '-parado' : ''}.webp`;
  const idx = [0, 2]; // a vaga de cima e a de baixo começam em objetos diferentes

  const pintar = (soEsta) => vagas().forEach((img, j) => {
    if (soEsta !== undefined && j !== soEsta) return;
    const novo = url(OBJETOS[idx[j % 2]]);
    if (img.getAttribute('src') === novo) return;
    img.src = novo;
    if (soEsta !== undefined) { // pulinho na troca
      const vaga = img.parentElement;
      vaga.classList.remove('is-troca');
      void vaga.offsetWidth;
      vaga.classList.add('is-troca');
    }
  });
  pintar();
  // a frase é trocada inteira quando muda o idioma (PT/EN): as vagas novas recebem os objetos certos
  document.addEventListener('idioma', () => pintar());
  if (reduced) return;

  // os outros objetos já baixam em segundo plano, para a troca não piscar
  OBJETOS.forEach((n) => { const i = new Image(); i.src = url(n); });
  let vez = 0, timer = 0;
  const trocar = () => {
    const j = vez++ % 2;
    idx[j] = (idx[j] + 1) % OBJETOS.length;
    pintar(j);
  };
  const hero = document.querySelector('[data-parenteses]').closest('section') || document.body;
  new IntersectionObserver(([e]) => {
    clearInterval(timer);
    if (e.isIntersecting) timer = setInterval(trocar, INTERVALO);
  }).observe(hero);
}
