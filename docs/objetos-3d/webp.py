# junta os quadros (PNG com fundo transparente) num WebP animado de 160 × 160, mais a versão parada
# uso: python3 webp.py <pasta-dos-quadros> <saida-sem-extensao>   (ex.: public/img/objetos/copo-bruninha)
import sys, glob, os
from PIL import Image
pasta, saida = sys.argv[1], sys.argv[2]
ims = [Image.open(f).convert('RGBA').resize((160, 160), Image.LANCZOS) for f in sorted(glob.glob(pasta + '/q*.png'))]
ims[0].save(saida + '.webp', save_all=True, append_images=ims[1:], duration=50, loop=0, quality=60, method=6, allow_mixed=True, minimize_size=True)
ims[0].save(saida + '-parado.webp', quality=82, method=6)
print(saida, os.path.getsize(saida + '.webp'), os.path.getsize(saida + '-parado.webp'))
