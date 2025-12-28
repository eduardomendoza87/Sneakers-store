import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PriceFilter({
  min = 1000,
  max = 4000,
  step = 100,
  onChange,
}) {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const [isOpen, setIsOpen] = useState(true);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);
    setMinPrice(value);
    onChange?.([value, maxPrice]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + step);
    setMaxPrice(value);
    onChange?.([minPrice, value]);
  };

  return (
    <div
      className="
        w-64 rounded-3xl
        bg-white/30 backdrop-blur-lg
        border border-white/40
        shadow-lg
        p-6
      "
    >
      {/* Header / Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-4"
      >
        <span className="text-sm font-medium text-espresso">
          Precio
        </span>

        <ChevronDown
          className={`
            w-4 h-4 text-espresso/60
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Contenido colapsable */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {/* Slider */}
        <div className="relative h-8 mb-6">
          {/* Track */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 rounded-full bg-cashmere/60" />

          {/* Rango activo */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-fuzzy"
            style={{
              left: `${((minPrice - min) / (max - min)) * 100}%`,
              right: `${100 - ((maxPrice - min) / (max - min)) * 100}%`,
            }}
          />

          {/* Input MIN */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minPrice}
            onChange={handleMinChange}
            className="absolute w-full pointer-events-none appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-copperfield
              [&::-webkit-slider-thumb]:shadow-md"
          />

          {/* Input MAX */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxPrice}
            onChange={handleMaxChange}
            className="absolute w-full pointer-events-none appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-copperfield
              [&::-webkit-slider-thumb]:shadow-md"
          />
        </div>

        {/* Valores */}
        <div className="flex justify-between gap-2">
          <div className="rounded-full bg-almond px-4 py-1 text-xs text-espresso shadow-sm">
            Min: ${minPrice.toLocaleString()}
          </div>
          <div className="rounded-full bg-almond px-4 py-1 text-xs text-espresso shadow-sm">
            Max: ${maxPrice.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
