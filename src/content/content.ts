/**
 * TEXTOS E LISTAS DO SITE
 * ---------------------------------------------------------------------------
 * Edite aqui os textos das seções. Itens com `confirmed: false` mostram a
 * etiqueta "A confirmar" no modo de revisão (ver src/config/site.ts).
 */
import { site } from '../config/site';

/* --------------------------------------------------------------- imagens
 * Coloque as fotos aprovadas em src/assets/fotos/ e escreva o nome do arquivo
 * em `file`. Sem arquivo, o site mostra um espaço reservado com a marca
 * (identificado como "Foto a enviar" no modo de revisão).
 * Nunca use banco de imagens que pareça ser a clínica, nem fotos de pacientes
 * sem autorização por escrito.
 */
export interface ImageSlot {
  file: string;
  alt: string;
  /** O que a foto deve mostrar (aparece só no modo de revisão). */
  brief: string;
  position?: string;
}

export const images: Record<string, ImageSlot> = {
  hero: {
    file: 'dra-paula-sorrindo.jpg',
    alt: 'Dra. Paula Moura sorrindo, de blazer branco e colar de pérolas, sentada na clínica',
    brief: 'Retrato da Dra. Paula no consultório, luz natural, vertical',
    position: '50% 20%',
  },
  about: {
    file: 'dra-paula-sorrindo.jpg',
    alt: 'Dra. Paula Moura sorrindo, de blazer branco e colar de pérolas, sentada na clínica',
    brief: 'A Dra. Paula em uma avaliação ou explicando um protocolo',
    position: '50% 18%',
  },
  consult: {
    file: 'dra-paula-blazer.jpg',
    alt: 'Dra. Paula Moura de blazer azul-claro, segurando uma xícara de café',
    brief: 'A Dra. Paula na clínica',
    position: '50% 15%',
  },
  greenWall: {
    file: 'clinica-parede-verde.jpg',
    alt: 'Parede de plantas com a placa dourada Dra. Paula Moura Estética Avançada',
    brief: 'Parede verde com o letreiro da clínica',
    position: '50% 50%',
  },
  /** fundo do hero (padrão Solenime): a recepção inteira, vertical */
  heroRecepcao: {
    file: 'hero-recepcao.jpg',
    alt: 'Recepção da clínica: balcão de mármore com o monograma PM dourado, luminária de globos e o letreiro Dra. Paula Moura Estética Avançada',
    brief: 'Recepção da clínica',
    position: '50% 62%',
  },
  services: {
    file: 'clinica-equipamentos-faixa.jpg',
    alt: 'Equipamentos de estética ao lado da maca na sala de procedimentos da clínica',
    brief: 'Foto horizontal da sala de procedimentos',
    position: '50% 50%',
  },
  headspa: {
    file: 'head-spa-arco.jpg',
    alt: 'Cliente deitada recebendo Head Spa, com o arco dourado de água sobre os cabelos',
    brief: 'Equipamento de Head Spa da clínica',
    position: '50% 45%',
  },
  space1: {
    file: 'clinica-prateleiras-4x5.jpg',
    alt: 'Prateleiras brancas com moldura dourada e produtos, sobre um balcão com puxadores dourados',
    brief: 'Recepção ou sala de espera',
    position: '50% 50%',
  },
  space2: {
    file: 'clinica-sala.jpg',
    alt: 'Sala de procedimentos com maca, prateleiras de produtos e equipamentos',
    brief: 'Sala de atendimento com a maca',
    position: '50% 50%',
  },
  space3: {
    file: 'clinica-cafe.jpg',
    alt: 'Cantinho do café com cafeteira, jarra de cristal e xícara de detalhes dourados',
    brief: 'Espaço de espera ou bem-estar',
    position: '50% 50%',
  },
  /* Também em src/assets/fotos, ainda sem uso: clinica-parede-verde.jpg, clinica-prateleiras.jpg,
     atendimento-aplicacao.jpg, atendimento-procedimento.jpg (pacientes com autorização). */
  result1: {
    file: 'resultado-perfil.jpg',
    alt: 'Antes e depois de uma paciente, rosto de perfil: à esquerda antes, à direita depois',
    brief: 'Antes e depois autorizado',
  },
  result2: {
    file: 'resultado-labios.jpg',
    alt: 'Antes e depois de uma paciente, rosto de frente com destaque para os lábios: à esquerda antes, à direita depois',
    brief: 'Antes e depois autorizado',
  },
  result3: {
    file: 'resultado-rosto-masculino.jpg',
    alt: 'Antes e depois de um paciente, rosto de frente: à esquerda antes, à direita depois',
    brief: 'Antes e depois autorizado',
  },
};

/* --------------------------------------------------------------- hero */
export const hero = {
  kicker: `Nota ${site.rating.value} no ${site.rating.source}, ${site.rating.count} avaliações`,
  title: 'Estética avançada em São Bernardo do Campo',
  /** as três linhas fixas do título (padrão Solenime); a do meio fica em itálico dourado */
  lines: ['Estética avançada', 'em São Bernardo', 'do Campo'],
  italicLine: 1,
  /** anotação sobre a foto, apontando o balcão da recepção */
  callout: { title: 'Recepção no 2º andar', text: 'Av. João Firmino, 359 · Assunção' },
  /** três destaques embaixo (só no desktop) */
  facts: [
    ['Avaliação individual', 'antes de qualquer protocolo'],
    ['Facial e corporal', 'harmonização, pele e corpo'],
    ['Head Spa', 'pacotes de 45 min a 2h30'],
  ] as [string, string][],
  lead: 'Harmonização e cuidados faciais e corporais com a Dra. Paula Moura. Cada indicação nasce de uma avaliação individual, nunca de um protocolo pronto.',
};

/* --------------------------------------------------------------- sobre */
export const about = {
  title: 'Dra. Paula Moura.',
  titleMuted: 'Harmonização facial e corporal.',
  text: [
    'Na clínica da Av. João Firmino, a conversa vem antes de qualquer procedimento: entender o que você deseja, explicar cada etapa com clareza e respeitar os traços que são seus.',
    'Técnicas atuais e produtos escolhidos para cada caso, com a explicação de cada etapa para você decidir com segurança.',
    'O objetivo é um resultado coerente com o seu rosto e o seu corpo, construído com cuidado e acompanhamento.',
  ],
  confirmedText: false,
};

/* --------------------------------------------------------------- áreas de cuidado
 * Nomes provisórios, vindos do posicionamento público. A lista final de
 * procedimentos precisa ser confirmada pela Dra. Paula. */
export const services = {
  title: 'Estética facial e corporal.',
  titleMuted: 'Cada cuidado é indicado só depois da avaliação.',
  footnote: 'Nenhum procedimento é indicado sem avaliação profissional.',
  items: [
    { name: 'Harmonização facial', line: 'Proporção e equilíbrio do rosto, preservando a sua expressão.', confirmed: true },
    { name: 'Estética facial', line: 'Cuidados com a pele do rosto, do viço à textura.', confirmed: false },
    { name: 'Qualidade e rejuvenescimento da pele', line: 'Protocolos para firmeza, uniformidade e hidratação.', confirmed: false },
    { name: 'Estética corporal', line: 'Cuidados com contorno, firmeza e textura da pele do corpo.', confirmed: false },
    { name: 'Head Spa e bem-estar', line: 'Cuidado com o couro cabeludo e uma pausa na rotina.', confirmed: true },
    { name: 'Tecnologias e protocolos personalizados', line: 'Combinações definidas para o seu caso, depois da avaliação.', confirmed: false },
  ],
};

/* --------------------------------------------------------------- Head Spa
 * Pacotes e valores dos posts da clínica no Instagram. Conferir se continuam
 * valendo antes de publicar (mude pricesConfirmed para true). */
export const headSpa = {
  title: 'Head Spa na clínica.',
  titleMuted: 'Três pacotes, de 45 minutos a 2h30.',
  finish: 'Todos terminam com leve secagem dos fios e uma bebida especial.',
  pricesConfirmed: true,
  whatsappMessage: 'Olá! Vim pelo site e gostaria de agendar o Head Spa.',
  packages: [
    { name: 'Head Spa Soft Relax', duration: '45 minutos', price: 'R$ 180', includes: 'Massagem capilar relaxante, lavagem completa dos fios e massagem no pescoço e ombros.' },
    { name: 'Head Spa Therapy', duration: '1h30', price: 'R$ 250', includes: 'O Soft Relax com massagem nas costas.' },
    { name: 'Head Spa Harmonie Experience', duration: '2h30', price: 'R$ 350', includes: 'Massagem corporal ou drenagem, massagem capilar e facial, esfoliação, máscara facial e spa dos lábios.' },
  ],
};

/* --------------------------------------------------------------- resultados (antes e depois)
 * Publicados com autorização de imagem dos pacientes (guardar os termos assinados).
 * Sem promessa de resultado: o texto deixa claro que cada caso é avaliado. */
export const results = {
  title: 'Resultados de pacientes.',
  titleMuted: 'Antes à esquerda, depois à direita.',
  note: 'Fotos publicadas com autorização dos pacientes. Cada resultado depende da avaliação, do protocolo indicado e da resposta de cada pessoa.',
  /** procedure: nome do procedimento de cada caso (aparece abaixo da foto). Vazio = não mostra. */
  cases: [
    { slot: 'result1', procedure: 'Rinomodelação' },
    { slot: 'result2', procedure: 'Preenchimento labial' },
    { slot: 'result3', procedure: 'Harmonização facial detalhada' },
  ],
};

/* --------------------------------------------------------------- vídeo
 * Reel da Dra. Paula (legendas já embutidas). Arquivos em public/video/. */
/** seção da mídia que cresce com a rolagem (logo depois do hero) */
export const videoMoment = {
  eyebrow: 'Protocolos de renovação da pele',
  titleStart: 'Conheça',
  titleEnd: 'a Dra. Paula',
  hint: 'Role para assistir',
};

export const video = {
  src: '/video/dra-paula-protocolos.mp4',
  /** 12 s sem áudio, 540p (600 KB), para o loop mudo */
  loop: '/video/dra-paula-loop.mp4',
  poster: '/video/dra-paula-protocolos.jpg',
  label: 'Vídeo: a Dra. Paula explica como escolher o protocolo de renovação da pele ideal para você',
};

/* --------------------------------------------------------------- abordagem (frase em destaque) */
export const statement = {
  label: 'Abordagem',
  before: 'Cada protocolo começa por uma conversa: o que você deseja, o que a sua pele pede e o que faz sentido para a sua rotina. A indicação vem depois da',
  strong: 'avaliação',
  after: ', nunca antes.',
};

/* --------------------------------------------------------------- o espaço */
export const space = {
  title: 'A clínica na Assunção.',
  titleMuted: `Produtos, sala de procedimentos e cantinho do café no ${site.address.complement} da ${site.address.street.replace(/, \d+$/, '')}.`,
};

/* --------------------------------------------------------------- como funciona */
export const steps = {
  title: 'Sua avaliação em 4 etapas',
  items: [
    { title: 'Agende pelo link ou WhatsApp', text: 'Escolha um horário na agenda online ou converse com a clínica pelo WhatsApp.' },
    { title: 'Converse e seja avaliada', text: 'A Dra. Paula ouve o que você deseja e avalia pele, rosto ou corpo com calma.' },
    { title: 'Receba o protocolo indicado', text: 'Você conhece as etapas e os cuidados de cada opção antes de decidir.' },
    { title: 'Siga com acompanhamento', text: 'Orientações para casa e acompanhamento ao longo do protocolo escolhido.' },
  ],
};

/* --------------------------------------------------------------- depoimentos
 * Somente depoimentos com autorização por escrito da paciente.
 * Exemplo de item: { quote: '...', name: 'Primeiro nome e inicial', authorizedAt: '2026-12-01' }
 */
export const testimonials: { quote: string; name: string; authorizedAt: string }[] = [];

/* --------------------------------------------------------------- perguntas */
export const faq = {
  title: 'Perguntas frequentes sobre a clínica',
  lead: 'Respostas gerais. A indicação para o seu caso é feita sempre na avaliação.',
  items: [
    {
      q: 'Como funciona a avaliação?',
      a: 'É uma conversa individual com a Dra. Paula. Ela ouve o que você deseja, avalia a pele, o rosto ou o corpo e explica as possibilidades antes de qualquer indicação.',
    },
    {
      q: 'Como agendar?',
      a: 'Pela agenda online, escolhendo o horário, ou pelo WhatsApp da clínica. Se preferir, deixe seu contato no formulário e a clínica retorna.',
    },
    {
      q: 'Onde a clínica fica?',
      a: `Na ${site.address.street}, ${site.address.complement}, bairro ${site.address.district}, em ${site.address.city} (${site.address.state}), CEP ${site.address.postalCode}.`,
    },
    {
      q: 'Quais formas de contato existem?',
      a: `Agenda online, WhatsApp, telefone ${site.contact.phoneDisplay} e Instagram ${site.contact.instagram.handle}.`,
    },
    {
      q: 'O procedimento é definido na primeira conversa?',
      a: 'Só quando faz sentido para você. A avaliação vem primeiro; depois você recebe a indicação explicada e decide com tranquilidade.',
    },
    {
      q: 'Como saber qual cuidado é indicado para mim?',
      a: 'Somente com avaliação profissional. Cada pele e cada corpo respondem de um jeito, por isso quem define o cuidado é a Dra. Paula, junto com você.',
    },
  ],
};

/* --------------------------------------------------------------- contato */
export const contact = {
  title: 'Endereço, horários e contato',
  lead: 'Agende pela agenda online, pelo WhatsApp ou por telefone.',
  formTitle: 'Prefere que a clínica fale com você?',
  formLead: 'Deixe nome e WhatsApp; a clínica retorna o contato.',
  interests: services.items.map((s) => s.name).concat(['Ainda não sei, quero orientação']),
};

/* --------------------------------------------------------------- fechamento */
export const closing = {
  title: 'Agende sua avaliação com a Dra. Paula',
  line: 'Escolha o horário na agenda online. A avaliação é o primeiro passo de qualquer cuidado.',
  lede: 'Estética facial e corporal em São Bernardo do Campo.',
};
