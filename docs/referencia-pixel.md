# Como a Pixel (pixel.melbourne) faz o carrossel e o hero — para copiar fielmente

## Carrossel (seção #directors) — cilindro 3D movido pela ROLAGEM
- Estrutura: `[carousel=component]` > `.carousel_track` (alto, 1 "painel" de rolagem por item) > `.carousel_sticky` (position: sticky, 100vh) > `[carousel=wrap]` > lista > itens.
- Itens em círculo: `rotateY(360/n * i) translateZ(R)`, com `R = largura / (2·tan(180/n)) + gap`.
- Variáveis: `--3d-carousel-item-width: 50vw; --3d-carousel-gap: 30vw` (tablet 70vw / 40vw). O wrap usa `perspective: R` e a lista `translate3d(0,0,-R) rotateY(var(--3d-carousel-rotate))`.
- GSAP ScrollTrigger (scrub, start top top, end bottom bottom) anima `--3d-carousel-rotate` de 0 a `-(360 - 360/n)`.
- Nomes: `.carousel_content_item[carousel=panel]` com `<h2>` gigante + botão "watch movies", um por item, rolando por cima; cada painel ativa com ScrollTrigger "top center / bottom center".
- Setas `[carousel=prev/next]` em `.carousel_arrow_sticky` rolam a página até o painel seguinte (600 ms); a da ponta fica com `.is-disabled` (opacidade .4).
- Easing global do site: CustomEase "main" = 0.65, 0.01, 0.05, 0.99, duração .7.

## Hero
- Logo em vídeo em loop ocupando a tela (letras em caixas coloridas), depois a frase grande em 3 linhas que entram pelos lados (translate 20% / -15% + opacidade) com GIFs-etiqueta ("live action", "wizardry") que surgem com scale 0→1.
- Menu: painéis de fundo entram da direita em cascata (xPercent 101→0, stagger .12), links sobem rodando 10°.
- "do NOT click me": Matter.js derruba os elementos `.physics-item` da página com gravidade e repulsão do mouse.
