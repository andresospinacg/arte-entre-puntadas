import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChange, type Usuario } from '../../lib/supabase';

// Contexto de autenticación
interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
}

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  cargando: true,
});

// Hook para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Proveedor de autenticación
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = onAuthStateChange((nuevoUsuario: Usuario | null) => {
      setUsuario(nuevoUsuario);
      setCargando(false);
    });

    // Limpiar suscripción al desmontar
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}
