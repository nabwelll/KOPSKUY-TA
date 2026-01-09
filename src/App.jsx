import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import TopNavbar from './components/TopNavbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import MenuDetail from './pages/MenuDetail'
import Promo from './pages/Promo'
import PromoDetail from './pages/PromoDetail'
import About from './pages/About'
import Cart from './pages/Cart'
import RedisDemoPage from './components/RedisDemoPage'; // tambahkan import
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/promo/:id" element={<PromoDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/redis-demo" element={<RedisDemoPage />} />

        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App
