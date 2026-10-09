/**
 * Contenido para /mudanzas-santiago
 * Página principal de mudanzas en Santiago y Región Metropolitana
 */
export default {
  meta: {
    title: 'Mudanzas en Santiago【Precios y Cotización】Baratas y Rápidas',
    description: 'Mudanzas en Santiago desde $40.000. Empresa de mudanzas baratas y profesionales en toda la RM. Precios claros, calculadora online y presupuesto gratis. Camión, ayudantes y salvoconducto. Cotiza por WhatsApp ☎ +56 9 7979 6841.',
    keywords: 'mudanzas Santiago, mudanzas en Santiago, mudanzas Santiago precios, empresa de mudanzas Santiago, mudanzas Región Metropolitana, mudanzas baratas Santiago, camion mudanza santiago, mudanzas santiago centro, mudanzas en santiago de chile, mudanzas economicas santiago, mudanzas dentro de santiago, mudanza dentro de santiago, mudanzas chile santiago, transporte mudanza santiago, empresa de mudanzas en santiago, camion de mudanza santiago precio, camion para mudanza santiago, mudanzas baratas en santiago de chile, mudanzas en santiago chile, transporte de mudanza santiago, mudanzas urgentes santiago'
  },
  hero: {
    tagline: 'Mudanzas Santiago',
    title: 'Mudanzas en Santiago — Empresa de Mudanzas Baratas y Profesionales',
    intro: 'Mudanzas en Santiago desde $40.000. Cotiza con la calculadora o por WhatsApp. Presupuesto gratis. Cobertura en Providencia, Las Condes, Ñuñoa, Maipú, Vitacura y las 52 comunas de la RM.',
    introExtra: '',
    introBelowCalc: 'FletesPro es una empresa de mudanzas en Santiago con equipo propio: choferes, peonetas y ayudantes de mudanza, camión 3/4 y camioneta según el volumen de tu carga. Hacemos mudanzas de casas, departamentos y oficinas, traslado de muebles, electrodomésticos y enseres, con embalaje profesional (cajas de cartón, plástico burbuja, film y frazadas) y desarme y armado de muebles. Cubrimos Santiago Centro, Providencia, Las Condes, Vitacura, Ñuñoa, Maipú, Puente Alto y las 52 comunas de la Región Metropolitana, además de mudanzas a regiones. Te asesoramos con el salvoconducto ante notaría y el permiso del edificio. Cotiza tu mudanza con la calculadora online o pide un presupuesto gratis por WhatsApp.'
  },
  precios: {
    h2: 'Precios de mudanzas en Santiago 2026',
    intro: 'Estos son valores referenciales para que tengas una idea antes de cotizar. El precio final de tu mudanza depende del volumen (m³), la distancia entre origen y destino, el piso/ascensor y si contratas embalaje y ayudantes.',
    p1: 'Usa la calculadora de esta página para obtener un precio aproximado al instante. Para mudanzas grandes, oficinas o rutas a regiones, escríbenos por WhatsApp y te enviamos un presupuesto personalizado.',
    h3Valores: '¿Qué incluye el precio?',
    p2: 'El valor incluye el traslado de origen a destino. Los ayudantes y el embalaje tienen costo adicional si los contratas. Recuerda tramitar tu salvoconducto con anticipación; nosotros te orientamos sobre los requisitos.',
    p3: 'Ofrecemos mudanzas baratas y mudanzas económicas en Santiago; el precio depende del recorrido y del volumen. Si quieres una referencia del camión de mudanza Santiago precio para tu mudanza, usa la calculadora o escríbenos por WhatsApp.',
    tablaNota: 'El valor final depende del volumen (m³), la distancia origen-destino, el piso/ascensor y si contratas embalaje y ayudantes. Usa la calculadora para el precio exacto.',
    tabla: [
      { tipo: 'Mini mudanza / flete pequeño (1 ambiente)', equipo: 'Camión 3/4 solamente', precio: 'desde $40.000' },
      { tipo: 'Departamento 1-2 dormitorios', equipo: 'Camión 3/4 + 1 peonetas', precio: '$70.000 – $150.000' },
      { tipo: 'Casa 3-4 dormitorios', equipo: 'Camión 3/4 + 2 peonetas', precio: '$150.000 – $300.000' },
      { tipo: 'Mudanza con embalaje completo', equipo: 'Camión + cuadrilla + materiales', precio: '$200.000 – $400.000' },
      { tipo: 'Mudanza a regiones (interregional)', equipo: 'Camión + equipo', precio: 'hasta 120 km: $28.000 + $2.000/km; después +$1.400/km' }
    ]
  },
  baratas: {
    h2: 'Mudanzas baratas y económicas en Santiago',
    p1: 'Ofrecemos mudanzas baratas en Santiago sin sacrificar el cuidado de tus cosas. El precio de una mudanza económica baja cuando: eliges horarios de menor demanda, embalas tú mismo las cajas, agrupas la carga en un solo viaje o compartes camión en rutas a regiones.',
    p2: 'Te damos un presupuesto gratis y transparente, sin costos ocultos: pagas por el volumen real y la distancia. Para una mudanza barata dentro de Santiago, una mini mudanza o un flete pequeño, cotiza en segundos con la calculadora.'
  },
  rutas: {
    h2: 'Rutas de mudanzas que cubrimos',
    intro: 'Realizamos mudanzas en Santiago y entre comunas de la Región Metropolitana, además de rutas a regiones.',
    pCentro: 'Hacemos mudanzas Santiago centro, mudanza dentro de Santiago y mudanzas en Santiago de Chile hacia otras regiones. Si necesitas transporte de mudanza Santiago o un camión para mudanza Santiago, indica origen y destino en la calculadora y te damos el valor al instante.',
    items: [
      'Mudanzas dentro de Santiago (comuna a comuna)',
      'Mudanzas Santiago a regiones (Valparaíso, Viña, Concepción, etc.)',
      'Mudanzas entre regiones con paso por Santiago',
      'Providencia, Las Condes, Ñuñoa, Vitacura, Lo Barnechea',
      'Maipú, Puente Alto, La Florida, San Bernardo',
      'Colina, Lampa, Chicureo, sectores rurales'
    ],
    pExtra: 'Indica origen y destino en la calculadora para ver el precio. Si tu ruta no aparece o es especial, contáctanos por WhatsApp.'
  },
  tiposServicio: {
    h2: 'Tipos de mudanza que hacemos en Santiago',
    items: [
      {
        title: 'Mudanzas de casas y departamentos',
        text: 'Traslado de muebles, electrodomésticos y enseres con ayudantes y camión 3/4. Mudanzas residenciales y particulares.',
        to: '/mudanzas/particulares',
        cta: 'Ver mudanzas particulares'
      },
      {
        title: 'Mudanzas de oficinas y empresas',
        text: 'Traslado corporativo de escritorios, archivadores y equipos, con horarios nocturnos o de fin de semana.',
        to: '/fletes-para-oficinas',
        cta: 'Ver mudanzas de oficinas'
      },
      {
        title: 'Mudanzas a regiones',
        text: 'Rutas Santiago–Valparaíso, Viña, Concepción y todo Chile. Precio por kilómetro, carga y descarga incluidas.',
        to: '#rutas-mudanzas',
        cta: 'Ver rutas a regiones'
      },
      {
        title: 'Mudanzas baratas y económicas',
        text: 'Mini mudanzas y fletes pequeños con precio transparente. Paga por el volumen real y la distancia.',
        to: '#mudanzas-baratas',
        cta: 'Ver mudanzas baratas'
      },
      {
        title: 'Mudanzas urgentes / 24h',
        text: '¿Te mudas hoy o mañana? Coordinamos mudanzas urgentes de mismo día según disponibilidad de camión.',
        to: '/mudanzas/urgentes',
        cta: 'Ver mudanzas urgentes'
      },
      {
        title: 'Embalaje y bodegaje',
        text: 'Cajas, plástico burbuja, film y frazadas. Desarme y armado de muebles, más bodegaje climatizado.',
        to: '/embalajes',
        cta: 'Ver embalajes'
      }
    ]
  },
  servicios: {
    h2: 'Servicios de mudanza',
    intro: 'Ofrecemos mudanzas residenciales y corporativas en Santiago.',
    items: [
      { h3: 'Mudanzas de departamento o casa', text: 'Traslado de muebles, electrodomésticos, cajas y enseres. Ayudantes disponibles para carga y descarga.' },
      { h3: 'Mudanzas de oficina', text: 'Traslado de escritorios, archivos, equipos y mobiliario. Coordinamos horarios con administración de edificios.' },
      { h3: 'Mudanzas con embalaje', text: 'Cajas, plástico burbuja y materiales para proteger tus pertenencias. Consulta disponibilidad.' },
      { h3: 'Mudanzas a regiones', text: 'Rutas Santiago–Valparaíso, Santiago–Concepción, Santiago–sur y norte. Presupuesto hasta 120 km: $28.000 + $2.000/km; después +$1.400/km.' },
      { h3: 'Mudanzas urgentes y de último minuto', text: '¿Necesitas mudarte hoy o mañana? Realizamos mudanzas urgentes en Santiago, coordinadas por WhatsApp en el día según disponibilidad de camión. Ideal para entregas de arriendo, cambios de última hora o fletes 24 horas en Santiago Centro y comunas cercanas.' }
    ],
    pTransporte: 'Contamos con camión de mudanza Santiago para cada tipo de traslado. El transporte de mudanza Santiago incluye carga y descarga; si quieres saber el precio según tu ruta, usa la calculadora de esta página.',
    pCombustible: 'El combustible está incluido en el precio. Para rutas largas, confirmamos el valor final antes de la reserva.'
  },
  h2Ventajas: '¿Por qué elegir FletesPro para mudanzas en Santiago?',
  ventajas: [
    'Cobertura en las 52 comunas de la Región Metropolitana y rutas a regiones.',
    'Calculadora online: obtén un precio aproximado al instante.',
    'Camiones adecuados y ayudantes disponibles según tu mudanza.',
    'Asesoría sobre salvoconducto y requisitos legales.',
    'Cotización por WhatsApp sin compromiso.',
    'Presupuesto gratis. Sin costos ocultos.'
  ],
  cierre: 'Contáctanos para mudanzas en Santiago. Presupuesto gratis. WhatsApp +56 9 7979 6841.',
  faqs: [
    {
      question: '¿Cuánto cuesta una mudanza en Santiago?',
      answer: 'El precio depende de la distancia (origen–destino), el volumen de carga (m³) y si necesitas ayudantes. Las mudanzas dentro de Santiago parten desde $40.000 según la ruta; un departamento va entre $70.000 y $150.000, y una casa entre $150.000 y $300.000. Usa la calculadora para una estimación al instante.'
    },
    {
      question: '¿Qué variables influyen en el precio de una mudanza?',
      answer: 'Tres factores: el volumen de carga (m³), la distancia entre origen y destino, y la mano de obra (número de peonetas). Suman el embalaje, el piso sin ascensor y la distancia: hasta 120 km a $28.000 + $2.000/km y, después, $1.400 por km extra. Con estos datos la calculadora te da un valor al instante.'
    },
    {
      question: '¿Necesito salvoconducto para mudarme en Santiago?',
      answer: 'Sí. En Chile es obligatorio tramitar un salvoconducto de mudanza en notaría antes del traslado. Sin él, Carabineros puede detener el camión y aplicar multas. Tramítalo 2 a 5 días antes de la mudanza; nosotros te orientamos sobre los requisitos.'
    },
    {
      question: '¿Hacen mudanzas de oficinas y empresas?',
      answer: 'Sí. Realizamos mudanzas de oficinas y traslados corporativos en Santiago: escritorios, archivadores, equipos y mobiliario, con coordinación de ascensores y horarios nocturnos o de fin de semana para no frenar tu operación. Revisa nuestra página de mudanzas de oficinas.'
    },
    {
      question: '¿Hacen mudanzas a regiones desde Santiago?',
      answer: 'Sí. Cubrimos rutas Santiago–Valparaíso, Santiago–Viña del Mar, Santiago–Concepción y otras regiones. Hasta 120 km el precio es $28.000 + $2.000 por km. Desde el km 121, cada kilómetro extra suma $1.400. Escríbenos por WhatsApp con origen y destino para un presupuesto.'
    },
    {
      question: '¿Hacen mudanzas baratas y económicas en Santiago?',
      answer: 'Sí. Ofrecemos mudanzas baratas y económicas en Santiago con precios transparentes. El valor baja si eliges horarios de menor demanda, embalas tú mismo las cajas o compartes camión en rutas a regiones. Cotiza con la calculadora o por WhatsApp.'
    },
    {
      question: '¿Incluyen embalaje y desarme de muebles?',
      answer: 'Sí, de forma opcional. Ofrecemos mudanzas con embalaje incluido: cajas de cartón, plástico burbuja, film y frazadas, más desarme y armado de camas, closets y comedores. Puedes tomar el servicio completo («todo incluido») o solo el traslado.'
    },
    {
      question: '¿Puedo cotizar mudanza para otro día?',
      answer: 'Sí. En la calculadora puedes elegir la fecha y hora que prefieras. Para mudanzas programadas con varios días de anticipación, confirma disponibilidad por WhatsApp.'
    },
    {
      question: '¿Cuánto sale el camión para mudanza en Santiago?',
      answer: 'El camión de mudanza Santiago precio depende de la distancia y del volumen que lleves. Usa la calculadora de esta página indicando origen y destino para una estimación al instante. Si necesitas un camión para mudanza Santiago con ayudantes o embalaje, escríbenos por WhatsApp y te enviamos un presupuesto detallado.'
    }
  ]
}
