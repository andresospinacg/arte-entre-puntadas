import { MapPin } from 'lucide-react';
import { FaWhatsapp, FaPalette, FaComments, FaBox, FaInstagram } from 'react-icons/fa';

export default function ContactoCTA() {
  return (
    <section id="contacto" className="scroll-anchor py-20 bg-gradient-to-b from-pink-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Efectos de fondo alegres */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-purple-200/20 to-cyan-200/20 blur-3xl"></div>

          <div className="relative card-hover border-2 border-pink-300 scroll-animate">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contenido */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  <span className="gradient-text">¿Listo para tu</span>
                  <br />
                  <span className="text-purple-900">Amigurumi Personalizado?</span>
                </h2>

                <p className="text-xl text-purple-700">
                  Cuéntanos tu idea y la convertiremos en realidad. Ya sea un regalo especial, 
                  decoración o un proyecto único, estamos aquí para ayudarte.
                </p>

                {/* Info de contacto */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-purple-600">
                    <MapPin className="w-5 h-5 text-pink-500" />
                    <span>Ibagué, Colombia</span>
                  </div>
                  <div className="flex items-center space-x-3 text-purple-600">
                    <FaInstagram className="w-5 h-5 text-purple-500" />
                    <a 
                      href="https://instagram.com/arte_entrepuntadas" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-pink-500 transition-colors"
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
                    <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="https://instagram.com/arte_entrepuntadas" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center justify-center space-x-2 group"
                  >
                    <FaInstagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

              {/* Ilustración o imagen */}
              <div className="relative scroll-animate animation-delay-400">
                <div className="relative z-10 bg-white/90 backdrop-blur-sm border-2 border-pink-200 rounded-2xl p-8 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                        <FaPalette className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-purple-900">Diseño Personalizado</div>
                        <div className="text-sm text-purple-600">Trae tu idea a la vida</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                        <FaComments className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-purple-900">Cotización Inmediata</div>
                        <div className="text-sm text-purple-600">Respuesta en menos de 24h</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-cyan-50 to-pink-50 rounded-xl border border-cyan-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                        <FaBox className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-purple-900">Envío Seguro</div>
                        <div className="text-sm text-purple-600">A toda Colombia</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-300/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-300/30 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
