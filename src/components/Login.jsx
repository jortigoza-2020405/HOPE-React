import { useState } from 'react'
import { loginRequest, loginAdminRequest } from '../services/auth.api'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from './Button'

export const Login = ({ switchAuthHandler }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [role, setRole] = useState('PATIENT')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const credentials = { email: form.email, password: form.password }

    const res = role === 'ADMIN'
      ? await loginAdminRequest(credentials)
      : await loginRequest(credentials)

    if (res.error) {
      toast.error('Credenciales incorrectas')
      return
    }

    login(res.data.user, res.data.token)
    toast.success('Sesión iniciada')
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>

      <div className="form__group">
        <input
          name="email"
          type="email"
          className="form__field"
          placeholder="Correo"
          required
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="email" className="form__label">Correo</label>
      </div>

      <div className="form__group">
        <input
          name="password"
          type="password"
          className="form__field"
          placeholder="Contraseña"
          required
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="password" className="form__label">Contraseña</label>
      </div>

      <div className="form__group">
        <select
          name="role"
          className="form__field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="PATIENT">Paciente</option>
          <option value="ADMIN">Administrador</option>
        </select>
        <label htmlFor="role" className="form__label">Rol</label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="submit" text="Entrar" />
      </div>

      <p className="auth-form-switch-label">
        ¿No tienes cuenta?
        <span className="link-switch" onClick={switchAuthHandler}>
          &nbsp;Regístrate
        </span>
      </p>
    </form>
  )
}
