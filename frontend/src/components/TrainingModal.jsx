const TrainingModal = ({ formData, setFormData, onClose, onSubmit }) => {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div className="modal-content p-4">
          <h2 className="h5 fw-bold mb-4">Nuevo Entrenamiento</h2>
          <form onSubmit={onSubmit}>
            {[
              { name: 'titulo', type: 'text', placeholder: 'Título' },
              { name: 'fecha', type: 'datetime-local', placeholder: 'Fecha' },
              { name: 'duracion', type: 'number', placeholder: 'Duración (min)' },
              { name: 'ubicacion', type: 'text', placeholder: 'Ubicación' },
              { name: 'tipo', type: 'text', placeholder: 'Tipo' },
              { name: 'categoria', type: 'text', placeholder: 'Categoría' }
            ].map(({ name, type, placeholder }) => (
              <div className="mb-3" key={name}>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={e => setFormData({ ...formData, [name]: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <textarea
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                className="form-control"
                rows="3"
                required
              />
            </div>

            <div className="d-flex justify-content-between pt-2">
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainingModal;
