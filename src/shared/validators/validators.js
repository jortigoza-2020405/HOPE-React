// Validación de email
export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/
  return regex.test(email)
}
export const emailValidationMessage = 'Por favor ingresa un correo válido'

// Validación de username
export const validateUsername = (username) => {
  const regex = /^\S{3,8}$/
  return regex.test(username)
}
export const usernameValidationMessage = 'El nombre de usuario debe tener entre 3 y 8 caracteres (sin espacios)'

// Validación de password
export const validatePassword = (password) => {
  const regex = /^\S{6,12}$/
  return regex.test(password)
}
export const passwordValidationMessage = 'La contraseña debe tener entre 6 y 12 caracteres, sin espacios'

// Confirmación de contraseña
export const validatePassConfirm = (password, passConfirm) => {
  return password === passConfirm
}
export const passConfirmValidationMessage = 'Las contraseñas no coinciden'

// Validación de campos obligatorios (no vacíos)
export const validateNotEmpty = (text) => {
  return text.trim().length > 0
}
export const fieldRequiredMessage = 'Este campo es obligatorio'

// Validación de tipo de sangre
export const validateBloodType = (type) => {
  const validTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  return validTypes.includes(type)
}
export const bloodTypeValidationMessage = 'Selecciona un tipo de sangre válido'

// Validación de género
export const validateGender = (value) => {
  return ['MALE', 'FEMALE', 'OTHER'].includes(value)
}
export const genderValidationMessage = 'Selecciona un género válido'

// Validación de fecha de nacimiento (opcional mínimo: no vacía)
export const validateDate = (date) => {
  return Boolean(Date.parse(date))
}
export const dateValidationMessage = 'Ingresa una fecha válida'
