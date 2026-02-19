#!/bin/bash
# Ejecutar con: sudo bash /var/www/html/fletesproweb/frontend-nuxt/deploy/install-nginx-fletespro-cl.sh
# Añade el sitio fletespro.cl (y www) para que Nginx haga proxy al Nuxt (puerto 3003).

set -e
CONF_SRC="/var/www/html/fletesproweb/frontend-nuxt/deploy/nginx-fletespro-cl.conf"
CONF_DEST="/etc/nginx/sites-available/fletespro-cl.conf"

cp "$CONF_SRC" "$CONF_DEST"
ln -sf "$CONF_DEST" /etc/nginx/sites-enabled/fletespro-cl.conf
nginx -t
systemctl reload nginx
echo "OK: Sitio fletespro.cl activado. Nginx recargado."
