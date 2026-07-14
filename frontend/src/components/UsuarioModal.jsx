export default function UsuarioModal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={closeBtn} aria-label="Cerrar">✕</button>
        {children}
      </div>
    </div>
  );
}

const overlay = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
};
const modal = {
  background: '#fff', borderRadius: '12px', padding: '28px',
  width: '90%', maxWidth: '680px', maxHeight: '90vh',
  overflowY: 'auto', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
};
const closeBtn = {
  position: 'absolute', top: '14px', right: '16px',
  background: 'none', border: 'none', fontSize: '18px',
  cursor: 'pointer', color: '#6b7280',
};
