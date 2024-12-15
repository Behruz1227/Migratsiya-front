import { Route, Routes } from 'react-router-dom'
import Login from './app/auth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
