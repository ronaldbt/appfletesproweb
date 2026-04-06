#!/bin/bash
# Deploy completo: build + PM2 + actualizar Nginx (requiere sudo)
# Uso: sudo bash frontend-nuxt/deploy/update-nginx-and-deploy.sh

set -e
cd /var/www/html/fletesproweb

echo "🔨 Compilando frontend-nuxt..."
cd frontend-nuxt && npm run build

echo "🚀 Reiniciando PM2..."
cd /var/www/html/fletesproweb/frontend-nuxt
pm2 delete fletespro-frontend 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo "📋 Actualizando Nginx..."
cp /var/www/html/fletesproweb/frontend-nuxt/deploy/nginx-fletespro-cl.conf /etc/nginx/sites-available/fletespro-cl.conf
ln -sf /etc/nginx/sites-available/fletespro-cl.conf /etc/nginx/sites-enabled/fletespro-cl.conf
nginx -t
systemctl reload nginx

echo "✅ Despliegue completado!"
echo "🌐 https://fletespro.cl"
