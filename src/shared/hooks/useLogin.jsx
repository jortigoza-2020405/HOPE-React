import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { loginRequest } from '../../services/auth.api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const loginUser = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const res = await loginRequest({ email, password })

    if (res.error) {
      toast.error('Credenciales incorrectas')
      setError(res.err)
      setIsLoading(false)
      return
    }

    login(res.data.user, res.data.token)
    toast.success('Sesión iniciada correctamente')
    navigate('/dashboard')
    setIsLoading(false)
  }

  return {
    login: loginUser,
    isLoading,
    error,
    setError
  }
}
