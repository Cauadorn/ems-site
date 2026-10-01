// Portfólio: para incluir, tirar ou reordenar projetos, edite só esta lista.
// Cada projeto ganha sozinho uma página de case em projetos/<slug>.html (scripts/gerar-cases.mjs), com:
//   capa  public/img/projetos/<slug>/capa.webp (1600x1000) e og.jpg: python scripts/nova-capa.py <imagem> <slug>
//   apresentação  public/img/projetos/<slug>/slide-01.webp, slide-02.webp… (fatias de 1600 px de largura, na ordem)
// behance: link do projeto no Behance (aparece no fim do case) ou null
// soon: true = aparece no carrossel como "em breve" e ainda não tem página de case
// resumo: (opcional) parágrafo da Emilly sobre o projeto, aparece no topo do case
// area: em qual seção da página "Todos os projetos" (projetos/index.html) ele aparece: um id de `areas` abaixo
// destaque: true = também aparece no carrossel da home ("Trabalhos que têm cara"); false = só em "Todos os projetos"

// Seções da página "Todos os projetos", na ordem. Área sem projeto mostra uma vaga "em breve".
export const areas = [
  { id: 'identidade', titulo: 'Identidade <em>visual</em>' },
  { id: 'web', titulo: 'Web &amp; <em>UX/UI</em>' },
  { id: 'social', titulo: 'Social &amp; <em>peças</em>' },
  { id: 'fotografia', titulo: 'Foto<em>grafia</em>' },
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
    detail: 'Velas artesanais · coleção Gênesis',
    year: '2026',
    color: '#492852',
    behance: null,
    soon: true, // entra no portfólio; o case sai quando o brand book da ALMAH ficar pronto
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
];
