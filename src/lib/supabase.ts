import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Variables de entorno de Supabase
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Las variables de entorno de Supabase no están configuradas');
}

// Cliente de Supabase para el navegador
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token',
  },
});

// Tipos de usuario
export interface Usuario {
  id: string;
  email: string;
  nombre?: string;
}

// Obtener usuario actual
export async function obtenerUsuarioActual(): Promise<Usuario | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Asegurarse de que el usuario existe en la tabla usuarios
  await asegurarUsuarioEnTabla(user);
  
  return {
    id: user.id,
    email: user.email || '',
    nombre: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
  };
}

// Función auxiliar para asegurar que el usuario existe en la tabla usuarios
async function asegurarUsuarioEnTabla(user: any) {
  try {
    // Verificar si el usuario ya existe
    const { data: usuarioExistente, error: errorBusqueda } = await supabase
      .from('usuarios')
      .select('id')
      .eq('id', user.id)
      .single();

    // Si ya existe, no hacer nada
    if (usuarioExistente) {
      return;
    }

    // Si no existe, crearlo
    const { error: errorInsercion } = await supabase
      .from('usuarios')
      .insert([{
        id: user.id,
        email: user.email,
        nombre: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
      }]);

    if (errorInsercion) {
      // Ignorar error de duplicado (puede ocurrir en concurrencia)
      if (errorInsercion.code !== '23505') {
        console.error('Error al crear usuario en tabla:', errorInsercion);
      }
    } else {
      console.log('✅ Usuario creado en tabla usuarios:', user.email);
    }
  } catch (error) {
    console.error('Error al asegurar usuario en tabla:', error);
  }
}

// Iniciar sesión con Google
export async function iniciarSesionConGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  }

  return data;
}

// Cerrar sesión
export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }

  // Redirigir al login
  window.location.href = '/login';
}

// Escuchar cambios en el estado de autenticación
export function onAuthStateChange(callback: (usuario: Usuario | null) => void) {
  return supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const usuario: Usuario = {
        id: session.user.id,
        email: session.user.email || '',
        nombre: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email,
      };
      callback(usuario);
    } else {
      callback(null);
    }
  });
}
