import { Heart, ShoppingCart, Search, User, X, Menu, Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Datos
import products from '../data/products.json';

// Contexto
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();

  // Usamos el contexto del carrito
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  const tabs = [
    { id: 'inicio', label: 'Inicio', path: '/' },
    { id: 'novedades', label: 'Novedades', path: '/novedades' },
    { id: 'hombre', label: 'Hombre', path: '/hombre' },
    { id: 'mujer', label: 'Mujer', path: '/mujer' },
    { id: 'coleccion', label: 'Colección', path: '/coleccion' }
  ];

  const handleNavigation = (path, id) => {
    setActiveTab(id);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Formateador de moneda
  const formatPrice = (price) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);

  // LÓGICA DE BÚSQUEDA
  const filteredProducts = searchQuery.length > 0 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <nav className="w-full sticky top-0 z-50 bg-almond transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          {/* LOGO */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h1
              onClick={() => handleNavigation("/", "inicio")}
              className="text-2xl font-bold font-clash text-espresso cursor-pointer"
            >
              Sneakers <span className="text-fuzzy">Store</span>
            </h1>
          </div>

          {/* TABS */}
          <div className="hidden md:flex items-center gap-2 bg-white/30 backdrop-blur-lg px-6 py-3 rounded-3xl shadow-lg border border-white/40">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavigation(tab.path, tab.id)}
                className={`
                  px-6 py-2 text-md font-medium rounded-2xl transition-all duration-500
                  ${
                    activeTab === tab.id
                      ? "bg-white/45 text-espresso shadow-md"
                      : "text-espresso/70 hover:text-espresso"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ICONOS */}
          <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-6 md:gap-6">
            <button
              className="md:hidden text-espresso hover:text-fuzzy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            <button
              onClick={() => navigate("/favoritos")}
              className="text-fuzzy hover:text-copperfield transition-colors duration-200"
            >
              <Heart className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* CARRITO BUTTON */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-fuzzy hover:text-copperfield transition-colors duration-200 relative"
            >
              <ShoppingCart className="w-6 h-6" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-fuzzy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-fuzzy hover:text-copperfield transition-colors duration-200"
            >
              <Search className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 p-4">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleNavigation(tab.path, tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium ${
                    activeTab === tab.id
                      ? "bg-fuzzy text-white"
                      : "text-espresso hover:bg-white/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-60">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full md:w-125 bg-white/80 backdrop-blur-xl md:m-4 md:h-[calc(100%-32px)] md:rounded-[2.5rem] shadow-2xl flex flex-col border border-white/50">
            <div className="flex items-center justify-between p-8 border-b border-espresso/5">
              <h2 className="text-3xl font-clash font-bold text-espresso">
                Tu bolsa <span className="text-fuzzy">({cartCount})</span>
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-espresso" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.cartId || item.id} 
                    className="group relative bg-white/50 rounded-3xl p-4 flex gap-4 border border-white/60 shadow-sm"
                  >
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-clash font-semibold text-espresso leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-espresso/60 mt-1 uppercase">
                          Talla: <span className="font-bold text-espresso">{item.selectedSize} MX</span>
                        </p>
                        <p className="text-sm font-bold text-espresso mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-white/80 rounded-xl px-2 py-1 border border-espresso/10">
                          
                          {/* Botón Disminuir*/}
                          <button
                            onClick={() => updateQuantity(item.cartId || item.id, "decrease")}
                            className="p-1 hover:text-fuzzy disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          
                          <span className="text-sm font-semibold w-4 text-center">
                            {item.quantity}
                          </span>
                          
                          {/* Botón Aumentar*/}
                          <button
                            onClick={() => updateQuantity(item.cartId || item.id, "increase")}
                            className="p-1 hover:text-fuzzy"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Botón Eliminar */}
                        <button
                          onClick={() => removeFromCart(item.cartId || item.id)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingCart size={48} className="mb-4 text-espresso" />
                  <p className="font-clash text-xl">Tu bolsa está vacía</p>
                  <p className="text-sm">¡Agrega algo con estilo!</p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-white/60 backdrop-blur-md border-t border-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-b-[2.5rem]">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-espresso/70 font-medium">Subtotal</span>
                  <span className="text-2xl font-clash font-bold text-espresso">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button className="w-full bg-fuzzy text-white text-lg font-bold py-4 rounded-2xl shadow-xl shadow-fuzzy/30 hover:bg-copperfield hover:shadow-fuzzy/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  Ir a pagar
                </button>
                <p className="text-center text-xs text-espresso/40 mt-4">
                  Envío e impuestos calculados en el checkout
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL BÚSQUEDA */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-60">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="absolute right-0 top-0 h-screen md:top-20 md:h-auto md:w-96 w-full bg-white md:rounded-2xl shadow-2xl p-6 flex flex-col max-h-[80vh]">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-espresso">Buscar</h2>
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="w-5 h-5 text-espresso" />
              </button>
            </div>

            <div className="relative mb-6 shrink-0">
              <input
                type="text"
                placeholder="Busca un producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-almond px-4 py-3 rounded-xl text-sm text-espresso placeholder-espresso/50 focus:outline-none focus:ring-2 focus:ring-fuzzy pl-10"
                autoFocus
              />
              <Search className="absolute left-3 top-3 w-5 h-5 text-espresso/40" />
            </div>

            {/* LISTA DE RESULTADOS */}
            <div className="flex-1 overflow-y-auto pr-1">
                {searchQuery.length > 0 ? (
                    filteredProducts.length > 0 ? (
                        <div className="space-y-3">
                            {filteredProducts.map(product => (
                                <Link 
                                    to={`/producto/${product.id}`}
                                    key={product.id}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-almond/50 transition-colors group border border-transparent hover:border-espresso/5"
                                >
                                    <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center border border-espresso/10">
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-clash font-semibold text-espresso text-sm group-hover:text-fuzzy transition-colors">
                                            {product.name}
                                        </h4>
                                        <p className="text-xs text-espresso/50 uppercase tracking-wide">{product.brand}</p>
                                        <p className="text-sm font-bold text-espresso mt-1">{formatPrice(product.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-espresso/50">
                            <p>No encontramos nada con "{searchQuery}"</p>
                        </div>
                    )
                ) : (
                    <div className="text-center py-10 text-espresso/40 text-sm">
                        <p>Escribe nombre, marca o modelo...</p>
                    </div>
                )}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}