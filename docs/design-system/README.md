# Pacote do design system EMS

Tudo o que outra pessoa ou outra IA precisa para criar qualquer coisa na marca do site da Emilly Silva.

| Arquivo | Para quem | O que é |
|---|---|---|
| `DESIGN-SYSTEM.md` | IA e pessoas | **As regras**, em texto: marca, voz, selo, cores, contraste, tipografia, espaço, texturas, componentes, carrossel 3D, movimento, imagem, acessibilidade, faça/não faça, mapa do código |
| `tokens.json` | IA e código | Os valores exatos em formato W3C Design Tokens (cores, fontes, escalas, raios, sombras, curvas, pontos de quebra, parâmetros do carrossel) |
| `assets/selo-ems.svg` | todos | Selo original da Emilly. **Nunca redesenhar** |
| `assets/icones/*.svg` · `assets/icons-sprite.svg` | todos | 15 ícones e ilustrações, soltos e em sprite |
| `EMS-Design-System.pdf` | pessoas | A versão visual, 16 páginas A4, para aprovar e apresentar |
| `pdf/` | quem mantém | Fonte do PDF (`design-system.html`), prints (`img/`) e scripts |

**Fonte da verdade:** o código do site (`src/styles/tokens.css`, `components.css`, `sections.css`). Mudou lá,
atualize `DESIGN-SYSTEM.md` e `tokens.json` e gere o PDF de novo.

---

## Como levar para outro computador ou outro Claude

O PDF é para gente. **Para uma IA, o que vale é o `DESIGN-SYSTEM.md` + `tokens.json` + `assets/`:** texto e números
exatos, sem ela precisar interpretar imagem. Mande sempre os três juntos (o PDF pode ir junto, é opcional).

### Opção 1 — pelo GitHub (a melhor)
O pacote está dentro do repositório do site, em `docs/design-system/`. No outro computador:
1. Baixe o repositório (`git clone …` ou "Download ZIP" no GitHub).
2. Abra o Claude Code na pasta do site e cole o texto pronto abaixo.

### Opção 2 — sem GitHub
1. Envie o `EMS-design-system.zip` (Drive, WhatsApp, e-mail). Ele fica em `Clientes\EMI\` e tem esta pasta inteira.
2. No outro PC, descompacte e abra o Claude Code na pasta, ou:
3. No **claude.ai**, crie um Projeto e anexe `DESIGN-SYSTEM.md`, `tokens.json` e `selo-ems.svg` no conhecimento do
   projeto. Toda conversa daquele projeto já nasce sabendo a marca.

### Texto pronto para colar no outro Claude
```
Você vai trabalhar na marca EMS (Emilly Silva, @itsemsdesign). Antes de criar qualquer coisa, leia
docs/design-system/DESIGN-SYSTEM.md inteiro e docs/design-system/tokens.json, e use só os arquivos de
docs/design-system/assets/. Regras que não podem falhar:
- O selo (assets/selo-ems.svg) é a arte original: nunca redesenhar, recolorir, deformar ou girar (só o hero inclina 12°).
- Cores, fontes, tamanhos, raios, sombras e curvas: só os valores do tokens.json.
- Títulos: Anton em CAIXA ALTA + uma palavra em Instrument Serif itálico; texto em Inter.
- Rosa (#DD34A8) só em texto grande ou decoração; nunca texto pequeno sobre rosa.
- Copy curta, primeira pessoa, objetiva (nada de frase emotiva gigante).
Se algo não estiver no design system, pergunte antes de inventar.
```

---

## Refazer o PDF
Na raiz do site, com o site rodando para os prints (`npx vite`, porta 5178):
```
python docs/design-system/pdf/capturar.py      # prints novos das seções (opcional)
python docs/design-system/pdf/gerar_pdf.py     # gera EMS-Design-System.pdf (--previa salva PNG de cada página)
```
Precisa de Python com Playwright e das fontes do `@fontsource` num `node_modules` (o script procura na raiz do site
e em `D:\Dev\ems-site\node_modules`). Ele avisa se alguma página passar do rodapé.
