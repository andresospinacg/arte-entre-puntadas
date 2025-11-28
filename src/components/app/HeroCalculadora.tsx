import { Calculator, TrendingUp, Package } from 'lucide-react';

export default function HeroCalculadora() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8 scroll-animate">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-pink-100 border border-pink-300 rounded-full px-4 py-2">
            <Calculator className="w-4 h-4 text-pink-600" />
            <span className="text-sm text-pink-600 font-medium">Herramientas para Artesanos</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            <span className="gradient-text">Calcula tus precios</span>
            <br />
            <span className="text-purple-900">con precisión</span>
          </h1>

          {/* Descripción */}
          <p className="text-xl text-purple-700 max-w-2xl mx-auto">
            Herramientas profesionales para gestionar tu negocio de amigurumis artesanales
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="scroll-animate bg-white/80 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{animationDelay: '100ms'}}>
              <Calculator className="w-8 h-8 text-pink-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Calculadora</h3>
              <p className="text-sm text-purple-600">Calcula precios exactos considerando todos los costos</p>
            </div>
            <div className="scroll-animate bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{animationDelay: '200ms'}}>
              <Package className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Inventario</h3>
              <p className="text-sm text-purple-600">Gestiona tus materiales y stock fácilmente</p>
            </div>
            <div className="scroll-animate bg-white/80 backdrop-blur-sm border-2 border-cyan-200 hover:border-cyan-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{animationDelay: '300ms'}}>
              <TrendingUp className="w-8 h-8 text-cyan-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Reportes</h3>
              <p className="text-sm text-purple-600">Analiza tu negocio con estadísticas detalladas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
