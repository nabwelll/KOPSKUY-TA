import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import useDisplayMode from '../hooks/useDisplayMode'
import './Header.css'
import logo from '../assets/images/logo.png' 

const Header = ({ title, showBack = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isStandalone, displayMode } = useDisplayMode()

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
    <header className={`header ${isStandalone ? 'standalone-mode' : 'browser-mode'}`} data-display-mode={displayMode}>
      <div className="header-content">
        {showBack && (
          <button className="header-back" onClick={handleBack} aria-label="Kembali">
            <FiArrowLeft />
          </button>
        )}
        <img src={logo} alt="Logo KOPSKUY!" className="header-logo" />
        <h1 className="header-title">{title || getDefaultTitle()}</h1>
      </div>
    </header>
  )
}

export default Header
