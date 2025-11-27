import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FiStar, FiCoffee } from 'react-icons/fi'
import { menuApi } from '../lib/supabase'
import Header from '../components/Header'
import './MenuDetail.css'


const MenuDetail = () => {
  const { id } = useParams()
  const [menuItem, setMenuItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true)
        const data = await menuApi.getById(id)
        setMenuItem(data)
      } catch (err) {
        setError('Menu tidak ditemukan.')
        console.error('Error fetching menu item:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItem()
  }, [id])

  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <>
        <Header title="Detail Menu" showBack />
        <main className="detail-page">
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        </main>
      </>
    )
  }

  if (error || !menuItem) {
    return (
      <>
        <Header title="Detail Menu" showBack />
        <main className="detail-page">
          <div className="error-message">{error || 'Menu tidak ditemukan'}</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header title="Detail Menu" showBack />
      <main className="detail-page">
        <div className="detail-image-wrapper">
          <img
            src={menuItem.image_url || 'https://placehold.co/600x400/6B4423/FDF6E3?text=Kopi'}
            alt={menuItem.name}
            className="detail-image"
          />
          {menuItem.is_popular && (
            <span className="detail-badge">
              <FiStar /> Menu Populer
            </span>
          )}
        </div>

        <div className="detail-content">
          <span className="detail-category">
            <FiCoffee /> {menuItem.category}
          </span>
          <h1 className="detail-title">{menuItem.name}</h1>
          <p className="detail-price">{formatPrice(menuItem.price)}</p>
          
          <div className="detail-section">
            <h2 className="detail-section-title">Deskripsi</h2>
            <p className="detail-description">{menuItem.description}</p>
          </div>

          {menuItem.ingredients && (
            <div className="detail-section">
              <h2 className="detail-section-title">Bahan-bahan</h2>
              <p className="detail-description">{menuItem.ingredients}</p>
            </div>
          )}

          {menuItem.notes && (
            <div className="detail-section">
              <h2 className="detail-section-title">Catatan</h2>
              <p className="detail-description">{menuItem.notes}</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default MenuDetail
