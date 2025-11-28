import { FiCoffee } from 'react-icons/fi'
import './LoadingScreen.css'

const LoadingScreen = ({ message = 'Memuat...' }) => {
  return (
    <div className="loading-screen">
      <div className="loading-screen-content">
        <div className="loading-screen-icon">
          <FiCoffee className="coffee-icon" />
        </div>
        <div className="loading-screen-spinner"></div>
        <p className="loading-screen-message">{message}</p>
      </div>
    </div>
  )
}

export default LoadingScreen
