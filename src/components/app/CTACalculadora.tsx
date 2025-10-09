export default function CTACalculadora() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="card bg-gradient-to-br from-primary-400/10 to-accent-400/10 border-primary-400/30 text-center p-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          <span className="gradient-text">¿Listo para valorar tu trabajo</span> <span className="text-white">?</span>
        </h2>
        <p className="text-xl text-dark-500 mb-8 max-w-2xl mx-auto">
          Deja de adivinar precios y comienza a calcular de forma profesional
        </p>
        <a href="/app/calculadora" className="btn-primary text-lg inline-flex items-center space-x-2">
          <span>Comenzar ahora</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
