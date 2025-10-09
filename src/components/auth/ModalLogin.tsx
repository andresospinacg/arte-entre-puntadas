import { useState } from 'react';
import { X } from 'lucide-react';
import { FaStar, FaChartBar, FaCloud } from 'react-icons/fa';
import { iniciarSesionConGoogle } from '../../lib/supabase';

interface ModalLoginProps {
  onClose: () => void;
}

export default function ModalLogin({ onClose }: ModalLoginProps) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setCargando(true);
      setError('');
      await iniciarSesionConGoogle();
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
      setCargando(false);
    }
  };

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="relative max-w-md w-full animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Efecto de brillo de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 blur-3xl rounded-3xl"></div>
          
          {/* Contenido del modal */}
          <div className="relative bg-dark-800/95 backdrop-blur-xl border-2 border-dark-700 rounded-2xl p-8 shadow-2xl">
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-dark-700 rounded-lg"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo y título */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-400/30 blur-xl rounded-full animate-pulse"></div>
                  <img 
                    src="/logo_arte_entrepuntadas.png" 
                    alt="Arte Entre Puntadas" 
                    className="relative w-24 h-24 rounded-2xl shadow-2xl ring-4 ring-primary-400/50"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">
                <span className="gradient-text">Iniciar Sesión</span>
              </h2>
              <p className="text-gray-400">
                Accede a tu cuenta para continuar
              </p>
            </div>

            {/* Botón de Google */}
            <button
              onClick={handleLogin}
              disabled={cargando}
              className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed"
            >
              {cargando ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Conectando...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continuar con Google</span>
                </>
              )}
            </button>

            {/* Mensaje de error */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start space-x-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Info adicional */}
            <p className="text-gray-500 text-sm text-center mt-6">
              Al iniciar sesión, aceptas nuestros términos y condiciones
            </p>

            {/* Características */}
            <div className="mt-6 pt-6 border-t border-dark-700 grid grid-cols-3 gap-3 text-center">
              <div className="group">
                <div className="mb-1 flex justify-center">
                  <FaStar className="w-6 h-6 text-primary-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-gray-400 text-xs">Proyectos</p>
              </div>
              <div className="group">
                <div className="mb-1 flex justify-center">
                  <FaChartBar className="w-6 h-6 text-accent-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-gray-400 text-xs">Reportes</p>
              </div>
              <div className="group">
                <div className="mb-1 flex justify-center">
                  <FaCloud className="w-6 h-6 text-warm-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-gray-400 text-xs">En la nube</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
