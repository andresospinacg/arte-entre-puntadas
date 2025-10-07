import { supabase, obtenerUsuarioActual } from './supabase';

// ==========================================
// TIPOS
// ==========================================

export interface Proyecto {
  id?: string;
  usuario_id?: string;
  nombre: string;
  cliente?: string;
  descripcion?: string;
  estado?: 'En progreso' | 'Completado' | 'Pausado';
  horas_estimadas?: number;
  costo_total: number;
  calculo?: any; // JSON con todos los datos del cálculo
  created_at?: string;
  updated_at?: string;
}

// ==========================================
// FUNCIONES CRUD - PROYECTOS
// ==========================================

/**
 * Obtener todos los proyectos del usuario actual
 */
export async function obtenerProyectos(): Promise<Proyecto[]> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      console.warn('No hay usuario autenticado');
      return [];
    }

    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('usuario_id', usuario.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener proyectos:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en obtenerProyectos:', error);
    return [];
  }
}

/**
 * Obtener un proyecto específico por ID
 */
export async function obtenerProyectoPorId(id: string): Promise<Proyecto | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('id', id)
      .eq('usuario_id', usuario.id)
      .single();

    if (error) {
      console.error('Error al obtener proyecto:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en obtenerProyectoPorId:', error);
    return null;
  }
}

/**
 * Crear un nuevo proyecto
 */
export async function crearProyecto(proyecto: Omit<Proyecto, 'id' | 'usuario_id' | 'created_at' | 'updated_at'>): Promise<Proyecto | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    const nuevoProyecto = {
      ...proyecto,
      usuario_id: usuario.id,
      estado: proyecto.estado || 'En progreso',
    };

    const { data, error } = await supabase
      .from('proyectos')
      .insert([nuevoProyecto])
      .select()
      .single();

    if (error) {
      console.error('Error al crear proyecto:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en crearProyecto:', error);
    return null;
  }
}

/**
 * Actualizar un proyecto existente
 */
export async function actualizarProyecto(id: string, proyecto: Partial<Proyecto>): Promise<Proyecto | null> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    // Remover campos que no deben actualizarse
    const { id: _, usuario_id, created_at, ...datosActualizar } = proyecto as any;

    const { data, error } = await supabase
      .from('proyectos')
      .update(datosActualizar)
      .eq('id', id)
      .eq('usuario_id', usuario.id)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar proyecto:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error en actualizarProyecto:', error);
    return null;
  }
}

/**
 * Eliminar un proyecto
 */
export async function eliminarProyecto(id: string): Promise<boolean> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      throw new Error('Usuario no autenticado');
    }

    const { error } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', id)
      .eq('usuario_id', usuario.id);

    if (error) {
      console.error('Error al eliminar proyecto:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error en eliminarProyecto:', error);
    return false;
  }
}

/**
 * Marcar proyecto como completado
 */
export async function completarProyecto(id: string): Promise<Proyecto | null> {
  return actualizarProyecto(id, { estado: 'Completado' });
}

/**
 * Sincronizar proyectos de localStorage a Supabase (migración única)
 */
export async function sincronizarProyectosDesdeLocalStorage(): Promise<boolean> {
  try {
    const usuario = await obtenerUsuarioActual();
    if (!usuario) {
      console.warn('No hay usuario autenticado para sincronizar');
      return false;
    }

    // Obtener proyectos de localStorage
    const proyectosLocal = JSON.parse(localStorage.getItem('proyectos') || '[]');
    
    if (proyectosLocal.length === 0) {
      console.log('No hay proyectos en localStorage para sincronizar');
      return true;
    }

    // Verificar si ya hay proyectos en Supabase
    const proyectosSupabase = await obtenerProyectos();
    if (proyectosSupabase.length > 0) {
      console.log('Ya hay proyectos en Supabase, omitiendo sincronización');
      return true;
    }

    // Crear todos los proyectos en Supabase
    const promesas = proyectosLocal.map((proyecto: any) => {
      return crearProyecto({
        nombre: proyecto.nombre,
        cliente: proyecto.cliente || 'Sin especificar',
        descripcion: proyecto.descripcion || '',
        costo_total: proyecto.resultado?.precioFinal || 0,
        horas_estimadas: proyecto.manoObra?.horas || 0,
        calculo: {
          materiales: proyecto.materiales,
          manoObra: proyecto.manoObra,
          porcentajes: proyecto.porcentajes,
          resultado: proyecto.resultado,
        },
        estado: 'Completado',
      });
    });

    await Promise.all(promesas);
    
    console.log(`✅ ${proyectosLocal.length} proyectos sincronizados a Supabase`);
    return true;
  } catch (error) {
    console.error('Error al sincronizar proyectos:', error);
    return false;
  }
}
