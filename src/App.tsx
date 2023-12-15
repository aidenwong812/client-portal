import { lazy, useEffect } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change';
import checkAuth from './app/auth';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

// Check for login and initialize axios
const token = checkAuth()

function App() {

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/app/*" element={<Layout />} />

        <Route path="*" element={<Navigate to={token ? "/app/assistants" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}

export default App
