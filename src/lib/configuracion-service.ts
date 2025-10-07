import { supabase, obtenerUsuarioActual } from './supabase';

// ==========================================
// TIPOS
// ==========================================

export interface ConfiguracionUsuario {
  id: string;
  user_id: string;
  logo_cotizacion_url: string | null;
  created_at: string;
  updated_at: string;
}

// ==========================================
// FUNCIONES DE CONFIGURACIÓN
// ==========================================

/**
 * Obtener la configuración del usuario actual
 */
export async function obtenerConfiguracion(): Promise<ConfiguracionUsuario | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      console.error('No hay usuario autenticado');
      return null;
    }

    const { data, error } = await supabase
      .from('configuracion_usuario')
      .select('*')
      .eq('user_id', usuario.id)
      .single();

    if (error) {
      // Si no existe configuración, retornar null (no es un error)
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    return null;
  }
}

/**
 * Crear o actualizar la configuración del usuario
 */
export async function guardarConfiguracion(
  logoUrl: string | null
): Promise<ConfiguracionUsuario | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }

    // Verificar si ya existe configuración
    const configuracionExistente = await obtenerConfiguracion();

    if (configuracionExistente) {
      // Actualizar configuración existente
      const { data, error } = await supabase
        .from('configuracion_usuario')
        .update({
          logo_cotizacion_url: logoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', usuario.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Crear nueva configuración
      const { data, error } = await supabase
        .from('configuracion_usuario')
        .insert({
          user_id: usuario.id,
          logo_cotizacion_url: logoUrl,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error al guardar configuración:', error);
    throw error;
  }
}

/**
 * Subir logo de cotización a Supabase Storage
 */
export async function subirLogoCotizacion(file: File): Promise<string | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('No hay usuario autenticado');
    }

    // Validar tipo de archivo
    const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!tiposPermitidos.includes(file.type)) {
      throw new Error('Formato de imagen no válido. Usa PNG, JPG o WebP');
    }

    // Validar tamaño (máximo 2MB)
    const tamañoMaximo = 2 * 1024 * 1024; // 2MB
    if (file.size > tamañoMaximo) {
      throw new Error('La imagen es demasiado grande. Máximo 2MB');
    }

    // Generar nombre único para el archivo
    const extension = file.name.split('.').pop();
    const nombreArchivo = `${usuario.id}/logo-cotizacion-${Date.now()}.${extension}`;

    // Subir archivo a Supabase Storage
    const { data, error } = await supabase.storage
      .from('logos-cotizacion')
      .upload(nombreArchivo, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Obtener URL pública del archivo
    const { data: urlData } = supabase.storage
      .from('logos-cotizacion')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error al subir logo:', error);
    throw error;
  }
}

/**
 * Eliminar logo de cotización del usuario
 */
export async function eliminarLogoCotizacion(): Promise<boolean> {
  try {
    const configuracion = await obtenerConfiguracion();
    if (!configuracion || !configuracion.logo_cotizacion_url) {
      return true; // No hay logo para eliminar
    }

    // Extraer el path del archivo de la URL
    const url = new URL(configuracion.logo_cotizacion_url);
    const path = url.pathname.split('/').slice(-2).join('/'); // user_id/nombre-archivo

    // Eliminar archivo de Storage
    const { error: storageError } = await supabase.storage
      .from('logos-cotizacion')
      .remove([path]);

    if (storageError) {
      console.error('Error al eliminar archivo de storage:', storageError);
    }

    // Actualizar configuración para quitar la URL
    await guardarConfiguracion(null);

    return true;
  } catch (error) {
    console.error('Error al eliminar logo:', error);
    return false;
  }
}

/**
 * Obtener URL del logo de cotización del usuario actual
 * Retorna la URL personalizada o la URL del logo por defecto
 */
export async function obtenerLogoCotizacion(): Promise<string> {
  try {
    const configuracion = await obtenerConfiguracion();
    
    // Si el usuario tiene logo personalizado, usarlo
    if (configuracion?.logo_cotizacion_url) {
      return configuracion.logo_cotizacion_url;
    }
    
    // Si no, usar el logo por defecto
    return '/logo_arte_entrepuntadas.png';
  } catch (error) {
    console.error('Error al obtener logo de cotización:', error);
    return '/logo_arte_entrepuntadas.png';
  }
}
