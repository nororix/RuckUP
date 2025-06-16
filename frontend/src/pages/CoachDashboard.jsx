import { useState, useEffect } from 'react';
import TrainingList from '../components/TrainingList';
import TrainingModal from '../components/TrainingModal';
import { useAuth } from "../context/useAuth";
import { getTrainings, createTraining, updateTraining, deleteTraining } from '../api/trainings';
import { getAttendanceByTraining } from '../api/attendance';

const CoachDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', date: '', duration: '', location: '',
    type: '', category: '', description: ''
  });
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const { logout } = useAuth();


  const upcomingTrainings = trainings.filter(t => new Date(t.date) > new Date());

  const fetchData = async () => {
    try {
      const data = await getTrainings();
      setTrainings(data);
    } catch {
      setError('Error loading trainings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updatedTraining = await updateTraining(editingId, formData);
        setTrainings(prev =>
          prev.map(t => (t._id === editingId ? updatedTraining : t))
        );
      } else {
        const newTraining = await createTraining(formData);
        setTrainings(prev => [...prev, newTraining]);
      }

      setFormData({
        title: '', date: '', duration: '', location: '',
        type: '', category: '', description: ''
      });
      setEditingId(null);
      setShowModal(false);
    } catch {
      setError('Error saving training');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTraining(id);
      setTrainings(prev => prev.filter(t => t._id !== id));
    } catch {
      setError('Error deleting training');
    }
  };

  const handleEdit = (training) => {
    setFormData({
      title: training.title,
      date: training.date,
      duration: training.duration,
      location: training.location,
      type: training.type,
      category: training.category,
      description: training.description
    });
    setEditingId(training._id);
    setShowModal(true);
  };

  const handleViewAttendance = async (training) => {
    try {
      const data = await getAttendanceByTraining(training._id);
      setAttendanceList(data);
      setSelectedTraining(training);
      setShowAttendanceModal(true);
    } catch {
      setError('Error al cargar la asistencia');
    }
  };


  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">¡Bienvenido entrenador!</h1>
        <button className="btn btn-outline-danger" onClick={logout}>
          X
        </button>
      </div>

      <button
        onClick={() => {
          setShowModal(true);
          setFormData({
            title: '', date: '', duration: '', location: '',
            type: '', category: '', description: ''
          });
          setEditingId(null);
        }}
        className="btn btn-success mb-4"
      >
        Crear entrenamiento
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <TrainingList
        title="Upcoming Trainings"
        trainings={upcomingTrainings}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onViewAttendance={handleViewAttendance}
        showActions={true}       
        userRole="coach"    
      />

      <TrainingList
        title="All Trainings"
        trainings={trainings}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onViewAttendance={handleViewAttendance}
        showActions={true}
        userRole="coach"
      />

      {showModal && (
        <TrainingModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => {
            setShowModal(false);
            setEditingId(null);
          }}
          onSubmit={handleSubmit}
          isEditing={!!editingId} 
        />
      )}

      {showAttendanceModal && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
        <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Asistencia - {selectedTraining?.title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAttendanceModal(false)}
          ></button>
          </div>
          <div className="modal-body">
          {Array.isArray(attendanceList) && attendanceList.length > 0 ? (
            <ul className="list-group">
              {attendanceList.map((entry) => (
                <li
                  key={entry._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{entry.player.name}</span>
                  <span
                    className={`badge ${
                      entry.present ? 'bg-success' : 'bg-secondary'
                    }`}
                  >
                    {entry.present ? 'Asiste' : 'No asiste'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay registros de asistencia.</p>
          )}

        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CoachDashboard;


