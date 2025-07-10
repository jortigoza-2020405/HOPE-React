export const PharmacyCard = ({ medicine, onView, onEdit, onDelete }) => {
  const { name, description, stock, expirationDate, provider } = medicine

  return (
    <div className="dashboard-card" style={{ marginBottom: '1rem' }}>
      <h3>{name}</h3>
      <p>Proveedor: {provider}</p>
      <p>Stock: {stock}</p>
      <p>Vence: {new Date(expirationDate).toLocaleDateString()}</p>
      {description && <p>Descripción: {description}</p>}
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={() => onView(medicine)} style={{ marginRight: '0.5rem' }}>Ver</button>
        <button onClick={() => onEdit(medicine)} style={{ marginRight: '0.5rem' }}>Editar</button>
        <button onClick={() => onDelete(medicine)}>Eliminar</button>
      </div>
    </div>
  )
}
