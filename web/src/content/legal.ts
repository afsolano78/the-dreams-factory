/**
 * Textos legales: aviso legal (/aviso-legal, /en/legal-notice) y política de privacidad (/privacidad, /en/privacy).
 *
 * Origen: los de la web antigua (Drupal 7), revisados en octubre de 2026: corregidas erratas, actualizadas las
 * referencias (RGPD y LOPDGDD 3/2018), quitado lo que no aplica (videovigilancia, control de accesos, «pedidos»)
 * y añadido lo que faltaba (bases legales y plazos por finalidad, encargados del tratamiento y transferencias
 * internacionales por el alojamiento y el correo, reclamación ante la AEPD, menores, ley aplicable).
 *
 * PENDIENTE DE CONFIRMAR con Bea y Vane (y, si es posible, con su gestoría o asesoría legal):
 * - Que la titular sigue siendo Beatriz Soria Gutiérrez como autónoma (y no una sociedad) y que NIF y domicilio
 *   siguen vigentes.
 * - El plazo de conservación de las consultas que no acaban en contrato (aquí, un año).
 * - Los proveedores técnicos (Cloudflare, Resend y Google) cuando la web esté en producción.
 *
 * Formato de los textos: **negrita** y [texto](https://…) para enlaces. En inglés prevalece la versión española.
 */
import type { Lang } from '../i18n/routes';

export type LegalBlock =
  | { p: string }
  | { ul: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { dl: [string, string][] };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };
export type LegalDoc = {
  meta: { title: string; description: string };
  eyebrow: string; title: string; updated: string;
  /** Resumen en lenguaje claro, antes del texto completo. */
  summary?: { title: string; items: [string, string][] };
  /** Aviso de traducción (solo en inglés). */
  note?: string;
  toc: string;
  sections: LegalSection[];
};

const OWNER = 'Beatriz Soria Gutiérrez';
const NIF = '71890448S';
const ADDRESS = 'Avda. Galicia, 6, 2.º B · 33450 Piedras Blancas (Castrillón) · Asturias';
const EMAIL = 'thedreamsfactoryweddingplanner@gmail.com';
const PHONE = '+34 659 251 373';
const AEPD = 'https://www.aepd.es';

export const legal: Record<'notice' | 'privacy', Record<Lang, LegalDoc>> = {
  notice: {
    es: {
      meta: { title: 'Aviso legal · The Dreams Factory', description: 'Datos identificativos de la titular y condiciones de uso de la web de The Dreams Factory.' },
      eyebrow: 'Legal',
      title: 'Aviso legal',
      updated: 'Última actualización: 25 de octubre de 2026',
      toc: 'En esta página',
      sections: [
        {
          id: 'titular',
          title: 'Datos de la titular',
          blocks: [
            { p: 'En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI), estos son los datos de la titular de la web www.thedreamsfactory.es:' },
            { dl: [
              ['Titular', OWNER],
              ['Nombre comercial', 'The Dreams Factory'],
              ['NIF', NIF],
              ['Domicilio', ADDRESS],
              ['Email', `[${EMAIL}](mailto:${EMAIL})`],
              ['Teléfono', PHONE],
              ['Actividad', 'Organización, diseño y coordinación de bodas y celebraciones (wedding planner), y formación para futuras wedding planners.'],
            ] },
            { p: 'Cualquier sugerencia, duda o consulta sobre este aviso legal o sobre cualquier otro texto informativo de la web puede enviarse a la dirección de email anterior.' },
          ],
        },
        {
          id: 'uso',
          title: 'Condiciones de uso',
          blocks: [
            { p: 'El acceso a la web es gratuito y supone aceptar estas condiciones. Quien la visita se compromete a hacer un uso adecuado de sus contenidos, conforme a la ley, a la buena fe y al orden público, y a no emplearlos para actividades ilícitas o que puedan dañar los derechos de terceros o el funcionamiento de la web.' },
            { p: 'La información sobre servicios es orientativa: cada boda y cada celebración se presupuestan a medida, y las condiciones concretas se recogen en la propuesta o el contrato correspondiente.' },
          ],
        },
        {
          id: 'propiedad',
          title: 'Propiedad intelectual e industrial',
          blocks: [
            { p: 'Los contenidos de la web —textos, diseño, logotipos, nombre comercial, iconos e imágenes— pertenecen a la titular o se usan con autorización de sus autores, y están protegidos por la normativa de propiedad intelectual e industrial. No se permite reproducirlos, distribuirlos, comunicarlos públicamente ni transformarlos, total o parcialmente, sin autorización previa y por escrito.' },
            { p: 'Las **fotografías** de bodas son obra de los fotógrafos que se citan en cada caso y se publican con su permiso y el de las parejas. Para usarlas, hay que pedir autorización a sus autores.' },
          ],
        },
        {
          id: 'enlaces',
          title: 'Enlaces a otras webs',
          blocks: [
            { p: 'La web puede incluir enlaces a otras páginas (revistas, redes sociales, proveedores). La titular no controla esos sitios ni se hace responsable de sus contenidos ni de sus condiciones de uso o privacidad: se accede a ellos bajo la exclusiva responsabilidad de cada persona.' },
          ],
        },
        {
          id: 'responsabilidad',
          title: 'Responsabilidad',
          blocks: [
            { p: 'La titular procura que la web funcione correctamente y que su información sea exacta y esté al día, pero no puede garantizar que esté siempre disponible ni libre de errores, y no se hace responsable de los daños que pudieran derivarse de interrupciones, fallos técnicos o del uso indebido de la web por terceros.' },
          ],
        },
        {
          id: 'datos',
          title: 'Protección de datos y cookies',
          blocks: [
            { p: 'El tratamiento de los datos personales que nos facilitéis se explica en la [política de privacidad](/privacidad/), y el uso de cookies, en la [política de cookies](/cookies/).' },
          ],
        },
        {
          id: 'ley',
          title: 'Legislación aplicable y jurisdicción',
          blocks: [
            { p: 'Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la ley; cuando quien visite la web tenga la condición de consumidor, serán los de su domicilio.' },
          ],
        },
      ],
    },
    en: {
      meta: { title: 'Legal notice · The Dreams Factory', description: 'Owner details and terms of use of The Dreams Factory website.' },
      eyebrow: 'Legal',
      title: 'Legal notice',
      updated: 'Last updated: 25 October 2026',
      note: 'This is a translation for information purposes. In case of discrepancy, the Spanish version prevails.',
      toc: 'On this page',
      sections: [
        {
          id: 'owner',
          title: 'Owner details',
          blocks: [
            { p: 'In accordance with article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI), these are the details of the owner of the website www.thedreamsfactory.es:' },
            { dl: [
              ['Owner', OWNER],
              ['Trade name', 'The Dreams Factory'],
              ['Tax ID (NIF)', NIF],
              ['Address', ADDRESS],
              ['Email', `[${EMAIL}](mailto:${EMAIL})`],
              ['Phone', PHONE],
              ['Activity', 'Planning, design and coordination of weddings and celebrations (wedding planner), and training for future wedding planners.'],
            ] },
            { p: 'Any suggestion, question or enquiry about this legal notice or any other information on the website can be sent to the email address above.' },
          ],
        },
        {
          id: 'use',
          title: 'Terms of use',
          blocks: [
            { p: 'Access to the website is free of charge and implies acceptance of these terms. Visitors agree to make appropriate use of its content, in accordance with the law, good faith and public order, and not to use it for unlawful activities or in ways that may harm the rights of others or the operation of the website.' },
            { p: 'Information about services is for guidance only: every wedding and celebration is quoted individually, and the specific terms are set out in the corresponding proposal or contract.' },
          ],
        },
        {
          id: 'ip',
          title: 'Intellectual and industrial property',
          blocks: [
            { p: 'The content of the website —texts, design, logos, trade name, icons and images— belongs to the owner or is used with its authors’ permission, and is protected by intellectual and industrial property law. It may not be reproduced, distributed, publicly communicated or transformed, in whole or in part, without prior written authorisation.' },
            { p: 'Wedding **photographs** are the work of the photographers credited in each case and are published with their permission and that of the couples. To use them, please ask their authors for permission.' },
          ],
        },
        {
          id: 'links',
          title: 'Links to other websites',
          blocks: [
            { p: 'The website may include links to other pages (magazines, social networks, suppliers). The owner does not control those sites and is not responsible for their content or their terms of use or privacy: they are accessed at each visitor’s own risk.' },
          ],
        },
        {
          id: 'liability',
          title: 'Liability',
          blocks: [
            { p: 'The owner does her best to keep the website working properly and its information accurate and up to date, but cannot guarantee that it will always be available or error-free, and is not liable for any damage arising from interruptions, technical faults or misuse of the website by third parties.' },
          ],
        },
        {
          id: 'data',
          title: 'Data protection and cookies',
          blocks: [
            { p: 'How we process the personal data you give us is explained in the [privacy policy](/en/privacy/), and the use of cookies in the [cookie policy](/en/cookies/).' },
          ],
        },
        {
          id: 'law',
          title: 'Applicable law and jurisdiction',
          blocks: [
            { p: 'This legal notice is governed by Spanish law. Any dispute shall be submitted to the courts that have jurisdiction under the law; where the visitor is a consumer, these shall be the courts of their place of residence.' },
          ],
        },
      ],
    },
  },

  privacy: {
    es: {
      meta: { title: 'Política de privacidad · The Dreams Factory', description: 'Cómo tratamos los datos personales que nos facilitáis a través de la web, el email, el teléfono o WhatsApp.' },
      eyebrow: 'Legal',
      title: 'Política de privacidad',
      updated: 'Última actualización: 25 de octubre de 2026',
      toc: 'En esta página',
      summary: {
        title: 'En pocas palabras',
        items: [
          ['Quién', `${OWNER} (The Dreams Factory).`],
          ['Para qué', 'Para responder a vuestras consultas y, si trabajamos juntos, para organizar vuestra boda o celebración, impartir el curso o la tutoría y facturar.'],
          ['Con quién', 'Con nadie, salvo los servicios técnicos que hacen funcionar la web y el correo, y cuando la ley lo exija.'],
          ['Vuestros derechos', `Podéis acceder a vuestros datos, corregirlos, borrarlos y mucho más escribiendo a [${EMAIL}](mailto:${EMAIL}).`],
        ],
      },
      sections: [
        {
          id: 'responsable',
          title: 'Quién es la responsable',
          blocks: [
            { p: 'Esta política explica cómo tratamos vuestros datos personales conforme al Reglamento (UE) 2016/679, general de protección de datos (RGPD), y a la Ley Orgánica 3/2018, de protección de datos personales y garantía de los derechos digitales (LOPDGDD).' },
            { dl: [
              ['Responsable', `${OWNER} (The Dreams Factory)`],
              ['NIF', NIF],
              ['Domicilio', ADDRESS],
              ['Email', `[${EMAIL}](mailto:${EMAIL})`],
              ['Teléfono', PHONE],
            ] },
          ],
        },
        {
          id: 'datos',
          title: 'Qué datos tratamos',
          blocks: [
            { p: 'Solo los imprescindibles para atenderos:' },
            { ul: [
              '**Si nos escribís** por el formulario de la web, por email, por teléfono o por WhatsApp: vuestros nombres, email, teléfono y lo que nos contéis sobre vuestra boda o celebración (fecha, lugar, número de invitados, presupuesto orientativo, vuestra idea) y, si queréis decírnoslo, cómo nos conocisteis.',
              '**Si nos contratáis** (organización, diseño, coordinación, tutorías o curso): además, los datos necesarios para prestar el servicio y facturarlo.',
              '**Si os apuntáis para el aviso del curso**: vuestro nombre y email.',
            ] },
            { p: 'No necesitamos datos especialmente protegidos (salud, creencias…). Os pedimos que no los incluyáis en vuestros mensajes; si hace falta conocer, por ejemplo, alguna alergia de los invitados para el banquete, la trataremos solo para ese fin y con vuestro consentimiento.' },
          ],
        },
        {
          id: 'finalidades',
          title: 'Para qué los usamos, con qué base legal y durante cuánto tiempo',
          blocks: [
            { table: {
              head: ['Para qué', 'Base legal', 'Cuánto tiempo'],
              rows: [
                ['Responder a vuestras consultas y prepararos una propuesta', 'Vuestro consentimiento y la aplicación, a petición vuestra, de medidas precontractuales (art. 6.1.a y b RGPD)', 'El necesario para atenderos; si no llegamos a trabajar juntos, como máximo un año'],
                ['Prestar los servicios contratados (boda, celebración, tutoría o curso)', 'La ejecución del contrato (art. 6.1.b RGPD)', 'Mientras dure el servicio y, después, durante los plazos de prescripción de posibles responsabilidades'],
                ['Facturar y cumplir las obligaciones contables y fiscales', 'Una obligación legal (art. 6.1.c RGPD)', '6 años (art. 30 del Código de Comercio) y 4 años a efectos fiscales (arts. 66 a 70 de la Ley General Tributaria)'],
                ['Avisaros de la próxima edición del curso, si lo pedís', 'Vuestro consentimiento (art. 6.1.a RGPD)', 'Hasta que pidáis la baja o se celebre la edición'],
                ['Publicar fotos u opiniones de vuestra boda en la web o en redes', 'Vuestro consentimiento expreso, que os pediremos aparte (art. 6.1.a RGPD)', 'Hasta que lo retiréis'],
              ],
            } },
            { p: 'Cumplido el plazo, los datos se suprimen o se bloquean para ponerlos solo a disposición de jueces, tribunales y administraciones durante el tiempo en que puedan exigirse responsabilidades. No tomamos decisiones automatizadas ni elaboramos perfiles con vuestros datos.' },
          ],
        },
        {
          id: 'destinatarios',
          title: 'A quién se comunican',
          blocks: [
            { p: 'No vendemos ni cedemos vuestros datos. Solo acceden a ellos:' },
            { ul: [
              '**Los servicios técnicos** que necesitamos para funcionar, que actúan como encargados del tratamiento, siguiendo nuestras instrucciones y con las garantías del RGPD: Cloudflare (alojamiento de la web y recepción del formulario), Resend (envío de los correos del formulario) y Google (correo electrónico).',
              '**Los proveedores de vuestra boda o celebración** (lugar, catering, flores…), solo cuando nos contratáis, con vuestro conocimiento y en la medida necesaria para coordinarlos.',
              '**Las administraciones públicas**, jueces y tribunales, cuando la ley lo exija (por ejemplo, la Agencia Tributaria).',
            ] },
          ],
        },
        {
          id: 'transferencias',
          title: 'Transferencias internacionales',
          blocks: [
            { p: 'Cloudflare, Resend y Google son empresas con sede en Estados Unidos, por lo que algunos datos pueden tratarse fuera del Espacio Económico Europeo. Estas transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o, en su defecto, en las cláusulas contractuales tipo aprobadas por la Comisión Europea.' },
          ],
        },
        {
          id: 'derechos',
          title: 'Vuestros derechos',
          blocks: [
            { p: 'Podéis ejercer en cualquier momento estos derechos:' },
            { ul: [
              '**Acceso**: saber si tratamos vuestros datos y obtener una copia e información sobre su uso.',
              '**Rectificación**: corregir los datos inexactos o completar los incompletos.',
              '**Supresión**: pedir que los borremos, por ejemplo cuando ya no sean necesarios o retiréis vuestro consentimiento.',
              '**Oposición**: oponeros a que tratemos vuestros datos por motivos relacionados con vuestra situación particular.',
              '**Limitación**: pedir que solo los conservemos, sin usarlos, mientras se resuelve una reclamación o si los necesitáis para defenderos.',
              '**Portabilidad**: recibir los datos que nos disteis en un formato estructurado y de uso común, o que se los enviemos a otra persona responsable, cuando los tratemos con vuestro consentimiento o por un contrato y de forma automatizada.',
              '**Retirar el consentimiento** en cualquier momento, sin que afecte a lo hecho antes.',
            ] },
            { p: `Para ejercerlos, escribid a [${EMAIL}](mailto:${EMAIL}) indicando el derecho que queréis ejercer. Si no podemos identificaros, os pediremos que lo acreditéis. Os responderemos en el plazo máximo de un mes.` },
            { p: `Si creéis que no hemos atendido bien vuestra solicitud, podéis reclamar ante la Agencia Española de Protección de Datos ([www.aepd.es](${AEPD})).` },
          ],
        },
        {
          id: 'seguridad',
          title: 'Seguridad',
          blocks: [
            { p: 'Aplicamos las medidas técnicas y organizativas adecuadas al riesgo (art. 32 RGPD) para proteger vuestros datos frente a pérdidas, accesos no autorizados o usos indebidos: la web funciona siempre con conexión cifrada (https), el formulario solo envía los datos a nuestro correo y el acceso a la información está limitado a nosotras.' },
          ],
        },
        {
          id: 'redes',
          title: 'Redes sociales',
          blocks: [
            { p: 'Si nos seguís o nos escribís en Instagram, Facebook o TikTok, trataremos vuestros datos solo para responderos dentro de esa red. Cada red social tiene su propia política de privacidad, que os recomendamos consultar.' },
          ],
        },
        {
          id: 'menores',
          title: 'Menores de edad',
          blocks: [
            { p: 'Nuestros servicios están dirigidos a personas mayores de edad. No tratamos datos de menores de 14 años sin el consentimiento de sus padres o tutores.' },
          ],
        },
        {
          id: 'cookies',
          title: 'Cookies',
          blocks: [
            { p: 'El uso de cookies y tecnologías similares se explica en la [política de cookies](/cookies/).' },
          ],
        },
        {
          id: 'cambios',
          title: 'Cambios en esta política',
          blocks: [
            { p: 'Podemos actualizar esta política para adaptarla a cambios legales o en nuestros servicios. La fecha de la última actualización figura al principio de la página.' },
          ],
        },
      ],
    },
    en: {
      meta: { title: 'Privacy policy · The Dreams Factory', description: 'How we process the personal data you give us through the website, email, phone or WhatsApp.' },
      eyebrow: 'Legal',
      title: 'Privacy policy',
      updated: 'Last updated: 25 October 2026',
      note: 'This is a translation for information purposes. In case of discrepancy, the Spanish version prevails.',
      toc: 'On this page',
      summary: {
        title: 'In a nutshell',
        items: [
          ['Who', `${OWNER} (The Dreams Factory).`],
          ['What for', 'To reply to your enquiries and, if we work together, to plan your wedding or celebration, run the course or consultation, and invoice.'],
          ['Shared with', 'Nobody, except the technical services that run the website and email, and when required by law.'],
          ['Your rights', `You can access, correct or delete your data, and much more, by writing to [${EMAIL}](mailto:${EMAIL}).`],
        ],
      },
      sections: [
        {
          id: 'controller',
          title: 'Who is responsible',
          blocks: [
            { p: 'This policy explains how we process your personal data under Regulation (EU) 2016/679, the General Data Protection Regulation (GDPR), and Spanish Organic Law 3/2018 on data protection and digital rights (LOPDGDD).' },
            { dl: [
              ['Controller', `${OWNER} (The Dreams Factory)`],
              ['Tax ID (NIF)', NIF],
              ['Address', ADDRESS],
              ['Email', `[${EMAIL}](mailto:${EMAIL})`],
              ['Phone', PHONE],
            ] },
          ],
        },
        {
          id: 'data',
          title: 'What data we process',
          blocks: [
            { p: 'Only what we need to help you:' },
            { ul: [
              '**If you write to us** through the website form, by email, by phone or on WhatsApp: your names, email, phone number and whatever you tell us about your wedding or celebration (date, venue, number of guests, approximate budget, your idea) and, if you wish to tell us, how you found us.',
              '**If you hire us** (planning, design, coordination, consultations or the course): also the data needed to provide and invoice the service.',
              '**If you sign up to hear about the course**: your name and email.',
            ] },
            { p: 'We don’t need special categories of data (health, beliefs…). Please don’t include them in your messages; if we need to know, for example, about a guest’s allergy for the menu, we will process it only for that purpose and with your consent.' },
          ],
        },
        {
          id: 'purposes',
          title: 'What we use it for, on what legal basis and for how long',
          blocks: [
            { table: {
              head: ['Purpose', 'Legal basis', 'How long'],
              rows: [
                ['Replying to your enquiries and preparing a proposal', 'Your consent and taking steps at your request before entering into a contract (art. 6.1.a and b GDPR)', 'As long as needed to help you; if we don’t end up working together, one year at most'],
                ['Providing the services you hire (wedding, celebration, consultation or course)', 'Performance of the contract (art. 6.1.b GDPR)', 'For the duration of the service and, afterwards, for the limitation periods of any possible liability'],
                ['Invoicing and meeting accounting and tax obligations', 'A legal obligation (art. 6.1.c GDPR)', '6 years (art. 30 of the Spanish Commercial Code) and 4 years for tax purposes (arts. 66 to 70 of the General Tax Law)'],
                ['Letting you know about the next edition of the course, if you ask', 'Your consent (art. 6.1.a GDPR)', 'Until you unsubscribe or the edition takes place'],
                ['Publishing photos or reviews of your wedding on the website or social media', 'Your express consent, which we will ask for separately (art. 6.1.a GDPR)', 'Until you withdraw it'],
              ],
            } },
            { p: 'Once that period ends, the data is deleted or blocked so that it is available only to courts and public authorities while any liability may be claimed. We do not make automated decisions or create profiles with your data.' },
          ],
        },
        {
          id: 'recipients',
          title: 'Who it is shared with',
          blocks: [
            { p: 'We never sell or share your data. Only these have access to it:' },
            { ul: [
              '**The technical services** we need to operate, acting as data processors under our instructions and with GDPR safeguards: Cloudflare (website hosting and form handling), Resend (sending the form emails) and Google (email).',
              '**The suppliers for your wedding or celebration** (venue, catering, flowers…), only when you hire us, with your knowledge and as far as needed to coordinate them.',
              '**Public authorities** and courts, when required by law (for example, the tax authorities).',
            ] },
          ],
        },
        {
          id: 'transfers',
          title: 'International transfers',
          blocks: [
            { p: 'Cloudflare, Resend and Google are based in the United States, so some data may be processed outside the European Economic Area. These transfers are covered by the EU-US Data Privacy Framework or, failing that, by the standard contractual clauses approved by the European Commission.' },
          ],
        },
        {
          id: 'rights',
          title: 'Your rights',
          blocks: [
            { p: 'You can exercise these rights at any time:' },
            { ul: [
              '**Access**: find out whether we process your data and get a copy and information about how it is used.',
              '**Rectification**: correct inaccurate data or complete incomplete data.',
              '**Erasure**: ask us to delete it, for example when it is no longer needed or you withdraw your consent.',
              '**Objection**: object to our processing of your data on grounds relating to your particular situation.',
              '**Restriction**: ask us only to store it, without using it, while a complaint is resolved or if you need it to defend yourself.',
              '**Portability**: receive the data you gave us in a structured, commonly used format, or have it sent to another controller, when we process it with your consent or under a contract and by automated means.',
              '**Withdraw your consent** at any time, without affecting what was done before.',
            ] },
            { p: `To exercise them, write to [${EMAIL}](mailto:${EMAIL}) stating which right you wish to exercise. If we cannot identify you, we will ask you to prove your identity. We will reply within one month at most.` },
            { p: `If you believe we have not handled your request properly, you can lodge a complaint with the Spanish Data Protection Agency ([www.aepd.es](${AEPD})).` },
          ],
        },
        {
          id: 'security',
          title: 'Security',
          blocks: [
            { p: 'We apply technical and organisational measures appropriate to the risk (art. 32 GDPR) to protect your data against loss, unauthorised access or misuse: the website always uses an encrypted connection (https), the form only sends data to our email, and access to the information is limited to the two of us.' },
          ],
        },
        {
          id: 'social',
          title: 'Social media',
          blocks: [
            { p: 'If you follow us or write to us on Instagram, Facebook or TikTok, we will only use your data to reply to you within that network. Each social network has its own privacy policy, which we recommend you read.' },
          ],
        },
        {
          id: 'minors',
          title: 'Minors',
          blocks: [
            { p: 'Our services are aimed at adults. We do not process data of children under 14 without the consent of their parents or guardians.' },
          ],
        },
        {
          id: 'cookies',
          title: 'Cookies',
          blocks: [
            { p: 'The use of cookies and similar technologies is explained in the [cookie policy](/en/cookies/).' },
          ],
        },
        {
          id: 'changes',
          title: 'Changes to this policy',
          blocks: [
            { p: 'We may update this policy to reflect legal changes or changes to our services. The date of the last update appears at the top of the page.' },
          ],
        },
      ],
    },
  },
};
