"""Tira os prints do site usados no PDF do design system (precisa do site rodando em http://localhost:5178).
Uso: python docs/design-system/pdf/capturar.py"""
import asyncio, pathlib
from playwright.async_api import async_playwright
from PIL import Image
OUT = pathlib.Path(__file__).parent / 'img'
SECOES = [('secao-02-faixas', '.tapes'), ('secao-05-manifesto', '.manifesto'), ('secao-06-servicos', '.services'),
          ('secao-07-processo', '.process'), ('secao-08-sobre', '.about'), ('secao-09-contato', '.contact'), ('secao-10-rodape', '.site-footer')]
HIDE = '.cursor{display:none!important} .tape__track{animation:none!important}'

def jpg(png, largura):
    im = Image.open(png).convert('RGB')
    if im.width > largura: im = im.resize((largura, round(im.height * largura / im.width)), Image.LANCZOS)
    im.save(png.with_suffix('.jpg'), quality=82); png.unlink()

async def main():
    OUT.mkdir(exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for modo, w, h, dsf, mob in [('desk', 1440, 900, 1, False), ('mob', 390, 844, 2, True)]:
            ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=dsf, is_mobile=mob, has_touch=mob, reduced_motion='reduce')
            await ctx.add_init_script("try{sessionStorage.setItem('ems-loader','1')}catch(e){}")
            pg = await ctx.new_page(); await pg.goto('http://localhost:5178/'); await pg.wait_for_timeout(2500)
            await pg.add_style_tag(content=HIDE); await pg.wait_for_timeout(400)
            f = OUT / f'{modo}-hero.png'; await pg.screenshot(path=str(f)); jpg(f, 1100)
            await pg.add_style_tag(content='.site-header{display:none!important}')
            for k in (0, 2):
                await pg.evaluate(f"window.scrollTo(0, document.querySelectorAll('.c3d__panel')[{k}].getBoundingClientRect().top + scrollY)")
                await pg.wait_for_timeout(1300)
                f = OUT / f'{modo}-carrossel-{k + 1}.png'; await pg.screenshot(path=str(f)); jpg(f, 1100)
            if modo == 'desk':
                await pg.locator('.projects .section-head').screenshot(path=str(OUT / 'secao-04-projetos-titulo.png')); jpg(OUT / 'secao-04-projetos-titulo.png', 900)
                for nome, sel in SECOES:
                    el = pg.locator(sel).first; await el.scroll_into_view_if_needed(); await pg.wait_for_timeout(600)
                    f = OUT / f'{nome}.png'; await el.screenshot(path=str(f)); jpg(f, 900)
            await ctx.close()
        await b.close()
    print('ok:', sorted(x.name for x in OUT.glob('*.jpg')))
asyncio.run(main())
