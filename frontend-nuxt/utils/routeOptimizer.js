/**
 * Matriz de costos vía Routes API (JS): RouteMatrix.computeRouteMatrix.
 * Evita Distance Matrix "legacy" desactivada en muchos proyectos.
 * TSP abierto: inicio fijo + nearest neighbor + 2-opt.
 */

const MAX_ELEMENTS = 100

function routeMatrixItemCost (item, byTime) {
  if (!item || item.error) return 1e12
  if (byTime) {
    const ms = item.durationMillis
    if (ms != null && Number.isFinite(ms) && ms !== Number.POSITIVE_INFINITY) {
      return ms / 1000
    }
    return 1e12
  }
  const m = item.distanceMeters
  return m != null && Number.isFinite(m) ? m : 1e12
}

/** Origen/destino para Route Matrix en Maps JS: literal { lat, lng } (ver migración desde Distance Matrix). No uses el JSON REST con `waypoint`. */
function toRouteMatrixLatLng (p) {
  const lat = Number(p.lat)
  const lng = Number(p.lng)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error(
      'Una parada tiene coordenadas inválidas. Quitarla y volver a agregarla desde una sugerencia del mapa.'
    )
  }
  return { lat, lng }
}

async function computeMatrixChunk (RouteMatrix, gmaps, points, originStart, originEnd, byTime) {
  const n = points.length
  const slice = points.slice(originStart, originEnd)
  const origins = slice.map(toRouteMatrixLatLng)
  const destinations = points.map(toRouteMatrixLatLng)

  // Misma forma que la doc oficial de Route Matrix (JS): DRIVING + UnitSystem.METRIC.
  // Sin languageCode: en Route Matrix (JS) no es propiedad válida del request y devuelve "unknown property languageCode".
  const baseRequest = {
    origins,
    destinations,
    travelMode: 'DRIVING',
    units: gmaps.UnitSystem.METRIC,
    fields: ['durationMillis', 'distanceMeters', 'condition']
  }

  const tryRequest = async (routingPreference) => {
    const request = { ...baseRequest, routingPreference }
    if (routingPreference === 'TRAFFIC_AWARE') {
      request.departureTime = new Date()
    }
    return RouteMatrix.computeRouteMatrix(request)
  }

  let raw
  try {
    raw = await tryRequest(byTime ? 'TRAFFIC_AWARE' : 'TRAFFIC_UNAWARE')
  } catch (e) {
    const hint = e?.message || String(e)
    if (byTime) {
      try {
        raw = await tryRequest('TRAFFIC_UNAWARE')
      } catch (e2) {
        const h2 = e2?.message || String(e2)
        throw new Error(
          `Route Matrix (con tráfico: ${hint}; sin tráfico: ${h2}). Activa Routes API y comprueba la clave.`
        )
      }
    } else {
      throw new Error(hint)
    }
  }

  const matrixWrapper = raw?.matrix ?? raw
  const rows = matrixWrapper?.rows
  if (!rows || rows.length !== origins.length) {
    throw new Error(
      'Respuesta inválida de Route Matrix. Activa «Routes API» en Google Cloud para este proyecto y clave.'
    )
  }

  return { rows, sliceLen: slice.length }
}

/**
 * @param {typeof google.maps} gmaps
 * @param {Array<{lat:number,lng:number}>} points
 * @param {boolean} byTime
 * @returns {Promise<number[][]>}
 */
export async function fetchDistanceMatrix (gmaps, points, byTime) {
  if (typeof gmaps.importLibrary !== 'function') {
    throw new Error(
      'Maps JS sin importLibrary. Recarga la página; el script debe incluir v=weekly.'
    )
  }

  const routesLib = await gmaps.importLibrary('routes')
  const RouteMatrix = routesLib.RouteMatrix
  if (!RouteMatrix?.computeRouteMatrix) {
    throw new Error('No se pudo cargar RouteMatrix. Comprueba la clave y la Routes API en Google Cloud.')
  }

  const n = points.length
  const matrix = Array.from({ length: n }, () => Array(n).fill(0))

  let originStart = 0
  while (originStart < n) {
    const maxOrigins = Math.max(1, Math.floor(MAX_ELEMENTS / n))
    const originEnd = Math.min(originStart + maxOrigins, n)

    const { rows } = await computeMatrixChunk(
      RouteMatrix,
      gmaps,
      points,
      originStart,
      originEnd,
      byTime
    )

    for (let i = 0; i < rows.length; i++) {
      const items = rows[i]?.items
      if (!items || items.length !== n) {
        throw new Error('Fila de matriz incompleta. Revisa cuotas y límites de Routes API.')
      }
      for (let j = 0; j < n; j++) {
        const gi = originStart + i
        matrix[gi][j] = gi === j ? 0 : routeMatrixItemCost(items[j], byTime)
      }
    }
    originStart = originEnd
  }

  return matrix
}

export function pathCost (matrix, path) {
  let s = 0
  for (let k = 0; k < path.length - 1; k++) {
    s += matrix[path[k]][path[k + 1]]
  }
  return s
}

export function nearestNeighborPath (matrix, start, n) {
  const path = [start]
  const visited = new Set([start])
  let cur = start
  while (visited.size < n) {
    let best = -1
    let bestC = Infinity
    for (let j = 0; j < n; j++) {
      if (visited.has(j)) continue
      const c = matrix[cur][j]
      if (c < bestC) {
        bestC = c
        best = j
      }
    }
    if (best === -1) break
    path.push(best)
    visited.add(best)
    cur = best
  }
  return path
}

export function twoOptOpenPath (matrix, path) {
  if (path.length < 4) return path.slice()
  let p = path.slice()
  let improved = true
  while (improved) {
    improved = false
    for (let i = 1; i < p.length - 1; i++) {
      for (let j = i + 1; j < p.length; j++) {
        const next = p.slice()
        const seg = next.slice(i, j + 1).reverse()
        next.splice(i, j - i + 1, ...seg)
        if (pathCost(matrix, next) < pathCost(matrix, p)) {
          p = next
          improved = true
        }
      }
    }
  }
  return p
}

/**
 * @returns {{ order: number[], orderedPoints: Array, totalSeconds: number|null, totalMeters: number|null, optimizeBy: string }}
 */
export function buildOptimizationResult (points, path, totalCost, optimizeBy) {
  const byTime = optimizeBy !== 'distance'
  const orderedPoints = path.map((idx, order) => ({
    order: order + 1,
    index: idx,
    lat: points[idx].lat,
    lng: points[idx].lng,
    label: points[idx].label || points[idx].address || `Parada ${idx + 1}`
  }))
  return {
    optimizeBy: byTime ? 'time' : 'distance',
    order: path,
    orderedPoints,
    totalSeconds: byTime ? Math.round(totalCost) : null,
    totalMeters: byTime ? null : Math.round(totalCost)
  }
}

export function optimizeRouteOrder (matrix, startIndex, n, optimizeBy) {
  let path = nearestNeighborPath(matrix, startIndex, n)
  path = twoOptOpenPath(matrix, path)
  const total = pathCost(matrix, path)
  return { path, totalCost: total }
}
