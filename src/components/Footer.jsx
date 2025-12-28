import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-fuzzy  pt-16 pb-8 px-6 md:px-16 lg:px-28">
            <div className="max-w-450 mx-auto">
                
                {/* GRID PRINCIPAL */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    
                    {/* Columna 1: Branding */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-espresso tracking-tight">Sneakers <span className="text-almond">Store</span></h2>
                        <p className="text-concrete-500 text-sm leading-relaxed max-w-xs">
                           Tu tienda de seakers de confianza.
                        </p>
                    </div>

                    {/* Columna 2: Sitemap (Links) */}
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-espresso mb-6">Explorar</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-espresso hover:text-almond transition-colors text-sm">Inicio</Link></li>
                            <li><Link to="/novedades" className="text-espresso hover:text-almond transition-colors text-sm">Novedades</Link></li>
                            <li><Link to="/hombre" className="text-espresso hover:text-almond transition-colors text-sm">Hombre</Link></li>
                            <li><Link to="/mujer" className="text-espresso hover:text-almond transition-colors text-sm">Mujer</Link></li>
                            <li><Link to="/coleccion" className="text-espresso hover:text-almond transition-colors text-sm">Colecciones</Link></li>


                        </ul>
                    </div>

                   

                    {/* Columna 3: Social */}
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-concrete-400 mb-6">Social</h3>
                        <ul className="space-y-3">
                            <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-concrete-600 hover:text-primary transition-colors text-sm">Instagram ↗</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-concrete-600 hover:text-primary transition-colors text-sm">LinkedIn ↗</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-concrete-600 hover:text-primary transition-colors text-sm">Facebook ↗</a></li>
                        </ul>
                    </div>
                </div>

                {/* COPYRIGHT  */}
                <div className="border-t border-almond pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-espresso text-xs font-mono text-center md:text-left">
                        © {new Date().getFullYear()} SNEAKERS STORE. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/legal" className="text-espresso text-xs font-mono hover:text-almond">Aviso Legal</Link>
                        <Link to="/privacy" className="text-espresso text-xs font-mono hover:text-almond">Privacidad</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;