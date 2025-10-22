import { Calculator, TrendingUp, Package } from 'lucide-react';

export default function HeroCalculadora() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-400/10 border border-primary-400/30 rounded-full px-4 py-2">
            <Calculator className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-medium">Herramientas para Artesanos</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
            <span className="gradient-text">Calcula tus precios</span>
            <br />
            <span className="text-white">con precisión</span>
          </h1>

          {/* Descripción */}
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            Herramientas profesionales para gestionar tu negocio de amigurumis artesanales
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6">
              <Calculator className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Calculadora</h3>
              <p className="text-sm text-dark-400">Calcula precios exactos considerando todos los costos</p>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6">
              <Package className="w-8 h-8 text-accent-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Inventario</h3>
              <p className="text-sm text-dark-400">Gestiona tus materiales y stock fácilmente</p>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6">
              <TrendingUp className="w-8 h-8 text-warm-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Reportes</h3>
              <p className="text-sm text-dark-400">Analiza tu negocio con estadísticas detalladas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
