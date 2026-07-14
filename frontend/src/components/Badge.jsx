export default function Badge({ tipo }) {
  const isAdmin = tipo === '0';
  return (
    <span
      style={{
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        background: isAdmin ? '#3b82f6' : '#10b981',
        color: '#fff',
      }}
    >
      {isAdmin ? 'Administrador' : 'Empleado'}
    </span>
  );
}
