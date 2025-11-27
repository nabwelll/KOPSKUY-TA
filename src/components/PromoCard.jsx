import { Link } from 'react-router-dom'
import { FiClock, FiPercent } from 'react-icons/fi'
import './PromoCard.css'

const PromoCard = ({ promo }) => {
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Link to={`/promo/${promo.id}`} className="promo-card">
      <div className="promo-card-image-wrapper">
        <img
          src={promo.image_url || 'https://placehold.co/400x200/6B4423/FDF6E3?text=Promo'}
          alt={promo.title}
          className="promo-card-image"
          loading="lazy"
        />
        <div className="promo-card-discount">
          <FiPercent />
          <span>{promo.discount}%</span>
        </div>
      </div>
      <div className="promo-card-content">
        <h3 className="promo-card-title">{promo.title}</h3>
        <p className="promo-card-description">{promo.description}</p>
        <div className="promo-card-validity">
          <FiClock />
          <span>
            Berlaku sampai {formatDate(promo.valid_until)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default PromoCard
