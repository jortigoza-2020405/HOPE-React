import api from './api'

// Obtener todos los pacientes
export const getAllPatientsRequest = () =>
  api.get('/v1/patients/allPatients')

// Obtener un paciente por ID
export const getPatientByIdRequest = (id) =>
  api.get(`/v1/patients/getOne/${id}`)

// Actualizar paciente
export const updatePatientRequest = (id, data) =>
  api.put(`/v1/patients/update/${id}`, data)

// Eliminar (desactivar) paciente
export const deletePatientRequest = (id) =>
  api.delete(`/v1/patients/delete/${id}`)

// Buscar por nombre o apellido
export const searchPatientsByNameRequest = (name, limit = 10, skip = 0) =>
  api.post('/v1/patients/searchByName', {
    name,
    limit,
    skip
  })

// Filtros individuales (por si deseas usarlos directo)
export const filterByBloodTypeRequest = (type, limit = 10, skip = 0) =>
  api.post('/v1/patients/filter/bloodType', {
    bloodType,
    limit,
    skip
  })

export const filterByDiseaseRequest = (disease, limit = 10, skip = 0) =>
  api.post('/v1/patients/filter/disease', {
    disease,
    limit,
    skip
  })

export const filterByAllergyRequest = (allergy, limit = 10, skip = 0) =>
  api.post('/v1/patients/filter/allergy', {
    allergy,
    limit,
    skip
  })

export const filterByGenderRequest = (gender, limit = 10, skip = 0) =>
  api.post('/v1/patients/filter/gender', {
    gender,
    limit,
    skip
  })

// Filtro dinámico (recomendado)
export const filterPatientsRequest = (type, value, limit = 10, skip = 0) => {
  const endpoints = {
    bloodType: '/v1/patients/filter/bloodType',
    disease: '/v1/patients/filter/disease',
    allergy: '/v1/patients/filter/allergy',
    gender: '/v1/patients/filter/gender'
  }

  return api.post(endpoints[type], {
    [type]: value,
    limit,
    skip
  })
}
