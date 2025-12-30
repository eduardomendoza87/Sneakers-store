import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //  Estado inicial desde LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('myCart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  //  Guardar en LocalStorage cada cambio
  useEffect(() => {
    localStorage.setItem('myCart', JSON.stringify(cart));
  }, [cart]);

  //  Función: Agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // ¿Ya existe el producto?
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Si existe, aumentamos la cantidad +1
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  //  Función: Quitar del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  //  Función: Actualizar cantidad (+ o -)
  const updateQuantity = (productId, type) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          // Si la cantidad llega a 0, no hacemos nada (o podrías eliminarlo)
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
  };

  // Cálculos automáticos
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        cartCount, 
        cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);