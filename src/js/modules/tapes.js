// Faixas cruzadas: o texto se repete até cobrir a faixa e depois é duplicado, então a animação
// (que anda 50%) emenda sem buraco em qualquer largura de tela. A velocidade fica igual em qualquer tamanho.
const SPEED = { normal: 45, rev: 36 }; // pixels por segundo

export function initTapes() {
  document.querySelectorAll('.tape__track').forEach((track) => {
    const tape = track.parentElement;
    const set = [...track.children];
    const fill = () => {
      track.replaceChildren(...set);
      while (track.offsetWidth < tape.offsetWidth) set.forEach((el) => track.append(el.cloneNode(true)));
      [...track.children].forEach((el) => track.append(el.cloneNode(true)));
      const speed = track.classList.contains('tape__track--rev') ? SPEED.rev : SPEED.normal;
      track.style.animationDuration = `${track.offsetWidth / 2 / speed}s`;
    };
    fill();
    // mede de novo quando a fonte Anton terminar de carregar (antes dela o texto tem outra largura)
    document.fonts?.ready.then(fill);
    let w = innerWidth;
    addEventListener('resize', () => { if (innerWidth !== w) { w = innerWidth; fill(); } });
  });
}
