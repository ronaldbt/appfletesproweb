#!/bin/bash

# Script para compilar y desplegar el frontend
echo "🔨 Compilando frontend..."
cd frontend && npm run build

echo "📦 Copiando archivos al directorio de Nginx..."
cp -r dist/* /home/oleksiy22/frontend-build/

echo "🧹 Limpiando archivos antiguos..."
# Encontrar el archivo JS más reciente y eliminar los antiguos
LATEST_JS=$(ls -t /home/oleksiy22/frontend-build/assets/index-*.js | head -1)
if [ -n "$LATEST_JS" ]; then
    find /home/oleksiy22/frontend-build/assets/ -name "index-*.js" -not -path "$LATEST_JS" -delete 2>/dev/null || true
fi

echo "✅ Despliegue completado!"
echo "🌐 La aplicación está disponible en: https://app.fletespro.cl"
