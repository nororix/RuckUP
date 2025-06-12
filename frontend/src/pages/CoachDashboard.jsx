import { useState, useEffect } from 'react';
import TrainingList from '../components/TrainingList';
import TrainingModal from '../components/TrainingModal';
import { getTrainings, createTraining, updateTraining, deleteTraining } from '../api/trainings';

const CoachDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '', fecha: '', duracion: '', ubicacion: '',
    tipo: '', categoria: '', descripcion: ''
  });

  const upcomingTrainings = trainings.filter(t => new Date(t.fecha) > new Date());

  const fetchData = async () => {
    try {
      const data = await getTrainings();
      setTrainings(data);
    } catch {
      setError('Error al cargar entrenamientos.');
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
        titulo: '', fecha: '', duracion: '', ubicacion: '',
        tipo: '', categoria: '', descripcion: ''
      });
      setEditingId(null);
      setShowModal(false);
    } catch {
      setError('Error al guardar entrenamiento');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTraining(id);
      setTrainings(prev => prev.filter(t => t._id !== id));
    } catch {
      setError('Error al eliminar entrenamiento');
    }
  };

  const handleEdit = (training) => {
    setFormData({
      titulo: training.titulo,
      fecha: training.fecha,
      duracion: training.duracion,
      ubicacion: training.ubicacion,
      tipo: training.tipo,
      categoria: training.categoria,
      descripcion: training.descripcion
    });
    setEditingId(training._id);
    setShowModal(true);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Dashboard Entrenador</h1>
      <button
        onClick={() => {
          setShowModal(true);
          setFormData({
            titulo: '', fecha: '', duracion: '', ubicacion: '',
            tipo: '', categoria: '', descripcion: ''
          });
          setEditingId(null);
        }}
        className="btn btn-success mb-4"
      >
        Crear Entrenamiento
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      <TrainingList
        title="Próximos Entrenamientos"
        trainings={upcomingTrainings}
        onDelete={handleDelete}
        onEdit={handleEdit}
        showActions={true}       
        userRole="entrenador"    
      />

      <TrainingList
        title="Todos los Entrenamientos"
        trainings={trainings}
        onDelete={handleDelete}
        onEdit={handleEdit}
        showActions={true}
        userRole="entrenador"
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
    </div>
  );
};

export default CoachDashboard;

