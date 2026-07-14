import { useState } from 'react';
import UsuariosPage from './pages/UsuariosPage';
import AsistenciasPage from './pages/AsistenciasPage';

function App() {
  const [pagina, setPagina] = useState('usuarios');

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
  color: '#fff', fontWeight: activo ? 'bold' : 'normal', fontSize: '14px'
});

export default App;
