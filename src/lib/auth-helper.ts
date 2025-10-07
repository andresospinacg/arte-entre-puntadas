// Utilidad para verificar autenticación en las páginas de Astro

import type { AstroGlobal } from 'astro';

export async function verificarAutenticacion(Astro: AstroGlobal) {
  // Como Supabase maneja la sesión en localStorage del navegador,
  // en SSR no podemos verificar directamente. 
  // La verificación real se hace en el cliente.
  // Aquí solo verificamos si hay cookies de Supabase
  
  const cookies = Astro.request.headers.get('cookie') || '';
  
  // Buscar la cookie de sesión de Supabase
  // Supabase guarda múltiples cookies, buscamos alguna de ellas
  const hasSupabaseCookie = 
    cookies.includes('sb-') || 
    cookies.includes('supabase-auth-token') ||
    cookies.includes('supabase.auth.token');
  
  if (!hasSupabaseCookie) {
    // Si no hay cookies de Supabase, redirigir al login
    return Astro.redirect('/login');
  }
  
  return null; // null significa que probablemente está autenticado
}

// Verificar si el usuario está autenticado (sin redirección)
export async function estaAutenticado(Astro: AstroGlobal): Promise<boolean> {
  const cookies = Astro.request.headers.get('cookie') || '';
  
  return cookies.includes('sb-') || 
         cookies.includes('supabase-auth-token') ||
         cookies.includes('supabase.auth.token');
}
