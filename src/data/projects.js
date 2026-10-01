// Portfólio: para incluir, tirar ou reordenar projetos, edite só esta lista.
// Cada projeto ganha sozinho uma página de case em projetos/<slug>.html (scripts/gerar-cases.mjs), com:
//   capa  public/img/projetos/<slug>/capa.webp (1600x1000) e og.jpg: python scripts/nova-capa.py <imagem> <slug>
//   apresentação  public/img/projetos/<slug>/slide-01.webp, slide-02.webp… (fatias de 1600 px de largura, na ordem)
// behance: link do projeto no Behance (aparece no fim do case) ou null
// soon: true = aparece no carrossel como "em breve" e ainda não tem página de case
export const projects = [
  {
    slug: 'maria-valentina',
    title: 'Maria Valentina',
    category: 'Branding',
    detail: 'Identidade visual para psicóloga',
    year: '2026',
    color: '#455A75',
    behance: 'https://www.behance.net/gallery/243857007/Psicologa-Maria-Valentina-Branding-Design',
  },
  {
    slug: 'banco-inter',
    title: 'Banco Inter',
    category: 'UI/UX',
    detail: 'Redesign conceitual do app',
    year: '2026',
    color: '#FF7A00',
    behance: 'https://www.behance.net/gallery/243488573/Redesign-App-Banco-Inter-UIUX-Case-Study',
  },
  {
    slug: 'setembro-amarelo',
    title: 'Setembro Amarelo',
    category: 'Campanha',
    detail: 'Endomarketing · Branding & UI',
    year: '2026',
    color: '#F2C200',
    behance: 'https://www.behance.net/gallery/242659903/Yellow-September-Internal-Campaign-Branding-UI',
  },
  {
    slug: 'suddenly-30',
    title: 'Suddenly 30',
    category: 'Surface design',
    detail: 'Projeto autoral · estampas e copos',
    year: '2026',
    color: '#E86FB0',
    behance: 'https://www.behance.net/gallery/244391785/Suddenly-30-Personal-Graphic-Surface-Design',
  },
  {
    slug: 'almah',
    title: 'Almah',
    category: 'Identidade & rótulos',
    detail: 'Velas artesanais · coleção Gênesis',
    year: '2026',
    color: '#492852',
    behance: null,
    soon: true, // TODO: confirmar com a Emilly se ALMAH entra no portfólio
  },
  {
    slug: 'ems',
    title: 'EMS',
    category: 'Marca pessoal',
    detail: 'A minha própria identidade',
    year: '2025',
    color: '#6225D8',
    behance: 'https://www.behance.net/gallery/241318371/EMS-Personal-Brand',
  },
];
