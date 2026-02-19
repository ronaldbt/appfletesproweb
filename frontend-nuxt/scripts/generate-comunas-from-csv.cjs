/**
 * Genera data/comunas/{slug}.js desde docs/fletes-*.csv
 * Ejecutar: node scripts/generate-comunas-from-csv.js
 * No sobrescribe santiago.js
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const docsDir = path.join(root, 'docs')
const outDir = path.join(root, 'data', 'comunas')

// CSV filename stem -> slug en comunasRM (cuando difieren por acentos)
const csvStemToSlug = {
  'peñalolen': 'penalolen',
  'ñuñoa': 'nunoa'
}

const comunasRM = [
  { slug: 'cerrillos', name: 'Cerrillos' },
  { slug: 'cerro-navia', name: 'Cerro Navia' },
  { slug: 'conchali', name: 'Conchalí' },
  { slug: 'el-bosque', name: 'El Bosque' },
  { slug: 'estacion-central', name: 'Estación Central' },
  { slug: 'huechuraba', name: 'Huechuraba' },
  { slug: 'independencia', name: 'Independencia' },
  { slug: 'la-cisterna', name: 'La Cisterna' },
  { slug: 'la-florida', name: 'La Florida' },
  { slug: 'la-granja', name: 'La Granja' },
  { slug: 'la-pintana', name: 'La Pintana' },
  { slug: 'la-reina', name: 'La Reina' },
  { slug: 'las-condes', name: 'Las Condes' },
  { slug: 'lo-barnechea', name: 'Lo Barnechea' },
  { slug: 'lo-espejo', name: 'Lo Espejo' },
  { slug: 'lo-prado', name: 'Lo Prado' },
  { slug: 'macul', name: 'Macul' },
  { slug: 'maipu', name: 'Maipú' },
  { slug: 'nunoa', name: 'Ñuñoa' },
  { slug: 'pedro-aguirre-cerda', name: 'Pedro Aguirre Cerda' },
  { slug: 'penalolen', name: 'Peñalolén' },
  { slug: 'providencia', name: 'Providencia' },
  { slug: 'pudahuel', name: 'Pudahuel' },
  { slug: 'quilicura', name: 'Quilicura' },
  { slug: 'quinta-normal', name: 'Quinta Normal' },
  { slug: 'recoleta', name: 'Recoleta' },
  { slug: 'renca', name: 'Renca' },
  { slug: 'san-joaquin', name: 'San Joaquín' },
  { slug: 'san-miguel', name: 'San Miguel' },
  { slug: 'san-ramon', name: 'San Ramón' },
  { slug: 'vitacura', name: 'Vitacura' },
  { slug: 'pirque', name: 'Pirque' },
  { slug: 'puente-alto', name: 'Puente Alto' },
  { slug: 'san-jose-de-maipo', name: 'San José de Maipo' },
  { slug: 'colina', name: 'Colina' },
  { slug: 'lampa', name: 'Lampa' },
  { slug: 'tiltil', name: 'Tiltil' },
  { slug: 'buin', name: 'Buin' },
  { slug: 'calera-de-tango', name: 'Calera de Tango' },
  { slug: 'paine', name: 'Paine' },
  { slug: 'san-bernardo', name: 'San Bernardo' },
  { slug: 'alhue', name: 'Alhué' },
  { slug: 'curacavi', name: 'Curacaví' },
  { slug: 'maria-pinto', name: 'María Pinto' },
  { slug: 'san-pedro', name: 'San Pedro' },
  { slug: 'el-monte', name: 'El Monte' },
  { slug: 'isla-de-maipo', name: 'Isla de Maipo' },
  { slug: 'padre-hurtado', name: 'Padre Hurtado' },
  { slug: 'talagante', name: 'Talagante' }
]

function parseCsv (filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.split(/\r?\n/).filter(Boolean)
  const keywords = []
  for (let i = 1; i < lines.length; i++) {
    const first = lines[i].split(',')[0]?.trim()
    if (first && first.toLowerCase() !== 'keyword') keywords.push(first)
  }
  return keywords
}

function slugFromFilename (name) {
  const stem = name.replace(/^fletes-/, '').replace(/\.csv$/i, '')
  return csvStemToSlug[stem] || stem
}

function buildContent (slug, name, keywords) {
  const kw = keywords.slice(0, 20)
  const kwMeta = kw.join(', ')
  const introKw = kw.slice(0, 5).join(', ')
  const title = `Fletes ${name} | Fletes y mudanzas | FletesPro`
  const description = `Fletes en ${name}. Fletes y mudanzas en la Región Metropolitana. Cotiza online. Presupuesto gratis. WhatsApp +56 9 7979 6841.`
  return {
    meta: { title, description, keywords: kwMeta },
    hero: {
      tagline: `Fletes ${name}`,
      title: `Fletes en ${name}`,
      intro: `¿Buscas fletes en ${name}? Ofrecemos fletes y mudanzas en ${name} con precios desde $27.000. ${introKw}. Cotiza con la calculadora o por WhatsApp. Presupuesto gratis.`,
      introExtra: `Servicio de fletes en ${name} y toda la RM. Fletes baratos ${name}, fletes económicos. Cotización al instante.`
    },
    ventajas: [
      `Cobertura en ${name} y toda la Región Metropolitana.`,
      `Precios competitivos: fletes en ${name} con tarifas claras.`,
      'Flota adecuada y equipo para carga y mudanzas.',
      'Servicio personalizado y respuesta rápida.',
      'Años de experiencia en fletes y mudanzas.',
      'Cotiza por WhatsApp o con la calculadora de esta página.'
    ],
    cierre: `Contáctanos para fletes y mudanzas en ${name}. Presupuesto gratis. WhatsApp +56 9 7979 6841.`,
    h2Ventajas: `¿Por qué elegir FletesPro para fletes en ${name}?`
  }
}

function buildGenericContent (slug, name) {
  return buildContent(slug, name, [`fletes ${name}`, `fletes y mudanzas ${name}`, `flete ${name}`, `fletes baratos ${name}`, `fletes económicos ${name}`])
}

function toJsModule (content, slug) {
  return `/**
 * Contenido único para /fletes-${slug}
 * Generado desde docs/fletes-*.csv
 */
export default ${JSON.stringify(content, null, 2)}
`
}

// main
if (!fs.existsSync(docsDir)) {
  console.error('No existe carpeta docs/')
  process.exit(1)
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(docsDir).filter(f => f.startsWith('fletes-') && f.endsWith('.csv') && !f.includes('santiago-keywords') && !f.includes('construccion'))

const slugToName = {}
comunasRM.forEach(c => { slugToName[c.slug] = c.name })

let generated = 0
files.forEach(file => {
  const slug = slugFromFilename(file)
  if (slug === 'santiago') return
  const name = slugToName[slug] || slug
  const filePath = path.join(docsDir, file)
  const keywords = parseCsv(filePath)
  const content = buildContent(slug, name, keywords)
  const outPath = path.join(outDir, `${slug}.js`)
  fs.writeFileSync(outPath, toJsModule(content, slug), 'utf8')
  console.log('OK', slug)
  generated++
})

// Comunas sin CSV: contenido genérico
const slugsWithCsv = new Set(files.map(f => slugFromFilename(f)))
comunasRM.forEach(c => {
  if (c.slug === 'santiago' || slugsWithCsv.has(c.slug)) return
  const content = buildGenericContent(c.slug, c.name)
  const outPath = path.join(outDir, `${c.slug}.js`)
  fs.writeFileSync(outPath, toJsModule(content, c.slug), 'utf8')
  console.log('OK (genérico)', c.slug)
  generated++
})

console.log('Total generados:', generated)
