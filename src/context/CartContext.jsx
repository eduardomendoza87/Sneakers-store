import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  // Inicializar desde LocalStorage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("sneakersCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //  Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem("sneakersCart", JSON.stringify(cart));
  }, [cart]);

  // LÓGICA AGREGAR
  const addToCart = (product) => {
    // Generamos un ID único combinando el ID del producto y la talla
    const uniqueCartId = `${product.id}-${product.selectedSize}`;

    setCart((prevCart) => {
      // Buscamos si ya existe EXACTAMENTE ese producto con esa talla
      const existingItem = prevCart.find((item) => item.cartId === uniqueCartId);

      if (existingItem) {
        // Si existe, sumamos cantidad
        return prevCart.map((item) =>
          item.cartId === uniqueCartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no, lo agregamos con su nuevo ID único
        return [
          ...prevCart,
          { ...product, cartId: uniqueCartId, quantity: 1 },
        ];
      }
    });
  };

  // LÓGICA ELIMINAR
  const removeFromCart = (uniqueId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== uniqueId));
  };

  // LÓGICA CANTIDAD 
  const updateQuantity = (uniqueId, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartId === uniqueId) {
          const newQuantity = type === "increase" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQuantity) }; // Evita bajar de 1
        }
        return item;
      })
    );
  };

  // Totales
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};



  
