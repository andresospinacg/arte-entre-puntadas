import { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Package2, 
  DollarSign, 
  TrendingUp, 
  Download,
  Save,
  Calculator as CalcIcon
} from 'lucide-react';
import { calculadora } from '../../lib/calculos';
import type { Material, ManoDeObra, Porcentajes, ResultadoCalculo } from '../../lib/calculos';

export default function CalculadoraForm() {
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

  const guardarProyecto = () => {
    if (!nombreProyecto.trim()) {
      alert('Por favor ingresa un nombre para el proyecto');
      return;
    }
    
    if (!resultado) {
      alert('Primero debes calcular el precio');
      return;
    }

    const proyectos = JSON.parse(localStorage.getItem('proyectos') || '[]');
    const nuevoProyecto = {
      id: Date.now(),
      nombre: nombreProyecto,
      fecha: new Date().toISOString(),
      materiales,
      manoObra,
      porcentajes,
      resultado,
    };
    
    proyectos.push(nuevoProyecto);
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    
    alert('Proyecto guardado exitosamente');
    setNombreProyecto('');
  };

  const exportarPDF = () => {
    alert('Función de exportación PDF en desarrollo');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={calcularPrecio} className="space-y-6">
        {/* Nombre del Proyecto */}
        <div className="card">
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
          />
        </div>

        {/* Sección Materiales */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-500 rounded-lg flex items-center justify-center">
              <Package2 className="w-5 h-5 text-dark-950" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Materiales</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-3">
                <label className="label">
                  Hilo {num}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Gramos usados"
                      className="input-field"
                      onChange={(e) => actualizarMaterial(`material_${num}`, 'gramos', e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Precio x 100g"
                      className="input-field"
                      onChange={(e) => actualizarMaterial(`material_${num}`, 'precio_100g', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-3">
              <label className="label">
                Relleno
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Gramos usados"
                    className="input-field"
                    onChange={(e) => actualizarMaterial('material_4', 'gramos', e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Precio x 100g"
                    className="input-field"
                    onChange={(e) => actualizarMaterial('material_4', 'precio_100g', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="label">
                Accesorios (Ojitos, bordados, botones, etc.)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Costo total de accesorios"
                className="input-field"
                onChange={(e) => actualizarMaterial('material_5', 'costo_directo', e.target.value)}
              />
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
              <label className="label">
                Horas trabajadas
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="0"
                className="input-field"
                onChange={(e) => setManoObra(prev => ({ ...prev, horas: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-3">
              <label className="label">
                Costo por hora
              </label>
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
              <label className="label">
                Costo de empaque
              </label>
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
              <label className="label">
                Herramientas (%)
              </label>
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
              <label className="label">
                Gastos Indirectos (%)
              </label>
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
              <label className="label">
                Utilidad (%)
              </label>
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center shadow-glow">
                <DollarSign className="w-7 h-7 text-dark-950" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Resultado</h2>
                <p className="text-dark-500">Precio calculado</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={guardarProyecto}
                className="btn-secondary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </button>
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
