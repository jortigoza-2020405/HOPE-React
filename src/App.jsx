import { useRoutes } from 'react-router-dom'
import { routes } from './routes.jsx'
import { Toaster } from 'react-hot-toast'
import './styles/global.css'
function App() {
  const elements = useRoutes(routes)
  return (
    <>
      {elements}
      <Toaster position='bottom-right' reverseOrder={false} />
    </>
  )
}

export default App
