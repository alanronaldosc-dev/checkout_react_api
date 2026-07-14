import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/usuariosApi';
import UsuarioTable from '../components/UsuarioTable';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioModal from '../components/UsuarioModal';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null); // null = alta, objeto = editar

  const cargar = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getAll(busqueda);
      setUsuarios(res.data);
    } catch {
      setError('Error al cargar usuarios. Verifica que el backend esté corriendo en el puerto 8080.');
    } finally {
      setLoading(false);
    }
  }, [busqueda]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const abrirAlta = () => {
    setSeleccionado(null);
    setModalOpen(true);
  };

  const abrirEditar = (usuario) => {
    setSeleccionado(usuario);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setSeleccionado(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (seleccionado) {
        await api.update(seleccionado.id, formData);
      } else {
        await api.create(formData);
      }
      cerrarModal();
      cargar();
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Confirmas que deseas eliminar este usuario?')) return;
    try {
      await api.remove(id);
      cargar();
    } catch {
      alert('Error al eliminar el usuario.');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', color: '#1e293b' }}>Gestión de Usuarios</h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>
            Sistema de administración — CRUD completo
          </p>
        </div>
        <button onClick={abrirAlta} style={btnAdd}>+ Nuevo Usuario</button>
      </div>

      {/* Buscador */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '9px 14px', border: '1px solid #d1d5db',
            borderRadius: '8px', width: '280px', fontSize: '14px'
          }}
        />
      </div>

      {/* Estado de carga / error */}
      {loading && <p style={{ color: '#2563eb' }}>Cargando...</p>}
      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '12px 16px', color: '#b91c1c', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {/* Contador */}
      {!loading && !error && (
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>
          {usuarios.length} usuario(s) encontrado(s)
        </p>
      )}

      {/* Tabla */}
      <UsuarioTable usuarios={usuarios} onEdit={abrirEditar} onDelete={handleDelete} />

      {/* Modal */}
      <UsuarioModal open={modalOpen} onClose={cerrarModal}>
        <UsuarioForm
          inicial={seleccionado}
          onSubmit={handleSubmit}
          onCancel={cerrarModal}
        />
      </UsuarioModal>
    </div>
  );
}

const btnAdd = {
  padding: '10px 20px', background: '#2563eb', color: '#fff',
  border: 'none', borderRadius: '8px', cursor: 'pointer',
  fontSize: '15px', fontWeight: 'bold',
};
