/**
 * Página «Nosotras» (/nosotras, /en/about-us). ES y EN.
 *
 * Textos de la cabecera, la historia, la línea de tiempo y «Un equipo de confianza»: de Bea y Vane (octubre de 2026).
 * Trabajan solo en Asturias. En las fotos, Vane es la rubia y Bea la morena (en el retrato de Vane en el jardín,
 * con moño, el pelo se ve más oscuro).
 *
 * PENDIENTE DE CONFIRMAR con Bea y Vane:
 * - El retrato individual de Bea (de momento, un recorte de la foto del jardín).
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
  press: string;
  education: { eyebrow: string; title: string; text: string; course: string; photo: Photo };
};

const studiesEs = 'Universidad Camilo José Cela e Instituto Superior de Protocolo y Eventos (Madrid)';
const studiesEn = 'Camilo José Cela University and the Higher Institute of Protocol and Events (Madrid)';

export const about: Record<Lang, AboutContent> = {
  es: {
    meta: {
      title: 'Nosotras · Bea y Vane, wedding planners en Asturias · The Dreams Factory',
      description: 'Somos Bea y Vane, wedding planners en Asturias desde 2015. Conoce nuestra historia y cómo trabajamos.',
    },
    hero: {
      eyebrow: 'Nosotras',
      title: 'Somos\n*Bea y Vane*',
      lead: 'En 2015 empezamos este camino con una idea clara: ayudar a cada pareja a vivir y disfrutar una boda fiel a su esencia. Desde entonces, damos forma a historias únicas en Asturias.',
      photo: { src: fotoJardin, alt: 'Vane, a la izquierda, y Bea sonríen sentadas a una mesa decorada con velas, frutas de otoño y flores en un jardín.', focus: '55% 35%' },
    },
    story: {
      eyebrow: 'Cómo empezó todo',
      title: 'Un sueño *compartido*',
      paragraphs: [
        'Desde que se conocieron, descubrieron que compartían mucho más que una misma visión: les unía una forma especial de entender y hacer las cosas.',
        'Muy pronto supieron que juntas podían llegar más lejos. Unieron sus pasiones, apostaron por seguir creciendo, se formaron y se especializaron con un mismo propósito: construir algo único.',
        'Así, con ilusión, compromiso y la confianza de caminar en la misma dirección, fueron dando forma al tándem perfecto, donde el talento de cada una se convierte en la fuerza de ambas.',
      ],
      photo: { src: fotoFurgoneta, alt: 'Vane, a la izquierda, y Bea, sentadas en una furgoneta antigua decorada con flores secas y plumeros.' },
    },
    timeline: {
      eyebrow: 'Nuestro camino',
      items: [
        { year: '2015', text: 'Nace The Dreams Factory.' },
        { year: '2016', text: 'Organizamos nuestras primeras bodas.' },
        { year: '2023', text: 'Nace nuestro primer curso, «The Wedding Planner Experience», mientras cumplimos la boda 100 de nuestra trayectoria.' },
        { year: '2026', text: 'Seguimos acompañando a parejas increíbles en uno de los capítulos más bonitos de sus vidas.' },
      ],
    },
    team: {
      eyebrow: 'Las dos',
      title: 'Dos formas de mirar *una boda*',
      studiesLabel: 'Formación',
      people: [
        {
          name: 'Beatriz', nickname: 'Bea', role: 'Wedding planner · Organización',
          text: 'Soñadora, amante de las cosas bien hechas, exigente y perfeccionista: no se le escapa ningún detalle.',
          studies: `Experta Universitaria en Organización de Eventos Corporativos e Institucionales. ${studiesEs}.`,
          photo: { src: fotoBea, alt: 'Retrato de Bea, sonriente, con la mano bajo la barbilla.' },
        },
        {
          name: 'Vanessa', nickname: 'Vane', role: 'Wedding planner · Diseño y decoración',
          text: 'No hay decoración que se le resista. Experta en las últimas tendencias, curiosa y tenaz, con el «nada es imposible» por bandera: convierte cualquier celebración en algo muy especial.',
          studies: `Especialista Universitaria en Wedding Planner. ${studiesEs}.`,
          photo: { src: fotoVane, alt: 'Vane coloca una servilleta en una mesa de boda decorada con flores de otoño, bajo una pérgola de piedra en un jardín.', focus: '50% 28%' },
        },
      ],
    },
    values: {
      eyebrow: 'Cómo trabajamos',
      title: 'Lo que *no cambia*',
      items: [
        { title: 'Cerca, de verdad', text: 'Nos gusta que nos llaméis por nuestro nombre: así de cerca trabajamos con cada pareja.' },
        { title: 'Vuestra boda, vuestras normas', text: 'Sin tradiciones obligatorias. Escuchamos, proponemos y la última palabra siempre es vuestra.' },
        { title: 'Un equipo de confianza', text: 'Seleccionamos con vosotros un equipo de profesionales que comparte nuestras visiones, se entiende a la perfección y trabaja en armonía para crear algo extraordinario.' },
        { title: 'Tranquilidad', text: 'Lo tenemos todo previsto, también lo imprevisto: siempre hay una alternativa preparada.' },
      ],
    },
    figures: [
      { value: '2015', label: 'Organizando bodas desde' },
      { value: '+100', label: 'Bodas organizadas' },
      { value: '3', label: 'Ediciones de nuestro curso' },
      { value: 'Asturias', label: 'Donde trabajamos' },
    ],
    press: 'Nuestras bodas, publicadas en',
    education: {
      eyebrow: 'También enseñamos',
      title: 'Compartimos *lo que sabemos*',
      text: 'Con «The Wedding Planner Experience» formamos a futuras wedding planners: tres días para conocer de verdad la profesión, de la mano de quienes trabajamos en ella.',
      course: 'El curso',
      photo: { src: fotoCurso, alt: 'Bea y Vane dan una clase del curso a las alumnas, sentadas alrededor de una mesa con flores en un salón del palacio.', focus: '50% 40%' },
    },
  },
  en: {
    meta: {
      title: 'About us · Bea and Vane, wedding planners in Asturias · The Dreams Factory',
      description: 'We are Bea and Vane, wedding planners in Asturias, Spain, since 2015. Discover our story and how we work.',
    },
    hero: {
      eyebrow: 'About us',
      title: 'We are\n*Bea and Vane*',
      lead: 'In 2015 we set out on this path with one clear idea: to help every couple live and enjoy a wedding true to who they are. Since then, we’ve been shaping unique stories in Asturias.',
      photo: { src: fotoJardin, alt: 'Vane, on the left, and Bea smile, seated at a table dressed with candles, autumn fruit and flowers in a garden.', focus: '55% 35%' },
    },
    story: {
      eyebrow: 'How it all began',
      title: 'A shared *dream*',
      paragraphs: [
        'From the moment they met, they discovered they shared much more than a vision: they were united by a special way of understanding and doing things.',
        'They soon realised that together they could go further. They brought their passions together, committed to keep growing, and trained and specialised with one shared purpose: to build something unique.',
        'And so, with enthusiasm, commitment and the confidence of walking in the same direction, they shaped the perfect team, where each one’s talent becomes the strength of both.',
      ],
      photo: { src: fotoFurgoneta, alt: 'Vane, on the left, and Bea, sitting in a vintage camper van decorated with dried flowers and pampas grass.' },
    },
    timeline: {
      eyebrow: 'Our journey',
      items: [
        { year: '2015', text: 'The Dreams Factory is born.' },
        { year: '2016', text: 'We plan our first weddings.' },
        { year: '2023', text: 'Our first course, “The Wedding Planner Experience”, is born, as we celebrate the 100th wedding of our journey.' },
        { year: '2026', text: 'We keep accompanying amazing couples through one of the most beautiful chapters of their lives.' },
      ],
    },
    team: {
      eyebrow: 'The two of us',
      title: 'Two ways of seeing *a wedding*',
      studiesLabel: 'Training',
      people: [
        {
          name: 'Beatriz', nickname: 'Bea', role: 'Wedding planner · Planning',
          text: 'A dreamer who loves things done properly, demanding and a perfectionist: no detail escapes her.',
          studies: `University Expert in Corporate and Institutional Event Management. ${studiesEn}.`,
          photo: { src: fotoBea, alt: 'Portrait of Bea, smiling, her hand under her chin.' },
        },
        {
          name: 'Vanessa', nickname: 'Vane', role: 'Wedding planner · Design & styling',
          text: 'There’s no styling challenge she can’t take on. On top of the latest trends, curious and tenacious, with “nothing is impossible” as her motto: she turns any celebration into something truly special.',
          studies: `University Specialist in Wedding Planning. ${studiesEn}.`,
          photo: { src: fotoVane, alt: 'Vane places a napkin on a wedding table dressed with autumn flowers, beneath a stone pergola in a garden.', focus: '50% 28%' },
        },
      ],
    },
    values: {
      eyebrow: 'How we work',
      title: 'What *never changes*',
      items: [
        { title: 'Truly close', text: 'We like you to call us by our names: that’s how closely we work with every couple.' },
        { title: 'Your wedding, your rules', text: 'No compulsory traditions. We listen, we suggest, and the final word is always yours.' },
        { title: 'A trusted team', text: 'Together with you, we choose a team of professionals who share our vision, understand each other perfectly and work in harmony to create something extraordinary.' },
        { title: 'Peace of mind', text: 'We plan for everything, even the unexpected: there’s always a plan B ready.' },
      ],
    },
    figures: [
      { value: '2015', label: 'Planning weddings since' },
      { value: '100+', label: 'Weddings planned' },
      { value: '3', label: 'Editions of our course' },
      { value: 'Asturias', label: 'Where we work' },
    ],
    press: 'Our weddings, featured in',
    education: {
      eyebrow: 'We also teach',
      title: 'Sharing *what we know*',
      text: 'With “The Wedding Planner Experience” we train future wedding planners: three days to truly get to know the profession, guided by people who work in it.',
      course: 'The course',
      photo: { src: fotoCurso, alt: 'Bea and Vane teach a class to the students, seated around a table with flowers in one of the palace’s rooms.', focus: '50% 40%' },
    },
  },
};
