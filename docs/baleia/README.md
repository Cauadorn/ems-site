# A jubarte da abertura

Pedido da Emilly em 05/11: a baleia tinha que nadar de verdade. Primeiro o desenho vetorizado parado ficou duro; depois
o vídeo dela nadando, girando inteiro pelo caminho, ainda ficou "duro". Agora ela tem o **corpo flexível**.

## Como ela nada no site (corpo flexível)

- `src/js/modules/baleia-gl.js` desenha a baleia em WebGL como uma fita de 56 pedaços com o desenho dela por cima
  (textura `public/img/baleia/baleia-mascara.png`). A cabeça segue o caminho e cada pedaço do corpo passa por onde a
  cabeça já passou, então o corpo curva nas voltas. Por cima, uma onda corre da cabeça à cauda e faz a cauda subir e
  descer (a força da batida e o ritmo estão em `const onda` e `const fase`).
- O caminho (entrada em onda, volta em torno do contador, saída) e a cor do violeta ao rosa ficam em
  `src/js/modules/loader.js`.
- **A textura:** é o traço de `baleia-branco.png` recortado com folga (proporção 1371 × 780), com o fundo branco virando
  preto e o traço virando branco, no tamanho 1024 × 512 (o tamanho precisa ser potência de 2 para o traço ficar liso
  pequeno). Se trocar o desenho, refazer a textura do mesmo jeito e ajustar `PROPORCAO` em `baleia-gl.js`.
- **Sem WebGL** (raro), o loader usa o vídeo `public/img/baleia/abertura.mp4`, feito como explicado abaixo.

(O fundo do mar é outra coisa: a cena inteira pintada e animada, ver `docs/mar/README.md`.)

## Como foram feitos o desenho e o vídeo de reserva

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
4. **Montagem (Remotion):** `remotion/src/Root.tsx` pinta o traço de violeta (#6225D8) no branco. No site,
   `mix-blend-mode: multiply` some com o branco sobre o marfim, e o `hue-rotate` do loader leva o traço do violeta ao
   rosa enquanto o contador sobe.
   ```
   cd docs/baleia/remotion && npm install
   npm run abertura   # no Linux sem Chrome: --browser-executable=<caminho do chrome-headless-shell>
   ```
5. **Para o site:** comprime e grava em `public/img/baleia/`:
   ```
   ffmpeg -i out/abertura.mp4 -an -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart ../../../public/img/baleia/abertura.mp4
   ```

## Cuidados

- O pai do vídeo não pode criar camada isolada (`z-index`, `opacity` < 1, `transform` com `isolation`…): senão o
  `mix-blend-mode` não alcança o fundo e aparece o retângulo branco do vídeo. Por isso `.loader__content`
  não tem `z-index`.
- A baleia olha para a esquerda no vídeo; o JS gira o elemento conforme a direção do caminho (`loader.js`).
- Com "reduzir movimento", a abertura não toca.
