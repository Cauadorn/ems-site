"""
Prepara as imagens do site a partir das fontes originais (Behance + pasta EMI).
Uso: python scripts/prepare-images.py <pasta_behance_baixada>
Gera WebP otimizados em public/img. Rodar de novo sempre que trocar uma imagem-fonte.
"""
import sys, pathlib
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "img"
BE = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
EMI = ROOT.parent  # D:/.../Clientes/EMI

def save(im, path, w=None, q=80):
    if w and im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=q, method=6)
    print(path.relative_to(ROOT), im.size)

def slices(src, dest_dir, w=1600, max_h=2000, q=78):
    im = Image.open(src).convert("RGB")
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    n = -(-im.height // max_h); h = -(-im.height // n)
    for i in range(n):
        save(im.crop((0, i * h, w, min(im.height, (i + 1) * h))), dest_dir / f"slide-{i+1:02d}.webp", q=q)

def cover(src, dest, box=None, size=(1600, 1000), q=80):
    im = Image.open(src).convert("RGB")
    if box: im = im.crop(box)
    tw, th = size; r = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    l = (im.width - tw) // 2; t = (im.height - th) // 2
    save(im.crop((l, t, l + tw, t + th)), dest, q=q)

P = OUT / "projetos"
# --- Emilly
save(Image.open(EMI / "emie fd.png"), OUT / "emi/emi-piscando.webp", 900, 85)
save(Image.open(EMI / "Group 187.png"), OUT / "emi/emi-recorte.webp", 900, 85)
save(Image.open(EMI / "hf_20260921_010529_4e8fb41e-af64-4fd4-bbd2-32362dfa129f.png").convert("RGB"), OUT / "emi/emi-livraria.webp", 880, 82)
save(Image.open(EMI / "FINAL COM COLOR.00_00_10_12.Quadro001.png").convert("RGB"), OUT / "emi/emi-lendo.webp", 1440, 82)
# --- ALMAH (pasta local)
for i, f in enumerate(["Frame 62.png", "Frame 63.png", "Frame 64.png", "Frame 65.png", "Frame 66.png"], 1):
    save(Image.open(EMI / f).convert("RGB"), P / f"almah/rotulo-{i:02d}.webp", 1600, 80)
save(Image.open(EMI / "CARD TAROT (3).png").convert("RGB"), P / "almah/card-obrigada.webp", 1100, 80)
save(Image.open(EMI / "cuidados com a vela.png").convert("RGB"), P / "almah/card-cuidados.webp", 1100, 80)
save(Image.open(EMI / "229338443_11049417.png").convert("RGB"), P / "almah/card-pedido.webp", 1100, 80)
save(Image.open(EMI / "DSC02616.jpg").convert("RGB"), P / "almah/foto-vela.webp", 1200, 80)
cover(EMI / "Frame 64.png", P / "almah/capa.webp")
# --- Behance
if BE:
    slices(BE / "psicologa-maria-valentina-branding-desig/02.jpg", P / "maria-valentina")
    slices(BE / "redesign-app-banco-inter-uiux-case-study/01.jpg", P / "banco-inter")
    slices(BE / "yellow-september-internal-campaign-brand/01.png", P / "setembro-amarelo")
    slices(BE / "ems-personal-brand/01.png", P / "ems")
    for i in range(1, 5):
        save(Image.open(BE / f"suddenly-30-personal-graphic-surface-des/{i:02d}.jpg").convert("RGB"), P / f"suddenly-30/slide-{i:02d}.webp", 1600, 80)
    g = Image.open(BE / "psicologa-maria-valentina-branding-desig/01.gif"); g.seek(0)
    cover(BE / "suddenly-30-personal-graphic-surface-des/01.jpg", P / "suddenly-30/capa.webp")
    g.convert("RGB").save(ROOT / "scripts/_mv.png")
    cover(ROOT / "scripts/_mv.png", P / "maria-valentina/capa.webp"); (ROOT / "scripts/_mv.png").unlink()
    inter = Image.open(BE / "redesign-app-banco-inter-uiux-case-study/01.jpg"); cover(BE / "redesign-app-banco-inter-uiux-case-study/01.jpg", P / "banco-inter/capa.webp", (0, 0, inter.width, round(inter.width * 0.62)))
    ys = Image.open(BE / "yellow-september-internal-campaign-brand/01.png"); cover(BE / "yellow-september-internal-campaign-brand/01.png", P / "setembro-amarelo/capa.webp", (0, 0, ys.width, round(ys.width * 0.62)))
    ems = Image.open(BE / "ems-personal-brand/01.png"); cover(BE / "ems-personal-brand/01.png", P / "ems/capa.webp", (0, 0, ems.width, round(ems.width * 0.5625)))
