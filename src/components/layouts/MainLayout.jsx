import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function MainLayout() {
  return (
    <div className="relative min-h-screen">      
      {/* CONTENIDO */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-4 py-4">
          <Navbar />
        </header>
                <main className="grow">
          <Outlet /> 
          <Footer />
        </main>
      </div>
    </div>
  );
}