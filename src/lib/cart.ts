export interface CartItem {
  id: string;
  fragranceId: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Mock cart functionality using localStorage
export const getCart = (): Cart => {
  if (typeof window === 'undefined') {
    return { items: [], total: 0, itemCount: 0 };
  }

  const cartData = localStorage.getItem('fragrance-cart');
  if (!cartData) {
    return { items: [], total: 0, itemCount: 0 };
  }

  const cart = JSON.parse(cartData);
  return calculateCartTotals(cart);
};

export const addToCart = (item: Omit<CartItem, 'id'>): Cart => {
  const cart = getCart();
  const existingItem = cart.items.find(
    cartItem => cartItem.fragranceId === item.fragranceId && cartItem.size === item.size
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    const newItem: CartItem = {
      ...item,
      id: `${item.fragranceId}-${item.size}-${Date.now()}`
    };
    cart.items.push(newItem);
  }

  const updatedCart = calculateCartTotals(cart);
  localStorage.setItem('fragrance-cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const removeFromCart = (itemId: string): Cart => {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.id !== itemId);
  
  const updatedCart = calculateCartTotals(cart);
  localStorage.setItem('fragrance-cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const updateCartItemQuantity = (itemId: string, quantity: number): Cart => {
  const cart = getCart();
  const item = cart.items.find(item => item.id === itemId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }
    item.quantity = quantity;
  }

  const updatedCart = calculateCartTotals(cart);
  localStorage.setItem('fragrance-cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const clearCart = (): Cart => {
  const emptyCart = { items: [], total: 0, itemCount: 0 };
  localStorage.setItem('fragrance-cart', JSON.stringify(emptyCart));
  return emptyCart;
};

const calculateCartTotals = (cart: { items: CartItem[] }): Cart => {
  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  return {
    ...cart,
    total,
    itemCount
  };
};