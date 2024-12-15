import { Route, Routes } from 'react-router-dom'
import Login from './app/auth'
import "./index.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
