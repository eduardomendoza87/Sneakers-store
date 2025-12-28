import { useState } from "react";
import { ChevronDown } from "lucide-react";

const brands = [
  { id: "nike", label: "Nike", count: 12 },
  { id: "adidas", label: "Adidas", count: 8 },
  { id: "new-balance", label: "New Balance", count: 5 },
  { id: "puma", label: "Puma", count: 3 },
];

export default function BrandFilter({ onChange }) {
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleBrand = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((b) => b !== id)
      : [...selected, id];

    setSelected(updated);
    onChange?.(updated);
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
          Marca
        </span>

        <ChevronDown
          className={`
            w-4 h-4 text-espresso/60
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Contenido */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="space-y-3">
          {brands.map((brand) => {
            const isChecked = selected.includes(brand.id);

            return (
              <li
                key={brand.id}
                onClick={() => toggleBrand(brand.id)}
                className="flex items-center justify-between cursor-pointer group"
              >
                {/* Checkbox + Label */}
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      w-4 h-4 rounded-sm border
                      transition-colors
                      ${
                        isChecked
                          ? "bg-fuzzy border-fuzzy"
                          : "border-copperfield"
                      }
                    `}
                  />

                  <span
                    className={`
                      text-sm transition-colors
                      ${
                        isChecked
                          ? "text-espresso font-medium"
                          : "text-espresso/70 group-hover:text-espresso"
                      }
                    `}
                  >
                    {brand.label}
                  </span>
                </div>

                {/* Contador */}
                <span className="text-xs text-espresso/40">
                  ({brand.count})
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
