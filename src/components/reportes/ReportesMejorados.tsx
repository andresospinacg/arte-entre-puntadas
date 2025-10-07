import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Package2, 
  FolderOpen,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Award
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Proyecto {
  id: number;
  nombre: string;
  fecha: string;
  materiales?: any;
  resultado: {
    precio_final: number;
    subtotal_materiales?: number;
    mano_obra?: number;
    utilidad?: number;
    herramientas?: number;
    gastos_indirectos?: number;
  };
}

interface Material {
  id: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  precio: number;
}

export default function ReportesMejorados() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [estadisticas, setEstadisticas] = useState({
    totalProyectos: 0,
    valorTotal: 0,
    precioPromedio: 0,
    totalMateriales: 0,
    proyectoMasRentable: null as Proyecto | null,
    materiaMasCara: null as Material | null,
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos') || '[]');
    const materialesGuardados = JSON.parse(localStorage.getItem('inventario') || '[]');
    
    setProyectos(proyectosGuardados);
    setMateriales(materialesGuardados);

    // Calcular estadísticas
    const totalProyectos = proyectosGuardados.length;
    const valorTotal = proyectosGuardados.reduce((sum: number, p: Proyecto) => 
      sum + (p.resultado?.precio_final || 0), 0
    );
    const precioPromedio = totalProyectos > 0 ? valorTotal / totalProyectos : 0;
    
    // Proyecto más rentable
    const proyectoMasRentable = proyectosGuardados.reduce((max: Proyecto | null, p: Proyecto) => {
      if (!max || (p.resultado?.utilidad || 0) > (max.resultado?.utilidad || 0)) {
        return p;
      }
      return max;
    }, null);

    // Material más caro
    const materiaMasCara = materialesGuardados.reduce((max: Material | null, m: Material) => {
      if (!max || m.precio > max.precio) {
        return m;
      }
      return max;
    }, null);

    setEstadisticas({
      totalProyectos,
      valorTotal,
      precioPromedio,
      totalMateriales: materialesGuardados.length,
      proyectoMasRentable,
      materiaMasCara,
    });
  };

  const formatearMoneda = (valor: number) => {
    return `$${valor.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Datos para gráfico de proyectos por mes
  const obtenerDatosProyectosPorMes = () => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const proyectosPorMes = new Array(12).fill(0);
    
    proyectos.forEach(p => {
      const fecha = new Date(p.fecha);
      const mes = fecha.getMonth();
      proyectosPorMes[mes]++;
    });

    return {
      labels: meses,
      datasets: [
        {
          label: 'Proyectos',
          data: proyectosPorMes,
          backgroundColor: '#facc15',
          borderColor: '#facc15',
          borderWidth: 2,
        },
      ],
    };
  };

  // Datos para gráfico de distribución de costos
  const obtenerDatosDistribucionCostos = () => {
    const totalMateriales = proyectos.reduce((sum, p) => sum + (p.resultado?.subtotal_materiales || 0), 0);
    const totalManoObra = proyectos.reduce((sum, p) => sum + (p.resultado?.mano_obra || 0), 0);
    const totalUtilidad = proyectos.reduce((sum, p) => sum + (p.resultado?.utilidad || 0), 0);
    const totalOtros = proyectos.reduce((sum, p) => 
      sum + (p.resultado?.herramientas || 0) + (p.resultado?.gastos_indirectos || 0), 0
    );

    return {
      labels: ['Materiales', 'Mano de Obra', 'Utilidad', 'Otros'],
      datasets: [
        {
          data: [totalMateriales, totalManoObra, totalUtilidad, totalOtros],
          backgroundColor: ['#facc15', '#22c55e', '#3b82f6', '#8b5cf6'],
          borderColor: ['#facc15', '#22c55e', '#3b82f6', '#8b5cf6'],
          borderWidth: 2,
        },
      ],
    };
  };

  // Datos para gráfico de tendencia de precios
  const obtenerDatosTendenciaPrecios = () => {
    const proyectosOrdenados = [...proyectos]
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(-10); // Últimos 10 proyectos

    return {
      labels: proyectosOrdenados.map(p => {
        const fecha = new Date(p.fecha);
        return `${fecha.getDate()}/${fecha.getMonth() + 1}`;
      }),
      datasets: [
        {
          label: 'Precio Final',
          data: proyectosOrdenados.map(p => p.resultado?.precio_final || 0),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  // Datos para materiales más usados
  const obtenerMaterialesMasUsados = () => {
    const tiposMateriales: Record<string, number> = {};
    
    materiales.forEach(m => {
      tiposMateriales[m.tipo] = (tiposMateriales[m.tipo] || 0) + 1;
    });

    const tipos = Object.keys(tiposMateriales);
    const cantidades = Object.values(tiposMateriales);

    return {
      labels: tipos.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
      datasets: [
        {
          label: 'Cantidad',
          data: cantidades,
          backgroundColor: ['#facc15', '#22c55e', '#3b82f6', '#8b5cf6'],
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Tarjetas de estadísticas principales */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-primary-400/20 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <p className="text-dark-500 text-sm mb-1">Total Proyectos</p>
          <p className="text-3xl font-bold text-white">{estadisticas.totalProyectos}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-accent-400/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-accent-400" />
            </div>
          </div>
          <p className="text-dark-500 text-sm mb-1">Valor Total</p>
          <p className="text-3xl font-bold text-white">{formatearMoneda(estadisticas.valorTotal)}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-dark-500 text-sm mb-1">Precio Promedio</p>
          <p className="text-3xl font-bold text-white">{formatearMoneda(estadisticas.precioPromedio)}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center">
              <Package2 className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="text-dark-500 text-sm mb-1">Materiales</p>
          <p className="text-3xl font-bold text-white">{estadisticas.totalMateriales}</p>
        </div>
      </div>

      {/* Insights destacados */}
      {(estadisticas.proyectoMasRentable || estadisticas.materiaMasCara) && (
        <div className="grid md:grid-cols-2 gap-6">
          {estadisticas.proyectoMasRentable && (
            <div className="card bg-gradient-to-br from-accent-400/10 to-transparent border-accent-400/30">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-8 h-8 text-accent-400" />
                <h3 className="text-lg font-bold text-white">Proyecto Más Rentable</h3>
              </div>
              <p className="text-xl font-semibold text-white mb-2">
                {estadisticas.proyectoMasRentable.nombre}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-dark-500">Utilidad:</span>
                <span className="text-2xl font-bold text-accent-400">
                  {formatearMoneda(estadisticas.proyectoMasRentable.resultado?.utilidad || 0)}
                </span>
              </div>
            </div>
          )}

          {estadisticas.materiaMasCara && (
            <div className="card bg-gradient-to-br from-primary-400/10 to-transparent border-primary-400/30">
              <div className="flex items-center space-x-3 mb-3">
                <Package2 className="w-8 h-8 text-primary-400" />
                <h3 className="text-lg font-bold text-white">Material Más Caro</h3>
              </div>
              <p className="text-xl font-semibold text-white mb-2">
                {estadisticas.materiaMasCara.nombre}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-dark-500">Precio:</span>
                <span className="text-2xl font-bold text-primary-400">
                  {formatearMoneda(estadisticas.materiaMasCara.precio)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Gráficas */}
      {proyectos.length > 0 && (
        <>
          {/* Proyectos por mes y Tendencia */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-primary-400" />
                <h3 className="text-xl font-bold text-white">Proyectos por Mes</h3>
              </div>
              <div style={{ height: '300px' }}>
                <Bar data={obtenerDatosProyectosPorMes()} options={chartOptions} />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-accent-400" />
                <h3 className="text-xl font-bold text-white">Tendencia de Precios</h3>
              </div>
              <div style={{ height: '300px' }}>
                <Line data={obtenerDatosTendenciaPrecios()} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Distribución de costos y Materiales */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <PieChartIcon className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Distribución de Costos</h3>
              </div>
              <div style={{ height: '300px' }}>
                <Doughnut data={obtenerDatosDistribucionCostos()} options={doughnutOptions} />
              </div>
            </div>

            {materiales.length > 0 && (
              <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                  <Package2 className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Tipos de Materiales</h3>
                </div>
                <div style={{ height: '300px' }}>
                  <Bar data={obtenerMaterialesMasUsados()} options={chartOptions} />
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Estado vacío */}
      {proyectos.length === 0 && (
        <div className="card text-center py-16">
          <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-10 h-10 text-dark-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No hay datos para mostrar</h3>
          <p className="text-dark-500 mb-6">Crea algunos proyectos para ver las estadísticas y gráficas</p>
          <a href="/calculadora" className="btn-primary inline-block">Ir a Calculadora</a>
        </div>
      )}
    </div>
  );
}
