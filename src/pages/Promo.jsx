import { useState, useEffect } from 'react'
import { promoApi } from '../lib/supabase'
import PromoCard from '../components/PromoCard'
import './Promo.css'


const Promo = () => {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setLoading(true)
        const data = await promoApi.getAll()
        setPromos(data)
      } catch (err) {
        setError('Gagal memuat promo. Silakan coba lagi.')
        console.error('Error fetching promos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPromos()
  }, [])

  if (loading) {
    return (
      <main className="promo-page">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="promo-page">
        <div className="error-message">{error}</div>
      </main>
    )
  }

  return (
    <main className="promo-page">
      <div className="promo-header">
        <h2 className="promo-page-title">Promo Spesial</h2>
        <p className="promo-page-subtitle">
          Jangan lewatkan berbagai promo menarik dari KOPSKUY!
        </p>
      </div>

      <div className="promo-container">
        {promos.length > 0 ? (
          <div className="promo-grid">
            {promos.map((promo) => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Belum ada promo saat ini. Nantikan promo menarik dari kami!</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Promo
