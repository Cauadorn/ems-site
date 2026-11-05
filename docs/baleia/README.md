# A jubarte do site (abertura e fundo do mar)

Pedido da Emilly em 05/11: a baleia tinha que nadar de verdade (o desenho vetorizado parado ficou duro). Ela agora é um
vídeo curto em loop, que o site move pela tela (a volta em torno do contador fica em `src/js/modules/loader.js`; o nado no
fundo do mar, em `src/styles/sections.css`, `.mar__nado`).

No site ficam só os vídeos prontos: `public/img/baleia/abertura.mp4`, `mar.mp4` e `mar-poster.webp`.

## Como foi feita (para refazer ou trocar a baleia)

1. **Desenho:** Higgsfield, modelo Nano Banana Pro, 2K, 16:9. Prompt usado:
   > Minimal hand-drawn line illustration of a cute humpback whale swimming, side view facing left, whole body visible:
   > long pectoral fin, small knobbly bumps on the head, ventral throat grooves, small dorsal hump and wide tail flukes,
   > a little smiling mouth and a dot eye. Drawn with one single flat violet color #6225D8, uniform medium stroke weight
   > with rounded line ends, outline only: no fill, no shading, no gradients, no texture. Plain flat cream background
   > #FFFBDE. Friendly doodle style like a designer's sticker, centered with generous empty margins, no text, no water,
   > no other elements.

   O escolhido, já no fundo branco, é `baleia-branco.png`.
2. **Animação:** Higgsfield, Kling 3.0 (pro, 5 s, 16:9, sem som), com `baleia-branco.png` como **primeiro e último
   quadro** (assim o vídeo emenda em loop). Prompt:
   > Flat 2D line-art animation, seamless loop. The violet line-drawn humpback whale swims in place: its whole body
   > undulates in a smooth wave from head to tail, the tail flukes beat slowly up and down, the long pectoral fins sweep
   > gently, the head bobs a little. Keep exactly the same drawing style: thin violet outlines on a plain pure white
   > background, no fill, no shading, no color, no texture, no water, no bubbles, no new objects. Static camera, the
   > whale stays centered and the same size.
3. **Limpeza (ffmpeg):** corta a baleia, reduz para 640×360, passa para cinza e "estoura" o fundo para branco puro
   (traço preto no branco), 120 quadros (o último, repetido, sai):
   ```
   ffmpeg -i kling.mp4 -frames:v 120 -vf "crop=1480:832:240:120,scale=640:360:flags=lanczos,format=gray,lutyuv=y='255-clip((228-val)*255/130\,0\,255)',format=yuv420p" -c:v libx264 -crf 14 -preset slow remotion/public/baleia-linhas.mp4
   ```
   O resultado está em `remotion/public/baleia-linhas.mp4`.
4. **Montagem (Remotion):** `remotion/src/Root.tsx` pinta o traço e gera as duas versões:
   - `abertura`: traço violeta (#6225D8) no branco. No site, `mix-blend-mode: multiply` some com o branco sobre o
     marfim, e o `hue-rotate` do loader leva o traço do violeta ao rosa enquanto o contador sobe.
   - `mar`: traço lavanda (#E4D6E6) no preto. No site, `mix-blend-mode: screen` some com o preto sobre o mar escuro.
   ```
   cd docs/baleia/remotion && npm install
   npm run abertura   # e npm run mar  (no Linux sem Chrome: --browser-executable=<caminho do chrome-headless-shell>)
   ```
5. **Para o site:** comprime e grava em `public/img/baleia/`:
   ```
   ffmpeg -i out/abertura.mp4 -an -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart ../../../public/img/baleia/abertura.mp4
   ffmpeg -i out/mar.mp4      -an -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart ../../../public/img/baleia/mar.mp4
   ffmpeg -i out/mar.mp4 -frames:v 1 mar-poster.png   # e converter para WebP: public/img/baleia/mar-poster.webp
   ```

## Cuidados

- O pai do vídeo não pode criar camada isolada (`z-index`, `opacity` < 1, `transform` com `isolation`…): senão o
  `mix-blend-mode` não alcança o fundo e aparece o retângulo branco (ou preto) do vídeo. Por isso `.loader__content`
  não tem `z-index`.
- A baleia olha para a esquerda no vídeo; o JS gira o elemento conforme a direção do caminho (`loader.js`).
- Com "reduzir movimento", a abertura não toca e no mar fica o pôster parado.
