// Cart utility functions for localStorage management

const CART_KEY = 'kopskuy_cart'

// Get cart from localStorage
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY)
    return cart ? JSON.parse(cart) : []
  } catch {
    console.error('Error reading cart from localStorage')
    return []
  }
}

// Save cart to localStorage
export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  } catch {
    console.error('Error saving cart to localStorage')
  }
}

// Add item to cart
export const addToCart = (item) => {
  const cart = getCart()
  const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id)
  
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }
  
  saveCart(cart)
  return cart
}

// Remove item from cart
export const removeFromCart = (itemId) => {
  const cart = getCart()
  const updatedCart = cart.filter(item => item.id !== itemId)
  saveCart(updatedCart)
  return updatedCart
}

// Update item quantity
export const updateQuantity = (itemId, quantity) => {
  const cart = getCart()
  const itemIndex = cart.findIndex(item => item.id === itemId)
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1)
    } else {
      cart[itemIndex].quantity = quantity
    }
    saveCart(cart)
  }
  
  return cart
}

// Get cart item count
export const getCartCount = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.quantity, 0)
}

// Get cart total price
export const getCartTotal = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}

// Clear cart
export const clearCart = () => {
  saveCart([])
  return []
}

// Format price to Indonesian Rupiah
export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}
