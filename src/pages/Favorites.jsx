import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react'; 
import { Link } from 'react-router-dom';

// Datos y el contexto
import products from '../data/products.json';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesSneakers = () => {
    //  Sacamos la lista de IDs favoritos y la función para quitarlos
    const { favorites, toggleFavorite } = useFavorites();

    //  Filtramos: Buscamos en el JSON los zapatos que coincidan con los IDs guardados
    const favoriteProducts = products.filter(product => favorites.includes(product.id));

    // Helper para precio
    const formatPrice = (price) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);

    return (
      <div className="bg-almond min-h-screen w-full overflow-x-hidden">
        {/*Sección 1: Encabezado */}
        <section className="px-6 md:px-10 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-clash font-bold text-espresso mb-4">
              Tus Favoritos
            </h1>
            <p className="text-xl text-espresso/60 font-medium">
              {favoriteProducts.length > 0
                ? "Guarda ahora, decide después"
                : "Tu lista de deseos está vacía"}
            </p>
          </div>
        </section>

        {/* Sección 2: Grid de Productos  */}
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-7xl mx-auto">
            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Mapeamos los productos filtrados */}
                {favoriteProducts.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-2xl hover:border-white/60 transition-all duration-300 overflow-hidden"
                  >
                    {/* Header de la Card */}
                    <div className="mb-4">
                      <h3 className="text-espresso font-clash font-semibold text-xl mb-1 min-h-14 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm font-sans font-semibold text-espresso/50 uppercase tracking-wider">
                        {item.gender[0]}
                      </p>
                    </div>

                    {/* Imagen */}
                    <div className="relative h-48 mb-6 flex items-center justify-center">
                      <img
                        src={item.images[0]} 
                        alt={item.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg] drop-shadow-xl"
                      />
                    </div>

                    {/* Precio */}
                    <p className="text-2xl font-clash font-bold text-espresso mb-6">
                      {formatPrice(item.price)}
                    </p>

                    {/* Botones de Acción */}
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2">
                      {/* Botón Añadir */}
                      <button
                        type="button"
                        className="flex-1 bg-fuzzy text-white text-base font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-copperfield hover:scale-105 active:scale-95 transition-all duration-300 flex justify-center items-center gap-2"
                      >
                        Añadir
                      </button>

                      {/* Botón Corazón  */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(item.id)}
                        className="p-3 rounded-full bg-red-100 border border-red-200 hover:bg-red-200 hover:scale-110 active:scale-95 transition-all duration-300 group/heart"
                        title="Quitar de favoritos"
                      >
                        <Heart
                          size={24}
                          className="text-red-500 fill-red-500"
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
                ))}
              </div>
            ) : (
              /*  Estado Vacío (Cuando no hay favoritos) */
              <div className="flex flex-col items-center justify-center py-20 bg-white/20 rounded-[3rem] border border-white/30 backdrop-blur-sm text-center px-4">
                <div className="bg-white/40 p-6 rounded-full mb-6">
                  <Heart size={64} className="text-espresso/30" />
                </div>
                <h2 className="text-3xl font-clash font-bold text-espresso mb-4">
                  ¿Aún no te decides?
                </h2>
                <p className="text-espresso/70 mb-8 max-w-md text-lg">
                  Explora nuestras colecciones icónicas y guarda aquí los
                  modelos que te roben el corazón.
                </p>
                <Link
                  to="/novedades"
                  className="px-10 py-4 bg-fuzzy text-white rounded-full font-bold text-lg hover:scale-105 hover:bg-copperfield transition-all shadow-xl"
                >
                  Explorar Novedades
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    );
};

export default FavoritesSneakers;