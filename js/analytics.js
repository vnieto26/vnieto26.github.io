// Google Analytics y métricas del sitio
(function () {
    'use strict';

    // Configuración de Google Analytics (reemplaza con tu ID)
    const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID real

    // Función para cargar Google Analytics
    function loadGoogleAnalytics() {
        if (typeof gtag === 'undefined') {
            // Cargar script de Google Analytics
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
            document.head.appendChild(script);

            // Configurar gtag
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', GA_TRACKING_ID);
        }
    }

    // Función para rastrear eventos personalizados
    function trackEvent(action, category, label, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }

        // También enviar a consola para debug
        console.log('Event tracked:', { action, category, label, value });
    }

    // Función para rastrear tiempo en página
    function trackTimeOnPage() {
        const startTime = Date.now();

        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            trackEvent('time_on_page', 'Engagement', 'seconds', timeSpent);
        });
    }

    // Función para rastrear scroll depth
    function trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;

                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !tracked.has(milestone)) {
                        tracked.add(milestone);
                        trackEvent('scroll_depth', 'Engagement', `${milestone}%`, milestone);
                    }
                });
            }
        });
    }

    // Función para rastrear clics en enlaces externos
    function trackExternalLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Enlaces externos
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                trackEvent('click', 'External Link', href);
            }

            // Enlaces de descarga
            if (link.hasAttribute('download') || href.includes('.pdf')) {
                trackEvent('download', 'File', href);
            }

            // Enlaces de redes sociales
            if (href.includes('github.com') || href.includes('twitter.com') || href.includes('linkedin.com')) {
                const platform = href.includes('github.com') ? 'GitHub' :
                    href.includes('twitter.com') ? 'Twitter' : 'LinkedIn';
                trackEvent('social_click', 'Social Media', platform);
            }
        });
    }

    // Función para rastrear errores JavaScript
    function trackErrors() {
        window.addEventListener('error', (e) => {
            trackEvent('javascript_error', 'Error', e.message, 1);
        });

        window.addEventListener('unhandledrejection', (e) => {
            trackEvent('promise_rejection', 'Error', e.reason, 1);
        });
    }

    // Función para rastrear rendimiento de la página
    function trackPerformance() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
                    trackEvent('page_load_time', 'Performance', 'milliseconds', loadTime);
                }
            }, 0);
        });
    }

    // Función para rastrear interacciones con formularios
    function trackFormInteractions() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            // Rastrear inicio de formulario
            contactForm.addEventListener('focusin', (e) => {
                if (e.target.matches('input, textarea')) {
                    trackEvent('form_start', 'Contact Form', 'field_focus');
                }
            }, { once: true });

            // Rastrear envío de formulario
            contactForm.addEventListener('submit', () => {
                trackEvent('form_submit', 'Contact Form', 'submit_attempt');
            });
        }
    }

    // Función para rastrear cambios de tema
    function trackThemeChanges() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                trackEvent('theme_change', 'UI', newTheme);
            });
        }
    }

    // Función para rastrear navegación por secciones
    function trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    trackEvent('section_view', 'Navigation', entry.target.id);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    // Inicializar analytics cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        // Solo cargar analytics en producción
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            loadGoogleAnalytics();
        }

        // Inicializar tracking
        trackTimeOnPage();
        trackScrollDepth();
        trackExternalLinks();
        trackErrors();
        trackPerformance();
        trackFormInteractions();
        trackThemeChanges();
        trackSectionViews();
    });

    // Exponer función de tracking para uso global
    window.trackEvent = trackEvent;
})();