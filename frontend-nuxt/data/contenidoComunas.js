/**
 * Contenido único por comuna para SEO. Sin textos repetidos entre páginas.
 * Estructura como fletespro.cl: intro, ventajas numeradas, cierre.
 * Cada comuna recibe una combinación distinta de variantes.
 */
import { comunasRM } from '../config/comunasRM.js'

// Variantes de párrafo introductorio (cada una distinta, se asigna 1 por comuna)
const INTROS = [
  (n) => `¿Buscas un servicio confiable de fletes y mudanzas en ${n}? En FletesPro ofrecemos soluciones integrales para particulares y empresas en toda la Región Metropolitana. Nuestro equipo se encarga de cada detalle para que tu traslado sea seguro y sin contratiempos.`,
  (n) => `En ${n} y alrededores, organizar una mudanza o un flete puede ser estresante. Nos especializamos en fletes y mudanzas en ${n} con precios transparentes y servicio profesional. Cotiza al instante con la calculadora o por WhatsApp.`,
  (n) => `Fletes y mudanzas en ${n}: servicio profesional para tu hogar, oficina o local. En FletesPro cubrimos ${n}, Santiago y toda la RM. Vehículos adecuados, equipo capacitado y tarifas claras desde $27.000.`,
  (n) => `Si estás en ${n} y necesitas mudarte o enviar carga, tenemos la solución. Ofrecemos fletes y mudanzas en ${n} con cobertura en toda la ciudad. Presupuesto gratis y calculadora online para que cotices al momento.`,
  (n) => `En ${n} contamos con un servicio de fletes y mudanzas pensado para ti. Ya sea un flete chico o una mudanza completa, en FletesPro te ofrecemos precios justos, cuidado con tus pertenencias y disponibilidad 24 horas.`,
  (n) => `Mudanzas y fletes en ${n} con la calidad que buscas. Trabajamos en ${n} y en todas las comunas de la Región Metropolitana. Usa la calculadora para un precio estimado o escríbenos por WhatsApp para un presupuesto a medida.`,
  (n) => `¿Fletes o mudanzas en ${n}? En nuestra empresa entendemos lo importante que es un traslado sin sorpresas. Por eso ofrecemos en ${n} tarifas transparentes, flota moderna y personal capacitado en embalaje y carga.`,
  (n) => `En ${n} y alrededores realizamos fletes y mudanzas para particulares y empresas. Cobertura en ${n}, Santiago y regiones. Precios desde $27.000. Cotiza online o por WhatsApp +56 9 7979 6841.`,
  (n) => `Servicio de fletes y mudanzas en ${n}: confiable, puntual y a precio justo. En FletesPro atendemos ${n} y toda la RM. Calculadora de precios en la página, presupuesto personalizado sin compromiso y seguimiento de tu envío.`,
  (n) => `Desde ${n} llevamos tus muebles, electrodomésticos o carga a cualquier destino en Santiago o a regiones. Fletes y mudanzas en ${n} con vehículos adecuados y equipo que cuida tus pertenencias. Presupuesto gratis.`,
  (n) => `En ${n} ofrecemos fletes y mudanzas con atención personalizada. No importa si es un departamento, una casa o una oficina: en FletesPro planificamos tu traslado y te damos un precio claro desde el inicio.`,
  (n) => `Fletes en ${n} para mudanzas, trasteos y envíos de carga. Trabajamos en ${n} y en toda la Región Metropolitana con tarifas competitivas. Usa la calculadora para estimar tu flete o pide presupuesto por WhatsApp.`,
  (n) => `Mudanzas y fletes en ${n} con experiencia y recursos. En FletesPro cubrimos ${n}, Santiago y comunas aledañas. Precios desde $27.000, calculadora online y opción de presupuesto detallado sin costo.`,
  (n) => `Si vives o trabajas en ${n} y necesitas un flete o mudanza, somos tu opción. Servicio de fletes y mudanzas en ${n} con cobertura en la RM. Cotiza con la calculadora de esta página o contáctanos por WhatsApp.`,
  (n) => `En ${n} realizamos fletes y mudanzas con estándares de calidad. Ofrecemos en ${n} y alrededores precios transparentes, vehículos en buen estado y equipo que protege tus objetos. Presupuesto gratis.`,
]

// Variantes de ventajas (cada comuna recibe 6 distintas; combinación única por índice)
const VENTAJAS_POOL = [
  (n) => `Cobertura en ${n}, Santiago y demás comunas: llevamos tus pertenencias a cualquier destino en la RM o a regiones.`,
  (n) => `Precios competitivos: tarifas claras y sin costos ocultos. En fletes y mudanzas en ${n} ofrecemos valor y transparencia.`,
  (n) => `Flota y recursos: vehículos adecuados y equipo para manipular carga con cuidado. Embalaje y protección cuando lo necesites.`,
  (n) => `Servicio a medida: cada mudanza o flete es único; nos adaptamos a tus horarios, volumen y presupuesto.`,
  (n) => `Experiencia y confiabilidad: años en el sector nos permiten ofrecer un servicio serio y responsable en ${n} y toda la RM.`,
  (n) => `Contacto directo: cotiza por WhatsApp o con la calculadora. Respuesta rápida y presupuesto sin compromiso.`,
  (n) => `Desde ${n} hacia cualquier comuna: no importa el destino, coordinamos la ruta y el horario que te acomode.`,
  (n) => `Tarifas justas en ${n}: desde $27.000 para traslados cortos. Calculadora online para un estimado al instante.`,
  (n) => `Equipo capacitado: técnicas de carga y embalaje para que tus objetos lleguen en buen estado.`,
  (n) => `Plan a tu medida: flete sencillo, mudanza parcial o completa. En ${n} te ofrecemos la opción que necesitas.`,
  (n) => `Trayectoria en la zona: conocemos ${n} y la Región Metropolitana. Logística eficiente y sin contratiempos.`,
  (n) => `Atención al cliente: resuelve dudas por WhatsApp o teléfono. Presupuesto personalizado para fletes en ${n}.`,
  (n) => `Cobertura amplia desde ${n}: Santiago, Puente Alto, Maipú, Providencia y más. Un solo contacto para todo.`,
  (n) => `Precios transparentes: sin sorpresas. En mudanzas y fletes en ${n} te decimos el costo de forma clara.`,
  (n) => `Vehículos y materiales: camiones de distintos tamaños y elementos de protección para tu carga.`,
  (n) => `Flexibilidad: fechas y horarios que se ajusten a ti. Servicio de fletes en ${n} cuando lo necesites.`,
  (n) => `Profesionalismo en ${n}: equipo con experiencia en mudanzas residenciales, oficinas y fletes de carga.`,
  (n) => `Fácil cotización: calculadora en esta página o WhatsApp. Presupuesto para fletes en ${n} sin compromiso.`,
]

// Variantes de cierre (1 por comuna, rotación)
const CIERRES = [
  (n) => `No dejes que el estrés de una mudanza te complique. Confía en FletesPro para fletes y mudanzas en ${n}. Contáctanos hoy por WhatsApp o usa la calculadora para cotizar.`,
  (n) => `¿Listo para tu flete o mudanza en ${n}? Escríbenos por WhatsApp +56 9 7979 6841 o obtén un precio estimado con la calculadora de esta página. Te respondemos a la brevedad.`,
  (n) => `En ${n} y toda la RM, FletesPro está listo para ayudarte. Cotiza tu flete o mudanza sin compromiso. Presupuesto gratis y servicio profesional.`,
  (n) => `Contáctanos hoy para más información sobre fletes y mudanzas en ${n}. Calculadora online para un estimado o presupuesto personalizado por WhatsApp.`,
  (n) => `Confía en nosotros para tu traslado en ${n}. Fletes y mudanzas con precios claros y servicio de calidad. ¡Cotiza ya con la calculadora o por WhatsApp!`,
  (n) => `Si necesitas fletes o mudanzas en ${n}, estamos aquí. Presupuesto gratis y sin compromiso. Usa la calculadora o escríbenos por WhatsApp para coordinar.`,
  (n) => `Haz de tu mudanza o flete en ${n} una experiencia tranquila. FletesPro: precios justos, equipo profesional y cobertura en toda la Región Metropolitana.`,
  (n) => `Cotiza tu flete o mudanza en ${n} al instante. Calculadora en la parte superior de esta página o contacto por WhatsApp. Te esperamos.`,
  (n) => `Para fletes y mudanzas en ${n} con calidad y precios transparentes, elige FletesPro. Presupuesto gratis y atención personalizada.`,
  (n) => `No esperes más: cotiza tu flete o mudanza en ${n} con la calculadora o por WhatsApp. Servicio en toda la RM y a regiones.`,
]

function getContenidoComuna(slug) {
  const comuna = comunasRM.find(c => c.slug === slug)
  if (!comuna) return null
  const name = comuna.name
  const index = comunasRM.findIndex(c => c.slug === slug)

  // Intro especial para /fletes-santiago (hub de keywords)
  if (slug === 'santiago') {
    const intro = 'Fletes en Santiago: servicio de fletes Santiago centro, fletes baratos Santiago y fletes económicos en Santiago. Cotiza tu flete Santiago con la calculadora online o por WhatsApp. Valor flete Santiago desde $27.000. Fletes Santiago a regiones y fletes dentro de Santiago con precios transparentes.'
    const ventajas = [
      'Fletes Santiago centro y toda la RM: cobertura en las 52 comunas.',
      'Precios claros: valor flete Santiago desde $28.000 + $2.000/km en la RM.',
      'Fletes Santiago a regiones: tarifa $1500/km a Valparaíso, Temuco, La Serena y más.',
      'Fletes express Santiago y fletes Santiago centro 24 horas cuando lo necesites.',
      'Servicio de fletes en Santiago para particulares y empresas.',
      'Cotización al instante: calculadora online y presupuesto por WhatsApp sin compromiso.'
    ]
    const cierre = 'Cotiza tu flete Santiago con la calculadora de esta página o escríbenos por WhatsApp +56 9 7979 6841. Fletes baratos Santiago y fletes Santiago Chile con el mejor servicio.'
    return { intro, ventajas, cierre }
  }

  const introFn = INTROS[index % INTROS.length]
  const intro = introFn(name)

  const ventajas = []
  const used = new Set()
  for (let i = 0; i < 6; i++) {
    let k = (index * 7 + i * 11) % VENTAJAS_POOL.length
    let j = 0
    while (used.has(k) && j < VENTAJAS_POOL.length) {
      k = (k + 1) % VENTAJAS_POOL.length
      j++
    }
    used.add(k)
    ventajas.push(VENTAJAS_POOL[k](name))
  }

  const cierreFn = CIERRES[index % CIERRES.length]
  const cierre = cierreFn(name)

  return { intro, ventajas, cierre }
}

export { getContenidoComuna }
export default getContenidoComuna
