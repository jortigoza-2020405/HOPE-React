import { useState } from 'react'
import { useRegister } from '../shared/hooks/useRegister'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const Register = ({ switchAuthHandler }) => {
  const navigate = useNavigate()
  const { register } = useRegister()

  const [form, setForm] = useState({
    name: '',
    surname: '',
    DPI: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    birthDate: '',
    gender: '',
    bloodType: ''
  })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (form.password !== form.passwordConfirm) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    await register(form)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 style={{ textAlign: 'center' }}>Registro de Paciente</h2>

      <div className="form__group">
        <input
          type="text"
          name="name"
          className="form__field"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="name" className="form__label">Nombre</label>
      </div>

      <div className="form__group">
        <input
          type="text"
          name="surname"
          className="form__field"
          placeholder="Apellido"
          value={form.surname}
          onChange={handleChange}
          required
        />
        <label htmlFor="surname" className="form__label">Apellido</label>
      </div>

      <div className="form__group">
        <input
          type="text"
          name="DPI"
          className="form__field"
          placeholder="DPI"
          value={form.DPI}
          onChange={handleChange}
          required
          pattern="\d{13}"
          title="Debe tener exactamente 13 dígitos"
        />
        <label htmlFor="DPI" className="form__label">DPI</label>
      </div>

      <div className="form__group">
        <input
          type="email"
          name="email"
          className="form__field"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="email" className="form__label">Correo</label>
      </div>

      <div className="form__group">
        <input
          type="text"
          name="username"
          className="form__field"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="username" className="form__label">Usuario</label>
      </div>

      <div className="form__group">
        <input
          type="password"
          name="password"
          className="form__field"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="form__label">Contraseña</label>
      </div>

      <div className="form__group">
        <input
          type="password"
          name="passwordConfirm"
          className="form__field"
          placeholder="Confirmar Contraseña"
          value={form.passwordConfirm}
          onChange={handleChange}
          required
        />
        <label htmlFor="passwordConfirm" className="form__label">Confirmar Contraseña</label>
      </div>

      <div className="form__group">
        <input
          type="date"
          name="birthDate"
          className="form__field"
          value={form.birthDate}
          onChange={handleChange}
          required
        />
        <label htmlFor="birthDate" className="form__label">Fecha de nacimiento</label>
      </div>

      <div className="form__group">
        <select
          name="gender"
          className="form__field"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona género</option>
          <option value="MALE">Masculino</option>
          <option value="FEMALE">Femenino</option>
        </select>
        <label htmlFor="gender" className="form__label">Género</label>
      </div>

      <div className="form__group">
        <select
          name="bloodType"
          className="form__field"
          value={form.bloodType}
          onChange={handleChange}
          required
        >
          <option value="">Tipo de sangre</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <label htmlFor="bloodType" className="form__label">Tipo de sangre</label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="submit" text="Registrarse" />
      </div>

      <p className="auth-form-switch-label">
        ¿Ya tienes cuenta?
        <span className="link-switch" onClick={switchAuthHandler}>
          &nbsp;Inicia Sesión
        </span>
      </p>
    </form>
  )
}