# Instalar o site num computador novo

Abra o Claude Code (app de desktop ou terminal) em qualquer pasta, cole o texto abaixo inteiro e envie.
O Claude instala o que faltar, baixa o site, abre no navegador e lê as regras do projeto sozinho.

---

```
Instale e abra o site da Emilly Silva (EMS) neste computador, do começo ao fim, sem me fazer perguntas. Decida sozinho tudo o que der para decidir. Só pare quando precisar de algo que só eu posso fazer (senha de administrador do computador ou entrar no GitHub pelo navegador) e, nesse caso, me diga exatamente onde clicar. Fale comigo em português do Brasil, simples, sem termos técnicos.

1. Programas: veja se este computador tem Git, Node.js 20 ou mais novo (com npm) e Python 3. Instale o que faltar pelo jeito oficial do sistema: no Windows, com winget (Git.Git, OpenJS.NodeJS.LTS, Python.Python.3.12); no Mac, com Homebrew (instale o Homebrew antes, se não tiver). Depois de instalar, recarregue o PATH desta sessão e confirme as versões.

2. Pasta: procure se o repositório https://github.com/Cauadorn/ems-site já está baixado neste computador (uma pasta ems-site com .git dentro da pasta do usuário, em Dev, Documentos ou Área de Trabalho). Se achar, use essa. Se não achar, crie a pasta Dev dentro da pasta do usuário e clone o repositório lá. Nunca use uma pasta sincronizada (Google Drive, OneDrive, iCloud, Dropbox): a pasta node_modules trava a sincronização.

3. Git: se o Git não tiver nome e e-mail configurados, configure só para este repositório, com o nome "Emilly Silva" e o e-mail que está no CLAUDE.md.

4. Atualizar: rode git pull. Se existir um arquivo ems-site-mudancas.patch na pasta Downloads, aplique com git am (é o trabalho feito no Claude da nuvem que ainda não foi publicado). Se ele já tiver sido aplicado, pule. Se der conflito, pare e me explique.

5. Instalar o site: rode npm install e instale a biblioteca Pillow do Python (usada pelos scripts de imagem).

6. Regras: leia o CLAUDE.md e o README.md do repositório e siga tudo o que eles mandam, agora e nas próximas conversas.

7. Abrir: inicie o servidor de preview "ems-site" (.claude/launch.json, porta 5178; ou npm run dev) e abra o site no navegador. Confira a página inicial, uma página de case e a versão de celular (390 px).

8. No fim, me diga em poucas linhas: onde o site ficou instalado, o que eu escrevo da próxima vez para abrir o site, e as pendências do CLAUDE.md que dependem de mim.

Não publique, não envie nada para o GitHub, não apague nada e nunca use --force. Só publique quando eu pedir ("publica", "sobe", "manda pro ar").
```

---

Para publicar a partir desse computador, o Git pede para entrar no GitHub pelo navegador na primeira vez
(conta **Cauadorn**, ou a conta da Emilly se o Cauã a adicionar como colaboradora do repositório).
