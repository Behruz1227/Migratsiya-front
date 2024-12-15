import { Route, Routes } from 'react-router-dom'

import "./index.css"
import LoginPage from './app/auth/login/login'
import Navbar from './components/navbar'
import useStore from './helpers/state-managment/navbar/navbar'

function App() {
  const {navigation} = useStore()
  return (

    <>
    <Navbar navigation={navigation}/>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      
    </Routes>
    </>
  )
}

export default App
