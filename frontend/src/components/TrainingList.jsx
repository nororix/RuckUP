import TrainingCard from './TrainingCard';

const TrainingList = ({ title, trainings, onDelete, onEdit, onViewAttendance, showActions, userRole}) => {
  return (
    <div className="mt-4">
      <h2 className="h4 mb-3">{title}</h2>
      {trainings.length === 0 ? (
        <p>No hay entrenamientos</p>
      ) : (
        <div className="row g-3">
          {trainings.map(training => (
            <div
              key={training._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
            <TrainingCard
              training={training}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewAttendance={onViewAttendance}
              showActions={showActions}
              userRole={userRole}
            />

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingList;
