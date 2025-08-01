/**
 * Script para mejorar la experiencia móvil de los mapas Folium
 * Sistema de Mapas IMSS Bienestar - Hidalgo
 */

(function() {
    'use strict';
    
    // Detectar si es dispositivo móvil
    function isMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Esperar a que se cargue el DOM
    document.addEventListener('DOMContentLoaded', function() {
        if (isMobile()) {
            initMobileFixes();
        }
    });
    
    // Aplicar mejoras específicas para móvil
    function initMobileFixes() {
        
        // 1. Añadir CSS para móvil si no existe
        addMobileCSS();
        
        // 2. Crear botón para colapsar tablas laterales
        createSidebarToggle();
        
        // 3. Ajustar popups existentes
        adjustPopups();
        
        // 4. Mejorar controles del mapa
        improveMapControls();
        
        // 5. Añadir gestos táctiles mejorados
        addTouchGestures();
        
        console.log('📱 Mejoras móviles aplicadas a los mapas');
    }
    
    // Añadir CSS móvil dinámicamente
    function addMobileCSS() {
        const existingLink = document.querySelector('link[href*="mobile-maps.css"]');
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/css/mobile-maps.css';
            document.head.appendChild(link);
        }
    }
    
    // Crear botón para colapsar/expandir sidebar
    function createSidebarToggle() {
        const sidebars = document.querySelectorAll('div[style*="position: fixed"][style*="right: 20px"]');
        
        sidebars.forEach((sidebar, index) => {
            // Crear botón toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-toggle-btn';
            toggleBtn.innerHTML = '📋';
            toggleBtn.title = 'Mostrar/Ocultar información';
            toggleBtn.style.top = `${60 + (index * 50)}px`;
            
            // Variable para controlar estado
            let isCollapsed = false;
            
            // Función toggle
            toggleBtn.addEventListener('click', function() {
                isCollapsed = !isCollapsed;
                if (isCollapsed) {
                    sidebar.classList.add('sidebar-collapsed');
                    toggleBtn.innerHTML = '📂';
                } else {
                    sidebar.classList.remove('sidebar-collapsed');
                    toggleBtn.innerHTML = '📋';
                }
            });
            
            // Añadir al DOM
            document.body.appendChild(toggleBtn);
            
            // Colapsar automáticamente en pantallas muy pequeñas
            if (window.innerWidth <= 480) {
                setTimeout(() => {
                    toggleBtn.click();
                }, 1000);
            }
        });
    }
    
    // Ajustar popups existentes
    function adjustPopups() {
        // Observar cuando se abren popups
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('leaflet-popup')) {
                        optimizePopup(node);
                    }
                });
            });
        });
        
        // Observar cambios en el DOM
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Optimizar popups existentes
        document.querySelectorAll('.leaflet-popup').forEach(optimizePopup);
    }
    
    // Optimizar un popup específico
    function optimizePopup(popup) {
        const content = popup.querySelector('.leaflet-popup-content');
        if (content) {
            
            // Ajustar tablas dentro del popup
            const tables = content.querySelectorAll('table');
            tables.forEach(table => {
                table.style.fontSize = '11px';
                table.style.width = '100%';
                
                // Hacer tabla scrolleable horizontalmente
                const wrapper = document.createElement('div');
                wrapper.style.overflowX = 'auto';
                wrapper.style.maxWidth = '100%';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            });
            
            // Truncar texto largo
            const textNodes = content.querySelectorAll('p, div, span');
            textNodes.forEach(node => {
                if (node.textContent.length > 150) {
                    const originalText = node.textContent;
                    const truncatedText = originalText.substring(0, 120) + '...';
                    node.textContent = truncatedText;
                    
                    // Añadir botón "Ver más"
                    const expandBtn = document.createElement('button');
                    expandBtn.innerHTML = 'Ver más';
                    expandBtn.style.cssText = 'background: #006847; color: white; border: none; padding: 2px 8px; margin-left: 5px; border-radius: 3px; font-size: 10px;';
                    
                    let isExpanded = false;
                    expandBtn.addEventListener('click', function() {
                        if (isExpanded) {
                            node.textContent = truncatedText;
                            expandBtn.innerHTML = 'Ver más';
                            isExpanded = false;
                        } else {
                            node.textContent = originalText;
                            expandBtn.innerHTML = 'Ver menos';
                            isExpanded = true;
                        }
                    });
                    
                    node.appendChild(expandBtn);
                }
            });
        }
    }
    
    // Mejorar controles del mapa
    function improveMapControls() {
        // Hacer controles más grandes para pantallas táctiles
        const controls = document.querySelectorAll('.leaflet-control-zoom a, .leaflet-control-layers-toggle');
        controls.forEach(control => {
            control.style.minWidth = '35px';
            control.style.minHeight = '35px';
            control.style.fontSize = '16px';
        });
        
        // Reposicionar controles en móvil
        const layersControl = document.querySelector('.leaflet-control-layers');
        if (layersControl) {
            layersControl.style.maxWidth = '200px';
            layersControl.style.fontSize = '12px';
        }
    }
    
    // Añadir gestos táctiles mejorados
    function addTouchGestures() {
        let touchStartTime = 0;
        let touchStartPos = { x: 0, y: 0 };
        
        document.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            touchStartPos = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        });
        
        document.addEventListener('touchend', function(e) {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Detectar tap rápido en popup para cerrarlo
            if (touchDuration < 300) {
                const popup = document.querySelector('.leaflet-popup');
                if (popup && !popup.contains(e.target)) {
                    // El usuario hizo tap fuera del popup
                    const closeBtn = popup.querySelector('.leaflet-popup-close-button');
                    if (closeBtn) {
                        closeBtn.click();
                    }
                }
            }
        });
    }
    
    // Función para redimensionar mapa cuando cambia orientación
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Forzar redimensionamiento del mapa
            const maps = document.querySelectorAll('.folium-map');
            maps.forEach(map => {
                if (map._leaflet_map) {
                    map._leaflet_map.invalidateSize();
                }
            });
        }, 500);
    });
    
    // Función para optimizar rendimiento en móvil
    function optimizePerformance() {
        // Reducir clusters en móvil para mejor rendimiento
        if (window.L && window.L.markerClusterGroup) {
            const originalClusterGroup = window.L.markerClusterGroup;
            window.L.markerClusterGroup = function(options) {
                const mobileOptions = {
                    ...options,
                    spiderfyOnMaxZoom: false,
                    showCoverageOnHover: false,
                    zoomToBoundsOnClick: true,
                    maxClusterRadius: isMobile() ? 30 : 80
                };
                return originalClusterGroup(mobileOptions);
            };
        }
    }
    
    // Inicializar optimizaciones de rendimiento
    optimizePerformance();
    
})();
