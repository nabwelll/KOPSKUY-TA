import { useState, useEffect } from 'react'
import { FiClock, FiCheckCircle, FiShoppingBag, FiChevronRight } from 'react-icons/fi'
import LoadingScreen from '../components/LoadingScreen'
import { getOrderHistory, formatPrice } from '../utils/orderUtils'
import './History.css'

const History = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(getOrderHistory())
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': 
        return 'status-completed'
      case 'processing': 
        return 'status-processing'
      default: 
        return ''
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': 
        return 'Selesai'
      case 'processing': 
        return 'Diproses'
      default: 
        return status
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <LoadingScreen message="Memuat riwayat..." />
  }

  if (selectedOrder) {
    return (
      <main className="history-page">
        <div className="order-detail">
          <button className="back-btn" onClick={() => setSelectedOrder(null)}>
            ← Kembali
          </button>
          <div className="order-detail-header">
            <h2>Detail Pesanan</h2>
            <span className={`status-badge ${getStatusColor(selectedOrder.status)}`}>
              {getStatusText(selectedOrder.status)}
            </span>
          </div>
          <div className="order-detail-info">
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Tanggal:</strong> {formatDate(selectedOrder.timestamp)}</p>
            <p><strong>Nama:</strong> {selectedOrder.customerInfo.name}</p>
            <p><strong>No. Meja:</strong> {selectedOrder.customerInfo.tableNumber}</p>
            <p><strong>Pembayaran:</strong> {selectedOrder.paymentMethod}</p>
          </div>
          <div className="order-detail-items">
            <h3>Item Pesanan</h3>
            {selectedOrder.items.map((item, index) => (
              <div key={index} className="order-detail-item">
                <img 
                  src={item.image_url || 'https://placehold.co/60x60/6B4423/FDF6E3?text=Kopi'} 
                  alt={item.name} 
                />
                <div className="order-detail-item-info">
                  <h4>{item.name}</h4>
                  <p>{formatPrice(item.price)} x {item.quantity}</p>
                </div>
                <span className="order-detail-item-total">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="order-detail-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(selectedOrder.subtotal)}</span>
            </div>
            {selectedOrder.discount > 0 && (
              <div className="summary-row discount">
                <span>Diskon</span>
                <span>-{formatPrice(selectedOrder.discount)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(selectedOrder.total)}</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="history-page">
      <div className="history-header">
        <h1>Riwayat Pesanan</h1>
      </div>
      {orders.length === 0 ? (
        <div className="empty-history">
          <div className="empty-history-icon">
            <FiShoppingBag />
          </div>
          <h2>Belum Ada Pesanan</h2>
          <p>Riwayat pesanan Anda akan muncul di sini.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div 
              key={order.orderId} 
              className="order-card"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="order-card-header">
                <div className="order-id">
                  <FiClock />
                  <span>{order.orderId}</span>
                </div>
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="order-card-date">
                {formatDate(order.timestamp)}
              </div>
              <div className="order-card-items">
                {order.items.slice(0, 2).map((item, index) => (
                  <span key={index}>{item.name}</span>
                ))}
                {order.items.length > 2 && (
                  <span className="more-items">+{order.items.length - 2} lainnya</span>
                )}
              </div>
              <div className="order-card-footer">
                <div className="order-total">
                  <span>Total</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
                <FiChevronRight className="chevron-icon" />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default History
