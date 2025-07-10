import { useAuth } from '../contexts/AuthContext'
import { AppointmentCard } from '../components/AppointmentCard'
import { NotificationCard } from '../components/NotificationCard'
import { HistoryTimeline } from '../components/HistoryTimeline'
import { ResourceItem } from '../components/ResourceItem'

export const HomePage = () => {
  const { user } = useAuth()

  return (
    <div className="dashboard-main">
      <h2>Bienvenido, {user?.name} {user?.surname}</h2>
      <p style={{ marginBottom: '1.5rem' }}>
        Gestiona tus citas médicas y revisa tu historial clínico.
      </p>

      {/* Tarjetas de resumen */}
      <div className="dashboard-grid">
        <AppointmentCard
          title="Próxima cita"
          date="15 Mayo"
          time="10:30 AM"
          doctor="Dr. García"
          specialty="Cardiología"
        />

        <AppointmentCard
          title="Medicamentos activos"
          date="3"
          time="Última actualización: 28 Abril"
        />

        <AppointmentCard
          title="Tiempo de espera"
          date="15 min"
          time="Promedio en tu centro médico"
        />

        <NotificationCard
          title="Notificaciones"
          count={2}
          lastUpdate="Última visita"
        />
      </div>

      {/* Información futura (publicaciones o recursos) */}
      <div className="dashboard-grid" style={{ marginTop: '2rem' }}>
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h3>Información general</h3>
          <p>Este espacio mostrará publicaciones o recursos informativos del sistema.</p>
          <ResourceItem
            title="Nueva guía de cuidados postoperatorios"
            description="Conoce los cuidados esenciales tras una cirugía menor"
            date="15 Mayo 2025"
          />
        </div>
      </div>

      {/* Historial médico */}
      <div className="dashboard-grid" style={{ marginTop: '2rem' }}>
        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h3>Historial reciente</h3>
          <HistoryTimeline />
        </div>
      </div>
    </div>
  )
}
