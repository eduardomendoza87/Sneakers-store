import { useState } from "react";
import { ChevronDown } from "lucide-react";

const options = [
  { id: "recent", label: "Más recientes" },
  { id: "price-asc", label: "Precio: Bajo a Alto" },
  { id: "price-desc", label: "Precio: Alto a bajo" },
  { id: "best", label: "Más vendidos" },
];

export default function SortFilter({ onChange }) {
  const [active, setActive] = useState("price-asc");
  const [open, setOpen] = useState(false);

  const handleSelect = (id) => {
    setActive(id);
    onChange?.(id);
    setOpen(false); // se cierra al seleccionar
  };

  return (
    <div
      className="
        relative w-64
        bg-white/30 backdrop-blur-lg
        rounded-3xl p-5
        border border-white/40
        shadow-lg hover:shadow-2xl hover:border-white/60
        transition-all duration-300
      "
    >
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-sm font-medium text-espresso">
          Ordenar por
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
        <ul className="overflow-hidden space-y-3">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                cursor-pointer text-sm transition-colors
                ${
                  active === option.id
                    ? "text-fuzzy font-medium"
                    : "text-espresso/70 hover:text-espresso"
                }
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
