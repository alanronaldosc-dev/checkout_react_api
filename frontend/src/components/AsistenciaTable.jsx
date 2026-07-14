export default function AsistenciaTable({ asistencias, usuarios, onEdit }) {
  // Construye un mapa id -> nombre completo para búsqueda rápida
  const usuarioMap = {};
  usuarios.forEach((u) => {
    usuarioMap[u.id] = `${u.nombre} ${u.apellidos}`;
  });

  if (asistencias.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888' }}>No hay asistencias registradas.</p>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1e293b', color: '#fff' }}>
            <th style={th}>Empleado</th>
            <th style={th}>Fecha</th>
            <th style={th}>Tipo Registro</th>
            <th style={th}>Timestamp</th>
            <th style={th}>Método</th>
            <th style={th}>Resultado</th>
            <th style={th}>Estado</th>
            <th style={th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map((a, i) => (
            <tr key={a.id} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
              <td style={td}>
                {usuarioMap[a.usuarioId] || (
                  <span style={{ color: '#9ca3af', fontSize: '12px' }}>{a.usuarioId}</span>
                )}
              </td>
              <td style={td}>{a.fecha}</td>
              <td style={td}>
                <span style={{
                  padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                  background: a.tipoRegistro === 'entrada' ? '#2563eb' : '#7c3aed', color: '#fff'
                }}>
                  {a.tipoRegistro}
                </span>
              </td>
              <td style={td}>{a.timestamp ? new Date(a.timestamp).toLocaleString() : '-'}</td>
              <td style={td}>{a.verificacion?.metodo || '-'}</td>
              <td style={td}>
                <span style={{
                  color: a.verificacion?.resultado === 'exitoso' ? '#16a34a' : '#dc2626',
                  fontWeight: 'bold'
                }}>
                  {a.verificacion?.resultado || '-'}
                </span>
              </td>
              <td style={td}>
                <span style={{
                  padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                  background: a.estadoAsistencia === 'a tiempo' ? '#10b981'
                    : a.estadoAsistencia === 'tardanza' ? '#f59e0b' : '#ef4444',
                  color: '#fff'
                }}>
                  {a.estadoAsistencia}
                </span>
              </td>
              <td style={td}>
                <button onClick={() => onEdit(a)} style={btnEdit}>✏️ Editar</button>
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
  padding: '4px 10px', background: '#f59e0b',
  color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'
};
