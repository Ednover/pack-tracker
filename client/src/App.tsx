import { Route, Routes } from 'react-router'
import Home from './views/Home/Home'
import Dashboard from './views/Dashboard/Dashboard'
import Package from './views/Package/Package'

function App() {
  return (
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/package/:id" element={ <Package /> } />
      </Routes>
  )
}

export default App
