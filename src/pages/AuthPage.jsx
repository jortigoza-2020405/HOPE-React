import { useState } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
//import './AuthPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const toggle = () => setIsLogin(prev => !prev)

  return (
    <div className='auth-page'>
      <div className='auth-toggle'>
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Iniciar Sesión</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Registrarse</button>
      </div>
      {isLogin
        ? <Login switchAuthHandler={toggle} />
        : <Register switchAuthHandler={toggle} />}
    </div>
  )
}