import { Heart, Shield, Truck, Sparkles } from 'lucide-react';

const beneficios = [
  {
    icon: Heart,
    titulo: "Hecho a Mano",
    descripcion: "Cada puntada es tejida con amor y dedicación para crear piezas únicas y especiales.",
    color: "from-accent-400 to-accent-500"
  },
  {
    icon: Sparkles,
    titulo: "Personalizado",
    descripcion: "Adaptamos colores, tamaños y detalles según tus preferencias y necesidades.",
    color: "from-primary-400 to-primary-500"
  },
  {
    icon: Shield,
    titulo: "Calidad Premium",
    descripcion: "Utilizamos materiales de alta calidad, hipoalergénicos y seguros para todas las edades.",
    color: "from-warm-400 to-warm-500"
  },
  {
    icon: Truck,
    titulo: "Envíos a Colombia",
    descripcion: "Hacemos llegar tus amigurumis a cualquier parte del país de forma segura.",
    color: "from-primary-400 to-accent-400"
  }
];

export default function Beneficios() {
  return (
    <section id="beneficios" className="scroll-anchor py-20 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-purple-900">¿Por qué elegir </span>
            <span className="gradient-text">Arte Entre Puntadas</span>
            <span className="text-purple-900">?</span>
          </h2>
          <p className="text-xl text-purple-700 max-w-2xl mx-auto">
            Más que amigurumis, creamos compañeros llenos de amor y personalidad
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio, index) => {
            const Icon = beneficio.icon;
            return (
              <div 
                key={index}
                className="scroll-animate card-hover text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icono */}
                <div className="relative inline-block mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${beneficio.color} opacity-30 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
                  <div className={`relative w-16 h-16 mx-auto bg-gradient-to-br ${beneficio.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-xl font-bold text-purple-900 mb-3 group-hover:text-pink-500 transition-colors">
                  {beneficio.titulo}
                </h3>
                <p className="text-purple-600 leading-relaxed">
                  {beneficio.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
