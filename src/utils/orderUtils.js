const ORDER_HISTORY_KEY = 'kopskuy_order_history'

export const saveOrder = (orderData) => {
  try {
    const history = getOrderHistory()
    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      timestamp: Date.now(),
      status: 'completed',
      ...orderData
    }
    history.unshift(newOrder)
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history))
    return newOrder
  } catch (error) {
    console.error('Failed to save order:', error)
    return null
  }
}

export const getOrderHistory = () => {
  try {
    const history = localStorage.getItem(ORDER_HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Failed to get order history:', error)
    return []
  }
}

export const clearOrderHistory = () => {
  try {
    localStorage.removeItem(ORDER_HISTORY_KEY)
  } catch (error) {
    console.error('Failed to clear order history:', error)
  }
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}
