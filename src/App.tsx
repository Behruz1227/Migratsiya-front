import { Route, Routes } from 'react-router-dom'

import "./index.css"
import LoginPage from './app/auth/login/login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
