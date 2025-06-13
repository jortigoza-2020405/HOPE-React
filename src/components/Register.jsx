import React, { useState } from 'react'
import { useRegister } from '../shared/hooks/useRegister'
import { Input } from './Input'
import { Logo } from './Logo'
import { Button } from './Button'
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePassConfirm,
  validateNotEmpty,
  validateBloodType,
  emailValidationMessage,
  usernameValidationMessage,
  passwordValidationMessage,
  passConfirmValidationMessage,
  fieldRequiredMessage,
  bloodTypeValidationMessage
} from '../shared/validators/validators.js'

export const Register = ({ switchAuthHandler }) => {
  const form = {
    name: { value: '', isValid: false, showError: false },
    surname: { value: '', isValid: false, showError: false },
    email: { value: '', isValid: false, showError: false },
    username: { value: '', isValid: false, showError: false },
    password: { value: '', isValid: false, showError: false },
    passwordConfirm: { value: '', isValid: false, showError: false },
    birthDate: { value: '', isValid: false, showError: false },
    gender: { value: '', isValid: false, showError: false },
    address: { value: '', isValid: false, showError: false },
    bloodType: { value: '', isValid: false, showError: false }
  }

  const [formData, setFormData] = useState(form)
  const { register } = useRegister()

  const isSubmitDisabled = Object.values(formData).some(field => !field.isValid)

  const handleValueChange = (value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        value
      }
    }))
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'email': isValid = validateEmail(value); break
      case 'username': isValid = validateUsername(value); break
      case 'password': isValid = validatePassword(value); break
      case 'passwordConfirm': isValid = validatePassConfirm(formData.password.value, value); break
      case 'birthDate':
      case 'gender':
      case 'address': isValid = validateNotEmpty(value); break
      case 'bloodType': isValid = validateBloodType(value); break
      case 'name':
      case 'surname': isValid = validateNotEmpty(value); break
      default: break
    }

    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        isValid,
        showError: !isValid
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register({
      name: formData.name.value,
      surname: formData.surname.value,
      email: formData.email.value,
      username: formData.username.value,
      password: formData.password.value,
      role: 'PATIENT',
      birthDate: formData.birthDate.value,
      gender: formData.gender.value,
      address: formData.address.value,
      bloodType: formData.bloodType.value
    })
  }

  return (
    <div className='register-container'>
      <Logo text='H O P E ' />
      <form onSubmit={handleSubmit} className='auth-form'>

        {['name', 'surname', 'email', 'username', 'password', 'passwordConfirm', 'birthDate', 'address'].map((field) => (
          <Input
            key={field}
            field={field}
            label={
              {
                name: 'Nombre',
                surname: 'Apellido',
                email: 'Correo',
                username: 'Usuario',
                password: 'Contraseña',
                passwordConfirm: 'Confirmar Contraseña',
                birthDate: 'Fecha de nacimiento',
                address: 'Dirección'
              }[field]
            }
            type={field.includes('password') ? 'password' : (field === 'birthDate' ? 'date' : 'text')}
            value={formData[field].value}
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData[field].showError}
            validationMessage={
              {
                email: emailValidationMessage,
                username: usernameValidationMessage,
                password: passwordValidationMessage,
                passwordConfirm: passConfirmValidationMessage,
                birthDate: fieldRequiredMessage,
                name: fieldRequiredMessage,
                surname: fieldRequiredMessage,
                address: fieldRequiredMessage
              }[field]
            }
          />
        ))}

        {/* Género */}
        <div className='form__group'>
          <label className='form__label' style={{ top: '-10px' }}>Género</label>
          <select
            name='gender'
            value={formData.gender.value}
            onChange={(e) => handleValueChange(e.target.value, 'gender')}
            onBlur={(e) => handleValidationOnBlur(e.target.value, 'gender')}
            className={`form-control ${formData.gender.showError ? 'is-invalid' : ''}`}
          >
            <option value=''>Selecciona género</option>
            <option value='MALE'>Masculino</option>
            <option value='FEMALE'>Femenino</option>
          </select>
          {formData.gender.showError && <div className='invalid-feedback'>{fieldRequiredMessage}</div>}
        </div>

        {/* Tipo de sangre */}
        <div className='form__group'>
          <label className='form__label' style={{ top: '-10px' }}>Tipo de sangre</label>
          <select
            name='bloodType'
            value={formData.bloodType.value}
            onChange={(e) => handleValueChange(e.target.value, 'bloodType')}
            onBlur={(e) => handleValidationOnBlur(e.target.value, 'bloodType')}
            className={`form-control ${formData.bloodType.showError ? 'is-invalid' : ''}`}
          >
            <option value=''>Selecciona tipo de sangre</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
          </select>
          {formData.bloodType.showError && <div className='invalid-feedback'>{bloodTypeValidationMessage}</div>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='submit' text='Registrarse' disabled={isSubmitDisabled} />
        </div>
      </form>

      <p className="auth-form-switch-label">
        ¿Ya tienes una cuenta?
        <span className="link-switch" onClick={switchAuthHandler}> Inicia sesión</span>
      </p>
    </div>
  )
}
