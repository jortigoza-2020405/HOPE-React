import { createContext, useContext, useState, useEffect } from 'react'
import {
  getAllPatientsRequest,
  getPatientByIdRequest,
  updatePatientRequest,
  deletePatientRequest,
  searchPatientsByNameRequest,
  filterPatientsRequest
} from '../services/patient.api'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'


export const PatientsContext = createContext()
export const usePatientsContext = () => useContext(PatientsContext)

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    if (user && user.role === 'ADMIN') loadAllPatients() 
  }, [user])

  const loadAllPatients = async () => {
    setLoading(true)
    try {
      const res = await getAllPatientsRequest()
      setPatients(res.data.patients)
    } catch (err) {
      toast.error('Error al cargar pacientes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getPatientById = async (id) => {
    try {
      const res = await getPatientByIdRequest(id)
      setPatient(res.data.patient)
    } catch (err) {
      toast.error('Error al obtener paciente')
      console.error(err)
    }
  }

  const updatePatient = async (id, data) => {
    try {
      const res = await updatePatientRequest(id, data)
      await loadAllPatients()
      return res
    } catch (err) {
      toast.error('Error al actualizar paciente')
      console.error(err)
    }
  }

  const deletePatient = async (id) => {
    try {
      const res = await deletePatientRequest(id)
      await loadAllPatients()
      return res
    } catch (err) {
      toast.error('Error al eliminar paciente')
      console.error(err)
    }
  }

  const searchPatients = async (name) => {
    try {
      const res = await searchPatientsByNameRequest(name)
      const filtered = res.data.patients.filter((p) => {
        const full = `${p.user.name} ${p.user.surname}`.toLowerCase()
        return full.includes(name.toLowerCase())
      })

      if (filtered.length === 0) {
        toast.error('No se encontraron pacientes con ese nombre')
        setPatients([])
        return
      }

      setPatients(filtered)
      toast.success('Pacientes encontrados')
    } catch (err) {
      toast.error('Error al buscar pacientes')
      console.error(err)
    }
  }

  const filterPatients = async (type, value) => {
    try {
      const res = await filterPatientsRequest(type, value)
      let filtered = res.data.patients

      if (!filtered.length) {
        toast.error('No se encontraron pacientes con ese filtro')
        setPatients([])
        return
      }

      setPatients(filtered)
      toast.success('Pacientes filtrados')
    } catch (err) {
      toast.error('Error al filtrar pacientes')
      console.error(err)
    }
  }

  const filterByBloodType = async (type) => {
  try {
    const res = await filterPatientsRequest('bloodType', type)
    const filtered = res.data.patients

    if (!filtered.length) {
      toast.error('No se encontraron pacientes con ese tipo de sangre')
      setPatients([])
      return
    }

    setPatients(filtered)
    toast.success('Pacientes filtrados por tipo de sangre')
  } catch (err) {
    toast.error('Error al filtrar por tipo de sangre')
    console.error(err)
  }
}


  return (
    <PatientsContext.Provider
      value={{
        patients,
        patient,
        loading,
        loadAllPatients,
        getPatientById,
        updatePatient,
        deletePatient,
        searchPatients,
        filterPatients,
        filterByBloodType
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}
