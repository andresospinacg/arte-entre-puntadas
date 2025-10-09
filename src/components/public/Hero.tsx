import { Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

// Imágenes destacadas para el hero (4 productos principales)
const heroImages = [
  { emoji: '🧸', image: '/productos/hero-1.jpg', alt: 'Osito Oliva' },
  { emoji: '🎩', image: '/productos/hero-2.jpg', alt: 'Luffy One Piece' },
  { emoji: '🌹', image: '/productos/hero-3.jpg', alt: 'Miniuns' },
  { emoji: '🎨', image: '/productos/hero-4.jpg', alt: 'Van Gogh' },
];

export default function Hero() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const gradients = [
    'from-primary-400/20 to-transparent',
    'from-accent-400/20 to-transparent',
    'from-warm-400/20 to-transparent',
    'from-primary-400/20 to-transparent'
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-400/10 border border-primary-400/30 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-400 font-medium">Hecho a mano con amor</span>
            </div>

            {/* Título */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold">
              <span className="gradient-text">Dale vida</span>
              <br />
              <span className="text-white">a tus ideas</span>
            </h1>

            {/* Descripción */}
            <p className="text-xl text-dark-500 max-w-2xl">
              Creamos amigurumis personalizados que convierten tus sueños en realidad. 
              Cada puntada cuenta una historia única.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#galeria" 
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Ver Productos</span>
              </a>
              <a 
                href="#contacto" 
                className="btn-outline text-lg px-8 py-4 flex items-center justify-center space-x-2 group"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Pedido Personalizado</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-dark-500">Creaciones</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">273</div>
                <div className="text-sm text-dark-500">Clientes Felices</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-dark-500">Hecho a Mano</div>
              </div>
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="relative">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-accent-400/30 blur-2xl rounded-full"></div>
              <div className="relative bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {heroImages.map((item, index) => (
                    <div 
                      key={index}
                      className={`aspect-square bg-gradient-to-br ${gradients[index]} rounded-2xl overflow-hidden relative group`}
                    >
                      {imageErrors[index] ? (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                          {item.emoji}
                        </div>
                      ) : (
                        <>
                          <img 
                            src={item.image}
                            alt={item.alt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={() => handleImageError(index)}
                          />
                          {/* Overlay con emoji que aparece al hacer hover si la imagen cargó */}
                          <div className="absolute inset-0 bg-dark-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-6xl">{item.emoji}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
