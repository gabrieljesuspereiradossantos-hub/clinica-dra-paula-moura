# Planejamento — site da Clínica Estética Avançada · Dra. Paula Moura

## 1. O que foi entendido

Site institucional de conversão para uma clínica de estética facial e corporal em São Bernardo do
Campo. O site vende **a avaliação individual**, não resultados: quem chega precisa entender em
segundos quem é a Dra. Paula, confiar, achar a área de cuidado e clicar em **Agendar avaliação**
(agenda online) ou falar pelo WhatsApp. Nada pode ser inventado: o que não foi confirmado fica
editável e marcado para aprovação.

## 2. Dados confirmados (briefing) × pendentes

| Confirmado e publicado | Pendente (marcado “A confirmar”) |
|---|---|
| Nome, categoria, endereço completo com 2º andar e CEP | Se o telefone é WhatsApp |
| Telefone (11) 95390-1309 | Horários (do Google Maps; publicados com aviso na revisão) |
| Instagram @dra.paulamoura | Mais de 1.000 atendimentos (oculto no público) |
| Agenda https://agenda.link/595392 | Atuação Brasil/EUA/Europa (oculto no público) |
| Link do Google Maps | Formações, títulos, registro (oculto no público) |
| Nota 5,0 · 42 avaliações (com data da consulta) | Nomes das áreas de cuidado (provisórios) |
| | Instruções de acesso ao 2º andar (oculto) |
| | Todas as fotos, depoimentos, domínio |

O link do ChatGPT compartilhado não foi aberto (página privada de terceiro); seguimos só as
referências públicas do briefing.

## 3. Sitemap

```
/                  página única
  #top             Hero: estética avançada em São Bernardo do Campo + Agendar / WhatsApp
  #sobre           Dra. Paula Moura (texto editável + fatos verificáveis + Instagram)
  #cuidados        6 áreas de cuidado (provisórias), indicação só após avaliação
  #abordagem       frase em destaque (momento “word-highlight”)
  #avaliacao       4 etapas + nota pública do Google (+ depoimentos aprovados, quando houver)
  #duvidas         6 perguntas frequentes
  #clinica         o espaço (3 fotos)
  #contato         endereço, horários, Maps, telefone, Instagram + formulário
  rodapé           chamada final “Agendar avaliação”, links, privacidade
/privacidade/      Política de privacidade (modelo para validação jurídica)
/404               página não encontrada
/robots.txt        bloqueia na revisão; libera e aponta o sitemap na versão pública
/sitemap-index.xml gerado quando SITE_URL é definido
```

## 4. Direção visual e design system

- **Tipo de página (skill design-taste-frontend):** *service* (pessoas contratam: clínica). Sem
  efeitos, shaders ou gradientes; fotos, tipografia, cor chapada e micro-interações.
- **Paleta:** tirada da logo (dourado #cc9e63 sobre creme). Off-white quente #f7f2ec, areia
  #ede3d6, marrom quase preto #2b211a no texto (13,9:1), bronze #835a33 como único destaque (botão,
  links, foco; 5,4:1). A paleta sorteada pela skill era azul — trocada pelas cores da cliente, como a
  própria skill orienta.
- **Tipografia:** Instrument Serif (títulos, editorial, combina com o monograma de traço fino) +
  Instrument Sans (texto). A skill sorteou Vollkorn, mas ela destoa da logo; a troca é prevista na
  regra (“só quando a primeira briga com a logo”).
- **Layout sorteado:** hero *split* (texto à esquerda, foto à direita), menu *mega* com as áreas
  de cuidado, botões *solid*, rodapé *columns*, fechamento *close-type*, ritmo *space*.
- **Tokens:** `src/styles/tokens.css` (cores, tipos, espaços, raios, sombras, breakpoints, estados)
  sobre o sistema do kit (`public/assets/system.css`).
- **Movimento:** entrada do hero uma vez, hover/press nos botões, sublinhado dos links e um momento
  de rolagem na frase da abordagem. Tudo para com `prefers-reduced-motion`.

## 5. Estratégia de conversão

1. **Uma ação principal, sempre igual:** “Agendar avaliação” → agenda online, no menu, no hero, no
   fechamento e na barra fixa do celular (que só aparece depois que o botão do hero sai da tela e
   some quando outro botão igual está visível).
2. **Segunda via:** “Falar pelo WhatsApp” com mensagem pronta; telefone clicável; Instagram.
3. **Confiança verificável:** nota 5,0 do Google com número de avaliações e data, endereço completo,
   explicação clara das etapas; nada de promessas, antes/depois ou urgência.
4. **Quem não quer agendar ainda:** formulário curto (nome, WhatsApp, interesse, consentimento),
   que abre o WhatsApp com a mensagem pronta ou envia para um serviço configurável.
5. **Objeções:** FAQ deixa claro que a indicação depende de avaliação profissional.

## 6. Stack

Astro 7 (estático) · CSS do kit + tokens da marca · fontes auto-hospedadas (@fontsource) ·
@astrojs/sitemap · zero JavaScript de framework (só os scripts leves do kit). Pesa ~194 KB na
primeira carga, LCP ~170 ms no teste local, layout shift 0.

## 7. Skills consultadas

A pasta `C:\Users\gabri\.claude\skills` tem cerca de 300 skills; a maioria é de outras áreas
(Kotlin, redes, finanças, vídeo…). Li as descrições de todas e apliquei as relevantes:

- **design-taste-frontend** (principal: sistema, layout, copy, formulário, verificação com
  `copy-lint`, `consistency`, `check`, `perf` e `gate`) — kit em `public/assets/`.
- **accessibility / frontend-a11y** (WCAG 2.2 AA): landmarks, skip link, foco visível, labels,
  erros sob cada campo, alvos de 44 px, contraste, `lang="pt-BR"`.
- **seo**: title/description, Open Graph, canonical, sitemap, robots, JSON-LD de negócio local.
- **security-review / healthcare-phi-compliance**: nenhuma chave no front, sem campo de texto livre
  (evita dados de saúde no formulário), consentimento explícito, sem rastreadores.

### Conflitos entre skill e briefing (vale o briefing, mais específico)

| Regra da skill | Briefing | Decisão |
|---|---|---|
| Endereço só rua e bairro, sem número/CEP; sem telefone real | Endereço completo, telefone clicável | Briefing: dados públicos confirmados |
| Mapa pelo OpenStreetMap | Botão para o Google Maps | Briefing |
| Fotos reais ou de banco “stand-in” | Proibido banco de imagem que pareça a clínica | Espaços reservados com a marca até chegarem as fotos |
| Nada de placeholder visível | Placeholders claramente rotulados para aprovação | Rótulos só na versão de revisão |
| Sem tela de carregamento nem gradiente sobre foto | Pedido da cliente: tela inicial no padrão do projeto Solenime | Tela de abertura (uma vez por sessão, máx. 4 s, some com “reduzir movimento” e sem JS) e véu sobre a foto do hero, como no Solenime |

### Tela inicial (novembro de 2026)

Hero refeito no padrão do projeto **Solenime** (`../clinica solenime`), com a composição da referência
MotionSites **Aesthetic Dental Clinic** (prompt premium bloqueado na conta gratuita, usado só como referência visual):
foto da recepção num quadro de cantos arredondados, véu escuro da esquerda, título em três linhas com a do meio em
itálico dourado, selo da nota do Google (com o monograma no lugar de rostos), botões em pílula, anotação apontando
o balcão (“Recepção no 2º andar”) e três destaques. Antes dele, a tela de abertura com o monograma e o nome
escrito em itálico. Arquivos: `src/styles/hero.css`, hero em `src/pages/index.astro`, abertura em `src/layouts/Base.astro`.
Componentes do 21st.dev (os 2 gratuitos do dia), portados de React + framer-motion para HTML/CSS/JS puros:
- **Scroll media expansion hero** (@arunachalam) → seção “Conheça a Dra. Paula” logo depois do hero
  (`src/components/ScrollExpandMedia.astro`): o vídeo cresce de cartão até a tela cheia e o título se abre para os
  lados. Diferente do original, sem travar a rolagem (rolagem nativa + `position: sticky` em duas telas), com
  botões de pausar e de som, loop leve de 600 KB e a versão completa com áudio só no “Ativar som”.
- **Hero Shutter Text** (@daiwiikharihar) → o nome na tela de abertura: cada letra sai do desfoque enquanto três
  fatias (dourado, bronze, dourado) atravessam.

## 8. Resultado da verificação (skill design-taste-frontend, versão pública)

**Gate:** `GATE: OPEN` — as 3 rodadas do gate foram usadas; depois delas, mais duas passadas de
ajuste em tablet e celular, verificadas com `check.mjs` e `consistency.mjs` em 1440, 1024, 820, 768 e 390 px.

- **check.mjs (layout):** sem achados em 390 e 1440; em 768 e 820 só `sparse` na seção Clínica
  (3 espaços de foto vazios). Todas as seções têm exatamente 1 ou 2 telas no celular e no tablet.
- **copy-lint:** 0 FAIL, 0 WARN.
- **perf.mjs:** 0 FAIL (194 KB, LCP ~170 ms local, CLS 0).
- **consistency.mjs — FAIL abertos, por causa:**
  - Conflito consciente com o briefing: `street-number`, `postcode`, `phone-number` (endereço completo e telefone são exigidos).
  - Fotos ainda não enviadas: `no-visual`, `section-air`, `section-gaps`, `empty-area` — o verificador não conta os espaços reservados como imagem.
  - Falsos positivos: `copy-headings` (perguntas do FAQ; heurística em inglês), `card-family` (colunas da grade lidas como cartões), `forms` (o envio abre o WhatsApp por script; o verificador espera POST ou mailto).
  - Do próprio kit: `button-styles` / `same-action` (o botão grande do fechamento tem 64 px por desenho do kit).
- **Testes do projeto (`npm test`):** 67 ok, 0 falha.
- **Navegador:** formulário testado (erro sob cada campo, foco no primeiro, contagem no status; o envio monta a mensagem do WhatsApp); sem rolagem lateral a 375 e 390 px; sem erros no console.

