import { useState, useEffect } from 'react'
import { FiCoffee } from 'react-icons/fi'
import logo from '../assets/images/logo.png'
import './SplashScreen.css'

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Start fade out animation after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    // Complete splash screen after fade out animation (2.5s total)
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-container">
          <img src={logo} alt="KOPSKUY Logo" className="splash-logo" />
          <div className="splash-steam">
            <div className="steam steam-1"></div>
            <div className="steam steam-2"></div>
            <div className="steam steam-3"></div>
          </div>
        </div>
        <h1 className="splash-title">KOPSKUY!</h1>
        <p className="splash-tagline">Kopi Berkualitas untuk Semua</p>
        <div className="splash-loader">
          <FiCoffee className="splash-coffee-icon" />
          <div className="splash-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
