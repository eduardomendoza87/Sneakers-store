//Imagenes
// --- Colección: Nike Air Jordan 1 ---
import JordanChicago from "../assets/products/nike/jordan-1/jordan-chicago.png"
import JordanLow from "../assets/products/nike/jordan-1/low-grey.png"

// --- Colección: Adidas Campus 00s ---
import CampusBark from "../assets/products/adidas/campus/bark-brown.png"
import CampusPink from "../assets/products/adidas/campus/pink-fusion.png"

// --- Colección: Puma Suede Classic ---
import PumaClassicBlack from "../assets/products/puma/suede/clasic-black.png"
import PumaSuedeXLRed from "../assets/products/puma/suede/suede-xl-red.png"

// --- Colección: New Balance 9060 ---
import NewBalance9060SeaSalt from "../assets/products/new-balance/9060/9060-sea-salt.png"
import NewBalancePink from "../assets/products/new-balance/9060/9060-pink.png"






export const NewArrivals = [
  // --- Colección: Nike Air Jordan 1 ---
  {
    id: 1,
    name: "Air Jordan 1 Chicago",
    price: "$4,899 MXN",
    category: "Nike Air Jordan 1",
    gender: "Hombre",
    image: JordanChicago, 
    isNew: true,
  },
  {
    id: 2,
    name: "Air Jordan 1 Low 'Wolf Grey'",
    price: "$3,100 MXN",
    category: "Nike Air Jordan 1",
    gender: "Mujer",
    image: JordanLow,
    isNew: true,
  },

  // --- Colección: Adidas Campus 00s ---
  {
    id: 3,
    name: "Adidas Campus 00s Bark",
    price: "$2,600 MXN",
    category: "Adidas Campus 00s",
    gender: "Hombre",
    image: CampusBark,
    isNew: true,
  },
  {
    id: 4,
    name: "Adidas Campus 00s Pink Fusion",
    price: "$2,600 MXN",
    category: "Adidas Campus 00s",
    gender: "Mujer",
    image: CampusPink,
    isNew: true,
  },

  // --- Colección: Puma Suede Classic ---
  {
    id: 5,
    name: "Puma Suede Classic XXI Black",
    price: "$1,899 MXN",
    category: "Puma Suede Classic",
    gender: "Unisex",
    image: PumaClassicBlack,
    isNew: false,
  },
  {
    id: 6,
    name: "Puma Suede XL Red",
    price: "$2,100 MXN",
    category: "Puma Suede Classic",
    gender: "Mujer",
    image: PumaSuedeXLRed,
    isNew: true,
  },

  // --- Colección: New Balance 9060 ---
  {
    id: 7,
    name: "New Balance 9060 'Sea Salt'",
    price: "$3,999 MXN",
    category: "New Balance 9060",
    gender: "Unisex",
    image: NewBalance9060SeaSalt,
    isNew: true,
  },
  {
    id: 8,
    name: "New Balance 9060 'Cherry Blossom'",
    price: "$4,200 MXN",
    category: "New Balance 9060",
    gender: "Mujer",
    image: NewBalancePink,
    isNew: true,
  },
];