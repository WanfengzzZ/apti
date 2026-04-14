import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-deep">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
