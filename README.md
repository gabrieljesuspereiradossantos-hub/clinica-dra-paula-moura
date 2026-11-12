# Site — Clínica Estética Avançada · Dra. Paula Moura

Site institucional (uma página + Política de privacidade + 404) para a clínica em São Bernardo do Campo.
Feito com **Astro** (HTML estático, rápido, sem servidor), conteúdo separado da apresentação e
duas versões geradas a partir do mesmo código:

| Versão | Para quê | Comando | Pasta |
|---|---|---|---|
| **Revisão** | apresentar à cliente: mostra etiquetas “A confirmar” e “Foto a enviar”, pede para o Google não indexar | `npm run build:review` | `dist/` |
| **Pública** | publicar: tudo que está pendente e não liberado some | `npm run build:public` | `dist/` |

`npm run build` sem variável gera a **revisão** (padrão seguro).

## Rodar localmente

Requer Node 22 ou mais novo.

```bash
npm install
```

```bash
npm run dev
```

Abre em http://localhost:4321 (modo revisão). Para ver a versão pública: `REVIEW=0 npm run dev`
(no PowerShell: `$env:REVIEW='0'; npm run dev`).

```bash
npm test
```

Gera as duas versões e confere links, títulos, alt das imagens, labels, metadata, JSON-LD, robots
e que nada pendente aparece na versão pública.

## Onde editar

| O quê | Arquivo |
|---|---|
| Telefone, WhatsApp, Instagram, agenda, Maps, endereço, horários, nota do Google, SEO, logo | `src/config/site.ts` |
| Textos das seções, cuidados, etapas, perguntas, depoimentos, fotos | `src/content/content.ts` |
| Cores, fontes e tokens de design | `src/styles/tokens.css` |
| Estrutura da página | `src/pages/index.astro` · cabeçalho e rodapé em `src/layouts/Base.astro` |
| Política de privacidade (modelo para validação jurídica) | `src/pages/privacidade.astro` |
| Sistema visual base (grade, botões, animações) | `public/assets/` — kit da skill, **não editar** |

### Confirmar uma informação

Em `src/config/site.ts`, mude `confirmed: false` para `true` (ex.: `claims.attendances`, `hours`,
`contact.whatsapp`). Para os cuidados, em `src/content/content.ts`, `confirmed: true` em cada item.
Informação errada? Edite o `value` ou apague o item.

### Trocar as fotos

1. Coloque as fotos aprovadas em `src/assets/fotos/` (JPG, PNG ou WebP, 1600 px ou mais no lado maior).
2. Em `src/content/content.ts`, no bloco `images`, escreva o nome do arquivo em `file` e revise o `alt`.
3. O Astro gera AVIF/WebP em vários tamanhos e carrega sob demanda.

Espaços existentes: `hero` e `about` (verticais, já com fotos da Dra. Paula), `services` (faixa
horizontal), `headspa` (vertical), `space1–3` (verticais 4:5, ainda vazios; a seção “A clínica na
Assunção” só aparece na versão pública quando houver ao menos uma). Nunca use banco de imagens que
pareça ser a clínica nem fotos de pacientes sem autorização por escrito.

### Vídeo e Head Spa

- Vídeo: `public/video/dra-paula-protocolos.mp4` + pôster `.jpg` (configurado em `video`, em
  `src/content/content.ts`). Ele só baixa quando a pessoa dá play. Para trocar, comprima antes:
  `ffmpeg -i novo.mp4 -c:v libx264 -crf 27 -preset slow -c:a aac -b:a 96k -movflags +faststart saida.mp4`.
- Pacotes e valores do Head Spa: `headSpa` em `src/content/content.ts`.

### Trocar a logo

Substitua `public/img/logo-paula-moura.png` (de preferência por um SVG, ajustando `site.logo.src`) e
gere de novo `public/favicon.png` (192 px) e `public/apple-touch-icon.png` (180 px).

### Depoimentos

Só com autorização por escrito. Adicione em `testimonials` (`src/content/content.ts`); a seção
“Sua avaliação em 4 etapas” passa a mostrar o primeiro.

## Integrações

- **Agendamento:** todos os botões “Agendar avaliação” abrem `contact.bookingUrl` (agenda.link).
- **WhatsApp:** `wa.me` com mensagem pronta (`contact.whatsapp.message`). Confirmar que o número é
  WhatsApp e então `whatsapp.confirmed: true`.
- **Formulário:** sem configuração, ao enviar ele **abre o WhatsApp com a mensagem montada** — o site
  não grava nada. Para receber por e-mail, crie um formulário num serviço como Formspree ou Web3Forms
  e gere o build com `PUBLIC_FORM_ENDPOINT=https://...`. Aí o envio é por POST e a confirmação só
  aparece depois da resposta do serviço. Antispam: campo-isca `_gotcha` (compatível com Formspree).
- **Mapa:** botão “Abrir no Google Maps”. Não há mapa incorporado (evita cookies de terceiros e
  aviso de consentimento); se quiserem um, carregue-o só após clique.
- **Fontes:** auto-hospedadas (sem Google Fonts), sem cookies e sem medição.

## Publicar

1. Confirme os itens de `PENDENCIAS.md` com a cliente.
2. Gere a versão pública com o domínio definitivo:

```bash
SITE_URL=https://www.dominio-da-clinica.com.br npm run build:public
```

   (PowerShell: `$env:SITE_URL='https://...'; $env:REVIEW='0'; npx astro build`)

   Com `SITE_URL` o build cria `sitemap-index.xml`, `canonical`, `og:url` e imagem de
   compartilhamento com endereço absoluto.
3. Envie a pasta `dist/` para qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages,
   hospedagem comum). Na Vercel/Netlify: comando `npm run build:public`, pasta `dist`, variáveis
   `SITE_URL` e (opcional) `PUBLIC_FORM_ENDPOINT`.
4. Depois de publicar: cadastre o site no Google Search Console, coloque o link no Google Maps e na
   bio do Instagram, e gere de novo `public/share.jpg` (1200×630) com a foto real do hero.

## Estrutura

```
src/
  config/site.ts        configuração central (dados da clínica, links, modo de revisão)
  content/content.ts    textos, listas e espaços de foto
  styles/tokens.css     tokens de design da marca
  layouts/Base.astro    <head>, SEO, cabeçalho, rodapé, barra fixa do celular
  pages/index.astro     página inicial
  pages/privacidade.astro, 404.astro, robots.txt.ts
  components/           Photo, Pending, Icon, ContactForm
  assets/fotos/         fotos aprovadas (vazio por enquanto)
public/
  assets/               sistema visual (kit da skill design-taste-frontend)
  img/, favicon.png, apple-touch-icon.png, share.jpg
tests/run.mjs           testes automatizados
PLANEJAMENTO.md         análise, sitemap, direção visual, conversão, skills
PENDENCIAS.md           lista de aprovação para a cliente
```
