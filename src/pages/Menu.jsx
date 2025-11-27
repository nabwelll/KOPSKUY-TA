import { useState, useEffect } from 'react'
import { menuApi } from '../lib/supabase'
import Header from '../components/Header'
import MenuCard from '../components/MenuCard'
import './Menu.css'

const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true)
        const data = await menuApi.getAll()
        setMenuItems(data)
        setFilteredItems(data)
        
        // Extract unique categories
        const uniqueCategories = ['Semua', ...new Set(data.map(item => item.category))]
        setCategories(uniqueCategories)
      } catch (err) {
        setError('Gagal memuat menu. Silakan coba lagi.')
        console.error('Error fetching menu:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  const handleCategoryFilter = (category) => {
    setActiveCategory(category)
    if (category === 'Semua') {
      setFilteredItems(menuItems)
    } else {
      setFilteredItems(menuItems.filter(item => item.category === category))
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="menu-page">
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
        <main className="menu-page">
          <div className="error-message">{error}</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="menu-page">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-container">
          {filteredItems.length > 0 ? (
            <div className="menu-grid-full">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Tidak ada menu dalam kategori ini.</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Menu
