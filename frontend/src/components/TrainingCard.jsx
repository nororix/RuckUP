import React from 'react';

const TrainingCard = ({ training, onEdit, onDelete, showActions, onViewAttendance, userRole }) => {
  const canViewAttendance = userRole === 'player' || userRole === 'coach';

  return (
    <li className="list-group-item border rounded shadow-sm mb-3">
      <h2 className="h5 fw-semibold">{training.title}</h2>
      <p><strong>Fecha:</strong> {new Date(training.date).toLocaleDateString()}</p>
      <p><strong>Duración:</strong> {training.duration} min</p>
      <p><strong>Ubicación:</strong> {training.location}</p>
      <p><strong>Tipo:</strong> {training.type}</p>
      <p><strong>Categoría:</strong> {training.category}</p>
      <p><strong>Descripción:</strong> {training.description}</p>
      {/* <p><strong>Creado por:</strong> {training.createdBy?.name}</p> */}

      <div className="mt-3 d-flex gap-2">
        {canViewAttendance && (
          <button
            onClick={() => onViewAttendance(training)}
            className="btn btn-info btn-sm"
          >
            Ver asistencia
          </button>
        )}

        {showActions && (
          <>
            <button
              onClick={() => onEdit(training)}
              className="btn btn-primary btn-sm"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(training._id)}
              className="btn btn-danger btn-sm"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TrainingCard;

