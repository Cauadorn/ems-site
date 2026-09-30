"""
Gera docs/design-system/EMS-Design-System.pdf a partir de design-system.html.
Uso (na raiz do site):  python docs/design-system/pdf/gerar_pdf.py [--previa]
  --previa  também salva cada página como PNG em pdf/_previa/ (para conferir o layout)
Precisa de: Python + Playwright (chromium) + as fontes do @fontsource em algum node_modules
(procura em ./node_modules e em D:/Dev/ems-site/node_modules).
"""
import sys, pathlib, asyncio
from playwright.async_api import async_playwright

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parents[2]                     # raiz do site
SAIDA = AQUI.parent / 'EMS-Design-System.pdf'

def achar_fontes():
    for nm in [RAIZ / 'node_modules', pathlib.Path('D:/Dev/ems-site/node_modules')]:
        if (nm / '@fontsource' / 'anton').exists():
            return nm.as_uri()
    sys.exit('Fontes não encontradas: rode npm install no site (ou ajuste o caminho em achar_fontes).')

async def main():
    html = (AQUI / 'design-system.html').read_text(encoding='utf-8')
    sprite = (RAIZ / 'partials' / 'icons.html').read_text(encoding='utf-8')
    html = html.replace('FONTES_DIR', achar_fontes()).replace('<!-- SPRITE -->', sprite)
    build = AQUI / '_build.html'
    build.write_text(html, encoding='utf-8')
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 794, 'height': 1123})
        await pg.goto(build.as_uri())
        await pg.evaluate('document.fonts.ready')
        await pg.wait_for_timeout(800)
        # página que transborda = erro (o conteúdo seria cortado no PDF)
        cheias = await pg.evaluate("""[...document.querySelectorAll('.pg')].map((s, i) => {
            const pe = s.querySelector('.pe'); const lim = pe ? pe.getBoundingClientRect().top : s.getBoundingClientRect().bottom;
            const fundo = Math.max(...[...s.children].filter(c => !c.classList.contains('pe')).map(c => c.getBoundingClientRect().bottom));
            return fundo > lim - 2 ? i + 1 : null }).filter(Boolean)""")
        if '--previa' in sys.argv:
            prev = AQUI / '_previa'; prev.mkdir(exist_ok=True)
            for i, s in enumerate(await pg.query_selector_all('.pg'), 1):
                await s.screenshot(path=str(prev / f'pag-{i:02d}.png'))
        await pg.pdf(path=str(SAIDA), format='A4', print_background=True, margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'})
        await b.close()
    build.unlink()
    print(f'ok: {SAIDA.relative_to(RAIZ)}')
    if cheias:
        print('ATENÇÃO: conteúdo passa do rodapé nas páginas', cheias)

asyncio.run(main())
