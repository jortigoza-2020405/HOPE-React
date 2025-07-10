import api from './api'

// Obtener todos los medicamentos
export const getAllMedicinesRequest = () =>
  api.get('/v1/pharmacy/allMedicines?limit=10&skip=0')

// Obtener un medicamento por ID
export const getMedicineByIdRequest = (id) =>
  api.get(`/v1/pharmacy/getOne/${id}`)

// Agregar medicamento
export const addMedicineRequest = (data) =>
  api.post('/v1/pharmacy/addMedicine', data)

// Actualizar medicamento
export const updateMedicineRequest = (id, data) =>
  api.put(`/v1/pharmacy/update/${id}`, data)

// Eliminar (desactivar) medicamento
export const deleteMedicineRequest = (id) =>
  api.delete(`/v1/pharmacy/delete/${id}`)

// 🔍 Filtrar dinámico (por tipo)
export const filterMedicinesRequest = (type, value, limit = 10, skip = 0) => {
  const endpoints = {
    provider: '/v1/pharmacy/filter/provider',
    expiration: '/v1/pharmacy/filter/expiration',
    lowStock: '/v1/pharmacy/filter/lowStock'
  }

  const payloads = {
    provider: { provider: value, limit, skip },
    expiration: { date: value },
    lowStock: { threshold: value }
  }

  return api.post(endpoints[type], payloads[type])
}

// 🔍 Filtrar individualmente

export const filterByProviderRequest = (provider, limit = 10, skip = 0) =>
  api.post('/v1/pharmacy/filter/provider', {
    provider,
    limit,
    skip
  })

export const filterByExpirationRequest = (date) =>
  api.post('/v1/pharmacy/filter/expiration', {
    date
  })

export const filterByLowStockRequest = (threshold = 10) =>
  api.post('/v1/pharmacy/filter/lowStock', {
    threshold
  })
