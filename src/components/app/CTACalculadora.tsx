export default function CTACalculadora() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="scroll-animate bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl text-center p-12 shadow-2xl border border-pink-100">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          <span className="gradient-text">¿Listo para valorar tu trabajo</span> <span className="text-purple-900">?</span>
        </h2>
        <p className="text-xl text-purple-700 mb-8 max-w-2xl mx-auto">
          Deja de adivinar precios y comienza a calcular de forma profesional
        </p>
        <a href="/app/calculadora" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg inline-flex items-center space-x-2">
          <span>Comenzar ahora</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
