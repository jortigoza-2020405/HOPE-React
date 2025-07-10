import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import '../styles/dashboard.css'


export const DashboardPage = () => {
  const { user } = useAuth()

  useEffect(() => {
    console.log('Dashboard furulando')
  }, [])

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar role={user?.role} />
        <main className="dashboard-content" style={{ flexGrow: 1, padding: '2rem' }}>
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </main>
      </div>
    </div>
  )
}
