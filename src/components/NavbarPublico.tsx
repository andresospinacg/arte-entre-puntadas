import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function NavbarPublico() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 glass border-b-2 transition-all duration-300 ${
      isScrolled ? 'shadow-xl bg-white/95 border-pink-200' : 'bg-white/90 border-pink-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Efecto de brillo detrás del logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300/30 to-purple-300/30 blur-lg group-hover:from-pink-400/40 group-hover:to-purple-400/40 transition-all duration-300"></div>
                
                {/* Contenedor del logo */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 p-2.5 border-2 border-pink-200 shadow-md">
                  <img 
                    src="/logo_navbar.png" 
                    alt="Arte Entre Puntadas" 
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
              </div>
              
              <span className="text-xl font-display font-bold gradient-text hidden sm:block hover:scale-105 transition-transform duration-200">
                Arte Entre Puntadas
              </span>
            </a>
          </div>

          {/* Links de navegación */}
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="/#inicio"
              className="text-purple-600 hover:text-pink-500 hover:bg-pink-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Inicio
            </a>
            <a
              href="/#galeria"
              className="text-purple-600 hover:text-pink-500 hover:bg-pink-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Galería
            </a>
            <a
              href="/#contacto"
              className="text-purple-600 hover:text-pink-500 hover:bg-pink-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              Contacto
            </a>
          </div>

          {/* Botones de contacto */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://instagram.com/arte_entrepuntadas" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-lg transition-all duration-300 group border-2 border-purple-200"
            >
              <FaInstagram className="w-4 h-4 text-purple-600 group-hover:text-pink-500 transition-colors" />
              <span className="text-sm text-purple-600 group-hover:text-pink-500 font-medium transition-colors">Instagram</span>
            </a>
            <a 
              href="https://wa.me/573133097012" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 rounded-lg transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
