import React, {createContext, useContext, useState} from 'react';
import type {Product} from '../type';

interface CartProduct {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.name === product.name);

      if (existingItem) {
        return prevItems.map(item =>
          item.product.name === product.name
            ? {...item, quantity: item.quantity + quantity}
            : item
        );
      }

      return [...prevItems, {product, quantity}];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? {...item, quantity: newQuantity}
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity), 0
  );

  return (
    <CartContext.Provider
      value = {
  {
    cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice
  }
}
>
  {
    children
  }
  </CartContext.Provider>
)
  ;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
