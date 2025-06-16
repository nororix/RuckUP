import { useEffect, useState } from 'react';
import { getTrainings } from '../api/trainings';
import AttendanceModal from '../components/AttendanceModal';
import TrainingCard from '../components/TrainingCard';
import { useAuth } from '../context/useAuth';

const PlayerDashboard = () => {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const data = await getTrainings();
        setTrainings(data);
      } catch (error) {
        console.error('Error cargando entrenamientos:', error);
      }
    };

    fetchTrainings();
  }, []);

  const handleViewAttendance = (training) => {
    setSelectedTraining(training);
    setShowModal(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="mb-4">¡Bienvenido jugador!</h1>
      <button className="btn btn-outline-danger mb-4" onClick={logout}>
        Cerrar sesión
      </button>
    </div>

      <ul className="list-group">
        {trainings.map((t) => (
          <TrainingCard
            key={t._id}
            training={t}
            onViewAttendance={handleViewAttendance}
            showActions={false}
            userRole={user.role}
          />
        ))}
      </ul>

      {showModal && selectedTraining && (
        <AttendanceModal
          show={showModal}
          onClose={() => setShowModal(false)}
          training={selectedTraining}
        />
      )}
    </div>
  );
};

export default PlayerDashboard;
