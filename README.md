# 🏥 Sistema de Mapas IMSS Bienestar - Hidalgo

Sistema de visualización interactiva de unidades de salud y hospitales del estado de Hidalgo, con enfoque especial en los municipios atendidos por el programa IMSS Bienestar.

## 📋 Descripción

Este proyecto presenta mapas interactivos desarrollados con **Folium** que muestran la distribución geográfica de:

- **523 unidades de salud** distribuidas en todo el estado
- **69 unidades IMSS Bienestar** en 11 municipios objetivo
- **18 hospitales** de segundo nivel de atención
- **12 jurisdicciones sanitarias** del estado de Hidalgo

## 🗺️ Tipos de Mapas

### 1. Mapa General
- Visualización completa de todas las jurisdicciones sanitarias
- 523 unidades de salud con diferenciación por niveles
- Clustering inteligente para mejor visualización
- **Archivo**: `files/mapa_localidades.html`

### 2. Mapa IMSS Bienestar
- Focalizado en 11 municipios objetivo
- 69 unidades especializadas en atención primaria
- 2 hospitales en la zona de cobertura
- **Archivo**: `files/mapa_imss_bienestar.html`

### 3. Mapas Municipales
- 11 mapas individuales detallados
- Información específica por municipio
- Paneles laterales con estadísticas
- **Directorio**: `files/mapas_municipios/`

## 🏘️ Municipios IMSS Bienestar

| Municipio | Unidades | Archivo |
|-----------|----------|---------|
| Tula de Allende | 18 | `mapa_tula_de_allende.html` |
| Tezontepec de Aldama | 11 | `mapa_tezontepec_de_aldama.html` |
| Tepeji del Río de Ocampo | 7 | `mapa_tepeji_del_rio_de_ocampo.html` |
| Atitalaquia | 7 | `mapa_atitalaquia.html` |
| Nopala de Villagrán | 5 | `mapa_nopala_de_villagrán.html` |
| Atotonilco de Tula | 4 | `mapa_atotonilco_de_tula.html` |
| Tepetitlán | 4 | `mapa_tepetitlán.html` |
| Tlahuelilpan | 4 | `mapa_tlahuelilpan.html` |
| Chapantongo | 4 | `mapa_chapantongo.html` |
| Tlaxcoapan | 3 | `mapa_tlaxcoapan.html` |
| Tetepango | 2 | `mapa_tetepango.html` |

## 🎨 Características de Diseño

### Iconografía
- **👨‍⚕️ Verde (`user-md`)**: Unidades de Salud (1er Nivel)
- **⚕️ Rojo (`plus-square`)**: Hospitales (2do Nivel)
- **🟢 Círculos**: Áreas de cobertura geográfica

### Colores Institucionales
- **Primario**: `#006847` (Verde IMSS Bienestar)
- **Secundario**: `#4A9B3A` (Verde complementario)
- **Hospitales**: `#B22222` (Rojo institucional)

### Funcionalidades
- ✅ Mapas totalmente interactivos
- ✅ Popups informativos detallados
- ✅ Círculos de cobertura configurables
- ✅ Clustering inteligente
- ✅ Responsive design
- ✅ Navegación intuitiva

## 📁 Estructura del Proyecto

```
mapas-imss-bienestar/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos del sitio
│   └── js/
│       └── main.js           # JavaScript interactivo
├── files/
│   ├── mapa_localidades.html # Mapa general
│   ├── mapa_imss_bienestar.html # Mapa IMSS
│   ├── mapas_municipios/     # Mapas individuales
│   │   ├── indice.html       # Índice de municipios
│   │   └── mapa_*.html       # Mapas por municipio
│   ├── unidades.xlsx         # Datos de unidades
│   ├── hospitales.xlsx       # Datos de hospitales
│   └── muni_2018gw/          # Shapefiles municipales
├── mapas_jurisdicciones.ipynb # Notebook generador
└── README.md                 # Documentación
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5** con semántica moderna
- **CSS3** con variables y animaciones
- **JavaScript ES6+** con funcionalidades avanzadas
- **Bootstrap 5** para responsive design
- **Font Awesome** para iconografía

### Mapas
- **Folium 0.20.0** - Mapas interactivos
- **Leaflet.js** - Engine de mapas
- **MarkerCluster** - Agrupación inteligente

### Datos
- **GeoPandas 1.1.1** - Análisis geoespacial
- **Pandas 2.3.1** - Manipulación de datos
- **Shapely** - Geometrías espaciales

## 💾 Datos Incluidos

### Archivos de Datos
- `unidades.xlsx` - 523 registros de unidades de salud
- `hospitales.xlsx` - 18 registros de hospitales
- `muni_2018gw/` - Shapefiles de límites municipales

### Campos de Datos
```
UNIDADES:
- NOMBRE DE LA UNIDAD
- LATITUD / LONGITUD
- MUNICIPIO
- JURISDICCIÓN
- INSTITUCIÓN

HOSPITALES:
- NOMBRE DE LA UNIDAD
- LATITUD / LONGITUD
- MUNICIPIO
- NIVEL DE ATENCIÓN
```

## 🔧 Instalación y Uso

### Para Desarrollo Local
```bash
# Clonar repositorio
git clone [tu-repositorio]
cd mapas-imss-bienestar

# Servidor local simple
python -m http.server 8000
# o
npx live-server
```

### Para Deployment en Render
1. **Fork** este repositorio
2. **New Static Site** en Render
3. **Connect Repository**
4. **Deploy** automático

## 📊 Estadísticas del Sistema

| Métrica | Valor |
|---------|-------|
| **Unidades Totales** | 523 |
| **Unidades IMSS Bienestar** | 69 |
| **Hospitales** | 18 |
| **Municipios Objetivo** | 11 |
| **Cobertura Geográfica** | Estado de Hidalgo |

## 🎯 Casos de Uso

### Planificación Sanitaria
- Análisis de cobertura geográfica
- Identificación de brechas de atención
- Optimización de recursos

### Gestión Operativa
- Referencia y contrarreferencia
- Coordinación entre niveles
- Rutas de evacuación médica

### Información Pública
- Localización de servicios
- Acceso ciudadano a información
- Transparencia institucional

## 🔄 Actualización de Datos

Para actualizar los mapas con nuevos datos:

1. **Actualizar archivos Excel** (`unidades.xlsx`, `hospitales.xlsx`)
2. **Ejecutar notebook** `mapas_jurisdicciones.ipynb`
3. **Verificar mapas generados** en `/files/`
4. **Redeploy** en Render (automático con git push)

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop (1920x1080+)
- ✅ Tablet (768x1024+)
- ✅ Mobile (375x667+)

## 📄 Licencia

Este proyecto está desarrollado para uso Personal.

## 👥 Contacto

Para soporte técnico o actualizaciones de datos, contactar al equipo de desarrollo.

---

**Generado**: 31 de julio de 2025  
**Versión**: 1.0.0  
**Estado**: Producción
