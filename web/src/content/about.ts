/**
 * Página «Nosotras» (/nosotras, /en/about-us). ES y EN.
 *
 * Origen: la presentación de Bea y Vane de la web antigua («¿Quiénes somos?»), los datos confirmados (desde 2015,
 * Asturias y León, 3 ediciones del curso, prensa) y los proveedores que más se repiten en las bodas publicadas.
 * En las fotos, Vane es la rubia y Bea la morena.
 *
 * PENDIENTE DE CONFIRMAR con Bea y Vane:
 * - La historia («Cómo empezó todo»): borrador a partir de su presentación antigua.
 * - El año de la primera edición del curso y el número de bodas (cifras).
 * - Los retratos individuales: de momento, recortes de la foto del jardín.
 * - Que se pueden nombrar los proveedores con los que más trabajan.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/routes';
import fotoJardin from '../assets/photos/nosotras-bea-vane.jpg';
import fotoFurgoneta from '../assets/photos/nosotras/furgoneta.jpg';
import fotoBea from '../assets/photos/nosotras/bea.jpg';
import fotoVane from '../assets/photos/nosotras/vane.jpg';
import fotoCurso from '../assets/photos/curso-edicion.jpg';

type Photo = { src: ImageMetadata; alt: string; focus?: string };

export type AboutContent = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; photo: Photo };
  story: { eyebrow: string; title: string; paragraphs: string[]; photo: Photo };
  /** Hitos. Sin `year` (aún sin confirmar) se muestra `tag` en su lugar. */
  timeline: { eyebrow: string; items: { year?: string; tag?: string; text: string }[] };
  team: {
    eyebrow: string; title: string; studiesLabel: string;
    people: { name: string; nickname: string; role: string; text: string; studies: string; photo: Photo }[];
  };
  values: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  figures: { value: string; label: string }[];
  partners: { eyebrow: string; title: string; lead: string; groups: { role: string; names: string[] }[] };
  voices: { eyebrow: string; title: string; cta: string; press: string };
  education: { eyebrow: string; title: string; text: string; course: string; consultations: string; photo: Photo };
};

const studiesEs = 'Universidad Camilo José Cela e Instituto Superior de Protocolo y Eventos (Madrid)';
const studiesEn = 'Camilo José Cela University and the Higher Institute of Protocol and Events (Madrid)';

export const about: Record<Lang, AboutContent> = {
  es: {
    meta: {
      title: 'Nosotras · Bea y Vane, wedding planners en Asturias · The Dreams Factory',
      description: 'Somos Bea y Vane, wedding planners en Asturias desde 2015. Conoce nuestra historia, cómo trabajamos y el equipo con el que hacemos realidad cada boda.',
    },
    hero: {
      eyebrow: 'Nosotras',
      title: 'Somos\n*Bea y Vane*',
      lead: 'En 2015 decidimos dedicarnos a lo que más nos gustaba: ayudar a cada pareja a celebrar su boda a su manera. Desde entonces lo hacemos en Asturias, León y alrededores.',
      photo: { src: fotoJardin, alt: 'Vane, a la izquierda, y Bea sonríen sentadas a una mesa decorada con velas, frutas de otoño y flores en un jardín.', focus: '55% 35%' },
    },
    story: {
      eyebrow: 'Cómo empezó todo',
      title: 'Un sueño *compartido*',
      paragraphs: [
        'Bea venía de muchos años dedicada al turismo y decidió dar un giro a su vida: quería ser wedding planner y tener su propia empresa. Vane soñaba con organizar bodas únicas y, tras varios años trabajando en el sector, se formó como organizadora y diseñadora de eventos.',
        'Así nació The Dreams Factory. Desde entonces hemos acompañado a parejas de aquí y de fuera —alguna, desde el otro lado del Atlántico— en palacios, castillos, casas de campo y montaña. Cada boda es distinta, y eso es justo lo que más nos gusta.',
      ],
      photo: { src: fotoFurgoneta, alt: 'Vane, a la izquierda, y Bea, sentadas en una furgoneta antigua decorada con flores secas y plumeros.' },
    },
    timeline: {
      eyebrow: 'Nuestro camino',
      items: [
        { year: '2015', text: 'Nace The Dreams Factory.' },
        { year: '2017', text: 'Telva Novias publica nuestra sesión editorial en el NH Collection Palacio de Avilés, en el reportaje «Casarse en un palacio asturiano».' },
        { tag: 'Formación', text: 'Primera edición de «The Wedding Planner Experience», nuestro curso para futuras wedding planners.' },
        { year: '2025', text: '¡HOLA! y Vanitatis publican dos de nuestras bodas.' },
      ],
    },
    team: {
      eyebrow: 'Las dos',
      title: 'Dos formas de mirar *una boda*',
      studiesLabel: 'Formación',
      people: [
        {
          name: 'Beatriz', nickname: 'Bea', role: 'Wedding planner · Organización',
          text: 'Soñadora, amante de las cosas bien hechas, exigente y perfeccionista: no se le escapa ningún detalle. Tras muchos años en el turismo, dio un giro a su vida para cumplir su sueño.',
          studies: `Experta Universitaria en Organización de Eventos Corporativos e Institucionales. ${studiesEs}.`,
          photo: { src: fotoBea, alt: 'Retrato de Bea, sonriente, con la mano bajo la barbilla.' },
        },
        {
          name: 'Vanessa', nickname: 'Vane', role: 'Wedding planner · Diseño y decoración',
          text: 'No hay decoración que se le resista. Experta en las últimas tendencias, curiosa y tenaz, con el «nada es imposible» por bandera: convierte cualquier celebración en algo muy especial.',
          studies: `Especialista Universitaria en Wedding Planner. ${studiesEs}.`,
          photo: { src: fotoVane, alt: 'Retrato de Vane, de perfil, sonriendo.' },
        },
      ],
    },
    values: {
      eyebrow: 'Cómo trabajamos',
      title: 'Lo que *no cambia*',
      items: [
        { title: 'Cerca, de verdad', text: 'Nos gusta que nos llaméis por nuestro nombre: así de cerca trabajamos con cada pareja.' },
        { title: 'Vuestra boda, vuestras normas', text: 'Sin tradiciones obligatorias. Escuchamos, proponemos y la última palabra siempre es vuestra.' },
        { title: 'Un equipo de confianza', text: 'Proveedores con los que llevamos años trabajando y que funcionan como uno solo.' },
        { title: 'Tranquilidad', text: 'Lo tenemos todo previsto, también lo imprevisto: siempre hay una alternativa preparada.' },
      ],
    },
    figures: [
      { value: '2015', label: 'Organizando bodas desde' },
      { value: '3', label: 'Ediciones de nuestro curso' },
      { value: '4', label: 'Revistas han publicado nuestras bodas' },
      { value: 'Asturias', label: 'Y también León y alrededores' },
    ],
    partners: {
      eyebrow: 'Con quién trabajamos',
      title: 'Nuestro *equipo*',
      lead: 'Una boda bonita es trabajo de muchas manos. Estos son algunos de los profesionales que más se repiten en nuestras bodas.',
      groups: [
        { role: 'Flores', names: ['Pando Floristas'] },
        { role: 'Mobiliario e iluminación', names: ['Global Rent'] },
        { role: 'Catering', names: ['Catering Nature'] },
        { role: 'Fotografía', names: ['M2 Visual Studio', 'JFK Imagen Social', 'Darío Martínez'] },
        { role: 'Vídeo', names: ['Héctor Torra'] },
        { role: 'Música', names: ['Cuarteto Arpeggio', 'Siapro', 'Sonifón'] },
        { role: 'Peluquería', names: ['Peluquería Suárez'] },
      ],
    },
    voices: { eyebrow: 'Lo que dicen las parejas', title: 'En sus *palabras*', cta: 'Leer todas las opiniones', press: 'Nuestras bodas, publicadas en' },
    education: {
      eyebrow: 'También enseñamos',
      title: 'Compartimos *lo que sabemos*',
      text: 'Con «The Wedding Planner Experience» formamos a futuras wedding planners, y en las tutorías online ayudamos a las parejas que organizan su boda por su cuenta.',
      course: 'El curso',
      consultations: 'Tutorías online',
      photo: { src: fotoCurso, alt: 'Bea y Vane dan una clase del curso a las alumnas, sentadas alrededor de una mesa con flores en un salón del palacio.', focus: '50% 40%' },
    },
  },
  en: {
    meta: {
      title: 'About us · Bea and Vane, wedding planners in Asturias · The Dreams Factory',
      description: 'We are Bea and Vane, wedding planners in Asturias, Spain, since 2015. Discover our story, how we work and the team that helps us bring every wedding to life.',
    },
    hero: {
      eyebrow: 'About us',
      title: 'We are\n*Bea and Vane*',
      lead: 'In 2015 we decided to devote ourselves to what we love most: helping every couple celebrate their wedding their own way. We’ve been doing it ever since, in Asturias, León and nearby.',
      photo: { src: fotoJardin, alt: 'Vane, on the left, and Bea smile, seated at a table dressed with candles, autumn fruit and flowers in a garden.', focus: '55% 35%' },
    },
    story: {
      eyebrow: 'How it all began',
      title: 'A shared *dream*',
      paragraphs: [
        'Bea had spent many years working in tourism when she decided to change course: she wanted to be a wedding planner and run her own business. Vane dreamed of creating one-of-a-kind weddings and, after several years in the industry, trained as an event planner and designer.',
        'That is how The Dreams Factory was born. Since then we have worked with couples from here and abroad —one of them from the other side of the Atlantic— in palaces, castles, country houses and the mountains. Every wedding is different, and that is exactly what we love most.',
      ],
      photo: { src: fotoFurgoneta, alt: 'Vane, on the left, and Bea, sitting in a vintage camper van decorated with dried flowers and pampas grass.' },
    },
    timeline: {
      eyebrow: 'Our journey',
      items: [
        { year: '2015', text: 'The Dreams Factory is born.' },
        { year: '2017', text: 'Telva Novias features our editorial shoot at NH Collection Palacio de Avilés in its story “Casarse en un palacio asturiano” (Getting married in an Asturian palace).' },
        { tag: 'Teaching', text: 'First edition of “The Wedding Planner Experience”, our course for future wedding planners.' },
        { year: '2025', text: '¡HOLA! and Vanitatis feature two of our weddings.' },
      ],
    },
    team: {
      eyebrow: 'The two of us',
      title: 'Two ways of seeing *a wedding*',
      studiesLabel: 'Training',
      people: [
        {
          name: 'Beatriz', nickname: 'Bea', role: 'Wedding planner · Planning',
          text: 'A dreamer who loves things done properly, demanding and a perfectionist: no detail escapes her. After many years in tourism, she changed course to follow her dream.',
          studies: `University Expert in Corporate and Institutional Event Management. ${studiesEn}.`,
          photo: { src: fotoBea, alt: 'Portrait of Bea, smiling, her hand under her chin.' },
        },
        {
          name: 'Vanessa', nickname: 'Vane', role: 'Wedding planner · Design & styling',
          text: 'There’s no styling challenge she can’t take on. On top of the latest trends, curious and tenacious, with “nothing is impossible” as her motto: she turns any celebration into something truly special.',
          studies: `University Specialist in Wedding Planning. ${studiesEn}.`,
          photo: { src: fotoVane, alt: 'Portrait of Vane in profile, smiling.' },
        },
      ],
    },
    values: {
      eyebrow: 'How we work',
      title: 'What *never changes*',
      items: [
        { title: 'Truly close', text: 'We like you to call us by our names: that’s how closely we work with every couple.' },
        { title: 'Your wedding, your rules', text: 'No compulsory traditions. We listen, we suggest, and the final word is always yours.' },
        { title: 'A trusted team', text: 'Suppliers we’ve worked with for years, who work together as one.' },
        { title: 'Peace of mind', text: 'We plan for everything, even the unexpected: there’s always a plan B ready.' },
      ],
    },
    figures: [
      { value: '2015', label: 'Planning weddings since' },
      { value: '3', label: 'Editions of our course' },
      { value: '4', label: 'Magazines have featured our weddings' },
      { value: 'Asturias', label: 'And also León and nearby' },
    ],
    partners: {
      eyebrow: 'Who we work with',
      title: 'Our *team*',
      lead: 'A beautiful wedding takes many hands. These are some of the professionals who appear most often in our weddings.',
      groups: [
        { role: 'Flowers', names: ['Pando Floristas'] },
        { role: 'Furniture & lighting', names: ['Global Rent'] },
        { role: 'Catering', names: ['Catering Nature'] },
        { role: 'Photography', names: ['M2 Visual Studio', 'JFK Imagen Social', 'Darío Martínez'] },
        { role: 'Video', names: ['Héctor Torra'] },
        { role: 'Music', names: ['Cuarteto Arpeggio', 'Siapro', 'Sonifón'] },
        { role: 'Hair', names: ['Peluquería Suárez'] },
      ],
    },
    voices: { eyebrow: 'What couples say', title: 'In their *own words*', cta: 'Read all reviews', press: 'Our weddings, featured in' },
    education: {
      eyebrow: 'We also teach',
      title: 'Sharing *what we know*',
      text: 'With “The Wedding Planner Experience” we train future wedding planners, and in our online consultations we help couples who are planning their wedding themselves.',
      course: 'The course',
      consultations: 'Online consultations',
      photo: { src: fotoCurso, alt: 'Bea and Vane teach a class to the students, seated around a table with flowers in one of the palace’s rooms.', focus: '50% 40%' },
    },
  },
};
