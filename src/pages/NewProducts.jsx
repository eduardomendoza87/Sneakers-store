import React from "react";
import { Heart} from 'lucide-react';
//Componentes
import SortFilter from "../components/ui/SortFilter";
import BrandFilter from "../components/ui/BrandFilter";
import PriceFilter from "../components/ui/PriceFilter";
import SizeFilter from "../components/ui/SizeFilter";
//Data
import { NewArrivals } from "../data/NewFeatures";

const NewProducts = () => {
    return(
        <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
        {/*Seccion 1: Titulo y filtro de ordenar */}
        <section className="px-10 py-16">
          <div className="max-w-7xl mx-auto mb-4">
            <div>
            <h1 className="text-5xl font-clash  font-bold mb-4 text-espresso "> Recien llegados</h1>
            </div>
        
            </div>
            </section>

            {/*Seccion 2: Filtro*/}
            <section className="px-10 py-16">
                <div className="max-w-7xl mx-auto mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 mb-4 gap-6">
                     <div>
                     <BrandFilter/>
                     </div>
                     <div>
                     <PriceFilter/>
                     </div>
                     <div>
                     <SizeFilter/>
                     </div>
                     <div>
                     <SortFilter/>
                     </div>
                     </div>
                </div>
            </section>

            {/*Seccion 3: Cards de novedades*/}
            <section className="px-10 py-16">
          <div className="max-w-7xl mx-auto mb-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {NewArrivals.map((item) => (
                        <div
                  key={item.id}
                  className="group relative bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-2xl hover:border-white/60 transition-all duration-300 overflow-hidden"
                >
                  {/* Título */}
                  <h3 className="text-espresso font-clash font-semibold text-xl mb-4 min-h-14">
                    {item.name}
                  </h3>
                  <p className="text-xl font-sans font-semibold text-espresso/50 mb-6">{item.gender}</p>

                  {/* Imagen del producto */}
                  <div className="relative h-48 mb-6 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]"
                    />
                  </div>

                  {/* Precio */}
                  <p className="text-2xl font-clash font-bold text-espresso mb-6">
                    {item.price}
                  </p>

                  {/* Botones */}
                  <div className="flex items-center gap-3">
                    {/* Botón: Añadir al carrito */}
                    <button
                      type="button"
                      className="flex-1 bg-fuzzy text-espresso text-base font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      Añadir
                    </button>

                    {/* Botón: Favoritos */}
                    <button
                      type="button"
                      className="p-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 hover:bg-fuzzy hover:scale-110 active:scale-95 transition-all duration-300"
                      aria-label="Agregar a favoritos"
                    >
                      <Heart size={24} className="text-espresso" />
                    </button>
                  </div>
                </div>
              ))}
                        </div>

            </div>
            </section>
          </div>


    );
};

export default NewProducts;