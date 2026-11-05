# O fundo do mar (fim da home)

Pedido da Emilly em 05/11: "o fundo do mar bonito não é só a baleia, é tudo. Não quero vetor, quero movimentos fluidos."
Por isso a seção inteira é uma cena pintada e animada em vídeo (jubarte, cardume, peixinhos, algas, raios de luz, bolhas
e partículas). Ali não há nada desenhado em vetor. O e-mail gigante passa por cima.

No site:

- **Vídeos e imagens paradas:** `public/img/mar/`. Os vídeos são `cena-largo.mp4` (computador, 1920×1072) e
  `cena-alto.mp4` (celular e tablet em pé, 900×1612), com 10 s em loop e sem som. As imagens paradas, usadas antes de o
  vídeo tocar e com "reduzir movimento", são `cena-largo.webp` e `cena-alto.webp`.
- **Escolha da versão, carregamento e play/pausa:** `src/js/modules/mar.js`. O vídeo só baixa perto da tela e só toca
  enquanto aparece.
- **Estilo:** `src/styles/sections.css`, em `.mar`. Em cima e embaixo o vídeo some (máscara em degradê) no violeta do
  contato e no tinta do rodapé. Em pé, a seção fica na proporção do vídeo, para a baleia caber inteira.

## Como foi feita (para refazer ou trocar)

1. **Cena deitada:** Higgsfield, Nano Banana Pro, 2K, 16:9 (escolhida a 1ª de 4; original em
   `cena-largo-original.webp`). Prompt:
   > Wide underwater scene, a single frame from a beautiful hand-painted 2D animated film: soft gouache textures, smooth
   > gradients, gentle glow, calm and magical mood. Strict limited color palette: bright violet #6225D8 water at the very
   > top near the surface, deepening to plum #3D1C46 in the middle and to almost-black aubergine #2A1433 at the bottom.
   > Soft diagonal god rays of pale lavender light fall from the surface. A large graceful humpback whale glides through
   > the middle of the frame, slightly right of center, side view facing left, long pectoral fins spread, painted in soft
   > lavender #C0A5C4 and pale lilac #E4D6E6 with delicate highlights and throat grooves. A flowing school of tiny fish in
   > butter yellow #F2CF7A swirls on the left, a few small pink #DD34A8 fish nearby. Tall kelp and seaweed in deep wine
   > red #9E122C and dusty lavender rise from the bottom along the edges, sea floor with soft rocks barely visible in the
   > dark. Small bubbles and tiny floating glowing particles. The top quarter of the frame is open violet water with no
   > objects. No text, no logos, no people, no boats, no frame or border.
2. **Cena em pé:** Nano Banana Pro, 2K, 9:16, com a cena deitada como referência (original em
   `cena-alto-original.webp`). Prompt:
   > Recompose this exact underwater painting as a tall vertical 9:16 frame, keeping the same hand-painted style, the
   > same colors, the same humpback whale, the same school of yellow fish and pink fish, the same kelp, light rays,
   > bubbles and particles. Vertical layout: bright violet open water with the shimmering surface and light rays in the
   > top third (no objects there), the humpback whale gliding across the middle facing left, fully visible and a bit
   > smaller so it fits the width, the yellow fish school swirling just below and around it, wine red and lavender kelp
   > rising from the bottom on both sides, dark plum sea floor at the bottom fading to almost black. No text, no border.
3. **Animação:** Higgsfield, Kling 3.0, modo pro, 10 s, sem som, com a mesma imagem como **primeiro e último quadro**.
   Assim o vídeo termina quase igual ao começo e o loop emenda sozinho. Foram geradas 2 versões de cada; ficaram as que
   têm a cauda da baleia batendo mais. Prompt (igual nas duas):
   > Seamless loop of a gently animated hand-painted underwater scene, static camera. The humpback whale glides slowly in
   > place with smooth, fluid swimming: its whole body undulates softly, the long pectoral fins sweep slowly, the tail
   > flukes beat up and down gracefully. The school of small yellow fish flows and swirls like a living ribbon, the little
   > pink fish dart around. The kelp and seaweed sway softly with the current. The light rays shimmer and drift slowly and
   > the water surface ripples at the top. Bubbles rise and tiny glowing particles float. Calm, slow, fluid, dreamy
   > motion. Keep exactly the same painted style, colors and composition; no new objects, no text, no camera movement.
4. **Loop:** foram usados os 241 quadros inteiros. A emenda (último → primeiro) é só um passinho um pouco maior dos
   peixes, e não aparece. Uma fusão do fim com o começo no Remotion foi testada (de 1 s e de 1/4 s) e ficou pior: o
   cardume duplicava.
5. **Para o site (ffmpeg):**
   ```
   ffmpeg -i kling-largo.mp4 -an -vf "scale=1920:-2:flags=lanczos" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart public/img/mar/cena-largo.mp4
   ffmpeg -i kling-alto.mp4  -an -vf "scale=900:-2:flags=lanczos"  -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart public/img/mar/cena-alto.mp4
   ```
   A imagem parada é o primeiro quadro de cada vídeo, em WebP (qualidade 78).
