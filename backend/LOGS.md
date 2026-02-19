# Cómo ver los logs del backend (PM2)

El backend corre con **PM2**. Los logs se guardan en archivos y también puedes verlos en tiempo real.

## Ver logs en tiempo real

```bash
# Últimas 100 líneas y seguir mostrando (Ctrl+C para salir)
pm2 logs fletespro-backend

# Solo salida estándar (console.log)
pm2 logs fletespro-backend --out

# Solo errores (console.error)
pm2 logs fletespro-backend --err

# Últimas N líneas sin seguir
pm2 logs fletespro-backend --lines 80 --nostream
```

## Ver archivos de log directamente

Ruta de los archivos (según `pm2 show fletespro-backend`):

- **Salida estándar:** `~/.pm2/logs/fletespro-backend-out.log`
- **Errores:** `~/.pm2/logs/fletespro-backend-error.log`

```bash
# Ver últimas 50 líneas del log de errores
tail -50 ~/.pm2/logs/fletespro-backend-error.log

# Ver últimas 50 líneas del log de salida
tail -50 ~/.pm2/logs/fletespro-backend-out.log

# Seguir el log en vivo (como tail -f)
tail -f ~/.pm2/logs/fletespro-backend-error.log
```

## Comandos PM2 útiles

```bash
# Estado del proceso
pm2 show fletespro-backend

# Reiniciar después de cambiar código
pm2 restart fletespro-backend

# Vaciar logs (empezar de cero)
pm2 flush fletespro-backend
```
