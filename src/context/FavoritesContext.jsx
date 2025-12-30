import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto (la mochila vacía)
const FavoritesContext = createContext();

// 2. Creamos el Proveedor (quien reparte los datos a la app)
export const FavoritesProvider = ({ children }) => {
  // Inicializamos el estado leyendo el LocalStorage (para no perder datos al recargar)
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('myFavorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      return [];
    }
  });

  // Cada vez que "favorites" cambie, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('myFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Función para agregar/quitar (Toggle)
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        // Si ya existe, lo quitamos (filtro todos MENOS ese)
        return prev.filter(id => id !== productId);
      } else {
        // Si no existe, lo agregamos
        return [...prev, productId];
      }
    });
  };

  // Helper para saber si un ID ya es favorito (devuelve true/false)
  const isFavorite = (productId) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 3. Hook personalizado para usarlo fácil en cualquier lado
export const useFavorites = () => useContext(FavoritesContext);