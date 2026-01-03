import { useState, useMemo } from 'react';

export const useProductFilters = (initialProducts) => {
  // --- ESTADOS DE LOS FILTROS ---
  const [filters, setFilters] = useState({
    brands: [],        // Array de marcas seleccionadas (ej: ['nike', 'adidas'])
    priceRange: [0, 10000], // Rango de precio [min, max]
    size: null,        // Talla seleccionada (ej: 26) - Nota: Tus componentes mandan un solo valor, no array
    sortBy: 'recent'   // Criterio de ordenamiento
  });

  // --- FUNCIONES PARA ACTUALIZAR FILTROS ---
  
  // Para BrandFilter (recibe array de marcas)
  const handleBrandChange = (selectedBrands) => {
    setFilters(prev => ({ ...prev, brands: selectedBrands }));
  };

  // Para PriceFilter (recibe [min, max])
  const handlePriceChange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  // Para SizeFilter (recibe una talla numérica)
  const handleSizeChange = (size) => {
    setFilters(prev => ({ ...prev, size }));
  };

  // Para SortFilter (recibe string de ID)
  const handleSortChange = (sortId) => {
    setFilters(prev => ({ ...prev, sortBy: sortId }));
  };

  // LÓGICA DE FILTRADO 
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    //  Filtrar por Marca
    if (filters.brands.length > 0) {
      // Normalizamos a minúsculas para comparar seguro
      result = result.filter(product => 
        filters.brands.includes(product.brand.toLowerCase().replace(' ', '-'))
      );
    }

    // Filtrar por Precio
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    //  Filtrar por Talla
    if (filters.size) {
      result = result.filter(product => 
        product.sizes.includes(filters.size)
      );
    }

    // Ordenar (Sort)
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'recent':
        // Asumiendo que isNew va primero, o si tienes fecha
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      // 'best' podría ser otra lógica
      default:
        break;
    }

    return result;
  }, [initialProducts, filters]);

  return {
    filteredProducts, // La lista lista para mapear
    filters,          
    handleBrandChange,
    handlePriceChange,
    handleSizeChange,
    handleSortChange
  };
};