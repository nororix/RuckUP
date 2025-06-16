import React, { useState, useEffect } from 'react';
import { confirmAttendance, cancelAttendance, getAttendanceByTraining } from '../api/attendance';

const TrainingCard = ({ training, onEdit, onDelete, showActions, onViewAttendance, userRole, userId }) => {
  const canViewAttendance = userRole === 'player' || userRole === 'coach';
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    async function fetchMyAttendance() {
      if (userRole !== 'player') return;
      setLoading(true);
      try {
        const attendances = await getAttendanceByTraining(training._id);
        const myAttendance = attendances.find(a => a.player._id === userId);
        setAttendance(myAttendance || null);
      } catch (error) {
        console.error("Error cargando asistencia", error);
      }
      setLoading(false);
    }
    fetchMyAttendance();
  }, [training._id, userId, userRole]);

  async function handleConfirm() {
    setLoading(true);
    try {
      const newAttendance = await confirmAttendance(training._id);
      setAttendance(newAttendance);
    } catch (error) {
      alert('Error confirmando asistencia');
      console.error(error);
    }
    setLoading(false);
  }

  async function handleCancel() {
    if (!attendance) return;
    setLoading(true);
    try {
      await cancelAttendance(attendance._id);
      setAttendance(null);
    } catch (error) {
      alert('Error cancelando asistencia');
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <li className="list-group-item border rounded shadow-sm mb-3">
      <h2 className="h5 fw-semibold">{training.title}</h2>
      <p><strong>Fecha:</strong> {new Date(training.date).toLocaleDateString()}</p>
      <p><strong>Duración:</strong> {training.duration} min</p>
      <p><strong>Ubicación:</strong> {training.location}</p>
      <p><strong>Tipo:</strong> {training.type}</p>
      <p><strong>Categoría:</strong> {training.category}</p>
      <p><strong>Descripción:</strong> {training.description}</p>

      <div className="mt-3 d-flex gap-2 align-items-center">
        {userRole === 'player' && (
          loading ? (
            <span>Cargando...</span>
          ) : attendance ? (
            <button onClick={handleCancel} className="btn btn-warning btn-sm" disabled={loading}>
              Cancelar asistencia
            </button>
          ) : (
            <button onClick={handleConfirm} className="btn btn-success btn-sm" disabled={loading}>
              Confirmar asistencia
            </button>
          )
        )}

        {canViewAttendance && (
          <button
            onClick={() => onViewAttendance(training)}
            className="btn btn-info btn-sm"
          >
            Asistencia
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
