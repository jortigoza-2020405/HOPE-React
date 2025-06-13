import { useEffect } from 'react'
//import { Sidebar } from '../../components/Sidebar'
//import { Navbar } from '../../components/Navbar'
import { Outlet } from 'react-router-dom'
//import './Dashboard.css'

export const DashboardPage = () => {
  // Aquí podrías usar contextos como usePatients(), usePharmacy(), etc.
  useEffect(() => {
    console.log('Dashboard montado')
  }, [])

  return (
    <div className='dashboard-container'>
      <Navbar />
      <Sidebar />
      <main className='dashboard-content'>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  )
}