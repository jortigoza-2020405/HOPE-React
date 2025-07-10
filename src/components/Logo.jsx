
export const Logo = ({ text }) => {
  return (
    <div className="logo-container">
      <img src="src/assets/HOPELOGO-Photoroom (1).png" alt="Logo HOPE" className="logo-img" />
      <h1 className="logo-title">{text}</h1>
    </div>
  )
}
