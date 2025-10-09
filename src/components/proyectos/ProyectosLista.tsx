import { useState, useEffect } from 'react';
import { FolderOpen, Download, Trash2, Calendar, Eye, Edit } from 'lucide-react';
import type { ResultadoCalculo } from '../../lib/calculos';
import {
  obtenerProyectos,
  eliminarProyecto as eliminarProyectoSupabase,
  sincronizarProyectosDesdeLocalStorage
} from '../../lib/proyectos-service';

interface Proyecto {
  id?: string | number;
  nombre: string;
  cliente?: string;
  fecha?: string;
  created_at?: string;
  materiales?: any;
  manoObra?: any;
  porcentajes?: any;
  resultado?: ResultadoCalculo;
  calculo?: any;
  costo_total?: number;
}

export default function ProyectosLista() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      setCargando(true);
      
      // Cargar de Supabase (datos por usuario)
      const proyectosSupabase = await obtenerProyectos();
      
      // Transformar datos de Supabase al formato del componente
      const proyectosTransformados = proyectosSupabase.map(p => ({
        id: p.id,
        nombre: p.nombre,
        cliente: p.cliente,
        fecha: p.created_at || new Date().toISOString(),
        materiales: p.calculo?.materiales,
        manoObra: p.calculo?.manoObra,
        porcentajes: p.calculo?.porcentajes,
        resultado: p.calculo?.resultado || {
          costoMateriales: 0,
          costoManoObra: 0,
          subtotal: 0,
          ganancia: 0,
          precioSugerido: 0,
          gastosIndirectos: 0,
          precioFinal: p.costo_total || 0,
        },
      }));
      
      setProyectos(proyectosTransformados);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
      setProyectos([]);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProyecto = async (id: string | number | undefined) => {
    if (!id || typeof id !== 'string') return;
    
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      try {
        setCargando(true);
        
        // Eliminar de Supabase
        const eliminado = await eliminarProyectoSupabase(id);
        
        if (eliminado) {
          const nuevos = proyectos.filter(p => p.id !== id);
          setProyectos(nuevos);
          
          if (proyectoSeleccionado?.id === id) {
            setProyectoSeleccionado(null);
          }
        } else {
          alert('Error al eliminar el proyecto. Por favor, intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        alert('Error al eliminar el proyecto. Por favor, intenta nuevamente.');
      } finally {
        setCargando(false);
      }
    }
  };

  const formatearMoneda = (valor: number) => {
    return `$${valor.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportarPDF = async (proyecto: Proyecto) => {
    try {
      const { GeneradorPDF } = await import('../../lib/pdf');
      const generador = new GeneradorPDF();
      
      const datosProyecto = {
        nombre: proyecto.nombre,
        cliente: proyecto.cliente || 'Cliente',
        descripcion: '',
      };

      // Cargar logo si existe
      let logoBase64: string | undefined;
      try {
        const response = await fetch('/logo_pdf.png');
        const blob = await response.blob();
        logoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.log('Logo no disponible, continuando sin logo');
      }

      // Validar que exista resultado antes de generar PDF
      if (!proyecto.resultado) {
        alert('⚠️ No hay datos de cálculo disponibles para generar el PDF');
        return;
      }

      // Generar PDF
      const pdf = generador.generarCotizacion(datosProyecto, proyecto.resultado, logoBase64);
      
      // Descargar PDF
      pdf.save(`cotizacion-${proyecto.nombre.replace(/\s+/g, '-')}.pdf`);
      
      alert('✅ PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('⚠️ Error al generar PDF. Por favor intenta nuevamente.');
    }
  };

  const editarProyecto = (proyecto: Proyecto) => {
    // Guardar en sessionStorage para cargar en calculadora
    sessionStorage.setItem('proyectoEditar', JSON.stringify(proyecto));
    window.location.href = '/app/calculadora?editar=' + proyecto.id;
  };

  if (cargando) {
    return (
      <div className="card text-center py-16">
        <div className="flex justify-center mb-4">
          <svg className="animate-spin h-12 w-12 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Cargando proyectos...</h3>
        <p className="text-dark-500">Espera un momento</p>
      </div>
    );
  }

  if (proyectos.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <FolderOpen className="w-10 h-10 text-dark-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No hay proyectos guardados</h3>
        <p className="text-dark-500 mb-6">Los proyectos que guardes desde la calculadora aparecerán aquí</p>
        <a href="/calculadora" className="btn-primary inline-block">Ir a Calculadora</a>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Lista de proyectos */}
      <div className="lg:col-span-2 grid md:grid-cols-2 gap-4 h-fit">
        {proyectos.map((proyecto) => (
          <div 
            key={proyecto.id} 
            className={`card-hover group cursor-pointer ${proyectoSeleccionado?.id === proyecto.id ? 'border-primary-400' : ''}`}
            onClick={() => setProyectoSeleccionado(proyecto)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{proyecto.nombre}</h3>
                <div className="flex items-center space-x-2 text-xs text-dark-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatearFecha(proyecto.fecha || new Date().toISOString())}</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-700/50 rounded-lg p-3 mb-4">
              <p className="text-xs text-dark-500 mb-1">Precio Final</p>
              <p className="text-xl font-bold gradient-text">
                {formatearMoneda(proyecto.resultado?.precio_final || proyecto.costo_total || 0)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProyectoSeleccionado(proyecto);
                }}
                className="btn-secondary text-xs py-2 flex items-center justify-center space-x-1"
              >
                <Eye className="w-3 h-3" />
                <span>Ver</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  editarProyecto(proyecto);
                }}
                className="btn-secondary text-xs py-2 flex items-center justify-center space-x-1"
              >
                <Edit className="w-3 h-3" />
                <span>Editar</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  eliminarProyecto(proyecto.id);
                }}
                className="btn-outline text-xs py-2 flex items-center justify-center"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detalles del proyecto seleccionado */}
      <div className="lg:col-span-1">
        {proyectoSeleccionado ? (
          <div className="card sticky top-24">
            <h3 className="text-xl font-bold text-white mb-4">Detalles del Proyecto</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{proyectoSeleccionado.nombre}</h4>
                <p className="text-sm text-dark-500">{formatearFecha(proyectoSeleccionado.fecha || new Date().toISOString())}</p>
              </div>

              <div className="bg-dark-700/50 rounded-lg p-4">
                <p className="text-sm text-dark-500 mb-1">Precio de Venta</p>
                <p className="text-3xl font-bold gradient-text">
                  {formatearMoneda(proyectoSeleccionado.resultado?.precio_final || proyectoSeleccionado.costo_total || 0)}
                </p>
              </div>

              {proyectoSeleccionado.resultado?.subtotal_materiales !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-dark-700">
                    <span className="text-sm text-dark-500">Materiales:</span>
                    <span className="text-sm text-white font-medium">
                      {formatearMoneda(proyectoSeleccionado.resultado.subtotal_materiales)}
                    </span>
                  </div>
                  
                  {proyectoSeleccionado.resultado.mano_obra !== undefined && (
                    <div className="flex justify-between py-2 border-b border-dark-700">
                      <span className="text-sm text-dark-500">Mano de Obra:</span>
                      <span className="text-sm text-white font-medium">
                        {formatearMoneda(proyectoSeleccionado.resultado.mano_obra)}
                      </span>
                    </div>
                  )}

                  {proyectoSeleccionado.resultado.utilidad !== undefined && (
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-dark-500">Utilidad:</span>
                      <span className="text-sm text-accent-400 font-bold">
                        {formatearMoneda(proyectoSeleccionado.resultado.utilidad)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col space-y-2 pt-4">
                <button
                  onClick={() => exportarPDF(proyectoSeleccionado)}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </button>
                
                <button
                  onClick={() => editarProyecto(proyectoSeleccionado)}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar Proyecto</span>
                </button>

                <button
                  onClick={() => eliminarProyecto(proyectoSeleccionado.id)}
                  className="btn-outline flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar Proyecto</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card text-center py-12">
            <Eye className="w-12 h-12 text-dark-500 mx-auto mb-3" />
            <p className="text-dark-500">Selecciona un proyecto para ver sus detalles</p>
          </div>
        )}
      </div>
    </div>
  );
}
