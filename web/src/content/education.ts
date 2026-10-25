/**
 * Formación: el curso «The Wedding Planner Experience» (/curso-wedding-planner) y las tutorías online
 * (/tutorias-online). ES y EN. Son públicos distintos: el curso habla de tú (futuras wedding planners) y las
 * tutorías de vosotros (parejas).
 *
 * Origen: los textos de la web antigua (formato, aula, temario y docentes del curso; la página de las tutorías),
 * actualizados con los datos confirmados: 3 ediciones (la primera en 2023) en el NH Collection Palacio de Avilés y
 * una nueva edición en preparación con inscripciones abiertas (octubre de 2026), aún sin fechas ni precio publicados;
 * tutorías a 49 € y 90 minutos. Cuando haya fechas, se añaden en `hero.status` y en la pregunta de la próxima edición.
 *
 * PENDIENTE DE CONFIRMAR con Bea y Vane: si siguen vigentes los dos extras de las tutorías (15 % y descuento al
 * contratar un servicio), cómo se reserva y se paga una tutoría y por qué plataforma, si el curso da certificado,
 * los ponentes, opiniones de alumnas y el permiso para las fotos de las ediciones (salen las alumnas).
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/routes';
import fotoPortada from '../assets/photos/curso/portada.jpg';
import fotoDia1 from '../assets/photos/curso/dia-1.jpg';
import fotoDia2 from '../assets/photos/curso/dia-2.jpg';
import fotoDia3 from '../assets/photos/curso/dia-3.jpg';
import fotoDocentes from '../assets/photos/curso/docentes.jpg';
import aula01 from '../assets/photos/curso/aula-01.jpg';
import aula02 from '../assets/photos/curso/aula-02.jpg';
import aula03 from '../assets/photos/curso/aula-03.jpg';
import aula04 from '../assets/photos/curso/aula-04.jpg';
import aula05 from '../assets/photos/curso/aula-05.jpg';
import aula06 from '../assets/photos/curso/aula-06.jpg';
import aula07 from '../assets/photos/curso/aula-07.jpg';
import aula08 from '../assets/photos/curso/aula-08.jpg';
import aula09 from '../assets/photos/curso/aula-09.jpg';
import aula10 from '../assets/photos/curso/aula-10.jpg';
import fotoJardin from '../assets/photos/nosotras-bea-vane.jpg';

type Photo = { src: ImageMetadata; alt: string };
type Qa = { q: string; a: string };

export type CourseContent = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; badge: string; status: string; cta: string; secondary: string; photo: Photo };
  forWhom: { eyebrow: string; title: string; items: string[]; features: { title: string; text: string }[] };
  days: { eyebrow: string; title: string; items: { label: string; title: string; text: string; photo: Photo }[] };
  palace: { eyebrow: string; title: string; text: string[]; gallery: Photo[] };
  syllabus: { eyebrow: string; title: string; items: string[]; talks: { title: string; text: string } };
  teachers: { eyebrow: string; title: string; text: string; cta: string; photo: Photo };
  after: { title: string; text: string };
  faq: { eyebrow: string; title: string; items: Qa[] };
  closing: { title: string; text: string; cta: string };
  gallery: { title: string; enlarge: string; close: string; prev: string; next: string; of: string };
};

export type ConsultationsContent = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; facts: string[]; cta: string; photo: Photo };
  forYou: { eyebrow: string; title: string; items: string[]; closing: string };
  how: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  topics: { eyebrow: string; title: string; text: string; items: string[] };
  includes: { eyebrow: string; title: string; price: string; priceNote: string; items: string[]; extrasTitle: string; extras: string[]; cta: string };
  about: { title: string; text: string; cta: string; photo: Photo };
  faq: { eyebrow: string; title: string; items: Qa[] };
};

const aulaEs: Photo[] = [
  { src: aula01, alt: 'Mesa de trabajo preparada en uno de los salones del palacio.' },
  { src: aula02, alt: 'Un ponente explica ante la pantalla mientras las alumnas toman notas.' },
  { src: aula03, alt: 'Las alumnas brindan en la cocina del palacio.' },
  { src: aula04, alt: 'Una alumna prepara un centro de flores.' },
  { src: aula05, alt: 'Las alumnas montan juntas una mesa en la galería acristalada.' },
  { src: aula06, alt: 'Una alumna ultima la decoración de una mesa redonda.' },
  { src: aula07, alt: 'Foto de grupo de una edición en el jardín del palacio. En blanco y negro.' },
  { src: aula08, alt: 'Mesa decorada con mantel rosa y flores en la galería.' },
  { src: aula09, alt: 'Mesa larga montada bajo los arcos de piedra del palacio.' },
  { src: aula10, alt: 'Detalle de una mesa con copas de colores y flores.' },
];
const aulaEn: Photo[] = [
  { src: aula01, alt: 'A work table set up in one of the palace’s rooms.' },
  { src: aula02, alt: 'A guest speaker explains in front of the screen while the students take notes.' },
  { src: aula03, alt: 'The students raise a toast in the palace kitchen.' },
  { src: aula04, alt: 'A student arranges a flower centrepiece.' },
  { src: aula05, alt: 'The students set a table together in the glazed gallery.' },
  { src: aula06, alt: 'A student puts the finishing touches to a round table.' },
  { src: aula07, alt: 'Group photo of one edition in the palace garden. In black and white.' },
  { src: aula08, alt: 'A table dressed with a pink cloth and flowers in the gallery.' },
  { src: aula09, alt: 'A long table set beneath the palace’s stone arches.' },
  { src: aula10, alt: 'Detail of a table with coloured glasses and flowers.' },
];

export const course: Record<Lang, CourseContent> = {
  es: {
    meta: {
      title: 'The Wedding Planner Experience · Curso de wedding planner en Asturias · The Dreams Factory',
      description: 'Curso intensivo de tres días para futuras wedding planners, impartido por Bea y Vane en el NH Collection Palacio de Avilés. Inscripciones abiertas para la nueva edición.',
    },
    hero: {
      eyebrow: 'Formación · Para futuras wedding planners',
      title: 'The Wedding Planner\n*Experience*',
      lead: 'Un curso intensivo de tres días para quienes sueñan con dedicarse a organizar bodas, impartido por nosotras en un palacio de verdad.',
      badge: 'Nueva edición · Inscripciones abiertas',
      status: 'Estamos preparando la cuarta edición y ya puedes inscribirte. Las fechas, muy pronto.',
      cta: 'Quiero inscribirme',
      secondary: 'Ver el temario',
      photo: { src: fotoPortada, alt: 'Clase del curso en uno de los salones del palacio: las alumnas, sentadas a una mesa larga con flores, siguen la explicación.' },
    },
    forWhom: {
      eyebrow: 'Para quién es',
      title: 'Si sueñas con *organizar bodas*',
      items: [
        'Quieres dedicarte a organizar bodas y no sabes por dónde empezar.',
        'Ya trabajas en eventos, hostelería o un sector cercano y quieres especializarte.',
        'Prefieres aprender de quien lo hace cada semana, con casos reales y no solo teoría.',
      ],
      features: [
        { title: 'Grupos muy reducidos', text: 'Para que la atención sea cercana y personalizada.' },
        { title: 'Tres días intensos', text: 'Intensos, pero queremos que sean inolvidables.' },
        { title: 'Un palacio como aula', text: 'Aprendes recorriendo los espacios de una boda real.' },
        { title: 'Tutoría al terminar', text: 'Una sesión solo para ti para resolver lo que quede pendiente.' },
      ],
    },
    days: {
      eyebrow: 'El formato',
      title: 'Tres días para *vivirlo por dentro*',
      items: [
        { label: 'Día 1', title: 'La primera tarde', text: 'Nos conocemos y empezamos a adentrarnos en este maravilloso mundo.', photo: { src: fotoDia1, alt: 'Una alumna sonríe sentada a la mesa de trabajo, rodeada de flores y velas.' } },
        { label: 'Día 2', title: 'El día grande', text: 'El día con más horas de clase: intenso pero ameno. Contenidos teóricos, experiencias de primera mano y ponencias de profesionales del sector, y recorremos el palacio de arriba abajo.', photo: { src: fotoDia2, alt: 'Una cocinera prepara aperitivos en la cocina del palacio.' } },
        { label: 'Día 3', title: 'La última mañana', text: 'Exprimimos las últimas horas de clase y terminamos con un broche final muy especial y a la altura.', photo: { src: fotoDia3, alt: 'Bea y Vane felicitan a una alumna en el cierre del curso.' } },
      ],
    },
    palace: {
      eyebrow: 'El aula',
      title: 'Un palacio como *aula*',
      text: [
        'La mayor parte del curso se imparte entre las paredes históricas del salón Galiana del NH Collection Palacio de Avilés, con todos los medios técnicos para que las clases sean cómodas y amenas.',
        'Pero el palacio entero es un aula: lo recorremos para explicarte de forma real cómo se desarrolla una boda completa, desde los preparativos en las habitaciones hasta la puesta en escena del baile, el montaje de barras y corners y, por supuesto, las cocinas, donde nos enseñan cómo funciona un servicio de boda.',
      ],
      gallery: aulaEs,
    },
    syllabus: {
      eyebrow: 'Temario',
      title: 'Lo que *aprenderás*',
      items: [
        'Qué es una wedding planner',
        'Los servicios que realiza una wedding planner',
        'Cómo debe relacionarse una buena wedding planner',
        'Los tipos de celebración',
        'Los proveedores de la boda',
        'La planificación y la organización de la boda',
        'El diseño',
      ],
      talks: { title: 'Ponencias de profesionales', text: 'No somos nadie sin nuestros compañeros: proveedores destacados del sector te cuentan cómo desarrollan su trabajo.' },
    },
    teachers: {
      eyebrow: 'Quién enseña',
      title: 'Nosotras, *Bea y Vane*',
      text: 'Nadie mejor que nosotras para la parte más teórica: más de 100 bodas organizadas desde 2015 y formación universitaria en wedding planning y organización de eventos.',
      cta: 'Conócenos',
      photo: { src: fotoDocentes, alt: 'Bea y Vane, con traje azul claro, en el jardín del palacio.' },
    },
    after: {
      title: 'No tenemos por qué despedirnos aquí',
      text: 'Tras el curso tendrás muchas dudas e incertidumbres. Una tutoría solo para ti servirá para compartirlas y charlar de todo lo que se te haya quedado en el tintero. ¡Queremos verte crecer!',
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que más *nos preguntáis*',
      items: [
        { q: '¿Cuándo es la próxima edición?', a: 'Estamos preparando la cuarta edición y anunciaremos las fechas muy pronto. Ya estamos recibiendo inscripciones: escríbenos y te contamos todos los detalles en cuanto estén cerrados.' },
        { q: '¿Cómo me inscribo?', a: 'Rellena el formulario de contacto eligiendo «El curso» (o pulsa «Quiero inscribirme») y nos pondremos en contacto contigo.' },
        { q: '¿Dónde se imparte?', a: 'En el NH Collection Palacio de Avilés (Asturias). Las clases son en el salón Galiana y recorremos el resto del palacio.' },
        { q: '¿Cuántas plazas hay?', a: 'Pocas: trabajamos con grupos muy reducidos para que la atención sea cercana y personalizada.' },
        { q: '¿Qué pasa cuando termina?', a: 'Tienes una tutoría individual con nosotras para resolver las dudas que te surjan después.' },
      ],
    },
    closing: {
      title: '¿Te apuntas a la *nueva edición*?',
      text: 'Estamos recibiendo inscripciones. Escríbenos y te contamos fechas, plazas y todos los detalles en cuanto estén cerrados.',
      cta: 'Quiero inscribirme',
    },
    gallery: { title: 'El aula', enlarge: 'Ampliar la foto', close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente', of: 'de' },
  },
  en: {
    meta: {
      title: 'The Wedding Planner Experience · Wedding planner course in Asturias, Spain · The Dreams Factory',
      description: 'An intensive three-day course for future wedding planners, taught by Bea and Vane at NH Collection Palacio de Avilés. Registration is open for the new edition.',
    },
    hero: {
      eyebrow: 'Education · For future wedding planners',
      title: 'The Wedding Planner\n*Experience*',
      lead: 'An intensive three-day course for anyone who dreams of planning weddings for a living, taught by us in a real palace.',
      badge: 'New edition · Registration open',
      status: 'We’re preparing the fourth edition and you can already sign up. Dates coming very soon.',
      cta: 'I want to sign up',
      secondary: 'See the syllabus',
      photo: { src: fotoPortada, alt: 'A class in one of the palace’s rooms: the students, seated at a long table with flowers, follow the lesson.' },
    },
    forWhom: {
      eyebrow: 'Who it’s for',
      title: 'If you dream of *planning weddings*',
      items: [
        'You want to plan weddings for a living and don’t know where to start.',
        'You already work in events, hospitality or a related field and want to specialise.',
        'You’d rather learn from people who do it every week, with real cases and not just theory.',
      ],
      features: [
        { title: 'Very small groups', text: 'So the attention is close and personal.' },
        { title: 'Three intense days', text: 'Intense, but we want them to be unforgettable.' },
        { title: 'A palace as a classroom', text: 'You learn by walking through the spaces of a real wedding.' },
        { title: 'A consultation afterwards', text: 'A session just for you to sort out anything left pending.' },
      ],
    },
    days: {
      eyebrow: 'The format',
      title: 'Three days to *see it from the inside*',
      items: [
        { label: 'Day 1', title: 'The first afternoon', text: 'We get to know each other and start exploring this wonderful world.', photo: { src: fotoDia1, alt: 'A student smiles, seated at the work table among flowers and candles.' } },
        { label: 'Day 2', title: 'The big day', text: 'The day with the most class hours: intense but enjoyable. Theory, first-hand experiences and talks by industry professionals, and we explore the palace from top to bottom.', photo: { src: fotoDia2, alt: 'A cook prepares canapés in the palace kitchen.' } },
        { label: 'Day 3', title: 'The last morning', text: 'We make the most of the last class hours and finish with a very special closing worthy of the occasion.', photo: { src: fotoDia3, alt: 'Bea and Vane congratulate a student at the end of the course.' } },
      ],
    },
    palace: {
      eyebrow: 'The classroom',
      title: 'A palace as a *classroom*',
      text: [
        'Most of the course takes place within the historic walls of the Galiana room at NH Collection Palacio de Avilés, with all the technical resources to make the classes comfortable and enjoyable.',
        'But the whole palace is a classroom: we walk through it to show you, for real, how a complete wedding unfolds, from getting ready in the rooms to staging the first dance, setting up bars and food corners and, of course, the kitchens, where they show us how a wedding service works.',
      ],
      gallery: aulaEn,
    },
    syllabus: {
      eyebrow: 'Syllabus',
      title: 'What you’ll *learn*',
      items: [
        'What a wedding planner is',
        'The services a wedding planner provides',
        'How a good wedding planner builds relationships',
        'Types of celebration',
        'Wedding suppliers',
        'Planning and organising the wedding',
        'Design',
      ],
      talks: { title: 'Talks by professionals', text: 'We’re nothing without our colleagues: leading suppliers in the industry tell you how they work.' },
    },
    teachers: {
      eyebrow: 'Who teaches',
      title: 'Us, *Bea and Vane*',
      text: 'Who better than us for the theory: more than 100 weddings planned since 2015 and university training in wedding planning and event management.',
      cta: 'Meet us',
      photo: { src: fotoDocentes, alt: 'Bea and Vane, in light blue suits, in the palace garden.' },
    },
    after: {
      title: 'This doesn’t have to be goodbye',
      text: 'After the course you’ll have lots of questions and doubts. A consultation just for you will help you share them and talk through anything left unsaid. We want to see you grow!',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What you *ask us most*',
      items: [
        { q: 'When is the next edition?', a: 'We’re preparing the fourth edition and will announce the dates very soon. Registration is already open: write to us and we’ll give you all the details as soon as they’re confirmed.' },
        { q: 'How do I sign up?', a: 'Fill in the contact form choosing “The course” (or press “I want to sign up”) and we’ll get in touch with you.' },
        { q: 'Where does it take place?', a: 'At NH Collection Palacio de Avilés (Asturias, Spain). Classes are held in the Galiana room and we explore the rest of the palace.' },
        { q: 'How many places are there?', a: 'Few: we work with very small groups so the attention is close and personal.' },
        { q: 'What happens when it ends?', a: 'You have a one-to-one consultation with us to sort out any questions that come up afterwards.' },
      ],
    },
    closing: {
      title: 'Will you join *the new edition*?',
      text: 'Registration is open. Write to us and we’ll tell you about dates, places and every detail as soon as they’re confirmed.',
      cta: 'I want to sign up',
    },
    gallery: { title: 'The classroom', enlarge: 'Enlarge photo', close: 'Close', prev: 'Previous photo', next: 'Next photo', of: 'of' },
  },
};

export const consultations: Record<Lang, ConsultationsContent> = {
  es: {
    meta: {
      title: 'Tutorías online para organizar vuestra boda · The Dreams Factory',
      description: '¿Organizáis vuestra boda por vuestra cuenta? Una sesión de 90 minutos por videollamada con Bea y Vane para resolver dudas y ordenar ideas. 49 €.',
    },
    hero: {
      eyebrow: 'Tutorías online · Para parejas',
      title: 'Un café con nosotras para\n*ordenar vuestra boda*',
      lead: 'Lo estáis organizando vosotros, pero os vendría bien la opinión de alguien que lo hace cada semana. Una sesión por videollamada para resolver dudas y poner orden.',
      facts: ['49 €', '90 minutos', 'Por videollamada'],
      cta: 'Reservar mi tutoría',
      photo: { src: fotoJardin, alt: 'Vane, a la izquierda, y Bea sonríen sentadas a una mesa preparada con velas, frutas de otoño y flores en un jardín.' },
    },
    forYou: {
      eyebrow: '¿Es para vosotros?',
      title: 'Os habéis embarcado en algo *precioso*',
      items: [
        'Tenéis cientos de ideas: una carpeta en el ordenador llena de imágenes, otra en el móvil, tableros de Pinterest…',
        'Tenéis un Excel de presupuestos lleno de interrogantes.',
        'Habéis pensado en contar con ayuda profesional, pero creéis que no es para vosotros: solo necesitáis unos consejos para recolocar las ideas y seguir por vuestra cuenta.',
        'Habéis cambiado de planes y no sabéis por dónde empezar ni qué posibilidades hay.',
      ],
      closing: 'Con nuestras tutorías tendréis la opinión de expertas en un terreno que no domináis. Por eso hemos creado algo para vosotros.',
    },
    how: {
      eyebrow: 'Cómo funciona',
      title: 'Tres pasos, *sin complicaciones*',
      steps: [
        { title: 'Nos escribís', text: 'Elegís la mañana o la tarde que mejor os venga, también en fin de semana.' },
        { title: 'Preparamos la sesión', text: 'Antes del café intercambiamos unos emails o una llamada para que nos contéis vuestras inquietudes. Así llegamos preparadas para dar respuesta a todo.' },
        { title: 'Un café con nosotras', text: 'Os ponéis cómodos, os servís un buen café y charlamos por videollamada. Escuchamos todas vuestras ideas y dudas, y tomamos nota de todo para darle forma.' },
      ],
    },
    topics: {
      eyebrow: 'De qué hablamos',
      title: 'Vosotros *decidís*',
      text: 'Podemos tratar un tema concreto o dejar la charla abierta y resolver vuestra lista de dudas.',
      items: ['La decoración', 'Cómo elegir proveedores', 'El presupuesto', 'La organización del día B', 'Charla libre'],
    },
    includes: {
      eyebrow: 'Qué incluye',
      title: 'Todo lo que *os llevaréis*',
      price: '49 €',
      priceNote: 'por tutoría',
      items: [
        'Una sesión personalizada de orientación de una hora y media (aunque no estaremos pendientes del reloj).',
        'La preparación previa por email o llamada, para personalizar la tutoría.',
        'Material digital sobre lo que tratemos: dosieres, plantillas y listados.',
      ],
      extrasTitle: 'Y además',
      extras: [
        'Un 15 % de descuento en las siguientes tutorías.',
        'Si después contratáis la organización integral, el diseño o la coordinación, os descontamos lo invertido en tutorías.',
      ],
      cta: 'Reservar mi tutoría',
    },
    about: {
      title: '¿Os apetece *conocernos*?',
      text: 'Aunque contamos con un equipo mayor, al frente de The Dreams Factory estamos Bea y Vane. Así nos gusta que nos llaméis, porque así de cerca os sentimos. Estamos especializadas en protocolo, organización de eventos y wedding planning, con títulos universitarios por la Universidad Camilo José Cela, entre otras formaciones.',
      cta: 'Conócenos',
      photo: { src: fotoDocentes, alt: 'Bea y Vane, con traje azul claro, en el jardín de un palacio.' },
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que más *nos preguntáis*',
      items: [
        { q: '¿Cuánto dura una tutoría?', a: 'Hora y media, aunque no estaremos pendientes del reloj: si el café se alarga, se alarga.' },
        { q: '¿Puede ser en fin de semana?', a: 'Sí. Buscamos juntos la mañana o la tarde que mejor os venga.' },
        { q: '¿Y si después queremos que nos ayudéis con todo?', a: 'Encantadas. Si contratáis la organización integral, el diseño o la coordinación, os descontamos lo que hayáis invertido en tutorías.' },
      ],
    },
  },
  en: {
    meta: {
      title: 'Online wedding planning consultations · The Dreams Factory',
      description: 'Planning your wedding yourselves? A 90-minute video call with Bea and Vane to answer your questions and put your ideas in order. €49.',
    },
    hero: {
      eyebrow: 'Online consultations · For couples',
      title: 'A coffee with us to\n*put your wedding in order*',
      lead: 'You’re planning it yourselves, but you’d love the opinion of people who do it every week. A video call to answer your questions and bring some order.',
      facts: ['€49', '90 minutes', 'By video call'],
      cta: 'Book my consultation',
      photo: { src: fotoJardin, alt: 'Vane, on the left, and Bea smile, seated at a table set with candles, autumn fruit and flowers in a garden.' },
    },
    forYou: {
      eyebrow: 'Is it for you?',
      title: 'You’ve set out on something *beautiful*',
      items: [
        'You have hundreds of ideas: a folder of images on your computer, another on your phone, Pinterest boards…',
        'You have a budget spreadsheet full of question marks.',
        'You’ve thought about getting professional help but feel it isn’t for you: you just need some advice to rearrange your ideas and carry on yourselves.',
        'Your plans have changed and you don’t know where to start or what the options are.',
      ],
      closing: 'Our consultations give you the opinion of experts in an area you don’t know well. That’s why we created something for you.',
    },
    how: {
      eyebrow: 'How it works',
      title: 'Three easy *steps*',
      steps: [
        { title: 'You write to us', text: 'You choose the morning or afternoon that suits you best, weekends included.' },
        { title: 'We prepare the session', text: 'Before the coffee we exchange a few emails or have a quick call so you can tell us what’s on your mind. That way we arrive ready to answer everything.' },
        { title: 'A coffee with us', text: 'Get comfortable, pour yourselves a good coffee and we chat by video call. We listen to all your ideas and questions and take note of everything to give it shape.' },
      ],
    },
    topics: {
      eyebrow: 'What we talk about',
      title: 'You *decide*',
      text: 'We can focus on one topic or keep the chat open and go through your list of questions.',
      items: ['Styling', 'Choosing suppliers', 'The budget', 'Organising the big day', 'An open chat'],
    },
    includes: {
      eyebrow: 'What’s included',
      title: 'Everything *you’ll take away*',
      price: '€49',
      priceNote: 'per consultation',
      items: [
        'A personalised one-and-a-half-hour guidance session (though we won’t be watching the clock).',
        'Preparation beforehand by email or phone, to tailor the consultation.',
        'Digital material on what we discuss: guides, templates and checklists.',
      ],
      extrasTitle: 'And also',
      extras: [
        '15% off your next consultations.',
        'If you later hire us for full planning, design or coordination, we’ll deduct what you spent on consultations.',
      ],
      cta: 'Book my consultation',
    },
    about: {
      title: 'Would you like to *meet us*?',
      text: 'Although we have a larger team, The Dreams Factory is led by Bea and Vane. That’s what we like you to call us, because that’s how close we feel to you. We specialise in protocol, event management and wedding planning, with university qualifications from Camilo José Cela University, among other training.',
      cta: 'Meet us',
      photo: { src: fotoDocentes, alt: 'Bea and Vane, in light blue suits, in a palace garden.' },
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What you *ask us most*',
      items: [
        { q: 'How long is a consultation?', a: 'An hour and a half, though we won’t be watching the clock: if the coffee runs over, it runs over.' },
        { q: 'Can it be at the weekend?', a: 'Yes. We’ll find the morning or afternoon that suits you best.' },
        { q: 'What if we then want you to help us with everything?', a: 'We’d love to. If you hire us for full planning, design or coordination, we’ll deduct what you spent on consultations.' },
      ],
    },
  },
};
