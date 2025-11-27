import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiCoffee, FiTag, FiArrowRight } from 'react-icons/fi'
import { menuApi, promoApi } from '../lib/supabase'
import Header from '../components/Header'
import MenuCard from '../components/MenuCard'
import PromoCard from '../components/PromoCard'
import './Home.css'


const Home = () => {
  const [popularMenu, setPopularMenu] = useState([])
  const [latestPromos, setLatestPromos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [menuData, promoData] = await Promise.all([
          menuApi.getAll(),
          promoApi.getAll()
        ])
        
        // Get popular items (max 4)
        const popular = menuData.filter(item => item.is_popular).slice(0, 4)
        setPopularMenu(popular.length > 0 ? popular : menuData.slice(0, 4))
        
        // Get latest promos (max 2)
        setLatestPromos(promoData.slice(0, 2))
      } catch (err) {
        setError('Gagal memuat data. Silakan coba lagi.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <main className="home-page">
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="home-page">
          <div className="error-message">{error}</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">
              Selamat Datang di <span>KOPSKUY!</span>
            </h2>
            <p className="hero-subtitle">
              Nikmati kopi berkualitas tinggi dengan berbagai pilihan menu dan promo menarik
            </p>
            <Link to="/menu" className="hero-cta">
              Lihat Menu <FiArrowRight />
            </Link>
          </div>
        </section>

        {/* Popular Menu Section */}
        <section className="home-section">
          <div className="section-header">
            <div className="section-title-group">
              <FiCoffee className="section-icon" />
              <h2 className="section-title">Menu Populer</h2>
            </div>
            <Link to="/menu" className="section-link">
              Lihat Semua <FiArrowRight />
            </Link>
          </div>
          <div className="menu-grid">
            {popularMenu.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Promo Section */}
        {latestPromos.length > 0 && (
          <section className="home-section">
            <div className="section-header">
              <div className="section-title-group">
                <FiTag className="section-icon" />
                <h2 className="section-title">Promo Terbaru</h2>
              </div>
              <Link to="/promo" className="section-link">
                Lihat Semua <FiArrowRight />
              </Link>
            </div>
            <div className="promo-list">
              {latestPromos.map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default Home
