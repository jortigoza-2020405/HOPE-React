import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { usePatients } from '../shared/hooks/usePatients'
import { PatientCard } from '../components/PatientCard'
import { PatientForm } from '../components/PatientForm'

export const PatientsPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.user?.role

  if (role !== 'ADMIN') {
    return <Navigate to="/dashboard" />
  }

  const {
    patients,
    searchPatients,
    filterPatients,
    filterByBloodType,
    deletePatient,
    loadAllPatients
  } = usePatients()

  const [searchValue, setSearchValue] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [selectedPatientId, setSelectedPatientId] = useState(null)

  const handleViewAll = async () => {
    await loadAllPatients()
  }

  const handleSearch = async () => {
    if (!searchValue.trim()) return
    await searchPatients(searchValue.trim())
  }

  const handleFilter = async () => {
    if (!filterType || !filterValue.trim()) return
    await filterPatients(filterType, filterValue.trim())
  }

  const handleBloodTypeFilter = async (type) => {
    if (!type) return
    await filterByBloodType(type)
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este paciente?')
    if (confirm) await deletePatient(id)
  }

  return (
    <div className="dashboard-main">
      <h2>Gestión de Pacientes</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <button
          onClick={handleViewAll}
          style={{
            backgroundColor: '#38caef',
            border: 'none',
            padding: '0.5rem 1rem',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Ver todos
        </button>
        </div>

      {/* Búsqueda por nombre */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Filtro dinámico por tipo y valor */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filtrar por...</option>
          <option value="disease">Enfermedad crónica</option>
          <option value="allergy">Alergia</option>
          <option value="gender">Género</option>
        </select>

        <input
          type="text"
          placeholder="Valor"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>

      {/* Filtro específico por tipo de sangre */}
      <div style={{ marginBottom: '1rem' }}>
        <select
          defaultValue=""
          onChange={(e) => handleBloodTypeFilter(e.target.value)}
        >
          <option value="">Filtrar por tipo de sangre</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      {/* Lista de pacientes */}
      {patients.length === 0 ? (
        <p>No hay pacientes disponibles</p>
      ) : (
        patients.map((p) => (
          <PatientCard
            key={p._id}
            patient={p}
            onView={() => console.log('Ver historial', p._id)}
            onEdit={() => setSelectedPatientId(p._id)}
            onDelete={() => handleDelete(p._id)}
          />
        ))
      )}

      {/* Modal para editar paciente */}
      {selectedPatientId && (
        <div className="modal-overlay" onClick={() => setSelectedPatientId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PatientForm
              patientId={selectedPatientId}
              onSuccess={() => setSelectedPatientId(null)}
            />
            <button onClick={() => setSelectedPatientId(null)} style={{ marginTop: '1rem' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
