/**
 * Utilidad para manejar el scroll suave y optimizado
 * Previene bugs comunes y mejora la experiencia de usuario
 */

export function initSmoothScroll() {
  // Manejar todos los enlaces con hash
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
      const href = this.getAttribute('href');
      
      if (href && href !== '#') {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Obtener altura del navbar
          const navbarHeight = 80;
          
          // Calcular posición con offset
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          // Scroll suave optimizado
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/**
 * Observador de intersección para animaciones al hacer scroll
 */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          // Dejar de observar una vez animado para mejor rendimiento
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Activar cuando el 15% del elemento es visible
      rootMargin: '0px 0px -100px 0px' // Activar un poco antes de que entre completamente
    }
  );

  // Observar elementos con clase .scroll-animate
  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Prevenir scroll horizontal no deseado
 */
export function preventHorizontalScroll() {
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
}

/**
 * Inicializar todas las funcionalidades de scroll
 */
export function initScrollBehavior() {
  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
      initScrollAnimations();
      preventHorizontalScroll();
    });
  } else {
    initSmoothScroll();
    initScrollAnimations();
    preventHorizontalScroll();
  }
}
