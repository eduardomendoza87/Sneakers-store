import React from "react";
import { Link } from "react-router-dom";


//data
import { allCollection } from "../data/collection";

//imagenes
import CollectionHero from "../assets/collection-img/hero-colecciones.png"

const Collection = () => {
    return (
      <div className="bg-transparent min-h-screen w-full overflow-x-hidden">
        {/*Sección 1: Imagen Hero */}
        <section className="px-6 md:px-10 py-16">
          <div className="relative w-full h-96 md:h-125 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={CollectionHero}
              alt="Colección Hombre"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10" />{" "}
            {/* Oscurecimiento leve */}
            <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
              <div className="max-w-lg">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg font-clash">
                  Colecciones <br /> Iconicas
                </h2>
                <p className="text-white/90 font-sans text-lg md:text-xl font-medium drop-shadow-md">
                  Descubre lo ultimo de Adidas, Nike, <br />
                  New balance y Puma
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*Seccion 2: Titulo y subtitulo*/}
        <section className="px-6 md:px-10 mb-8">
          <div className="max-w-7xl mx-auto">
            <div >
              <h3 className="text-3xl font-clash  font-semibold mb-10 text-espresso text-center">
                La seleccion definitiva{" "}
              </h3>
              <p className="text-xl font-sans text-espresso mb-16 text-center">
                Clasicos atemporales y diseños innovadoras. Una seleccion de las
                siluetas <br /> mas deseadas de Adidas, Nike, New Balance, y
                Puma,
                <br /> redefiniendo el estilo urbano
              </p>
            </div>
          </div>
        </section>

        {/*  Sección 3: Grid de Colecciones */}
        <section className="px-6 md:px-10 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allCollection.map((item) => (
                <div
                  key={item.id}
                  className="
                        group relative 
          w-full h-auto
          rounded-[2.5rem] 
          overflow-hidden 
          shadow-lg hover:shadow-2xl 
          transition-all duration-500
                    "
                >
                  {/*  LA IMAGEN DE FONDO */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                           w-full h-auto block 
              transition-transform duration-700 
              group-hover:scale-105
                        "
                  />

                  <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-between p-8 md:p-12">
                    {/* Título en la parte superior */}
                    <h3 className="text-3xl font-clash font-bold text-espresso drop-shadow-sm text-center">
                      {item.title}
                    </h3>

                    {/* Botón en la parte inferior */}
                    <Link
                            to={item.route} 
                            className="
                              bg-fuzzy text-almond 
                              px-6 py-2 md:px-8 md:py-3 
                              rounded-full 
                              font-medium text-sm md:text-base
                              shadow-lg hover:bg-espresso hover:scale-105 
                              transition-all duration-300
                              inline-block /* Asegura que se comporte bien como botón */
                            "
                        >
                            Explorar colección
                        </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
}
export default Collection;