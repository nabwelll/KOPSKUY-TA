import { NavLink } from 'react-router-dom'
import { FiHome, FiCoffee, FiTag, FiUser } from 'react-icons/fi'
import './BottomNav.css'

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: FiHome, label: 'Beranda' },
    { to: '/menu', icon: FiCoffee, label: 'Menu' },
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
          <item.icon className="bottom-nav-icon" />
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
