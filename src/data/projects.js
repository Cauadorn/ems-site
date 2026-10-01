// Portfólio: para incluir, tirar ou reordenar projetos, edite só esta lista.
// Cada projeto ganha sozinho uma página de case em projetos/<slug>.html (scripts/gerar-cases.mjs), com:
//   capa  public/img/projetos/<slug>/capa.webp (1600x1000) e og.jpg: python scripts/nova-capa.py <imagem> <slug>
//   apresentação  public/img/projetos/<slug>/slide-01.webp, slide-02.webp… (fatias de 1600 px de largura, na ordem)
// behance: link do projeto no Behance (aparece no fim do case) ou null
// video: (opcional) video.mp4 + video.webm (mesmo nome) e video-poster.webp em public/img/projetos/<slug>/, no topo do case
// mockup: (opcional) foto do projeto aplicado (ex.: mockup.webp em public/img/projetos/<slug>/), em destaque antes das páginas
// site: (opcional) endereço do site no ar, para projetos de web (botão "Ver o site no ar" no case)
// soon: true = aparece no carrossel como "em breve" e ainda não tem página de case
// resumo: (opcional) parágrafo da Emilly sobre o projeto, aparece no topo do case
// galeria: true = as imagens aparecem em grade (bom para fotos verticais), em vez de empilhadas;
//   'paginas' = páginas inteiras, sem corte, em duas colunas (cardápios, revistas)
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
    behance: null,
    site: 'https://www.idexbrasil.com.br/',
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
    behance: null,
  },
];
