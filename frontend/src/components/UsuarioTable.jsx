import Badge from './Badge';

export default function UsuarioTable({ usuarios, onEdit, onDelete }) {
  if (usuarios.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888' }}>No hay usuarios registrados.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1e293b', color: '#fff' }}>
            <th style={th}>Nombre</th>
            <th style={th}>Apellidos</th>
            <th style={th}>Correo</th>
            <th style={th}>Tipo</th>
            <th style={th}>Estado</th>
            <th style={th}>Departamento</th>
            <th style={th}>Puesto</th>
            <th style={th}>Nómina</th>
            <th style={th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, i) => (
            <tr key={u.id} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
              <td style={td}>{u.nombre}</td>
              <td style={td}>{u.apellidos}</td>
              <td style={td}>{u.correo}</td>
              <td style={td}><Badge tipo={u.tipoUsuario} /></td>
              <td style={td}>
                <span style={{
                  color: u.estado === 'activo' ? '#16a34a' : '#dc2626',
                  fontWeight: 'bold'
                }}>
                  {u.estado}
                </span>
              </td>
              <td style={td}>{u.detallesLaborales?.departamento || '-'}</td>
              <td style={td}>{u.detallesLaborales?.puesto || '-'}</td>
              <td style={td}>{u.detallesLaborales?.nomina_matricula || '-'}</td>
              <td style={td}>
                <button onClick={() => onEdit(u)} style={btnEdit}>✏️ Editar</button>
                <button onClick={() => onDelete(u.id)} style={btnDelete}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: '10px 14px', textAlign: 'left', fontWeight: '600' };
const td = { padding: '10px 14px', borderBottom: '1px solid #e2e8f0' };
const btnEdit = {
  marginRight: '6px', padding: '4px 10px', background: '#f59e0b',
  color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
};
const btnDelete = {
  padding: '4px 10px', background: '#ef4444',
  color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
};
