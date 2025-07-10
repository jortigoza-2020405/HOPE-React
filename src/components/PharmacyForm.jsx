import { useEffect, useState } from 'react'
import { usePharmacy } from '../shared/hooks/usePharmacy'
import { toast } from 'react-toastify'
import { Button } from './Button'

export const PharmacyForm = ({ medicineId, onSuccess }) => {
  const {
    getMedicineById,
    addMedicine,
    updateMedicine,
    medicine
  } = usePharmacy()

  const [form, setForm] = useState({
    name: '',
    description: '',
    stock: '',
    expirationDate: '',
    provider: ''
  })

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (medicineId && medicineId !== 'new') {
      getMedicineById(medicineId)
    }
  }, [medicineId])

  useEffect(() => {
    if (medicine && medicineId !== 'new') {
      setForm({
        name: medicine.name || '',
        description: medicine.description || '',
        stock: medicine.stock || '',
        expirationDate: medicine.expirationDate?.substring(0, 10) || '',
        provider: medicine.provider || ''
      })
    }
  }, [medicine])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const newData = {
      name: form.name,
      description: form.description,
      stock: Number(form.stock),
      expirationDate: form.expirationDate,
      provider: form.provider
    }

    let res
    if (medicineId && medicineId !== 'new') {
      res = await updateMedicine(medicineId, newData)
    } else {
      res = await addMedicine(newData)
    }

    if (res?.data?.message) {
      toast.success(medicineId !== 'new' ? 'Medicamento actualizado' : 'Medicamento agregado')
      onSuccess?.()
    } else {
      toast.error('Error al guardar el medicamento')
    }

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="dashboard-card">
      <h3>{medicineId === 'new' ? 'Agregar medicamento' : 'Editar medicamento'}</h3>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="provider"
          value={form.provider}
          onChange={handleChange}
          placeholder="Proveedor"
          required
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <input
          name="expirationDate"
          type="date"
          value={form.expirationDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          rows={3}
          style={{ gridColumn: '1 / -1' }}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Button
          text={saving ? 'Guardando...' : 'Guardar'}
          type="submit"
          disabled={saving}
        />
      </div>
    </form>
  )
}
