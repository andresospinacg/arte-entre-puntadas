/**
 * Módulo de cálculos para amigurumis
 * Migrado desde calculos.py
 */

export interface Material {
  gramos?: number;
  precio_100g?: number;
  costo_directo?: number;
  unidad?: string;
}

export interface ManoDeObra {
  horas: number;
  costo_hora: number;
  empaques: number;
}

export interface Porcentajes {
  herramientas: number;
  indirectos: number;
  utilidad: number;
}

export interface ResultadoCalculo {
  materiales: Record<string, number>;
  subtotal_materiales: number;
  mano_obra: number;
  empaques: number;
  subtotal_1: number;
  herramientas: number;
  gastos_indirectos: number;
  utilidad: number;
  precio_final: number;
}

export class CalculadoraAmigurumi {
  private moneda: string = 'COP';
  private simboloMoneda: string = '$';

  /**
   * Calcula el costo de un material
   */
  calcularCostoMaterial(
    cantidadUsada: number,
    precioPor100gr: number,
    esPorUnidad: boolean = false
  ): number {
    try {
      if (esPorUnidad) {
        // Para unidades: cantidad × precio unitario
        return cantidadUsada * precioPor100gr;
      } else {
        // Para gramos: (cantidad × precio) / 100
        return (cantidadUsada * precioPor100gr) / 100;
      }
    } catch (error) {
      return 0;
    }
  }

  /**
   * Calcula el costo de mano de obra
   */
  calcularManoDeObra(horasTrabajadas: number, costoPorHora: number): number {
    try {
      return horasTrabajadas * costoPorHora;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Calcula un porcentaje sobre un subtotal
   */
  calcularPorcentaje(subtotal: number, porcentaje: number): number {
    try {
      return (subtotal * porcentaje) / 100;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Calcula el precio completo de un amigurumi
   */
  calcularPrecioCompleto(
    materiales: Record<string, Material>,
    manoObra: ManoDeObra,
    porcentajes: Porcentajes
  ): ResultadoCalculo {
    const resultado: ResultadoCalculo = {
      materiales: {},
      subtotal_materiales: 0,
      mano_obra: 0,
      empaques: 0,
      subtotal_1: 0,
      herramientas: 0,
      gastos_indirectos: 0,
      utilidad: 0,
      precio_final: 0,
    };

    try {
      // Calcular costo de cada material
      for (let i = 1; i <= 5; i++) {
        const key = `material_${i}`;
        if (materiales[key]) {
          const mat = materiales[key];
          let costo = 0;

          if (i < 5) {
            // Materiales 1-4: detectar si es por unidad o gramos
            const cantidad = mat.gramos || 0;
            const precio = mat.precio_100g || 0;
            const unidad = mat.unidad || 'gramos';

            // Si la unidad es 'unidades' o 'metros', calcular directamente
            const esPorUnidad = ['unidades', 'unidad', 'metros'].includes(unidad);

            costo = this.calcularCostoMaterial(cantidad, precio, esPorUnidad);
          } else {
            // Material 5: costo directo
            costo = mat.costo_directo || 0;
          }

          resultado.materiales[key] = costo;
          resultado.subtotal_materiales += costo;
        }
      }

      // Calcular mano de obra
      resultado.mano_obra = this.calcularManoDeObra(
        manoObra.horas,
        manoObra.costo_hora
      );
      resultado.empaques = manoObra.empaques;

      // Subtotal 1
      resultado.subtotal_1 =
        resultado.subtotal_materiales + resultado.mano_obra + resultado.empaques;

      // Calcular porcentajes
      resultado.herramientas = this.calcularPorcentaje(
        resultado.subtotal_1,
        porcentajes.herramientas
      );
      resultado.gastos_indirectos = this.calcularPorcentaje(
        resultado.subtotal_1,
        porcentajes.indirectos
      );
      resultado.utilidad = this.calcularPorcentaje(
        resultado.subtotal_1,
        porcentajes.utilidad
      );

      // Precio final
      resultado.precio_final =
        resultado.subtotal_1 +
        resultado.herramientas +
        resultado.gastos_indirectos +
        resultado.utilidad;
    } catch (error) {
      console.error('Error en cálculo:', error);
    }

    return resultado;
  }

  /**
   * Formatea un valor como moneda colombiana
   */
  formatearMoneda(valor: number): string {
    try {
      return `${this.simboloMoneda} ${valor.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} ${this.moneda}`;
    } catch (error) {
      return `${this.simboloMoneda} 0 ${this.moneda}`;
    }
  }
}

// Exportar instancia singleton
export const calculadora = new CalculadoraAmigurumi();
