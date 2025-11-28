import { Heart } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const anoActual = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-purple-100 to-pink-100 border-t-2 border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-lg flex items-center justify-center shadow-lg">
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
            <p className="text-purple-700 max-w-md">
              Creamos amigurumis únicos y personalizados con amor desde Ibagué, Colombia. 
              Cada puntada cuenta una historia especial.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://instagram.com/arte_entrepuntadas" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:to-purple-500 rounded-lg flex items-center justify-center transition-all duration-300 group shadow-md border-2 border-purple-200"
              >
                <FaInstagram className="w-5 h-5 text-purple-500 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://wa.me/573133097012" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-gradient-to-br hover:from-pink-400 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 group shadow-md border-2 border-pink-200"
              >
                <FaWhatsapp className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold text-purple-900 mb-4">Explorar</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-purple-600 hover:text-pink-500 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/galeria" className="text-purple-600 hover:text-pink-500 transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="/#contacto" className="text-purple-600 hover:text-pink-500 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Para artesanos */}
          <div>
            <h3 className="font-semibold text-purple-900 mb-4">Para Artesanos</h3>
            <ul className="space-y-3">
              <li>
                <a href="/app" className="text-purple-600 hover:text-pink-500 transition-colors">
                  Calculadora
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t-2 border-pink-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-purple-700 text-sm">
              © {anoActual} Arte Entre Puntadas. Todos los derechos reservados.
            </p>
            <p className="text-purple-600 text-xs">
              Desarrollado por{' '}
              <a 
                href="https://www.andres-ospina.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition-colors font-medium"
              >
                Andrés Ospina
              </a>
            </p>
          </div>
          <p className="text-purple-700 text-sm flex items-center space-x-1">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            <span>en Ibagué, Colombia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
