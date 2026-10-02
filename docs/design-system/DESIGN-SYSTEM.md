# EMS — Design System do site

> Marca pessoal de **Emilly Silva** (@itsemsdesign), designer gráfico e UX/UI entre São Paulo e Belo Horizonte, atendendo todo o Brasil.
> Versão 1.0 · 30/09/2026 · site em Vite + HTML/CSS/JS puro + GSAP + Lenis.
>
> **Para IA (Claude ou outra):** este arquivo é a regra. Os valores exatos estão em `tokens.json` (formato W3C
> Design Tokens) e no código em `src/styles/tokens.css`. O selo e os ícones estão em `assets/`. Se algo aqui
> contradisser o código, vale o código e este arquivo deve ser corrigido.

---

## 1. Essência

- **Frase da marca (da bio dela):** "faço marca bonita de perto e clara de longe".
- **O que ela faz:** identidade visual · web design e UX/UI · social media e peças · produtos personalizados
  (copos, ecobags, estampas: surface design) · fotografia.
- **Objetivo do site:** trazer clientes. Portfólio claro e fácil de usar, com personalidade. Conceitual, mas usável
  (a referência de estilo é pixel.melbourne; a de usabilidade é um portfólio direto).
- **Personalidade:** criativa, divertida sem ser infantil, profissional (ela é formada), feminina sem clichê,
  "caderno de designer": adesivos, retícula, moldura de seleção do Figma, cursor com etiqueta.
- **Contra o quê:** "blanding" (marca limpa demais, igual a todas). Minimalismo sem personalidade.

### Tom de voz
- Primeira pessoa, próxima, direta. Frases curtas. Português do Brasil informal na medida ("pra", "a gente").
- Uma palavra de destaque por título, em serif itálico: "Trabalhos que têm *cara*", "No que eu posso te *ajudar*".
- Sem jargão de agência e sem promessa vaga. Objetivo antes de emotivo (pedido do cliente, 29/09).

| Use | Evite |
|---|---|
| "Faço marca bonita de perto e clara de longe." | "Transformo sonhos em marcas incríveis ✨" |
| "Me conta sobre a sua marca. Eu respondo rapidinho." | "Entre em contato conosco para mais informações." |
| "Marca boa é a que as pessoas reconhecem." | "Minimalismo virou desculpa…" em tamanho gigante (reprovado por ser emotivo demais) |
| Botões com verbo + objeto: "Ver projetos", "Quero uma marca" | "Clique aqui", "Saiba mais" |

---

## 2. Selo (logo)

- **Arquivo:** `assets/selo-ems.svg` (no site: `src/assets/illustrations/selo-ems.svg`). 544 × 705, 3 cores:
  violeta `#6125D9`, branco `#FEFEFE`, amarelo das mechas `#ECDC8C`.
- **É a arte ORIGINAL dela. Nunca redesenhar, redesenhar "melhorado", recolorir, trocar partes, distorcer,
  aplicar contorno extra ou baixar opacidade.** (Uma versão redesenhada foi reprovada em 29/09.)
- Já tem borda de adesivo (contorno branco + violeta): funciona sobre qualquer fundo da paleta.
- **Tamanho mínimo:** 28 px de largura na tela (favicon/cabeçalho usam 30–34 px).
- **Área de proteção:** 25% da largura do selo livre em volta.
- **Uso inclinado:** só no hero, como carimbo sobre o "S" do logo, a 12°, com sombra
  `drop-shadow(0 18px 24px rgba(42,20,51,.45))`. Em qualquer outro lugar, reto.
- **Movimento permitido:** inclinar em 3D seguindo o cursor (até 9° em Y e 7° em X), pequeno "aceno" de −8° no
  clique, entrada com escala 0 → 1. Nunca girar continuamente nem deformar.

### Logo tipográfico do hero
- "EMS" em Anton, caixa alta, cada letra numa caixa: E e S em ameixa `#3D1C46`, M em rosa `#DD34A8`, texto marfim, sobre
  o fundo violeta do topo (01/10, pedido da Emilly: as caixas antigas `#6E36E6`/`#5A1FCB` quase sumiam no violeta).
- Tamanho `--logo: clamp(7rem, min(21vw, 36vh), 21rem)` (encolhe em tela baixa), `line-height .82`, espaço entre caixas `.06em`, padding da caixa `.04em .08em .05em`
  (o respiro embaixo evita cortar a curva do S).
- No celular (≤ 860 px): 30vw.
- As caixas "respiram" em loop (sobe 6%, gira −2°/2°/−1,5°, 0,9 s, ida e volta, uma após a outra).

---

## 3. Cores

| Token | Hex | RGB | Papel |
|---|---|---|---|
| `--ivory` | #FFFBDE | 255 251 222 | fundo claro principal; texto sobre escuro |
| `--ivory-2` | #F4EDCB | 244 237 203 | fundo da seção Sobre |
| `--ink` | #2A1433 | 42 20 51 | texto sobre claro, bordas, sombra dura |
| `--ameixa` | #3D1C46 | 61 28 70 | fundo de Projetos, Serviços, cases e "Todos os projetos"; caixas E e S do logo |
| `--violeta` | #6225D8 | 98 37 216 | cor da marca: hero, contato, menu, links |
| `--violeta-2` | #7B4DF2 | 123 77 242 | estrelas/espirais sobre o violeta |
| `--lavanda` | #C0A5C4 | 192 165 196 | faixa secundária, "ems" do rodapé |
| `--lavanda-2` | #E4D6E6 | 228 214 230 | fundo de "Como eu penso design", hovers |
| `--wine` | #9E122C | 158 18 44 | faixa principal, cartão Identidade visual, cereja |
| `--pink` | #DD34A8 | 221 52 168 | acento: palavra itálica, etiqueta, "ver case" |
| `--manteiga` | #F2CF7A | 242 207 122 | frase serif do hero, setas, brilhos, etiquetas |

**Proporção de uso:** violeta e ameixa dominam as seções escuras; marfim é o respiro; rosa e manteiga são acento
(no máximo 1 ou 2 elementos por tela); vinho e lavanda aparecem em faixas, cartões e ilustrações.

### Contraste (WCAG 2.1, calculado)
| Texto sobre fundo | Razão | Uso permitido |
|---|---|---|
| ivory sobre ink | 16,13 | qualquer texto |
| ivory sobre ameixa | 13,84 | qualquer texto |
| ink sobre lavanda-2 | 12,08 | qualquer texto |
| ink sobre manteiga | 11,22 | qualquer texto |
| manteiga sobre ameixa | 9,62 | qualquer texto |
| ivory sobre wine | 7,80 | qualquer texto |
| ink sobre lavanda | 7,56 | qualquer texto |
| ivory sobre violeta | 7,24 | qualquer texto |
| lavanda sobre ameixa | 6,48 | qualquer texto |
| violeta sobre lavanda-2 | 5,43 | qualquer texto |
| manteiga sobre violeta | 5,04 | qualquer texto |
| ivory sobre violeta-2 | 4,80 | qualquer texto |
| ink sobre pink | 4,12 | só texto grande (≥ 24 px, ou ≥ 18,7 px em negrito) |
| ivory sobre pink / pink sobre ivory | 3,92 | só texto grande |
| pink sobre ameixa | 3,53 | só texto grande |
| pink sobre lavanda-2 | 2,94 | decorativo (não usar em texto) |
| ivory sobre lavanda | 2,13 | decorativo (não usar em texto) |

> **Ponto de atenção:** a etiqueta "@itsemsdesign" (12,8 px) e o botão "ver case" (17,6 px negrito) usam texto
> pequeno sobre rosa e ficam abaixo de 4,5:1. Hoje são tratados como assinatura/decoração; se o site passar por
> auditoria de acessibilidade, subir esses textos para ≥ 18,7 px negrito ou trocar o fundo para violeta.

---

## 4. Tipografia

| Papel | Família | Uso | Regras |
|---|---|---|---|
| Display | **Anton** 400 | títulos de seção, logo, nomes do carrossel, faixas | sempre CAIXA ALTA, `line-height .9–.98`, `letter-spacing -.01em` |
| Voz | **Instrument Serif** itálico | a palavra de destaque, subtítulos, frase do hero | caixa baixa, `letter-spacing -.02em`; nos títulos 1,3× o Anton e no nome do menu 1,35× o Inter (o itálico fino parece menor; pedido da Emilly em 01/10) |
| Texto | **Inter** (variável) | parágrafos, botões, rótulos, interface | 400 texto, 500–600 rótulo, 700 botão forte; `line-height 1.55` |

Arquivos: `@fontsource/anton`, `@fontsource/instrument-serif` (400 + 400-italic), `@fontsource-variable/inter`
(servidas pelo próprio site, sem Google Fonts). Conferir acento (é, ã, ç): as três fontes têm.

### Escala
| Token | Valor | Onde |
|---|---|---|
| `--t-hero` | clamp(3.4rem, 11vw, 10.5rem) | escala antiga do hero (hoje a frase do hero usa clamp(2rem, 4.2vw, 4rem) em serif itálico; celular 8.4vw) |
| `--t-h2` | clamp(2rem, 4vw, 3.6rem) | títulos de seção (reduzidos em 01/10) |
| `--t-h3` | clamp(1.6rem, 2.6vw, 2.2rem) | título de cartão de serviço |
| `--t-lead` | clamp(1.05rem, 1.3vw, 1.25rem) | parágrafo de abertura, "Sobre" |
| `--t-body` | 1rem (16 px) | texto |
| `--t-small` | .875rem (14 px) | eyebrow, botão pequeno, chips |
| Eyebrow | 14 px, 600, `letter-spacing .08em`, CAIXA ALTA, opacidade .7 | "(01) Projetos selecionados" |
| Nome no carrossel | Anton 8vw (≤991: 16vw; ≤479: 14vw) | igual à Pixel |

### Combinação padrão de título
```html
<h2 class="section-title">Trabalhos que têm <em>cara</em></h2>
```
```css
.section-title { font-family: var(--f-display); font-size: var(--t-h2); line-height: .95; text-transform: uppercase; letter-spacing: -.01em; }
.section-title em { font-family: var(--f-serif); font-style: italic; text-transform: none; letter-spacing: -.02em; font-size: 1.3em; color: var(--pink); }
/* em fundo escuro a palavra em itálico fica manteiga */
```

---

## 5. Espaço, grade, forma

- **Margem lateral:** `--gutter: clamp(16px, 4vw, 56px)`. Conteúdo até `--max: 1320px`, centralizado.
- **Entre seções:** `--section: clamp(56px, 7vw, 112px)` em cima e embaixo (reduzido em 01/10 a pedido da Emilly: o site ficava longo demais). Título → conteúdo: `clamp(28px, 4vw, 48px)`.
- **Grupos:** sempre flex/grid com `gap` (8 px entre chips, 12 px entre botões, 16–18 px entre cartões).
- **Raios:** 10 px (`--r-s`), 20 px (`--r-m`), 32 px (`--r-l`), pílula 999 px, card do carrossel .5rem, etiqueta 4 px.
- **Sombras:** dura `6px 6px 0 var(--ink)` (cartões do processo, estilo adesivo); hover de botão `0 6px 0 rgba(42,20,51,.25)`;
  card 3D `0 30px 60px -30px rgba(42,20,51,.6)`. Nunca sombra preta (`rgba(0,0,0,…)`).
- **Pontos de quebra:** 1000 px (hover dos serviços), 991 px (carrossel tablet), 860 px (menu vira tela cheia,
  hero em 1 coluna), 560 px (botões na largura toda, processo em 1 coluna), 479 px (carrossel celular).
- **Nunca rolagem lateral:** elementos inclinados que passam da tela (faixas) levam `overflow-x: clip` no container.

---

## 6. Texturas e ilustrações

| Elemento | Como é | Onde |
|---|---|---|
| Grão de papel | ruído fractal (feTurbulence .9, 2 oitavas) em tela cheia, opacidade 7% | todo o site (`body::after`) |
| Estrela da Emilly | estrela cheia de 5 pontas com uma auréola em forma de estrela maior, de pontos em grade que diminuem para fora (`src/assets/illustrations/estrela-ems.svg`, usada como máscara: `.estrela`) | fundo do hero, da 404 e do manifesto, na cor tinta; cor por `color` |
| Espiral | espiral de Arquimedes, traço 6, pontas redondas | ícone de Identidade visual, abertura, menu, contato |
| Cereja | par de cerejas com cabo e folha em `#3D1C46`, frutas na cor do `color` | adesivo do hero, Social & peças |
| XOXO | X e O desenhados em traço 8 | adesivo do hero |
| Brilho | estrela de 4 pontas | acento, pisca (2,4 s) |
| Coração | coração cheio | faixa lavanda, easter egg |
| Cursor | seta do Figma com contorno marfim | cursor do site e etiquetas |
| Moldura de seleção | borda 1,5 px + 4 alças quadradas de 11 px nos cantos | foto do "Sobre" (e antigo hero) |
| Etiqueta @ | retângulo raio 4 com o cursor encostado no canto superior esquerdo | "@itsemsdesign" |

Todos os ícones estão em `assets/icones/*.svg` e no sprite `assets/icons-sprite.svg` (uso: `<svg><use href="#i-espiral"/></svg>`).
Ids: `i-espiral, i-cereja, i-xoxo, i-brilho, i-estrela, i-estrela-reticula, i-coracao, i-cursor, i-seta, i-seta-diag,
i-instagram, i-behance, i-linkedin, i-whatsapp, i-email`.

Regras: ícones herdam a cor por `currentColor`; tamanho mínimo 16 px; nada de emoji como ícone de seção
(emojis só nas listas do CPF × CNPJ, porque vêm do post dela).

---

## 7. Componentes

### Botão (`.btn`)
- Pílula, altura 52 px (pequeno 42, grande 60), padding `0 1.5em`, borda 2 px, Inter 600, ícone 1,15 em à direita ou esquerda.
- Variantes: `--ivory` (fundo marfim, texto violeta: ação principal sobre violeta), `--ink` (tinta/marfim: CTA do
  cabeçalho), `--ghost` (transparente com borda da cor do texto: ação secundária).
- Hover: sobe 3 px + sombra `0 6px 0 rgba(42,20,51,.25)` com `--ease-back` (.35 s). No celular (≤ 560 px) ocupa a largura.

### Botão etiqueta (`.btn-etiqueta`)
Igual à etiqueta "IDENTIDADE VISUAL" do topo: cantos 6 px, Inter 800 CAIXA ALTA (`.06em`, .82rem), altura 48 px,
manteiga com texto tinta e sombra dura rosa `3px 3px 0`; hover sobe na diagonal, clique afunda. Sem seta.
Usado só no "Ver todos os projetos" (pedido da Emilly em 01/10); as setas do carrossel seguem o mesmo estilo.
Os outros botões (topo, cabeçalho, contato) continuam pílula (`.btn`).

### Botão redondo (`.round-btn`)
56 px, manteiga, borda 2 px tinta, sombra dura 3 px; hover sobe na diagonal (sombra 5 px), clique afunda (1 px).

### Seta do carrossel (`.c3d__arrow`)
Etiqueta manteiga 67 × 38 px, cantos 6 px, sombra dura rosa (toque: 74 × 44), espaço 12 px entre as duas, 40 px da base.

### Chip "Disponível" (`.chip--live`)
Pílula translúcida (fundo marfim 14%, borda 35%), ponto verde `#7CF29C` de 8 px pulsando (2 s).

### Etiqueta (`.tag--pink`, `.tag--violeta`)
Texto 12,8 px 600, padding `.3em .7em .3em .45em`, raio 4, cursor de 18 px encostado fora do canto.

### Etiquetas do hero (`.hero__label`)
Inter 800 CAIXA ALTA `letter-spacing .06em`, padding `.35em .8em`, raio 6, sombra dura `3px 3px 0 var(--ink)`,
inclinadas (+8° / −7°); manteiga com texto tinta ou rosa com texto marfim. Arrastáveis.

### Cabeçalho (`.nav`)
Barra-pílula flutuante (14 px do topo), fundo marfim 82% com desfoque 14 px, borda tinta 10%, sombra suave.
Esquerda: selo 30 px + "Emilly Silva *design*". Direita: links + botão "Vamos conversar". Nunca some: depois de 80 px
de rolagem encolhe (como o da Apple) numa pílula de até 760 px, centralizada, 6 px mais alta, mais opaca (92%), com
selo 26 px, textos e botão menores; volta ao tamanho cheio no topo (transição .6 s). ≤ 860 px: vira botão violeta "Menu +" que abre menu em tela cheia violeta (círculo que cresce a
partir do botão, .7 s), links em Anton 17vw.

### Cartões de serviço (`.service`)
Cinco cartões do mesmo tamanho (grade): vinho (Identidade *visual*), violeta (Web & *UX/UI*), rosa (Social & *peças*),
manteiga (Foto*grafia*, ícone câmera vinho) e lavanda (Produtos *personalizados*, estrela ameixa); nos dois claros o
texto é tinta e as pílulas têm borda tinta 35%. Raio 32, padding clamp(22px, 2vw, 30px), ícone 56 px, título Anton +
palavra serif com altura mínima de 2 linhas (todos os títulos na mesma altura) e link "Quero … →" sempre embaixo.
Hover: o cartão sobe 6 px. ≤ 1180 px: 2 colunas (o último ocupa a linha toda); ≤ 600 px: 1 coluna.

### Cartões do processo (`.step`)
Borda 2 px tinta, raio 20, fundo marfim, sombra dura 6 px; número em círculo de 52 px (violeta, rosa, vinho,
manteiga); título serif itálico 2rem. Alinhados, todos da mesma altura (a escada foi tirada em 01/10). Hover: sobe na diagonal (sombra 10 px).

### CPF × CNPJ (`.cpfcnpj`)
Bloco violeta raio 20; duas abas em serif itálico 2rem ("cnpj *pra pagar as contas*" × "cpf *fora das telas*"),
aba ativa rosa, "×" em Anton manteiga; chips marfim com emoji. Abas acessíveis (setas do teclado).

### Lista de projetos (`.project-row`)
Alternativa ao carrossel ("Carrossel | Lista"). Linha: nome em Anton, categoria em serif manteiga, ano, seta
diagonal; borda inferior 2 px; hover abre padding e mostra miniatura que segue o mouse (320 px, 16:10).

### Carrossel 3D (`.c3d`) — igual ao da pixel.melbourne
- Os cards formam um **anel** (cilindro): cada item `rotateY(360/posições × i) translateZ(R)`,
  `R = largura / (2·tan(180°/posições)) + espaço`; a lista recua `translateZ(-R)` e a perspectiva é `R`.
- **O anel NÃO gira com a rolagem** (pedido da Emilly em 01/10: prender a rolagem atrapalhava). O carrossel ocupa uma
  tela (até 780 px de altura, mínimo 540 px). Arrastando para o lado (mouse, dedo ou touchpad) o anel acompanha (45% da largura =
  um projeto) e o próximo card cresce até a frente; ao soltar, encaixa no mais próximo (gesto rápido já passa para o
  vizinho; GSAP .9 s `expo.out`). Setas da tela e ← → também giram. Arrastar para cima/baixo continua rolando a página.
- **Sem fim:** depois do último projeto vem o primeiro (passando pelas vagas), nos dois sentidos; as setas nunca desativam.
- Só o card da frente e os dois vizinhos (esquerda e direita) recebem o mouse; o resto do anel, lá atrás e espelhado, é
  paisagem. O vizinho cresce 12% ao passar por cima ("ver este") e o clique traz ele para a frente; o da frente abre o case.
- Largura do card 50vw / espaço 30vw (≤ 991: 70vw / 40vw); proporção 60% (≤ 991: 120%, ≤ 479: 140%).
- **Mínimo 8 posições.** Posições sem projeto viram vagas "próximo projeto / vaga aberta" (fundo `#2F1535`,
  tracejado marfim 30%, espiral rosa). A partir do 9º projeto o anel cresce.
- Cada card tem frente e verso (o verso não fica espelhado), então o outro lado do anel aparece nos vãos.
- Painel: contador "01 / 06" em pílula escura, nome Anton marfim com sombra
  `0 2px 8px rgba(42,20,51,.55), 0 4px 30px rgba(42,20,51,.45)`, categoria serif em pílula escura com desfoque,
  botão rosa "ver case" (ou "em breve" em pílula escura).
- Só o painel do projeto ativo aparece (os outros somem com opacidade e ficam `inert`).
- **Adicionar projeto:** capa 1600 × 1000 (`python scripts/nova-capa.py <imagem> <slug>`) + um bloco em
  `src/data/projects.js`.

### Faixas (`.tapes`)
Duas fitas cruzadas que passam da tela, com o mesmo texto (os serviços, em Anton): vinho (−3°, marfim, separados
por brilho) sobre lavanda (+2,5°, tinta, separados por coração). ("Custom products" para produtos personalizados.) Rolam sem fim em sentidos opostos (45 e 36 px/s):
`src/js/modules/tapes.js` repete o texto até cobrir a faixa e duplica, para a emenda não aparecer.

### Cursor personalizado
Só com mouse (`hover: hover` e `pointer: fine`): seta violeta 26 px + etiqueta rosa contextual ("ver case",
"me arrasta", "oi!", "próximo") que surge com mola. No toque, cursor normal.

### Página de case (`projetos/<slug>.html`)
Uma por projeto, gerada sozinha a partir de `src/data/projects.js` (`scripts/gerar-cases.mjs`, estilos em
`src/styles/case.css`). Não tem texto inventado: só os dados do projeto e a apresentação do Behance.
- **Topo (ameixa):** pílula "← Todos os projetos" (volta para `#projetos`), eyebrow "(01/05) Categoria · ano",
  nome em Anton CAIXA ALTA `clamp(3.2rem, 10vw, 9rem)`, detalhe em serif itálico manteiga, capa 1600 × 1000 na
  moldura de seleção (até 1200 px).
- **Apresentação:** as fatias `slide-01.webp`, `slide-02.webp`… coladas (sem espaço) num bloco de até 1200 px,
  raio 20, sombra de card 3D. Embaixo, "Ver também no Behance" (botão fantasma), se houver link.
- **Próximo projeto (lavanda-2):** o bloco inteiro é link; nome em Anton com seta, categoria em serif violeta,
  miniatura com borda tinta, sombra dura e giro de 3° (no hover gira −2° e o nome fica violeta; só com mouse).
- **Contato e rodapé:** os mesmos da home (`partials/contact.html`, `partials/footer.html`).
- Projeto com `soon: true` não tem case e aparece como "em breve".

### Página "Todos os projetos" (`projetos/index.html`)
Gerada de `src/data/projects.js`. Fundo ameixa. Topo: pílula "← Início", eyebrow "Portfólio · N projetos", título
"Todos os *projetos*" e pílulas que FILTRAM por área ("Todos" + uma por área; a escolhida fica cheia; o filtro vai no
endereço, `?area=produtos`, e o botão voltar do navegador funciona). Uma seção por área (`areas`: Identidade *visual*, Web &
*UX/UI*, Social & *peças*, Foto*grafia*, Produtos *personalizados*), separadas por linha marfim 12%, com eyebrow
"(01) 3 projetos", título Anton + serif (clamp(2rem, 4.4vw, 3.6rem)) e grade de cards (mín. 300 px): capa 16:10, nome
em Anton, categoria em serif manteiga, ano; hover sobe 6 px e a capa cresce 5%. Projeto `soon` mostra "em breve";
área sem projeto mostra uma vaga tracejada com espiral rosa. Na home, botão "Ver todos os projetos" abaixo do
carrossel; no case, "← Todos os projetos" leva para cá.

### Galeria, vídeo e link do site nos cases
- `galeria: true` (fotografia): as imagens em grade 4:5 (mín. 260 px), cantos 10 px, em vez da apresentação empilhada.
- `galeria: 'posts'` (social media): os **Posts** 4:5 giram num **anel 3D igual ao carrossel da home**
  (`src/js/modules/ring.js`): arrastar, setas manteiga e teclado; contador "05 / 11" entre as setas. Com menos de 5
  posts, eles ficam em grade; de 5 a 7, eles se repetem em sequência para o anel não ficar com buraco. Embaixo, cada um na sua parte: **Carrosséis** (a imagem deitada com todos os cards, na
  largura toda; no celular fica com 420 px de altura e desliza para o lado) e **Stories** (9:16, grade de 4; 2 no
  celular). Com `carrosselNoAnel: true` (Dr. Pedro Caetano, que é quase só carrossel), cada card dos carrosséis gira no
  anel junto com os posts e só os stories ficam embaixo.
- Topo do case: nome e resumo à esquerda e **miniatura da capa** à direita (400 px, borda tinta, sombra dura, inclinada
  3°); no celular a miniatura fica pequena (96 px) no canto, ao lado de "← Todos os projetos". A capa grande saiu:
  repetia o 1º slide da apresentação.
- Fim do case: **convite discreto** (cartão marfim 5% com borda 18%): o selo da EMS (sem girar nem recolorir),
  "Curtiu este *projeto?*" e botão "Me chama" (WhatsApp com o nome do projeto na mensagem); embaixo, de novo o botão
  "← Todos os projetos".
- `instagram`: botão marfim com ícone do Instagram no fim do case ("Ver no Instagram"; `instagramTexto` muda o texto,
  ex.: "Ver mais fotos" nas fotografias esportivas, que levam ao @itsemsfotografia).
- `carrosseis` (social media): carrosséis de Instagram numa parte "Carrosséis" depois do anel: uma lâmina 4:5 por vez
  (até 440 px), nome em serif manteiga em cima, passa com o dedo/touchpad (encaixe), setas manteiga com sombra rosa por
  cima da lâmina e pontinhos embaixo (o ativo vira traço manteiga). Lâmina .mp4 é vídeo mudo em loop que só toca quando
  está na tela (`src/js/modules/ig.js`). `anelTitulo` troca o título pequeno do anel.
- `capaNoCase: false`: a capa fica só nos cards e no carrossel; o case abre direto no vídeo ou no mockup.
- `video`: vídeo vertical no topo do case (até 420 px, 9:16, raio 20), mudo, em loop, com controles; sempre em WebM
  (VP9) + MP4 (H.264, `faststart`) a 720 px, com `video-poster.webp`. Comprimir antes de subir (ffmpeg).
- `site`: botão "Ver o site no ar" no fim do case (projetos de web).
- `mockup`: foto do projeto aplicado (ex.: cardápio impresso na mesa), em destaque antes das páginas: até 600 px,
  raio 20, mesma sombra da apresentação. WebP de 1200 px de largura.

### Página 404 (`404.html`)
Hero violeta da home com "404" nas caixas do logo e o selo **reto**; título "ESSA PÁGINA / *sumiu*", uma linha de
texto e dois botões ("Ver projetos", "Ir pro início").

### Prévia de link e ícones
- `public/img/og.jpg` (1200 × 630): fundo violeta, logo EMS nas caixas + selo reto, frase da marca, assinatura.
  É a imagem que aparece ao mandar o link no WhatsApp/Instagram. Cada case usa `img/projetos/<slug>/og.jpg`
  (recorte da capa, gerado por `scripts/nova-capa.py`).
- Favicon: selo em SVG + `favicon-32.png`; ícone da tela inicial do celular: `apple-touch-icon.png` (selo sobre marfim).

---

## 8. Movimento

| Token | Valor | Uso |
|---|---|---|
| `--ease` | cubic-bezier(.22, 1, .36, 1) | reveals e transições |
| `--ease-back` | cubic-bezier(.34, 1.56, .64, 1) | botões, etiquetas, adesivos (mola) |
| Pixel "main" | cubic-bezier(.65, .01, .05, .99) ≈ GSAP `expo.inOut` | entrada do hero |
| rápido / base / lento | 250 / 350 / 700 ms | hover / botão / cartão |

**Abertura (toca ao abrir ou recarregar a home; pula ao voltar de outra página do site; clique pula):** selo entra girando (escala 0 → 1, `back.out(2)`, .8 s) →
contador 0 → 100% (2 s) → selo pisca → conteúdo sobe e some → três cortinas sobem em sequência (marfim, violeta,
vinho; `expo.inOut`, .9 s, intervalo .12 s).

**Hero:** letras do EMS sobem das caixas (intervalo .08 s) → selo carimba (escala 0, −40°) → as duas linhas entram
pelos lados (+20%, −15%, +12%, com opacidade) → etiquetas e adesivos pulam (escala 0 → 1, `back.out(3)`) → rodapé
do hero sobe. Depois: logo respira em loop; adesivos flutuam (±12 px, 2,2–3,1 s); brilhos piscam.

**Rolagem:** Lenis (lerp .1). Títulos de seção sobem 50 px com opacidade; blocos `[data-reveal]` sobem 60 px com
leve giro de 1,5° (intervalo .1 s); texto do manifesto acende palavra por palavra; estrelas com parallax.

**Interações:** adesivos arrastáveis (mouse e dedo) com volta elástica; botão "não clica aqui 😱" solta uma
chuva de cerejas, corações, brilhos e espirais; na 4ª vez vira o link "agora me chama no direct 💜", que abre o
Instagram @itsemsdesign.

**Movimento reduzido (`prefers-reduced-motion`):** sem abertura, sem Lenis, sem reveals, faixas paradas; tudo já
aparece no lugar.

---

## 9. Imagem

- **Capas de projeto:** 1600 × 1000 WebP (qualidade 80), assunto no centro (o card vira retrato no celular).
- **Slides de case:** 1600 px de largura, fatias de até 2000 px de altura, WebP 78.
- **Fotos da Emilly:** recorte com fundo transparente (WebP 85) ou foto real (livraria, leitura); nunca foto pessoal
  de terceiros.
- Texto alternativo em toda imagem de conteúdo; imagens decorativas com `alt=""`/`aria-hidden`.
- Fonte das imagens: Behance (behance.net/emysilva7) e a pasta EMI; regerar com `scripts/prepare-images.py`.

---

## 10. Estrutura da home (ordem e fundos)

1. **Abertura** (marfim + cortinas violeta/vinho)
2. **Hero** — violeta; logo EMS + selo; frase em 2 linhas corridas, serif itálico marfim com destaque manteiga:
   "Faço marca bonita *de perto* / e clara *de longe*."; etiquetas; CTA
3. **Faixas** cruzadas (vinho sobre lavanda); em volta, violeta em cima e ameixa embaixo
4. **Projetos** — ameixa; "(01) Trabalhos que têm *cara*"; carrossel 3D ou lista + botão "Ver todos os projetos"
5. **Como eu penso design** — lavanda-2; título igual aos outros ("Marca boa é a que as pessoas *reconhecem*", palavra em
   violeta) + parágrafo menor que acende no scroll
6. **Serviços** — ameixa; quatro cartões coloridos
7. **Processo** — marfim; 4 cartões alinhados
8. **Sobre** — ivory-2; foto em moldura de seleção + CPF × CNPJ
9. **Contato** — violeta; selo balançando + "VAMOS CRIAR *juntos?*" (mesmo tamanho dos outros títulos de seção) +
   "Me conta sobre a sua marca…" + "não clica aqui 😱". Sem botões: eles repetiam os do rodapé, logo abaixo (01/10).
10. **Rodapé** — tinta; os botões de contato: "Chamar no WhatsApp" (marfim, principal), @itsemsdesign, e-mail e Behance
    (vazados) + botão redondo manteiga "voltar ao topo" (seta pra cima, sombra dura rosa); embaixo, separado por uma
    linha fina, © + "atendo todo o Brasil". No celular os botões ficam um embaixo do outro, na largura toda. Aparece em
    todas as páginas, então o contato está sempre a um clique. O "ems" gigante saiu em 01/10.

Os botões "ver case" do carrossel e da lista abrem a página de case do projeto, na mesma aba.

---

## 11. Acessibilidade (obrigatório)

- Contraste pela tabela da seção 3; texto pequeno nunca sobre rosa ou lavanda.
- Foco visível: `outline: 3px solid var(--pink); outline-offset: 3px`.
- "Pular para o conteúdo" como primeiro link.
- Botões são `<button>`, links são `<a>`; setas e abas com `aria-*`; carrossel com conteúdo real nos painéis
  (os cards 3D são `aria-hidden`).
- Tudo funciona no toque; alvos de toque ≥ 44 px.
- `prefers-reduced-motion` respeitado (seção 8).

---

## 12. Faça / não faça

| Faça | Não faça |
|---|---|
| Use o selo original, reto (inclinado só no hero) | Redesenhar, recolorir ou deformar o selo |
| Um título = Anton CAIXA ALTA + uma palavra em serif itálico | Duas palavras em itálico no mesmo título |
| Rosa e manteiga como acento | Rosa em texto pequeno ou em fundo de parágrafo |
| Sombra dura tinta, estilo adesivo | Sombra preta desfocada |
| Retícula e grão sutis | Degradês chamativos |
| Copy curta e objetiva | Frases emotivas gigantes |
| Texto sobre o violeta em marfim ou manteiga | Texto lavanda sobre violeta |

---

## 13. Onde está cada coisa no código

| O quê | Arquivo |
|---|---|
| Tokens (cores, fontes, escalas) | `src/styles/tokens.css` |
| Base (grão, reset, utilitários de tipo) | `src/styles/base.css` |
| Componentes (botões, chips, etiquetas, moldura, cursor) | `src/styles/components.css` |
| Seções (hero, faixas, carrossel, serviços…) | `src/styles/sections.css` |
| Ícones e ilustrações (sprite) | `partials/icons.html` |
| Selo | `src/assets/illustrations/selo-ems.svg` |
| Projetos do carrossel/lista | `src/data/projects.js` |
| Páginas de case (layout) | `scripts/gerar-cases.mjs` + `src/styles/case.css` |
| Página 404 | `404.html` |
| Trechos repetidos (head, cabeçalho, contato, rodapé) | `partials/*.html` |
| Carrossel 3D | `src/js/modules/carousel.js` |
| Abertura, hero, reveals | `src/js/modules/loader.js`, `reveal.js` |
| Base de todas as páginas (rolagem, cabeçalho, menu, cursor) | `src/js/modules/site.js` (home: `main.js`; cases e 404: `page.js`) |
| Referência técnica da Pixel | `docs/referencia-pixel.md` |

## Pendências da marca
- ALMAH: entra no portfólio; o case espera o brand book da ALMAH (até lá, "em breve").
- Contraste do texto pequeno sobre rosa (seção 3).
