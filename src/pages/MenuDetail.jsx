import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FiStar, FiCoffee, FiShoppingCart, FiCheck } from 'react-icons/fi'
import { menuApi } from '../lib/supabase'
import Header from '../components/Header'
import { addToCart, formatPrice } from '../utils/cartUtils'
import './MenuDetail.css'


const MenuDetail = () => {
  const { id } = useParams()
  const [menuItem, setMenuItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)

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

  const handleAddToCart = () => {
    if (menuItem) {
      addToCart(menuItem)
      setAddedToCart(true)
      
      // Dispatch custom event to update cart count in BottomNav
      window.dispatchEvent(new Event('cartUpdated'))
      
      // Reset button after 2 seconds
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000)
    }
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
        <div className="detail-hero">
          <div className="detail-image-wrapper">
            <img
              src={menuItem.image_url || 'https://placehold.co/600x400/6B4423/FDF6E3?text=Kopi'}
              alt={menuItem.name}
              className="detail-image"
              loading="lazy"
            />
            <div className="detail-image-overlay"></div>
          </div>
          {menuItem.is_popular && (
            <span className="detail-badge popular">
              <FiStar /> Menu Populer
            </span>
          )}
          <span className="detail-category-badge">
            <FiCoffee /> {menuItem.category}
          </span>
        </div>

        <div className="detail-card">
          <div className="detail-header">
            <h1 className="detail-title">{menuItem.name}</h1>
            <p className="detail-price">{formatPrice(menuItem.price)}</p>
          </div>
          
          <div className="detail-divider"></div>
          
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

        {/* Add to Cart Button */}
        <button 
          className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? (
            <>
              <FiCheck className="btn-icon" />
              <span>Ditambahkan ke Keranjang</span>
            </>
          ) : (
            <>
              <FiShoppingCart className="btn-icon" />
              <span>Tambah ke Keranjang</span>
            </>
          )}
        </button>
      </main>
    </>
  )
}

export default MenuDetail
