import type { ImageMetadata } from 'astro';
import type { Lang, RouteKey } from '../i18n/routes';

import heroVideoPoster from '../assets/photos/hero/0-video-mesa.jpg';
import hero1 from '../assets/photos/hero/1-nyt-beso.jpg';
import hero2 from '../assets/photos/hero/2-byd-banquete.jpg';
import hero3 from '../assets/photos/hero/3-aym-confeti.jpg';
import hero4 from '../assets/photos/hero/4-coche-clasico.jpg';
import hero5 from '../assets/photos/hero/5-aym-fiesta.jpg';
import srvIntegral from '../assets/photos/servicio-organizacion-integral.jpg';
import srvDiseno from '../assets/photos/servicio-diseno-decoracion.jpg';
import srvDiaB from '../assets/photos/servicio-dia-b.jpg';
import srvCelebraciones from '../assets/photos/servicio-celebraciones.jpg';
import bodaNyT from '../assets/photos/boda-nyt-arenas-de-cabrales.jpg';
import bodaIyA from '../assets/photos/boda-iya-palacio-la-riega.jpg';
import bodaByD from '../assets/photos/boda-byd-ermita-de-deva.jpg';
import bodaOyD from '../assets/photos/boda-oyd-hacienda-la-llorea.jpg';
import bodaAyM from '../assets/photos/boda-aym-palacio-de-moutas.jpg';
import bodaGyEJ from '../assets/photos/boda-gej-puebloastur.jpg';
// La foto de fondo de cada opinión es siempre de la boda de quien la firma.
import opDavidGerman from '../assets/photos/opiniones/david-german.jpg';
import opMartaOmar from '../assets/photos/opiniones/marta-omar.jpg';
import opNadiaTomas from '../assets/photos/opiniones/nadia-tomas.jpg';
import opAidaAdrian from '../assets/photos/opiniones/aida-adrian.jpg';
import opSoniaAlberto from '../assets/photos/opiniones/sonia-alberto.jpg';
import opMariaGaspar from '../assets/photos/opiniones/maria-gaspar.jpg';
import nosotras from '../assets/photos/nosotras-bea-vane.jpg';
import cursoEdicion from '../assets/photos/curso-edicion.jpg';
import tutorias from '../assets/photos/tutorias.jpg';
import blogCeremonia from '../assets/photos/blog-ceremonia-civil.jpg';
import blogLettering from '../assets/photos/blog-lettering.jpg';
import blogEncuentro from '../assets/photos/blog-encuentro-dreams.jpg';
import blogAsturias from '../assets/photos/blog-organizacion-asturias.jpg';
import blogTelva from '../assets/photos/blog-editorial-telva.jpg';

type Link = { label: string; to: RouteKey };
type Photo = { src: ImageMetadata; alt: string };
/** Foto del carrusel de portada. `focus` es el object-position para que no se corte lo importante. */
/**
 * Foto del carrusel de portada con su propio titular y frase (`title`, `intro`). La primera diapositiva usa el
 * titular general de la portada (`hero.title` / `hero.intro`), así que no los necesita.
 */
export type HeroSlide = {
  photo: Photo; couple: string; place: string; focus?: string; title?: string; intro?: string;
  /**
   * Vídeo de fondo (sin sonido, en bucle). `photo` hace de imagen de carga y de alternativa cuando el vídeo no se
   * reproduce (reducir movimiento, ahorro de datos). Versiones de mejor a peor compresión: el navegador se queda
   * con la primera que sabe reproducir y solo descarga esa. Rutas a /public.
   */
  video?: VideoSource[];
  /** Tiempo que permanece la diapositiva, en ms (por defecto, el de la portada). */
  duration?: number;
};
export type VideoSource = { src: string; type: string };

/**
 * Vídeo de la mesa (dron), 18 s a 1080p y 24 fps, sin sonido, color BT.709 como el original.
 * AV1 para Chrome, Edge, Firefox y Safari moderno; HEVC para el resto de Safari; H.264 para navegadores antiguos.
 */
const tableVideo: VideoSource[] = [
  { src: '/videos/portada-mesa-av1.webm', type: 'video/webm; codecs="av01.0.08M.08"' },
  { src: '/videos/portada-mesa-hevc.mp4', type: 'video/mp4; codecs="hvc1.1.6.L120.90"' },
  { src: '/videos/portada-mesa-h264.mp4', type: 'video/mp4; codecs="avc1.640032"' },
];

export interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string; title: string; intro: string; primary: Link; secondary: Link;
    slides: HeroSlide[];
    controls: { region: string; slide: string; goTo: string; pause: string; play: string };
  };
  /** Filosofía y «Nosotras» fusionadas: la filosofía contada en primera persona y firmada por Bea y Vane. */
  story: {
    eyebrow: string; title: string; lead: string; body: string;
    signature: string; credentials: string; cta: Link;
    /** Retrato de Bea y Vane (se muestra pequeño y redondo junto a la firma). */
    team: Photo;
  };
  /**
   * Servicios. Cada uno enlaza a su apartado en la página de Servicios (`anchor`).
   */
  services: {
    eyebrow: string; title: string; cta: Link;
    /** Enlace de cada servicio en las variantes «lista» y «escala» («Ver servicio»). */
    viewLabel: string;
    /** Variante «escala»: extremos de la línea y rótulo del servicio que va aparte (Celebraciones). */
    scale: { more: string; less: string; apart: string };
    /**
     * `level`: etiqueta corta del nivel de acompañamiento (variante «escala»).
     * `apart`: va fuera de la escala (no es un grado de ayuda para una boda, sino otro tipo de celebración).
     */
    items: { title: string; text: string; anchor: string; photo: Photo; level?: string; apart?: boolean }[];
  };
  /** Seis bodas destacadas. Las fotos en blanco y negro van en filas y columnas distintas. */
  /** `viewLabel`: rótulo que aparece sobre la foto al pasar el ratón («Ver la boda»). */
  weddings: { eyebrow: string; title: string; cta: Link; viewLabel: string; items: { couple: string; place: string; photo: Photo; focus?: string }[] };
  reviews: {
    eyebrow: string;
    /** Aviso de traducción (solo en inglés). */
    note?: string;
    cta: Link;
    controls: { region: string; goTo: string; pause: string; play: string };
    /**
     * Citas literales de las parejas (solo se corrigen erratas). `credit` es el fotógrafo de su boda.
     * La foto de fondo debe ser siempre de la boda de quien firma.
     */
    items: { quote: string; author: string; credit?: string; photo: ImageMetadata; focus?: string }[];
  };
  /**
   * Formación: el curso (para futuras profesionales) y las tutorías (para parejas).
   * Son públicos distintos: `audience` lo deja claro en cada bloque.
   */
  education: {
    eyebrow: string; title: string;
    /** `focus`: object-position de la foto dentro del panel vertical. */
    course: { audience: string; badge: string; title: string; text: string; meta: string; cta: Link; photo: Photo; focus?: string };
    consultations: { audience: string; title: string; text: string; meta: string; cta: Link; photo: Photo; focus?: string };
  };
  /** Cierre de la portada: frase caligráfica, titular y botón para escribir. */
  closing: { script: string; title: string; text: string; cta: Link };
  blog: {
    eyebrow: string; title: string; cta: Link;
    /** «{n} min de lectura». */
    readingTime: string;
    /**
     * Mosaico: la primera entrada va grande y con su resumen (`excerpt`); el resto solo muestra el título.
     * `minutes`: tiempo de lectura calculado sobre el texto real de la entrada (200 palabras/min).
     */
    posts: { category: string; title: string; excerpt: string; minutes: number; photo: Photo }[];
  };
  contact: {
    eyebrow: string; title: string; lead: string;
    form: {
      names: [string, string]; email: [string, string]; phone: [string, string];
      date: [string, string]; place: [string, string]; need: string; needOptions: string[];
      idea: [string, string]; privacy: string; privacyLink: string; submit: string; prototypeNotice: string;
    };
  };
}

export const home: Record<Lang, HomeContent> = {
  es: {
    meta: {
      title: 'Wedding planner en Asturias · The Dreams Factory',
      description: 'Diseñamos, organizamos y coordinamos bodas en Asturias desde 2015. Bodas que se parecen a vosotros.',
    },
    hero: {
      eyebrow: 'Wedding planners en Asturias desde 2015',
      title: 'Bodas que se parecen\n*a vosotros*',
      intro: 'Diseñamos, organizamos y coordinamos vuestra boda con calma y mimo por cada detalle, para que solo tengáis que vivirla.',
      primary: { label: 'Contadnos vuestra idea', to: 'contact' },
      secondary: { label: 'Ver bodas', to: 'weddings' },
      slides: [
        { couple: '', place: '', duration: 18000, video: tableVideo, photo: { src: heroVideoPoster, alt: 'Vista aérea de una mesa imperial preparada en un patio rodeado de jardín.' } },
        { couple: 'N & T', place: 'Arenas de Cabrales', focus: '50% 40%', title: 'Momentos que\n*se quedan con vosotros*', intro: 'Cuidamos cada detalle para que los momentos importantes lleguen solos, sin prisas ni sobresaltos.', photo: { src: hero1, alt: 'N y T se abrazan bajo una carpa decorada con guirnaldas de luces y ramas verdes.' } },
        { couple: 'B & D', place: 'Ermita de Deva · Gijón', focus: '50% 55%', title: 'Cada detalle,\n*pensado para vosotros*', intro: 'Diseño, decoración y ambientación con carácter propio: flores, luz y mesas que cuentan vuestra historia.', photo: { src: hero2, alt: 'Mesa imperial del banquete con hortensias, velas y ramas de eucalipto colgando del techo.' } },
        { couple: 'A & M', place: 'Palacio de Moutas', focus: '50% 45%', title: 'Toda la emoción,\n*ninguna preocupación*', intro: 'Nos ocupamos de proveedores, tiempos y planes B para que vosotros solo tengáis que mirar hacia delante.', photo: { src: hero3, alt: 'A y M salen de la iglesia bajo una lluvia de pétalos lanzados por sus invitados.' } },
        { couple: 'A & S', place: '', focus: '45% 50%', title: 'Vuestra historia,\n*a vuestra manera*', intro: 'Sin tradiciones obligatorias ni bodas «raras»: escuchamos cómo sois y lo convertimos en vuestra boda.', photo: { src: hero4, alt: 'A y S, apoyados en un coche clásico negro; ella, con velo largo, sostiene una sombrilla blanca y al fondo se ven las montañas.' } },
        { couple: 'A & M', place: 'La fiesta', focus: '48% 35%', title: 'Y vosotros,\n*a disfrutar*', intro: 'El día B coordinamos todo entre bastidores para que lo viváis de principio a fin con vuestra gente.', photo: { src: hero5, alt: 'A y M, sentados juntos y sonriendo, bajo un neón que dice «Fly me to the moon» rodeado de hiedra.' } },
      ],
      controls: { region: 'Bodas destacadas', slide: 'Foto {n} de {total}', goTo: 'Ver foto {n}: {caption}', pause: 'Pausar el pase de fotos', play: 'Reanudar el pase de fotos' },
    },
    story: {
      eyebrow: 'Nuestra filosofía',
      title: 'Vuestra boda,\n*vuestras normas*',
      lead: 'No hay tradiciones obligatorias ni bodas «raras». Hay dos personas, una historia y una forma de celebrarla que solo es vuestra.',
      body: 'Nosotras escuchamos, proponemos y nos ocupamos de todo lo demás: proveedores, calendario, presupuesto y ese plan B que siempre llevamos preparado. Vosotros tomáis cada decisión; nosotras hacemos que sea fácil. Nos gusta que nos llaméis por nuestro nombre, porque así de cerca trabajamos con cada pareja.',
      signature: 'Bea & Vane',
      credentials: 'Wedding planners en Asturias desde 2015, con formación universitaria en protocolo y organización de eventos.',
      cta: { label: 'Conócenos', to: 'about' },
      team: { src: nosotras, alt: 'Beatriz y Vanessa, de The Dreams Factory, sentadas en una furgoneta decorada con flores secas.' },
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Cómo podemos *ayudaros*',
      cta: { label: 'Ver todos los servicios', to: 'services' },
      viewLabel: 'Ver servicio',
      scale: { more: 'Más acompañamiento', less: 'Menos acompañamiento', apart: '¿Celebráis otra cosa?' },
      items: [
        { title: 'Organización integral', level: 'Todo, de principio a fin', anchor: 'organizacion-integral', text: 'Os acompañamos desde la primera idea hasta el último baile: lugar, proveedores, diseño, presupuesto y coordinación.', photo: { src: srvIntegral, alt: 'Jardín preparado para una ceremonia, con cestas de flores y sillas.' } },
        { title: 'Diseño y decoración', level: 'La parte creativa', anchor: 'diseno-y-decoracion', text: 'Ya lo tenéis organizado, pero queréis que se note que es vuestra boda. Creamos la ambientación y los detalles que os representan.', photo: { src: srvDiseno, alt: 'Novia con ramo silvestre junto a un arco floral.' } },
        { title: 'Coordinación del día B', level: 'El gran día', anchor: 'coordinacion-dia-b', text: 'Lo habéis preparado vosotros; nosotras nos aseguramos de que todo salga como está previsto, desde días antes.', photo: { src: srvDiaB, alt: 'La novia ríe con sus amigas mientras se prepara.' } },
        { title: 'Celebraciones y momentos', apart: true, anchor: 'celebraciones', text: 'Una pedida, unas bodas de oro, una cena al atardecer. Contadnos la idea y la convertimos en un momento inolvidable.', photo: { src: srvCelebraciones, alt: 'Mesa decorada con flores y velas al aire libre.' } },
      ],
    },
    weddings: {
      eyebrow: 'Bodas',
      title: 'Días que *seguimos recordando*',
      cta: { label: 'Ver todas las bodas', to: 'weddings' },
      viewLabel: 'Ver la boda',
      items: [
        { couple: 'N & T', place: 'Arenas de Cabrales · Picos de Europa', photo: { src: bodaNyT, alt: 'N y T se besan en una carpa iluminada con guirnaldas.' } },
        { couple: 'B & D', place: 'Ermita de Deva · Gijón', photo: { src: bodaByD, alt: 'Retrato en blanco y negro de B y D.' } },
        { couple: 'I & A', place: 'Palacio de La Riega · Gijón', photo: { src: bodaIyA, alt: 'I y A pasean por el jardín del Palacio de La Riega.' } },
        { couple: 'O & D', place: 'Hacienda de la Llorea · Gijón', photo: { src: bodaOyD, alt: 'O y D se abrazan en un jardín decorado con flores silvestres y alfombras.' } },
        { couple: 'G & EJ', place: 'Puebloastur', photo: { src: bodaGyEJ, alt: 'Retrato en blanco y negro de G y EJ con las montañas de fondo.' }, focus: '45% 40%' },
        { couple: 'A & M', place: 'Palacio de Moutas', photo: { src: bodaAyM, alt: 'A y M sonríen con el ramo de novia en las manos.' }, focus: '50% 40%' },
      ],
    },
    reviews: {
      eyebrow: 'Lo que dicen las parejas',
      cta: { label: 'Leer todas las opiniones', to: 'reviews' },
      controls: { region: 'Opiniones de parejas', goTo: 'Ver la opinión de {author}', pause: 'Pausar las opiniones', play: 'Reanudar las opiniones' },
      items: [
        { quote: '«La mejor decisión que hemos tomado en nuestra boda ha sido contratarlas a ellas. Con ellas, es imposible que una boda no salga bien.»', author: 'Marta y Omar', credit: 'David Fernández', photo: opMartaOmar, focus: '50% 40%' },
        { quote: '«Todos los invitados coinciden en que ha sido el evento más emotivo y cuidado en el que han estado.»', author: 'David y Germán', photo: opDavidGerman },
        { quote: '«Nuestra boda fue perfecta, 100 % perfecta, y todo gracias a ellas.»', author: 'Nadia y Tomás', credit: 'David Fernández', photo: opNadiaTomas, focus: '50% 35%' },
        { quote: '«¡El día de la boda estuve súper tranquila, y fue sobre todo porque sabía que ellas estaban allí!»', author: 'María y Gaspar', credit: 'La Cabina Roja', photo: opMariaGaspar },
        { quote: '«No podemos estar más contentos de haberos escogido. Si me volviera a casar, sin duda os volvería a contratar.»', author: 'Aida y Adrián', credit: 'M2 Visual Studio', photo: opAidaAdrian, focus: '50% 35%' },
        { quote: '«Las recomendaremos una y mil veces, las que hagan falta.»', author: 'Sonia y Alberto', credit: 'M2 Visual Studio', photo: opSoniaAlberto, focus: '50% 30%' },
      ],
    },
    education: {
      eyebrow: 'Formación',
      title: 'Aprende *con nosotras*',
      course: {
        audience: 'Para futuras wedding planners',
        badge: '3 ediciones celebradas',
        title: 'The Wedding Planner Experience',
        text: 'Un curso intensivo de tres días para quienes quieren dedicarse a organizar bodas. Compartimos nuestro método, nuestros proveedores y una boda recorrida de principio a fin en un escenario real.',
        meta: 'Grupos reducidos · 3 días inmersivos',
        cta: { label: 'Descubre el curso', to: 'course' },
        photo: { src: cursoEdicion, alt: 'Bea y Vane dan una clase del curso a las alumnas, sentadas alrededor de una mesa con flores en un salón del palacio.' },
        focus: '50% 40%',
      },
      consultations: {
        audience: 'Para parejas',
        title: 'Tutorías online',
        text: '¿Lo organizáis vosotros pero queréis la opinión de expertas? Una sesión con café para ordenar ideas y resolver dudas.',
        meta: '90 minutos por videollamada · 49 €',
        cta: { label: 'Reservar tutoría', to: 'consultations' },
        photo: { src: tutorias, alt: 'Cuaderno de wedding planner con notas manuscritas.' },
      },
    },
    closing: {
      script: '¿Os imagináis el día?',
      title: 'Empecemos a *imaginarlo juntos*',
      text: 'Escribidnos o llamadnos: nos encantará conoceros y saber cómo soñáis vuestra boda.',
      cta: { label: 'Contadnos vuestra idea', to: 'contact' },
    },
    blog: {
      eyebrow: 'Blog',
      title: 'Ideas y consejos *para vuestra boda*',
      cta: { label: 'Ir al blog', to: 'blog' },
      readingTime: '{n} min de lectura',
      posts: [
        { category: 'Bodas', title: 'La organización de bodas en Asturias', excerpt: 'Cada vez más parejas de fuera eligen Asturias para casarse. Así organizamos bodas a distancia sin que se note ni un kilómetro.', minutes: 3, photo: { src: blogAsturias, alt: 'Mesa de boda al aire libre con velas, flores silvestres y copas doradas.' } },
        { category: 'Bodas', title: '¿Una ceremonia civil fría? Ni mucho menos', excerpt: 'Música, palabras de quienes más os quieren y el lugar que soñéis: así una ceremonia civil se convierte en la vuestra.', minutes: 1, photo: { src: blogCeremonia, alt: 'Ceremonia civil al aire libre.' } },
        { category: 'Inspiración', title: 'Editorial en el NH Palacio de Ferrera para Telva Novias', excerpt: 'Rosa cuarzo, granates y verdes en un palacio de Avilés con salón invernadero: así creamos esta editorial para Telva Novias.', minutes: 2, photo: { src: blogTelva, alt: 'Detalle del vestido de novia, con cuerpo de flores bordadas y capa de plumas.' } },
        { category: 'Inspiración', title: 'El lettering en tu boda', excerpt: 'Aprendimos lettering con Naranjas Chinas y os contamos por qué la papelería escrita a mano marca la diferencia.', minutes: 2, photo: { src: blogLettering, alt: 'Letras dibujadas a mano con la palabra «Hand lettering».' } },
        { category: 'Proveedores', title: 'Encuentros Dreams: el peinado de tu boda', excerpt: 'Una mañana de domingo con futuras novias, tendencias en peinados y tocados, y una mesa dulce irresistible.', minutes: 2, photo: { src: blogEncuentro, alt: 'Mesa preparada para el encuentro con futuras novias.' } },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Empezamos?',
      lead: 'Contadnos quiénes sois, cuándo y dónde os imagináis celebrándolo. Os responderemos personalmente.',
      form: {
        names: ['Vuestros nombres', 'Olaya y David'],
        email: ['Email', 'hola@ejemplo.com'],
        phone: ['Teléfono (opcional)', '+34 600 000 000'],
        date: ['Fecha aproximada', 'Septiembre de 2027'],
        place: ['Lugar o zona', 'Llanes, Asturias'],
        need: '¿Qué necesitáis?',
        needOptions: ['Organización integral', 'Diseño y decoración', 'Coordinación del día B', 'Una celebración', 'Tutoría online', 'Información del curso'],
        idea: ['Vuestra idea', 'Nos imaginamos una boda al aire libre, cerca del mar, con unos 120 invitados…'],
        privacy: 'He leído y acepto la',
        privacyLink: 'política de privacidad',
        submit: 'Enviar mensaje',
        prototypeNotice: 'Esto es un prototipo: el formulario todavía no envía mensajes. Se activará en la fase de desarrollo.',
      },
    },
  },

  en: {
    meta: {
      title: 'Wedding planner in Asturias, Spain · The Dreams Factory',
      description: 'We design, plan and coordinate weddings in Asturias, northern Spain. Weddings that feel like you.',
    },
    hero: {
      eyebrow: 'Wedding planners in Asturias, Spain, since 2015',
      title: 'Weddings that\n*feel like you*',
      intro: 'We design, plan and coordinate your wedding with calm and care for every detail, so all you have to do is live it.',
      primary: { label: 'Tell us your idea', to: 'contact' },
      secondary: { label: 'See our weddings', to: 'weddings' },
      slides: [
        { couple: '', place: '', duration: 18000, video: tableVideo, photo: { src: heroVideoPoster, alt: 'Aerial view of a long banquet table set in a courtyard surrounded by gardens.' } },
        { couple: 'N & T', place: 'Arenas de Cabrales', focus: '50% 40%', title: 'Moments that\n*stay with you*', intro: 'We look after every detail so the moments that matter arrive on their own, unhurried and worry-free.', photo: { src: hero1, alt: 'N and T embrace under a marquee decorated with string lights and greenery.' } },
        { couple: 'B & D', place: 'Ermita de Deva · Gijón', focus: '50% 55%', title: 'Every detail,\n*made for you*', intro: 'Design, styling and décor with a character of their own: flowers, light and tables that tell your story.', photo: { src: hero2, alt: 'A long banquet table with hydrangeas, candles and eucalyptus hanging from the ceiling.' } },
        { couple: 'A & M', place: 'Palacio de Moutas', focus: '50% 45%', title: 'All the emotion,\n*none of the worry*', intro: 'We handle suppliers, timings and back-up plans so all you have to do is look ahead.', photo: { src: hero3, alt: 'A and M leave the church under a shower of petals thrown by their guests.' } },
        { couple: 'A & S', place: '', focus: '45% 50%', title: 'Your story,\n*your way*', intro: 'No compulsory traditions, no “odd” weddings: we listen to who you are and turn it into your wedding.', photo: { src: hero4, alt: 'A and S lean against a black vintage car; she holds a white parasol, her long veil in the breeze, with mountains behind them.' } },
        { couple: 'A & M', place: 'The party', focus: '48% 35%', title: 'And you,\n*just enjoy it*', intro: 'On the day we coordinate everything behind the scenes so you can live it from start to finish with your people.', photo: { src: hero5, alt: 'A and M sit close together, smiling, beneath an ivy-framed neon sign reading “Fly me to the moon”.' } },
      ],
      controls: { region: 'Featured weddings', slide: 'Photo {n} of {total}', goTo: 'Show photo {n}: {caption}', pause: 'Pause the slideshow', play: 'Play the slideshow' },
    },
    story: {
      eyebrow: 'Our philosophy',
      title: 'Your wedding,\n*your rules*',
      lead: 'There are no compulsory traditions and no such thing as a “strange” wedding. There are two people, one story and a way of celebrating it that is theirs alone.',
      body: 'We listen, we suggest and we take care of everything else: suppliers, timelines, budget and the plan B we always have ready. You make every decision; we make it easy. We like you to call us by our first names, because that’s how closely we work with every couple.',
      signature: 'Bea & Vane',
      credentials: 'Wedding planners in Asturias since 2015, with university training in protocol and event management.',
      cta: { label: 'Get to know us', to: 'about' },
      team: { src: nosotras, alt: 'Beatriz and Vanessa of The Dreams Factory, sitting in a camper van decorated with dried flowers.' },
    },
    services: {
      eyebrow: 'Services',
      title: 'How we can *help*',
      cta: { label: 'See all services', to: 'services' },
      viewLabel: 'See this service',
      scale: { more: 'More support', less: 'Less support', apart: 'Celebrating something else?' },
      items: [
        { title: 'Full planning', level: 'Everything, start to finish', anchor: 'full-planning', text: 'From the first idea to the last dance: venue, suppliers, design, budget and coordination.', photo: { src: srvIntegral, alt: 'A garden set for a ceremony, with flower baskets and chairs.' } },
        { title: 'Design & styling', level: 'The creative side', anchor: 'design-and-styling', text: 'You’ve planned it yourselves, and now you want it to feel like yours. We create the styling and the details that tell your story.', photo: { src: srvDiseno, alt: 'A bride with a wildflower bouquet beside a floral arch.' } },
        { title: 'Wedding-day coordination', level: 'The big day', anchor: 'wedding-day-coordination', text: 'You’ve done the planning; we make sure everything runs as it should, starting days before.', photo: { src: srvDiaB, alt: 'The bride laughing with her friends while getting ready.' } },
        { title: 'Proposals & celebrations', apart: true, anchor: 'celebrations', text: 'A proposal, a golden anniversary, a sunset dinner. Tell us the idea and we’ll turn it into a moment to remember.', photo: { src: srvCelebraciones, alt: 'An outdoor table decorated with flowers and candles.' } },
      ],
    },
    weddings: {
      eyebrow: 'Weddings',
      title: 'Days we *still remember*',
      cta: { label: 'See all weddings', to: 'weddings' },
      viewLabel: 'See the wedding',
      items: [
        { couple: 'N & T', place: 'Arenas de Cabrales · Picos de Europa', photo: { src: bodaNyT, alt: 'N and T kiss under a marquee lit with string lights.' } },
        { couple: 'B & D', place: 'Ermita de Deva · Gijón', photo: { src: bodaByD, alt: 'Black-and-white portrait of B and D.' } },
        { couple: 'I & A', place: 'Palacio de La Riega · Gijón', photo: { src: bodaIyA, alt: 'I and A walk through the gardens of Palacio de La Riega.' } },
        { couple: 'O & D', place: 'Hacienda de la Llorea · Gijón', photo: { src: bodaOyD, alt: 'O and D embrace in a garden styled with wild flowers and rugs.' } },
        { couple: 'G & EJ', place: 'Puebloastur', photo: { src: bodaGyEJ, alt: 'Black-and-white portrait of G and EJ with the mountains behind them.' }, focus: '45% 40%' },
        { couple: 'A & M', place: 'Palacio de Moutas', photo: { src: bodaAyM, alt: 'A and M smile, holding the bridal bouquet.' }, focus: '50% 40%' },
      ],
    },
    reviews: {
      eyebrow: 'Kind words',
      note: 'Translated from Spanish',
      cta: { label: 'Read all reviews', to: 'reviews' },
      controls: { region: 'Reviews from couples', goTo: 'Show the review from {author}', pause: 'Pause the reviews', play: 'Play the reviews' },
      items: [
        { quote: '“Hiring them was the best decision we made for our wedding. With them, it’s impossible for a wedding not to go well.”', author: 'Marta & Omar', credit: 'David Fernández', photo: opMartaOmar, focus: '50% 40%' },
        { quote: '“Every one of our guests agrees it was the most moving and thoughtfully cared-for celebration they have ever been to.”', author: 'David & Germán', photo: opDavidGerman },
        { quote: '“Our wedding was perfect, 100% perfect, and it was all thanks to them.”', author: 'Nadia & Tomás', credit: 'David Fernández', photo: opNadiaTomas, focus: '50% 35%' },
        { quote: '“On our wedding day I was completely calm, and it was mostly because I knew they were there!”', author: 'María & Gaspar', credit: 'La Cabina Roja', photo: opMariaGaspar },
        { quote: '“We couldn’t be happier that we chose you. If I got married again, I’d hire you again without a doubt.”', author: 'Aida & Adrián', credit: 'M2 Visual Studio', photo: opAidaAdrian, focus: '50% 35%' },
        { quote: '“We’ll recommend them a thousand times over, as many times as it takes.”', author: 'Sonia & Alberto', credit: 'M2 Visual Studio', photo: opSoniaAlberto, focus: '50% 30%' },
      ],
    },
    education: {
      eyebrow: 'Education',
      title: 'Learn *with us*',
      course: {
        audience: 'For future wedding planners',
        badge: '3 editions so far',
        title: 'The Wedding Planner Experience',
        text: 'A three-day intensive course for anyone who wants to plan weddings for a living. We share our method, our supplier network and a complete wedding walked through from start to finish at a real venue.',
        meta: 'Small groups · 3 immersive days',
        cta: { label: 'Discover the course', to: 'course' },
        photo: { src: cursoEdicion, alt: 'Bea and Vane teach a course session to students seated around a flower-dressed table in a palace room.' },
        focus: '50% 40%',
      },
      consultations: {
        audience: 'For couples',
        title: 'Online consultations',
        text: 'Planning it yourselves but want an expert’s view? A session over coffee to sort out your ideas and answer your questions.',
        meta: '90-minute video call · €49',
        cta: { label: 'Book a consultation', to: 'consultations' },
        photo: { src: tutorias, alt: 'A wedding planner’s notebook with handwritten notes.' },
      },
    },
    closing: {
      script: 'Can you picture the day?',
      title: 'Let’s start *imagining it together*',
      text: 'Write to us or give us a call: we’d love to meet you and hear how you dream of your wedding.',
      cta: { label: 'Tell us your idea', to: 'contact' },
    },
    blog: {
      eyebrow: 'Blog',
      title: 'Ideas and advice *for your wedding*',
      cta: { label: 'Go to the blog', to: 'blog' },
      readingTime: '{n} min read',
      posts: [
        { category: 'Weddings', title: 'Planning a wedding in Asturias', excerpt: 'More and more couples from elsewhere choose Asturias for their wedding. Here’s how we plan weddings from afar without the distance ever showing.', minutes: 3, photo: { src: blogAsturias, alt: 'An outdoor wedding table with candles, wild flowers and gold-rimmed glasses.' } },
        { category: 'Weddings', title: 'A cold civil ceremony? Far from it', excerpt: 'Music, words from the people who love you most and the place of your dreams: that’s how a civil ceremony becomes truly yours.', minutes: 1, photo: { src: blogCeremonia, alt: 'An outdoor civil ceremony.' } },
        { category: 'Inspiration', title: 'An editorial at NH Palacio de Ferrera for Telva Novias', excerpt: 'Rose quartz, garnet and greens in an Avilés palace with a glasshouse ballroom: the story behind our editorial for Telva Novias.', minutes: 2, photo: { src: blogTelva, alt: 'Detail of the wedding dress, with an embroidered floral bodice and a feather cape.' } },
        { category: 'Inspiration', title: 'Hand lettering at your wedding', excerpt: 'We learned hand lettering with Naranjas Chinas, and here’s why handwritten stationery makes all the difference.', minutes: 2, photo: { src: blogLettering, alt: 'Hand-drawn letters spelling “Hand lettering”.' } },
        { category: 'Suppliers', title: 'Dreams Meet-up: your wedding hairstyle', excerpt: 'A Sunday morning with brides-to-be, the latest hairstyles and headpieces, and an irresistible sweet table.', minutes: 2, photo: { src: blogEncuentro, alt: 'A table set for a meet-up with brides-to-be.' } },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Shall we begin?',
      lead: 'Tell us who you are, and when and where you picture your celebration. We’ll reply to you personally.',
      form: {
        names: ['Your names', 'Olivia and James'],
        email: ['Email', 'hello@example.com'],
        phone: ['Phone (optional)', '+44 7700 900000'],
        date: ['Approximate date', 'September 2027'],
        place: ['Venue or area', 'Llanes, Asturias'],
        need: 'What do you need?',
        needOptions: ['Full planning', 'Design & styling', 'Wedding-day coordination', 'A celebration', 'Online consultation', 'Course information'],
        idea: ['Your idea', 'We picture an outdoor wedding near the sea, with around 120 guests…'],
        privacy: 'I have read and accept the',
        privacyLink: 'privacy policy',
        submit: 'Send message',
        prototypeNotice: 'This is a prototype: the form doesn’t send messages yet. It will be enabled during development.',
      },
    },
  },
};
