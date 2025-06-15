import React, { useState, useEffect } from 'react';
import { getAttendanceByTraining, updateAttendance } from '../api/attendance';
import { useAuth } from '../context/useAuth';

export default function AttendanceModal({ show, onClose, training }) {
  const { user } = useAuth();
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

 // useEffect(() => {
    //if (show && training) {
      //setLoading(true);
      //getAttendanceByTraining(training._id)
        //.then(data => setAttendances(data))
        //.catch(err => alert(err.message))
        //.finally(() => setLoading(false));
    //}
  //}, [show, training]);
  useEffect(() => {
  if (show && training?._id) {
    setLoading(true);
    getAttendanceByTraining(training._id)
      .then(data => setAttendances(data))
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  }
}, [show, training?._id]);


  function toggleAttendance(index) {
    const updated = [...attendances];
    updated[index].present = !updated[index].present;  
    setAttendances(updated);
  }

  async function handleSave() {
    setSaving(true);
    try {
      for (const attendance of attendances) {
        await updateAttendance(attendance._id, { present: attendance.present });  // Cambiado aquí
      }
      alert('Asistencias guardadas');
      onClose();
    } catch {
      alert('Error guardando asistencias');
    } finally {
      setSaving(false);
    }
  }

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Asistencia: {training.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <ul className="list-group">
                {attendances.map((a, i) => (
                  <li key={a._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {a.player.name}
                    <input
                      type="checkbox"
                      checked={a.present}  
                      onChange={() => toggleAttendance(i)}
                      disabled={
                        saving ||
                        (user.role === 'player' && user._id !== a.player._id)
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

