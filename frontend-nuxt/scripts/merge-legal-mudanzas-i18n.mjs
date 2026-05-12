/**
 * Fusiona en locales/es.json y locales/en.json las claves de páginas legales
 * y mudanzas especiales (piano, antigüedades, obras de arte).
 * Ejecutar desde frontend-nuxt: node scripts/merge-legal-mudanzas-i18n.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const esPath = path.join(root, 'locales', 'es.json')
const enPath = path.join(root, 'locales', 'en.json')

function mudanzaEspecialEs (key, heroTitle, heroSub, serviceTheme, faqTheme) {
  return {
    hero: {
      badge: 'FletesPro · Mudanzas especiales',
      title: heroTitle,
      subtitle: heroSub
    },
    services: {
      title: `Servicios para ${serviceTheme}`,
      subtitle: `Planificación, embalaje y transporte en Santiago y Región Metropolitana.`,
      service1: {
        title: 'Inspección y planificación',
        description: 'Evaluación del volumen, accesos y riesgos. Presupuesto detallado y cronograma coordinado contigo.'
      },
      service2: {
        title: 'Embalaje profesional',
        description: 'Materiales adecuados, fijación interior de cajas y protección frente a vibraciones y humedad.'
      },
      service3: {
        title: 'Transporte y descarga',
        description: 'Equipo capacitado, vehículo adecuado y seguro. Descarga cuidadosa en destino.'
      }
    },
    benefits: {
      title: 'Por qué contratar con FletesPro',
      subtitle: 'Experiencia en cargas delicadas y atención personalizada.',
      benefit1: {
        title: 'Presupuesto transparente',
        description: 'Cotización clara antes del servicio, sin sorpresas en el día de la mudanza.'
      },
      benefit2: {
        title: 'Equipo coordinado',
        description: 'Conductores y ayudantes alineados con protocolos para objetos de alto valor.'
      },
      benefit3: {
        title: 'Seguro y trazabilidad',
        description: 'Opciones de cobertura y comunicación durante el traslado.'
      },
      benefit4: {
        title: 'Cobertura RM',
        description: 'Servicio en comunas de Santiago y desplazamientos según disponibilidad.'
      }
    },
    process: {
      title: 'Cómo trabajamos',
      subtitle: 'Proceso ordenado para reducir riesgos.',
      step1: {
        title: 'Contacto',
        description: 'Nos cuentas origen, destino, fechas y características de la carga.'
      },
      step2: {
        title: 'Visita o fotos',
        description: 'Cuando aplica, valoración con fotos o visita para definir embalaje y medios.'
      },
      step3: {
        title: 'Ejecución',
        description: 'Embalaje, carga, ruta y descarga según lo acordado.'
      },
      step4: {
        title: 'Entrega',
        description: 'Revisión conjunta en destino y cierre del servicio.'
      }
    },
    cta: {
      title: '¿Necesitas cotización?',
      subtitle: 'Usa la calculadora o escríbenos por WhatsApp con fotos y medidas.',
      button1: 'Solicitar presupuesto',
      button2: 'Calcular precio online'
    },
    faqs: {
      title: `Preguntas frecuentes · ${faqTheme}`,
      subtitle: 'Información general; el detalle contractual se formaliza al contratar.',
      faq1: {
        question: '¿Incluye desmontaje y montaje?',
        answer: 'Según lo acordado en el presupuesto. Para pianos y piezas voluminosas puede requerirse técnico adicional; te lo indicamos al cotizar.'
      },
      faq2: {
        question: '¿Debo contratar seguro adicional?',
        answer: 'Recomendamos declarar el valor y revisar coberturas disponibles. Te orientamos según el tipo de bien.'
      },
      faq3: {
        question: '¿Trabajan fines de semana?',
        answer: 'Sujeto a disponibilidad. Coordinamos fecha y ventana horaria contigo.'
      },
      faq4: {
        question: '¿Cómo preparo el origen?',
        answer: 'Despeja pasillos y accesos, protege suelos si lo necesitas y avisa restricciones de edificio (horario ascensor, estacionamiento).'
      },
      faq5: {
        question: '¿Sirve la calculadora para este tipo de mudanza?',
        answer: 'La calculadora estima fletes/mudanzas generales. Para pianos, arte o antigüedades suele requerirse ajuste manual tras revisar fotos o visita.'
      },
      faq6: {
        question: '¿Hacen embalaje en el mismo día?',
        answer: 'Según complejidad puede programarse embalaje el día anterior o el mismo día; lo definimos en la planificación.'
      }
    },
    seo: {
      title: `${heroTitle} Santiago | FletesPro`,
      description: `${heroSub}`,
      ogTitle: `${heroTitle} | FletesPro`,
      ogDescription: heroSub,
      twitterTitle: `${heroTitle} | FletesPro`,
      twitterDescription: heroSub,
      schemaServiceType: heroTitle,
      schemaDescription: heroSub
    }
  }
}

function mudanzaEspecialEn (key, heroTitle, heroSub, serviceTheme, faqTheme) {
  return {
    hero: {
      badge: 'FletesPro · Specialty moves',
      title: heroTitle,
      subtitle: heroSub
    },
    services: {
      title: `Services for ${serviceTheme}`,
      subtitle: 'Planning, packing and transport in Santiago and the Metropolitan Region.',
      service1: {
        title: 'Inspection and planning',
        description: 'Assessment of volume, access and risks. Detailed quote and schedule aligned with you.'
      },
      service2: {
        title: 'Professional packing',
        description: 'Suitable materials, internal bracing and protection against vibration and moisture.'
      },
      service3: {
        title: 'Transport and unloading',
        description: 'Trained crew, suitable vehicle and insurance options. Careful unloading at destination.'
      }
    },
    benefits: {
      title: 'Why book with FletesPro',
      subtitle: 'Experience with delicate loads and personalised attention.',
      benefit1: {
        title: 'Transparent pricing',
        description: 'Clear quote before the job, without surprises on moving day.'
      },
      benefit2: {
        title: 'Coordinated team',
        description: 'Drivers and helpers following protocols for high-value items.'
      },
      benefit3: {
        title: 'Insurance and updates',
        description: 'Coverage options and communication during the move.'
      },
      benefit4: {
        title: 'Metropolitan coverage',
        description: 'Service in Santiago communes and trips subject to availability.'
      }
    },
    process: {
      title: 'How we work',
      subtitle: 'An orderly process to reduce risk.',
      step1: {
        title: 'Contact',
        description: 'You share origin, destination, dates and load characteristics.'
      },
      step2: {
        title: 'Photos or visit',
        description: 'Where needed, assessment via photos or visit to define packing and resources.'
      },
      step3: {
        title: 'Execution',
        description: 'Packing, loading, route and unloading as agreed.'
      },
      step4: {
        title: 'Delivery',
        description: 'Joint check at destination and service completion.'
      }
    },
    cta: {
      title: 'Need a quote?',
      subtitle: 'Use the calculator or message us on WhatsApp with photos and dimensions.',
      button1: 'Request quote',
      button2: 'Calculate price online'
    },
    faqs: {
      title: `FAQ · ${faqTheme}`,
      subtitle: 'General information; contractual detail is formalised when you hire.',
      faq1: {
        question: 'Is dismantling and assembly included?',
        answer: 'As agreed in the quote. Pianos and bulky pieces may need extra technicians; we state this when quoting.'
      },
      faq2: {
        question: 'Should I buy extra insurance?',
        answer: 'We recommend declaring value and reviewing available cover. We guide you according to the asset type.'
      },
      faq3: {
        question: 'Do you work weekends?',
        answer: 'Subject to availability. We align date and time window with you.'
      },
      faq4: {
        question: 'How should I prepare the origin?',
        answer: 'Clear corridors and access, protect floors if needed, and flag building rules (lift hours, parking).'
      },
      faq5: {
        question: 'Does the calculator cover this type of move?',
        answer: 'The calculator estimates general moves. Pianos, art or antiques usually need manual adjustment after photos or a visit.'
      },
      faq6: {
        question: 'Can packing be same day?',
        answer: 'Depending on complexity, packing may be the day before or the same day; we define it in planning.'
      }
    },
    seo: {
      title: `${heroTitle} Santiago | FletesPro`,
      description: heroSub,
      ogTitle: `${heroTitle} | FletesPro`,
      ogDescription: heroSub,
      twitterTitle: `${heroTitle} | FletesPro`,
      twitterDescription: heroSub,
      schemaServiceType: heroTitle,
      schemaDescription: heroSub
    }
  }
}

const legalTerminosEs = {
  seo: {
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones generales del sitio web y servicios FletesPro (Chile). Texto orientativo.',
    ogTitle: 'Términos y Condiciones | FletesPro',
    ogDescription: 'Condiciones de uso del sitio y contratación de servicios de transporte y mudanzas.'
  },
  badge: 'Información legal',
  h1: 'Términos y Condiciones',
  updated: 'Última actualización: mayo de 2026',
  disclaimer: 'El siguiente texto es un modelo informativo y no sustituye asesoría jurídica. Debe ser revisado por un abogado según la realidad societaria, fiscal y contractual de FletesPro en Chile.',
  sections: [
    {
      title: '1. Identificación',
      paragraphs: [
        'El sitio web y los servicios comercializados bajo la marca FletesPro están dirigidos a usuarios en Chile. Los datos de la sociedad titular (razón social, RUT, domicilio) deben completarse en la versión definitiva de este documento.'
      ]
    },
    {
      title: '2. Objeto y aceptación',
      paragraphs: [
        'Estos términos regulan el acceso y uso del sitio web, formularios, calculadoras y canales de contacto (incluido WhatsApp). Al solicitar cotización o contratar un servicio, declaras haber leído y aceptado las condiciones vigentes en ese momento.',
        'Las condiciones particulares del servicio (precio, fechas, alcance, exclusiones) prevalecen sobre lo genérico del sitio cuando consten por escrito en presupuesto, orden de servicio o contrato firmado.'
      ]
    },
    {
      title: '3. Cotizaciones y contratación',
      paragraphs: [
        'Las cotizaciones generadas online o por medios digitales son estimativas salvo indicación expresa en contrario. El precio definitivo puede ajustarse tras inspección presencial o revisión de información adicional (accesos, peso, volumen, restricciones de horario, peajes, estacionamiento, etc.).',
        'La contratación se entenderá perfeccionada según lo acordado por escrito entre las partes y el pago o señal que se hubiere estipulado.'
      ]
    },
    {
      title: '4. Obligaciones del usuario',
      paragraphs: [
        'Proporcionar información veraz sobre origen, destino, contenido de la carga y condiciones de acceso. Declarar objetos de especial valor, fragilidad o normativa especial (por ejemplo, sustancias restringidas, donde aplique).',
        'Obtener las autorizaciones necesarias en condominios, edificios o espacios con restricciones de carga/descarga.'
      ]
    },
    {
      title: '5. Limitación de responsabilidad (marco general)',
      paragraphs: [
        'Salvo pacto en contrario y límites legales imperativos, no se responde por daños indirectos o lucro cesante derivados del uso del sitio o de imposibilidades ajenas al control razonable del prestador (caso fortuito, fuerza mayor, huelgas, cierres de calzada, etc.).',
        'Los enlaces a sitios de terceros son meramente orientativos; su uso se rige por los términos de esos terceros.'
      ]
    },
    {
      title: '6. Propiedad intelectual',
      paragraphs: [
        'Contenidos, marcas, logotipos y diseño del sitio están protegidos. Queda prohibida su reproducción o uso comercial no autorizado.'
      ]
    },
    {
      title: '7. Legislación y tribunales',
      paragraphs: [
        'Para la resolución de controversias se aplicará la legislación de la República de Chile. Los tribunales ordinarios de justicia con competencia en el domicilio del prestador o el pactado contractualmente serán competentes, sin perjuicio de normas imperativas en favor del consumidor cuando corresponda (Ley 19.496 y normas concordantes).'
      ]
    }
  ]
}

const legalTerminosEn = {
  seo: {
    title: 'Terms and Conditions',
    description: 'General terms for the FletesPro website and services (Chile). Indicative text.',
    ogTitle: 'Terms and Conditions | FletesPro',
    ogDescription: 'Use of the website and booking of transport and moving services.'
  },
  badge: 'Legal information',
  h1: 'Terms and Conditions',
  updated: 'Last updated: May 2026',
  disclaimer: 'This text is a sample for information only and does not replace legal advice. It must be reviewed by counsel according to FletesPro’s corporate, tax and contractual situation in Chile.',
  sections: [
    {
      title: '1. Identification',
      paragraphs: [
        'The website and services marketed under the FletesPro brand are aimed at users in Chile. Corporate details (legal name, tax ID, address) must be completed in the final version of this document.'
      ]
    },
    {
      title: '2. Purpose and acceptance',
      paragraphs: [
        'These terms govern access to and use of the website, forms, calculators and contact channels (including WhatsApp). By requesting a quote or hiring a service, you declare that you have read and accept the terms in force at that time.',
        'Specific service conditions (price, dates, scope, exclusions) prevail over generic website wording when set out in writing in a quote, work order or signed contract.'
      ]
    },
    {
      title: '3. Quotes and booking',
      paragraphs: [
        'Quotes generated online or digitally are estimates unless expressly stated otherwise. The final price may be adjusted after an on-site inspection or review of further information (access, weight, volume, time restrictions, tolls, parking, etc.).',
        'The contract is deemed perfected as agreed in writing between the parties and any deposit or payment stipulated.'
      ]
    },
    {
      title: '4. User obligations',
      paragraphs: [
        'Provide accurate information on origin, destination, cargo contents and access conditions. Declare items of special value, fragility or special rules (e.g. restricted substances, where applicable).',
        'Obtain any permissions required in condominiums, buildings or spaces with loading/unloading restrictions.'
      ]
    },
    {
      title: '5. Limitation of liability (general)',
      paragraphs: [
        'Unless otherwise agreed and within mandatory legal limits, we are not liable for indirect damages or lost profit from use of the site or events beyond reasonable control (force majeure, strikes, road closures, etc.).',
        'Links to third-party sites are for convenience only; use is governed by those third parties’ terms.'
      ]
    },
    {
      title: '6. Intellectual property',
      paragraphs: [
        'Site content, marks, logos and design are protected. Unauthorised commercial reproduction is prohibited.'
      ]
    },
    {
      title: '7. Law and courts',
      paragraphs: [
        'Disputes are governed by the laws of the Republic of Chile. Courts with jurisdiction at the provider’s domicile or as contractually agreed shall have competence, without prejudice to imperative consumer-protection rules where applicable.'
      ]
    }
  ]
}

const legalPrivacidadEs = {
  seo: {
    title: 'Política de Privacidad',
    description: 'Tratamiento de datos personales en el sitio FletesPro, marco Ley 19.628 y normativa chilena vigente (orientativo).',
    ogTitle: 'Política de Privacidad | FletesPro',
    ogDescription: 'Cómo recopilamos y usamos datos personales en cotizaciones, formularios y atención al cliente.'
  },
  badge: 'Protección de datos',
  h1: 'Política de Privacidad',
  updated: 'Última actualización: mayo de 2026',
  disclaimer: 'Texto modelo alineado al enfoque de la Ley 19.628 sobre protección de la vida privada y normas complementarias. Debe ser adaptado por asesoría legal y el registro de tratamientos real de FletesPro.',
  sections: [
    {
      title: '1. Responsable del tratamiento',
      paragraphs: [
        'La sociedad que opera bajo la marca FletesPro (en adelante, el “Responsable”) determina los fines y medios del tratamiento de datos personales obtenidos a través del sitio web, WhatsApp, formularios y otros canales digitales. Completar identificación legal en la versión publicada.'
      ]
    },
    {
      title: '2. Datos que podemos tratar',
      paragraphs: [
        'Datos identificativos y de contacto (nombre, teléfono, correo, direcciones de origen/destino).',
        'Datos de la solicitud de servicio: tipo de carga, fotos que voluntariamente envíes, preferencias de fecha, comentarios.',
        'Datos técnicos de navegación (dirección IP, tipo de dispositivo, cookies según la política de cookies).'
      ]
    },
    {
      title: '3. Finalidades',
      paragraphs: [
        'Gestionar cotizaciones, prestar el servicio contratado, facturar y dar soporte.',
        'Mejorar la seguridad del sitio, analítica agregada y, con base legal correspondiente, envío de comunicaciones comerciales si lo autorizas.',
        'Cumplir obligaciones legales (tributarias, contables, resolución de reclamos).'
      ]
    },
    {
      title: '4. Conservación',
      paragraphs: [
        'Los datos se conservarán el tiempo necesario para las finalidades indicadas y los plazos legales aplicables. Criterios de supresión o anonimización deben definirse en el registro interno de tratamientos.'
      ]
    },
    {
      title: '5. Comunicaciones a terceros',
      paragraphs: [
        'No se cederán datos a terceros salvo base legal (ej. proveedores que actúen por cuenta del Responsable con encargo de tratamiento), requerimiento judicial o autorización del titular, según corresponda.'
      ]
    },
    {
      title: '6. Derechos del titular',
      paragraphs: [
        'Puedes ejercer derechos de acceso, rectificación, cancelación y oposición conforme a la Ley 19.628, salvo excepciones legales. Canal de contacto: completar correo o formulario oficial en la versión definitiva.'
      ]
    },
    {
      title: '7. Seguridad',
      paragraphs: [
        'Se aplicarán medidas técnicas y organizativas razonables para proteger la información. Ningún sistema es 100% invulnerable; notifica incidentes por el canal oficial.'
      ]
    }
  ]
}

const legalPrivacidadEn = {
  seo: {
    title: 'Privacy Policy',
    description: 'How FletesPro processes personal data (Chile). Indicative framework.',
    ogTitle: 'Privacy Policy | FletesPro',
    ogDescription: 'Data collected through quotes, forms and customer care.'
  },
  badge: 'Data protection',
  h1: 'Privacy Policy',
  updated: 'Last updated: May 2026',
  disclaimer: 'Sample wording aligned with Chile’s Law 19.628 on privacy and related rules. Must be adapted by legal counsel and FletesPro’s actual processing register.',
  sections: [
    { title: '1. Data controller', paragraphs: ['The company operating the FletesPro brand (the “Controller”) determines the purposes and means of processing personal data obtained via the website, WhatsApp, forms and other digital channels. Complete legal identification in the published version.'] },
    { title: '2. Data we may process', paragraphs: ['Identity and contact data (name, phone, email, origin/destination addresses).', 'Service request data: type of load, photos you voluntarily send, date preferences, comments.', 'Technical browsing data (IP address, device type, cookies as per the cookie policy).'] },
    { title: '3. Purposes', paragraphs: ['Manage quotes, provide the hired service, invoice and support.', 'Improve site security, aggregate analytics and, with a valid legal basis, marketing communications if you authorise.', 'Comply with legal duties (tax, accounting, complaint handling).'] },
    { title: '4. Retention', paragraphs: ['Data are kept as long as needed for the stated purposes and applicable legal deadlines. Deletion or anonymisation criteria should be set in the internal processing register.'] },
    { title: '5. Sharing with third parties', paragraphs: ['Data are not shared with third parties except on a legal basis (e.g. processors acting on behalf of the Controller), court orders or your authorisation, as applicable.'] },
    { title: '6. Data subject rights', paragraphs: ['You may exercise rights of access, rectification, erasure and objection under Law 19.628, subject to legal exceptions. Contact channel: complete email or official form in the final version.'] },
    { title: '7. Security', paragraphs: ['Reasonable technical and organisational measures are applied. No system is 100% secure; report incidents through the official channel.'] }
  ]
}

const legalCookiesEs = {
  seo: {
    title: 'Política de Cookies',
    description: 'Uso de cookies y tecnologías similares en fletespro.cl (orientativo, Chile).',
    ogTitle: 'Política de Cookies | FletesPro',
    ogDescription: 'Información sobre cookies, finalidades y cómo gestionar preferencias.'
  },
  badge: 'Transparencia',
  h1: 'Política de Cookies',
  updated: 'Última actualización: mayo de 2026',
  disclaimer: 'Texto modelo. La lista concreta de cookies y proveedores (p. ej. analítica, mapas) debe auditorse en el sitio y documentarse según la Ley 19.628 y la Ley 21.719 sobre cookies y tratamiento de datos.',
  sections: [
    {
      title: '1. Qué son las cookies',
      paragraphs: [
        'Las cookies son pequeños archivos almacenados en tu dispositivo cuando visitas un sitio web. También pueden usarse tecnologías similares (local storage, píxeles).'
      ]
    },
    {
      title: '2. Tipos de cookies que podríamos usar',
      paragraphs: [
        'Técnicas / necesarias: mantener sesión, seguridad, preferencias de idioma o carga de mapas.',
        'De rendimiento o analíticas: estadísticas agregadas de uso (por ejemplo, páginas vistas).',
        'De funcionalidad: recordar elecciones del usuario en el sitio.'
      ]
    },
    {
      title: '3. Finalidades',
      paragraphs: [
        'Operar el sitio y calculadoras, medir audiencia de forma agregada y, si se implementa, mostrar contenido personalizado previo consentimiento cuando la ley lo exija.'
      ]
    },
    {
      title: '4. Conservación',
      paragraphs: [
        'El tiempo de conservación depende del tipo de cookie y del proveedor. Los detalles deben publicarse en un cuadro actualizado periódicamente.'
      ]
    },
    {
      title: '5. Cómo gestionar o rechazar cookies',
      paragraphs: [
        'Puedes borrar cookies y limitar su instalación desde la configuración de tu navegador. Si el sitio incorpora un banner de preferencias, descríbelo aquí en la versión final.'
      ]
    },
    {
      title: '6. Transferencias internacionales',
      paragraphs: [
        'Algunos proveedores (p. ej. mapas o analítica) pueden tratar datos fuera de Chile. En la versión definitiva debe informarse la política aplicable y las garantías adoptadas.'
      ]
    }
  ]
}

const legalCookiesEn = {
  seo: {
    title: 'Cookie Policy',
    description: 'Use of cookies on fletespro.cl (Chile). Indicative text.',
    ogTitle: 'Cookie Policy | FletesPro',
    ogDescription: 'Cookies, purposes and how to manage preferences.'
  },
  badge: 'Transparency',
  h1: 'Cookie Policy',
  updated: 'Last updated: May 2026',
  disclaimer: 'Sample text. The actual cookie list and vendors (e.g. analytics, maps) must be audited on the site and documented under Chilean law including Law 21.719 on cookies and data processing.',
  sections: [
    { title: '1. What cookies are', paragraphs: ['Cookies are small files stored on your device when you visit a website. Similar technologies (local storage, pixels) may also be used.'] },
    { title: '2. Types of cookies we may use', paragraphs: ['Strictly necessary: session, security, language or map loading preferences.', 'Performance / analytics: aggregated usage statistics (e.g. pages viewed).', 'Functional: remember choices you make on the site.'] },
    { title: '3. Purposes', paragraphs: ['Run the site and calculators, measure audience in aggregate and, if implemented, personalised content only after consent where required by law.'] },
    { title: '4. Retention', paragraphs: ['Retention depends on the cookie type and vendor. Details should be published in a table updated periodically.'] },
    { title: '5. How to manage or reject cookies', paragraphs: ['You can delete cookies and restrict installation from your browser settings. If the site uses a preference banner, describe it in the final version.'] },
    { title: '6. International transfers', paragraphs: ['Some vendors (e.g. maps or analytics) may process data outside Chile. The final version should state the applicable policy and safeguards.'] }
  ]
}

const legalAvisoEs = {
  seo: {
    title: 'Aviso Legal',
    description: 'Aviso legal del sitio web FletesPro: titularidad, uso del sitio y limitaciones (Chile, orientativo).',
    ogTitle: 'Aviso Legal | FletesPro',
    ogDescription: 'Información general sobre el titular del sitio y condiciones de uso informativo.'
  },
  badge: 'Sitio web',
  h1: 'Aviso Legal',
  updated: 'Última actualización: mayo de 2026',
  disclaimer: 'Texto orientativo. Completar datos societarios reales y revisar con abogado.',
  sections: [
    {
      title: '1. Datos identificativos',
      paragraphs: [
        'En cumplimiento del deber de información general, se publicarán: razón social, RUT, domicilio social, correo y teléfono de contacto del titular del sitio. Sustituir este párrafo con los datos definitivos.'
      ]
    },
    {
      title: '2. Condiciones de uso del sitio',
      paragraphs: [
        'El acceso al sitio implica la aceptación de este aviso y de los términos y condiciones cuando se indique. El usuario se compromete a un uso lícito, sin introducir virus, ni realizar actividades que dañen o sobrecarguen la infraestructura.'
      ]
    },
    {
      title: '3. Propiedad intelectual e industrial',
      paragraphs: [
        'Los contenidos del sitio (textos, imágenes, diseño, código salvo componentes de terceros bajo sus licencias) son titularidad del Responsable o de sus licenciantes. Queda prohibida su reproducción sin autorización.'
      ]
    },
    {
      title: '4. Exclusión de garantías sobre el contenido',
      paragraphs: [
        'La información publicada tiene carácter general e informativo. Puede contener errores u omisiones; se procurará su actualización sin garantía de exhaustividad.'
      ]
    },
    {
      title: '5. Enlaces',
      paragraphs: [
        'Los enlaces a sitios de terceros se ofrecen como referencia. FletesPro no controla esos sitios ni es responsable de sus contenidos o políticas.'
      ]
    },
    {
      title: '6. Legislación aplicable',
      paragraphs: [
        'Este aviso se rige por las leyes de la República de Chile.'
      ]
    }
  ]
}

const legalAvisoEn = {
  seo: {
    title: 'Legal Notice',
    description: 'Legal notice for the FletesPro website (Chile). Indicative text.',
    ogTitle: 'Legal Notice | FletesPro',
    ogDescription: 'General information on the site owner and terms of use.'
  },
  badge: 'Website',
  h1: 'Legal Notice',
  updated: 'Last updated: May 2026',
  disclaimer: 'Indicative text. Insert real corporate details and have counsel review.',
  sections: [
    { title: '1. Identification', paragraphs: ['For general transparency, the following will be published: legal name, tax ID, registered address, email and phone of the site owner. Replace this paragraph with final details.'] },
    { title: '2. Terms of use', paragraphs: ['Accessing the site implies acceptance of this notice and of the terms and conditions where referenced. Users agree to lawful use, not to introduce malware, and not to damage or overload infrastructure.'] },
    { title: '3. Intellectual and industrial property', paragraphs: ['Site content (texts, images, design, code except third-party components under their licences) belongs to the owner or its licensors. Reproduction without authorisation is prohibited.'] },
    { title: '4. Disclaimer on content', paragraphs: ['Information is general and indicative. It may contain errors or omissions; updates are sought without a guarantee of completeness.'] },
    { title: '5. Links', paragraphs: ['Links to third-party sites are for reference only. FletesPro does not control those sites or their content or policies.'] },
    { title: '6. Applicable law', paragraphs: ['This notice is governed by the laws of the Republic of Chile.'] }
  ]
}

const pagesPatchEs = {
  mudanzasPiano: mudanzaEspecialEs(
    'mudanza piano',
    'Mudanza de piano',
    'Traslado profesional de pianos verticales y de cola en Santiago y Región Metropolitana. Embalaje reforzado, equipo coordinado y cotización personalizada.',
    'tu piano',
    'mudanza de piano'
  ),
  mudanzasAntiguedades: mudanzaEspecialEs(
    'mudanza antigüedades',
    'Mudanza de antigüedades',
    'Transporte cuidadoso de muebles y objetos antiguos: inventario, embalaje a medida y manipulación reducida de riesgos en Santiago y RM.',
    'tus antigüedades',
    'antigüedades'
  ),
  mudanzasObrasArte: mudanzaEspecialEs(
    'mudanza obras de arte',
    'Mudanza de obras de arte',
    'Logística para cuadros, esculturas y piezas de colección: embalaje acolchado, cajas a medida y coordinación con galerías o particulares en Chile.',
    'tus obras',
    'obras de arte'
  ),
  legalTerminos: legalTerminosEs,
  legalPrivacidad: legalPrivacidadEs,
  legalCookies: legalCookiesEs,
  legalAviso: legalAvisoEs
}

const pagesPatchEn = {
  mudanzasPiano: mudanzaEspecialEn(
    'piano moving',
    'Piano moving',
    'Professional transport of upright and grand pianos in Santiago and the Metropolitan Region. Reinforced packing, coordinated crew and tailored quotes.',
    'your piano',
    'piano moving'
  ),
  mudanzasAntiguedades: mudanzaEspecialEn(
    'antique furniture moving',
    'Antique moving',
    'Careful transport of antique furniture and objects: inventory, custom packing and lower-risk handling in Santiago and the Metropolitan Region.',
    'your antiques',
    'antiques'
  ),
  mudanzasObrasArte: mudanzaEspecialEn(
    'fine art moving',
    'Fine art moving',
    'Logistics for paintings, sculptures and collectibles: padded packing, custom crates and coordination with galleries or private clients in Chile.',
    'your pieces',
    'fine art'
  ),
  legalTerminos: legalTerminosEn,
  legalPrivacidad: legalPrivacidadEn,
  legalCookies: legalCookiesEn,
  legalAviso: legalAvisoEn
}

const navPatchEs = {
  mudanzasPiano: 'Mudanza de piano',
  mudanzasAntiguedades: 'Mudanza de antigüedades',
  mudanzasObrasArte: 'Mudanza de obras de arte'
}

const navPatchEn = {
  mudanzasPiano: 'Piano moving',
  mudanzasAntiguedades: 'Antique moving',
  mudanzasObrasArte: 'Fine art moving'
}

function merge (filePath, pagesPatch, navPatch) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  Object.assign(data.pages, pagesPatch)
  Object.assign(data.nav, navPatch)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

merge(esPath, pagesPatchEs, navPatchEs)
merge(enPath, pagesPatchEn, navPatchEn)
console.log('OK: merged legal + mudanza especial keys into es.json and en.json')
