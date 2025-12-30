import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
//Context
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from './context/CartContext';
function App() {
  return (
    <BrowserRouter>
    <FavoritesProvider>
      <CartProvider>
      <AppRoutes />
      </CartProvider>
    </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;