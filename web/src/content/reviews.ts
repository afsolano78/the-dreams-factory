/**
 * Página «Opiniones» (/opiniones, /en/reviews). ES y EN.
 *
 * Origen: las 13 opiniones publicadas en la web antigua (2017-2020), literales: solo se corrigen erratas. En inglés
 * van traducidas, con un aviso de que el original está en español. Las parejas, solo por su nombre de pila.
 * `wedding`: iniciales de su boda en el listado de Bodas (si tiene página, la tarjeta enlaza a ella).
 *
 * PENDIENTE (Bea y Vane): opiniones de bodas recientes (2021-2025), perfiles de reseñas (Google, Bodas.net…) con
 * enlace y nota media (`profiles`), y fotos de Katherine y Albano y de Nuria y Manel.
 */
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/routes';
import fotoNadiaTomas from '../assets/photos/opiniones/nadia-tomas.jpg';
import fotoSoniaAlberto from '../assets/photos/opiniones/sonia-alberto.jpg';
import fotoPaulaDavid from '../assets/photos/opiniones/paula-david.jpg';
import fotoOlayaDavid from '../assets/photos/opiniones/olaya-david.jpg';
import fotoMartaOmar from '../assets/photos/opiniones/marta-omar.jpg';
import fotoAlbaDani from '../assets/photos/opiniones/alba-dani.jpg';
import fotoPatriciaGerardo from '../assets/photos/opiniones/patricia-gerardo.jpg';
import fotoMariaGaspar from '../assets/photos/opiniones/maria-gaspar.jpg';
import fotoDavidGerman from '../assets/photos/opiniones/david-german.jpg';
import fotoBeatrizDaniel from '../assets/photos/opiniones/beatriz-daniel.jpg';
import fotoAidaAdrian from '../assets/photos/opiniones/aida-adrian.jpg';

type T = Record<Lang, string>;

export type Review = {
  /** Nombres de pila de la pareja en cada idioma («Nadia y Tomás» / «Nadia & Tomás»). */
  couple: T;
  place?: string;
  /** Iniciales de su boda en el listado de Bodas. */
  wedding?: string;
  /** La frase que se destaca en la tarjeta. */
  highlight: T;
  text: Record<Lang, string[]>;
  photo?: { src: ImageMetadata; focus?: string };
  /** Fotógrafo de la foto de su boda. */
  credit?: string;
};

export const reviewsPage: Record<Lang, {
  meta: { title: string; description: string };
  eyebrow: string; title: string; lead: string;
  hero: { quote: string; author: string };
  themes: { eyebrow: string; title: string; items: { title: string; quote: string; author: string }[] };
  featured: { eyebrow: string };
  all: { eyebrow: string; title: string };
  readMore: string; readLess: string; seeWedding: string; photoBy: string;
  /** Aviso de traducción (solo en inglés). */
  note?: string;
  profiles: { eyebrow: string; title: string; items: { name: string; href: string; rating?: string }[] };
}> = {
  es: {
    meta: {
      title: 'Opiniones de parejas · The Dreams Factory, wedding planners en Asturias',
      description: 'Lo que dicen las parejas que han confiado en Bea y Vane para organizar, diseñar y coordinar su boda en Asturias y León.',
    },
    eyebrow: 'Opiniones',
    title: 'Lo que dicen\n*las parejas*',
    lead: 'Sus palabras, tal cual nos las escribieron. Son, de todo lo que hacemos, lo que más nos emociona.',
    hero: { quote: '«Con ellas, es imposible que una boda no salga bien.»', author: 'Marta y Omar' },
    themes: {
      eyebrow: 'Lo que más repiten',
      title: 'Tres cosas que *nunca faltan*',
      items: [
        { title: 'Tranquilidad', quote: '«Es la tranquilidad y la certeza de que todo va a salir bien.»', author: 'Katherine y Albano' },
        { title: 'Detalles', quote: '«Nuestra boda estuvo llena de detalles y tuvo una decoración preciosa, tal y como siempre la habíamos imaginado.»', author: 'Nuria y Manel' },
        { title: 'Cercanía', quote: '«Capaces de emocionarse y vivir una boda tanto como lo hemos vivido nosotros.»', author: 'Marta y Omar' },
      ],
    },
    featured: { eyebrow: 'Una carta que guardamos' },
    all: { eyebrow: 'Todas las opiniones', title: 'En sus *palabras*' },
    readMore: 'Leer su opinión completa',
    readLess: 'Cerrar',
    seeWedding: 'Ver su boda',
    photoBy: 'Foto',
    profiles: { eyebrow: 'Más opiniones', title: 'Encuéntranos *también en*', items: [] },
  },
  en: {
    meta: {
      title: 'Reviews from couples · The Dreams Factory, wedding planners in Asturias',
      description: 'What couples say about Bea and Vane, who planned, designed and coordinated their weddings in Asturias and León, Spain.',
    },
    eyebrow: 'Reviews',
    title: 'What couples\n*say about us*',
    lead: 'Their words, just as they wrote them to us. Of everything we do, this is what moves us most.',
    hero: { quote: '“With them, it’s impossible for a wedding not to go well.”', author: 'Marta & Omar' },
    themes: {
      eyebrow: 'What they mention most',
      title: 'Three things that are *always there*',
      items: [
        { title: 'Peace of mind', quote: '“It’s the peace of mind and the certainty that everything will go well.”', author: 'Katherine & Albano' },
        { title: 'Details', quote: '“Our wedding was full of details and had beautiful décor, just as we had always imagined it.”', author: 'Nuria & Manel' },
        { title: 'Closeness', quote: '“They get as moved and live a wedding as intensely as we did.”', author: 'Marta & Omar' },
      ],
    },
    featured: { eyebrow: 'A letter we treasure' },
    all: { eyebrow: 'All reviews', title: 'In their *own words*' },
    readMore: 'Read the full review',
    readLess: 'Close',
    seeWedding: 'See their wedding',
    photoBy: 'Photo',
    note: 'Reviews translated from the original Spanish.',
    profiles: { eyebrow: 'More reviews', title: 'You’ll also *find us on*', items: [] },
  },
};

/** De la más reciente a la más antigua. La destacada (`featured`) se muestra entera en su propio bloque. */
export const reviews: Review[] = [
  {
    couple: { es: 'Nadia y Tomás', en: 'Nadia & Tomás' },
    place: 'Arenas de Cabrales · Picos de Europa', wedding: 'N & T',
    highlight: { es: '«Nuestra boda fue perfecta, 100 % perfecta, y todo gracias a ellas.»', en: '“Our wedding was perfect, 100% perfect, and it was all thanks to them.”' },
    photo: { src: fotoNadiaTomas, focus: '50% 35%' }, credit: 'David Fernández',
    text: {
      es: [
        '¡Nos faltan las palabras para agradecer lo que hicieron por nosotros!',
        'Nos casamos en mayo en Asturias. Vivimos fuera y queríamos que nuestra boda fuese en una finca familiar, así que decidimos buscar ayuda. Con Bea y Vane conectamos perfectamente desde el primer momento, o mejor dicho, ¡desde el primer Skype! Y contratarlas fue la mejor decisión que pudimos tomar. Nuestra boda fue perfecta, 100 % perfecta, y todo gracias a ellas. Todos los invitados acabaron encantados; todos coincidían en lo especial y llena de detalles que fue y en que nos representaba a la perfección. ¡Increíble! La decoración, de cuento de hadas; la papelería, impresionante, y todos los proveedores que nos recomendaron, profesionales como la copa de un pino, a los que coordinaron para tener todo milimetrado al detalle.',
        'Se ocupan de absolutamente todo y se amoldan a tus gustos y necesidades. No sabemos ni cómo, pero cada vez que íbamos a Asturias allí estaban ellas para quedar. El día de la boda nos acompañaron y se ocuparon de TODO; te transmiten una tranquilidad increíble y nosotros pudimos desentendernos por completo y disfrutar de nuestro día. Para cualquier cosa que les pidas, aunque sea la típica histeria de novios, jamás te contestan con un «no»: siempre con buena cara, hacen lo posible para que todo salga como tú deseas.',
        'Siempre nos acordaremos de ellas con mucho cariño y estaremos eternamente agradecidos. De corazón, ¡un millón de gracias, chicas, sois las mejores!',
      ],
      en: [
        'We can’t find the words to thank them for what they did for us!',
        'We got married in May in Asturias. We live abroad and wanted our wedding to be at a family estate, so we decided to look for help. We clicked with Bea and Vane from the very first moment, or rather, from the very first Skype call! Hiring them was the best decision we could have made. Our wedding was perfect, 100% perfect, and it was all thanks to them. All our guests were delighted; everyone agreed on how special and detailed it was and how perfectly it represented us. Incredible! Fairy-tale décor, stunning stationery, and every supplier they recommended was a true professional, all coordinated so that everything ran like clockwork.',
        'They take care of absolutely everything and adapt to your tastes and needs. We don’t know how, but every time we came to Asturias they were there to meet us. On the wedding day they were with us and took care of EVERYTHING; they give you an incredible sense of calm, and we were able to switch off completely and enjoy our day. Whatever you ask of them, even the typical wedding-nerves meltdown, they never say “no”: always with a smile, they do everything they can so it all turns out the way you want.',
        'We will always remember them fondly and be eternally grateful. From the bottom of our hearts, a million thanks, girls, you are the best!',
      ],
    },
  },
  {
    couple: { es: 'Sonia y Alberto', en: 'Sonia & Alberto' },
    place: 'Castillo Bosque de la Zoreda', wedding: 'S & A',
    highlight: { es: '«Las recomendaremos una y mil veces, las que hagan falta.»', en: '“We’ll recommend them a thousand times over, as many times as it takes.”' },
    photo: { src: fotoSoniaAlberto, focus: '50% 30%' }, credit: 'M2 Visual Studio',
    text: {
      es: [
        'Lo primero que queremos decirles es un ¡GRACIAS! gigantesco.',
        'Contactamos con Bea y Vane para que nos ayudaran en el día de nuestra boda; nos las recomendó una amiga que trabaja en el sector, porque por temas de trabajo nos iba a ser muy complicado organizar el día B sin su ayuda, y no pudimos tomar mejor decisión que contar con ellas.',
        'El día que nos conocimos supe que iba a ser estupendo contar con ellas: son unas profesionales como la copa de un pino y con muchísimas ideas que luego llevan a cabo, y así fue.',
        'El resultado no pudo ser mejor: todo quedó genial, precioso, estupendo, no faltó detalle, todo fue muy nosotros… No tengo adjetivos para describir lo que hicieron el día de nuestra boda, y todo fue gracias a ellas. La gente nos dio la enhorabuena por lo genial que había salido todo y lo bonito que estaba decorado (gusto no les falta).',
        'Las recomendaremos una y mil veces, las que hagan falta. Profesionales como ellas en este sector dan muchísima luz a los novios, muchísima ilusión y, sobre todo, sueños cumplidos… ¿Qué más se puede pedir?',
      ],
      en: [
        'The first thing we want to say to them is a giant THANK YOU!',
        'We got in touch with Bea and Vane to help us with our wedding day; a friend who works in the industry recommended them, because with our jobs it was going to be very hard to organise the big day without their help, and we couldn’t have made a better decision.',
        'The day we met them I knew it would be wonderful to have them on board: they are true professionals, with loads of ideas that they then bring to life, and so they did.',
        'The result couldn’t have been better: everything looked great, beautiful, wonderful, not a detail was missing, it was all so “us”… I have no words to describe what they did on our wedding day, and it was all thanks to them. People congratulated us on how well everything went and how beautiful the décor was (they certainly have taste).',
        'We’ll recommend them a thousand times over, as many times as it takes. Professionals like them bring so much light and excitement to couples and, above all, dreams come true… What more could you ask for?',
      ],
    },
  },
  {
    couple: { es: 'Paula y David', en: 'Paula & David' },
    highlight: { es: '«Ellas son magia y profesionalidad, siempre con una sonrisa.»', en: '“They are magic and professionalism, always with a smile.”' },
    photo: { src: fotoPaulaDavid, focus: '35% 60%' }, credit: 'F2 Studio',
    text: {
      es: [
        'Solo tenemos palabras de agradecimiento para Vane y Bea. Gracias por recibirnos siempre con una sonrisa y por vuestra profesionalidad y buen gusto.',
        'En nuestro caso elegimos el pack «El día B» pensando que íbamos a poder organizarlo todo sin agobios y disfrutando (error). Tuvimos que acudir a ellas las últimas semanas y nos atendieron con los brazos abiertos, llenas de tranquilidad y buenas ideas. Gracias a ellas quedó todo súper bonito y pudimos disfrutar de nuestro día al máximo, pensando solamente en disfrutar de cada momento, porque de todo lo demás se encargaban ellas. Son todo disposición y buenas ideas. Organizar a tanta gente y tantos detalles no es nada fácil, y ellas miman cada detalle para que sea especial.',
        'Si me volviese a casar, pediría sin duda su ayuda desde el principio. Ellas son magia y profesionalidad, siempre con una sonrisa.',
      ],
      en: [
        'We only have words of thanks for Vane and Bea. Thank you for always welcoming us with a smile, and for your professionalism and good taste.',
        'We chose the “Wedding day” package, thinking we’d be able to organise everything without stress and enjoy it (wrong!). We had to turn to them in the last few weeks and they welcomed us with open arms, full of calm and good ideas. Thanks to them everything looked gorgeous and we could enjoy our day to the full, thinking only about enjoying every moment, because they took care of everything else. They are all willingness and good ideas. Organising so many people and so many details is not easy at all, and they look after every detail to make it special.',
        'If I got married again, I would definitely ask for their help from the very start. They are magic and professionalism, always with a smile.',
      ],
    },
  },
  {
    couple: { es: 'Olaya y David', en: 'Olaya & David' },
    place: 'Hacienda de la Llorea · Gijón', wedding: 'O & D',
    highlight: { es: '«Fueron las mejores compañeras de viaje que podíamos tener.»', en: '“They were the best travelling companions we could have wished for.”' },
    photo: { src: fotoOlayaDavid }, credit: 'M2 Visual Studio',
    text: {
      es: [
        'No sé muy bien por dónde empezar…',
        'Empecemos por el día que nos conocimos, en una céntrica cafetería de Oviedo. No me olvidaré de llegar allí y ver a dos chicas sentadas al fondo, a las que hicimos un gesto para confirmar que eran ellas. En ese momento, solo con verlas, ya sabíamos que serían nuestras ayudantes en el camino más bonito de nuestras vidas. ¡Y qué ayudantes! Desde ese primer día nos hemos sentido aliviados en todo momento, porque cualquier cosa que se nos ocurría y les comentábamos, ellas ya la tenían resuelta… Fueron las mejores compañeras de viaje que podíamos tener, tanto mi mujer como yo. Detalles en la boda, consejos, decoración, contacto con absolutamente todos los proveedores para que el día de la boda fuera de 10, y así fue, en gran medida gracias a ellas.',
        'Además de todo esto, fuera del aspecto profesional, en el que son un 10 redondo y sin lugar a dudas, han calado muy hondo en nosotros y se han convertido en personas especiales por lo que han conseguido. Al final, tener a estas personas junto a nosotros, desviviéndose por nuestro día, te hace cogerles un cariño especial. Y cuando ves que se emocionan contigo cuando te enseñan el resultado final del comedor… entonces ya queda todo claro: son únicas.',
        'Estuvieron encima de todo sin descanso, tienen un gusto maravilloso para la decoración, y los bocetos que te mandan (nosotros vivimos fuera) te mostraban a la perfección el ambiente que generaría cada detalle decorativo, y mucho más… No les puedo poner un pero.',
        'Ni qué decir tiene que la relación calidad-precio es inmejorable. Gracias a las dos por hacer de nuestro día un día mágico.',
      ],
      en: [
        'I’m not quite sure where to begin…',
        'Let’s start with the day we met, in a café in the centre of Oviedo. I’ll never forget arriving and seeing two women sitting at the back, to whom we waved to check it was them. At that moment, just by seeing them, we already knew they would be our helpers on the most beautiful journey of our lives. And what helpers! From that first day we felt relieved all the time, because anything that occurred to us and we mentioned to them, they had already sorted… They were the best travelling companions my wife and I could have wished for. Wedding details, advice, décor, contact with absolutely every supplier so the wedding day would be perfect, and so it was, largely thanks to them.',
        'On top of all that, beyond the professional side, where they are a perfect 10 without a doubt, they have touched us deeply and become special people to us because of what they achieved. In the end, having these people by your side, going all out for your day, makes you grow especially fond of them. And when you see them get emotional with you as they show you the finished dining room… then it’s all clear: they are one of a kind.',
        'They were on top of everything, tirelessly; they have wonderful taste in décor, and the sketches they send you (we live abroad) showed perfectly the atmosphere each decorative detail would create, and much more… I can’t find a single fault.',
        'Needless to say, the value for money is unbeatable. Thank you both for making our day a magical one.',
      ],
    },
  },
  {
    couple: { es: 'Marta y Omar', en: 'Marta & Omar' },
    place: 'Parador de Cangas de Onís',
    highlight: { es: '«La mejor decisión que hemos tomado en nuestra boda ha sido contratarlas a ellas.»', en: '“Hiring them was the best decision we made for our wedding.”' },
    photo: { src: fotoMartaOmar, focus: '50% 40%' }, credit: 'David Fernández',
    text: {
      es: [
        '¿Qué vamos a decir de Bea y Vane? Atentas, elegantes, profesionales, cercanas, detallistas, honradas, trabajadoras, pacientes… Cualquier idea que tengas, ellas la transforman y la convierten en realidad.',
        'Un lujo haber conocido a tan buenas personas que aman tanto su profesión. Capaces de emocionarse y vivir una boda tanto como lo hemos vivido nosotros. Hacen un trabajo de 10. La mejor decisión que hemos tomado en nuestra boda ha sido contratarlas a ellas. Con ellas, es imposible que una boda no salga bien.',
      ],
      en: [
        'What can we say about Bea and Vane? Attentive, elegant, professional, warm, meticulous, honest, hard-working, patient… Whatever idea you have, they transform it and make it real.',
        'It was a privilege to meet such good people who love their profession so much. They get as moved and live a wedding as intensely as we did. They do a perfect job. Hiring them was the best decision we made for our wedding. With them, it’s impossible for a wedding not to go well.',
      ],
    },
  },
  {
    couple: { es: 'Alba y Dani', en: 'Alba & Dani' },
    highlight: { es: '«Nuestra boda fue mágica gracias a ellas.»', en: '“Our wedding was magical thanks to them.”' },
    photo: { src: fotoAlbaDani, focus: '55% 45%' }, credit: 'Cristina Cañibano',
    text: {
      es: [
        'Contactamos con Bea y Vane después de ver fotos de sus trabajos en internet y, nada más conocerlas, tuvimos claro que serían ellas las encargadas de ayudarnos a hacer que nuestro día fuera especial. La decoración no solo quedó mejor de lo que nunca habríamos podido imaginar, sino que, tanto durante el proceso de diseño como el mismo día del evento, consiguieron transmitirnos una calma y una seguridad que hicieron que pudiéramos despreocuparnos y disfrutar al máximo de cada momento.',
        'Nuestra boda fue mágica gracias a ellas; no tenemos palabras para expresar nuestra gratitud. Tienen un gusto exquisito y saben escuchar y adaptarse a los demás sin perder su esencia. A nosotros nos comprendieron desde el primer momento, y todos los invitados coincidieron en que la decoración era preciosa y se adaptaba mucho a nuestra personalidad.',
        'Sin duda volveríamos a contratarlas para cualquier evento. Son de 10, tanto a nivel personal como profesional. Hemos compartido tantos momentos especiales en un periodo tan corto… ¡que ahora las echamos de menos!',
      ],
      en: [
        'We got in touch with Bea and Vane after seeing photos of their work online and, as soon as we met them, we knew they would be the ones to help us make our day special. Not only did the décor turn out better than we could ever have imagined but, both during the design process and on the day itself, they gave us such calm and confidence that we could stop worrying and enjoy every moment to the full.',
        'Our wedding was magical thanks to them; we have no words to express our gratitude. They have exquisite taste and know how to listen and adapt to others without losing their essence. They understood us from the very first moment, and all our guests agreed the décor was beautiful and suited our personality perfectly.',
        'We would definitely hire them again for any event. They are top marks, both personally and professionally. We shared so many special moments in such a short time… that now we miss them!',
      ],
    },
  },
  {
    couple: { es: 'Patricia y Gerardo', en: 'Patricia & Gerardo' },
    highlight: { es: '«Se encargaron de toda la organización y de que todo saliera a la perfección.»', en: '“They took care of all the organising and made sure everything went perfectly.”' },
    photo: { src: fotoPatriciaGerardo, focus: '50% 55%' },
    text: {
      es: [
        'Bea y Vane, solo puedo decir GRACIAS. Profesionales que saben, desde el primer momento, darte ideas, aconsejarte y entender lo que quieres. Invitaciones, decoración, organización… Sin ellas no hubiera sido posible.',
        'No hubiéramos tenido ni siquiera la canción de apertura del baile: teníamos un problema con la descarga, se lo mandamos la noche anterior, a altas horas, para ver si nos lo podían solucionar y, cómo no, por fin teníamos canción. Se encargaron el mismo día de la boda de toda la organización y de que todo saliera a la perfección. Contaría con ellas sin duda para cualquier otro evento.',
      ],
      en: [
        'Bea and Vane, all I can say is THANK YOU. Professionals who know, from the very first moment, how to give you ideas, advise you and understand what you want. Invitations, décor, organisation… It wouldn’t have been possible without them.',
        'We wouldn’t even have had the song for our first dance: we had a problem downloading it, sent it to them late the night before to see if they could fix it and, of course, we finally had our song. On the wedding day they took care of all the organising and made sure everything went perfectly. I would definitely count on them for any other event.',
      ],
    },
  },
  {
    couple: { es: 'María y Gaspar', en: 'María & Gaspar' },
    highlight: { es: '«¡El día de la boda estuve súper tranquila, y fue sobre todo porque sabía que ellas estaban allí!»', en: '“On our wedding day I was completely calm, and it was mostly because I knew they were there!”' },
    photo: { src: fotoMariaGaspar }, credit: 'La Cabina Roja',
    text: {
      es: [
        'No pude tener mejores wedding planners para diseñar la boda de mis sueños con tantos detalles. Teníamos muchos meses por delante para prepararla, muchas ideas, pero poco tiempo y poco orden; ellas fueron guiándonos, marcándonos los tiempos y tranquilizándonos cuando iba llegando el día clave. Cualquier cosa que se me pasaba por la cabeza, me daban mil opciones para elegir la mejor.',
        '¡El día de la boda estuve súper tranquila, y fue sobre todo porque sabía que ellas estaban allí! Ya desde el día de antes se encargaron de que los imprevistos no nos estresasen más de la cuenta: dejaron todo decorado, los detalles preparados, los proveedores organizados… ¡Ya solo nos quedaba disfrutar de la boda con nuestros invitados!',
        'Las recomendamos al 200 %. La gente ve un gasto innecesario en tener wedding planner, pero os aseguro que es una inversión. Si quieres una boda personalizada, detallista y en la que todo fluya… ¡estas chicas son lo que buscas!',
      ],
      en: [
        'I couldn’t have had better wedding planners to design the wedding of my dreams with so many details. We had many months ahead to prepare it and lots of ideas, but little time and little order; they guided us, set the pace and calmed us down as the big day approached. Whatever crossed my mind, they gave me a thousand options to choose the best one.',
        'On our wedding day I was completely calm, and it was mostly because I knew they were there! From the day before, they made sure nothing unexpected stressed us out more than it should: they left everything decorated, the details ready and the suppliers organised… All we had left to do was enjoy the wedding with our guests!',
        'We recommend them 200%. People see a wedding planner as an unnecessary expense, but I promise you it’s an investment. If you want a personal, detailed wedding where everything flows… these are the women you’re looking for!',
      ],
    },
  },
  {
    couple: { es: 'David y Germán', en: 'David & Germán' },
    highlight: { es: '«Todos los invitados coinciden en que ha sido el evento más emotivo y cuidado en el que han estado.»', en: '“Every one of our guests agrees it was the most moving and thoughtfully cared-for celebration they have ever been to.”' },
    photo: { src: fotoDavidGerman },
    text: {
      es: [
        'Confiamos en Vane y Bea para organizar nuestra boda, y todos los invitados coinciden en que ha sido el evento más emotivo y cuidado en el que han estado. Estuvieron atentas a todos los detalles e hicieron tanto de la planificación de la boda como del evento en sí un proceso ilusionante y motivador.',
        'Tienen un trato cálido y atento, y una brillante capacidad para materializar nuestros gustos y nuestras ideas en un sinfín de detalles acertados y minuciosos. No podemos más que agradecerles que hayan dado forma a un momento tan especial para nosotros y, cómo no, ¡las recomendamos!',
      ],
      en: [
        'We trusted Vane and Bea to organise our wedding, and every one of our guests agrees it was the most moving and thoughtfully cared-for celebration they have ever been to. They paid attention to every detail and made both the planning and the wedding itself an exciting and inspiring process.',
        'They are warm and attentive, with a brilliant ability to turn our tastes and ideas into countless well-chosen, meticulous details. We can only thank them for shaping such a special moment for us and, of course, we recommend them!',
      ],
    },
  },
  {
    couple: { es: 'Katherine y Albano', en: 'Katherine & Albano' },
    highlight: { es: '«Disfrutamos muchísimo del día de nuestra boda sin tener que preocuparnos por nada.»', en: '“We enjoyed our wedding day so much without having to worry about anything.”' },
    text: {
      es: [
        'Elegir a The Dreams Factory para que nos ayudaran a organizar nuestra boda ha sido una de las mejores decisiones y experiencias de nuestra boda. Se ocuparon absolutamente de todos los detalles, de que fueran tal y como queríamos, de asesorarnos y de quitarnos todo el trabajo y el estrés posibles.',
        'El resultado fue que disfrutamos muchísimo del día de nuestra boda sin tener que preocuparnos por nada, gracias a que estuvieron pendientes de todo, ¡con la mayor discreción y profesionalidad! Todo el mundo nos felicitó, porque se quedaron maravillados con la organización y con cada uno de los detalles especiales que envolvieron ese día, que sin las chicas de The Dreams Factory no habrían sido posibles.',
        'Lo cierto es que desconocíamos el mundo de las wedding planners y, tras nuestra experiencia, es algo que recomiendo a todas las parejas que estén pensando en casarse. Es la tranquilidad y la certeza de que todo va a salir bien. Gracias, Vane y Bea, por haber hecho de nuestra boda un día tan inolvidable.',
      ],
      en: [
        'Choosing The Dreams Factory to help us organise our wedding was one of the best decisions and experiences of our wedding. They took care of absolutely every detail, made sure everything was just as we wanted, advised us and took away all the work and stress they possibly could.',
        'The result was that we enjoyed our wedding day so much without having to worry about anything, because they kept an eye on everything, with the utmost discretion and professionalism! Everyone congratulated us; they were amazed by the organisation and by every special detail of the day, which wouldn’t have been possible without the girls from The Dreams Factory.',
        'The truth is we knew nothing about the world of wedding planners and, after our experience, it’s something I recommend to every couple thinking of getting married. It’s the peace of mind and the certainty that everything will go well. Thank you, Vane and Bea, for making our wedding such an unforgettable day.',
      ],
    },
  },
  {
    couple: { es: 'Beatriz y Daniel', en: 'Beatriz & Daniel' },
    place: 'Ermita de Deva · Gijón', wedding: 'B & D',
    highlight: { es: '«Sin vosotras no hubiera sido tan, tan, tan bonito.»', en: '“Without you it wouldn’t have been so, so, so beautiful.”' },
    photo: { src: fotoBeatrizDaniel, focus: '30% 50%' }, credit: 'Darío Martínez',
    text: {
      es: [
        'Solo podemos deciros GRACIAS por habernos ayudado a hacer nuestros sueños realidad; sin vosotras no hubiera sido tan, tan, tan bonito.',
        'Sois unas grandísimas profesionales, pero, ante todo, buenísima gente, porque solo la buena gente como vosotras puede hacer y transmitir cosas tan hermosas. Nunca os olvidaremos.',
        'Un beso de Daniel y Beatriz.',
      ],
      en: [
        'All we can say is THANK YOU for helping us make our dreams come true; without you it wouldn’t have been so, so, so beautiful.',
        'You are tremendous professionals but, above all, wonderful people, because only good people like you can create and convey such beautiful things. We will never forget you.',
        'Love from Daniel and Beatriz.',
      ],
    },
  },
  {
    couple: { es: 'Aida y Adrián', en: 'Aida & Adrián' },
    place: 'Castillo de San Cucao', wedding: 'A & A',
    highlight: { es: '«Si me volviera a casar, sin duda os volvería a contratar.»', en: '“If I got married again, I’d hire you again without a doubt.”' },
    photo: { src: fotoAidaAdrian, focus: '50% 35%' }, credit: 'M2 Visual Studio',
    text: {
      es: [
        'No podemos estar más contentos de haberos escogido. Nos encantó la decoración, superó las expectativas. Os las recomiendo al 100 %, porque son unas profesionales en lo que hacen y, como personas, son aún mejores. Si me volviera a casar, sin duda os volvería a contratar.',
        'Espero algún día volver a coincidir con vosotras. Un abrazo.',
      ],
      en: [
        'We couldn’t be happier that we chose you. We loved the décor; it exceeded our expectations. I recommend them 100%, because they are true professionals at what they do and, as people, they are even better. If I got married again, I’d hire you again without a doubt.',
        'I hope our paths cross again some day. A big hug.',
      ],
    },
  },
  {
    couple: { es: 'Nuria y Manel', en: 'Nuria & Manel' },
    place: 'León',
    highlight: { es: '«Elegir a Beatriz y Vanessa fue, sin duda, la mejor decisión que pudimos tomar.»', en: '“Choosing Beatriz and Vanessa was, without a doubt, the best decision we could have made.”' },
    text: {
      es: [
        'Nos casamos en junio en León y decidimos contar con la ayuda de unas wedding planners para la organización y la decoración de ese día. Elegir a Beatriz y Vanessa fue, sin duda, la mejor decisión que pudimos tomar. Cuando las conocimos tuvimos muy claro que serían ellas.',
        'Durante los preparativos están a tu lado en todo momento, te apoyan y te aconsejan en cada decisión. Cada vez que surgen nervios y dudas, al hablar con ellas desaparecen, porque siempre saben qué hacer en cada momento y tienen una solución para cada contratiempo.',
        'Ese día fueron muchos los invitados que nos felicitaron y nos dieron la enhorabuena por contar con unas wedding planners, porque no están solo para los novios: también están para ayudar a los invitados en cada momento.',
        'Nuestra boda estuvo llena de detalles y tuvo una decoración preciosa, tal y como siempre la habíamos imaginado, y todo ello fue gracias a Beatriz y Vanessa. Realmente creo que son imprescindibles si estás pensando en preparar tu boda.',
      ],
      en: [
        'We got married in June in León and decided to have wedding planners help us with the organisation and décor of the day. Choosing Beatriz and Vanessa was, without a doubt, the best decision we could have made. When we met them, we knew straight away they were the ones.',
        'During the preparations they are by your side at every moment, supporting you and advising you on every decision. Whenever nerves and doubts appear, they vanish as soon as you talk to them, because they always know what to do and have a solution for every setback.',
        'On the day, many guests congratulated us on having wedding planners, because they are not only there for the couple: they are also there to help the guests at every moment.',
        'Our wedding was full of details and had beautiful décor, just as we had always imagined it, and it was all thanks to Beatriz and Vanessa. I truly believe they are essential if you are thinking of planning your wedding.',
      ],
    },
  },
];

/** La opinión que se muestra entera en su propio bloque. */
export const featuredReview = reviews.find((r) => r.couple.es === 'Olaya y David')!;
