import { registerRequest } from '../../services/auth.api'
import toast from 'react-hot-toast'
import { useState } from 'react'

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const register = async (userData) => {
    setIsLoading(true)
    setError(null)

    const res = await registerRequest(userData)

    if (res.error) {
      toast.error('Error al registrar')
      setError(res.err)
      setIsLoading(false)
      return
    }

    toast.success('Registro exitoso. Ahora inicia sesión.')
    setIsLoading(false)
  }

  return {
    register,
    isLoading,
    error,
    setError
  }
}