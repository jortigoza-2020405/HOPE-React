import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom'


export const Sidebar = ({ role }) => {
  const { logout } = useAuth()
  const location = useLocation()

  const menu = [
    { path: '/dashboard', label: 'Inicio', icon: '/src/assets/medicamento.png' },
    { path: '/dashboard/appointments', label: 'Citas', icon: '/src/assets/cita-medica.png' },
    { path: '/dashboard/prescriptions', label: 'Recetas', icon: '/src/assets/receta.png' },
    { path: '/dashboard/history', label: 'Historial', icon: '/src/assets/historial-medico.png' },
    { path: '/dashboard/notifications', label: 'Notificaciones', icon: '/src/assets/llamar.png' }
  ]

  const adminMenu = [
    { path: '/dashboard/patients', label: 'Pacientes', icon: '/src/assets/asistente-medico.png' },
    { path: '/dashboard/pharmacy', label: 'Farmacia', icon: '/src/assets/caridad.png' },
    { path: '/dashboard/reports', label: 'Reportes', icon: '/src/assets/cuestionario.png' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        {[...menu, ...(role === 'ADMIN' ? adminMenu : [])].map((item) => (
          <li key={item.path}>
            <Link to={item.path} className={isActive(item.path) ? 'active' : ''}>
              <img src={item.icon} alt={`${item.label} icon`} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar__bottom">
        <button onClick={logout}>
          <img src="/src/assets/cerrar-sesion.png" alt="logout icon" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
