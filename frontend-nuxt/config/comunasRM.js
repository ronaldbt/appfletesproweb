/**
 * Comunas Región Metropolitana (Chile) para fletes y mudanzas.
 * Todas las comunas RM excepto Peñaflor y Melipilla (muy lejos).
 * URLs: /fletes-{slug} (ej. /fletes-las-condes).
 * zona: oriente/centro/sur/norte para variar contenido y reducir duplicados.
 */
export const comunasRM = [
  // Provincia Santiago (32)
  { slug: 'santiago', name: 'Santiago', zona: 'centro' },
  { slug: 'cerrillos', name: 'Cerrillos', zona: 'centro' },
  { slug: 'cerro-navia', name: 'Cerro Navia', zona: 'oeste' },
  { slug: 'conchali', name: 'Conchalí', zona: 'norte' },
  { slug: 'el-bosque', name: 'El Bosque', zona: 'sur' },
  { slug: 'estacion-central', name: 'Estación Central', zona: 'centro' },
  { slug: 'huechuraba', name: 'Huechuraba', zona: 'norte' },
  { slug: 'independencia', name: 'Independencia', zona: 'norte' },
  { slug: 'la-cisterna', name: 'La Cisterna', zona: 'sur' },
  { slug: 'la-florida', name: 'La Florida', zona: 'sur' },
  { slug: 'la-granja', name: 'La Granja', zona: 'sur' },
  { slug: 'la-pintana', name: 'La Pintana', zona: 'sur' },
  { slug: 'la-reina', name: 'La Reina', zona: 'oriente' },
  { slug: 'las-condes', name: 'Las Condes', zona: 'oriente' },
  { slug: 'lo-barnechea', name: 'Lo Barnechea', zona: 'oriente' },
  { slug: 'lo-espejo', name: 'Lo Espejo', zona: 'sur' },
  { slug: 'lo-prado', name: 'Lo Prado', zona: 'centro' },
  { slug: 'macul', name: 'Macul', zona: 'oriente' },
  { slug: 'maipu', name: 'Maipú', zona: 'oeste' },
  { slug: 'nunoa', name: 'Ñuñoa', zona: 'oriente' },
  { slug: 'pedro-aguirre-cerda', name: 'Pedro Aguirre Cerda', zona: 'sur' },
  { slug: 'penalolen', name: 'Peñalolén', zona: 'oriente' },
  { slug: 'providencia', name: 'Providencia', zona: 'oriente' },
  { slug: 'pudahuel', name: 'Pudahuel', zona: 'oeste' },
  { slug: 'quilicura', name: 'Quilicura', zona: 'norte' },
  { slug: 'quinta-normal', name: 'Quinta Normal', zona: 'centro' },
  { slug: 'recoleta', name: 'Recoleta', zona: 'norte' },
  { slug: 'renca', name: 'Renca', zona: 'centro' },
  { slug: 'san-joaquin', name: 'San Joaquín', zona: 'sur' },
  { slug: 'san-miguel', name: 'San Miguel', zona: 'sur' },
  { slug: 'san-ramon', name: 'San Ramón', zona: 'sur' },
  { slug: 'vitacura', name: 'Vitacura', zona: 'oriente' },
  // Cordillera (3)
  { slug: 'pirque', name: 'Pirque', zona: 'oriente' },
  { slug: 'puente-alto', name: 'Puente Alto', zona: 'sur' },
  { slug: 'san-jose-de-maipo', name: 'San José de Maipo', zona: 'oriente' },
  // Chacabuco (3)
  { slug: 'colina', name: 'Colina', zona: 'norte' },
  { slug: 'lampa', name: 'Lampa', zona: 'norte' },
  { slug: 'tiltil', name: 'Tiltil', zona: 'norte' },
  // Maipo (4)
  { slug: 'buin', name: 'Buin', zona: 'sur' },
  { slug: 'calera-de-tango', name: 'Calera de Tango', zona: 'sur' },
  { slug: 'paine', name: 'Paine', zona: 'sur' },
  { slug: 'san-bernardo', name: 'San Bernardo', zona: 'sur' },
  // Melipilla (4, sin Melipilla comuna)
  { slug: 'alhue', name: 'Alhué', zona: 'sur' },
  { slug: 'curacavi', name: 'Curacaví', zona: 'oeste' },
  { slug: 'maria-pinto', name: 'María Pinto', zona: 'oeste' },
  { slug: 'san-pedro', name: 'San Pedro', zona: 'oeste' },
  // Talagante (4, sin Peñaflor)
  { slug: 'el-monte', name: 'El Monte', zona: 'sur' },
  { slug: 'isla-de-maipo', name: 'Isla de Maipo', zona: 'sur' },
  { slug: 'padre-hurtado', name: 'Padre Hurtado', zona: 'sur' },
  { slug: 'talagante', name: 'Talagante', zona: 'sur' }
]

export default comunasRM
