# Site da Emilly Silva (EMS) — instruções para o Claude

Este arquivo é lido sozinho quando o Claude abre esta pasta. Ele guarda o que foi decidido na construção do site,
para qualquer computador continuar de onde parou. **Responda sempre em português do Brasil, simples e direto.**

## Contato e dados confirmados pela Emilly (01/10/2026)
WhatsApp (31) 99271-8754 · e-mail contatoemillyss@gmail.com · Instagram @itsemsdesign · Behance emysilva7 ·
formada em Design Gráfico pela UNA (Belo Horizonte). Mora entre São Paulo e Belo Horizonte e atende o Brasil todo,
online: no site, nunca apresentar uma cidade só (afasta cliente de outro estado).

## Quem usa
- **Emilly Silva** (@itsemsdesign): designer gráfico e UX/UI, dona da marca EMS e do site. Não é programadora:
  explique o que mudou em palavras comuns, sem jargão, e mostre o resultado no navegador.
- **Cauã Dorn**: diretor de arte que construiu o site com o Claude. O repositório fica na conta dele no GitHub.

## O que é
Portfólio da Emilly para trazer clientes. Vite + HTML/CSS/JS puro + GSAP + Lenis, sem framework.
- **No ar:** https://cauadorn.github.io/ems-site/
- **Repositório:** https://github.com/Cauadorn/ems-site (público)
- **Estado e pendências:** `README.md` (ler antes de continuar um trabalho grande).

## Antes de mexer (sempre)
1. `git pull` — o site é editado em mais de um computador. Se houver conflito, pare e explique antes de resolver.
2. Ler `docs/design-system/DESIGN-SYSTEM.md` antes de criar ou mudar qualquer coisa visual. Valores exatos em
   `docs/design-system/tokens.json` e no código em `src/styles/tokens.css` (o código é a fonte da verdade).

## Rodar e ver
- Primeira vez na máquina: `npm install` (precisa de Node.js 20 ou mais novo e Git).
- Ver o site: servidor de preview `ems-site` (`.claude/launch.json`, porta 5178), ou `npm run dev`.
- **Exceção — computador do Cauã:** se esta pasta estiver em `D:\Caua\...` (espelhada no Google Drive), NÃO rodar
  `npm install` aqui. Lá o motor fica em `D:\Dev\ems-site` (node_modules + junção `site` para esta pasta) e o site
  roda com `cd D:\Dev\ems-site && npx vite`.
- Depois de mudar algo visual, conferir no navegador em computador e em celular (390 px) antes de dizer que ficou pronto.

## Publicar
Só quando ela (ou o Cauã) pedir: "publica", "sobe", "manda pro ar".
- **Pelo Claude na nuvem (claude.ai/code, app do celular):** lá o Claude só pode enviar para um ramo próprio
  (`claude/...`), e o site só publica o que entra na `main`. Depois do push, abrir um pull request para a `main` e
  pedir para a pessoa aprovar ("Merge") no GitHub; em cerca de 1 minuto o site atualiza.
- **No computador (Claude Code instalado):** os passos abaixo.
1. `git add` + `git commit` com mensagem curta em português dizendo o que mudou.
2. `git push` — em cerca de 1 minuto o GitHub gera e publica sozinho (`.github/workflows/deploy.yml`).
3. Conferir https://cauadorn.github.io/ems-site/ e avisar que está no ar.
- No primeiro `git push` de um computador novo o Git abre o navegador para entrar no GitHub (conta **Cauadorn**).
  O Claude não digita senha: peça para a pessoa entrar.
- Nunca `git push --force`. Nunca apagar o repositório nem mudar a visibilidade.

## Regras da marca que não podem falhar
- **Selo** (`src/assets/illustrations/selo-ems.svg`): é a arte ORIGINAL da Emilly. Nunca redesenhar, recolorir,
  deformar ou girar (só o hero inclina 12°). Um redesenho foi reprovado.
- **Cores, fontes, tamanhos, raios, sombras, curvas:** só os tokens. Cor nova = token novo em `tokens.css`,
  `tokens.json` e `DESIGN-SYSTEM.md`.
- **Títulos:** Anton em CAIXA ALTA + uma palavra em Instrument Serif itálico. Texto em Inter.
- **Rosa (#DD34A8):** só em texto grande ou decoração; nunca texto pequeno sobre rosa.
- **Texto do site:** primeira pessoa, curto e objetivo. Frase emotiva em tamanho gigante foi reprovada.
  Não inventar dado da Emilly (formação, clientes, números, contato): perguntar a ela.
- **Usável antes de conceitual:** o site existe para trazer clientes. Tem que funcionar bem no celular e a pessoa
  tem que achar os projetos e o contato em até 2 cliques.

## O que já foi aprovado ou pedido pelo Cauã (não desfazer sem perguntar)
- Hero no estilo pixel.melbourne: logo "EMS" em caixas, selo carimbado, etiquetas arrastáveis. A frase da marca
  ficou em 2 linhas corridas e menores, em itálico (pedido da Emilly em 01/10: a de 3 linhas era grande demais).
- Carrossel 3D igual ao da pixel.melbourne: anel circular girado pela rolagem, mínimo de 8 posições, vagas
  "próximo projeto" (`docs/referencia-pixel.md` e `src/js/modules/carousel.js`).
- Seção "Como eu penso design": texto menor e objetivo.
- Abertura (selo + contador + cortinas) só na 1ª visita da sessão.

## Onde mexer
| Quero mudar | Arquivo |
|---|---|
| Projetos do carrossel e da lista | `src/data/projects.js` (capa: `python scripts/nova-capa.py <imagem> <slug>`) |
| Páginas de case | geradas sozinhas de `projects.js` + `public/img/projetos/<slug>/slide-*.webp`; layout em `scripts/gerar-cases.mjs` e `src/styles/case.css`. Não editar `projetos/*.html` à mão |
| Textos | `index.html` (contato: `partials/contact.html`; 404: `404.html`) |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Botões, etiquetas, chips | `src/styles/components.css` |
| Layout das seções | `src/styles/sections.css` |
| Ícones e ilustrações | `partials/icons.html` |
| Cabeçalho e rodapé | `partials/header.html`, `partials/footer.html` |
| Animações | `src/js/modules/` |
| Imagens | `public/img/` (WebP; no JS usar `import.meta.env.BASE_URL`, no HTML `%BASE_URL%`) |

O site é publicado dentro de `/ems-site/`: nunca escrever caminho de imagem começando só com `/img/...` em JS ou
HTML; usar a base como na tabela acima, senão a imagem quebra no ar e funciona só no computador.

## Pendências (perguntar à Emilly)
- **Lembrar a Emilly no começo de cada conversa (ela pediu para ser cobrada):** o resumo curto de cada projeto.
  Quando ela mandar, vai no campo `resumo` do projeto em `src/data/projects.js` (aparece no topo do case).
- ALMAH entra no portfólio, mas o case espera o brand book da ALMAH (hoje: logo, rótulos, fotos das velas, um vídeo).
  Até lá fica "em breve" (`soon: true`).
- Página de brand book do site: o que entra?
- Domínio próprio (ex.: emsdesign.com.br) em vez de cauadorn.github.io/ems-site: se mudar, trocar `SITE_URL` em `vite.config.js`.
- Prancheta de revisão com os prints do site: https://claude.ai/artifact/W3FVwhEdbnUmFAh2U1niwW
