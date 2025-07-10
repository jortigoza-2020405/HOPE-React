import apiClient from './api'

// Registrar paciente
export const registerRequest = async (patient) => {
  try {
    return await apiClient.post('/registerPatient', patient)
  } catch (err) {
    return {
      error: true,
      err
    }
  }
}

// Login paciente
export const loginRequest = async (credentials) => {
  try {
    return await apiClient.post('/loginPatient', credentials)
  } catch (err) {
    return {
      error: true,
      err
    }
  }
}

// Login admin (si lo usas)
export const loginAdminRequest = async ({ email, password }) => {
  try {
    return await apiClient.post('/login', {
      userLoggin: email,
      password
    })
  } catch (err) {
    return {
      error: true,
      err
    }
  }
}