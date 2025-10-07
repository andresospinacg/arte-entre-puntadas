import { supabase, obtenerUsuarioActual } from './supabase';

// ==========================================
// TIPOS
// ==========================================

export interface Material {
  id?: string;
  usuario_id?: string;
  nombre: string;
  tipo: 'hilo' | 'relleno' | 'accesorio' | 'herramienta';
  precio: number;
  cantidad: number;
  unidad: string;
  color?: string;
  created_at?: string;
  updated_at?: string;
}

// ==========================================
// FUNCIONES CRUD - MATERIALES
// ==========================================

/**
 * Obtener todos los materiales del usuario actual
 */
export async function obtenerMateriales(): Promise<Material[]> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      console.warn('No hay usuario autenticado');
      return [];
    }

    const { data, error } = await supabase
      .from('materiales')
      .select('*')
      .eq('usuario_id', usuario.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener materiales:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en obtenerMateriales:', error);
    return [];
  }
}

/**
 * Crear un nuevo material
 */
export async function crearMaterial(material: Omit<Material, 'id' | 'usuario_id' | 'created_at' | 'updated_at'>): Promise<Material | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    const nuevoMaterial = {
      ...material,
      usuario_id: usuario.id,
    };

    const { data, error } = await supabase
      .from('materiales')
      .insert([nuevoMaterial])
      .select()
      .single();

    if (error) {
      console.error('Error al crear material:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en crearMaterial:', error);
    return null;
  }
}

/**
 * Actualizar un material existente
 */
export async function actualizarMaterial(id: string, material: Partial<Material>): Promise<Material | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    // Remover campos que no deben actualizarse
    const { id: _, usuario_id, created_at, ...datosActualizar } = material as any;

    const { data, error } = await supabase
      .from('materiales')
      .update(datosActualizar)
      .eq('id', id)
      .eq('usuario_id', usuario.id) // Asegurar que solo actualice sus propios materiales
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar material:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en actualizarMaterial:', error);
    return null;
  }
}

/**
 * Eliminar un material
 */
export async function eliminarMaterial(id: string): Promise<boolean> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    const { error } = await supabase
      .from('materiales')
      .delete()
      .eq('id', id)
      .eq('usuario_id', usuario.id); // Asegurar que solo elimine sus propios materiales

    if (error) {
      console.error('Error al eliminar material:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error en eliminarMaterial:', error);
    return false;
  }
}

/**
 * Sincronizar materiales de localStorage a Supabase (migración única)
 */
export async function sincronizarMaterialesDesdeLocalStorage(): Promise<boolean> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      console.warn('No hay usuario autenticado para sincronizar');
      return false;
    }

    // Obtener materiales de localStorage
    const materialesLocal = JSON.parse(localStorage.getItem('inventario') || '[]');
    
    if (materialesLocal.length === 0) {
      console.log('No hay materiales en localStorage para sincronizar');
      return true;
    }

    // Verificar si ya hay materiales en Supabase
    const materialesSupabase = await obtenerMateriales();
    if (materialesSupabase.length > 0) {
      console.log('Ya hay materiales en Supabase, omitiendo sincronización');
      return true;
    }

    // Crear todos los materiales en Supabase
    const promesas = materialesLocal.map((material: any) => {
      return crearMaterial({
        nombre: material.nombre,
        tipo: material.tipo,
        precio: parseFloat(material.precio) || 0,
        cantidad: parseFloat(material.cantidad) || 0,
        unidad: material.unidad || 'gramos',
        color: material.color,
      });
    });

    await Promise.all(promesas);
    
    console.log(`✅ ${materialesLocal.length} materiales sincronizados a Supabase`);
    return true;
  } catch (error) {
    console.error('Error al sincronizar materiales:', error);
    return false;
  }
}
