import { useState, useEffect } from 'react';

const EMPTY = {
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  tipoUsuario: '1',
  estado: 'activo',
  detallesLaborales: { departamento: '', puesto: '', nomina_matricula: '' },
  biometria: { huella_digital_template: '', foto_perfil_url: '' },
};


export default function UsuarioForm({ inicial, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (inicial) {
      setForm({
        ...EMPTY,
        ...inicial,
        detallesLaborales: { ...EMPTY.detallesLaborales, ...inicial.detallesLaborales },
        biometria: { ...EMPTY.biometria, ...inicial.biometria },
      });
    } else {
      setForm(EMPTY);
    }
  }, [inicial]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const setLaboral = (field, value) =>
    setForm((f) => ({ ...f, detallesLaborales: { ...f.detallesLaborales, [field]: value } }));

  const setBio = (field, value) =>
    setForm((f) => ({ ...f, biometria: { ...f.biometria, [field]: value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>{inicial ? 'Modificar Usuario' : 'Alta de Usuario'}</h3>

      <fieldset style={fs}>
        <legend style={legend}>Datos Generales</legend>
        <div style={row}>
          <label style={lbl}>
            Nombre *
            <input style={inp} value={form.nombre} onChange={(e) => set('nombre', e.target.value)} required />
          </label>
          <label style={lbl}>
            Apellidos *
            <input style={inp} value={form.apellidos} onChange={(e) => set('apellidos', e.target.value)} required />
          </label>
        </div>
        <div style={row}>
          <label style={lbl}>
            Correo *
            <input style={inp} type="email" value={form.correo} onChange={(e) => set('correo', e.target.value)} required />
          </label>
          <label style={lbl}>
            Tipo de usuario
            <select style={inp} value={form.tipoUsuario} onChange={(e) => set('tipoUsuario', e.target.value)}>
              <option value="0">0 - Administrador</option>
              <option value="1">1 - Empleado</option>
            </select>
          </label>
        </div>
        <label style={lbl}>
          Contraseña {!inicial && '*'}
          <input
            style={inp}
            type="password"
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            required={!inicial}
            placeholder={inicial ? 'Dejar vacío para no cambiar' : ''}
          />
        </label>
        <label style={lbl}>
          Estado
          <select style={inp} value={form.estado} onChange={(e) => set('estado', e.target.value)}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </label>
      </fieldset>

      <fieldset style={fs}>
        <legend style={legend}>Detalles Laborales</legend>
        <div style={row}>
          <label style={lbl}>
            Departamento
            <input style={inp} value={form.detallesLaborales.departamento}
              onChange={(e) => setLaboral('departamento', e.target.value)} />
          </label>
          <label style={lbl}>
            Puesto
            <input style={inp} value={form.detallesLaborales.puesto}
              onChange={(e) => setLaboral('puesto', e.target.value)} />
          </label>
        </div>
        <label style={lbl}>
          Nómina / Matrícula
          <input style={inp} value={form.detallesLaborales.nomina_matricula}
            onChange={(e) => setLaboral('nomina_matricula', e.target.value)} />
        </label>
      </fieldset>

      <fieldset style={fs}>
        <legend style={legend}>Biometría</legend>
        <label style={lbl}>
          URL Foto de Perfil
          <input style={inp} value={form.biometria.foto_perfil_url}
            onChange={(e) => setBio('foto_perfil_url', e.target.value)} />
        </label>
        <label style={lbl}>
          Huella Digital (template)
          <input style={inp} value={form.biometria.huella_digital_template}
            onChange={(e) => setBio('huella_digital_template', e.target.value)} />
        </label>
      </fieldset>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button type="button" onClick={onCancel} style={btnCancel}>Cancelar</button>
        <button type="submit" style={btnSave}>{inicial ? 'Guardar Cambios' : 'Crear Usuario'}</button>
      </div>
    </form>
  );
}

const fs = { border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' };
const legend = { fontWeight: 'bold', color: '#1e293b', padding: '0 6px' };
const row = { display: 'flex', gap: '12px' };
const lbl = { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, fontSize: '14px', color: '#374151' };
const inp = { padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', marginTop: '2px' };
const btnCancel = { padding: '8px 18px', background: '#e5e7eb', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const btnSave = { padding: '8px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
