import { createContext, useContext, useState, useEffect } from 'react'

// Crear el contexto
const AuthContext = createContext()

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext)

// Provider que rodeará tu aplicación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Al iniciar, revisar si hay sesión guardada
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      const { user, token } = JSON.parse(saved)
      setUser(user)
      setToken(token)
    }
  }, [])

  // Login: guarda usuario y token
  const login = (user, token) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('user', JSON.stringify({ user, token }))
  }

  // Logout: borra todo
  const logout = () => {
  setUser(null)
  setToken(null)
  localStorage.removeItem('user')
  window.location.href = '/' 
}

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
