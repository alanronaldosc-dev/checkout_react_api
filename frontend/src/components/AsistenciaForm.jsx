import { useState, useEffect } from 'react';

const EMPTY = {
  usuarioId: '',
  tipoRegistro: 'entrada',
  estadoAsistencia: 'a tiempo',
  verificacion: { metodo: '', resultado: 'exitoso', observaciones: '' },
};

export default function AsistenciaForm({ inicial, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (inicial) {
      setForm({
        ...EMPTY,
        ...inicial,
        verificacion: { ...EMPTY.verificacion, ...inicial.verificacion },
      });
    } else {
      setForm(EMPTY);
    }
  }, [inicial]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const setVer = (field, value) =>
    setForm((f) => ({ ...f, verificacion: { ...f.verificacion, [field]: value } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Modificar Asistencia</h3>

      <fieldset style={fs}>
        <legend style={legend}>Datos de Asistencia</legend>
        <div style={row}>
          <label style={lbl}>
            Tipo de Registro
            <select style={inp} value={form.tipoRegistro} onChange={(e) => set('tipoRegistro', e.target.value)}>
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </label>
          <label style={lbl}>
            Estado de Asistencia
            <select style={inp} value={form.estadoAsistencia} onChange={(e) => set('estadoAsistencia', e.target.value)}>
              <option value="a tiempo">A tiempo</option>
              <option value="tardanza">Tardanza</option>
              <option value="falta">Falta</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset style={fs}>
        <legend style={legend}>Verificación</legend>
        <div style={row}>
          <label style={lbl}>
            Método
            <input style={inp} value={form.verificacion.metodo}
              onChange={(e) => setVer('metodo', e.target.value)} />
          </label>
          <label style={lbl}>
            Resultado
            <select style={inp} value={form.verificacion.resultado}
              onChange={(e) => setVer('resultado', e.target.value)}>
              <option value="exitoso">Exitoso</option>
              <option value="fallido">Fallido</option>
            </select>
          </label>
        </div>
        <label style={lbl}>
          Observaciones
          <input style={inp} value={form.verificacion.observaciones}
            onChange={(e) => setVer('observaciones', e.target.value)} />
        </label>
      </fieldset>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button type="button" onClick={onCancel} style={btnCancel}>Cancelar</button>
        <button type="submit" style={btnSave}>Guardar Cambios</button>
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
