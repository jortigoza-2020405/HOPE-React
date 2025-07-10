export const Button = ({
  text,
  type = 'button',
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-rounded ${disabled ? 'btn-disabled' : ''} ${className}`}
    >
      {text}
    </button>
  )
}