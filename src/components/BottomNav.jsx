import React from 'react';
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiHome, FiCoffee, FiTag, FiUser, FiShoppingCart } from 'react-icons/fi'
import { getCartCount } from '../utils/cartUtils'
import './BottomNav.css'

const BottomNav = () => {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Update cart count on mount and when localStorage changes
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }
    
    updateCartCount()
    
    // Listen for storage events (for cross-tab synchronization)
    window.addEventListener('storage', updateCartCount)
    
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', updateCartCount)
    
    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  const navItems = [
    { to: '/', icon: FiHome, label: 'Beranda' },
    { to: '/menu', icon: FiCoffee, label: 'Menu' },
    { to: '/cart', icon: FiShoppingCart, label: 'Keranjang', badge: cartCount },
    { to: '/promo', icon: FiTag, label: 'Promo' },
    { to: '/about', icon: FiUser, label: 'Tentang' },
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <div className="bottom-nav-icon-wrapper">
            <item.icon className="bottom-nav-icon" />
            {item.badge > 0 && (
              <span className="cart-badge">{item.badge > 99 ? '99+' : item.badge}</span>
            )}
          </div>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
