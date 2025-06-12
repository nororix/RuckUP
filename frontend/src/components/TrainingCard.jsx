import React from 'react';

const TrainingCard = ({ training, onEdit, onDelete, showActions, onViewAttendance, userRole }) => {
  const canViewAttendance = userRole === 'jugador' || userRole === 'entrenador';

  return (
    <li className="list-group-item border rounded shadow-sm mb-3">
      <h2 className="h5 fw-semibold">{training.titulo}</h2>
      <p><strong>Fecha:</strong> {new Date(training.fecha).toLocaleString()}</p>
      <p><strong>Duración:</strong> {training.duracion} min</p>
      <p><strong>Ubicación:</strong> {training.ubicacion}</p>
      <p><strong>Tipo:</strong> {training.tipo}</p>
      <p><strong>Categoría:</strong> {training.categoria}</p>
      <p><strong>Descripción:</strong> {training.descripcion}</p>
      <p><strong>Creado por:</strong> {training.creadoPor?.nombre}</p>

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
