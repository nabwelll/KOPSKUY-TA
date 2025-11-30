import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCoffee, FiTag, FiShoppingCart, FiUser } from 'react-icons/fi';
import logo from '../assets/images/logo.png';
import { getCartCount } from '../utils/cartUtils';
import './TopNavbar.css';

const TopNavbar = () => {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };
    
    updateCartCount();
    
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Beranda', icon: FiHome },
    { path: '/menu', label: 'Menu', icon: FiCoffee },
    { path: '/cart', label: 'Keranjang', icon: FiShoppingCart, badge: cartCount },
    { path: '/promo', label: 'Promo', icon: FiTag },
    { path: '/about', label: 'Tentang', icon: FiUser },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="top-navbar">
      <div className="top-navbar-container">
        <Link to="/" className="top-navbar-brand">
          <img src={logo} alt="KOPSKUY Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          <span>KOPSKUY!</span>
        </Link>
        
        <div className="top-navbar-menu">
          {navItems.map(({ path, label, icon: Icon, badge }) => (
            <Link
              key={path}
              to={path}
              className={`top-navbar-link ${isActive(path) ? 'active' : ''}`}
            >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Icon size={20} />
                {badge > 0 && (
                  <span className="cart-badge">{badge > 99 ? '99+' : badge}</span>
                )}
              </div>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
