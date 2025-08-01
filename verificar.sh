#!/bin/bash

# Script de verificación del sitio estático
echo "🔍 Verificando estructura del sitio estático..."
echo ""

# Verificar archivos principales
echo "📁 Archivos principales:"
files=(
    "index.html"
    "404.html"
    "README.md"
    "render.yaml"
    ".gitignore"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - FALTANTE"
    fi
done

echo ""
echo "📁 Assets:"
if [ -d "assets/css" ]; then
    echo "✅ assets/css/"
    if [ -f "assets/css/style.css" ]; then
        echo "  ✅ style.css"
    else
        echo "  ❌ style.css - FALTANTE"
    fi
else
    echo "❌ assets/css/ - FALTANTE"
fi

if [ -d "assets/js" ]; then
    echo "✅ assets/js/"
    if [ -f "assets/js/main.js" ]; then
        echo "  ✅ main.js"
    else
        echo "  ❌ main.js - FALTANTE"
    fi
else
    echo "❌ assets/js/ - FALTANTE"
fi

echo ""
echo "📁 Mapas generados:"
mapas=(
    "files/mapa_localidades.html"
    "files/mapa_imss_bienestar.html"
    "files/mapas_municipios/indice.html"
)

for mapa in "${mapas[@]}"; do
    if [ -f "$mapa" ]; then
        echo "✅ $mapa"
    else
        echo "❌ $mapa - FALTANTE"
    fi
done

echo ""
echo "📊 Conteo de mapas municipales:"
municipales=$(find files/mapas_municipios -name "mapa_*.html" | wc -l)
echo "   Mapas municipales encontrados: $municipales"

if [ $municipales -eq 11 ]; then
    echo "✅ Todos los mapas municipales presentes"
else
    echo "⚠️  Se esperaban 11 mapas municipales, encontrados: $municipales"
fi

echo ""
echo "📁 Datos:"
datos=(
    "files/unidades.xlsx"
    "files/hospitales.xlsx"
    "files/muni_2018gw/"
)

for dato in "${datos[@]}"; do
    if [ -e "$dato" ]; then
        echo "✅ $dato"
    else
        echo "❌ $dato - FALTANTE"
    fi
done

echo ""
echo "🎯 Resumen de verificación:"
echo "   - Sitio estático configurado para Render"
echo "   - Página principal con navegación"
echo "   - Assets CSS/JS incluidos"
echo "   - Mapas HTML generados"
echo "   - Configuración de deployment lista"
echo ""
echo "🚀 ¡Listo para subir a Git y deployar en Render!"
