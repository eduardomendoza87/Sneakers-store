import React from "react";
import { Heart } from 'lucide-react';

// Imagen Hero 
import WomenHero from "../assets/women-section/hero-coleccion-mujer.png";

// Componentes de Filtros
import SortFilter from "../components/ui/SortFilter";
import BrandFilter from "../components/ui/BrandFilter";
import PriceFilter from "../components/ui/PriceFilter";
import SizeFilter from "../components/ui/SizeFilter";

// Datos JSON
import products from '../data/products.json';

// CONTEXTO
import { useFavorites } from '../context/FavoritesContext';

const WomenCollection = () => {
    
    // ACTIVAR LA LÓGICA (Sacamos las funciones de la mochila)
    const { toggleFavorite, isFavorite } = useFavorites();

    // Filtramos los productos
    const filteredProducts = products.filter(product => 
        product.gender.includes('Mujer')
    );

    // Función auxiliar para formatear precio 
    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(price);
    };

    return (
      <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
        {/*Sección 1: Imagen Hero */}
        <section className="px-6 md:px-10 py-16">
          <div className="relative w-full h-96 md:h-125 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={WomenHero}
              alt="Colección Mujer"
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <BrandFilter />
              <PriceFilter />
              <SizeFilter />
              <SortFilter />
            </div>
          </div>
        </section>

        {/* Sección 3: Contador */}
        <section className="px-6 md:px-10 mb-8">
          <div className="max-w-7xl mx-auto border-b border-espresso/10 pb-4">
            <p className="text-espresso font-clash font-medium text-lg">
              Mostrando{" "}
              <span className="font-bold">{filteredProducts.length}</span>{" "}
              resultados
            </p>
          </div>
        </section>

        {/* Sección 4: Mapeo de Cards */}
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((item) => {
                //  VARIABLE: ¿Es favorito?
                const isLiked = isFavorite(item.id);

                return (
                  <div
                    key={item.id}
                    className="group relative bg-white/40 backdrop-blur-xl rounded-4xl p-5 border border-white/50 shadow-sm hover:shadow-2xl hover:bg-white/60 transition-all duration-500"
                  >
                    {/* Header Card: Título y Color */}
                    <div className="mb-4">
                      <h3 className="text-espresso font-clash font-bold text-lg leading-tight min-h-12">
                        {item.name}
                      </h3>
                      <p className="text-xs font-sans text-espresso/60 uppercase tracking-wider mt-1">
                        {item.color}
                      </p>
                    </div>

                    {/* Imagen del producto */}
                    <div className="relative h-52 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow-xl"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Precio */}
                    <div className="mb-6">
                      <span className="text-xl font-clash font-bold text-espresso">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex-1 bg-fuzzy text-almond text-sm font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-copperfield active:scale-95 transition-all duration-300"
                        >
                          Añadir
                        </button>

                        {/*  BOTÓN CORAZÓN CON LÓGICA */}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(item.id)}
                          className={`
                            p-3 rounded-xl border transition-all duration-300
                            ${
                              isLiked
                                ? "bg-red-100 border-red-200 hover:bg-red-200" // Estilo FAV
                                : "bg-white/50 border-white hover:bg-white hover:text-red-500" // Estilo NORMAL
                            }
                          `}
                          aria-label="Favoritos"
                        >
                          <Heart
                            size={20}
                            className={`transition-colors ${
                              isLiked
                                ? "fill-red-500 text-red-500"
                                : "text-espresso"
                            }`}
                          />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="w-full text-espresso text-sm font-semibold px-4 py-2.5 rounded-xl border border-espresso/20 hover:border-espresso hover:bg-espresso hover:text-white transition-all duration-300"
                      >
                        Ver Detalles
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
}

export default WomenCollection;