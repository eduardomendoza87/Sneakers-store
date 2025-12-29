import { Heart, ShoppingCart, Search, User, X, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const tabs = [
    { id: 'inicio', label: 'Inicio', path: '/' },
    { id: 'novedades', label: 'Novedades', path: '/novedades' },
    { id: 'hombre', label: 'Hombre', path: '/hombre' },
    { id: 'mujer', label: 'Mujer', path: '/mujer' },
    { id: 'coleccion', label: 'Colección', path: '/coleccion' }
  ];

  // Función para manejar la navegación
  const handleNavigation = (path, id) => {
    setActiveTab(id);
    navigate(path); // para manejar las rutas
    setIsMobileMenuOpen(false); // Cerramos menú móvil si está abierto
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-almond transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* CONTENEDOR PRINCIPAL: Columna en móvil, Fila en escritorio */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          
          {/*  LOGO (Arriba en móvil, Izquierda en Desktop) */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h1 
              onClick={() => handleNavigation('/', 'inicio')}
              className="text-2xl font-bold font-clash text-espresso cursor-pointer"
            >
              Sneakers <span className="text-fuzzy">Store</span>
            </h1>
          </div>

          {/* TABS NAVIGATION (Oculto en móvil, Visible en Desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-white/30 backdrop-blur-lg px-6 py-3 rounded-3xl shadow-lg border border-white/40">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavigation(tab.path, tab.id)}
                className={`
                  px-6 py-2 text-md font-medium rounded-2xl 
                  transition-all duration-500
                  ${activeTab === tab.id
                    ? "bg-white/45 text-espresso shadow-md"
                    : "text-espresso/70 hover:text-espresso"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/*  ICONOS FUNCIONALES (Abajo del logo en móvil, Derecha en Desktop) */}
          <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-6 md:gap-6">
            
            {/* Botón Menú Hamburguesa (SOLO MÓVIL) */}
            <button 
              className="md:hidden text-espresso hover:text-fuzzy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Favoritos */}
            <button
              onClick={() => navigate('/favoritos')}
              className="text-fuzzy hover:text-copperfield transition-colors duration-200"
              aria-label="favoritos"
            >
              <Heart className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Carrito */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-fuzzy hover:text-copperfield transition-colors duration-200 relative"
              aria-label="carrito"
            >
              <ShoppingCart className="w-6 h-6" strokeWidth={2} />
              <span className="absolute -top-2 -right-2 bg-fuzzy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            {/* Búsqueda */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-fuzzy hover:text-copperfield transition-colors duration-200"
              aria-label="buscar"
            >
              <Search className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Perfil */}
            <button
              onClick={() => navigate('/perfil')}
              className="text-fuzzy hover:text-copperfield transition-colors duration-200"
              aria-label="perfil"
            >
              <User className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/*  MENÚ DESPLEGABLE MÓVIL (Solo visible si está abierto y es móvil) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 p-4 animate-fade-in-down">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleNavigation(tab.path, tab.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl font-medium transition-colors
                    ${activeTab === tab.id
                      ? "bg-fuzzy text-white"
                      : "text-espresso hover:bg-white/50"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/*  MODALES EXISTENTES (Carrito y Búsqueda) */}
      
      {/* MODAL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50"> {/* Subí z-index */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-screen md:top-20 md:h-auto md:w-96 w-full bg-white md:rounded-2xl shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-espresso">Tu Carrito</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-5 h-5 text-espresso" />
              </button>
            </div>
            {/* ... Contenido del carrito ... */}
             <div className="space-y-4 mb-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3 pb-4 border-b border-almond">
                  <div className="w-16 h-16 bg-almond rounded-lg" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-espresso">Nike Air Max</p>
                    <p className="text-xs text-espresso/60">$150.00</p>
                    <p className="text-xs text-espresso/60 mt-1">Cantidad: 1</p>
                  </div>
                </div>
              ))}
            </div>
             <button className="w-full bg-fuzzy text-white py-3 rounded-xl font-medium hover:bg-copperfield transition-colors">
              Ir al Checkout
            </button>
          </div>
        </div>
      )}

      {/* MENÚ BÚSQUEDA LATERAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="absolute right-0 top-0 h-screen md:top-20 md:h-auto md:w-80 w-full bg-white md:rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-espresso">Buscar</h2>
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="w-5 h-5 text-espresso" />
              </button>
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Busca un producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-almond px-4 py-3 rounded-xl text-sm text-espresso placeholder-espresso/50 focus:outline-none focus:ring-2 focus:ring-fuzzy"
                autoFocus
              />
              <Search className="absolute right-3 top-3 w-5 h-5 text-espresso/40" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}