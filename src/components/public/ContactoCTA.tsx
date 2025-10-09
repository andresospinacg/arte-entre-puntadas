import { MessageCircle, Instagram, Mail, MapPin } from 'lucide-react';

export default function ContactoCTA() {
  return (
    <section id="contacto" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-warm-500/10 blur-3xl"></div>

          <div className="relative card-hover border-2 border-primary-400/30">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  <span className="gradient-text">¿Listo para tu</span>
                  <br />
                  <span className="text-white">Amigurumi Personalizado?</span>
                </h2>

                <p className="text-xl text-dark-500">
                  Cuéntanos tu idea y la convertiremos en realidad. Ya sea un regalo especial, 
                  decoración o un proyecto único, estamos aquí para ayudarte.
                </p>

                {/* Info de contacto */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-dark-500">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span>Ibagué, Colombia 📍</span>
                  </div>
                  <div className="flex items-center space-x-3 text-dark-500">
                    <Instagram className="w-5 h-5 text-accent-400" />
                    <a 
                      href="https://instagram.com/arte_entrepuntadas" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      @arte_entrepuntadas
                    </a>
                  </div>
                </div>

                {/* Botones de contacto */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href="https://wa.me/573133097012?text=Hola!%20Me%20interesan%20sus%20amigurumis" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center space-x-2 group"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="https://instagram.com/arte_entrepuntadas" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center justify-center space-x-2 group"
                  >
                    <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              {/* Ilustración o imagen */}
              <div className="relative">
                <div className="relative z-10 bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-2xl">
                        🎨
                      </div>
                      <div>
                        <div className="font-semibold text-white">Diseño Personalizado</div>
                        <div className="text-sm text-dark-500">Trae tu idea a la vida</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-warm-400 rounded-full flex items-center justify-center text-2xl">
                        💬
                      </div>
                      <div>
                        <div className="font-semibold text-white">Cotización Inmediata</div>
                        <div className="text-sm text-dark-500">Respuesta en menos de 24h</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-warm-400 to-primary-400 rounded-full flex items-center justify-center text-2xl">
                        📦
                      </div>
                      <div>
                        <div className="font-semibold text-white">Envío Seguro</div>
                        <div className="text-sm text-dark-500">A toda Colombia</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-400/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
