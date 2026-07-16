import { useState } from 'react';
import { login } from '../api/authApi';

export default function LoginPage({ onLogin }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(correo, password);
      localStorage.setItem('admin', JSON.stringify(res.data));
      onLogin(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.status === 403
        ? 'Acceso denegado: solo administradores pueden ingresar'
        : 'Correo o contraseña incorrectos';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlay}>
      <div style={card}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '40px' }}>🏢</span>
          <h1 style={{ margin: '8px 0 4px', fontSize: '22px', color: '#1e293b' }}>
            Sistema de Checkout
          </h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            Acceso exclusivo para administradores
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={lbl}>
            Correo electrónico
            <input
              style={inp}
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="admin@correo.com"
              required
              autoFocus
            />
          </label>

          <label style={{ ...lbl, marginTop: '14px' }}>
            Contraseña
            <input
              style={inp}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && (
            <div style={errorBox}>{error}</div>
          )}

          <button type="submit" disabled={loading} style={btnLogin}>
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

const overlay = {
  minHeight: '100vh', background: '#f1f5f9',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const card = {
  background: '#fff', borderRadius: '16px', padding: '40px',
  width: '100%', maxWidth: '400px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
};
const lbl = {
  display: 'flex', flexDirection: 'column', gap: '6px',
  fontSize: '14px', color: '#374151', fontWeight: '500',
};
const inp = {
  padding: '10px 14px', border: '1px solid #d1d5db',
  borderRadius: '8px', fontSize: '15px',
};
const errorBox = {
  marginTop: '14px', padding: '10px 14px',
  background: '#fee2e2', border: '1px solid #fca5a5',
  borderRadius: '8px', color: '#b91c1c', fontSize: '14px',
};
const btnLogin = {
  marginTop: '20px', width: '100%', padding: '12px',
  background: '#2563eb', color: '#fff', border: 'none',
  borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
  cursor: 'pointer',
};
