import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { FavoritesProvider } from "./context/FavoritesContext";
function App() {
  return (
    <BrowserRouter>
    <FavoritesProvider>
      <AppRoutes />
    </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;