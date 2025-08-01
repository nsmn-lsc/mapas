# 🚀 Instrucciones de Deployment en Render

## 📋 Pasos para subir tu sitio estático a Render

### 1. Preparar el repositorio Git

```bash
# En tu terminal, navega al directorio del proyecto
cd /home/najera/Documentos/Projects/Mapas

# Inicializar repositorio Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Sitio estático IMSS Bienestar - versión inicial"

# Agregar remote de tu repositorio en GitHub
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# Subir a GitHub
git push -u origin main
```

### 2. Configurar en Render

1. **Ir a Render Dashboard**: https://dashboard.render.com
2. **New** → **Static Site**
3. **Connect a repository** → Seleccionar tu repositorio de GitHub
4. **Configurar deployment**:

   - **Name**: `mapas-imss-bienestar`
   - **Root Directory**: (dejar vacío)
   - **Build Command**: `echo "Sitio estático listo"`
   - **Publish Directory**: (dejar vacío o poner `./`)

5. **Deploy**

### 3. Configuración Avanzada (Opcional)

Si quieres personalizar más, puedes usar estas configuraciones:

#### Headers personalizados:
```yaml
headers:
  - path: /*
    headers:
      - name: Cache-Control
        value: public, max-age=3600
  - path: /files/*
    headers:
      - name: Cache-Control
        value: public, max-age=86400
```

#### Redirects:
```yaml
redirects:
  - source: /mapa-general
    destination: /files/mapa_localidades.html
    type: rewrite
  - source: /imss
    destination: /files/mapa_imss_bienestar.html
    type: rewrite
```

### 4. Variables de entorno (si las necesitas)

```
NODE_ENV=production
```

### 5. Dominio personalizado

Si tienes un dominio personalizado:
1. **Settings** → **Custom Domains**
2. **Add Custom Domain**
3. Configurar DNS records según las instrucciones

## 📊 Costos estimados

### Render Static Sites:
- **Plan Free**: $0/mes
  - ✅ 100GB bandwidth
  - ✅ Hosting ilimitado
  - ✅ SSL automático
  - ✅ CDN global

- **Plan Pro**: $7/mes
  - ✅ Todo lo del Free
  - ✅ Bandwidth ilimitado
  - ✅ Priority support

### Tu proyecto:
- **Tamaño actual**: ~50MB (mapas HTML + assets)
- **Bandwidth estimado**: Bajo-medio
- **Recomendación**: **Plan Free es suficiente**

## 🔧 Estructura de URLs resultante

```
https://tu-sitio.onrender.com/                    # Página principal
https://tu-sitio.onrender.com/files/mapa_localidades.html
https://tu-sitio.onrender.com/files/mapa_imss_bienestar.html
https://tu-sitio.onrender.com/files/mapas_municipios/indice.html
https://tu-sitio.onrender.com/files/mapas_municipios/mapa_tula_de_allende.html
```

## 🔄 Actualizaciones futuras

Para actualizar el sitio:

1. **Modificar archivos localmente**
2. **Regenerar mapas** (si es necesario): `jupyter nbconvert --execute mapas_jurisdicciones.ipynb`
3. **Commit y push**:
   ```bash
   git add .
   git commit -m "Actualización: [descripción]"
   git push
   ```
4. **Render hace deploy automático** 🎉

## 🚨 Checklist final

Antes de hacer el deployment, verifica:

- [ ] ✅ Todos los archivos están en el repositorio
- [ ] ✅ Los mapas HTML se abren correctamente
- [ ] ✅ La página principal se ve bien
- [ ] ✅ Los enlaces funcionan
- [ ] ✅ El archivo `render.yaml` está configurado
- [ ] ✅ El repositorio está público (o tienes plan Pro)

## 🎯 URLs importantes

Una vez deployado, comparte estas URLs:

- **Principal**: `https://tu-sitio.onrender.com`
- **Mapa General**: `https://tu-sitio.onrender.com/files/mapa_localidades.html`
- **IMSS Bienestar**: `https://tu-sitio.onrender.com/files/mapa_imss_bienestar.html`
- **Por Municipio**: `https://tu-sitio.onrender.com/files/mapas_municipios/indice.html`

## 🆘 Troubleshooting

### Error: "Build failed"
- Verificar que `render.yaml` existe
- Verificar que el repositorio es accesible

### Error: "404 en archivos"
- Verificar que los archivos HTML están en `/files/`
- Verificar paths relativos en el HTML

### Error: "CSS no carga"
- Verificar paths en `index.html`
- Verificar que `/assets/` existe

## 📞 Soporte

Si tienes problemas:
1. **Render Docs**: https://render.com/docs/static-sites
2. **Render Support**: support@render.com (con plan Pro)
3. **GitHub Issues**: En tu repositorio

---

¡Listo para launch! 🚀
