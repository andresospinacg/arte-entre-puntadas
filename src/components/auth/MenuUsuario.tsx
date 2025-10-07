import { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import { obtenerUsuarioActual, cerrarSesion, type Usuario } from '../../lib/supabase';

// Cache del usuario para evitar saltos
let usuarioCache: Usuario | null = null;

interface MenuUsuarioProps {
  onLoginClick?: () => void;
}

export default function MenuUsuario({ onLoginClick }: MenuUsuarioProps) {
  // Inicializar con el cache si existe
  const [usuario, setUsuario] = useState<Usuario | null>(usuarioCache);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cargando, setCargando] = useState(!usuarioCache);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    try {
      const usuarioActual = await obtenerUsuarioActual();
      setUsuario(usuarioActual);
      usuarioCache = usuarioActual; // Guardar en cache
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      usuarioCache = null;
    } finally {
      setCargando(false);
    }
  };

  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion();
      usuarioCache = null; // Limpiar cache
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Por favor, intenta nuevamente.');
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      window.location.href = '/login';
    }
  };

  // Mostrar skeleton solo si NO hay cache
  if (cargando && !usuarioCache) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2">
        <div className="w-8 h-8 rounded-full bg-dark-700 animate-pulse"></div>
        <div className="w-24 h-4 bg-dark-700 rounded animate-pulse hidden md:block"></div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <button
        onClick={handleLoginClick}
        className="btn-secondary text-sm"
      >
        Iniciar Sesión
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="flex items-center space-x-2 hover:bg-dark-700 rounded-lg px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center">
          <User className="w-5 h-5 text-dark-950" />
        </div>
        <span className="text-sm text-white font-medium hidden md:block">
          {usuario.nombre || usuario.email}
        </span>
      </button>

      {/* Menú desplegable */}
      {menuAbierto && (
        <>
          {/* Overlay para cerrar el menú */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setMenuAbierto(false)}
          ></div>

          {/* Menú */}
          <div className="absolute right-0 mt-2 w-64 bg-dark-800 rounded-lg shadow-xl border border-dark-700 z-20 overflow-hidden">
            {/* Info del usuario */}
            <div className="p-4 border-b border-dark-700">
              <p className="text-white font-medium truncate">{usuario.nombre || 'Usuario'}</p>
              <p className="text-gray-400 text-sm truncate">{usuario.email}</p>
            </div>

            {/* Opciones */}
            <div className="p-2">
              <button
                onClick={handleCerrarSesion}
                className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
