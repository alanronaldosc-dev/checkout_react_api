import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import UsuariosPage from './pages/UsuariosPage';
import AsistenciasPage from './pages/AsistenciasPage';

function App() {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('admin');
    return stored ? JSON.parse(stored) : null;
  });
  const [pagina, setPagina] = useState('usuarios');

  const handleLogin = (data) => setAdmin(data);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  if (!admin) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{
        background: '#1e293b', color: '#fff',
        padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '24px'
      }}>
        <span style={{ fontSize: '22px' }}>🏢</span>
        <span style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '16px' }}>Sistema de Checkout</span>
        <button onClick={() => setPagina('usuarios')} style={navBtn(pagina === 'usuarios')}>
          👤 Usuarios
        </button>
        <button onClick={() => setPagina('asistencias')} style={navBtn(pagina === 'asistencias')}>
          📋 Asistencias
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>
            {admin.nombre} {admin.apellidos}
          </span>
          <button onClick={handleLogout} style={btnLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main style={{ padding: '16px' }}>
        {pagina === 'usuarios' ? <UsuariosPage /> : <AsistenciasPage />}
      </main>
    </div>
  );
}

const navBtn = (activo) => ({
  padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
  background: activo ? '#2563eb' : 'transparent',
  color: '#fff', fontWeight: activo ? 'bold' : 'normal', fontSize: '14px',
});
const btnLogout = {
  padding: '6px 14px', background: '#ef4444', color: '#fff',
  border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
};

export default App;
