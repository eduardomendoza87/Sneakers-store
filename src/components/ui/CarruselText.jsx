import { useState, useEffect } from 'react';

export default function CarruselFeatures() {
  const [offset, setOffset] = useState(0);

  const features = [
    'Envío gratis',
    'Nueva colección',
    'Edición ilimitada',
    'Nike Air Jordan',
    'New Balance',
    'Adidas Campus 00s',
    'Puma Suede Classic'
  ];

  // Duplicar array para efecto infinito
  const duplicatedText = [...features, ...features, ...features];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 0.5);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Reiniciar cuando llegue al final
  useEffect(() => {
    if (offset >= features.length * 150) {
      setOffset(0);
    }
  }, [offset, features.length]);

  return (
    <section className="w-full py-6 bg-fuzzy overflow-hidden">
      {/* Contenedor del carrusel */}
      <div className="flex gap-16 whitespace-nowrap"
        style={{
          transform: `translateX(-${offset}px)`,
          willChange: 'transform',
        }}
      >
        {duplicatedText.map((feature, index) => (
          <span
            key={index}
            className="text-espresso font-clash font-bold text-2xl tracking-wide"
          >
            {feature}
          </span>
        ))}
      </div>
    </section>
  );
}