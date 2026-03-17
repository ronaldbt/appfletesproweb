# Comparación: sitemap.xml vs páginas indexadas en Google (fletespro.cl)

**Fecha:** 1 feb 2026 (referencia).  
**Producción:** Build y `pm2 restart fletespro-frontend` ejecutados.

---

## Páginas que deberían estar en el sitemap y **NO** aparecen en tu listado de indexadas

*(Son las que “te faltan indexar” o que Google aún no ha rastreado/indexado.)*

### Páginas principales

| URL | Nota |
|-----|------|
| https://fletespro.cl/mudanzas | Hub mudanzas |
| https://fletespro.cl/mudanzas-santiago | Mudanzas Santiago (calculadora/cotizar) |
| https://fletespro.cl/mudanzas/particulares | Mudanzas particulares |
| https://fletespro.cl/mudanzas/urgentes | Mudanzas urgentes |
| https://fletespro.cl/transporte-frio | Transporte en frío (hub) |
| https://fletespro.cl/guardamuebles | Guardamuebles |
| https://fletespro.cl/reservar | Reservar |
| https://fletespro.cl/gracias | Gracias (post-reserva) |
| https://fletespro.cl/fletes-santiago | Fletes Santiago (hub) |

### Mudanzas por comuna (no indexadas en tu listado)

| URL |
|-----|
| https://fletespro.cl/mudanzas-las-condes |
| https://fletespro.cl/mudanzas-lo-barnechea |
| https://fletespro.cl/mudanzas-san-miguel |
| https://fletespro.cl/mudanzas-nunoa |
| https://fletespro.cl/mudanzas-la-reina |

*(Las que sí tienes indexadas: mudanzas-la-cisterna, mudanzas-colina, mudanzas-chicureo, mudanzas-huechuraba, mudanzas-providencia.)*

### Fletes por comuna (no indexadas en tu listado)

| URL |
|-----|
| https://fletespro.cl/fletes-santiago |
| https://fletespro.cl/fletes-la-granja |
| https://fletespro.cl/fletes-macul |
| https://fletespro.cl/fletes-penalolen |
| https://fletespro.cl/fletes-alhue |
| https://fletespro.cl/fletes-calera-de-tango |
| https://fletespro.cl/fletes-el-monte |
| https://fletespro.cl/fletes-isla-de-maipo |
| https://fletespro.cl/fletes-padre-hurtado |
| https://fletespro.cl/fletes-talagante |

### Blog (artículos no indexados en tu listado)

| URL |
|-----|
| https://fletespro.cl/blog/mudanza-departamento-santiago-guia-completa-precios-2026 |
| https://fletespro.cl/blog/mudarse-con-ninos-santiago-organizar-mudanza |
| https://fletespro.cl/blog/cuanto-tiempo-dura-una-mudanza-tiempos-reales |
| https://fletespro.cl/blog/como-mudarse-con-mascotas-santiago-guia |
| https://fletespro.cl/blog/mudanza-urgente-santiago-es-posible-menos-24-horas |
| https://fletespro.cl/blog/las-15-mejores-empresas-mudanzas-santiago |
| https://fletespro.cl/blog/empresa-mudanzas-vs-hacerlo-solo-cuando-vale-la-pena-contratar |
| https://fletespro.cl/blog/checklist-mudanza-santiago-30-15-1-dia-antes |
| https://fletespro.cl/blog/cuanto-cuesta-una-mudanza-en-santiago-2026-precios-reales-por-m3 |
| https://fletespro.cl/blog/que-se-considera-una-mudanza |
| https://fletespro.cl/blog/cuantos-dias-por-ley-te-dan-por-mudanza-en-chile |
| https://fletespro.cl/blog/como-generar-salvoconducto-para-mudanza |

---

## Resumen numérico

- **Páginas principales** sin indexar en tu listado: **9**
- **Mudanzas por comuna** sin indexar: **5**
- **Fletes por comuna** sin indexar: **10**
- **Artículos de blog** sin indexar: **12**  
- **Total aproximado de URLs “que te faltan indexar”:** **36**

*(El sitemap se genera en tiempo de ejecución con `@nuxtjs/sitemap` e incluye todas las páginas públicas + rutas de `content/blog` + rutas de comunas desde `config/comunasRM.js`. Las excluidas son: dashboard-admin, dashboard-cliente, dashboard-conductor, login, register, cliente, conductor, test, no-disponible, api.)*

---

## Notas sobre URLs que sí tienes indexadas

- **https://fletespro.cl/fletes-talca** y **https://fletespro.cl/envios-ecommerce** (y **/fletes-en-nunoa/** con barra final): no aparecen en el código actual del frontend-nuxt (no hay página `fletes-talca.vue` ni `envios-ecommerce.vue`). Pueden ser redirecciones, URLs antiguas o de otro subdominio. Si ya no existen, conviene configurar 301 a la URL correcta o marcar como no indexable si se eliminan.

---

## Qué hacer para que Google indexe lo que falta

1. En **Google Search Console**: enviar el sitemap `https://fletespro.cl/sitemap.xml` (si no está ya) y usar “Inspeccionar URL” o “Solicitar indexación” para las páginas más importantes (mudanzas-santiago, mudanzas/urgentes, blog reciente).
2. Enlazar desde páginas ya indexadas a estas URLs (por ejemplo desde la home a /mudanzas-santiago, /mudanzas/urgentes y a los nuevos posts del blog).
3. Dejar que pase el tiempo: el rastreo va incorporando nuevas URLs según la frecuencia de tu sitemap y la importancia que Google asigne a cada una.
