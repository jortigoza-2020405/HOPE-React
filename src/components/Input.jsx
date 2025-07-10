export const Input = ({
  field,
  label,
  type,
  value,
  onChangeHandler,
  onBlurHandler,
  showErrorMessage,
  validationMessage
}) => {
  return (
    <div className='form__group'>
      <input
        id={field}
        name={field}
        type={type}
        className='form__field'
        value={value}
        onChange={(e) => onChangeHandler(e.target.value, field)}
        onBlur={(e) => onBlurHandler(e.target.value, field)}
        placeholder={label}
        required
      />
      <label htmlFor={field} className='form__label'>{label}</label>
      {showErrorMessage && (
        <div className='invalid-feedback'>
          {validationMessage}
        </div>
      )}
    </div>
  )
}
