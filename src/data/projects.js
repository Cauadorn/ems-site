// Portfólio: para incluir, tirar ou reordenar projetos, edite só esta lista.
// Cada projeto ganha sozinho uma página de case em projetos/<slug>.html (scripts/gerar-cases.mjs), com:
//   capa  public/img/projetos/<slug>/capa.webp (1600x1000) e og.jpg: python scripts/nova-capa.py <imagem> <slug>
//   apresentação  public/img/projetos/<slug>/slide-01.webp, slide-02.webp… (fatias de 1600 px de largura, na ordem)
// behance: link do projeto no Behance (aparece no fim do case) ou null
// video: (opcional) video.mp4 + video.webm (mesmo nome) e video-poster.webp em public/img/projetos/<slug>/, no topo do case
// mockup: (opcional) foto do projeto aplicado (ex.: mockup.webp em public/img/projetos/<slug>/), em destaque antes das páginas
// site: (opcional) endereço do site no ar, para projetos de web (botão "Ver o site no ar" no case)
// instagram: (opcional) Instagram do cliente, para projetos de social media (botão "Ver no Instagram" no case);
//   instagramTexto muda o texto do botão (ex.: "Ver mais fotos" nas fotografias esportivas)
// carrosselNoAnel: true = nos posts (galeria 'posts'), cada card dos carrosséis gira no anel 3D junto com os posts,
//   em vez de os carrosséis ficarem numa parte separada embaixo
// anelTitulo: (opcional) título pequeno em cima do anel, no lugar de "Posts" / "Posts e carrosséis"
// carrosseis: (opcional) [{ titulo, laminas: ['a.webp', 'b.mp4', …] }]: carrosséis que passam para o lado, como no
//   Instagram, numa parte "Carrosséis" depois do anel; lâmina .mp4 vira vídeo (com .webm e -poster.webp do mesmo nome)
// capaNoCase: false = a capa aparece só nos cards e no carrossel; o case começa direto pelo vídeo ou mockup
// soon: true = aparece no carrossel como "em breve" e ainda não tem página de case
// resumo: (opcional) parágrafo curto sobre o projeto, em primeira pessoa, no topo do case. Os de 01/10/2026 foram
//   escritos pelo Claude a pedido da Emilly, a partir das apresentações; ela revisa e pede para mudar o que quiser
// galeria: true = as imagens aparecem em grade (bom para fotos verticais), em vez de empilhadas;
//   'paginas' = páginas inteiras, sem corte, em duas colunas (cardápios, revistas);
//   'posts' = posts de rede social, separados sozinhos pelo formato da imagem em Feed (4:5), Carrosséis (imagem
//   deitada com todos os cards) e Stories (9:16), na ordem dos arquivos
// capitulos: (opcional) case especial em capítulos, no lugar da galeria: [{ rotulo, titulo (com <em> na palavra em
//   serif), texto, midias: [{ a: 'arquivo.webp' ou 'loop.mp4', l: 'cheia' | 'meia' | 'larga' | 'estreita', alt }],
//   botao: { href, texto } }]; .mp4 = loop mudo (com .webm e -poster.webp do mesmo nome) que só toca na tela
// colaboracao: (opcional) projeto feito em parceria: { nome, cargo, arroba, foto, fotoAlt, texto, site, case, botao, link }.
//   Aparece "Em colaboração com <nome>" no topo (link para o site) e, no fim do case, um cartão com a foto na moldura de
//   seleção, o texto e os botões para o case no site da pessoa (`case`) e para o site dela (`site`)
// entregas: (opcional) etiquetas do que foi entregue, embaixo do resumo (ex.: Monograma, Estampa, Kit da festa)
// grupos: (opcional, galeria 'paginas') [{ titulo, imagens }]: divide as imagens, na ordem, em partes com um título
//   pequeno em cima (ex.: as duas opções de fundo de um material)
// area: em qual seção da página "Todos os projetos" (projetos/index.html) ele aparece: um id de `areas` abaixo
// destaque: true = também aparece no carrossel da home ("Trabalhos que têm cara"); false = só em "Todos os projetos"

// Seções da página "Todos os projetos", na ordem. Área sem projeto mostra uma vaga "em breve".
// link: (opcional) card extra no fim da seção, levando para fora do site (ex.: Instagram)
export const areas = [
  { id: 'identidade', titulo: 'Identidade <em>visual</em>' },
  { id: 'web', titulo: 'Web &amp; <em>UX/UI</em>' },
  { id: 'social', titulo: 'Social &amp; <em>peças</em>' },
  // o Instagram de fotografia esportiva (@itsemsfotografia) fica no botão "Ver mais fotos" de cada case de foto
  { id: 'fotografia', titulo: 'Foto<em>grafia</em>' },
  { id: 'produtos', titulo: 'Produtos <em>personalizados</em>' },
];

export const projects = [
  {
    slug: 'formatura-babi',
    area: 'identidade',
    destaque: true, // primeiro do carrossel: case especial, em capítulos (pedido da Emilly em 16/10)
    title: 'Formatura Babi',
    category: 'Identidade visual',
    detail: 'Brasão, monograma e kit de formatura em bordô e ouro',
    year: '2026',
    color: '#5A1626',
    resumo: 'Identidade visual para a formatura de Bioquímica da Babi. O conceito é "a ciência que floresce": um brasão Art Nouveau em traço de gravura, em que o DNA vira ramo, as moléculas viram frutinhas e a borboleta fecha um ciclo. Monograma BS, paleta bordô e ouro, cinco ilustrações, estampa e o kit da festa. Apresentei a proposta num site, e não num PDF, para a Babi viver a marca antes de aprovar.',
    entregas: ['Monograma', 'Brasão', 'Paleta', 'Tipografia', '5 ilustrações', 'Estampa', 'Kit da festa', 'Site da proposta'],
    behance: 'https://www.behance.net/gallery/257181347/Formatura-Babi-Identidade-Visual',
    // feito em dupla com o Cauã: cartão com a foto dele no fim do case (o site dele tem o mesmo cartão com a Emilly)
    colaboracao: {
      nome: 'Cauã Dorn',
      cargo: 'Designer, audiovisual e diretor criativo',
      arroba: '@ohdorn',
      foto: 'caua-dorn.webp',
      fotoAlt: 'Cauã Dorn sentado numa poltrona de couro',
      texto: 'Este projeto não tem divisão de tarefas para contar: o Cauã e eu fizemos tudo juntos, do primeiro rabisco do brasão ao gabarito que foi para o fornecedor. Conceito, ilustração, kit e apresentação passaram pelas duas mãos, e o case está publicado nos dois portfólios.',
      site: 'https://cauadorn.com.br/',
      case: 'https://cauadorn.com.br/trabalhos/formatura-babi',
      botao: 'Ver o case no site do Cauã',
      link: 'Site do Cauã',
    },
    video: 'video.mp4', // o filme da proposta (56 s, sem som), deitado, no topo do case
    // textos a partir dos slides da apresentação da própria Emilly
    capitulos: [
      {
        rotulo: 'O conceito',
        titulo: 'A ciência <em>que floresce</em>',
        texto: 'Cada detalhe do brasão guarda um pedaço da história dela: a ciência, o laboratório, a formatura e o caminho. O DNA vira ramo, as moléculas viram frutinhas e a borboleta fecha o ciclo.',
        midias: [{ a: 'brasao.mp4', alt: 'o brasão montado peça por peça' }],
      },
      {
        rotulo: 'O monograma',
        titulo: 'Como nasceu <em>a assinatura</em>',
        texto: 'Duas partes que, juntas, contam quem ela é: o monograma desenhado à pena e o medalhão Art Nouveau. O S nasce da curva do B e termina num raminho com moléculas, e a haste do B é o módulo que mede todo o desenho.',
        midias: [
          { a: 'assinatura.mp4', l: 'meia', alt: 'o monograma e o medalhão se juntando' },
          { a: 'construcao.mp4', l: 'meia', alt: 'construção do BS no grid' },
          { a: 'versoes.webp', alt: 'as versões: bordô sobre creme, creme sobre vinho e uma cor só' },
          { a: 'cartao.webp', l: 'meia', alt: 'cartão com o brasão na mão' },
          { a: 'lacre.webp', l: 'meia', alt: 'lacre de cera com o monograma' },
        ],
      },
      {
        rotulo: 'Cores e tipografia',
        titulo: 'Bordô <em>e ouro</em>',
        texto: 'O bordô manda. A prata aparece nas peças, o creme dá respiro e o ouro, a cor favorita dela, entra só nos pontos de luz. Na tipografia, uma serifa clássica para o nome e os títulos e uma letra simples e moderna para o resto.',
        midias: [
          { a: 'cores.webp', l: 'meia', alt: 'paleta: vinho escuro, bordô, rosé, ouro, prata e creme' },
          { a: 'tipografia.webp', l: 'meia', alt: 'tipografia: Cormorant Garamond e Instrument Sans' },
        ],
      },
      {
        rotulo: 'Estampa e ilustrações',
        titulo: 'O desenho <em>que se repete</em>',
        texto: 'Ramos Art Nouveau em traço fino de gravura, com os símbolos dela no meio: a orquídea da tatuagem, o erlenmeyer do laboratório, o DNA, o globo espelhado da festa e os livros dos anos de estudo. A estampa emenda sem aparecer e vai no chinelo, no copo e no marca-página.',
        midias: [
          { a: 'estampa.mp4', alt: 'a estampa contínua' },
          { a: 'ilustracoes.mp4', alt: 'as cinco ilustrações: orquídea, erlenmeyer, DNA, globo espelhado e livros' },
          { a: 'adesivos.webp', alt: 'as ilustrações em adesivos' },
        ],
      },
      {
        rotulo: 'O kit da festa',
        titulo: 'A marca <em>na festa</em>',
        texto: 'Caixa com lacre dourado, porta-copos, fita, sacola, chinelo, kit ressaca, copos, marca-página e necessaire: sempre o mesmo desenho, em bordô, creme, prata e ouro.',
        midias: [
          { a: 'caixa.webp', alt: 'caixa de veludo com o brasão em relevo e lacre dourado' },
          { a: 'porta-copos.webp', l: 'meia', alt: 'porta-copos com as ilustrações' },
          { a: 'fita.webp', l: 'meia', alt: 'fita de cetim com o nome' },
          { a: 'sacola-chinelo.webp', alt: 'sacola, chinelo, copo e marca-página' },
          { a: 'kit-ressaca.webp', alt: 'kit ressaca e chinelo' },
          { a: 'copo-marcapagina.webp', alt: 'copos de festa e marca-página' },
          { a: 'necessaire.webp', alt: 'necessaires clara e escura' },
          { a: 'envelope.webp', alt: 'envelope com lacre de cera' },
        ],
      },
      {
        rotulo: 'A apresentação',
        titulo: 'A proposta <em>num site</em>',
        texto: 'Em vez de um PDF, a Babi recebeu um site: a marca inteira se apresenta numa página só, e o brasão é feito de partículas que viram pó de ouro quando o mouse passa.',
        midias: [
          { a: 'site-computador.webp', l: 'larga', alt: 'o site da proposta no computador' },
          { a: 'site-celular.webp', l: 'estreita', alt: 'o site da proposta no celular' },
        ],
        botao: { href: 'https://babi-formatura.vercel.app/', texto: 'Abrir o site da proposta' },
      },
    ],
  },
  {
    slug: 'maria-valentina',
    area: 'identidade',
    destaque: true,
    title: 'Maria Valentina',
    category: 'Branding',
    detail: 'Identidade visual para psicóloga',
    year: '2026',
    color: '#455A75',
    resumo: 'Marca para uma psicóloga que precisava passar autoridade clínica sem perder o acolhimento. Fugi da estética fria de consultório: monograma MV, o nome em letra cursiva e uma paleta terrosa de azul, marrom e areia. Levei a identidade para placa, cartão de visitas, papelaria e um motion do logo.',
    behance: 'https://www.behance.net/gallery/243857007/Psicologa-Maria-Valentina-Branding-Design',
    video: 'video.mp4', // motion do logo (5 s, sem som), horizontal
    capaNoCase: false, // o case abre direto no motion (pedido da Emilly)
  },
  {
    slug: 'idex',
    area: 'identidade',
    destaque: true, // no carrossel no lugar do Setembro Amarelo (pedido da Emilly em 01/10)
    title: 'IDex',
    category: 'Branding',
    detail: 'Identidade visual para plataforma de crédito',
    year: '2026',
    color: '#6225D8',
    resumo: 'Identidade para uma plataforma de crédito que usa tecnologia e dados. O símbolo junta duas formas angulares dentro de um losango, que lembram um chip, e o encaixe delas sugere movimento. Montei o manual com grid de construção, o roxo como cor principal, Futura e Inter e as regras de uso.',
    behance: null,
  },
  {
    slug: 'i3cred',
    area: 'identidade',
    destaque: false,
    title: 'I3Cred',
    category: 'Branding',
    detail: 'Identidade visual para empresa de crédito',
    year: '2025',
    color: '#FFD701',
    resumo: 'Montei o guia básico de identidade visual da I3Cred: o símbolo que junta o "i" e o "3", as versões do logo, o amarelo e o preto da marca e a Gotham como fonte. Depois levei a marca para cartão de visitas, caderno, tablet, caneca, ecobag, livro e outdoor.',
    behance: null,
  },
  {
    slug: 'idex-site',
    area: 'web',
    destaque: false,
    title: 'IDex Brasil',
    category: 'Web design',
    detail: 'Site institucional para fintech de crédito',
    year: '2026',
    color: '#6225D8',
    resumo: 'Criei o site institucional da IDex Brasil, fintech especializada em crédito CLT. A identidade vai para a web com fundo escuro, o roxo da marca e seções curtas: o que a empresa faz, os quatro fundamentos dela e o crédito CLT.',
    behance: null,
    site: 'https://www.idexbrasil.com.br/',
  },
  {
    slug: 'i3cred-site',
    area: 'web',
    destaque: false,
    title: 'I3Cred',
    category: 'Web design',
    detail: 'Site institucional para empresa de crédito',
    year: '2025',
    color: '#FFD701',
    resumo: 'Criei o site da I3Cred, que ajuda a pessoa a escolher o crédito certo com atendimento humano. Organizei a página para ela entender as opções antes de falar com alguém: soluções por tipo de crédito, como funciona em 4 passos, bancos parceiros, depoimentos e dúvidas frequentes, com o amarelo e o preto da marca e o WhatsApp sempre à mão.',
    behance: null,
    site: 'https://i3cred.com.br/',
  },
  {
    slug: 'ems-social',
    area: 'social',
    destaque: false,
    galeria: 'posts', // slide-01: "Ocupada sendo criativa" (5 lâminas) gira no anel
    carrosselNoAnel: true,
    anelTitulo: 'Ocupada sendo criativa',
    // carrosséis que passam para o lado, como no Instagram (o 1º card do CPF x CNPJ é vídeo: .mp4 + .webm + -poster.webp)
    carrosseis: [
      { titulo: 'CPF x CNPJ', laminas: ['carrossel-1-01.mp4', 'carrossel-1-02.webp', 'carrossel-1-03.webp'] },
      { titulo: 'Minimalismo virou desculpa', laminas: ['carrossel-2-01.webp', 'carrossel-2-02.webp', 'carrossel-2-03.webp', 'carrossel-2-04.webp', 'carrossel-2-05.webp'] },
    ],
    title: 'EMS',
    category: 'Social media',
    detail: 'O meu Instagram de designer · @itsemsdesign',
    year: '2026',
    color: '#6225D8',
    resumo: 'Meu Instagram é onde eu falo de design do meu jeito: com humor, opinião e um pouco de quem eu sou fora das telas. É ali que eu converso com quem quer uma marca com personalidade.',
    behance: null,
    instagram: 'https://www.instagram.com/itsemsdesign/',
  },
  {
    slug: 'idex-social',
    area: 'social',
    destaque: false,
    galeria: 'posts', // 11 posts 4:5 + 2 carrosséis deitados (slide-05 e slide-10), na ordem dos arquivos
    title: 'IDex Brasil',
    category: 'Social media',
    detail: 'Posts e carrosséis para o Instagram · crédito CLT',
    year: '2026',
    color: '#6225D8',
    resumo: 'Posts e carrosséis para o Instagram da IDex Brasil. A ideia era explicar o crédito CLT de um jeito simples (quem pode contratar, como funciona a jornada, por que a operação é diferente) com a mesma linguagem da marca: fundo escuro, roxo, o símbolo em 3D e títulos curtos.',
    behance: null,
    instagram: 'https://www.instagram.com/idex.brasil/',
  },
  {
    slug: 'i3cred-social',
    area: 'social',
    destaque: false,
    galeria: 'posts', // 5 posts no anel e 4 carrosséis inteiros (2 e 3 lâminas); o "Organize suas contas" saiu (qualidade baixa)
    title: 'I3Cred',
    category: 'Social media',
    detail: 'Posts e carrosséis para o Instagram · Crédito CLT',
    year: '2025',
    color: '#FFD701',
    resumo: 'A I3Cred é uma empresa de crédito consignado, e o desafio era falar com o trabalhador de carteira assinada, o público classe C, de um jeito próximo e sem juridiquês. Coloquei no centro quem trabalha todo dia (frentista, vigilante, cozinheiro, operário), falei das contas do fim do mês e dos planos que estão esperando, e usei o amarelo e o preto da marca para deixar o Crédito CLT simples de entender e de pedir pelo WhatsApp.',
    behance: null,
    instagram: 'https://www.instagram.com/i3cred.oficial/',
  },
  {
    slug: 'dr-pedro-caetano',
    area: 'social',
    destaque: false,
    galeria: 'posts', // 3 posts de feed, 7 carrosséis e 4 stories (slide-01 a 03, 04 a 10, 11 a 14)
    carrosselNoAnel: true, // é quase só carrossel: os cards entram no anel 3D junto com os posts (pedido da Emilly)
    title: 'Dr. Pedro Caetano',
    category: 'Social media',
    detail: 'Posts, carrosséis e stories para cardiologista',
    year: '2026',
    color: '#8E1F24',
    resumo: 'Conteúdo para o Instagram do Dr. Pedro Caetano, cardiologista: posts, carrosséis e stories sobre prevenção, treino e saúde do coração, e também as datas do ano, como Dia das Mães, Dia dos Pais e Outubro Rosa. Tudo no vinho e no vermelho da marca, com fotos fortes e um convite claro para agendar a avaliação.',
    behance: null,
    instagram: 'https://www.instagram.com/drpedrocaetano/',
  },
  {
    slug: 'credfranco',
    area: 'social',
    destaque: true, // no carrossel do início (pedido da Emilly em 02/10)
    galeria: 'posts', // 21 posts, 10 carrosséis inteiros e 30 stories (artes da pasta "EMIS 4D", sem os cortes dos carrosséis)
    title: 'Credfranco',
    category: 'Social media',
    detail: 'Posts, carrosséis e stories para promotora de crédito',
    year: '2026',
    color: '#C8102E',
    resumo: 'Conteúdo para o Instagram da Credfranco, promotora de crédito que fala com parceiros de todo o Brasil. Os posts, carrosséis e stories apresentam os produtos (Home Equity, Car Equity, VEX, Full Consig, crédito CLT, convênios) e falam de carteira, atendimento e pós-venda, além de datas como Setembro Amarelo e Outubro Rosa. Tudo no vermelho e azul da marca, com fundo claro e elementos em 3D.',
    behance: null,
  },
  {
    slug: 'topo-do-mundo',
    area: 'social',
    destaque: true, // no carrossel do início (pedido da Emilly em 02/10)
    galeria: 'posts', // 2 posts (feed e tráfego pago) e 15 stories, em sequências de 3
    title: 'Topo do Mundo',
    category: 'Social media',
    detail: 'Campanha de inverno para restaurante',
    year: '2026',
    color: '#2A1A10',
    resumo: 'Stories e posts da campanha de inverno do Topo do Mundo: a sequência de fondue com 40% de desconto, o Merlot da casa em edição especial e o convite para reservar. Usei o pôr do sol e a vista da cidade para vender a experiência, com títulos em serifa e chamadas curtas para reservar pelo WhatsApp.',
    behance: null,
  },
  {
    slug: 'banco-inter',
    area: 'web',
    destaque: true,
    title: 'Banco Inter',
    category: 'UI/UX',
    detail: 'Redesign conceitual do app',
    year: '2026',
    color: '#FF7A00',
    resumo: 'Estudo conceitual de UX/UI da tela inicial do app do Banco Inter. A home tinha hierarquia confusa, botões pequenos e conteúdo competindo com o saldo. Reorganizei em volta do que a pessoa abre o app para fazer: saldo, Pix e pagamentos no topo, o cartão em destaque e compras e investimentos agrupados na aba Explore.',
    behance: 'https://www.behance.net/gallery/243488573/Redesign-App-Banco-Inter-UIUX-Case-Study',
  },
  {
    slug: 'setembro-amarelo',
    area: 'social',
    destaque: false, // saiu do carrossel (pedido da Emilly em 01/10); continua em "Todos os projetos"
    title: 'Setembro Amarelo',
    category: 'Campanha',
    detail: 'Endomarketing · Branding & UI',
    year: '2025',
    color: '#F2C200',
    resumo: 'Campanha interna de Setembro Amarelo para uma empresa de cibersegurança. O desafio era falar de saúde mental com acolhimento sem sair da identidade escura e tecnológica da empresa. Criei o conceito "Cuidado que se compartilha", cartões De/Para, tags para brindes, header de e-mail e banners para a intranet.',
    behance: 'https://www.behance.net/gallery/242659903/Yellow-September-Internal-Campaign-Branding-UI',
  },
  {
    slug: 'cardapio-rinus',
    area: 'social',
    destaque: false,
    galeria: 'paginas', // páginas inteiras, sem corte, em duas colunas (dá para ler)
    mockup: 'mockup.webp', // página de promoções impressa, na mesa (mockup); a capa é um recorte dele
    capaNoCase: false, // o case abre direto no mockup (pedido da Emilly)
    title: "Rinu's",
    category: 'Cardápio',
    detail: 'Cardápio para bar e restaurante · 9 páginas',
    year: '2026',
    color: '#2A1E1E',
    resumo: 'Cardápio de 9 páginas para o Rinu\'s, bar e restaurante de Belo Horizonte. Separei por momento (pratos do dia, porções e chapas, bebidas, sobremesas e promoções), com títulos fortes, fotos dos pratos e o vermelho e o creme da casa, para a pessoa achar o que quer rápido.',
    behance: null,
  },
  {
    slug: 'resultado-engenharia',
    area: 'social',
    destaque: false,
    galeria: 'paginas', // uma seção por opção de fundo, sem repetir peça: o folder nas mãos (frente em cima, verso
    // embaixo) e o panfleto na folha curvada lado a lado; embaixo, as artes (folder por fora e por dentro, panfleto)
    grupos: [
      { titulo: 'Opção 1 · fundo quadriculado', imagens: 5 },
      { titulo: 'Opção 2 · prancha de projeto', imagens: 5 },
    ],
    title: 'Resultado Engenharia',
    category: 'Material impresso',
    detail: 'Folder de 3 dobras e panfleto A5 para engenharia de segurança contra incêndio',
    year: '2026',
    color: '#E30613',
    resumo: 'A Resultado Engenharia faz projetos e regularização em segurança contra incêndio e pânico, um assunto técnico que muita gente adia. No folder e no panfleto organizei tudo para uma leitura rápida: a pergunta direta na capa, os serviços com fotos de equipamentos reais, o passo a passo do diagnóstico à regularização, as dúvidas frequentes e o WhatsApp com QR code. O vermelho e o preto vêm do próprio universo dos extintores. Fiz duas opções de fundo: uma quadriculada e outra que imita uma prancha de projeto, com régua nas bordas.',
    behance: null,
  },
  {
    slug: 'suddenly-30',
    area: 'produtos',
    destaque: false, // saiu do carrossel (pedido da Emilly em 01/10); continua em "Todos os projetos"
    title: 'Suddenly 30',
    category: 'Surface design',
    detail: 'Projeto autoral · estampas e copos',
    year: '2026',
    color: '#E86FB0',
    resumo: 'Projeto autoral de estampa para copos sobre chegar aos 30. Misturei referências pop dos anos 2000, como Betty Boop, celular de flip e "I\'m just a girl", com xadrez, corações e muito rosa.',
    behance: 'https://www.behance.net/gallery/244391785/Suddenly-30-Personal-Graphic-Surface-Design',
  },
  {
    slug: 'almah',
    area: 'identidade',
    destaque: true,
    title: 'Almah',
    category: 'Identidade & rótulos',
    detail: 'Minha marca de velas artesanais · coleção Gênesis',
    year: '2026',
    color: '#503B69',
    resumo: 'A Almah é a minha marca de velas artesanais. Criei o símbolo da chama dentro da lua, os rótulos da coleção Gênesis (Selene, Aura, Terra, Serena e Vênus, cada um com sua cor e aroma) e os cartões que vão junto com o pedido.',
    behance: null,
    // case provisório com os rótulos, os cartões e as fotos (pedido da Emilly); trocar pelo brand book quando ficar pronto
  },
  {
    slug: 'ems',
    area: 'identidade',
    destaque: true,
    title: 'EMS',
    category: 'Marca pessoal',
    detail: 'A minha própria identidade',
    year: '2025',
    color: '#6225D8',
    resumo: 'A minha marca pessoal. O logo é uma ilustração desenhada à mão, para a marca ter traço, imperfeição e personalidade. A paleta vai do roxo forte ao vinho e ao marfim, com a Howell nos títulos e a Inter no texto.',
    behance: 'https://www.behance.net/gallery/241318371/EMS-Personal-Brand',
  },
  {
    slug: 'foto-copa-bufalo',
    area: 'fotografia',
    destaque: false,
    galeria: true, // fotos em grade (verticais), em vez da apresentação empilhada
    title: 'Copa Búfalo',
    category: 'Fotografia esportiva',
    detail: 'Cobertura de jiu-jitsu',
    year: '2026',
    color: '#2A1433',
    resumo: 'Cobertura fotográfica da Copa Búfalo de jiu-jitsu. Procuro o que acontece de perto: a pegada, o esforço no rosto, a concentração antes da luta. Em algumas fotos juntei tipografia para virar post.',
    behance: null,
    instagram: 'https://www.instagram.com/itsemsfotografia/',
    instagramTexto: 'Ver mais fotos',
  },
  {
    slug: 'foto-circuito-gmt',
    area: 'fotografia',
    destaque: true, // no carrossel no lugar do Suddenly 30 (pedido da Emilly em 01/10)
    galeria: true,
    title: 'Circuito GMT',
    category: 'Fotografia esportiva',
    detail: '2ª etapa · cobertura de jiu-jitsu',
    year: '2026',
    color: '#2A1433',
    resumo: 'Cobertura da 2ª etapa do Circuito GMT de jiu-jitsu, com atletas de várias idades e faixas. Além das fotos, montei posts com tipografia por cima, como "The mat doesn\'t lie".',
    behance: null,
    instagram: 'https://www.instagram.com/itsemsfotografia/',
    instagramTexto: 'Ver mais fotos',
  },
  {
    slug: 'almah-fotos',
    area: 'fotografia',
    destaque: false,
    galeria: true,
    title: 'Almah',
    category: 'Fotografia e vídeo de produto',
    detail: 'Velas artesanais · coleção Gênesis',
    year: '2026',
    color: '#492852',
    resumo: 'Fotos e vídeo de produto das velas da Almah, a minha marca. A vela na sombra da lua, os rótulos de perto e cenas simples que mostram a cera e o vidro.',
    behance: null,
    video: 'video.mp4', // vídeo vertical das velas: video.webm (1,5 MB) + video.mp4 (2,4 MB), do original de 90 MB
  },
  {
    slug: 'copo-24-da-bruninha',
    area: 'produtos',
    destaque: false,
    title: '24 da Bruninha',
    category: 'Copo personalizado',
    detail: 'Copo EcoLabel para aniversário',
    year: '2026',
    color: '#1FB57F',
    resumo: 'Copo EcoLabel para o aniversário da Bruninha, com cara de Brasil: Cristo Redentor, cafezinho, caipirinha, bandeira e frases de boteco em blocos de verde, azul e amarelo.',
    behance: null,
  },
  {
    slug: 'copo-carnaval-2026',
    area: 'produtos',
    destaque: false,
    title: 'Carnaval 2026',
    category: 'Copo personalizado',
    detail: 'Copo EcoLabel para o Carnaval',
    year: '2026',
    color: '#F2CF4A',
    resumo: 'Copo EcoLabel para o Carnaval 2026: raios coloridos saindo de uma estrela, máscaras, estrelinhas e instrumentos de bloco em volta do nome em letras soltas.',
    behance: null,
  },
];
