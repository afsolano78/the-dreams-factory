/**
 * Página de Servicios: una sola página con los cuatro servicios en bloques (cada uno con su #ancla, a la que
 * enlaza la portada), tabla comparativa, cómo trabajamos y preguntas frecuentes. ES y EN.
 *
 * Origen de los textos: descripción y «Qué incluye» de los tres servicios de boda, de Bea y Vane (octubre de 2026);
 * «Para quién es» y «Cómo trabajamos», de la web antigua revisada en la propuesta. PENDIENTE DE CONFIRMAR con
 * Bea y Vane: Celebraciones, la tabla comparativa y las preguntas frecuentes.
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
      description: 'Organización integral, diseño y coordinación del día B, coordinación del día B y celebraciones a medida en Asturias. Os acompañamos tanto como necesitéis.',
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
          'Nos encargamos de planificar, organizar y coordinar vuestra boda de principio a fin, acompañándoos en la toma de decisiones, la selección de proveedores y la definición estética, hasta la ejecución del evento. Una forma diferente de llevar tanto los preparativos como el día B.',
        ],
        forWhom: 'Para parejas que quieren disfrutar de los preparativos sin cargar con ellos, o que viven lejos y necesitan a alguien de confianza aquí.',
        includes: [
          'Definición del presupuesto y planificación general',
          'Búsqueda, selección y contratación de proveedores',
          'Gestión de visitas, reuniones, presupuestos y contratos',
          'Organización de ceremonia, banquete y actividades',
          'Diseño y concepto estético de la boda',
          'Decoración, flores, papelería e iluminación, según el alcance contratado',
          'Coordinación de proveedores y seguimiento de plazos',
          'Elaboración del cronograma y organización de montajes',
          'Coordinación presencial durante la boda',
          'Resolución de imprevistos y supervisión del desmontaje',
        ],
        photo: { src: fotoIntegral, alt: 'A y M salen de la iglesia bajo una lluvia de pétalos lanzados por sus invitados.' },
        focus: '50% 45%',
      },
      {
        anchor: 'diseno-y-decoracion',
        title: 'Diseño y coordinación del día B',
        level: 'La parte creativa',
        short: 'Que se note que es vuestra boda.',
        paragraphs: [
          'Creamos el concepto estético de vuestra boda y coordinamos su materialización, supervisando los elementos decorativos y la ejecución del diseño para conseguir un resultado coherente y cuidado.',
        ],
        forWhom: 'Para parejas que ya tienen organizado lo principal y quieren una ambientación con personalidad, coherente de principio a fin.',
        includes: [
          'Reunión inicial para conocer el estilo y las preferencias',
          'Creación del concepto creativo, paleta de colores y estilo visual',
          'Diseño de la decoración, mesas, ceremonia y espacios',
          'Selección de flores, materiales, iluminación y elementos decorativos',
          'Propuesta de referencias visuales y moodboard',
          'Asesoramiento estético para papelería, señalética y detalles',
          'Coordinación de los proveedores relacionados con el diseño',
          'Supervisión del montaje decorativo',
          'Elaboración del cronograma del evento',
          'Coordinación del día de la boda, proveedores e incidencias',
        ],
        photo: { src: fotoDiseno, alt: 'Novia con ramo silvestre junto a un arco floral.' },
      },
      {
        anchor: 'coordinacion-dia-b',
        title: 'Coordinación del día B',
        level: 'El gran día',
        short: 'Para que solo tengáis que disfrutarlo.',
        paragraphs: [
          'Os acompañamos en la fase final de vuestra organización, revisamos los servicios contratados y coordinamos los tiempos, proveedores y momentos del evento para que disfrutéis del día sin preocuparos por la logística.',
        ],
        forWhom: 'Para parejas que lo han organizado todo y quieren vivir el día tranquilas, sin estar pendientes de horarios ni de proveedores.',
        includes: [
          'Reunión para conocer el estado de la organización',
          'Revisión de proveedores ya contratados',
          'Recopilación de contactos, horarios, contratos y necesidades',
          'Revisión del cronograma y elaboración del timing definitivo',
          'Confirmación de horarios y coordinación con proveedores',
          'Organización de entradas, ceremonia, cóctel, banquete y momentos especiales',
          'Supervisión del montaje y comprobación de los espacios',
          'Coordinación presencial durante la boda',
          'Resolución de incidencias y cambios de última hora',
          'Control de tiempos y comunicación entre proveedores',
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
        { label: 'Coordinación del día B', has: [true, true, true] },
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
      description: 'Full planning, design & wedding-day coordination, wedding-day coordination and bespoke celebrations in Asturias. We’re by your side as much as you need.',
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
          'We plan, organise and coordinate your wedding from start to finish, guiding you through every decision, the choice of suppliers and the look and feel, right through to the day itself. A different way to handle both the run-up and the big day.',
        ],
        forWhom: 'For couples who want to enjoy the run-up without carrying the load, or who live far away and need someone they trust on the ground.',
        includes: [
          'Setting the budget and overall planning',
          'Finding, choosing and booking suppliers',
          'Handling visits, meetings, quotes and contracts',
          'Organising the ceremony, reception and activities',
          'Design and visual concept of the wedding',
          'Décor, flowers, stationery and lighting, depending on the agreed scope',
          'Supplier coordination and deadline tracking',
          'Running order and set-up planning',
          'On-site coordination on the wedding day',
          'Handling the unexpected and overseeing the take-down',
        ],
        photo: { src: fotoIntegral, alt: 'A and M leave the church under a shower of petals thrown by their guests.' },
        focus: '50% 45%',
      },
      {
        anchor: 'design-and-styling',
        title: 'Design & wedding-day coordination',
        level: 'The creative side',
        short: 'So it feels unmistakably yours.',
        paragraphs: [
          'We create the visual concept of your wedding and coordinate how it comes to life, overseeing the décor and the execution of the design for a consistent, beautifully finished result.',
        ],
        forWhom: 'For couples who have the essentials planned and want styling with personality, consistent from start to finish.',
        includes: [
          'An initial meeting to get to know your style and preferences',
          'Creative concept, colour palette and visual style',
          'Design of the décor, tables, ceremony and spaces',
          'Choice of flowers, materials, lighting and decorative pieces',
          'Visual references and moodboard',
          'Styling advice for stationery, signage and details',
          'Coordination of the design-related suppliers',
          'Overseeing the décor set-up',
          'Running order for the event',
          'Coordination of the wedding day, suppliers and any issues',
        ],
        photo: { src: fotoDiseno, alt: 'A bride with a wildflower bouquet beside a floral arch.' },
      },
      {
        anchor: 'wedding-day-coordination',
        title: 'Wedding-day coordination',
        level: 'The big day',
        short: 'So all you have to do is enjoy it.',
        paragraphs: [
          'We join you for the final stretch of your planning, review the services you’ve booked and coordinate the timings, suppliers and moments of the day so you can enjoy it without worrying about logistics.',
        ],
        forWhom: 'For couples who have planned everything and want to live the day calmly, without keeping an eye on timings or suppliers.',
        includes: [
          'A meeting to see where your planning stands',
          'Review of the suppliers you’ve already booked',
          'Gathering contacts, schedules, contracts and requirements',
          'Reviewing the running order and setting the final timings',
          'Confirming timings and coordinating with suppliers',
          'Organising the entrances, ceremony, cocktail hour, reception and special moments',
          'Overseeing the set-up and checking the spaces',
          'On-site coordination on the wedding day',
          'Handling issues and last-minute changes',
          'Timekeeping and communication between suppliers',
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
        { label: 'Wedding-day coordination', has: [true, true, true] },
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
