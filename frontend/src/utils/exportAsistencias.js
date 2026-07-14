import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, HeadingLevel } from 'docx';

// Convierte los datos a filas planas para exportar
const construirFilas = (asistencias, usuarioMap) =>
  asistencias.map((a) => ({
    Empleado: usuarioMap[a.usuarioId] || a.usuarioId,
    Fecha: a.fecha || '',
    'Tipo Registro': a.tipoRegistro || '',
    Timestamp: a.timestamp ? new Date(a.timestamp).toLocaleString() : '',
    'Método Verificación': a.verificacion?.metodo || '',
    'Resultado Verificación': a.verificacion?.resultado || '',
    Observaciones: a.verificacion?.observaciones || '',
    'Estado Asistencia': a.estadoAsistencia || '',
  }));

// ─── EXCEL ───────────────────────────────────────────────────────────────────
export const exportarExcel = (asistencias, usuarioMap) => {
  const filas = construirFilas(asistencias, usuarioMap);
  const hoja = XLSX.utils.json_to_sheet(filas);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Asistencias');
  const buffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'asistencias.xlsx');
};

// ─── PDF ─────────────────────────────────────────────────────────────────────
export const exportarPDF = (asistencias, usuarioMap) => {
  const doc = new jsPDF({ orientation: 'landscape' });

  doc.setFontSize(16);
  doc.text('Reporte de Asistencias', 14, 16);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 22);

  const filas = construirFilas(asistencias, usuarioMap);
  const columnas = Object.keys(filas[0] || {});

  autoTable(doc, {
    startY: 28,
    head: [columnas],
    body: filas.map((f) => columnas.map((c) => f[c])),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 41, 59], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  doc.save('asistencias.pdf');
};

// ─── WORD ─────────────────────────────────────────────────────────────────────
export const exportarWord = async (asistencias, usuarioMap) => {
  const filas = construirFilas(asistencias, usuarioMap);
  const columnas = Object.keys(filas[0] || {});

  const encabezado = new TableRow({
    children: columnas.map(
      (col) =>
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: col, bold: true })] })],
          width: { size: Math.floor(100 / columnas.length), type: WidthType.PERCENTAGE },
        })
    ),
  });

  const filasDocs = filas.map(
    (f) =>
      new TableRow({
        children: columnas.map(
          (col) =>
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: String(f[col]) })] })],
              width: { size: Math.floor(100 / columnas.length), type: WidthType.PERCENTAGE },
            })
        ),
      })
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: 'Reporte de Asistencias',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: `Generado: ${new Date().toLocaleString()}`, color: '666666', size: 18 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [encabezado, ...filasDocs],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, 'asistencias.docx');
};
