import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  Package2, 
  DollarSign, 
  TrendingUp, 
  Download,
  Save,
  Calculator as CalcIcon,
  Search,
  Plus,
  Edit
} from 'lucide-react';
import { calculadora } from '../../lib/calculos';
import type { Material, ManoDeObra, Porcentajes, ResultadoCalculo } from '../../lib/calculos';
import {
  crearProyecto,
  actualizarProyecto,
} from '../../lib/proyectos-service';
import { obtenerMateriales, descontarMaterial } from '../../lib/materiales-service';

interface MaterialInventario {
  id: string;
  nombre: string;
  tipo: string;
  cantidad: number;
  unidad: string;
  precio: number;
}

export default function CalculadoraFormMejorada() {
  const [materiales, setMateriales] = useState<Record<string, Material>>({});
  const [manoObra, setManoObra] = useState<ManoDeObra>({
    horas: 0,
    costo_hora: 15000,
    empaques: 0,
  });
  const [porcentajes, setPorcentajes] = useState<Porcentajes>({
    herramientas: 4,
    indirectos: 15,
    utilidad: 25,
  });
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [inventario, setInventario] = useState<MaterialInventario[]>([]);
  const [mostrarSelectorMaterial, setMostrarSelectorMaterial] = useState<number | null>(null);
  const [materialSeleccionado, setMaterialSeleccionado] = useState<Record<number, MaterialInventario | null>>({});
  const [proyectoId, setProyectoId] = useState<string | number | null>(null);

  useEffect(() => {
    cargarInventario();
    cargarProyectoEditar();
  }, []);

  const cargarInventario = async () => {
    const materiales = await obtenerMateriales();
    setInventario(materiales as MaterialInventario[]);
  };

  const cargarProyectoEditar = () => {
    const proyectoStr = sessionStorage.getItem('proyectoEditar');
    if (proyectoStr) {
      try {
        const proyecto = JSON.parse(proyectoStr);
        setProyectoId(proyecto.id);
        setNombreProyecto(proyecto.nombre);
        
        if (proyecto.cliente) {
          setNombreCliente(proyecto.cliente);
        }
        if (proyecto.materiales) {
          setMateriales(proyecto.materiales);
        }
        if (proyecto.manoObra) {
          setManoObra(proyecto.manoObra);
        }
        if (proyecto.porcentajes) {
          setPorcentajes(proyecto.porcentajes);
        }
        if (proyecto.resultado) {
          setResultado(proyecto.resultado);
        }
        
        // Limpiar sessionStorage
        sessionStorage.removeItem('proyectoEditar');
      } catch (error) {
        console.error('Error cargando proyecto:', error);
      }
    }
  };

  const seleccionarMaterialInventario = (numMaterial: number, materialInv: MaterialInventario) => {
    const key = `material_${numMaterial}`;
    setMateriales(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        precio_100g: materialInv.precio,
        nombre: materialInv.nombre,
      },
    }));
    setMaterialSeleccionado(prev => ({
      ...prev,
      [numMaterial]: materialInv,
    }));
    setMostrarSelectorMaterial(null);
  };

  const descontarTodoDelInventario = async () => {
    const materialesADescontar = Object.entries(materialSeleccionado).filter(([_, material]) => material !== null);
    
    if (materialesADescontar.length === 0) {
      alert('No hay materiales del inventario seleccionados para descontar');
      return;
    }

    let confirmaciones: string[] = [];
    let errores: string[] = [];

    // Procesar cada material seleccionado
    for (const [numMaterialStr, material] of materialesADescontar) {
      if (!material) continue;

      const numMaterial = parseInt(numMaterialStr);
      const key = `material_${numMaterial}`;
      let cantidadUsada = materiales[key]?.gramos || 0;

      // Para accesorios (material 5), descontar 1 unidad si no hay gramos especificados
      if (numMaterial === 5 && cantidadUsada === 0) {
        cantidadUsada = 1;
      }

      if (cantidadUsada <= 0) {
        errores.push(`${material.nombre}: No se especificó cantidad`);
        continue;
      }

      if (cantidadUsada > material.cantidad) {
        errores.push(`${material.nombre}: Cantidad insuficiente (disponible: ${material.cantidad}${material.unidad || 'g'})`);
        continue;
      }

      try {
        const materialActualizado = await descontarMaterial(material.id, cantidadUsada);
        if (materialActualizado) {
          confirmaciones.push(`${material.nombre}: -${cantidadUsada}${material.unidad || 'g'} (Restante: ${materialActualizado.cantidad}${material.unidad || 'g'})`);
        } else {
          errores.push(`${material.nombre}: Error al descontar`);
        }
      } catch (error) {
        console.error(`Error al descontar ${material.nombre}:`, error);
        errores.push(`${material.nombre}: Error al descontar`);
      }
    }

    // Mostrar resultados
    let mensaje = '';
    if (confirmaciones.length > 0) {
      mensaje += '✅ Descontados exitosamente:\n' + confirmaciones.join('\n');
    }
    if (errores.length > 0) {
      if (mensaje) mensaje += '\n\n';
      mensaje += '❌ Errores:\n' + errores.join('\n');
    }

    alert(mensaje || 'No se procesó ningún material');

    // Recargar inventario y limpiar selecciones
    if (confirmaciones.length > 0) {
      await cargarInventario();
      setMaterialSeleccionado({});
    }
  };

  const calcularPrecio = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculadora.calcularPrecioCompleto(materiales, manoObra, porcentajes);
    setResultado(res);
  };

  const actualizarMaterial = (key: string, field: string, value: string) => {
    setMateriales(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: parseFloat(value) || 0,
      },
    }));
  };

  const formatearMoneda = (valor: number): string => {
    return `$${valor.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const guardarProyecto = async () => {
    if (!nombreProyecto.trim()) {
      alert('Por favor ingresa un nombre para el proyecto');
      return;
    }
    
    if (!resultado) {
      alert('Primero debes calcular el precio');
      return;
    }

    try {
      const datosProyecto = {
        nombre: nombreProyecto,
        cliente: nombreCliente || 'Cliente',
        descripcion: '',
        costo_total: resultado.precio_final,
        horas_estimadas: manoObra.horas,
        calculo: {
          materiales,
          manoObra,
          porcentajes,
          resultado,
        },
        estado: 'En progreso' as const,
      };

      if (proyectoId) {
        // Editar proyecto existente en Supabase (solo si es UUID)
        if (typeof proyectoId === 'string') {
          const actualizado = await actualizarProyecto(proyectoId, datosProyecto);
          
          if (actualizado) {
            // También actualizar en localStorage
            const proyectosLocal = JSON.parse(localStorage.getItem('proyectos') || '[]');
            const indexLocal = proyectosLocal.findIndex((p: any) => p.id === proyectoId);
            if (indexLocal !== -1) {
              proyectosLocal[indexLocal] = {
                ...proyectosLocal[indexLocal],
                ...datosProyecto,
                fecha: new Date().toISOString(),
              };
              localStorage.setItem('proyectos', JSON.stringify(proyectosLocal));
            }
            
            alert('✅ Proyecto actualizado exitosamente');
            setProyectoId(null);
          } else {
            throw new Error('No se pudo actualizar el proyecto');
          }
        } else {
          // Si es un ID numérico (legacy), solo guardar en localStorage
          const proyectosLocal = JSON.parse(localStorage.getItem('proyectos') || '[]');
          const indexLocal = proyectosLocal.findIndex((p: any) => p.id === proyectoId);
          if (indexLocal !== -1) {
            proyectosLocal[indexLocal] = {
              ...proyectosLocal[indexLocal],
              ...datosProyecto,
              fecha: new Date().toISOString(),
            };
            localStorage.setItem('proyectos', JSON.stringify(proyectosLocal));
            alert('✅ Proyecto actualizado exitosamente');
            setProyectoId(null);
          }
        }
      } else {
        // Crear nuevo proyecto en Supabase
        const nuevo = await crearProyecto(datosProyecto);
        
        if (nuevo) {
          // También guardar en localStorage como respaldo
          const proyectos = JSON.parse(localStorage.getItem('proyectos') || '[]');
          const nuevoProyecto = {
            id: nuevo.id || Date.now(),
            nombre: nombreProyecto,
            cliente: nombreCliente || 'Cliente',
            fecha: new Date().toISOString(),
            materiales,
            manoObra,
            porcentajes,
            resultado,
          };
          proyectos.push(nuevoProyecto);
          localStorage.setItem('proyectos', JSON.stringify(proyectos));
          
          alert('✅ Proyecto guardado exitosamente');
        } else {
          throw new Error('No se pudo crear el proyecto');
        }
      }
    } catch (error) {
      console.error('Error al guardar proyecto:', error);
      alert('❌ Error al guardar el proyecto. Por favor, intenta nuevamente.');
    }
  };

  const exportarPDF = async () => {
    if (!resultado || !nombreProyecto) {
      alert('Por favor calcula el precio y asigna un nombre al proyecto');
      return;
    }

    try {
      const { GeneradorPDF } = await import('../../lib/pdf');
      const generador = new GeneradorPDF();
      
      const datosProyecto = {
        nombre: nombreProyecto,
        cliente: nombreCliente || 'Cliente',
        descripcion: '',
      };

      // Cargar logo si existe
      let logoBase64: string | undefined;
      try {
        const response = await fetch('/logo_arte_entrepuntadas.png');
        const blob = await response.blob();
        logoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.log('Logo no disponible, continuando sin logo');
      }

      // Generar PDF
      const pdf = generador.generarCotizacion(datosProyecto, resultado, logoBase64);
      
      // Descargar PDF
      pdf.save(`cotizacion-${nombreProyecto.replace(/\s+/g, '-')}.pdf`);
      
      alert('✅ PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('⚠️ Error al generar PDF. Por favor intenta nuevamente.');
    }
  };

  const materialesHilo = inventario.filter(m => m.tipo === 'hilo');
  const materialesRelleno = inventario.filter(m => m.tipo === 'relleno');
  const materialesAccesorio = inventario.filter(m => m.tipo === 'accesorio');

  return (
    <div className="space-y-6">
      <form onSubmit={calcularPrecio} className="space-y-6">
        {/* Nombre del Proyecto */}
        <div className="card">
          {proyectoId && (
            <div className="mb-4 p-3 bg-primary-400/10 border border-primary-400/30 rounded-lg flex items-center space-x-2">
              <Edit className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-400">Editando proyecto existente</span>
            </div>
          )}
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-dark-950" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Información del Proyecto</h2>
          </div>
          
          <input
            type="text"
            placeholder="Nombre del proyecto (ej: Peluche Oso Azul)"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
            className="input-field"
            required
          />
          
          <input
            type="text"
            placeholder="Nombre del cliente (ej: María González)"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            className="input-field mt-4"
          />
        </div>

        {/* Sección Materiales */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-500 rounded-lg flex items-center justify-center">
                <Package2 className="w-5 h-5 text-dark-950" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white">Materiales</h2>
            </div>
            {inventario.length === 0 && (
              <a href="/inventario" className="text-sm text-primary-400 hover:text-primary-300 flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Agregar al inventario</span>
              </a>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="label">Hilo {num}</label>
                  {inventario.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setMostrarSelectorMaterial(mostrarSelectorMaterial === num ? null : num)}
                      className="text-xs text-primary-400 hover:text-primary-300 flex items-center space-x-1"
                    >
                      <Search className="w-3 h-3" />
                      <span>Buscar en inventario</span>
                    </button>
                  )}
                </div>

                {mostrarSelectorMaterial === num && (
                  <div className="bg-dark-700 rounded-lg p-3 max-h-60 overflow-y-auto space-y-1">
                    {materialesHilo.length === 0 ? (
                      <p className="text-xs text-dark-500">No hay hilos en el inventario</p>
                    ) : (
                      materialesHilo.map(mat => (
                        <button
                          key={mat.id}
                          type="button"
                          onClick={() => seleccionarMaterialInventario(num, mat)}
                          className="w-full text-left px-2 py-1.5 text-sm hover:bg-dark-600 rounded flex justify-between items-center group"
                        >
                          <div className="flex flex-col flex-1">
                            <span className="text-white font-medium">{mat.nombre}</span>
                            <span className="text-xs text-dark-400">Stock: {mat.cantidad}{mat.unidad || 'g'}</span>
                          </div>
                          <span className="text-dark-500 group-hover:text-primary-400 text-xs">{formatearMoneda(mat.precio)}/100g</span>
                        </button>
                      ))
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Gramos usados"
                      className="input-field"
                      value={materiales[`material_${num}`]?.gramos || ''}
                      onChange={(e) => actualizarMaterial(`material_${num}`, 'gramos', e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Precio x 100g"
                      value={materiales[`material_${num}`]?.precio_100g || ''}
                      className="input-field"
                      onChange={(e) => actualizarMaterial(`material_${num}`, 'precio_100g', e.target.value)}
                    />
                  </div>
                </div>

                {materialSeleccionado[num] && (
                  <div className="bg-primary-400/10 border border-primary-400/30 rounded-lg p-2 flex items-center space-x-2">
                    <Package2 className="w-4 h-4 text-primary-400" />
                    <div className="text-xs">
                      <p className="text-primary-400 font-medium">{materialSeleccionado[num]?.nombre}</p>
                      <p className="text-dark-400">Stock: {materialSeleccionado[num]?.cantidad}g</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="label">Relleno</label>
                {inventario.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMostrarSelectorMaterial(mostrarSelectorMaterial === 4 ? null : 4)}
                    className="text-xs text-primary-400 hover:text-primary-300 flex items-center space-x-1"
                  >
                    <Search className="w-3 h-3" />
                    <span>Buscar en inventario</span>
                  </button>
                )}
              </div>

              {mostrarSelectorMaterial === 4 && (
                <div className="bg-dark-700 rounded-lg p-3 max-h-60 overflow-y-auto space-y-1">
                  {materialesRelleno.length === 0 ? (
                    <p className="text-xs text-dark-500">No hay rellenos en el inventario</p>
                  ) : (
                    materialesRelleno.map(mat => (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => seleccionarMaterialInventario(4, mat)}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-dark-600 rounded flex justify-between items-center group"
                      >
                        <div className="flex flex-col flex-1">
                          <span className="text-white font-medium">{mat.nombre}</span>
                          <span className="text-xs text-dark-400">Stock: {mat.cantidad}{mat.unidad || 'g'}</span>
                        </div>
                        <span className="text-dark-500 group-hover:text-primary-400 text-xs">{formatearMoneda(mat.precio)}/100g</span>
                      </button>
                    ))
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Gramos usados"
                    className="input-field"
                    value={materiales.material_4?.gramos || ''}
                    onChange={(e) => actualizarMaterial('material_4', 'gramos', e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Precio x 100g"
                    value={materiales.material_4?.precio_100g || ''}
                    className="input-field"
                    onChange={(e) => actualizarMaterial('material_4', 'precio_100g', e.target.value)}
                  />
                </div>
              </div>

              {materialSeleccionado[4] && (
                <div className="bg-primary-400/10 border border-primary-400/30 rounded-lg p-2 flex items-center space-x-2">
                  <Package2 className="w-4 h-4 text-primary-400" />
                  <div className="text-xs">
                    <p className="text-primary-400 font-medium">{materialSeleccionado[4]?.nombre}</p>
                    <p className="text-dark-400">Stock: {materialSeleccionado[4]?.cantidad}g</p>
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <label className="label">Accesorios (Ojitos, bordados, botones, etc.)</label>
                {inventario.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMostrarSelectorMaterial(mostrarSelectorMaterial === 5 ? null : 5)}
                    className="text-xs text-primary-400 hover:text-primary-300 flex items-center space-x-1"
                  >
                    <Search className="w-3 h-3" />
                    <span>Buscar en inventario</span>
                  </button>
                )}
              </div>

              {mostrarSelectorMaterial === 5 && (
                <div className="bg-dark-700 rounded-lg p-3 max-h-60 overflow-y-auto space-y-1">
                  {materialesAccesorio.length === 0 ? (
                    <p className="text-xs text-dark-500">No hay accesorios en el inventario</p>
                  ) : (
                    materialesAccesorio.map(mat => (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => {
                          seleccionarMaterialInventario(5, mat);
                          setMateriales(prev => ({
                            ...prev,
                            material_5: { costo_directo: mat.precio },
                          }));
                          setMostrarSelectorMaterial(null);
                        }}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-dark-600 rounded transition-colors group"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white group-hover:text-primary-400 transition-colors">{mat.nombre}</span>
                          <div className="flex flex-col items-end space-y-0.5">
                            <span className="text-dark-500">{formatearMoneda(mat.precio)}</span>
                            <span className="text-xs text-dark-400">Stock: {mat.cantidad}{mat.unidad || 'un'}</span>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              <input
                type="number"
                step="0.1"
                placeholder="Costo total de accesorios"
                value={materiales.material_5?.costo_directo || ''}
                className="input-field"
                onChange={(e) => actualizarMaterial('material_5', 'costo_directo', e.target.value)}
              />

              {materialSeleccionado[5] && (
                <div className="bg-primary-400/10 border border-primary-400/30 rounded-lg p-2 flex items-center space-x-2">
                  <Package2 className="w-4 h-4 text-primary-400" />
                  <div className="text-xs">
                    <p className="text-primary-400 font-medium">{materialSeleccionado[5]?.nombre}</p>
                    <p className="text-dark-400">Stock: {materialSeleccionado[5]?.cantidad}{materialSeleccionado[5]?.unidad || 'un'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección Mano de Obra */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-dark-950" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Mano de Obra y Empaque</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="label">Horas trabajadas</label>
              <input
                type="number"
                step="0.1"
                placeholder="0"
                className="input-field"
                onChange={(e) => setManoObra(prev => ({ ...prev, horas: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-3">
              <label className="label">Costo por hora</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500">$</span>
                <input
                  type="number"
                  step="1000"
                  defaultValue={15000}
                  placeholder="15000"
                  className="input-field pl-8"
                  onChange={(e) => setManoObra(prev => ({ ...prev, costo_hora: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="label">Costo de empaque</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500">$</span>
                <input
                  type="number"
                  step="100"
                  placeholder="0"
                  className="input-field pl-8"
                  onChange={(e) => setManoObra(prev => ({ ...prev, empaques: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección Porcentajes */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-dark-950" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Porcentajes Adicionales</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="label">Herramientas (%)</label>
              <input
                type="number"
                step="0.1"
                defaultValue={4}
                placeholder="4"
                className="input-field"
                onChange={(e) => setPorcentajes(prev => ({ ...prev, herramientas: parseFloat(e.target.value) || 0 }))}
              />
              <p className="text-xs text-dark-500">Agujas, marcadores, tijeras</p>
            </div>

            <div className="space-y-3">
              <label className="label">Gastos Indirectos (%)</label>
              <input
                type="number"
                step="0.1"
                defaultValue={15}
                placeholder="15"
                className="input-field"
                onChange={(e) => setPorcentajes(prev => ({ ...prev, indirectos: parseFloat(e.target.value) || 0 }))}
              />
              <p className="text-xs text-dark-500">Luz, internet, publicidad</p>
            </div>

            <div className="space-y-3">
              <label className="label">Utilidad (%)</label>
              <input
                type="number"
                step="0.1"
                defaultValue={25}
                placeholder="25"
                className="input-field"
                onChange={(e) => setPorcentajes(prev => ({ ...prev, utilidad: parseFloat(e.target.value) || 0 }))}
              />
              <p className="text-xs text-dark-500">Margen de ganancia</p>
            </div>
          </div>
        </div>

        {/* Botón Calcular */}
        <button
          type="submit"
          className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 group"
        >
          <CalcIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>Calcular Precio</span>
        </button>
      </form>

      {/* Resultados */}
      {resultado && (
        <div className="card bg-gradient-to-br from-dark-800 to-dark-900 border-primary-400/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center shadow-glow">
                <DollarSign className="w-7 h-7 text-dark-950" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Resultado</h2>
                <p className="text-dark-500">Precio calculado</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={guardarProyecto}
                className="btn-secondary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{proyectoId ? 'Actualizar' : 'Guardar'}</span>
              </button>
              {Object.values(materialSeleccionado).some(m => m !== null) && (
                <button
                  onClick={descontarTodoDelInventario}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Package2 className="w-4 h-4" />
                  <span>Descontar Inventario</span>
                </button>
              )}
              <button
                onClick={exportarPDF}
                className="btn-outline flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Precio Final */}
          <div className="bg-dark-700/50 rounded-xl p-6 mb-6 border border-primary-400/20">
            <p className="text-dark-500 mb-2">Precio de Venta Sugerido</p>
            <p className="text-5xl font-display font-bold gradient-text">
              {formatearMoneda(resultado.precio_final)}
            </p>
          </div>

          {/* Desglose */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-dark-700/30 rounded-lg p-4 border border-dark-600">
              <p className="text-sm text-dark-500 mb-1">Costo Materiales</p>
              <p className="text-2xl font-bold text-white">{formatearMoneda(resultado.subtotal_materiales)}</p>
            </div>

            <div className="bg-dark-700/30 rounded-lg p-4 border border-dark-600">
              <p className="text-sm text-dark-500 mb-1">Mano de Obra</p>
              <p className="text-2xl font-bold text-white">{formatearMoneda(resultado.mano_obra)}</p>
            </div>

            <div className="bg-dark-700/30 rounded-lg p-4 border border-dark-600">
              <p className="text-sm text-dark-500 mb-1">Herramientas + Indirectos</p>
              <p className="text-2xl font-bold text-white">{formatearMoneda(resultado.herramientas + resultado.gastos_indirectos)}</p>
            </div>

            <div className="bg-dark-700/30 rounded-lg p-4 border border-dark-600">
              <p className="text-sm text-dark-500 mb-1">Utilidad</p>
              <p className="text-2xl font-bold text-accent-400">{formatearMoneda(resultado.utilidad)}</p>
            </div>
          </div>

          {/* Desglose detallado */}
          <details className="mt-6">
            <summary className="cursor-pointer text-primary-400 font-medium hover:text-primary-300 transition-colors">
              Ver desglose completo
            </summary>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-dark-700">
                <span className="text-dark-500">Subtotal (sin utilidad):</span>
                <span className="text-white font-medium">{formatearMoneda(resultado.subtotal_1)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-700">
                <span className="text-dark-500">Precio de Venta:</span>
                <span className="text-white font-medium">{formatearMoneda(resultado.precio_final)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-dark-500">Ganancia Neta:</span>
                <span className="text-accent-400 font-bold">{formatearMoneda(resultado.utilidad)}</span>
              </div>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
