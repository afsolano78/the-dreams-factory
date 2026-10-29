/**
 * Formación: el curso «The Wedding Planner Experience» (/curso-wedding-planner). ES y EN. Habla de tú (futuras
 * wedding planners). Las tutorías online para parejas ya no se ofrecen (octubre de 2026).
 *
 * Origen: los textos de la web antigua (formato, aula, temario y docentes), actualizados con los datos confirmados:
 * 3 ediciones (la primera en 2023) en el NH Collection Palacio de Avilés y la 4.ª el 29, 30 y 31 de enero de 2027 en
 * el Palacio de La Riega (Gijón), con inscripciones abiertas. Sin precio en la web (así lo quieren). Certificado no
 * oficial. Ponentes: los de ediciones anteriores, mientras cierran los de esta.
 *
 * PENDIENTE DE CONFIRMAR con Bea y Vane: si se mantiene la tutoría individual al terminar el curso, el número de
 * plazas, fotos del Palacio de La Riega y el permiso para las fotos y los nombres de alumnas.
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

type Photo = { src: ImageMetadata; alt: string };

/** La próxima edición: fechas (ISO) y lugar. */
export const nextEdition = { start: '2027-01-29', end: '2027-01-31', venue: 'Palacio de La Riega', city: 'Gijón', region: 'Asturias' };
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
  /** Palabras de alumnas tras el curso. */
  voices: { eyebrow: string; title: string; items: { quote: string; name: string }[] };
  faq: { eyebrow: string; title: string; items: Qa[] };
  closing: { title: string; text: string; cta: string };
  gallery: { title: string; enlarge: string; close: string; prev: string; next: string; of: string };
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
      description: 'Curso intensivo de tres días para futuras wedding planners, impartido por Bea y Vane. Nueva edición el 29, 30 y 31 de enero de 2027 en el Palacio de La Riega (Gijón). Inscripciones abiertas.',
    },
    hero: {
      eyebrow: 'Formación · Para futuras wedding planners',
      title: 'The Wedding Planner\n*Experience*',
      lead: 'Un curso intensivo de tres días para quienes sueñan con dedicarse a organizar bodas, impartido por nosotras en un palacio de verdad.',
      badge: 'Nueva edición · Inscripciones abiertas',
      status: '29, 30 y 31 de enero de 2027 · Palacio de La Riega, Gijón',
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
        'La cuarta edición se celebra en el Palacio de La Riega, en Gijón: un escenario de bodas que conocemos bien.',
        'Como en cada edición, el palacio entero es un aula: lo recorremos para explicarte de forma real cómo se desarrolla una boda completa, desde los preparativos hasta la puesta en escena del baile y el montaje de barras y corners.',
        'Las tres primeras ediciones se celebraron en el NH Collection Palacio de Avilés. Estas fotos son de ellas.',
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
      talks: { title: 'Ponencias de profesionales', text: 'No somos nadie sin nuestros compañeros: proveedores destacados del sector te cuentan cómo desarrollan su trabajo. En ediciones anteriores nos acompañaron M2 Visual Studio, Perspective, Liebling Maestro de Ceremonias, Siapro, Leymar Floristas, As de Bodas y A de Lola. Estamos cerrando los participantes de esta edición.' },
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
    voices: {
      eyebrow: 'Las alumnas',
      title: 'Lo que nos dijeron *al terminar*',
      items: [
        { quote: 'Agradeceros mucho la transparencia y la cercanía que habéis tenido desde el principio a la hora de dar detalles de vuestras herramientas de trabajo, y de explicarnos todo de manera sencilla y clara.', name: 'Lidia' },
        { quote: 'Agradeceros de corazón todo el cariño que le pusisteis a la planificación y al desarrollo del curso, porque os aseguro que se nota.', name: 'Lucía' },
        { quote: 'Mis expectativas eran muy altas porque soy muy exigente, y de verdad que no os puedo poner un pero.', name: 'María' },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que más *nos preguntáis*',
      items: [
        { q: '¿Cuándo es la próxima edición?', a: 'El 29, 30 y 31 de enero de 2027. Ya estamos recibiendo inscripciones: escríbenos y te contamos todos los detalles.' },
        { q: '¿Cómo me inscribo?', a: 'Rellena el formulario de contacto eligiendo «El curso» (o pulsa «Quiero inscribirme») y nos pondremos en contacto contigo.' },
        { q: '¿Dónde se imparte?', a: 'En el Palacio de La Riega, en Gijón (Asturias). Las tres primeras ediciones se celebraron en el NH Collection Palacio de Avilés.' },
        { q: '¿Cuántas plazas hay?', a: 'Pocas: trabajamos con grupos muy reducidos para que la atención sea cercana y personalizada.' },
        { q: '¿Hay certificado?', a: 'Sí: al terminar recibes un certificado de asistencia. No es un título oficial.' },
        { q: '¿Qué pasa cuando termina?', a: 'Tienes una tutoría individual con nosotras para resolver las dudas que te surjan después.' },
      ],
    },
    closing: {
      title: '¿Te apuntas a la *nueva edición*?',
      text: '29, 30 y 31 de enero de 2027, en el Palacio de La Riega (Gijón). Estamos recibiendo inscripciones: escríbenos y te contamos todos los detalles.',
      cta: 'Quiero inscribirme',
    },
    gallery: { title: 'Ediciones anteriores', enlarge: 'Ampliar la foto', close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente', of: 'de' },
  },
  en: {
    meta: {
      title: 'The Wedding Planner Experience · Wedding planner course in Asturias, Spain · The Dreams Factory',
      description: 'An intensive three-day course for future wedding planners, taught by Bea and Vane. New edition on 29, 30 and 31 January 2027 at Palacio de La Riega (Gijón, Spain). Registration open.',
    },
    hero: {
      eyebrow: 'Education · For future wedding planners',
      title: 'The Wedding Planner\n*Experience*',
      lead: 'An intensive three-day course for anyone who dreams of planning weddings for a living, taught by us in a real palace.',
      badge: 'New edition · Registration open',
      status: '29, 30 and 31 January 2027 · Palacio de La Riega, Gijón',
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
        'The fourth edition takes place at Palacio de La Riega, in Gijón: a wedding venue we know well.',
        'As in every edition, the whole palace is a classroom: we walk through it to show you, for real, how a complete wedding unfolds, from getting ready to staging the first dance and setting up bars and food corners.',
        'The first three editions were held at NH Collection Palacio de Avilés. These photos are from them.',
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
      talks: { title: 'Talks by professionals', text: 'We’re nothing without our colleagues: leading suppliers in the industry tell you how they work. In previous editions we were joined by M2 Visual Studio, Perspective, Liebling Maestro de Ceremonias, Siapro, Leymar Floristas, As de Bodas and A de Lola. We’re finalising this edition’s speakers.' },
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
    voices: {
      eyebrow: 'Our students',
      title: 'What they told us *afterwards*',
      items: [
        { quote: 'Thank you for the transparency and warmth you showed from the very beginning when sharing the details of your working tools, and for explaining everything so simply and clearly.', name: 'Lidia' },
        { quote: 'Thank you from the bottom of my heart for all the care you put into planning and running the course, because I promise it shows.', name: 'Lucía' },
        { quote: 'My expectations were very high because I’m very demanding, and I honestly can’t find a single fault.', name: 'María' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What you *ask us most*',
      items: [
        { q: 'When is the next edition?', a: 'On 29, 30 and 31 January 2027. Registration is already open: write to us and we’ll give you all the details.' },
        { q: 'How do I sign up?', a: 'Fill in the contact form choosing “The course” (or press “I want to sign up”) and we’ll get in touch with you.' },
        { q: 'Where does it take place?', a: 'At Palacio de La Riega, in Gijón (Asturias, Spain). The first three editions were held at NH Collection Palacio de Avilés.' },
        { q: 'How many places are there?', a: 'Few: we work with very small groups so the attention is close and personal.' },
        { q: 'Is there a certificate?', a: 'Yes: at the end you receive a certificate of attendance. It isn’t an official qualification.' },
        { q: 'What happens when it ends?', a: 'You have a one-to-one consultation with us to sort out any questions that come up afterwards.' },
      ],
    },
    closing: {
      title: 'Will you join *the new edition*?',
      text: '29, 30 and 31 January 2027, at Palacio de La Riega (Gijón). Registration is open: write to us and we’ll give you all the details.',
      cta: 'I want to sign up',
    },
    gallery: { title: 'Previous editions', enlarge: 'Enlarge photo', close: 'Close', prev: 'Previous photo', next: 'Next photo', of: 'of' },
  },
};
