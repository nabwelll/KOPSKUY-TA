import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiMinus, FiTrash2, FiCreditCard, FiSmartphone, FiDollarSign, FiShoppingBag, FiCheck, FiTag, FiX, FiLoader } from 'react-icons/fi'
import Header from '../components/Header'
import LoadingScreen from '../components/LoadingScreen'
import { getCart, updateQuantity, removeFromCart, clearCart, getCartTotal, formatPrice } from '../utils/cartUtils'
import { promoApi } from '../lib/supabase'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    tableNumber: ''
  })
  const [errors, setErrors] = useState({})
  
  // Promo code state
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setCartItems(getCart())
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = updateQuantity(itemId, newQuantity)
    setCartItems(updatedCart)
  }

  const handleRemoveItem = (itemId) => {
    const updatedCart = removeFromCart(itemId)
    setCartItems(updatedCart)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Nama wajib diisi'
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi'
    } else if (!/^[0-9]{10,13}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid'
    }
    if (!customerInfo.tableNumber.trim()) {
      newErrors.tableNumber = 'Nomor meja wajib diisi'
    }
    if (!paymentMethod) {
      newErrors.payment = 'Pilih metode pembayaran'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Apply promo code
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Masukkan kode promo')
      return
    }

    setPromoLoading(true)
    setPromoError('')

    try {
      const promo = await promoApi.validatePromoCode(promoCode.trim())
      if (promo) {
        setAppliedPromo(promo)
        setPromoCode('')
        setPromoError('')
      } else {
        setPromoError('Kode promo tidak valid atau sudah kadaluarsa')
      }
    } catch {
      setPromoError('Gagal memvalidasi kode promo')
    } finally {
      setPromoLoading(false)
    }
  }

  // Remove applied promo
  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoCode('')
    setPromoError('')
  }

  // Calculate discount amount
  const getDiscountAmount = () => {
    if (!appliedPromo) return 0
    return Math.round((getCartTotal() * appliedPromo.discount) / 100)
  }

  // Calculate final total
  const getFinalTotal = () => {
    return getCartTotal() - getDiscountAmount()
  }

  const handleCheckout = async () => {
    if (!validateForm()) return
    
    setCheckoutLoading(true)
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setCheckoutLoading(false)
    setShowConfirmation(true)
    clearCart()
    setCartItems([])
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  const paymentMethods = [
    { id: 'cash', label: 'Tunai', icon: FiDollarSign },
    { id: 'qris', label: 'QRIS', icon: FiSmartphone },
    { id: 'card', label: 'Kartu Kredit', icon: FiCreditCard }
  ]

  if (loading) {
    return <LoadingScreen message="Memuat keranjang..." />
  }

  if (checkoutLoading) {
    return <LoadingScreen message="Memproses pesanan..." />
  }

  if (showConfirmation) {
    return (
      <>
        <Header title="Konfirmasi" showBack />
        <main className="cart-page">
          <div className="confirmation-container">
            <div className="confirmation-icon">
              <FiCheck />
            </div>
            <h2 className="confirmation-title">Pesanan Berhasil!</h2>
            <p className="confirmation-message">
              Terima kasih, {customerInfo.name}. Pesanan Anda sedang diproses.
            </p>
            <div className="confirmation-details">
              <p><strong>Metode Pembayaran:</strong> {paymentMethods.find(p => p.id === paymentMethod)?.label}</p>
              <p><strong>Nomor Meja:</strong> {customerInfo.tableNumber}</p>
            </div>
            <button className="btn-primary" onClick={handleBackToHome}>
              Kembali ke Beranda
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header title="Keranjang" showBack />
      <main className="cart-page">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingBag />
            </div>
            <h2>Keranjang Kosong</h2>
            <p>Belum ada menu yang ditambahkan ke keranjang.</p>
            <button className="btn-primary" onClick={() => navigate('/menu')}>
              Lihat Menu
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image_url || 'https://placehold.co/100x100/6B4423/FDF6E3?text=Kopi'}
                    alt={item.name}
                    className="cart-item-image"
                    loading="lazy"
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <FiMinus />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-row">
                <span>Total Item</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} item</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              {appliedPromo && (
                <div className="summary-row discount">
                  <span>Potongan Promo ({appliedPromo.discount}%)</span>
                  <span>-{formatPrice(getDiscountAmount())}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total Harga</span>
                <span>{formatPrice(getFinalTotal())}</span>
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="promo-section">
              <h3 className="section-title">
                <FiTag /> Kode Promo
              </h3>
              {appliedPromo ? (
                <div className="applied-promo">
                  <div className="applied-promo-info">
                    <FiCheck className="promo-success-icon" />
                    <div className="applied-promo-details">
                      <span className="applied-promo-code">{appliedPromo.promo_code}</span>
                      <span className="applied-promo-discount">Diskon {appliedPromo.discount}%</span>
                    </div>
                  </div>
                  <button className="remove-promo-btn" onClick={handleRemovePromo}>
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className="promo-input-wrapper">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase())
                      if (promoError) setPromoError('')
                    }}
                    placeholder="Masukkan kode promo"
                    className={promoError ? 'error' : ''}
                    disabled={promoLoading}
                  />
                  <button 
                    className="apply-promo-btn"
                    onClick={handleApplyPromo}
                    disabled={promoLoading}
                  >
                    {promoLoading ? <FiLoader className="spin" /> : 'Terapkan'}
                  </button>
                </div>
              )}
              {promoError && <p className="error-text">{promoError}</p>}
            </div>

            {/* Payment Method */}
            <div className="payment-section">
              <h3 className="section-title">Metode Pembayaran</h3>
              <div className="payment-methods">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    className={`payment-method ${paymentMethod === method.id ? 'active' : ''}`}
                    onClick={() => {
                      setPaymentMethod(method.id)
                      if (errors.payment) setErrors(prev => ({ ...prev, payment: '' }))
                    }}
                  >
                    <method.icon className="payment-icon" />
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>
              {errors.payment && <p className="error-text">{errors.payment}</p>}
            </div>

            {/* Customer Info */}
            <div className="customer-section">
              <h3 className="section-title">Informasi Pelanggan</h3>
              <div className="form-group">
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama Anda"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Nomor Telepon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Contoh: 08123456789"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="tableNumber">Nomor Meja</label>
                <input
                  type="text"
                  id="tableNumber"
                  name="tableNumber"
                  value={customerInfo.tableNumber}
                  onChange={handleInputChange}
                  placeholder="Contoh: 12"
                  className={errors.tableNumber ? 'error' : ''}
                />
                {errors.tableNumber && <p className="error-text">{errors.tableNumber}</p>}
              </div>
            </div>

            {/* Checkout Button */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout - {formatPrice(getFinalTotal())}
            </button>
          </>
        )}
      </main>
    </>
  )
}

export default Cart
