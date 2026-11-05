# Objetos 3D entre parênteses (frase do topo)

Pedido da Emilly em 05/11, inspirado no kenjilambert.com. Lá, o título tem renders animados dos trabalhos 3D dele entre
parênteses ("making ( 🎰 ) things"): são WebP animados com fundo transparente, trocando de tempos em tempos. Aqui a frase
do topo ficou "Faço marca ( 🥤 ) bonita de perto / e clara ( 🕯 ) de longe.", com produtos de verdade do portfólio dela.
No celular só a segunda linha tem o objeto (a primeira não cabia).

| Objeto | Projeto | Foto de origem (recorte em `estudio/`) |
|---|---|---|
| `copo-bruninha` | Copo 24 da Bruninha | `public/img/projetos/copo-24-da-bruninha/slide-01.webp`, o copo do meio |
| `copo-carnaval` | Copo Carnaval 2026 | `public/img/projetos/copo-carnaval-2026/slide-01.webp`, o copo da direita |
| `vela-almah` | ALMAH, vela Selene | `public/img/projetos/almah/colecao.webp`, a vela do meio |

O copo Suddenly 30 ficou de fora porque a arte tem personagem e marca de terceiros.

## Como foram feitos (sem gastar créditos)

1. **O objeto é montado aqui, e a foto vira a textura.** `estudio/objeto.html` (three.js) monta o copo (um cone com
   boca, friso e fundo) ou a vela (o pote de vidro, a cera, o pavio e uma chama que tremula). Depois "projeta" a foto
   original nele, como um projetor no lugar da câmera que fez a foto. Assim a arte aparece exatamente como a Emilly
   desenhou. As medidas de cada foto ficam em `objetos.json`: centro, centro da boca e do fundo, raios, inclinação da
   câmera, cor de dentro e zoom.
2. **Animação:** os copos dançam de um lado para o outro e dão dois pulinhos com amassadinho. A vela balança, flutua e
   a chama tremula. Eles giram só um pouco, porque a foto só tem a frente. O loop tem 48 quadros, a 20 por segundo.
3. **Gravação:** sirva a pasta `estudio/` (com `three.module.js` e `addons/` copiados de `node_modules/three`), por
   exemplo `python3 -m http.server 5191`. Rode `node grava.mjs "<medidas do objetos.json>" <pasta> 48` para gravar os
   quadros PNG transparentes. Depois `python3 webp.py <pasta> public/img/objetos/<nome>` gera o WebP animado de
   160 × 160 (cerca de 190 KB) e a versão parada (cerca de 5 KB).

**Tentativa descartada:** o "Image to 3D" do Higgsfield (Meshy, 30 créditos por objeto) redesenha a textura, e as
letras saíram embaralhadas ("24 A OMIO"). Isso deturpa a arte dela. Não usar para objetos com texto ou arte.

## No site

- **Imagens:** `public/img/objetos/<nome>.webp` (animado) e `<nome>-parado.webp`. O HTML já vem com a versão parada,
  e a animada entra depois da abertura. Com "reduzir movimento", fica a parada.
- **Troca entre os objetos:** `src/js/modules/parenteses.js`. As vagas trocam uma de cada vez e nunca mostram o mesmo
  objeto ao mesmo tempo.
- **Estilo:** `sections.css`, em `.parenteses`.
- **Objeto novo:** gerar o WebP do mesmo jeito e pôr o nome na lista `OBJETOS` de `parenteses.js`.
