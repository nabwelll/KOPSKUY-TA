import { useState, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { menuApi } from '../lib/supabase'
import MenuCard from '../components/MenuCard'
import './Menu.css'


const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
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

  useEffect(() => {
    // Filter items based on category and search query
    let results = menuItems

    // Apply category filter
    if (activeCategory !== 'Semua') {
      results = results.filter(item => item.category === activeCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    }

    setFilteredItems(results)
  }, [menuItems, activeCategory, searchQuery])

  const handleCategoryFilter = (category) => {
    setActiveCategory(category)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  if (loading) {
    return (
      <main className="menu-page">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="menu-page">
        <div className="error-message">{error}</div>
      </main>
    )
  }

  return (
    <main className="menu-page">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari menu favorit kamu..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="search-clear" onClick={clearSearch}>
              <FiX />
            </button>
          )}
        </div>
      </div>

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
            <p>{searchQuery ? 'Tidak ada hasil untuk pencarian "' + searchQuery + '"' : 'Tidak ada menu dalam kategori ini.'}</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Menu
