/**
 * Testes do site (sem dependências).  Uso:  npm test
 * Gera as duas versões (revisão e pública) e verifica o HTML gerado:
 *  - links principais (agenda, WhatsApp, telefone, Instagram, Maps) corretos e configurados
 *  - nenhuma etiqueta "A confirmar" / "Foto a enviar" e nada pendente na versão pública
 *  - sem lorem ipsum, sem href vazio ou "#"
 *  - um único h1, títulos sem pular níveis, imagens com alt, campos com label
 *  - metadata, Open Graph, favicon, JSON-LD válido, robots.txt coerente com o modo
 */
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
let failed = 0, passed = 0;
const ok = (cond, msg) => { if (cond) { passed++; } else { failed++; console.log('  ✗ ' + msg); } };

function build(review, outDir) {
  execSync(`npx astro build --outDir ${outDir}`, { cwd: root, stdio: 'ignore', env: { ...process.env, REVIEW: review ? '1' : '0' } });
  return readFileSync(join(root, outDir, 'index.html'), 'utf8');
}

function common(html, label) {
  console.log(`\n${label}`);
  ok(/<html lang="pt-BR"/.test(html), 'html lang="pt-BR"');
  ok((html.match(/<h1[\s>]/g) || []).length === 1, 'exatamente um h1');
  ok(/<title>[^<]{20,}<\/title>/.test(html), 'title preenchido');
  ok(/<meta name="description" content="[^"]{50,}"/.test(html), 'meta description');
  for (const p of ['og:title', 'og:description', 'og:image', 'og:type']) ok(html.includes(`property="${p}"`), `Open Graph ${p}`);
  ok(html.includes('rel="icon"'), 'favicon');
  ok(html.includes('href="https://agenda.link/595392"'), 'CTA de agendamento aponta para a agenda');
  ok(/href="https:\/\/wa\.me\/5511953901309\?text=/.test(html), 'link de WhatsApp com mensagem');
  ok(html.includes('href="tel:+5511953901309"'), 'telefone clicável');
  ok(html.includes('href="https://www.instagram.com/dra.paulamoura/"'), 'Instagram');
  ok(html.includes('https://www.google.com/maps/search/?api=1&amp;query=') || html.includes('https://www.google.com/maps/search/?api=1&query='), 'Google Maps');
  ok(!/lorem ipsum/i.test(html), 'sem lorem ipsum');
  ok(!/href="(#)?"/.test(html), 'sem href vazio ou "#"');
  ok(!/<img(?![^>]*\balt=)[^>]*>/.test(html), 'toda <img> tem alt');
  // headings em ordem (sem pular níveis) dentro do <main>
  const main = html.split('<main')[1]?.split('</main>')[0] || '';
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  ok(levels.every((l, i) => i === 0 || l <= levels[i - 1] + 1), `títulos sem pular nível (${levels.join(',')})`);
  // campos do formulário com label
  const ids = [...html.matchAll(/<(?:input|select|textarea)[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) ok(html.includes(`for="${id}"`), `campo #${id} tem label`);
  ok(/name="_gotcha"/.test(html), 'campo-isca antispam presente');
  ok(/name="consentimento"[^>]*required/.test(html), 'consentimento LGPD obrigatório');
  // JSON-LD
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let data = null; try { data = JSON.parse(ld[1]); } catch {}
  ok(data && data['@type'] === 'HealthAndBeautyBusiness', 'JSON-LD válido (HealthAndBeautyBusiness)');
  ok(data && !('aggregateRating' in data), 'JSON-LD sem nota agregada própria');
  ok(existsSync(join(root, 'public', 'share.jpg')), 'imagem de compartilhamento existe');
}

const review = build(true, 'dist');
common(review, 'Versão de revisão (dist/)');
ok(review.includes('A confirmar'), 'mostra etiquetas "A confirmar"');
ok(review.includes('noindex'), 'pede para não indexar');
ok(/Disallow: \//.test(readFileSync(join(root, 'dist', 'robots.txt'), 'utf8')), 'robots.txt bloqueia na revisão');

const pub = build(false, 'dist-public');
common(pub, 'Versão pública (dist-public/)');
ok(!pub.includes('A confirmar'), 'sem etiquetas "A confirmar"');
ok(!pub.includes('Foto a enviar'), 'sem rótulos de foto pendente');
// nenhuma chave repetida no mapa de imagens (a última sobrescreve a primeira sem aviso)
const imagesBlock = readFileSync(join(root, 'src/content/content.ts'), 'utf8').split('export const images')[1].split('\n};')[0];
const keys = [...imagesBlock.matchAll(/^  (\w+): \{/gm)].map((m) => m[1]);
ok(keys.length === new Set(keys).size, 'sem espaços de foto duplicados (' + keys.filter((k, i) => keys.indexOf(k) !== i).join(', ') + ')');
ok(!/class="[^"]*\bslot\b/.test(pub), 'versão pública sem espaços de foto vazios');
ok(!pub.includes('1.000 atendimentos'), 'não publica "1.000 atendimentos" sem confirmação');
ok(!pub.includes('Estados Unidos'), 'não publica atuação internacional sem confirmação');
ok(!pub.includes('noindex'), 'indexável');
ok(/Allow: \//.test(readFileSync(join(root, 'dist-public', 'robots.txt'), 'utf8')), 'robots.txt libera na versão pública');
ok(existsSync(join(root, 'dist-public', 'privacidade', 'index.html')), 'página de privacidade gerada');
ok(existsSync(join(root, 'dist-public', '404.html')), 'página 404 gerada');

console.log(`\n${passed} ok, ${failed} falha(s)`);
process.exit(failed ? 1 : 0);
