/**
 * Bodas: listado (/bodas, /en/weddings) y una página por boda (/bodas/{slug}, /en/weddings/{slug}).
 *
 * Origen: las bodas publicadas en la web antigua (las que Bea y Vane tenían ocultas no están), con sus textos y la
 * lista de proveedores. Las parejas van solo con iniciales. PENDIENTE DE CONFIRMAR con Bea y Vane: la selección, el
 * servicio contratado en cada boda (solo se indica cuando la web antigua lo decía), los textos de cada boda y que se
 * pueden publicar los proveedores. Por ahora solo I & A tiene su página completa (galería, ficha y proveedores);
 * el resto se irá completando con el mismo formato.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/routes';

import bodaIyA from '../assets/photos/boda-iya-palacio-la-riega.jpg';
import bodaAyM from '../assets/photos/boda-aym-palacio-de-moutas.jpg';
import bodaNyT from '../assets/photos/boda-nyt-arenas-de-cabrales.jpg';
import bodaGyEJ from '../assets/photos/boda-gej-puebloastur.jpg';
import bodaOyD from '../assets/photos/boda-oyd-hacienda-la-llorea.jpg';
import bodaByD from '../assets/photos/boda-byd-ermita-de-deva.jpg';
import bodaMyF from '../assets/photos/bodas/myf-coto-del-pomar.jpg';
import bodaSyA from '../assets/photos/bodas/sya-zoreda.jpg';
import bodaCyM from '../assets/photos/bodas/cym-la-riega.jpg';
import bodaYyK from '../assets/photos/bodas/yyk-conde-toreno.jpg';
import bodaAyA from '../assets/photos/bodas/aya-san-cucao.jpg';
import editorialNH from '../assets/photos/bodas/editorial-nh-aviles.jpg';
import editorialBanjara from '../assets/photos/bodas/editorial-banjara.jpg';

import iyaPortada from '../assets/photos/bodas/iya-la-riega/00-portada.jpg';
import iya01 from '../assets/photos/bodas/iya-la-riega/01.jpg';
import iya02 from '../assets/photos/bodas/iya-la-riega/02.jpg';
import iya03 from '../assets/photos/bodas/iya-la-riega/03.jpg';
import iya04 from '../assets/photos/bodas/iya-la-riega/04.jpg';
import iya05 from '../assets/photos/bodas/iya-la-riega/05.jpg';
import iya06 from '../assets/photos/bodas/iya-la-riega/06.jpg';
import iya07 from '../assets/photos/bodas/iya-la-riega/07.jpg';
import iya08 from '../assets/photos/bodas/iya-la-riega/08.jpg';
import iya09 from '../assets/photos/bodas/iya-la-riega/09.jpg';
import iya10 from '../assets/photos/bodas/iya-la-riega/10.jpg';
import iya11 from '../assets/photos/bodas/iya-la-riega/11.jpg';
import iya12 from '../assets/photos/bodas/iya-la-riega/12.jpg';
import iya13 from '../assets/photos/bodas/iya-la-riega/13.jpg';
import iya14 from '../assets/photos/bodas/iya-la-riega/14.jpg';
import iya15 from '../assets/photos/bodas/iya-la-riega/15.jpg';
import iya16 from '../assets/photos/bodas/iya-la-riega/16.jpg';
import iya17 from '../assets/photos/bodas/iya-la-riega/17.jpg';
import iya18 from '../assets/photos/bodas/iya-la-riega/18.jpg';
import iya19 from '../assets/photos/bodas/iya-la-riega/19.jpg';
import iya20 from '../assets/photos/bodas/iya-la-riega/20.jpg';

type T = Record<Lang, string>;
export type WeddingPhoto = { src: ImageMetadata; alt: T; focus?: string };

/** Tipo de lugar (filtros del listado). */
export type Venue = 'palacio' | 'campo';
/** Servicio contratado (mismos nombres que la página de Servicios). */
export type Service = 'integral' | 'diseno' | 'coordinacion';

export type Wedding = {
  /** Dirección de su página en cada idioma (sin /bodas/ ni /en/weddings/). */
  slug: T;
  couple: string;
  /** «Lugar · Zona». */
  place: string;
  venue: Venue;
  service?: Service;
  photographer: string;
  cover: WeddingPhoto;
  /** Solo las bodas con página completa. */
  page?: {
    hero: WeddingPhoto;
    season: T;
    video?: string;
    story: Record<Lang, string[]>;
    /** Opinión de la pareja, si la dejó (la misma que en Opiniones). */
    review?: { quote: T; author: string };
    gallery: WeddingPhoto[];
    /** Proveedores (sin The Dreams Factory). */
    credits: { role: T; name: string }[];
  };
};

export type Editorial = {
  title: string; text: T; photographer?: string; cover: WeddingPhoto;
  /** Cuándo se hizo y dónde se publicó. */
  date?: T; published?: T;
  /** Otros proveedores (además del fotógrafo). */
  credits?: { role: T; name: string }[];
};

export const weddingsPage: Record<Lang, {
  meta: { title: string; description: string };
  eyebrow: string; title: string; lead: string;
  filters: { all: string; palacio: string; campo: string; label: string };
  services: Record<Service, string>;
  viewLabel: string; soon: string; photoBy: string;
  press: { eyebrow: string };
  editorials: { eyebrow: string; title: string; lead: string };
  detail: {
    back: string; facts: { place: string; season: string; service: string; photo: string; video: string };
    gallery: string; credits: string; more: string; all: string; enlarge: string; close: string; prev: string; next: string; of: string;
  };
}> = {
  es: {
    meta: {
      title: 'Bodas en Asturias · The Dreams Factory',
      description: 'Bodas reales que hemos organizado, diseñado y coordinado en palacios, castillos, casas de campo y montaña de Asturias.',
    },
    eyebrow: 'Bodas',
    title: 'Días que *seguimos recordando*',
    lead: 'Cada boda es la historia de una pareja. Estas son algunas de las que hemos tenido la suerte de acompañar en Asturias, cada una a su manera.',
    filters: { label: 'Filtrar por lugar', all: 'Todas', palacio: 'Palacios y castillos', campo: 'Campo y montaña' },
    services: { integral: 'Organización integral', diseno: 'Diseño y coordinación del día B', coordinacion: 'Coordinación del día B' },
    viewLabel: 'Ver la boda',
    soon: 'Galería próximamente',
    photoBy: 'Fotografía',
    press: { eyebrow: 'Nuestras bodas, publicadas en' },
    editorials: {
      eyebrow: 'Editoriales',
      title: 'Cuando *jugamos a imaginar*',
      lead: 'Sesiones creativas con fotógrafos y firmas amigas: sin novios de verdad, pero con todo nuestro estilo.',
    },
    detail: {
      back: 'Todas las bodas',
      facts: { place: 'Lugar', season: 'Época', service: 'Servicio', photo: 'Fotografía', video: 'Vídeo' },
      gallery: 'El día',
      credits: 'Proveedores',
      more: 'Más bodas',
      all: 'Ver todas las bodas',
      enlarge: 'Ampliar la foto',
      close: 'Cerrar',
      prev: 'Foto anterior',
      next: 'Foto siguiente',
      of: 'de',
    },
  },
  en: {
    meta: {
      title: 'Weddings in Asturias, Spain · The Dreams Factory',
      description: 'Real weddings we have planned, designed and coordinated in palaces, castles, country houses and mountain venues in Asturias.',
    },
    eyebrow: 'Weddings',
    title: 'Days we *still remember*',
    lead: 'Every wedding tells a couple’s story. These are some of the ones we have been lucky enough to be part of in Asturias, each in its own way.',
    filters: { label: 'Filter by venue', all: 'All', palacio: 'Palaces & castles', campo: 'Countryside & mountains' },
    services: { integral: 'Full planning', diseno: 'Design & wedding-day coordination', coordinacion: 'Wedding-day coordination' },
    viewLabel: 'See the wedding',
    soon: 'Gallery coming soon',
    photoBy: 'Photography',
    press: { eyebrow: 'Our weddings, featured in' },
    editorials: {
      eyebrow: 'Editorials',
      title: 'When we *play at imagining*',
      lead: 'Creative shoots with photographers and brands we love: no real couples, but all of our style.',
    },
    detail: {
      back: 'All weddings',
      facts: { place: 'Venue', season: 'Season', service: 'Service', photo: 'Photography', video: 'Video' },
      gallery: 'The day',
      credits: 'Suppliers',
      more: 'More weddings',
      all: 'See all weddings',
      enlarge: 'Enlarge photo',
      close: 'Close',
      prev: 'Previous photo',
      next: 'Next photo',
      of: 'of',
    },
  },
};

const p = (src: ImageMetadata, es: string, en: string, focus?: string): WeddingPhoto => ({ src, alt: { es, en }, focus });

/** Bodas, de la más reciente a la más antigua. */
export const weddings: Wedding[] = [
  {
    slug: { es: 'i-y-a-palacio-de-la-riega', en: 'i-and-a-palacio-de-la-riega' },
    couple: 'I & A',
    place: 'Palacio de La Riega · Gijón',
    venue: 'palacio',
    photographer: 'Darío Martínez',
    cover: p(bodaIyA, 'I y A pasean por el jardín del Palacio de La Riega.', 'I and A stroll through the gardens of Palacio de La Riega.'),
    page: {
      hero: p(iyaPortada, 'I y A salen de la iglesia entre confeti y aplausos de sus invitados.', 'I and A leave the church to confetti and applause from their guests.', '50% 45%'),
      season: { es: 'Otoño', en: 'Autumn' },
      video: 'Héctor Torra',
      story: {
        es: [
          'I y A tuvieron su boda soñada con Gijón a sus pies.',
          'La luz increíble que nos regalan los días de otoño tampoco se la quiso perder y así, sin más, su día fue mágico.',
        ],
        en: [
          'I and A had the wedding of their dreams with Gijón at their feet.',
          'The wonderful light of an autumn day didn’t want to miss it either and so, quite simply, their day was magical.',
        ],
      },
      gallery: [
        p(iya01, 'El vestido de novia cuelga bajo un arco de flores de otoño en la entrada del palacio.', 'The wedding dress hangs beneath an arch of autumn flowers at the palace entrance.'),
        p(iya02, 'La novia, con su ramo silvestre, junto a la ventana.', 'The bride with her wildflower bouquet by the window.'),
        p(iya03, 'La novia se abraza con una amiga mientras se prepara. En blanco y negro.', 'The bride hugs a friend while getting ready. In black and white.'),
        p(iya04, 'Los pendientes y el anillo sobre la mesa.', 'The earrings and the ring on the table.'),
        p(iya05, 'El novio, con traje verde y flor en la solapa, ante una pared de hiedra.', 'The groom, in a green suit with a flower in his lapel, against an ivy-covered wall.'),
        p(iya06, 'El arco de flores de otoño en la puerta de piedra del palacio.', 'The arch of autumn flowers around the palace’s stone doorway.'),
        p(iya07, 'Los novios, en el coche camino de la iglesia. En blanco y negro.', 'The couple in the car on the way to the church. In black and white.'),
        p(iya08, 'La novia camina hacia el altar. En blanco y negro.', 'The bride walks down the aisle. In black and white.'),
        p(iya09, 'El primer beso de casados a la salida de la iglesia. En blanco y negro.', 'Their first kiss as a married couple outside the church. In black and white.'),
        p(iya10, 'La torre del Palacio de La Riega.', 'The tower of Palacio de La Riega.'),
        p(iya11, 'Los novios pasean por el jardín, con la torre al fondo.', 'The couple stroll through the garden, with the tower behind them.'),
        p(iya12, 'La espalda del vestido y el abrazo del novio.', 'The back of the dress and the groom’s embrace.'),
        p(iya13, 'Los novios se miran sonriendo.', 'The couple smile at each other.'),
        p(iya14, 'La novia, con el velo al viento en el prado. En blanco y negro.', 'The bride in the meadow, her veil in the wind. In black and white.'),
        p(iya15, 'El seating plan, entre flores, en la entrada.', 'The seating plan among flowers at the entrance.'),
        p(iya16, 'Las mesas del banquete con velas y flores.', 'The reception tables with candles and flowers.'),
        p(iya17, 'Centro de mesa con flores de otoño y velas.', 'A centrepiece of autumn flowers and candles.'),
        p(iya18, 'Mesa con velas burdeos y flores.', 'A table with burgundy candles and flowers.'),
        p(iya19, 'El primer baile de los novios. En blanco y negro.', 'The couple’s first dance. In black and white.'),
        p(iya20, 'La novia baila con sus amigas en la fiesta.', 'The bride dances with her friends at the party.'),
      ],
      credits: [
        { role: { es: 'Lugar', en: 'Venue' }, name: 'Palacio de La Riega' },
        { role: { es: 'Catering', en: 'Catering' }, name: 'Manzano' },
        { role: { es: 'Fotografía', en: 'Photography' }, name: 'Darío Martínez' },
        { role: { es: 'Vídeo', en: 'Video' }, name: 'Héctor Torra' },
        { role: { es: 'Flores', en: 'Flowers' }, name: 'Flores El Invernadero' },
        { role: { es: 'Música del aperitivo', en: 'Cocktail-hour music' }, name: 'Pablo Valdés' },
        { role: { es: 'DJ', en: 'DJ' }, name: 'Siapro Eventos' },
        { role: { es: 'Fotomatón', en: 'Photo booth' }, name: 'La Cámara Glam' },
        { role: { es: 'Peluquería', en: 'Hair' }, name: 'Barbareando' },
        { role: { es: 'Maquillaje', en: 'Make-up' }, name: 'María Bernabeu' },
      ],
    },
  },
  {
    slug: { es: 'a-y-m-palacio-de-moutas', en: 'a-and-m-palacio-de-moutas' },
    couple: 'A & M', place: 'Palacio de Moutas', venue: 'palacio', photographer: 'M2 Visual Studio',
    cover: p(bodaAyM, 'A y M sonríen con el ramo de novia en las manos.', 'A and M smile, holding the bridal bouquet.', '50% 40%'),
  },
  {
    slug: { es: 'n-y-t-arenas-de-cabrales', en: 'n-and-t-arenas-de-cabrales' },
    couple: 'N & T', place: 'Arenas de Cabrales · Picos de Europa', venue: 'campo', photographer: 'David Fernández',
    cover: p(bodaNyT, 'N y T se besan en una carpa iluminada con guirnaldas.', 'N and T kiss under a marquee lit with string lights.'),
  },
  {
    slug: { es: 'm-y-f-coto-del-pomar', en: 'm-and-f-coto-del-pomar' },
    couple: 'M & F', place: 'Hotel Coto del Pomar', venue: 'campo', photographer: 'Pedro Mon',
    cover: p(bodaMyF, 'M y F, ante unas ruinas de piedra cubiertas de vegetación.', 'M and F in front of stone ruins covered in greenery.', '30% 60%'),
  },
  {
    slug: { es: 'g-y-ej-puebloastur', en: 'g-and-ej-puebloastur' },
    couple: 'G & EJ', place: 'Puebloastur', venue: 'campo', photographer: 'JFK Imagen Social',
    cover: p(bodaGyEJ, 'Retrato en blanco y negro de G y EJ con las montañas de fondo.', 'Black-and-white portrait of G and EJ with the mountains behind them.', '45% 40%'),
  },
  {
    slug: { es: 's-y-a-castillo-de-la-zoreda', en: 's-and-a-castillo-de-la-zoreda' },
    couple: 'S & A', place: 'Castillo Bosque de la Zoreda', venue: 'palacio', photographer: 'M2 Visual Studio',
    cover: p(bodaSyA, 'S y A se besan delante del seating plan decorado con flores.', 'S and A kiss in front of the flower-decked seating plan.'),
  },
  {
    slug: { es: 'o-y-d-hacienda-de-la-llorea', en: 'o-and-d-hacienda-de-la-llorea' },
    couple: 'O & D', place: 'Hacienda de la Llorea · Gijón', venue: 'campo', service: 'diseno', photographer: 'M2 Visual Studio',
    cover: p(bodaOyD, 'O y D se abrazan en un jardín decorado con flores silvestres y alfombras.', 'O and D embrace in a garden dressed with wildflowers and rugs.'),
  },
  {
    slug: { es: 'c-y-m-palacio-de-la-riega', en: 'c-and-m-palacio-de-la-riega' },
    couple: 'C & M', place: 'Palacio de La Riega · Gijón', venue: 'palacio', service: 'coordinacion', photographer: 'JFK Imagen Social',
    cover: p(bodaCyM, 'C y M, durante la ceremonia al aire libre en el jardín del palacio.', 'C and M during the outdoor ceremony in the palace garden.', '60% 50%'),
  },
  {
    slug: { es: 'y-y-k-palacio-conde-de-toreno', en: 'y-and-k-palacio-conde-de-toreno' },
    couple: 'Y & K', place: 'Palacio Conde de Toreno', venue: 'palacio', service: 'integral', photographer: 'Días de Vino y Rosas',
    cover: p(bodaYyK, 'Y, de espaldas, en la balaustrada del palacio rodeada de hortensias.', 'Y, seen from behind, at the palace balustrade surrounded by hydrangeas.'),
  },
  {
    slug: { es: 'b-y-d-ermita-de-deva', en: 'b-and-d-ermita-de-deva' },
    couple: 'B & D', place: 'Ermita de Deva · Gijón', venue: 'campo', service: 'integral', photographer: 'Darío Martínez',
    cover: p(bodaByD, 'Retrato en blanco y negro de B y D.', 'Black-and-white portrait of B and D.'),
  },
  {
    slug: { es: 'a-y-a-castillo-de-san-cucao', en: 'a-and-a-castillo-de-san-cucao' },
    couple: 'A & A', place: 'Castillo de San Cucao', venue: 'palacio', service: 'diseno', photographer: 'M2 Visual Studio',
    cover: p(bodaAyA, 'A y A se abrazan bajo un arco de flores.', 'A and A embrace beneath an arch of flowers.', '40% 50%'),
  },
];

export const editorials: Editorial[] = [
  {
    title: 'Banjara · A Wild Romance',
    text: { es: 'Una historia bohemia entre rocas, flores secas y encaje.', en: 'A bohemian story among rocks, dried flowers and lace.' },
    cover: p(editorialBanjara, 'Una pareja bajo un arco triangular de flores secas ante una pared de roca.', 'A couple beneath a triangular arch of dried flowers against a rock face.', '50% 35%'),
  },
  {
    title: 'NH Collection Palacio de Avilés',
    text: { es: 'Elegancia a la luz de las velas en el Palacio de Ferrera, el mismo palacio donde después impartiríamos nuestro curso.', en: 'Candlelit elegance at the Palacio de Ferrera, the same palace where we would later hold our course.' },
    photographer: 'JFK Imagen Social',
    date: { es: 'Agosto de 2017', en: 'August 2017' },
    published: { es: 'Publicada en Telva Novias: «Casarse en un palacio asturiano»', en: 'Featured in Telva Novias: “Casarse en un palacio asturiano”' },
    credits: [
      { role: { es: 'Diseño floral', en: 'Floral design' }, name: 'Leymar Floristas' },
      { role: { es: 'Estilismo de novia', en: 'Bridal styling' }, name: 'Marcos Luengo' },
    ],
    cover: p(editorialNH, 'Una novia con su ramo junto a una escalera iluminada con velas.', 'A bride holding her bouquet beside a candlelit staircase.'),
  },
];

/** Dirección de la página de una boda (o del listado, si aún no tiene página). */
export function weddingHref(w: Wedding, lang: Lang): string {
  const base = lang === 'es' ? '/bodas' : '/en/weddings';
  return w.page ? `${base}/${w.slug[lang]}` : base;
}

/** La boda de una pareja (por sus iniciales, como aparecen en la portada). */
export const weddingByCouple = (couple: string) => weddings.find((w) => w.couple === couple);
