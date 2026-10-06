# Módulo Bodega FletesPro — qué debe tener (recomendación operativa)

Documento de producto para el admin de guardamuebles / almacenamiento **multitenant**.

## Ya implementado (v1)

| Módulo | Admin | Portal cliente |
|--------|-------|----------------|
| Bodegas (sedes) | CRUD | — |
| Usuarios tenant (`cliente_bodega`) | Crear con email/clave, editar, activar/desactivar | Login → `/dashboard-bodega` |
| Contratos | CRUD (cliente + bodega + tarifa + unidad) | Ver propios |
| Almacenaje / ítems + fotos | Crear ítems, subir fotos | Galería “Mis cosas” |
| Pagos / cuotas | Crear, marcar pagada | Ver vencimientos y estado |
| Aislamiento tenant | — | Solo datos del `usuario_id` |

Modelo DB: `bodegas`, `bodega_clientes`, `bodega_contratos`, `bodega_items`, `bodega_item_fotos`, `bodega_cuotas`.

Rol: `usuarios.tipo = 'cliente_bodega'`.

---

## Debe tener (prioridad alta — siguiente iteración)

1. **Generación automática de cuotas** al iniciar mes (job cron desde contratos activos).
2. **Recordatorios WhatsApp/email** 5 y 1 día antes del vencimiento.
3. **Ingreso / egreso de ítems** con registro de fecha, foto y firma digital/PDF.
4. **Inventario firmado al ingreso** (PDF descargable para cliente y admin).
5. **Auth de API** (JWT o sesión) — hoy el filtrado es por `usuario_id` como el resto del sistema; endurecer antes de escala.
6. **Portal: cambio de contraseña** por el propio cliente.
7. **Estados de mora** automáticos (cuota vencida → `mora`) + alerta en admin.

## Debe tener (prioridad media)

8. Mapa de pasillos / unidades ocupadas vs libres.
9. Visitas y retiros agendados.
10. Seguro / valor declarado por ítem o lote.
11. Factura o boleta PDF + comprobante de pago.
12. Notas e incidencias (daños, reclamaciones).
13. Auditoría (quién creó/editó ítem, foto o pago).
14. Capacidad de bodega: alerta al superar 85% m³.

## Opcional / más adelante

15. App móvil para operarios (escanear etiqueta QR).
16. Pago online (Mercado Pago) desde el portal del cliente.
17. Multi-sede con roles de operador por bodega.
18. Política de abandono por impago (legal + flujo).

---

## Flujo operativo recomendado

```
1. Crear bodega (sede)
2. Crear cliente (email + contraseña)  →  rol cliente_bodega
3. Crear contrato (cliente + unidad + tarifa)
4. Registrar ítems + fotos al ingreso
5. Generar cuota del mes
6. Cliente entra a /login → ve cosas, pagos y contrato
7. Admin marca cuota como pagada (o pago online)
```

## Seguridad multitenant (reglas)

- Toda query del portal filtra por `bodega_clientes.usuario_id`.
- El cliente **nunca** recibe listados globales.
- Fotos en `/uploads/bodega/` servidas por API; URLs no enumerables con IDs predecibles (mejorar con UUID en v2).
- No mezclar `cliente` (fletes) con `cliente_bodega` (almacenaje) en el mismo dashboard.
