import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/opt/node-tools/node_modules/');
const { chromium } = require('playwright');
// node grava.mjs "<medidas do objetos.json>" <pasta-saida> 48   (com o estúdio servido em http://127.0.0.1:5191)
const [json, saida, n = 72] = process.argv.slice(2);
fs.mkdirSync(saida, { recursive: true });
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const pg = await b.newPage({ viewport: { width: 400, height: 400 } });
const erros = []; pg.on('pageerror', (e) => erros.push(e.message)); pg.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
await pg.goto(`http://127.0.0.1:5191/objeto.html#${encodeURIComponent(json)}`);
await pg.waitForFunction(() => window.pronto || window.erro, null, { timeout: 120000 });
const erro = await pg.evaluate(() => window.erro);
if (erro) { console.log('erro', erro); process.exit(1); }
for (let i = 0; i < +n; i++) {
  const url = await pg.evaluate(([i, n]) => window.quadro(i, n), [i, +n]);
  fs.writeFileSync(`${saida}/q${String(i).padStart(3, '0')}.png`, Buffer.from(url.split(',')[1], 'base64'));
}
console.log('ok', n, JSON.stringify(erros));
await b.close();
