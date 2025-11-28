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
    <section id="inicio" className="scroll-anchor relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Efectos de fondo alegres */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse will-change-opacity"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse animation-delay-1000 will-change-opacity"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-300/20 rounded-full blur-2xl animate-pulse animation-delay-600 will-change-opacity"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div className="text-center lg:text-left space-y-8 scroll-animate">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-pink-100 border-2 border-pink-300 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-pink-600 font-medium">Hecho a mano con amor</span>
            </div>

            {/* Título */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold">
              <span className="gradient-text">Dale vida</span>
              <br />
              <span className="text-purple-900">a tus ideas</span>
            </h1>

            {/* Descripción */}
            <p className="text-xl text-purple-700 max-w-2xl">
              Creamos amigurumis personalizados que convierten tus sueños en realidad. 
              Cada puntada cuenta una historia única.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#galeria" 
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 group gpu-accelerated"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Ver Productos</span>
              </a>
              <a 
                href="#contacto" 
                className="btn-outline text-lg px-8 py-4 flex items-center justify-center space-x-2 group gpu-accelerated"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Pedido Personalizado</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-purple-600">Creaciones</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">273</div>
                <div className="text-sm text-purple-600">Clientes Felices</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-sm text-purple-600">Hecho a Mano</div>
              </div>
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="relative scroll-animate animation-delay-400">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 to-purple-300/40 blur-2xl rounded-full"></div>
              <div className="relative bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {heroImages.map((item, index) => (
                    <div 
                      key={index}
                      className={`aspect-square bg-gradient-to-br ${gradients[index]} rounded-2xl overflow-hidden relative group gpu-accelerated`}
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
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 gpu-accelerated"
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
      <a 
        href="#galeria"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Desplazar a galería"
      >
        <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full mt-2"></div>
        </div>
      </a>
    </section>
  );
}
