import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiStar } from 'react-icons/fi'
import './MenuCard.css'

const MenuCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Link to={`/menu/${item.id}`} className="menu-card">
      <div className="menu-card-image-wrapper">
        <img
          src={item.image_url || 'https://placehold.co/300x200/6B4423/FDF6E3?text=Kopi'}
          alt={item.name}
          className={`menu-card-image ${imageLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        {item.is_popular && (
          <span className="menu-card-badge">
            <FiStar /> Populer
          </span>
        )}
      </div>
      <div className="menu-card-content">
        <span className="menu-card-category">{item.category}</span>
        <h3 className="menu-card-title">{item.name}</h3>
        <p className="menu-card-description">{item.description}</p>
        <div className="menu-card-footer">
          <span className="menu-card-price">{formatPrice(item.price)}</span>
        </div>
      </div>
    </Link>
  )
}

export default MenuCard
