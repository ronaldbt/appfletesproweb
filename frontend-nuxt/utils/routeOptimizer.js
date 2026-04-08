/**
 * Matriz de costos vía Google Maps JavaScript DistanceMatrixService (misma clave que el mapa).
 * TSP abierto: inicio fijo elegido por el usuario + nearest neighbor + 2-opt.
 */

const MAX_ELEMENTS = 100

function elementCost (el, byTime) {
  if (!el || el.status !== 'OK') return 1e12
  if (byTime) {
    if (el.duration_in_traffic && typeof el.duration_in_traffic.value === 'number') {
      return el.duration_in_traffic.value
    }
    return el.duration?.value ?? 1e12
  }
  return el.distance?.value ?? 1e12
}

/**
 * @param {typeof google.maps} gmaps - namespace google.maps
 * @param {Array<{lat:number,lng:number}>} points
 * @param {boolean} byTime
 * @returns {Promise<number[][]>}
 */
export function fetchDistanceMatrix (gmaps, points, byTime) {
  const n = points.length
  const matrix = Array.from({ length: n }, () => Array(n).fill(0))
  const service = new gmaps.DistanceMatrixService()
  const latLng = (p) => new gmaps.LatLng(p.lat, p.lng)

  const runChunk = (originsSlice, originOffset) =>
    new Promise((resolve, reject) => {
      const origins = originsSlice.map(latLng)
      const destinations = points.map(latLng)
      const opts = {
        origins,
        destinations,
        travelMode: gmaps.TravelMode.DRIVING,
        unitSystem: gmaps.UnitSystem.METRIC,
        region: 'CL'
      }
      if (byTime) {
        opts.drivingOptions = {
          departureTime: new Date(),
          trafficModel: gmaps.TrafficModel.BEST_GUESS
        }
      }
      service.getDistanceMatrix(opts, (response, status) => {
        if (status !== 'OK') {
          reject(new Error(`${status}${response?.error_message ? ': ' + response.error_message : ''}`))
          return
        }
        for (let i = 0; i < originsSlice.length; i++) {
          const row = response.rows[i]
          for (let j = 0; j < n; j++) {
            const el = row.elements[j]
            const gi = originOffset + i
            matrix[gi][j] = gi === j ? 0 : elementCost(el, byTime)
          }
        }
        resolve()
      })
    })

  const chain = async () => {
    let originStart = 0
    while (originStart < n) {
      const maxOrigins = Math.max(1, Math.floor(MAX_ELEMENTS / n))
      const originEnd = Math.min(originStart + maxOrigins, n)
      const slice = points.slice(originStart, originEnd)
      try {
        await runChunk(slice, originStart)
      } catch (e) {
        if (byTime) {
          await runChunkBasic(slice, originStart)
        } else {
          throw e
        }
      }
      originStart = originEnd
    }
    return matrix
  }

  const runChunkBasic = (originsSlice, originOffset) =>
    new Promise((resolve, reject) => {
      const origins = originsSlice.map(latLng)
      const destinations = points.map(latLng)
      service.getDistanceMatrix(
        {
          origins,
          destinations,
          travelMode: gmaps.TravelMode.DRIVING,
          unitSystem: gmaps.UnitSystem.METRIC,
          region: 'CL'
        },
        (response, status) => {
          if (status !== 'OK') {
            reject(new Error(status))
            return
          }
          for (let i = 0; i < originsSlice.length; i++) {
            const row = response.rows[i]
            for (let j = 0; j < n; j++) {
              const el = row.elements[j]
              const gi = originOffset + i
              matrix[gi][j] = gi === j ? 0 : elementCost(el, true)
            }
          }
          resolve()
        }
      )
    })

  return chain()
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
