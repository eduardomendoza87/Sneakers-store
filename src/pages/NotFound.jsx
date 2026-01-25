import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-almond text-espresso px-6 text-center">
      <h1 className="text-9xl font-clash font-bold text-fuzzy opacity-50">404</h1>
      <h2 className="text-4xl font-clash font-bold mt-4 mb-2">Página no encontrada</h2>
      <p className="text-espresso/60 mb-8 max-w-md">
        Lo sentimos, parece que los sneakers que buscas se agotaron o la página no existe.
      </p>
      
      <div className="flex gap-4">
        <Link 
          to="/" 
          className="bg-fuzzy text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-copperfield transition-all"
        >
          Volver al Inicio
        </Link>
        <Link 
          to="/novedades" 
          className="bg-white border border-espresso/10 text-espresso px-8 py-3 rounded-xl font-bold hover:bg-espresso/5 transition-all flex items-center gap-2"
        >
          <Search size={20} />
          Ver Novedades
        </Link>
      </div>
    </div>
  );
}