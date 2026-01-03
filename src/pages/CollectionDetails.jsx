import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';

// Datos
import products from '../data/products.json';
import { allCollection } from '../data/collection';

// Componentes de Filtros
import PriceFilter from '../components/ui/PriceFilter';
import SortFilter from '../components/ui/SortFilter';
import SizeFilter from '../components/ui/SizeFilter';

// Contextos y Hooks
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext'; 
import { useProductFilters } from '../hooks/useProductFilters'; 

const CollectionDetails = () => {
  const { collectionId } = useParams();

  // CONTEXTOS
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  // INFO DE LA COLECCIÓN (Hero, Título, etc.)
  const currentCollectionInfo = allCollection.find(
    (item) => item.collectionId === collectionId
  );

  // BASE DE DATOS: Filtramos los productos que pertenecen a ESTA colección específica
  const baseCollectionProducts = products.filter(
    (product) => product.collection === collectionId
  );

  // Motor de filtrado
  const { 
      filteredProducts, 
      handlePriceChange, 
      handleSizeChange, 
      handleSortChange 
  } = useProductFilters(baseCollectionProducts);

  // Scroll al inicio al cambiar de colección
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collectionId]);

  // Protección si no existe la colección
  if (!currentCollectionInfo) {
    return <div className="text-center py-20 text-espresso font-clash text-2xl">Colección no encontrada</div>;
  }

  return (
    <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
      
      {/* Sección 1: Hero Dinámico */}
      <section className="px-6 md:px-10 py-12">
        <div className="relative w-full h-96 md:h-125 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img
            src={currentCollectionInfo.hero}
            alt={currentCollectionInfo.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => { e.target.src = "https://via.placeholder.com/1200x600?text=No+Image"; }}
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute inset-0 flex items-center justify-center text-center p-8">
            <div className="max-w-3xl">
              <Link
                to="/coleccion"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/20"
              >
                <ArrowLeft size={18} />
                Ver todas las colecciones
              </Link>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg font-clash">
                {currentCollectionInfo.title}
              </h1>
              <p className="text-white/90 font-sans text-xl md:text-2xl font-medium drop-shadow-md">
                {currentCollectionInfo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Filtros  */}
      <section className="px-6 md:px-10 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="w-full"><PriceFilter onChange={handlePriceChange} /></div>
            <div className="w-full"><SizeFilter onChange={handleSizeChange} /></div>
            <div className="w-full"><SortFilter onChange={handleSortChange} /></div>
          </div>
        </div>
      </section>

      {/* Sección 3: Grid de Productos */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Contador de Resultados */}
          <div className="mb-8 border-b border-espresso/10 pb-4">
            <p className="text-espresso font-clash font-medium text-lg">
              Mostrando <span className="font-bold">{filteredProducts.length}</span> modelos exclusivos
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              
              {/* Mapeo de Productos Filtrados */}
              {filteredProducts.map((item) => {
                
                const isLiked = isFavorite(item.id);

                return (
                  <div
                    key={item.id}
                    className="group relative bg-white/40 backdrop-blur-xl rounded-4xl p-5 border border-white/50 shadow-sm hover:shadow-2xl hover:bg-white/60 transition-all duration-500"
                  >
                    {/* Info Básica */}
                    <div className="mb-4">
                      <h3 className="text-espresso font-clash font-bold text-lg leading-tight min-h-12">
                        {item.name}
                      </h3>
                      <p className="text-xs font-sans text-espresso/60 uppercase tracking-wider mt-1">
                        {item.color}
                      </p>
                    </div>

                    {/* Imagen */}
                    <div className="relative h-52 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow-xl"
                      />
                    </div>

                    {/* Precio */}
                    <div className="mb-6">
                      <span className="text-xl font-clash font-bold text-espresso">
                        {new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                        }).format(item.price)}
                      </span>
                    </div>

                    {/* Botones de Acción */}
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

                        {/* Boton favoritos */}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(item.id)}
                          className={`
                            p-3 rounded-xl border transition-all duration-300
                            ${isLiked 
                                ? "bg-red-100 border-red-200 hover:bg-red-200" 
                                : "bg-white/50 border-white hover:bg-white hover:text-red-500"
                            }
                          `}
                          aria-label="Favoritos"
                        >
                          <Heart
                            size={20}
                            className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-espresso"}`}
                          />
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
            // Estado vacío (Sin resultados)
            <div className="text-center py-20 bg-white/20 rounded-4xl border border-white/30">
              <h3 className="text-2xl font-clash text-espresso/50 mb-2">
                No encontramos modelos en esta colección con esos filtros.
              </h3>
              <p className="text-espresso/40">Intenta ajustar el precio o la talla.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CollectionDetails;