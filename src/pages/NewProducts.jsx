import React from "react";
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componentes de Filtros
import SortFilter from "../components/ui/SortFilter";
import BrandFilter from "../components/ui/BrandFilter";
import PriceFilter from "../components/ui/PriceFilter";
import SizeFilter from "../components/ui/SizeFilter";

// Data
import products from '../data/products.json';

// Contextos y Hooks
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useProductFilters } from '../hooks/useProductFilters'; 

const NewProducts = () => {

    // CONTEXTOS
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToCart } = useCart();

    // BASE DE DATOS: Primero obtenemos solo los productos "Nuevos"
    const baseNewProducts = products.filter(item => item.isNew === true);

    //  Motor de filtros
    const { 
        filteredProducts, 
        handleBrandChange, 
        handlePriceChange, 
        handleSizeChange, 
        handleSortChange 
    } = useProductFilters(baseNewProducts);

    // Helper de moneda
    const formatPrice = (price) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

    return(
        <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
            
            {/* Sección 1: Título */}
            <section className="px-10 py-16">
                <div className="max-w-7xl mx-auto mb-4">
                    <div>
                        <h1 className="text-5xl font-clash font-bold mb-4 text-espresso">
                            Recién llegados
                        </h1>
                        <p className="text-espresso/60">
                            Mostrando {filteredProducts.length} lanzamientos exclusivos
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección 2: Filtros */}
            <section className="px-10 py-8">
                <div className="max-w-7xl mx-auto mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div><BrandFilter onChange={handleBrandChange} /></div>
                        <div><PriceFilter onChange={handlePriceChange} /></div>
                        <div><SizeFilter onChange={handleSizeChange} /></div>
                        <div><SortFilter onChange={handleSortChange} /></div>
                    </div>
                </div>
            </section>

            {/* Sección 3: Grid de Productos */}
            <section className="px-10 py-16">
                <div className="max-w-7xl mx-auto mb-12">
                    
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            
                            {filteredProducts.map((item) => {
                                
                                const isLiked = isFavorite(item.id);

                                return (
                                    <div
                                        key={item.id}
                                        className="group relative bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-2xl hover:border-white/60 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Header Card */}
                                        <div className="mb-4">
                                            <h3 className="text-espresso font-clash font-semibold text-xl mb-4 min-h-14 leading-tight">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm font-sans font-semibold text-espresso/50 mb-6 uppercase tracking-wider">
                                                {item.gender[0]}
                                            </p>
                                        </div>

                                        {/* Imagen */}
                                        <div className="relative h-48 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:rotate-[-5deg] drop-shadow-xl"
                                                onError={(e) => {e.target.src = "https://via.placeholder.com/300?text=No+Image"}} 
                                            />
                                        </div>

                                        {/* Precio */}
                                        <div className="mb-6">
                                            <p className="text-2xl font-clash font-bold text-espresso">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>

                                        {/* Botones */}
                                        <div className="flex flex-col gap-3">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(item)}
                                                    className="flex-1 bg-fuzzy text-white text-base font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-copperfield hover:scale-105 active:scale-95 transition-all duration-300"
                                                >
                                                    Añadir
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => toggleFavorite(item.id)}
                                                    className={`
                                                        p-3 rounded-full backdrop-blur-sm border transition-all duration-300
                                                        ${isLiked 
                                                            ? "bg-red-100 border-red-200 hover:bg-red-200" 
                                                            : "bg-white/40 border-white/60 hover:bg-white hover:text-fuzzy"
                                                        }
                                                    `}
                                                >
                                                    <Heart 
                                                        size={24} 
                                                        className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-espresso"}`} 
                                                    />
                                                </button>
                                            </div>

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
                        //  Estado Vacío 
                        <div className="text-center py-20 bg-white/20 rounded-3xl border border-white/30">
                            <h3 className="text-2xl font-clash text-espresso/60 mb-2">
                                No encontramos coincidencias
                            </h3>
                            <p className="text-espresso/40">Intenta ajustar tus filtros para ver más resultados.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default NewProducts;