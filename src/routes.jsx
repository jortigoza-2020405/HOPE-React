// Named exports
import { AuthPage } from './pages/AuthPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Default export
import { DashboardPage } from './pages/DashboardPage'

// Rutas hijas como componentes (usa export default o named según cómo estén)
//import { PatientsPage } from './pages/Patients/PatientsPage'
//import { PharmacyPage } from './pages/Pharmacy/PharmacyPage'
//import { ReportsPage } from './pages/Reports/ReportsPage'
//import { AppointmentsPage } from './pages/Appointments/AppointmentsPage'

export const routes = [
  { path: '/', element: <AuthPage /> },
  { path: '/login', element: <AuthPage /> },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      //{ path: 'patients', element: <PatientsPage /> },
      //{ path: 'pharmacy', element: <PharmacyPage /> },
      //{ path: 'appointments', element: <AppointmentsPage /> },
      //{ path: 'reports', element: <ReportsPage /> }
    ]
  },
  { path: '*', element: <NotFoundPage /> }
]
