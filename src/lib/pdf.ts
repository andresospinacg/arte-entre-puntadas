/**
 * Generación de PDFs para cotizaciones
 * Migrado desde exportar_pdf.py
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ResultadoCalculo } from './calculos';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface DatosProyecto {
  nombre: string;
  cliente: string;
  descripcion?: string;
}

export class GeneradorPDF {
  private colorPrimario = '#8B4513'; // Marrón cálido
  private colorFondoClaro = '#F5F5DC'; // Beige claro

  /**
   * Genera un PDF de cotización profesional
   */
  generarCotizacion(
    datosProyecto: DatosProyecto,
    resultado: ResultadoCalculo,
    logoBase64?: string
  ): jsPDF {
    const doc = new jsPDF();

    this.dibujarEncabezado(doc, datosProyecto, logoBase64);
    this.dibujarInformacionProyecto(doc, datosProyecto);
    this.dibujarDesgloseCostos(doc, resultado);
    this.dibujarTotal(doc, resultado);
    this.dibujarPiePagina(doc);

    return doc;
  }

  private dibujarEncabezado(doc: jsPDF, _datosProyecto: DatosProyecto, logoBase64?: string) {
    const pageWidth = doc.internal.pageSize.getWidth();

    // Fondo decorativo superior
    doc.setFillColor(this.colorFondoClaro);
    doc.rect(0, 0, pageWidth, 50, 'F');

    // Logo (si está disponible)
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, 'PNG', 15, 10, 35, 35);
      } catch (error) {
        console.error('Error al agregar logo:', error);
      }
    }

    // Título principal
    doc.setFontSize(24);
    doc.setTextColor(this.colorPrimario);
    doc.setFont('helvetica', 'bold');
    doc.text('Arte Entre Puntadas', 60, 20);

    // Subtítulo
    doc.setFontSize(12);
    doc.setTextColor('#555555');
    doc.setFont('helvetica', 'normal');
    doc.text('Amigurumis Artesanales', 60, 28);

    // Línea decorativa
    doc.setDrawColor(this.colorPrimario);
    doc.setLineWidth(1);
    doc.line(60, 32, pageWidth - 15, 32);

    // COTIZACIÓN
    doc.setFontSize(16);
    doc.setTextColor(this.colorPrimario);
    doc.setFont('helvetica', 'bold');
    doc.text('COTIZACIÓN', 60, 42);

    // Fecha
    doc.setFontSize(10);
    doc.setTextColor('#000000');
    doc.setFont('helvetica', 'normal');
    const fechaActual = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es });
    doc.text(`Fecha: ${fechaActual}`, 60, 48);
  }

  private dibujarInformacionProyecto(doc: jsPDF, datosProyecto: DatosProyecto) {
    let y = 60;

    // Título de sección
    doc.setFontSize(12);
    doc.setTextColor(this.colorPrimario);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DEL PROYECTO', 15, y);

    y += 8;

    // Cuadro con información
    doc.setFillColor('#FFFFFF');
    doc.setDrawColor('#CCCCCC');
    doc.setLineWidth(0.5);
    doc.roundedRect(15, y, 180, 30, 2, 2, 'FD');

    y += 8;

    // Contenido
    doc.setFontSize(10);
    doc.setTextColor('#000000');

    // Proyecto
    doc.setFont('helvetica', 'bold');
    doc.text('Proyecto:', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(datosProyecto.nombre, 45, y);

    y += 7;

    // Cliente
    doc.setFont('helvetica', 'bold');
    doc.text('Cliente:', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(datosProyecto.cliente, 45, y);

    // Descripción (si existe)
    if (datosProyecto.descripcion && datosProyecto.descripcion.trim()) {
      y += 7;
      doc.setFont('helvetica', 'bold');
      doc.text('Descripción:', 20, y);
      doc.setFont('helvetica', 'normal');
      const descripcion =
        datosProyecto.descripcion.length > 60
          ? datosProyecto.descripcion.substring(0, 57) + '...'
          : datosProyecto.descripcion;
      doc.text(descripcion, 45, y);
    }
  }

  private dibujarDesgloseCostos(doc: jsPDF, resultado: ResultadoCalculo) {
    let y = 105;

    // Título de sección
    doc.setFontSize(12);
    doc.setTextColor(this.colorPrimario);
    doc.setFont('helvetica', 'bold');
    doc.text('DESGLOSE DE COSTOS', 15, y);

    y += 10;

    // Preparar datos para la tabla (versión simplificada para cliente)
    const datosTabla: any[][] = [];

    // Solo conceptos principales
    if (resultado.subtotal_materiales > 0) {
      datosTabla.push([
        'Materiales y accesorios',
        this.formatearMoneda(resultado.subtotal_materiales),
      ]);
    }

    const manoObraTotal = resultado.mano_obra + resultado.empaques;
    if (manoObraTotal > 0) {
      datosTabla.push([
        'Elaboración y presentación',
        this.formatearMoneda(manoObraTotal),
      ]);
    }

    const costosOperacionales =
      resultado.herramientas + resultado.gastos_indirectos + resultado.utilidad;
    if (costosOperacionales > 0) {
      datosTabla.push([
        'Costos operacionales',
        this.formatearMoneda(costosOperacionales),
      ]);
    }

    // Generar tabla
    autoTable(doc, {
      startY: y,
      head: [['CONCEPTO', 'MONTO (COP)']],
      body: datosTabla,
      theme: 'grid',
      headStyles: {
        fillColor: this.colorPrimario,
        textColor: '#FFFFFF',
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center',
      },
      bodyStyles: {
        fontSize: 10,
      },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: 60, halign: 'right', fontStyle: 'bold' },
      },
      alternateRowStyles: {
        fillColor: this.colorFondoClaro,
      },
    });
  }

  private dibujarTotal(doc: jsPDF, resultado: ResultadoCalculo) {
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 200;

    // Caja destacada para el precio final
    doc.setFillColor(this.colorPrimario);
    doc.setDrawColor(this.colorPrimario);
    doc.setLineWidth(1);
    doc.roundedRect(15, y, pageWidth - 30, 25, 3, 3, 'FD');

    // Texto "PRECIO FINAL"
    doc.setFontSize(14);
    doc.setTextColor('#FFFFFF');
    doc.setFont('helvetica', 'bold');
    doc.text('PRECIO FINAL', 20, y + 10);

    // Monto total
    doc.setFontSize(20);
    const precioFinal = this.formatearMoneda(resultado.precio_final);
    const precioWidth = doc.getTextWidth(precioFinal);
    doc.text(precioFinal, (pageWidth - precioWidth) / 2, y + 18);

    y += 32;

    // Notas informativas
    doc.setFontSize(8);
    doc.setTextColor('#666666');
    doc.setFont('helvetica', 'italic');
    doc.text('• Cotización válida por 30 días', 20, y);
    doc.text(
      '• Todos los precios incluyen materiales, elaboración y presentación',
      20,
      y + 4
    );
    doc.text('• Tiempos de entrega según disponibilidad', 20, y + 8);
  }

  private dibujarPiePagina(doc: jsPDF) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = pageHeight - 20;

    // Línea decorativa
    doc.setDrawColor(this.colorPrimario);
    doc.setLineWidth(0.5);
    doc.line(15, y, pageWidth - 15, y);

    y += 5;

    // Texto principal
    doc.setFontSize(10);
    doc.setTextColor(this.colorPrimario);
    doc.setFont('helvetica', 'bold');
    doc.text('Arte Entre Puntadas', pageWidth / 2, y, { align: 'center' });

    y += 5;

    // Subtexto
    doc.setFontSize(8);
    doc.setTextColor('#666666');
    doc.setFont('helvetica', 'normal');
    doc.text('Amigurumis Artesanales - Hechos con amor', pageWidth / 2, y, {
      align: 'center',
    });

    y += 4;

    // Mensaje de agradecimiento
    doc.setFontSize(7);
    doc.setTextColor('#999999');
    doc.setFont('helvetica', 'italic');
    doc.text('¡Gracias por confiar en nosotros!', pageWidth / 2, y, {
      align: 'center',
    });
  }

  private formatearMoneda(valor: number): string {
    try {
      return `$ ${valor.toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} COP`;
    } catch (error) {
      return '$ 0 COP';
    }
  }
}

// Exportar instancia
export const generadorPDF = new GeneradorPDF();
