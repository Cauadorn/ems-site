# Site da Emilly Silva (EMS) — instruções para o Claude

Este arquivo é lido sozinho quando o Claude abre esta pasta. Ele guarda o que foi decidido na construção do site,
para qualquer computador continuar de onde parou. **Responda sempre em português do Brasil, simples e direto.**

## Contato e dados confirmados pela Emilly (01/10/2026)
WhatsApp (31) 99271-8754 · e-mail contatoemillyss@gmail.com · Instagram @itsemsdesign · Instagram de fotografia
esportiva @itsemsfotografia (ela autorizou usar as fotos e divulgar) · Behance emysilva7 ·
formada em Design Gráfico pela UNA (Belo Horizonte). Mora entre São Paulo e Belo Horizonte e atende o Brasil todo,
online: no site, nunca apresentar uma cidade só (afasta cliente de outro estado).

## Quem usa
- **Emilly Silva** (@itsemsdesign): designer gráfico e UX/UI, dona da marca EMS e do site. Não é programadora:
  explique o que mudou em palavras comuns, sem jargão, e mostre o resultado no navegador.
- **Cauã Dorn**: diretor de arte que construiu o site com o Claude. O repositório fica na conta dele no GitHub.

## O que é
Portfólio da Emilly para trazer clientes. Vite + HTML/CSS/JS puro + GSAP + Lenis, sem framework.
- **No ar:** https://emsdesign.com.br/ (domínio próprio desde 02/10/2026, DNS na Hostinger; o endereço antigo
  cauadorn.github.io/ems-site leva para ele)
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
3. Conferir https://emsdesign.com.br/ e avisar que está no ar.
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
- Carrossel 3D igual ao da pixel.melbourne: anel circular, mínimo de 8 posições, vagas "próximo projeto"
  (`docs/referencia-pixel.md` e `src/js/modules/carousel.js`). Em 01/10 a Emilly pediu para o anel NÃO girar com a
  rolagem (prendia a página): ele ocupa uma tela e gira pelas setas, arrastando para o lado ou pelas setas do teclado.
- Seção "Como eu penso design": texto menor e objetivo.
- Abertura (selo + contador 0 → 100 + cortinas): toca sempre que a home é aberta ou recarregada e pula quando a pessoa
  volta de outra página do site (pedido da Emilly em 01/10; antes era só na 1ª visita da sessão e o "0%" piscava).

## Onde mexer
| Quero mudar | Arquivo |
|---|---|
| Projetos do carrossel e da lista | `src/data/projects.js` (capa: `python scripts/nova-capa.py <imagem> <slug>`) |
| Página "Todos os projetos" (por área) | gerada sozinha em `projetos/index.html` a partir de `projects.js` (`area`, `destaque` e a lista `areas`); layout em `scripts/gerar-cases.mjs` e `src/styles/case.css` |
| Páginas de case | geradas sozinhas de `projects.js` + `public/img/projetos/<slug>/slide-*.webp`; layout em `scripts/gerar-cases.mjs` e `src/styles/case.css`. Não editar `projetos/*.html` à mão |
| Textos | `index.html` (contato: `partials/contact.html`; 404: `404.html`) |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Botões, etiquetas, chips | `src/styles/components.css` |
| Layout das seções | `src/styles/sections.css` |
| Ícones e ilustrações | `partials/icons.html` |
| Cabeçalho e rodapé | `partials/header.html`, `partials/footer.html` |
| Animações | `src/js/modules/` |
| Imagens | `public/img/` (WebP; no JS usar `import.meta.env.BASE_URL`, no HTML `%BASE_URL%`) |

Mesmo com o site na raiz do domínio, continue usando a base da tabela acima (`%BASE_URL%` no HTML,
`import.meta.env.BASE_URL` no JS) e nunca um caminho fixo `/img/...`: se o site voltar a morar numa subpasta, nada quebra.

## Pendências (perguntar à Emilly)
- Resumos dos projetos: em 01/10 a Emilly pediu para o Claude escrever do jeito que ela escreveria (a partir das
  apresentações) e disse que avisa se discordar de algo. Estão no campo `resumo` em `src/data/projects.js`; projeto
  novo também ganha resumo, sem inventar cliente, número ou resultado.
- Vídeo da ALMAH (está no @itsemsdesign): entra no projeto ALMAH (velas) quando der para baixar. A rede do ambiente
  da nuvem foi liberada (Full) em 01/10; o Instagram às vezes pede para esperar alguns minutos.
- Mais projetos para "Todos os projetos": a Emilly vai mandar o resto do portfólio, separado por área (identidade,
  web, social, fotografia, produtos). Fotografia ainda não tem nenhum projeto (aparece "em breve").
- ALMAH: o case de identidade é provisório (rótulos, cartões e fotos, montados em pranchas em 01/10); trocar pelo brand
  book quando ela terminar. Arquivos originais no Drive dela, pasta "coleçao genisi".
- Página de brand book do site: o que entra?
- Prancheta de revisão com os prints do site: https://claude.ai/artifact/W3FVwhEdbnUmFAh2U1niwW
