/**
 * Contacto: página (/contacto, /en/contact) y formulario corto del cierre. ES y EN.
 *
 * El formulario envía a /api/contacto (web/worker/index.ts), que valida, filtra el spam y manda el correo.
 * PENDIENTE DE CONFIRMAR con Bea y Vane: el plazo de respuesta que se promete, si quieren el campo de presupuesto
 * (y sus tramos) y el texto del correo automático de acuse. La información básica de protección de datos (`privacy.basic`)
 * resume la política de privacidad (src/content/legal.ts): si cambia una, hay que cambiar la otra.
 */
import type { Lang } from '../i18n/routes';

export type Motive = 'boda' | 'celebracion' | 'curso';
export type ServiceKey = 'integral' | 'diseno' | 'coordinacion' | 'nose';

type Option = { value: string; label: string };

export type ContactContent = {
  meta: { title: string; description: string };
  eyebrow: string; title: string; lead: string;
  info: { title: string; phones: string; whatsapp: string; email: string; zone: string; zoneText: string; reply: string; social: string };
  steps: [string, string, string];
  stepOf: string; next: string; back: string;
  motive: { legend: string; options: { value: Motive; label: string; text: string }[] };
  wedding: {
    legend: string;
    date: [string, string]; dateUnknown: string;
    place: [string, string];
    guests: { label: string; options: Option[] };
    service: { label: string; options: { value: ServiceKey; label: string }[] };
    budget: { label: string; options: Option[] };
  };
  celebration: { legend: string; kind: [string, string]; date: [string, string]; place: [string, string] };
  course: { legend: string; text: string; experience: { label: string; options: Option[] } };
  you: {
    legend: string;
    names: [string, string]; email: [string, string]; phone: [string, string];
    source: { label: string; options: Option[] };
    idea: [string, string];
  };
  privacy: { accept: string; link: string; basic: string };
  submit: string; sending: string;
  short: { title: string; names: string; contact: string; contactHint: string; date: string; idea: string; submit: string; more: string };
  done: { title: string; text: string; again: string };
  errors: { required: string; email: string; contact: string; privacy: string; send: string; spam: string };
  /** Texto para el mensaje cuando se llega desde una boda («Nos encantó la boda de {couple}…»). */
  fromWedding: string;
};

const guestsEs: Option[] = [
  { value: '', label: 'Aún no lo sabemos' },
  { value: 'menos-50', label: 'Menos de 50' },
  { value: '50-100', label: 'De 50 a 100' },
  { value: '100-150', label: 'De 100 a 150' },
  { value: '150-200', label: 'De 150 a 200' },
  { value: 'mas-200', label: 'Más de 200' },
];
const guestsEn: Option[] = [
  { value: '', label: 'Not sure yet' },
  { value: 'menos-50', label: 'Fewer than 50' },
  { value: '50-100', label: '50 to 100' },
  { value: '100-150', label: '100 to 150' },
  { value: '150-200', label: '150 to 200' },
  { value: 'mas-200', label: 'More than 200' },
];

export const contactContent: Record<Lang, ContactContent> = {
  es: {
    meta: {
      title: 'Contacto · The Dreams Factory, wedding planners en Asturias',
      description: 'Contadnos vuestra idea: escribidnos, llamadnos o mandadnos un WhatsApp. Organizamos bodas en Asturias.',
    },
    eyebrow: 'Contacto',
    title: 'Contadnos\n*vuestra idea*',
    lead: 'Cuantas más cosas nos contéis, mejor podremos ayudaros. Y si aún no tenéis casi nada decidido, también: para eso estamos.',
    info: {
      title: 'Hablemos',
      phones: 'Teléfonos',
      whatsapp: 'Escribidnos por WhatsApp',
      email: 'Email',
      zone: 'Dónde trabajamos',
      zoneText: 'Asturias. Y si os casáis desde fuera, os acompañamos a distancia.',
      reply: 'Os contestamos personalmente, normalmente en uno o dos días.',
      social: 'Síguenos',
    },
    steps: ['Qué celebráis', 'Los detalles', 'Vosotros'],
    stepOf: 'Paso {n} de 3',
    next: 'Continuar',
    back: 'Atrás',
    motive: {
      legend: '¿Qué os trae por aquí?',
      options: [
        { value: 'boda', label: 'Nuestra boda', text: 'Organización, diseño o coordinación del día B.' },
        { value: 'celebracion', label: 'Otra celebración', text: 'Una pedida, un aniversario, una fiesta…' },
        { value: 'curso', label: 'El curso', text: 'Quiero inscribirme en la nueva edición.' },
      ],
    },
    wedding: {
      legend: 'Vuestra boda',
      date: ['Fecha', 'Septiembre de 2027'],
      dateUnknown: 'Aún no tenemos fecha',
      place: ['Lugar o zona', 'Un palacio en Gijón, la costa de Llanes…'],
      guests: { label: 'Invitados (aproximado)', options: guestsEs },
      service: {
        label: '¿Qué servicio os interesa?',
        options: [
          { value: 'integral', label: 'Organización integral' },
          { value: 'diseno', label: 'Diseño y coordinación del día B' },
          { value: 'coordinacion', label: 'Coordinación del día B' },
          { value: 'nose', label: 'Aún no lo sabemos' },
        ],
      },
      budget: {
        label: 'Presupuesto orientativo de la boda (opcional)',
        options: [
          { value: '', label: 'Prefiero comentarlo' },
          { value: 'menos-20000', label: 'Menos de 20.000 €' },
          { value: '20000-35000', label: 'De 20.000 a 35.000 €' },
          { value: '35000-50000', label: 'De 35.000 a 50.000 €' },
          { value: 'mas-50000', label: 'Más de 50.000 €' },
        ],
      },
    },
    celebration: {
      legend: 'Vuestra celebración',
      kind: ['¿Qué queréis celebrar?', 'Una pedida, unas bodas de oro…'],
      date: ['Fecha aproximada', 'La primavera que viene'],
      place: ['Lugar o zona', 'Asturias'],
    },
    course: {
      legend: 'El curso',
      text: 'La nueva edición es el 29, 30 y 31 de enero de 2027, en el Palacio de La Riega (Gijón). Déjanos tus datos y te contamos todos los detalles.',
      experience: {
        label: '¿Tienes experiencia en eventos?',
        options: [
          { value: '', label: 'Prefiero no decirlo' },
          { value: 'ninguna', label: 'Ninguna, empiezo de cero' },
          { value: 'algo', label: 'Algo: he colaborado en eventos' },
          { value: 'profesional', label: 'Trabajo en el sector' },
        ],
      },
    },
    you: {
      legend: 'Vosotros',
      names: ['Vuestros nombres', 'Olaya y David'],
      email: ['Email', 'hola@ejemplo.com'],
      phone: ['Teléfono (opcional)', '+34 600 000 000'],
      source: {
        label: '¿Cómo nos conocisteis? (opcional)',
        options: [
          { value: '', label: '—' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'google', label: 'Google' },
          { value: 'recomendacion', label: 'Alguien nos habló de vosotras' },
          { value: 'boda', label: 'Estuvimos en una boda vuestra' },
          { value: 'prensa', label: 'En una revista' },
          { value: 'otro', label: 'Otro' },
        ],
      },
      idea: ['Contadnos vuestra idea', 'Nos imaginamos una boda al aire libre, cerca del mar, con mucha música…'],
    },
    privacy: {
      accept: 'He leído y acepto la',
      link: 'política de privacidad',
      basic: 'Responsable: B-V The Dreams Factory, S.C. Finalidad: responder a vuestra consulta. Legitimación: vuestro consentimiento. Destinatarios: nadie, salvo los servicios técnicos de la web y el correo, por encargo nuestro, o por obligación legal. Derechos: acceso, rectificación, supresión y los demás que explica la política de privacidad.',
    },
    submit: 'Enviar',
    sending: 'Enviando…',
    short: {
      title: 'Escribidnos',
      names: 'Vuestros nombres',
      contact: 'Email o teléfono',
      contactHint: 'Donde prefiráis que os contestemos',
      date: 'Fecha aproximada',
      idea: 'Vuestra idea',
      submit: 'Enviar',
      more: '¿Queréis contarnos más? Usad el formulario completo',
    },
    done: {
      title: '¡Gracias! Ya tenemos vuestro mensaje',
      text: 'Lo leeremos con calma y os escribiremos muy pronto. Mientras tanto, si os apetece, echad un vistazo a nuestras bodas.',
      again: 'Enviar otro mensaje',
    },
    errors: {
      required: 'Este campo es necesario.',
      email: 'Revisad el email: parece que falta algo.',
      contact: 'Dejadnos un email o un teléfono para poder contestaros.',
      privacy: 'Para enviarlo, tenéis que aceptar la política de privacidad.',
      send: 'No hemos podido enviar el mensaje. Probad de nuevo en un momento o escribidnos por WhatsApp o email: no se ha perdido nada de lo que habéis escrito.',
      spam: 'No hemos podido verificar el envío. Recargad la página y probad de nuevo.',
    },
    fromWedding: 'Nos encantó la boda de {couple}. ',
  },
  en: {
    meta: {
      title: 'Contact · The Dreams Factory, wedding planners in Asturias, Spain',
      description: 'Tell us your idea: write to us, call us or send us a WhatsApp. We plan weddings in Asturias, in northern Spain.',
    },
    eyebrow: 'Contact',
    title: 'Tell us\n*your idea*',
    lead: 'The more you tell us, the better we can help. And if you haven’t decided much yet, that’s fine too: that’s what we’re here for.',
    info: {
      title: 'Let’s talk',
      phones: 'Phone',
      whatsapp: 'Message us on WhatsApp',
      email: 'Email',
      zone: 'Where we work',
      zoneText: 'Asturias, in northern Spain. And if you’re planning from abroad, we’ll be with you from a distance.',
      reply: 'We reply personally, usually within a day or two.',
      social: 'Follow us',
    },
    steps: ['What you’re celebrating', 'The details', 'About you'],
    stepOf: 'Step {n} of 3',
    next: 'Continue',
    back: 'Back',
    motive: {
      legend: 'What brings you here?',
      options: [
        { value: 'boda', label: 'Our wedding', text: 'Planning, design or wedding-day coordination.' },
        { value: 'celebracion', label: 'Another celebration', text: 'A proposal, an anniversary, a party…' },
        { value: 'curso', label: 'The course', text: 'I want to sign up for the new edition.' },
      ],
    },
    wedding: {
      legend: 'Your wedding',
      date: ['Date', 'September 2027'],
      dateUnknown: 'We don’t have a date yet',
      place: ['Venue or area', 'A palace in Gijón, the coast near Llanes…'],
      guests: { label: 'Guests (approximately)', options: guestsEn },
      service: {
        label: 'Which service are you interested in?',
        options: [
          { value: 'integral', label: 'Full planning' },
          { value: 'diseno', label: 'Design & wedding-day coordination' },
          { value: 'coordinacion', label: 'Wedding-day coordination' },
          { value: 'nose', label: 'Not sure yet' },
        ],
      },
      budget: {
        label: 'Approximate wedding budget (optional)',
        options: [
          { value: '', label: 'I’d rather discuss it' },
          { value: 'menos-20000', label: 'Under €20,000' },
          { value: '20000-35000', label: '€20,000 to €35,000' },
          { value: '35000-50000', label: '€35,000 to €50,000' },
          { value: 'mas-50000', label: 'Over €50,000' },
        ],
      },
    },
    celebration: {
      legend: 'Your celebration',
      kind: ['What would you like to celebrate?', 'A proposal, a golden anniversary…'],
      date: ['Approximate date', 'Next spring'],
      place: ['Venue or area', 'Asturias'],
    },
    course: {
      legend: 'The course',
      text: 'The new edition takes place on 29, 30 and 31 January 2027 at Palacio de La Riega (Gijón). Leave us your details and we’ll tell you everything.',
      experience: {
        label: 'Do you have experience in events?',
        options: [
          { value: '', label: 'I’d rather not say' },
          { value: 'ninguna', label: 'None, I’m starting from scratch' },
          { value: 'algo', label: 'Some: I’ve helped out at events' },
          { value: 'profesional', label: 'I work in the industry' },
        ],
      },
    },
    you: {
      legend: 'About you',
      names: ['Your names', 'Olivia and David'],
      email: ['Email', 'hello@example.com'],
      phone: ['Phone (optional)', '+44 7700 900000'],
      source: {
        label: 'How did you find us? (optional)',
        options: [
          { value: '', label: '—' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'google', label: 'Google' },
          { value: 'recomendacion', label: 'Someone recommended you' },
          { value: 'boda', label: 'We were at one of your weddings' },
          { value: 'prensa', label: 'In a magazine' },
          { value: 'otro', label: 'Other' },
        ],
      },
      idea: ['Tell us your idea', 'We imagine an outdoor wedding near the sea, with lots of music…'],
    },
    privacy: {
      accept: 'I have read and accept the',
      link: 'privacy policy',
      basic: 'Controller: B-V The Dreams Factory, S.C. Purpose: replying to your enquiry. Legal basis: your consent. Recipients: nobody, except the technical services running the website and email on our behalf, or where required by law. Rights: access, rectification, erasure and the others explained in the privacy policy.',
    },
    submit: 'Send',
    sending: 'Sending…',
    short: {
      title: 'Write to us',
      names: 'Your names',
      contact: 'Email or phone',
      contactHint: 'Wherever you’d like us to reply',
      date: 'Approximate date',
      idea: 'Your idea',
      submit: 'Send',
      more: 'Want to tell us more? Use the full form',
    },
    done: {
      title: 'Thank you! We’ve got your message',
      text: 'We’ll read it carefully and write back very soon. In the meantime, feel free to have a look at our weddings.',
      again: 'Send another message',
    },
    errors: {
      required: 'This field is required.',
      email: 'Please check the email address: something seems to be missing.',
      contact: 'Leave us an email or a phone number so we can reply.',
      privacy: 'To send it, please accept the privacy policy.',
      send: 'We couldn’t send your message. Please try again in a moment, or write to us on WhatsApp or by email: nothing you’ve written has been lost.',
      spam: 'We couldn’t verify your message. Please reload the page and try again.',
    },
    fromWedding: 'We loved {couple}’s wedding. ',
  },
};
