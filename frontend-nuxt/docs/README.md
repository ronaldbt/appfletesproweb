# Docs

Carpeta para documentación y archivos de referencia (keywords, informes SEO, etc.).

## Palabras clave (CSV)

Coloca aquí tu archivo de keywords:

- **Archivo:** `fletes-santiago-keywords.csv`
- **Origen:** descarga o exportación de herramientas de keywords (Google Keyword Planner, etc.)

### Cómo traer el archivo a esta carpeta

1. **Desde Cursor (recomendado):** Arrastra el archivo `fletes-santiago-keywords.csv` desde tu PC (p. ej. `C:\Users\vlad\Downloads\`) y suéltalo sobre la carpeta `docs` en el explorador de archivos del panel izquierdo. Cursor lo copiará al proyecto.

2. **Copiar y pegar contenido:** Abre el CSV en Excel o un editor de texto, copia todo el contenido, crea o edita `docs/fletes-santiago-keywords.csv` en el proyecto y pega ahí.

3. **Si trabajas en el servidor por SSH:** Sube el archivo con `scp`:
   ```bash
   scp "C:\Users\vlad\Downloads\fletes-santiago-keywords.csv" usuario@servidor:/var/www/html/fletesproweb/frontend-nuxt/docs/
   ```

Si el archivo está en otra ruta de Windows, usa esa ruta en lugar de `Downloads`.
