export const PatientCard = ({ patient, onView, onEdit, onDelete }) => {
  const { user, bloodType, gender } = patient

  return (
    <div className="dashboard-card" style={{ marginBottom: '1rem' }}>
      <h3>{user.name} {user.surname}</h3>
      <p>Email: {user.email}</p>
      <p>Tipo de sangre: {bloodType}</p>
      <p>Género: {gender}</p>
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => onView(patient)} style={{ marginRight: '0.5rem' }}>Ver historial</button>
        <button onClick={() => onEdit(patient)} style={{ marginRight: '0.5rem' }}>Editar</button>
        <button onClick={() => onDelete(patient)}>Eliminar</button>
      </div>
    </div>
  )
}
