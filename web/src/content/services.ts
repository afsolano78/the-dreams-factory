/**
 * Página de Servicios: una sola página con los cuatro servicios en bloques (cada uno con su #ancla, a la que
 * enlaza la portada), tabla comparativa, cómo trabajamos y preguntas frecuentes. ES y EN.
 *
 * Origen de los textos: los de la web antigua, revisados en la propuesta (descripciones, «Incluye» de la
 * organización integral y «Cómo trabajamos»). PENDIENTE DE CONFIRMAR con Bea y Vane: las listas «Incluye» de
 * Diseño, Coordinación y Celebraciones, la tabla comparativa y las preguntas frecuentes, redactadas a partir
 * de esos textos y de los datos confirmados (zona de trabajo, bodas a distancia, presupuesto a medida).
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/routes';
import fotoIntegral from '../assets/photos/hero/3-aym-confeti.jpg';
import fotoDiseno from '../assets/photos/servicio-diseno-decoracion.jpg';
import fotoDiaB from '../assets/photos/servicio-dia-b.jpg';
import fotoCelebraciones from '../assets/photos/servicio-celebraciones.jpg';

type Photo = { src: ImageMetadata; alt: string };

export type ServiceBlock = {
  /** Debe coincidir con el `anchor` del servicio en la portada (home.ts). */
  anchor: string;
  title: string;
  /** Nivel de acompañamiento (vacío en Celebraciones, que va aparte). */
  level?: string;
  /** Una frase para los accesos directos de la introducción. */
  short: string;
  paragraphs: string[];
  forWhom: string;
  includes: string[];
  photo: Photo;
  focus?: string;
  /** Va aparte: no es un grado de ayuda para una boda, sino otro tipo de celebración. */
  apart?: boolean;
};

export type ServicesContent = {
  meta: { title: string; description: string };
  intro: { eyebrow: string; title: string; lead: string; jumpLabel: string };
  labels: { forWhom: string; includes: string; cta: string; apart: string };
  services: ServiceBlock[];
  compare: { eyebrow: string; title: string; note: string; rows: { label: string; has: [boolean, boolean, boolean] }[]; yes: string; no: string };
  process: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
};

export const servicesContent: Record<Lang, ServicesContent> = {
  es: {
    meta: {
      title: 'Servicios de wedding planner en Asturias · The Dreams Factory',
      description: 'Organización integral, diseño y decoración, coordinación del día B y celebraciones a medida en Asturias. Os acompañamos tanto como necesitéis.',
    },
    intro: {
      eyebrow: 'Servicios',
      title: 'Os acompañamos\n*tanto como necesitéis*',
      lead: 'Cada boda es distinta, y también lo que cada pareja necesita de nosotras. Estas son las formas en que podemos acompañaros.',
      jumpLabel: 'Ir a',
    },
    labels: { forWhom: 'Para quién es', includes: 'Qué incluye', cta: 'Contadnos vuestra idea', apart: '¿Celebráis otra cosa?' },
    services: [
      {
        anchor: 'organizacion-integral',
        title: 'Organización integral',
        level: 'Todo, de principio a fin',
        short: 'De la primera idea al último baile.',
        paragraphs: [
          'Trabajamos con vosotros, de la mano, para construir la boda que imagináis. La clave es un equipo de profesionales que funcione como uno solo, y conocer bien el sector os ahorra dudas, tiempo y estrés en un terreno nuevo para vosotros.',
          'Buscamos el lugar, seleccionamos a los proveedores, diseñamos la ambientación, cuidamos el presupuesto y el calendario, y coordinamos el día completo. La última palabra, siempre, es vuestra.',
        ],
        forWhom: 'Para parejas que quieren disfrutar de los preparativos sin cargar con ellos, o que viven lejos y necesitan a alguien de confianza aquí.',
        includes: [
          'Planificación y calendario',
          'Búsqueda del lugar',
          'Selección y contratación de proveedores',
          'Control del presupuesto',
          'Diseño y decoración',
          'Coordinación del día B',
          'Plan B y kit de emergencia',
        ],
        photo: { src: fotoIntegral, alt: 'A y M salen de la iglesia bajo una lluvia de pétalos lanzados por sus invitados.' },
        focus: '50% 45%',
      },
      {
        anchor: 'diseno-y-decoracion',
        title: 'Diseño y decoración',
        level: 'La parte creativa',
        short: 'Que se note que es vuestra boda.',
        paragraphs: [
          'Lo tenéis casi todo, pero falta vuestra esencia: esos detalles que hacen que todos digan «esto es muy vuestro».',
          'Diseñamos la imagen de la boda a partir de vuestra historia, desde la papelería y el seating hasta las flores, la luz y cada rincón.',
        ],
        forWhom: 'Para parejas que ya tienen organizado lo principal y quieren una ambientación con personalidad, coherente de principio a fin.',
        includes: [
          'Concepto y propuesta de estilo',
          'Papelería y seating',
          'Flores y ambientación',
          'Iluminación y rincones especiales',
          'Montaje de la decoración',
        ],
        photo: { src: fotoDiseno, alt: 'Novia con ramo silvestre junto a un arco floral.' },
      },
      {
        anchor: 'coordinacion-dia-b',
        title: 'Coordinación del día B',
        level: 'El gran día',
        short: 'Para que solo tengáis que disfrutarlo.',
        paragraphs: [
          'Y llegó el día. Lo habéis preparado todo, pero necesitáis a alguien que sepa lo que va a pasar en cada momento para que nada falle.',
          'Semanas antes repasamos cada detalle con vosotros y con los proveedores; el día de la boda coordinamos horarios, montajes, proveedores e invitados. Vosotros seréis los invitados más especiales.',
        ],
        forWhom: 'Para parejas que lo han organizado todo y quieren vivir el día tranquilas, sin estar pendientes de horarios ni de proveedores.',
        includes: [
          'Reunión de repaso semanas antes',
          'Cronograma del día',
          'Contacto con todos los proveedores',
          'Coordinación de horarios, montajes e invitados',
          'Plan B y kit de emergencia',
        ],
        photo: { src: fotoDiaB, alt: 'La novia ríe con sus amigas mientras se prepara.' },
      },
      {
        anchor: 'celebraciones',
        title: 'Celebraciones y momentos',
        short: 'Pedidas, aniversarios y otras ocasiones.',
        apart: true,
        paragraphs: [
          'Un picnic al atardecer, una cena a la luz de las velas en un jardín, una merienda frente al acantilado, una fiesta para unos abuelos que celebran cincuenta años juntos o una pedida a la que no podrá decir que no.',
          'Contadnos vuestra idea y la construimos juntos.',
        ],
        forWhom: 'Para quien quiere celebrar algo especial que no es una boda y busca que salga perfecto, sin preocuparse de nada.',
        includes: [
          'Idea y concepto de la celebración',
          'Búsqueda del lugar',
          'Proveedores y decoración',
          'Coordinación el mismo día',
        ],
        photo: { src: fotoCelebraciones, alt: 'Mesa decorada con flores y velas al aire libre.' },
      },
    ],
    compare: {
      eyebrow: 'Comparativa',
      title: 'Qué incluye *cada servicio*',
      note: 'Cada boda se presupuesta a medida: si necesitáis algo entre medias, lo adaptamos.',
      yes: 'Incluido',
      no: 'No incluido',
      rows: [
        { label: 'Planificación, calendario y presupuesto', has: [true, false, false] },
        { label: 'Búsqueda del lugar y de proveedores', has: [true, false, false] },
        { label: 'Diseño y decoración', has: [true, true, false] },
        { label: 'Coordinación del día B', has: [true, false, true] },
        { label: 'Plan B y kit de emergencia', has: [true, false, true] },
      ],
    },
    process: {
      eyebrow: 'Cómo trabajamos',
      title: 'Paso a paso, *siempre juntos*',
      steps: [
        { title: 'Un café para conocernos', text: 'En persona o por videollamada. Nos contáis vuestra historia, vuestras ideas y lo que os preocupa.' },
        { title: 'Una propuesta a medida', text: 'Con el servicio que mejor encaja con vosotros y un presupuesto claro.' },
        { title: 'Diseño y planificación', text: 'Calendario, proveedores, bocetos y decisiones, siempre juntos y sin prisas.' },
        { title: 'El gran día', text: 'Coordinamos cada momento, con plan B y kit de emergencia, para que solo tengáis que disfrutar.' },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que más *nos preguntáis*',
      items: [
        { q: '¿Dónde trabajáis?', a: 'Sobre todo en Asturias, y también en León y zonas cercanas. Si vuestra boda es en otro sitio, contádnoslo y lo vemos.' },
        { q: 'Vivimos fuera, ¿podemos contar con vosotras?', a: 'Claro. Si vivís lejos, somos vuestros ojos y vuestras manos: visitamos, probamos, escuchamos y os lo contamos todo, con bocetos y videollamadas.' },
        { q: '¿Cuánto cuesta?', a: 'Cada boda es distinta, así que cada presupuesto también. Después de un primer café para conoceros, os preparamos una propuesta a medida con un presupuesto claro.' },
        { q: '¿Podemos elegir nosotros a los proveedores?', a: 'Siempre. Os recomendamos a los profesionales que mejor encajan con vuestra idea, pero la última palabra es vuestra.' },
      ],
    },
  },
  en: {
    meta: {
      title: 'Wedding planning services in Asturias, Spain · The Dreams Factory',
      description: 'Full planning, design & styling, wedding-day coordination and bespoke celebrations in Asturias. We’re by your side as much as you need.',
    },
    intro: {
      eyebrow: 'Services',
      title: 'By your side,\n*as much as you need*',
      lead: 'Every wedding is different, and so is what each couple needs from us. These are the ways we can be there for you.',
      jumpLabel: 'Go to',
    },
    labels: { forWhom: 'Who it’s for', includes: 'What’s included', cta: 'Tell us your idea', apart: 'Celebrating something else?' },
    services: [
      {
        anchor: 'full-planning',
        title: 'Full planning',
        level: 'Everything, start to finish',
        short: 'From the first idea to the last dance.',
        paragraphs: [
          'We work hand in hand with you to create the wedding you imagine. The secret is a team of professionals working as one, and knowing the industry inside out saves you doubts, time and stress in unfamiliar territory.',
          'We find the venue, choose the suppliers, design the styling, look after the budget and the timeline, and coordinate the whole day. The final word is always yours.',
        ],
        forWhom: 'For couples who want to enjoy the run-up without carrying the load, or who live far away and need someone they trust on the ground.',
        includes: [
          'Planning and timeline',
          'Venue search',
          'Supplier selection and booking',
          'Budget management',
          'Design and styling',
          'Wedding-day coordination',
          'Plan B and emergency kit',
        ],
        photo: { src: fotoIntegral, alt: 'A and M leave the church under a shower of petals thrown by their guests.' },
        focus: '50% 45%',
      },
      {
        anchor: 'design-and-styling',
        title: 'Design & styling',
        level: 'The creative side',
        short: 'So it feels unmistakably yours.',
        paragraphs: [
          'You have almost everything in place, but your essence is missing: the details that make everyone say “this is so them”.',
          'We design the look of your wedding around your story, from stationery and seating plan to flowers, lighting and every corner.',
        ],
        forWhom: 'For couples who have the essentials planned and want styling with personality, consistent from start to finish.',
        includes: [
          'Concept and style proposal',
          'Stationery and seating plan',
          'Flowers and styling',
          'Lighting and special corners',
          'Setting up the décor',
        ],
        photo: { src: fotoDiseno, alt: 'A bride with a wildflower bouquet beside a floral arch.' },
      },
      {
        anchor: 'wedding-day-coordination',
        title: 'Wedding-day coordination',
        level: 'The big day',
        short: 'So all you have to do is enjoy it.',
        paragraphs: [
          'The day has come. You’ve planned it all, but you need someone who knows exactly what will happen at every moment so that nothing goes wrong.',
          'A few weeks before, we go over every detail with you and your suppliers; on the day we coordinate timings, set-up, suppliers and guests. All you have to do is be the most special guests at your own wedding.',
        ],
        forWhom: 'For couples who have planned everything and want to live the day calmly, without keeping an eye on timings or suppliers.',
        includes: [
          'Review meeting a few weeks before',
          'Running order for the day',
          'Liaison with every supplier',
          'Coordination of timings, set-up and guests',
          'Plan B and emergency kit',
        ],
        photo: { src: fotoDiaB, alt: 'The bride laughing with her friends while getting ready.' },
      },
      {
        anchor: 'celebrations',
        title: 'Proposals & celebrations',
        short: 'Proposals, anniversaries and other occasions.',
        apart: true,
        paragraphs: [
          'A sunset picnic, a candlelit dinner in a garden, afternoon tea on a clifftop, a party for grandparents celebrating fifty years together, or a proposal that’s impossible to refuse.',
          'Tell us your idea and we’ll build it together.',
        ],
        forWhom: 'For anyone who wants to celebrate something special that isn’t a wedding and wants it to be perfect, without worrying about a thing.',
        includes: [
          'Idea and concept',
          'Venue search',
          'Suppliers and styling',
          'Coordination on the day',
        ],
        photo: { src: fotoCelebraciones, alt: 'An outdoor table decorated with flowers and candles.' },
      },
    ],
    compare: {
      eyebrow: 'At a glance',
      title: 'What *each service* includes',
      note: 'Every wedding is quoted individually: if you need something in between, we’ll adapt.',
      yes: 'Included',
      no: 'Not included',
      rows: [
        { label: 'Planning, timeline and budget', has: [true, false, false] },
        { label: 'Venue and supplier search', has: [true, false, false] },
        { label: 'Design and styling', has: [true, true, false] },
        { label: 'Wedding-day coordination', has: [true, false, true] },
        { label: 'Plan B and emergency kit', has: [true, false, true] },
      ],
    },
    process: {
      eyebrow: 'How we work',
      title: 'Step by step, *always together*',
      steps: [
        { title: 'A coffee to get to know each other', text: 'In person or on a video call. Tell us your story, your ideas and anything that worries you.' },
        { title: 'A tailored proposal', text: 'With the service that suits you best and a clear quote.' },
        { title: 'Design and planning', text: 'Timeline, suppliers, sketches and decisions, always together and never rushed.' },
        { title: 'The big day', text: 'We coordinate every moment, plan B and emergency kit included, so all you have to do is enjoy it.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What you *ask us most*',
      items: [
        { q: 'Where do you work?', a: 'Mainly in Asturias, and also in León and nearby areas. If your wedding is somewhere else, tell us and we’ll see.' },
        { q: 'We live abroad. Can you still help us?', a: 'Of course. If you live far away, we become your eyes and hands: we visit, taste, listen and keep you posted on everything, with sketches and video calls.' },
        { q: 'How much does it cost?', a: 'Every wedding is different, and so is every quote. After a first coffee to get to know you, we prepare a tailored proposal with a clear quote.' },
        { q: 'Can we choose our own suppliers?', a: 'Always. We recommend the professionals who best fit your idea, but the final word is yours.' },
      ],
    },
  },
};
