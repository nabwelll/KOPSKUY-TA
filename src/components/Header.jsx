import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './Header.css'

const Header = ({ title, showBack = false }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    navigate(-1)
  }

  // Default title based on route
  const getDefaultTitle = () => {
    const path = location.pathname
    if (path === '/') return 'KOPSKUY!'
    if (path === '/menu') return 'Menu'
    if (path === '/promo') return 'Promo'
    if (path === '/about') return 'Tentang Kami'
    return 'KOPSKUY!'
  }

  return (
    <header className="header">
      <div className="header-content">
        {showBack && (
          <button className="header-back" onClick={handleBack} aria-label="Kembali">
            <FiArrowLeft />
          </button>
        )}
        <h1 className="header-title">{title || getDefaultTitle()}</h1>
      </div>
    </header>
  )
}

export default Header
