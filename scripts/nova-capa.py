"""
Gera a capa de um projeto novo no formato do carrossel (1600x1000, WebP).
Uso:  python scripts/nova-capa.py <imagem> <slug> [--topo | --base]
  <imagem>  qualquer JPG/PNG/WebP (de preferência com 1600 px de largura ou mais)
  <slug>    o mesmo "slug" que vai em src/data/projects.js (ex.: studio-flor)
  --topo / --base  qual parte da imagem manter no recorte (padrão: centro)
Saída: public/img/projetos/<slug>/capa.webp (carrossel) e og.jpg (prévia 1200x630 ao compartilhar o link do case)
"""
import sys, pathlib
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = pathlib.Path(__file__).resolve().parents[1]

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if len(args) != 2:
        sys.exit(__doc__)
    src, slug = pathlib.Path(args[0]), args[1]
    anchor = 'topo' if '--topo' in sys.argv else 'base' if '--base' in sys.argv else 'centro'

    im = Image.open(src).convert('RGB')
    tw, th = 1600, 1000
    r = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    left = (im.width - tw) // 2
    top = {'topo': 0, 'base': im.height - th}.get(anchor, (im.height - th) // 2)

    out = ROOT / 'public' / 'img' / 'projetos' / slug / 'capa.webp'
    out.parent.mkdir(parents=True, exist_ok=True)
    capa = im.crop((left, top, left + tw, top + th))
    capa.save(out, 'WEBP', quality=80, method=6)
    print(f'ok: {out.relative_to(ROOT)}')
    og(capa, out.with_name('og.jpg'))

def og(capa, out):
    # WhatsApp e Instagram não mostram WebP na prévia do link: vai em JPG, 1200x630, recortado da capa
    im = capa.resize((1200, 750), Image.LANCZOS)
    im.crop((0, 60, 1200, 690)).save(out, 'JPEG', quality=85, optimize=True, progressive=True)
    print(f'ok: {out.relative_to(ROOT)}')

if __name__ == '__main__':
    main()
