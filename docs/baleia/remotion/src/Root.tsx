import React from 'react';
import { AbsoluteFill, Composition, OffthreadVideo, staticFile } from 'remotion';

// A jubarte nadando (vídeo gerado no Higgsfield/Kling a partir do desenho da Emilly, já limpo: traço preto no branco)
// vira um "sprite" em loop para o site:
// - "abertura": traço violeta no branco puro (no site, mix-blend-mode: multiply sobre o marfim: o branco some)
// - "mar": traço lavanda no preto puro (no site, mix-blend-mode: screen sobre o mar escuro: o preto some)
// O loop emenda sozinho: o vídeo foi gerado com o mesmo desenho no primeiro e no último quadro (o último, repetido, saiu).
// (Uma fusão entre o fim e o começo foi testada e deixava a baleia com traço duplo: ficou o corte simples.)
const LOOP = 120; // quadros do vídeo limpo (5 s a 24 fps)

type Props = { cor: string; fundo: string; inverte: boolean };

const Linhas: React.FC<{ inverte: boolean }> = ({ inverte }) => (
  <OffthreadVideo src={staticFile('baleia-linhas.mp4')} muted
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: inverte ? 'invert(1)' : 'none' }} />
);

export const Baleia: React.FC<Props> = ({ cor, fundo, inverte }) => {
  return (
    <AbsoluteFill style={{ background: fundo }}>
      <AbsoluteFill style={{ mixBlendMode: inverte ? 'screen' : 'multiply' }}>
        <Linhas inverte={inverte} />
      </AbsoluteFill>
      {/* tinge o traço: no branco, o traço preto vira a cor (screen); no preto, o traço branco vira a cor (multiply) */}
      <AbsoluteFill style={{ background: cor, mixBlendMode: inverte ? 'multiply' : 'screen' }} />
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <>
    <Composition id="abertura" component={Baleia} durationInFrames={LOOP} fps={24} width={640} height={360}
      defaultProps={{ cor: '#6225D8', fundo: '#ffffff', inverte: false }} />
    <Composition id="mar" component={Baleia} durationInFrames={LOOP} fps={24} width={640} height={360}
      defaultProps={{ cor: '#E4D6E6', fundo: '#000000', inverte: true }} />
  </>
);
