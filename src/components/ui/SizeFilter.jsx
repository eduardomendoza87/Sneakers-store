import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sizes = [
  23, 23.5, 24,
  24.5, 25, 25.5,
  26, 26.5, 27,
  27.5, 28, 28.5,
  29, 29.5, 30,
];

export default function SizeFilter({ onChange }) {
  const [active, setActive] = useState(28);
  const [open, setOpen] = useState(false);

  const handleSelect = (size) => {
    setActive(size);
    onChange?.(size);
    // setOpen(false); // opcional: cerrar al seleccionar
  };

  return (
    <div
      className="
        relative w-64
        rounded-3xl
        bg-white/30 backdrop-blur-lg
        border border-white/40
        shadow-lg hover:shadow-2xl hover:border-white/60
        transition-all duration-300
        p-5
      "
    >
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-sm font-medium text-espresso">
          Talla
        </span>

        <ChevronDown
          className={`
            w-5 h-5 text-espresso transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* CONTENIDO */}
      <div
        className={`
          grid transition-all duration-300 ease-in-out
          ${open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => {
              const isActive = active === size;

              return (
                <button
                  key={size}
                  onClick={() => handleSelect(size)}
                  className={`
                    h-9 rounded-full text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-fuzzy text-almond shadow-md scale-105"
                        : "bg-almond/70 text-espresso hover:bg-cashmere/60"
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
