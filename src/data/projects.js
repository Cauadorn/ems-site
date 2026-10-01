// Portfólio: para incluir, tirar ou reordenar projetos, edite só esta lista.
// Cada projeto ganha sozinho uma página de case em projetos/<slug>.html (scripts/gerar-cases.mjs), com:
//   capa  public/img/projetos/<slug>/capa.webp (1600x1000) e og.jpg: python scripts/nova-capa.py <imagem> <slug>
//   apresentação  public/img/projetos/<slug>/slide-01.webp, slide-02.webp… (fatias de 1600 px de largura, na ordem)
// behance: link do projeto no Behance (aparece no fim do case) ou null
// video: (opcional) video.mp4 + video.webm (mesmo nome) e video-poster.webp em public/img/projetos/<slug>/, no topo do case
// mockup: (opcional) foto do projeto aplicado (ex.: mockup.webp em public/img/projetos/<slug>/), em destaque antes das páginas
// site: (opcional) endereço do site no ar, para projetos de web (botão "Ver o site no ar" no case)
// instagram: (opcional) Instagram do cliente, para projetos de social media (botão "Ver no Instagram" no case)
// soon: true = aparece no carrossel como "em breve" e ainda não tem página de case
// resumo: (opcional) parágrafo curto sobre o projeto, em primeira pessoa, no topo do case. Os de 01/10/2026 foram
//   escritos pelo Claude a pedido da Emilly, a partir das apresentações; ela revisa e pede para mudar o que quiser
// galeria: true = as imagens aparecem em grade (bom para fotos verticais), em vez de empilhadas;
//   'paginas' = páginas inteiras, sem corte, em duas colunas (cardápios, revistas);
//   'posts' = posts de rede social (4:5), 4 por linha; imagem deitada (carrossel inteiro) ocupa a linha toda
// area: em qual seção da página "Todos os projetos" (projetos/index.html) ele aparece: um id de `areas` abaixo
// destaque: true = também aparece no carrossel da home ("Trabalhos que têm cara"); false = só em "Todos os projetos"

// Seções da página "Todos os projetos", na ordem. Área sem projeto mostra uma vaga "em breve".
// link: (opcional) card extra no fim da seção, levando para fora do site (ex.: Instagram)
export const areas = [
  { id: 'identidade', titulo: 'Identidade <em>visual</em>' },
  { id: 'web', titulo: 'Web &amp; <em>UX/UI</em>' },
  { id: 'social', titulo: 'Social &amp; <em>peças</em>' },
  {
    id: 'fotografia', titulo: 'Foto<em>grafia</em>',
    // card extra que leva ao Instagram de fotografia esportiva (a Emilly pediu para divulgar)
    link: { href: 'https://www.instagram.com/itsemsfotografia/', titulo: '@itsemsfotografia', detalhe: 'Fotografia esportiva no Instagram' },
  },
  { id: 'produtos', titulo: 'Produtos <em>personalizados</em>' },
];

export const projects = [
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
  },
  {
    slug: 'idex',
    area: 'identidade',
    destaque: false, // só em "Todos os projetos" → Identidade visual (pedido da Emilly)
    title: 'IDex',
    category: 'Branding',
    detail: 'Identidade visual para plataforma de crédito',
    year: '2026',
    color: '#6225D8',
    resumo: 'Identidade para uma plataforma de crédito que usa tecnologia e dados. O símbolo junta duas formas angulares dentro de um losango, que lembram um chip, e o encaixe delas sugere movimento. Montei o manual com grid de construção, o roxo como cor principal, Futura e Inter e as regras de uso.',
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
    destaque: true,
    title: 'Setembro Amarelo',
    category: 'Campanha',
    detail: 'Endomarketing · Branding & UI',
    year: '2026',
    color: '#F2C200',
    resumo: 'Campanha interna de Setembro Amarelo para uma empresa de cibersegurança. O desafio era falar de saúde mental com acolhimento sem sair da identidade escura e tecnológica da empresa. Criei o conceito "Cuidado que se compartilha", cartões De/Para, tags para brindes, header de e-mail e banners para a intranet.',
    behance: 'https://www.behance.net/gallery/242659903/Yellow-September-Internal-Campaign-Branding-UI',
  },
  {
    slug: 'cardapio-rinus',
    area: 'social',
    destaque: false,
    galeria: 'paginas', // páginas inteiras, sem corte, em duas colunas (dá para ler)
    mockup: 'mockup.webp', // página de promoções impressa, na mesa (mockup)
    title: "Rinu's",
    category: 'Cardápio',
    detail: 'Cardápio para bar e restaurante · 9 páginas',
    year: '2026',
    color: '#2A1E1E',
    resumo: 'Cardápio de 9 páginas para o Rinu\'s, bar e restaurante de Belo Horizonte. Separei por momento (pratos do dia, porções e chapas, bebidas, sobremesas e promoções), com títulos fortes, fotos dos pratos e o vermelho e o creme da casa, para a pessoa achar o que quer rápido.',
    behance: null,
  },
  {
    slug: 'suddenly-30',
    area: 'produtos',
    destaque: true,
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
  },
  {
    slug: 'foto-circuito-gmt',
    area: 'fotografia',
    destaque: false,
    galeria: true,
    title: 'Circuito GMT',
    category: 'Fotografia esportiva',
    detail: '2ª etapa · cobertura de jiu-jitsu',
    year: '2026',
    color: '#2A1433',
    resumo: 'Cobertura da 2ª etapa do Circuito GMT de jiu-jitsu, com atletas de várias idades e faixas. Além das fotos, montei posts com tipografia por cima, como "The mat doesn\'t lie".',
    behance: null,
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
