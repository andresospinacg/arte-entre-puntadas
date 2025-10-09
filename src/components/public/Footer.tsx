import { Instagram, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  const anoActual = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center">
                <img 
                  src="/logo_navbar.png" 
                  alt="Arte Entre Puntadas" 
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <span className="text-xl font-display font-bold gradient-text">
                Arte Entre Puntadas
              </span>
            </div>
            <p className="text-dark-500 max-w-md">
              Creamos amigurumis únicos y personalizados con amor desde Ibagué, Colombia. 
              Cada puntada cuenta una historia especial.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://instagram.com/arte_entrepuntadas" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 hover:bg-gradient-to-br hover:from-accent-400 hover:to-accent-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-dark-500 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://wa.me/573133097012" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-800 hover:bg-gradient-to-br hover:from-primary-400 hover:to-primary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <MessageCircle className="w-5 h-5 text-dark-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explorar</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-dark-500 hover:text-primary-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/galeria" className="text-dark-500 hover:text-primary-400 transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="/#contacto" className="text-dark-500 hover:text-primary-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Para artesanos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Para Artesanos</h3>
            <ul className="space-y-3">
              <li>
                <a href="/app" className="text-dark-500 hover:text-primary-400 transition-colors">
                  Calculadora
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-dark-500 text-sm">
            © {anoActual} Arte Entre Puntadas. Todos los derechos reservados.
          </p>
          <p className="text-dark-500 text-sm flex items-center space-x-1">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-accent-400 fill-accent-400 animate-pulse" />
            <span>en Ibagué, Colombia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
