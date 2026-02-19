# Nginx: fletespro.cl y www en el servidor 158.220.97.75

## Objetivo

Que **fletespro.cl** y **www.fletespro.cl** sirvan la misma app Nuxt que ya corre en **app.fletespro.cl** (puerto 3003, PM2).

---

## Si usas Cloudflare en SSL "Flexible" (origen HTTP)

Con **Flexible**, Cloudflare se conecta a tu servidor por **HTTP (puerto 80)**. Usa este config que solo escucha en 80 y hace proxy a Nuxt:

```bash
sudo cp /var/www/html/fletesproweb/frontend-nuxt/deploy/nginx-fletespro-cl-flexible.conf /etc/nginx/sites-available/fletespro-cl.conf
sudo ln -sf /etc/nginx/sites-available/fletespro-cl.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Archivo: **`nginx-fletespro-cl-flexible.conf`**

## Pasos en el servidor 158.220.97.75

### 1. Copiar la configuración

```bash
sudo cp /var/www/html/fletesproweb/frontend-nuxt/deploy/nginx-fletespro-cl.conf /etc/nginx/sites-available/fletespro-cl.conf
```

### 2. Activar el sitio

```bash
sudo ln -s /etc/nginx/sites-available/fletespro-cl.conf /etc/nginx/sites-enabled/
```

### 3. Certificado SSL (si aún no existe para fletespro.cl)

Si **fletespro.cl** no tiene certificado en este servidor:

```bash
# Primero crear un server temporal solo en HTTP para que Certbot valide
# O si Nginx ya tiene otro server en 80 para fletespro.cl, Certbot puede usarlo.
sudo certbot certonly --nginx -d fletespro.cl -d www.fletespro.cl
```

Si el certificado está en **otro servidor** (el 5.161.92.83 de WordPress), hay que **copiar** los archivos de `/etc/letsencrypt/live/fletespro.cl/` a este servidor en la misma ruta, o ajustar en el `.conf` las rutas donde hayas puesto los pem.

Si usas **Cloudflare** con proxy (naranja), puedes usar certificado “Origin” de Cloudflare o seguir usando Let’s Encrypt en el servidor; en ambos casos las rutas `ssl_certificate` y `ssl_certificate_key` del `.conf` deben apuntar a esos archivos.

### 4. Comprobar Nginx y recargar

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Probar antes de cambiar DNS (opcional)

En tu PC, editar `/etc/hosts` (o el de tu máquina de pruebas):

```
158.220.97.75  fletespro.cl
158.220.97.75  www.fletespro.cl
```

Luego abrir https://fletespro.cl (o http si aún no tienes SSL) y ver que carga la app Nuxt. Después quitar esas líneas de hosts.

### 6. Cambiar DNS en Cloudflare

Cuando todo funcione en el servidor, en Cloudflare cambia los registros **A** de **fletespro.cl** y **www** de `5.161.92.83` a **`158.220.97.75`**. El resto (redirecciones 301, etc.) lo haces tú en Cloudflare.

## Notas

- El bloque **www** en **puerto 80** redirige a `https://fletespro.cl`. Si prefieres que www también sirva la app sin redirigir, comenta o borra ese primer `server` de `www.fletespro.cl` en el `.conf`.
- El **puerto 3003** es el que usa PM2 para `fletespro-frontend` (ver `ecosystem.config.cjs`).
