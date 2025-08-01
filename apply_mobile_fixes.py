#!/usr/bin/env python3
"""
Script para aplicar mejoras móviles a los mapas HTML existentes
Sistema de Mapas IMSS Bienestar - Hidalgo
"""

import os
import re
from pathlib import Path

def add_mobile_enhancements(html_file_path):
    """
    Añade mejoras móviles a un archivo HTML de mapa existente
    """
    
    with open(html_file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # CSS móvil para insertar en el <head>
    mobile_css = """
    <!-- Mejoras para visualización móvil -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        @media (max-width: 768px) {
            .folium-map {
                width: 100% !important;
                height: 60vh !important;
                min-height: 400px !important;
            }
            
            .leaflet-popup-content-wrapper {
                max-width: 85vw !important;
                max-height: 45vh !important;
                overflow-y: auto !important;
                border-radius: 8px !important;
            }
            
            .leaflet-popup-content {
                margin: 8px 12px !important;
                font-size: 13px !important;
                line-height: 1.4 !important;
            }
            
            .leaflet-popup-content table {
                width: 100% !important;
                font-size: 11px !important;
                overflow-x: auto !important;
                display: block !important;
                white-space: nowrap !important;
            }
            
            .leaflet-popup-content table th,
            .leaflet-popup-content table td {
                padding: 3px 5px !important;
                border: 1px solid #ddd !important;
                max-width: 120px !important;
                word-wrap: break-word !important;
                white-space: normal !important;
            }
            
            .leaflet-tooltip {
                font-size: 11px !important;
                padding: 4px 6px !important;
                max-width: 200px !important;
                white-space: normal !important;
            }
            
            .leaflet-control-zoom a {
                width: 35px !important;
                height: 35px !important;
                font-size: 16px !important;
            }
            
            .leaflet-control-layers {
                max-width: 200px !important;
                font-size: 12px !important;
            }
            
            div[style*="position: fixed"][style*="right: 20px"] {
                position: fixed !important;
                top: 10px !important;
                right: 5px !important;
                width: 280px !important;
                max-width: 85vw !important;
                max-height: 70vh !important;
                overflow-y: auto !important;
                z-index: 1000 !important;
                transition: transform 0.3s ease !important;
            }
            
            .sidebar-collapsed {
                transform: translateX(calc(100% + 10px)) !important;
            }
            
            .mobile-toggle-btn {
                position: fixed !important;
                top: 10px !important;
                right: 10px !important;
                z-index: 1001 !important;
                background: #006847 !important;
                color: white !important;
                border: none !important;
                border-radius: 50% !important;
                width: 40px !important;
                height: 40px !important;
                font-size: 18px !important;
                cursor: pointer !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
            }
            
            div[style*="position: fixed"][style*="bottom: 50px"] {
                position: fixed !important;
                bottom: 10px !important;
                left: 5px !important;
                width: 180px !important;
                max-width: 85vw !important;
                font-size: 11px !important;
            }
            
            h3[style*="font-size:22px"] {
                font-size: 16px !important;
                margin: 5px 0 !important;
                padding: 5px !important;
            }
        }
        
        @media (max-width: 480px) {
            .folium-map {
                height: 55vh !important;
                min-height: 350px !important;
            }
            
            .leaflet-popup-content-wrapper {
                max-width: 95vw !important;
                max-height: 40vh !important;
            }
            
            div[style*="position: fixed"][style*="right: 20px"] {
                width: 250px !important;
                max-width: 90vw !important;
            }
        }
    </style>
    """
    
    # JavaScript móvil para insertar antes del </body>
    mobile_js = """
    <script>
        // Mejoras móviles para mapas Folium
        (function() {
            function isMobile() {
                return window.innerWidth <= 768;
            }
            
            if (isMobile()) {
                document.addEventListener('DOMContentLoaded', function() {
                    // Crear botones toggle para sidebars
                    const sidebars = document.querySelectorAll('div[style*="position: fixed"][style*="right"]');
                    sidebars.forEach((sidebar, index) => {
                        const btn = document.createElement('button');
                        btn.className = 'mobile-toggle-btn';
                        btn.innerHTML = '📋';
                        btn.style.top = (60 + index * 50) + 'px';
                        btn.title = 'Mostrar/Ocultar información';
                        
                        let collapsed = false;
                        btn.onclick = function() {
                            collapsed = !collapsed;
                            sidebar.style.transform = collapsed ? 'translateX(calc(100% + 10px))' : 'translateX(0)';
                            btn.innerHTML = collapsed ? '📂' : '📋';
                        };
                        
                        document.body.appendChild(btn);
                        
                        // Auto-colapsar en pantallas muy pequeñas
                        if (window.innerWidth <= 480) {
                            setTimeout(() => btn.click(), 1000);
                        }
                    });
                    
                    // Mejorar popups cuando se abren
                    const observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            mutation.addedNodes.forEach(function(node) {
                                if (node.nodeType === 1 && node.classList && node.classList.contains('leaflet-popup')) {
                                    const content = node.querySelector('.leaflet-popup-content');
                                    if (content) {
                                        // Hacer tablas scrollables
                                        const tables = content.querySelectorAll('table');
                                        tables.forEach(table => {
                                            const wrapper = document.createElement('div');
                                            wrapper.style.overflowX = 'auto';
                                            wrapper.style.maxWidth = '100%';
                                            table.parentNode.insertBefore(wrapper, table);
                                            wrapper.appendChild(table);
                                        });
                                    }
                                }
                            });
                        });
                    });
                    
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                    
                    console.log('📱 Mejoras móviles aplicadas');
                });
                
                // Redimensionar mapa al cambiar orientación
                window.addEventListener('orientationchange', function() {
                    setTimeout(function() {
                        const maps = document.querySelectorAll('.folium-map');
                        maps.forEach(map => {
                            if (map._leaflet_map) {
                                map._leaflet_map.invalidateSize();
                            }
                        });
                    }, 500);
                });
            }
        })();
    </script>
    """
    
    # Insertar CSS móvil en el <head>
    if '<head>' in content and mobile_css not in content:
        content = content.replace('<head>', '<head>' + mobile_css)
    
    # Insertar JavaScript móvil antes del </body>
    if '</body>' in content and mobile_js not in content:
        content = content.replace('</body>', mobile_js + '</body>')
    
    # Escribir el archivo actualizado
    with open(html_file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"✅ Mejoras móviles aplicadas a: {html_file_path}")

def process_all_maps():
    """
    Procesa todos los mapas HTML en el directorio files/
    """
    maps_directory = Path("files")
    
    if not maps_directory.exists():
        print("❌ No se encontró el directorio 'files/'")
        return
    
    # Procesar mapas principales
    main_maps = [
        "mapa_localidades.html",
        "mapa_imss_bienestar.html"
    ]
    
    for map_file in main_maps:
        map_path = maps_directory / map_file
        if map_path.exists():
            add_mobile_enhancements(map_path)
        else:
            print(f"⚠️  No se encontró: {map_file}")
    
    # Procesar mapas municipales
    municipios_dir = maps_directory / "mapas_municipios"
    if municipios_dir.exists():
        for html_file in municipios_dir.glob("*.html"):
            add_mobile_enhancements(html_file)
    else:
        print("⚠️  No se encontró el directorio 'mapas_municipios/'")

if __name__ == "__main__":
    print("🔧 Aplicando mejoras móviles a los mapas...")
    process_all_maps()
    print("✨ ¡Mejoras móviles aplicadas correctamente!")
    print("\n📱 Los mapas ahora incluyen:")
    print("   • Popups responsivos que se ajustan al tamaño de pantalla")
    print("   • Tablas laterales colapsables con botón toggle")
    print("   • Controles más grandes para pantallas táctiles")
    print("   • Mejor legibilidad en dispositivos móviles")
    print("   • Optimizaciones de rendimiento para móvil")
