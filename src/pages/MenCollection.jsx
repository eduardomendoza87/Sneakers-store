import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from 'lucide-react'; 
// Imagen Hero 
import MenHero from "../assets/men-section/fondo-coleccion-hombre.png";

// Componentes de Filtros
import SortFilter from "../components/ui/SortFilter";
import BrandFilter from "../components/ui/BrandFilter";
import PriceFilter from "../components/ui/PriceFilter";
import SizeFilter from "../components/ui/SizeFilter";

// Datos 
import products from '../data/products.json';

// Contextos y Hooks
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useProductFilters } from '../hooks/useProductFilters'; 

const MenCollection = () => {
    
    // CONTEXTOS
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToCart } = useCart();
    
    // BASE DE DATOS: Obtenemos todos los de Hombre primero
    const baseMenProducts = products.filter(product => 
        product.gender.includes('Hombre')
    );

    // Motor de filtrado
    const { 
        filteredProducts, 
        handleBrandChange, 
        handlePriceChange, 
        handleSizeChange, 
        handleSortChange 
    } = useProductFilters(baseMenProducts);

    // Helper precio 
    const formatPrice = (price) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

    return (
      <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
        
        {/* Sección 1: Imagen Hero */}
        <section className="px-6 md:px-10 py-16">
          <div className="relative w-full h-96 md:h-125 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={MenHero}
              alt="Colección Hombre"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
              <div className="max-w-lg">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg font-clash">
                  Esencia <br /> Minimalista
                </h2>
                <p className="text-white/90 font-sans text-lg md:text-xl font-medium drop-shadow-md">
                  Menos ruido, más impacto. <br /> Descubre nuestra colección.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 2: Filtros */}
        <section className="px-6 md:px-10 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <BrandFilter onChange={handleBrandChange} />
              <PriceFilter onChange={handlePriceChange} />
              <SizeFilter onChange={handleSizeChange} />
              <SortFilter onChange={handleSortChange} />
            </div>
          </div>
        </section>

        {/* Sección 3: Contador */}
        <section className="px-6 md:px-10 mb-8">
          <div className="max-w-7xl mx-auto border-b border-espresso/10 pb-4">
            <p className="text-espresso font-clash font-medium text-lg">
              Mostrando <span className="font-bold">{filteredProducts.length}</span> resultados
            </p>
          </div>
        </section>

        {/* Sección 4: Mapeo de Cards */}
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Validamos si hay resultados */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                
                {/*  Mapeamos la lista FILTRADA */}
                {filteredProducts.map((item) => {
                    
                    const isLiked = isFavorite(item.id);

                    return (
                    <div
                        key={item.id}
                        className="group relative bg-white/40 backdrop-blur-xl rounded-4xl p-5 border border-white/50 shadow-sm hover:shadow-2xl hover:bg-white/60 transition-all duration-500"
                    >
                        {/* Header y Foto */}
                        <div className="mb-4">
                        <h3 className="text-espresso font-clash font-bold text-lg leading-tight min-h-12">{item.name}</h3>
                        <p className="text-xs font-sans text-espresso/60 uppercase tracking-wider mt-1">{item.color}</p>
                        </div>

                        <div className="relative h-52 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-contain drop-shadow-xl"
                        />
                        </div>

                        <div className="mb-6">
                        <span className="text-xl font-clash font-bold text-espresso">{formatPrice(item.price)}</span>
                        </div>

                        {/* Botones de accion*/}
                        <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            
                            {/* Boton añadir */}
                            <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="flex-1 bg-fuzzy text-almond text-sm font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-copperfield active:scale-95 transition-all duration-300"
                            >
                            Añadir
                            </button>

                            <button
                            type="button"
                            onClick={() => toggleFavorite(item.id)}
                            className={`
                                p-3 rounded-xl border transition-all duration-300
                                ${isLiked ? "bg-red-100 border-red-200 hover:bg-red-200" : "bg-white/50 border-white hover:bg-white hover:text-red-500"}
                            `}
                            >
                            <Heart size={20} className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-espresso"}`} />
                            </button>
                        </div>

                        {/* Ver detalles */}
                        <Link
                            to={`/producto/${item.id}`}
                            className="block w-full text-center text-espresso text-sm font-semibold px-4 py-2.5 rounded-xl border border-espresso/20 hover:border-espresso hover:bg-espresso hover:text-white transition-all duration-300"
                        >
                            Ver Detalles
                        </Link>
                        </div>
                    </div>
                    );
                })}
                </div>
            ) : (
                // Estado vacío si los filtros no encuentran nada
                <div className="text-center py-20 bg-white/20 rounded-3xl">
                    <h3 className="text-2xl font-clash text-espresso/50">No hay productos que coincidan con tus filtros.</h3>
                </div>
            )}
          </div>
        </section>
      </div>
    );
}

export default MenCollection;