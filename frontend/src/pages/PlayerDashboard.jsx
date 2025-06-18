import { useEffect, useState } from 'react';
import { getTrainings } from '../api/trainings';
import AttendanceModal from '../components/AttendanceModal';
import TrainingList from '../components/TrainingList';
import { useAuth } from '../context/useAuth';

const PlayerDashboard = () => {
  const { user, logout } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const upcomingTrainings = trainings.filter(t => new Date(t.date) > new Date());

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">¡Bienvenido jugador!</h1>
        <button className="btn btn-outline-danger" onClick={logout}>X</button>
      </div>

      <TrainingList
        title="Próximos entrenamientos"
        trainings={upcomingTrainings}
        onViewAttendance={handleViewAttendance}
        showActions={false}
        userRole={user.role}
      />

      <TrainingList
        title="Todos los entrenamientos"
        trainings={trainings}
        onViewAttendance={handleViewAttendance}
        showActions={false}
        userRole={user.role}
      />

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
