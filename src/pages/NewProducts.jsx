import React from "react";
import { Heart } from 'lucide-react';

// Componentes
import SortFilter from "../components/ui/SortFilter";
import BrandFilter from "../components/ui/BrandFilter";
import PriceFilter from "../components/ui/PriceFilter";
import SizeFilter from "../components/ui/SizeFilter";

// Data
import products from '../data/products.json'; 

// CONTEXTO
import { useFavorites } from '../context/FavoritesContext';

const NewProducts = () => {

    //  ACTIVAR LA LÓGICA DE FAVORITOS
    const { toggleFavorite, isFavorite } = useFavorites();

    // FILTRADO: Solo mostramos los que tienen isNew: true
    const newArrivals = products.filter(item => item.isNew === true);

    //HELPER: Función para formatear el precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(price);
    };

    return(
        <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
            
            {/* Seccion 1: Titulo */}
            <section className="px-10 py-16">
                <div className="max-w-7xl mx-auto mb-4">
                    <div>
                        <h1 className="text-5xl font-clash font-bold mb-4 text-espresso">
                            Recién llegados
                        </h1>
                        <p className="text-espresso/60">
                            Mostrando {newArrivals.length} lanzamientos exclusivos
                        </p>
                    </div>
                </div>
            </section>

            {/* Seccion 2: Filtros */}
            <section className="px-10 py-8">
                <div className="max-w-7xl mx-auto mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div><BrandFilter/></div>
                        <div><PriceFilter/></div>
                        <div><SizeFilter/></div>
                        <div><SortFilter/></div>
                    </div>
                </div>
            </section>

            {/* Seccion 3: Cards de novedades */}
            <section className="px-10 py-16">
                <div className="max-w-7xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* Mapeamos la lista filtrada con return explícito */}
                        {newArrivals.map((item) => {
                            
                            //  VARIABLE AUXILIAR
                            const isLiked = isFavorite(item.id);

                            return (
                                <div
                                    key={item.id}
                                    className="group relative bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-2xl hover:border-white/60 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Título */}
                                    <h3 className="text-espresso font-clash font-semibold text-xl mb-4 min-h-14 leading-tight">
                                        {item.name}
                                    </h3>
                                    
                                    {/* Género  */}
                                    <p className="text-sm font-sans font-semibold text-espresso/50 mb-6 uppercase tracking-wider">
                                        {item.gender[0]}
                                    </p>

                                    {/* Imagen del producto */}
                                    <div className="relative h-48 mb-6 flex items-center justify-center">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg] drop-shadow-xl"
                                            onError={(e) => {e.target.src = "https://via.placeholder.com/300?text=No+Image"}} 
                                        />
                                    </div>

                                    {/* Precio */}
                                    <p className="text-2xl font-clash font-bold text-espresso mb-6">
                                        {formatPrice(item.price)}
                                    </p>

                                    {/* Botones */}
                                    <div className="flex items-center gap-3">
                                        {/* Botón: Añadir */}
                                        <button
                                            type="button"
                                            className="flex-1 bg-fuzzy text-white text-base font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-copperfield hover:scale-105 active:scale-95 transition-all duration-300"
                                        >
                                            Añadir
                                        </button>

                                        {/* Botón: Favoritos Actualizado */}
                                        <button
                                            type="button"
                                            onClick={() => toggleFavorite(item.id)}
                                            className={`
                                                p-3 rounded-full backdrop-blur-sm border transition-all duration-300
                                                ${isLiked 
                                                    ? "bg-red-100 border-red-200 hover:bg-red-200" // Estilo FAV
                                                    : "bg-white/40 border-white/60 hover:bg-white hover:text-fuzzy" // Estilo NORMAL
                                                }
                                            `}
                                            aria-label="Agregar a favoritos"
                                        >
                                            <Heart 
                                                size={24} 
                                                className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-espresso"}`} 
                                            />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewProducts;