import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Truck, RotateCcw } from 'lucide-react';

// Datos
import products from '../data/products.json';

// Contextos
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext'; 

const SneakersDetails = () => {
    // Obtener ID
    const { productId } = useParams(); 
    
    // Contextos
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToCart } = useCart();

    // Buscar Producto
    const product = products.find(item => item.id === productId);

    // Estados Locales
    const [activeTab, setActiveTab] = useState('detalles'); 
    const [selectedSize, setSelectedSize] = useState(null); // Estado para la talla

    // Helper de precio
    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(price);
    };

    // Protección: Si no existe el producto
    if (!product) {
        return <div className="text-center py-20 text-espresso font-clash text-xl">Producto no encontrado :(</div>;
    }

    // FUNCIÓN CRÍTICA: AÑADIR AL CARRITO
    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("¡Por favor selecciona una talla!");
            return;
        }

        // Creamos un objeto especial para el carrito que incluye la talla y un ID único
        const productToAdd = {
            ...product,
            selectedSize: selectedSize, 
            cartId: `${product.id}-${selectedSize}` //  ID único combinando modelo + talla
        };

        addToCart(productToAdd);
    };

    return (
      <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
        <section className="px-6 md:px-10 mb-8 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Botón Volver */}
            <div className="flex items-start justify-start mb-8">
              <Link
                to={-1}
                className="flex items-center gap-2 text-espresso text-lg font-semibold hover:text-fuzzy transition-colors"
              >
                <ArrowLeft /> Volver
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/*COLUMNA 1: GALERÍA Y TABS */}
              <div className="flex flex-col gap-6">
                
                {/* Imagen Principal */}
                <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 shadow-sm flex items-center justify-center h-100 md:h-125 relative overflow-hidden group">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Miniaturas */}
                <div className="grid grid-cols-3 gap-4">
                  {product.images.slice(0, 3).map((img, index) => (
                    <div
                      key={index}
                      className="bg-white/40 backdrop-blur-xl rounded-3xl p-4 border border-white/50 shadow-sm flex items-center justify-center h-32 cursor-pointer hover:bg-white/60 transition-all duration-300"
                    >
                      <img
                        src={img}
                        alt={`Vista ${index}`}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  ))}
                </div>

                {/* Sección de Pestañas (Tabs) */}
                <div className="mt-4 bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 shadow-sm">
                  {/* Encabezados */}
                  <div className="flex items-center gap-8 border-b border-espresso/10 pb-4 mb-6">
                    {["detalles", "reseñas"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                          text-lg font-clash font-medium relative transition-all duration-300 capitalize
                          ${activeTab === tab ? "text-espresso" : "text-espresso/40 hover:text-espresso/70"}
                        `}
                      >
                        {tab}
                        {activeTab === tab && (
                          <span className="absolute -bottom-4.25 left-0 w-full h-0.75 bg-fuzzy rounded-full transition-all duration-300" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Contenido Dinámico */}
                  <div className="min-h-30">
                    {/* Contenido: Detalles */}
                    {activeTab === "detalles" && (
                      <div className="animate-fade-in-up">
                        <p className="text-espresso/80 leading-relaxed text-base md:text-lg">
                          {product.description}
                        </p>
                      </div>
                    )}

                    {/* Contenido: Reseñas */}
                    {activeTab === "reseñas" && (
                      <div className="animate-fade-in-up space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
                        {product.reviews && product.reviews.length > 0 ? (
                          product.reviews.map((review, index) => (
                            <div key={index} className="bg-white/50 p-4 rounded-2xl border border-white/60 shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-espresso">{review.user}</h4>
                                <div className="flex text-yellow-500 text-sm tracking-widest">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-espresso/70 italic mb-3">"{review.comment}"</p>
                              <p className="text-xs text-espresso/40 font-semibold uppercase tracking-wider text-right">{review.date}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 opacity-50">
                            <p>Aún no hay reseñas para este modelo.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* COLUMNA 2: INFORMACIÓN Y COMPRA */}
              <div className="flex flex-col gap-6">
                <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 shadow-sm sticky top-24">
                    
                    {/* Título y Precio */}
                    <div className="mb-8 border-b border-espresso/10 pb-6">
                        <h1 className="text-4xl md:text-5xl font-clash font-bold text-espresso mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <span className="text-3xl font-clash font-semibold text-espresso">
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    {/* Selector de Color (Visual) */}
                    <div className="mb-8">
                        <h3 className="text-lg font-clash font-medium text-espresso mb-3">Color</h3>
                        <div className="flex items-center gap-4">
                            <button 
                                className="w-12 h-12 rounded-full border-2 border-white ring-2 ring-espresso shadow-lg transition-transform hover:scale-110 bg-gray-200" 
                                title={product.color}
                            />
                            <div className="text-sm text-espresso/60 font-medium">{product.color}</div>
                        </div>
                    </div>

                    {/* Selector de Tallas  */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-clash font-medium text-espresso">Talla (MX)</h3>
                            <button className="text-xs font-bold text-espresso/50 underline hover:text-fuzzy">Guía de tallas</button>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3">
                            {product.sizes && product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)} // Guardar selección
                                    className={`
                                        py-3 rounded-xl border text-sm font-bold transition-all duration-200
                                        ${selectedSize === size 
                                            ? "bg-espresso text-white border-espresso shadow-lg scale-105" // Activo
                                            : "border-espresso/20 text-espresso hover:border-espresso hover:bg-white" // Inactivo
                                        }
                                    `}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        {/* Mensaje de validación visual */}
                        {!selectedSize && <p className="text-fuzzy text-xs mt-2 font-medium animate-pulse">* Selecciona una talla</p>}
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedSize} // Deshabilitar si no hay talla
                            className={`
                                flex-1 text-white text-lg font-bold py-4 rounded-full shadow-xl transition-all duration-300
                                ${selectedSize 
                                    ? "bg-fuzzy hover:bg-copperfield hover:scale-[1.02] cursor-pointer shadow-fuzzy/30" 
                                    : "bg-gray-300 cursor-not-allowed shadow-none"
                                }
                            `}
                        >
                            {selectedSize ? "Añadir al carrito" : "Elige una talla"}
                        </button>

                        <button
                            onClick={() => toggleFavorite(product.id)}
                            className={`
                                p-4 rounded-full border-2 transition-all duration-300
                                ${isFavorite(product.id)
                                    ? "bg-red-50 border-red-200"
                                    : "bg-white/40 border-white/60 hover:border-espresso/30"
                                }
                            `}
                        >
                            <Heart
                                size={28}
                                className={isFavorite(product.id) ? "fill-red-500 text-red-500" : "text-espresso"}
                            />
                        </button>
                    </div>

                    {/* Info Extra */}
                    <div className="mt-8 flex items-center justify-between text-xs text-espresso/60 font-medium px-1">
                        <span className="flex items-center gap-2">
                            <Truck size={18} className="text-fuzzy" /> 
                            Envío gratuito &gt; $2,999
                        </span>
                        <span className="flex items-center gap-2">
                            <RotateCcw size={18} className="text-fuzzy" /> 
                            Devoluciones gratis (30 días)
                        </span>
                    </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
}

export default SneakersDetails;