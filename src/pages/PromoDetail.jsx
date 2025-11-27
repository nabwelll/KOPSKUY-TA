import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FiClock, FiPercent, FiInfo } from 'react-icons/fi'
import { promoApi } from '../lib/supabase'
import Header from '../components/Header'
import './PromoDetail.css'

const PromoDetail = () => {
  const { id } = useParams()
  const [promo, setPromo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        setLoading(true)
        const data = await promoApi.getById(id)
        setPromo(data)
      } catch (err) {
        setError('Promo tidak ditemukan.')
        console.error('Error fetching promo:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPromo()
  }, [id])

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <>
        <Header title="Detail Promo" showBack />
        <main className="detail-page">
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        </main>
      </>
    )
  }

  if (error || !promo) {
    return (
      <>
        <Header title="Detail Promo" showBack />
        <main className="detail-page">
          <div className="error-message">{error || 'Promo tidak ditemukan'}</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header title="Detail Promo" showBack />
      <main className="detail-page">
        <div className="detail-image-wrapper">
          <img
            src={promo.image_url || 'https://placehold.co/600x300/6B4423/FDF6E3?text=Promo'}
            alt={promo.title}
            className="detail-image"
          />
          <div className="promo-discount-badge">
            <FiPercent />
            <span>{promo.discount}% OFF</span>
          </div>
        </div>

        <div className="detail-content">
          <h1 className="detail-title">{promo.title}</h1>
          
          <div className="promo-validity">
            <FiClock />
            <span>Berlaku sampai {formatDate(promo.valid_until)}</span>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">
              <FiInfo /> Tentang Promo
            </h2>
            <p className="detail-description">{promo.description}</p>
          </div>

          {promo.terms && (
            <div className="detail-section">
              <h2 className="detail-section-title">Syarat & Ketentuan</h2>
              <p className="detail-description promo-terms">{promo.terms}</p>
            </div>
          )}

          {promo.promo_code && (
            <div className="promo-code-section">
              <span className="promo-code-label">Kode Promo:</span>
              <span className="promo-code">{promo.promo_code}</span>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default PromoDetail
