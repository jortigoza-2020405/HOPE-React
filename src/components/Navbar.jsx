import { useAuth } from '../contexts/AuthContext'

export const Navbar = () => {
  const { user } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/HOPELOGO-Photoroom (1).png" alt="Hope Logo" />
        <h2>H O P E</h2>
      </div>
      <span className="navbar-role">{user?.role}</span>
    </nav>
  )
}
