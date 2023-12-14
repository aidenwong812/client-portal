import { lazy, useEffect } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change';

const Layout = lazy(() => import('./containers/Layout'));

function App() {

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<Layout />} />

        <Route path="*" element={<Navigate to="/app/knowledge-base" replace />} />
      </Routes>
    </Router>
  )
}

export default App
