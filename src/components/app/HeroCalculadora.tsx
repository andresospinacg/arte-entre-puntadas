export default function HeroCalculadora() {
  return (
    <div className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 via-transparent to-accent-400/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl animate-float animation-delay-400"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in-up">
          <span className="gradient-text">Calcula el precio justo</span><br />
          <span className="text-white">de tus amigurumis</span>
        </h1>
        <p className="text-xl md:text-2xl text-dark-500 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Herramienta profesional para calcular costos de materiales, mano de obra y márgenes de ganancia de forma precisa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <a href="/app/calculadora" className="btn-primary text-lg">
            Comenzar ahora
            <span className="ml-2">→</span>
          </a>
          <a href="#caracteristicas" className="btn-outline text-lg">
            Ver características
          </a>
        </div>
      </div>
    </div>
  );
}
