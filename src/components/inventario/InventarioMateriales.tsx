import { useState, useEffect } from 'react';
import { Package2, Plus, Edit, Trash2, Search } from 'lucide-react';
import {
  obtenerMateriales,
  crearMaterial,
  actualizarMaterial,
  eliminarMaterial as eliminarMaterialSupabase,
  sincronizarMaterialesDesdeLocalStorage,
} from '../../lib/materiales-service';

interface Material {
  id?: string | number;
  nombre: string;
  tipo: string;
  cantidad: number;
  unidad: string;
  precio: number;
  color?: string;
}

export default function InventarioMateriales() {
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [editando, setEditando] = useState<Material | null>(null);
  const [nuevoMaterial, setNuevoMaterial] = useState({
    nombre: '',
    tipo: 'hilo',
    cantidad: 0,
    unidad: 'gramos',
    precio: 0,
    color: '',
  });

  useEffect(() => {
    cargarMateriales();
  }, []);

  const cargarMateriales = async () => {
    try {
      setCargando(true);
      
      // Intentar cargar de Supabase primero
      const materialesSupabase = await obtenerMateriales();
      
      if (materialesSupabase.length > 0) {
        setMateriales(materialesSupabase);
        // Guardar también en localStorage como respaldo
        localStorage.setItem('inventario', JSON.stringify(materialesSupabase));
      } else {
        // Si no hay en Supabase, intentar sincronizar desde localStorage
        const sincronizado = await sincronizarMaterialesDesdeLocalStorage();
        
        if (sincronizado) {
          // Recargar desde Supabase después de sincronizar
          const materialesActualizados = await obtenerMateriales();
          setMateriales(materialesActualizados);
        } else {
          // Fallback a localStorage si falla Supabase
          const guardados = JSON.parse(localStorage.getItem('inventario') || '[]');
          setMateriales(guardados);
        }
      }
    } catch (error) {
      console.error('Error al cargar materiales:', error);
      // Fallback a localStorage
      const guardados = JSON.parse(localStorage.getItem('inventario') || '[]');
      setMateriales(guardados);
    } finally {
      setCargando(false);
    }
  };

  const agregarMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nuevoMaterial.nombre || nuevoMaterial.cantidad <= 0 || nuevoMaterial.precio <= 0) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      setCargando(true);

      if (editando) {
        // Actualizar material existente en Supabase
        if (editando.id && typeof editando.id === 'string') {
          const actualizado = await actualizarMaterial(editando.id, {
            nombre: nuevoMaterial.nombre,
            tipo: nuevoMaterial.tipo as any,
            cantidad: nuevoMaterial.cantidad,
            unidad: nuevoMaterial.unidad,
            precio: nuevoMaterial.precio,
            color: nuevoMaterial.color,
          });

          if (actualizado) {
            // Actualizar en el estado local
            const nuevos = materiales.map(m => 
              m.id === editando.id ? actualizado : m
            );
            setMateriales(nuevos);
            // Actualizar también localStorage
            localStorage.setItem('inventario', JSON.stringify(nuevos));
          }
        }
        setEditando(null);
      } else {
        // Crear nuevo material en Supabase
        const nuevo = await crearMaterial({
          nombre: nuevoMaterial.nombre,
          tipo: nuevoMaterial.tipo as any,
          cantidad: nuevoMaterial.cantidad,
          unidad: nuevoMaterial.unidad,
          precio: nuevoMaterial.precio,
          color: nuevoMaterial.color,
        });

        if (nuevo) {
          const nuevos = [...materiales, nuevo];
          setMateriales(nuevos);
          // Actualizar también localStorage
          localStorage.setItem('inventario', JSON.stringify(nuevos));
        }
      }
      
      setNuevoMaterial({ nombre: '', tipo: 'hilo', cantidad: 0, unidad: 'gramos', precio: 0, color: '' });
      setMostrarForm(false);
    } catch (error) {
      console.error('Error al guardar material:', error);
      alert('Error al guardar el material. Por favor, intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const editarMaterial = (material: Material) => {
    setEditando(material);
    setNuevoMaterial({
      nombre: material.nombre,
      tipo: material.tipo,
      cantidad: material.cantidad,
      unidad: material.unidad,
      precio: material.precio,
      color: material.color || '',
    });
    setMostrarForm(true);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNuevoMaterial({ nombre: '', tipo: 'hilo', cantidad: 0, unidad: 'gramos', precio: 0, color: '' });
    setMostrarForm(false);
  };

  const eliminarMaterial = async (id: string | number | undefined) => {
    if (!id) return;
    
    if (confirm('¿Eliminar este material?')) {
      try {
        setCargando(true);
        
        // Eliminar de Supabase si es un ID de string (UUID)
        if (typeof id === 'string') {
          const eliminado = await eliminarMaterialSupabase(id);
          
          if (eliminado) {
            const nuevos = materiales.filter(m => m.id !== id);
            setMateriales(nuevos);
            // Actualizar también localStorage
            localStorage.setItem('inventario', JSON.stringify(nuevos));
          }
        } else {
          // Fallback para IDs numéricos antiguos (solo localStorage)
          const nuevos = materiales.filter(m => m.id !== id);
          setMateriales(nuevos);
          localStorage.setItem('inventario', JSON.stringify(nuevos));
        }
      } catch (error) {
        console.error('Error al eliminar material:', error);
        alert('Error al eliminar el material. Por favor, intenta nuevamente.');
      } finally {
        setCargando(false);
      }
    }
  };

  const materialesFiltrados = materiales.filter(m =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const formatearMoneda = (valor: number) => {
    return `$${valor.toLocaleString('es-CO')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="text"
            placeholder="Buscar materiales..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Material</span>
        </button>
      </div>

      {/* Formulario de agregar/editar */}
      {mostrarForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">
              {editando ? 'Editar Material' : 'Nuevo Material'}
            </h3>
            {editando && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="text-dark-500 hover:text-white text-sm"
              >
                Cancelar edición
              </button>
            )}
          </div>
          <form onSubmit={agregarMaterial} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Hilo algodón azul"
                  value={nuevoMaterial.nombre}
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, nombre: e.target.value})}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="label">Tipo</label>
                <select
                  value={nuevoMaterial.tipo}
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, tipo: e.target.value})}
                  className="input-field"
                >
                  <option value="hilo">Hilo</option>
                  <option value="relleno">Relleno</option>
                  <option value="accesorio">Accesorio</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="label">Cantidad</label>
                <input
                  type="number"
                  step="0.1"
                  value={nuevoMaterial.cantidad}
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, cantidad: parseFloat(e.target.value)})}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="label">Unidad</label>
                <select
                  value={nuevoMaterial.unidad}
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, unidad: e.target.value})}
                  className="input-field"
                >
                  <option value="gramos">Gramos</option>
                  <option value="unidades">Unidades</option>
                  <option value="metros">Metros</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="label">Precio (por 100g o unitario)</label>
                <input
                  type="number"
                  step="100"
                  value={nuevoMaterial.precio}
                  onChange={(e) => setNuevoMaterial({...nuevoMaterial, precio: parseFloat(e.target.value)})}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary" disabled={cargando}>
                {cargando ? 'Guardando...' : editando ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={editando ? cancelarEdicion : () => setMostrarForm(false)}
                className="btn-secondary"
                disabled={cargando}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de materiales */}
      {cargando ? (
        <div className="card text-center py-16">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-12 w-12 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Cargando materiales...</h3>
          <p className="text-dark-500">Espera un momento</p>
        </div>
      ) : materialesFiltrados.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package2 className="w-10 h-10 text-dark-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {busqueda ? 'No se encontraron materiales' : 'No hay materiales en el inventario'}
          </h3>
          <p className="text-dark-500">
            {busqueda ? 'Intenta con otra búsqueda' : 'Agrega tu primer material para comenzar'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materialesFiltrados.map((material) => (
            <div key={material.id} className="card-hover">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{material.nombre}</h3>
                  <span className="inline-block px-2 py-1 bg-primary-400/20 text-primary-400 text-xs rounded mt-1">
                    {material.tipo}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-500">Cantidad:</span>
                  <span className="text-white font-medium">{material.cantidad} {material.unidad}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-500">Precio:</span>
                  <span className="text-white font-medium">{formatearMoneda(material.precio)}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => editarMaterial(material)}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => eliminarMaterial(material.id)}
                  className="btn-outline px-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
