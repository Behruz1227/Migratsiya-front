import { Route, Routes, useLocation } from 'react-router-dom'

import "./index.css"
import LoginPage from './app/auth/login/login'
import Navbar from './components/navbar'
import useStore from './helpers/state-managment/navbar/navbar'
import Dashboard from './app/superAdmin/dashboard'
import Adminlar from './app/superAdmin/adminlar/adminlar'

function App() {
  const {navigation} = useStore()
  const location = useLocation();

  console.log(location);
  
  return (

    <>
    {location.pathname !== "/" &&<Navbar navigation={navigation}/>}
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/super-admin/dashboard" element={<Dashboard />} />
      <Route path="/super-admin/admin" element={<Adminlar />} />
      
    </Routes>
    </>
  )
}

export default App
