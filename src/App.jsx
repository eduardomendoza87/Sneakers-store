import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

// Context
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from './context/CartContext';

// Importa tu componente ScrollToTop
import ScrollToTop from './components/ScrollToTop'; 

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />       
      <FavoritesProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;