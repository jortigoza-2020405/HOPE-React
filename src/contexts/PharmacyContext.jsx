import { createContext, useContext, useState, useEffect } from 'react'
import {
  getAllMedicinesRequest,
  getMedicineByIdRequest,
  addMedicineRequest,
  updateMedicineRequest,
  deleteMedicineRequest,
  filterByProviderRequest,
  filterByExpirationRequest,
  filterByLowStockRequest
} from '../services/pharmacy.api'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'

export const PharmacyContext = createContext()
export const usePharmacyContext = () => useContext(PharmacyContext)

export const PharmacyProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([])
  const [medicine, setMedicine] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    if (user) loadAllMedicines()
  }, [user])

  const loadAllMedicines = async () => {
    setLoading(true)
    try {
      const res = await getAllMedicinesRequest()
      setMedicines(res.data.medicines)
    } catch (err) {
      toast.error('Error al cargar medicamentos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getMedicineById = async (id) => {
    try {
      const res = await getMedicineByIdRequest(id)
      setMedicine(res.data.medicine)
    } catch (err) {
      toast.error('Error al obtener medicamento')
      console.error(err)
    }
  }

  const addMedicine = async (data) => {
    try {
      const res = await addMedicineRequest(data)
      await loadAllMedicines()
      return res
    } catch (err) {
      toast.error('Error al agregar medicamento')
      console.error(err)
    }
  }

  const updateMedicine = async (id, data) => {
    try {
      const res = await updateMedicineRequest(id, data)
      await loadAllMedicines()
      return res
    } catch (err) {
      toast.error('Error al actualizar medicamento')
      console.error(err)
    }
  }

  const deleteMedicine = async (id) => {
    try {
      const res = await deleteMedicineRequest(id)
      await loadAllMedicines()
      return res
    } catch (err) {
      toast.error('Error al eliminar medicamento')
      console.error(err)
    }
  }

  const filterByProvider = async (provider) => {
    try {
      const res = await filterByProviderRequest(provider)
      setMedicines(res.data.medicines)
    } catch (err) {
      toast.error('No se encontraron medicamentos por proveedor')
      console.error(err)
    }
  }

  const filterByExpiration = async (date) => {
    try {
      const res = await filterByExpirationRequest(date)
      setMedicines(res.data.medicines)
    } catch (err) {
      toast.error('No se encontraron medicamentos por fecha')
      console.error(err)
    }
  }

  const filterByLowStock = async (threshold = 10) => {
    try {
      const res = await filterByLowStockRequest(threshold)
      setMedicines(res.data.medicines)
    } catch (err) {
      toast.error('No se encontraron medicamentos con bajo stock')
      console.error(err)
    }
  }

  return (
    <PharmacyContext.Provider
      value={{
        medicines,
        medicine,
        loading,
        loadAllMedicines,
        getMedicineById,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        filterByProvider,
        filterByExpiration,
        filterByLowStock
      }}
    >
      {children}
    </PharmacyContext.Provider>
  )
}
