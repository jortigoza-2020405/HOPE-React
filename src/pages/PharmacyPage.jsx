import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { usePharmacy } from '../shared/hooks/usePharmacy'
import { PharmacyCard } from '../components/PharmacyCard'
import { PharmacyForm } from '../components/PharmacyForm'

export const PharmacyPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.user?.role

  if (!role) return null
  if (role !== 'ADMIN') return <Navigate to="/dashboard" />

  const {
    medicines,
    loadAllMedicines,
    deleteMedicine,
    filterByProvider,
    filterByExpiration,
    filterByLowStock
  } = usePharmacy()

  const [selectedMedicineId, setSelectedMedicineId] = useState(null)
  const [filterType, setFilterType] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const handleViewAll = async () => {
    await loadAllMedicines()
  }

  const handleFilter = async () => {
    if (!filterType || !filterValue.trim()) return

    if (filterType === 'provider') {
      await filterByProvider(filterValue)
    } else if (filterType === 'expiration') {
      await filterByExpiration(filterValue)
    } else if (filterType === 'lowStock') {
      await filterByLowStock(Number(filterValue))
    }
  }

  const handleDelete = async (medicine) => {
    const confirm = window.confirm(`¿Eliminar ${medicine.name}?`)
    if (confirm) await deleteMedicine(medicine._id)
  }

  return (
    <div className="dashboard-main">
      <h2>Gestión de Medicamentos</h2>

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

        <button
          onClick={() => setSelectedMedicineId('new')}
          style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            padding: '0.5rem 1rem',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Agregar medicamento
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filtrar por...</option>
          <option value="provider">Proveedor</option>
          <option value="expiration">Fecha de vencimiento</option>
          <option value="lowStock">Stock menor a</option>
        </select>

        <input
          type={filterType === 'expiration' ? 'date' : 'text'}
          placeholder={filterType === 'lowStock' ? 'Ej: 10' : 'Valor'}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>

      {/* Lista de medicamentos */}
      {medicines.length === 0 ? (
        <p>No hay medicamentos disponibles</p>
      ) : (
        medicines.map((m) => (
          <PharmacyCard
            key={m._id}
            medicine={m}
            onView={() => console.log('Ver detalle', m._id)}
            onEdit={() => setSelectedMedicineId(m._id)}
            onDelete={handleDelete}
          />
        ))
      )}

      {/* Modal de agregar/editar */}
      {selectedMedicineId && (
        <div className="modal-overlay" onClick={() => setSelectedMedicineId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PharmacyForm
              medicineId={selectedMedicineId !== 'new' ? selectedMedicineId : null}
              onSuccess={() => setSelectedMedicineId(null)}
            />
            <button onClick={() => setSelectedMedicineId(null)} style={{ marginTop: '1rem' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
