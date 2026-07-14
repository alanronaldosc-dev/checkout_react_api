import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/asistenciasApi';
import { getAll as getUsuarios } from '../api/usuariosApi';
import AsistenciaTable from '../components/AsistenciaTable';
import AsistenciaForm from '../components/AsistenciaForm';
import UsuarioModal from '../components/UsuarioModal';
import { exportarExcel, exportarPDF, exportarWord } from '../utils/exportAsistencias';

export default function AsistenciasPage() {
  const [asistencias, setAsistencias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    getUsuarios().then((res) => setUsuarios(res.data)).catch(() => {});
  }, []);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getAll(filtroUsuario, filtroFecha);
      setAsistencias(res.data);
    } catch {
      setError('Error al cargar asistencias. Verifica que el backend esté corriendo en el puerto 8080.');
    } finally {
      setLoading(false);
    }
  }, [filtroUsuario, filtroFecha]);

  useEffect(() => { cargar(); }, [cargar]);

  // Mapa id -> nombre completo reutilizado en tabla y exportaciones
  const usuarioMap = {};
  usuarios.forEach((u) => { usuarioMap[u.id] = `${u.nombre} ${u.apellidos}`; });

  const abrirEditar = (asistencia) => { setSeleccionada(asistencia); setModalOpen(true); };
  const cerrarModal = () => { setModalOpen(false); setSeleccionada(null); };

  const handleSubmit = async (formData) => {
    try {
      await api.update(seleccionada.id, formData);
      cerrarModal();
      cargar();
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', color: '#1e293b' }}>Asistencias</h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>
            Consulta y edición de registros de asistencia
          </p>
        </div>
        {/* Botones de exportación */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => exportarExcel(asistencias, usuarioMap)} style={btnExport('#16a34a')}>
            📊 Excel
          </button>
          <button onClick={() => exportarPDF(asistencias, usuarioMap)} style={btnExport('#dc2626')}>
            📄 PDF
          </button>
          <button onClick={() => exportarWord(asistencias, usuarioMap)} style={btnExport('#2563eb')}>
            📝 Word
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Filtrar por Usuario ID..."
          value={filtroUsuario}
          onChange={(e) => setFiltroUsuario(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          style={inputStyle}
        />
        <button onClick={() => { setFiltroUsuario(''); setFiltroFecha(''); }} style={btnClear}>
          Limpiar filtros
        </button>
      </div>

      {loading && <p style={{ color: '#2563eb' }}>Cargando...</p>}
      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '12px 16px', color: '#b91c1c', marginBottom: '16px' }}>
          {error}
        </div>
      )}
      {!loading && !error && (
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
          {asistencias.length} registro(s) encontrado(s)
        </p>
      )}

      <AsistenciaTable asistencias={asistencias} usuarios={usuarios} onEdit={abrirEditar} />

      <UsuarioModal open={modalOpen} onClose={cerrarModal}>
        <AsistenciaForm inicial={seleccionada} onSubmit={handleSubmit} onCancel={cerrarModal} />
      </UsuarioModal>
    </div>
  );
}

const inputStyle = { padding: '9px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' };
const btnClear = { padding: '9px 14px', background: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' };
const btnExport = (color) => ({
  padding: '8px 16px', background: color, color: '#fff',
  border: 'none', borderRadius: '8px', cursor: 'pointer',
  fontSize: '14px', fontWeight: 'bold',
});
