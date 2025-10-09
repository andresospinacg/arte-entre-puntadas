export default function CaracteristicasCalculadora() {
  const features = [
    {
      title: "Cálculo Preciso de Costos",
      description: "Calcula automáticamente materiales, mano de obra, herramientas y gastos indirectos para obtener el precio justo.",
      gradient: "from-primary-400 to-primary-500",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      )
    },
    {
      title: "Gestión de Inventario",
      description: "Administra tus materiales: hilos, rellenos y accesorios. Control de stock y precios actualizados.",
      gradient: "from-accent-400 to-accent-500",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
      )
    },
    {
      title: "Historial de Proyectos",
      description: "Guarda todos tus proyectos calculados, edítalos cuando quieras y mantén un registro completo.",
      gradient: "from-primary-400 to-accent-400",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      )
    },
    {
      title: "Exportación a PDF",
      description: "Genera cotizaciones profesionales en PDF con tu logo y toda la información del proyecto.",
      gradient: "from-primary-500 to-primary-600",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
      )
    },
    {
      title: "Reportes y Estadísticas",
      description: "Visualiza tus ventas, proyectos más rentables y tendencias de tu negocio.",
      gradient: "from-accent-500 to-accent-600",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      )
    },
    {
      title: "100% Responsive",
      description: "Accede desde tu computadora, tablet o móvil. Tu negocio siempre contigo.",
      gradient: "from-warm-400 to-warm-500",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
      )
    },
  ];

  return (
    <div id="caracteristicas" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="section-title">
          <span className="gradient-text">Características</span> que te encantarán
        </h2>
        <p className="text-xl text-dark-500 mt-4">
          Todo lo que necesitas para gestionar tu negocio de amigurumis
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="card-hover group">
            <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-200`}>
              <svg className="w-6 h-6 text-dark-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {feature.icon}
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
            <p className="text-dark-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
