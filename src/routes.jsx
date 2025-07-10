// Named exports
import { AuthPage } from './pages/AuthPage'
import { NotFoundPage } from './pages/NotFoundPage'

import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { AppointmentsPage } from './pages/AppointmentsPage'
import { PatientsPage } from './pages/PatientsPage'
import { PharmacyPage } from './pages/PharmacyPage'
import { ReportsPage } from './pages/ReportsPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { UsersPage } from './pages/UsersPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ResultsPage } from './pages/ResultsPage'
import { MedicalHistoriesPage } from './pages/MedicalHistoriesPage'
import { PrescriptionsPage } from './pages/PrescriptionsPage'
import { DiagnosesPage } from './pages/DiagnosesPage'

// Protección por rol (si usas ProtectedRoute)
//import { ProtectedRoute } from './shared/ProtectedRoute'

export const routes = [
  { path: '/', element: <AuthPage /> },
  { path: '/login', element: <AuthPage /> },

  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'patients', element: <PatientsPage /> },
      { path: 'pharmacy', element: <PharmacyPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'medical-histories', element: <MedicalHistoriesPage /> },
      { path: 'prescriptions', element: <PrescriptionsPage /> },
      { path: 'diagnoses', element: <DiagnosesPage /> }
    ]
  },

  { path: '*', element: <NotFoundPage /> }
]
