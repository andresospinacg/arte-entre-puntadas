/**
 * Cliente de Supabase para la base de datos
 */

import { createClient } from '@supabase/supabase-js';

// Tipos para la base de datos
export interface Usuario {
  id: string;
  email: string;
  nombre?: string;
  created_at: string;
}

export interface MaterialDB {
  id: string;
  usuario_id: string;
  nombre: string;
  tipo: 'hilo' | 'relleno' | 'accesorio' | 'herramienta';
  precio: number;
  cantidad: number;
  unidad: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface ProyectoDB {
  id: string;
  usuario_id: string;
  nombre: string;
  cliente?: string;
  descripcion?: string;
  estado: 'En progreso' | 'Completado' | 'Pausado';
  horas_estimadas?: number;
  costo_total: number;
  calculo?: any; // JSON con el cálculo completo
  created_at: string;
  updated_at: string;
}

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Funciones helper para interactuar con la base de datos
 */

// Materiales
export async function obtenerMateriales(usuarioId: string) {
  const { data, error } = await supabase
    .from('materiales')
    .select('*')
    .eq('usuario_id', usuarioId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as MaterialDB[];
}

export async function agregarMaterial(material: Omit<MaterialDB, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('materiales')
    .insert([material])
    .select()
    .single();

  if (error) throw error;
  return data as MaterialDB;
}

export async function actualizarMaterial(id: string, material: Partial<MaterialDB>) {
  const { data, error } = await supabase
    .from('materiales')
    .update({ ...material, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as MaterialDB;
}

export async function eliminarMaterial(id: string) {
  const { error } = await supabase
    .from('materiales')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Proyectos
export async function obtenerProyectos(usuarioId: string) {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('usuario_id', usuarioId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ProyectoDB[];
}

export async function agregarProyecto(proyecto: Omit<ProyectoDB, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('proyectos')
    .insert([proyecto])
    .select()
    .single();

  if (error) throw error;
  return data as ProyectoDB;
}

export async function actualizarProyecto(id: string, proyecto: Partial<ProyectoDB>) {
  const { data, error } = await supabase
    .from('proyectos')
    .update({ ...proyecto, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ProyectoDB;
}

export async function eliminarProyecto(id: string) {
  const { error } = await supabase
    .from('proyectos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
