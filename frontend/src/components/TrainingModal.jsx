const TrainingModal = ({ formData, setFormData, onClose, onSubmit }) => {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-4">
          <h2 className="h5 fw-bold mb-4">Nuevo Entrenamiento</h2>
          <form onSubmit={onSubmit}>
            {[
              { name: 'title', type: 'text', placeholder: 'Título' },
              { name: 'date', type: 'date', placeholder: 'Fecha' },
              { name: 'duration', type: 'number', placeholder: 'Duración (min)' },
              { name: 'location', type: 'text', placeholder: 'Ubicación' }
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
              <label htmlFor="typeSelect" className="form-label">Tipo</label>
              <select
                id="typeSelect"
                className="form-select"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="fitness">Físico</option>
                <option value="contact">Contacto</option>
                <option value="general movement">Movimiento general</option>
                <option value="technical">Técnico</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="categorySelect" className="form-label">Categoría</label>
              <select
                id="categorySelect"
                className="form-select"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>

            <div className="mb-3">
              <textarea
                placeholder="Descripción"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
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



