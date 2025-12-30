import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';

// Imagenes
import FinalImage from "../assets/home-assets/fondo-hero-home.jpg"
import HeroHome from "../assets/home-assets/hero-home.png"

// Componentes
import CarruselFeatures from "../components/ui/CarruselText";

// Data
import products from '../data/products.json'; 
import { userReviews } from "../data/Home"; 

// Contextos
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext'; 

const Home = () => {
    // Estado para el formulario
    const [email, setEmail] = useState('');

    // ACTIVAR LÓGICA DE FAVORITOS Y CARRITO
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToCart } = useCart();

    // FILTRAR PRODUCTOS DESTACADOS 
    const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

    // Helper de precio
    const formatPrice = (price) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email registrado:', email);
        alert('¡Gracias por suscribirte!');
        setEmail('');
    };

    return (
      <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
        
        {/*Seccion 1: Hero section*/}
        <section className="px-10 py-16">
          <div className="max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/*Columna 1*/}
              <div>
                <h1 className="text-5xl font-clash  font-bold mb-10 text-espresso ">
                  {" "}
                  Redefiniendo el movimiento
                </h1>
                <p className="text-xl font-sans text-espresso mb-16">
                  Diseño orgánico y tecnología de vanguardia para quienes
                  caminan su propio camino.
                </p>
                <Link
                  to="/coleccion"
                  className="
                    inline-block
                    bg-fuzzy text-espresso text-lg font-semibold tracking-wide
                    px-8 py-4 rounded-2xl
                    shadow-lg hover:shadow-2xl
                    transition-all duration-300 ease-out
                    hover:bg-fuzzy/90 hover:scale-105 hover:-translate-y-1
                    active:scale-95 active:translate-y-0
                    focus:outline-none focus:ring-4 focus:ring-fuzzy/50 focus:ring-offset-2
                    relative overflow-hidden
                    group
                  "
                >
                  {/* Efecto de brillo en hover */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

                  {/* Texto del botón */}
                  <span className="relative z-10 flex items-center gap-2">
                    Explorar colecciones
                  </span>
                </Link>
              </div>
              
              {/*Columna 2*/}
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Capa base */}
                <div
                  className="absolute w-115 h-115
                    rounded-[50%_45%_55%_48%]
                    bg-linear-to-br from-cashmere to-whiskey"
                />

                {/* Capa blur */}
                <div
                  className="absolute w-105 h-105
                    rounded-full bg-[#E9BFA6]/50 blur-xl"
                />

                {/* Imagen */}
                <img
                  src={HeroHome}
                  alt="Nike Air Jordan Travis"
                  className="relative z-10 w-95 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/*Seccion 2: Carrusel de features*/}
        <section className="w-full mb-16 ">
          <CarruselFeatures />
        </section>

        {/* Sección 3: Lo más buscado */}
        <section className="px-10 py-16">
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-espresso font-clash font-semibold text-4xl md:text-5xl mb-12">
              Lo más buscado
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((item) => {
                
                const isLiked = isFavorite(item.id);

                return (
                    <div
                        key={item.id}
                        className="group relative bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-2xl hover:border-white/60 transition-all duration-300 overflow-hidden"
                    >
                        {/* Header Card: Título y Género */}
                        <div className="mb-4">
                            <h3 className="text-espresso font-clash font-semibold text-xl mb-4 min-h-14 leading-tight">
                                {item.name}
                            </h3>
                            <p className="text-sm font-sans font-semibold text-espresso/50 mb-6 uppercase tracking-wider">
                                {item.brand}
                            </p>
                        </div>

                        {/* Imagen del producto */}
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

                        {/* Botones de accion */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                
                                {/* Botón: Añadir */}
                                <button
                                    type="button"
                                    onClick={() => addToCart(item)}
                                    className="flex-1 bg-fuzzy text-white text-base font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-copperfield hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    Añadir
                                </button>

                                {/* Botón: Favoritos */}
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
                                    aria-label="Agregar a favoritos"
                                >
                                    <Heart 
                                        size={24} 
                                        className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-espresso"}`} 
                                    />
                                </button>
                            </div>

                            {/* Botón: Ver Detalles */}
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
          </div>
        </section>

        {/*Seccion 4: Opiniones de usuarios*/}
        <section className="bg-fuzzy px-10 py-16">
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-espresso font-clash font-semibold text-xl md:text-2xl mb-12 text-center">
              Reconocido por los creadores de cultura
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userReviews.map((review) => (
                <div
                  key={review.id}
                  className="group relative bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-2xl hover:border-white/60 transition-all duration-300 overflow-hidden"
                >
                  {/* Estrellas */}
                  <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>

                  {/* Título */}
                  <h3 className="font-bold text-xl mb-2">{review.title}</h3>

                  {/* Comentario */}
                  <p className="text-espresso/80 mb-4">{review.comment}</p>

                  {/* Usuario */}
                  <div className="flex items-center gap-3">
                    <img
                      src={review.user.avatar}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.user.name}</p>
                      {review.user.verified && (
                        <p className="text-sm text-espresso/60">verificado ✓</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 5: final hero */}
        <section className="w-full px-4 py-10 md:px-10">
          <div className="relative w-full h-100 md:h-125 rounded-xl overflow-hidden shadow-lg">
            <img
              src={FinalImage}
              alt="Colección Minimalista"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
              <div className="max-w-xs md:max-w-lg bg-white/30 backdrop-blur-sm p-4 rounded-lg md:bg-transparent md:backdrop-blur-none md:p-0">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Esencia <br /> minimalista
                </h2>
                <p className="text-gray-700 text-base md:text-xl font-medium">
                  Menos ruido, más impacto, descubre <br />
                  nuestra colección
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 6: CTA final */}
        <section className="px-6 md:px-10 py-24 ">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-espresso font-clash font-bold text-4xl md:text-5xl mb-6 text-center">
              Únete al club
            </h2>
            <p className="text-espresso/70 font-sans text-lg md:text-xl text-center mb-12">
              Recibe acceso anticipado a los próximos lanzamientos
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm border-b-2 border-espresso/30 text-center text-lg font-sans text-espresso placeholder:text-espresso/50 focus:outline-none focus:border-espresso focus:bg-white/70 transition-all duration-300 rounded-t-xl"
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="group relative bg-fuzzy text-espresso text-lg font-bold font-clash px-10 py-4 rounded-full shadow-xl shadow-fuzzy/40 hover:shadow-2xl hover:shadow-fuzzy/60 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Registrate</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
}
export default Home;