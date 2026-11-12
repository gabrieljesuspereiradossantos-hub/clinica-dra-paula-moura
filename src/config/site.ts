/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ---------------------------------------------------------------------------
 * Tudo o que muda com frequência (telefone, links, horários, endereço, cores,
 * imagens e textos) fica aqui ou em src/content/. Os componentes só leem.
 *
 * Modo de revisão (reviewMode):
 *   - true  → mostra etiquetas "A confirmar" e os espaços de foto identificados,
 *             para a cliente aprovar. Use para apresentar o site.
 *   - false → versão pública: tudo o que está marcado como pendente e
 *             `publicWhilePending: false` some do site.
 *   Pode ser forçado na hora do build:  REVIEW=1 npm run build  /  REVIEW=0 npm run build
 */

const envReview = process.env.REVIEW as string | undefined;

export const reviewMode: boolean = envReview === undefined ? true : envReview !== '0';

/** Uma informação que ainda depende da aprovação da cliente. */
export interface Fact {
  value: string;
  /** true quando a cliente já confirmou. */
  confirmed: boolean;
  /** Se false, a informação só aparece no modo de revisão enquanto não for confirmada. */
  publicWhilePending: boolean;
  /** Observação interna mostrada apenas no modo de revisão. */
  note?: string;
}

/** Mostra a informação? (pública, ou pendente mas liberada, ou modo de revisão) */
export const shows = (f: Pick<Fact, 'confirmed' | 'publicWhilePending'>) =>
  f.confirmed || f.publicWhilePending || reviewMode;

/** Etiqueta "A confirmar" aparece? */
export const flags = (f: Pick<Fact, 'confirmed'>) => reviewMode && !f.confirmed;

export const site = {
  /** Domínio definitivo (necessário para canonical, sitemap e Open Graph absolutos).
   *  Defina também a variável de ambiente SITE_URL no build. */
  url: (process.env.SITE_URL || '').replace(/\/$/, ''),

  name: 'Clínica Estética Avançada — Dra. Paula Moura',
  shortName: 'Dra. Paula Moura',
  professional: 'Dra. Paula Moura',
  category: 'Estética avançada',
  lang: 'pt-BR',

  seo: {
    title: 'Dra. Paula Moura: estética avançada em São Bernardo do Campo',
    description:
      'Clínica de estética facial e corporal na Assunção, em São Bernardo do Campo. Agende uma avaliação individual com a Dra. Paula Moura.',
    /** Imagem de compartilhamento (1200×630). Fica em public/. */
    ogImage: '/share.jpg',
    themeColor: '#f7f2ec',
  },

  address: {
    street: 'Av. João Firmino, 359',
    complement: '2º andar',
    district: 'Assunção',
    city: 'São Bernardo do Campo',
    state: 'SP',
    postalCode: '09810-250',
    country: 'BR',
    countryName: 'Brasil',
    /** Instruções de acesso (portaria, elevador, estacionamento). Preencher só após confirmação. */
    access: { value: '', confirmed: false, publicWhilePending: false, note: 'Confirmar instruções de acesso ao 2º andar e estacionamento.' } as Fact,
  },

  contact: {
    phoneDisplay: '(11) 95390-1309',
    phoneE164: '+5511953901309',
    whatsapp: {
      number: '5511953901309',
      /** Mude para true depois de confirmar que este número é o WhatsApp da clínica. */
      confirmed: true,
      message: 'Olá! Vim pelo site e gostaria de agendar uma avaliação.',
    },
    instagram: {
      handle: '@dra.paulamoura',
      url: 'https://www.instagram.com/dra.paulamoura/',
    },
    /** Agendamento online identificado no Google Maps. */
    bookingUrl: 'https://agenda.link/595392',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Clinica+Estetica+Dra+Paula+Moura+Sao+Bernardo+do+Campo',
    /** Mesmo link, usado para "Ler as avaliações no Google". */
    reviewsUrl:
      'https://www.google.com/maps/search/?api=1&query=Clinica+Estetica+Dra+Paula+Moura+Sao+Bernardo+do+Campo',
  },

  /** Horários públicos do Google Maps. Confirmar com a clínica antes de publicar. */
  hours: {
    confirmed: false,
    timeZone: 'America/Sao_Paulo',
    rows: [
      { label: 'Segunda a sexta', days: 'mon-fri', text: '9h às 18h', opens: '09:00', closes: '18:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
      { label: 'Sábado', days: 'sat', text: '9h às 13h', opens: '09:00', closes: '13:00', schema: ['Saturday'] },
      { label: 'Domingo', days: 'sun', text: 'Fechado', opens: null, closes: null, schema: [] },
    ],
  },

  /** Avaliação pública no Google Maps — atualizar valor, total e data quando consultar de novo. */
  rating: {
    show: true,
    value: '5,0',
    count: 42,
    checkedAt: 'novembro de 2026',
    source: 'Google Maps',
  },

  /** Afirmações vindas da bio do Instagram: só publicar após confirmação da cliente. */
  claims: {
    attendances: { value: 'Mais de 1.000 atendimentos realizados', confirmed: false, publicWhilePending: false, note: 'Número citado na bio do Instagram.' } as Fact,
    reach: { value: 'Atendimentos no Brasil, nos Estados Unidos e na Europa', confirmed: false, publicWhilePending: false, note: 'Citado na bio do Instagram.' } as Fact,
    training: { value: 'Formações e experiência: em validação com a Dra. Paula', confirmed: false, publicWhilePending: false, note: 'Preencher somente com cursos e títulos comprovados.' } as Fact,
  },

  /** Formulário de contato.
   *  endpoint vazio → o formulário abre o WhatsApp com a mensagem pronta (nenhum dado fica no site).
   *  Com endpoint (ex.: Formspree, Web3Forms, função própria) → envia por POST e mostra a confirmação. */
  form: {
    endpoint: process.env.PUBLIC_FORM_ENDPOINT || '',
  },

  /** Cores da marca (tirada da logo). Os tokens completos ficam em src/styles/tokens.css. */
  brand: {
    gold: '#cc9e63',
    bronze: '#835a33',
    ground: '#f7f2ec',
    sand: '#ede3d6',
    ink: '#2b211a',
  },

  logo: {
    src: '/img/logo-paula-moura.png',
    /** versão leve para o menu, rodapé e espaços de foto */
    small: '/img/logo-paula-moura-96.png',
    /** menu e rodapé: nítida até 96 px em telas de alta resolução */
    nav: '/img/logo-paula-moura-192.png',
    alt: 'Logo Dra. Paula Moura',
    note: 'Logo recebida em 1920 px (original em src/assets/logo-original.png).',
  },
};

/** Links prontos a partir da configuração. */
export const links = {
  booking: site.contact.bookingUrl,
  whatsapp: `https://wa.me/${site.contact.whatsapp.number}?text=${encodeURIComponent(site.contact.whatsapp.message)}`,
  whatsappBase: `https://wa.me/${site.contact.whatsapp.number}`,
  phone: `tel:${site.contact.phoneE164}`,
  instagram: site.contact.instagram.url,
  maps: site.contact.mapsUrl,
  reviews: site.contact.reviewsUrl,
};

export const fullAddress = `${site.address.street}, ${site.address.complement}, ${site.address.district}, ${site.address.city} – ${site.address.state}, ${site.address.postalCode}`;
