import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function NavbarPublico() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Efecto de brillo detrás del logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-warm-400/20 blur-lg group-hover:from-primary-500/30 group-hover:to-warm-500/30 transition-all duration-300"></div>
                
                {/* Contenedor del logo */}
                <div className="relative w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 p-2.5 border border-white/10 shadow-md">
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
              href="/#galeria"
              className="text-dark-500 hover:text-white hover:bg-dark-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Galería
            </a>
            <a
              href="/#contacto"
              className="text-dark-500 hover:text-white hover:bg-dark-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
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
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-gradient-to-br hover:from-accent-400 hover:to-accent-500 rounded-lg transition-all duration-300 group"
            >
              <FaInstagram className="w-4 h-4 text-dark-500 group-hover:text-white transition-colors" />
              <span className="text-sm text-dark-500 group-hover:text-white transition-colors">Instagram</span>
            </a>
            <a 
              href="https://wa.me/573133097012" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 rounded-lg transition-all duration-300 text-dark-950 font-semibold"
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
