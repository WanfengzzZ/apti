import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ResultPage from './pages/ResultPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-deep">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
