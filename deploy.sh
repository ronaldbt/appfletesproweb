#!/bin/bash

# Script para compilar y desplegar el frontend Nuxt de FletesPro
echo "🔨 Compilando frontend-nuxt..."
cd /var/www/html/fletesproweb/frontend-nuxt && npm run build

echo "🚀 Iniciando/reiniciando FletesPro frontend con PM2..."
cd /var/www/html/fletesproweb/frontend-nuxt
pm2 delete fletespro-frontend 2>/dev/null || true
pm2 start ecosystem.config.cjs

echo "📋 Guardando configuración PM2..."
pm2 save

echo "✅ Despliegue completado!"
echo "🌐 La aplicación está disponible en: https://app.fletespro.cl"
