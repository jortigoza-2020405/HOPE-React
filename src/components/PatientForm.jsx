import { useEffect, useState } from 'react'
import { usePatients } from '../shared/hooks/usePatients'
import { Button } from '../components/Button'
import { toast } from 'react-toastify'

export const PatientForm = ({ patientId, onSuccess }) => {
  const {
    getPatientById,
    updatePatient,
    patient,
    loading
  } = usePatients()

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    DPI: '',
    bloodType: '',
    gender: '',
    allergies: '',
    chronicDiseases: ''
  })

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (patientId) getPatientById(patientId)
  }, [patientId])

  useEffect(() => {
    if (patient && patient.user) {
      setForm({
        name: patient.user.name,
        surname: patient.user.surname,
        email: patient.user.email,
        phone: patient.user.phone,
        DPI: patient.DPI || '',
        bloodType: patient.bloodType || '',
        gender: patient.gender || '',
        allergies: patient.allergies || '',
        chronicDiseases: patient.chronicDiseases || ''
      })
    }
  }, [patient])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const updated = {
      DPI: form.DPI,
      bloodType: form.bloodType,
      gender: form.gender,
      allergies: form.allergies,
      chronicDiseases: form.chronicDiseases,
      phone: form.phone,
      user: {
        name: form.name,
        surname: form.surname,
        email: form.email
      }
    }

    const res = await updatePatient(patientId, updated)

    if (res?.data?.message) {
      toast.success('Cambios guardados correctamente')
      onSuccess?.()
    } else {
      toast.error('Error al guardar los cambios')
    }

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="dashboard-card">
      <h3>Editar paciente</h3>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
        <input name="surname" value={form.surname} onChange={handleChange} placeholder="Apellido" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />
        <input name="DPI" value={form.DPI} onChange={handleChange} placeholder="DPI" required />
        <input name="bloodType" value={form.bloodType} onChange={handleChange} placeholder="Tipo de sangre" />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Género" />
        <input name="allergies" value={form.allergies} onChange={handleChange} placeholder="Alergias" />
        <input name="chronicDiseases" value={form.chronicDiseases} onChange={handleChange} placeholder="Enfermedades crónicas" />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <Button
          text={saving ? 'Guardando...' : 'Guardar cambios'}
          type="submit"
          disabled={saving}
        />
      </div>
    </form>
  )
}
