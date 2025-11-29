import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Menu from './pages/Menu'
import MenuDetail from './pages/MenuDetail'
import Promo from './pages/Promo'
import PromoDetail from './pages/PromoDetail'
import About from './pages/About'
import Cart from './pages/Cart'
import useDisplayMode from './hooks/useDisplayMode'
import './App.css'

function App() {
  const { isStandalone, displayMode } = useDisplayMode()

  return (
    <BrowserRouter>
      <div className={`app ${isStandalone ? 'standalone-mode' : 'browser-mode'}`} data-display-mode={displayMode}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/promo/:id" element={<PromoDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
