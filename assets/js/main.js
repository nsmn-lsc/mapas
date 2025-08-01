// ===== MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar aplicación
    initializeApp();
});

function initializeApp() {
    // Agregar animaciones suaves
    addSmoothAnimations();
    
    // Inicializar tooltips de Bootstrap
    initializeTooltips();
    
    // Agregar efectos de hover mejorados
    addHoverEffects();
    
    // Verificar disponibilidad de mapas
    checkMapAvailability();
    
    // Agregar contador animado
    animateCounters();
}

// ===== ANIMACIONES SUAVES =====
function addSmoothAnimations() {
    // Observador de intersección para animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    document.querySelectorAll('.map-card, .stat-box, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== TOOLTIPS =====
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ===== EFECTOS DE HOVER =====
function addHoverEffects() {
    // Efecto parallax suave en las tarjetas
    document.querySelectorAll('.map-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de ondas en los botones
    document.querySelectorAll('.btn-imss').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== VERIFICACIÓN DE MAPAS =====
function checkMapAvailability() {
    const mapLinks = document.querySelectorAll('a[href*=".html"]');
    
    mapLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Verificar si el archivo existe (simulación)
        fetch(href, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    // Si el mapa no está disponible, agregar indicador
                    const badge = document.createElement('span');
                    badge.className = 'badge bg-warning ms-2';
                    badge.textContent = 'Generando...';
                    link.appendChild(badge);
                    
                    // Deshabilitar el enlace temporalmente
                    link.style.opacity = '0.7';
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        showNotification('Este mapa se está generando. Inténtalo en unos momentos.', 'warning');
                    });
                }
            })
            .catch(() => {
                // En caso de error, no hacer nada (el enlace funcionará normalmente)
            });
    });
}

// ===== CONTADOR ANIMADO =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                
                animateCounter(target, finalValue);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const increment = finalValue / 50; // 50 pasos para la animación
    const duration = 1500; // 1.5 segundos
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, stepTime);
}

// ===== NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== UTILIDADES =====
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== MANEJO DE ERRORES DE CARGA =====
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        // Reemplazar imágenes rotas con placeholder
        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8f9fa"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%236c757d">Imagen no disponible</text></svg>';
    }
});

// ===== TEMA OSCURO/CLARO (OPCIONAL) =====
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Aplicar tema guardado
function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// ===== ANALYTICS (OPCIONAL) =====
function trackMapView(mapType, mapName) {
    // Aquí puedes agregar código de analytics si lo necesitas
    console.log(`Mapa visualizado: ${mapType} - ${mapName}`);
}

// Rastrear clics en mapas
document.querySelectorAll('a[href*=".html"]').forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('href');
        const mapType = href.includes('municipios') ? 'Municipal' : 
                      href.includes('imss') ? 'IMSS Bienestar' : 'General';
        const mapName = href.split('/').pop().replace('.html', '');
        
        trackMapView(mapType, mapName);
    });
});

// ===== CSS DINÁMICO PARA ANIMACIONES =====
const dynamicStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        pointer-events: none;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

// Agregar estilos dinámicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Aplicar tema al cargar
document.addEventListener('DOMContentLoaded', applyStoredTheme);
