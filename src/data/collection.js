
//Imagenes
import NikeCollection from "../assets/collection-img/collection-air-jordan-1.jpg"
import AdidasCollection from "../assets/collection-img/collection-adidas-campus.jpg"
import PumaCollection from "../assets/collection-img/collection-suede-clasic.jpg"
import NewBalanceCollection from "../assets/collection-img/collection-new-balance-9060.jpg"

export const allCollection = [
  {
    id: 1,
    title: "Adidas campus 00´s",
    image: AdidasCollection,
    collectionId: "adidas-campus",
    route: "/coleccion/adidas-campus",
    description: "El icono del skate reimaginado.",
    hero: "/images/products/collection-hero/hero-collection-adidas-campus.jpg"
  },
  { id: 2,
     title: "Nike Air Jordán 1", 
     image: NikeCollection ,
     collectionId: "jordan-retro",
     route: "/coleccion/jordan-retro",
     description: "La silueta que lo empezó todo.",
     hero: "/images/products/collection-hero/hero-collection-air-jordan-1.jpg"


    },
  { id: 3,
    title: "Puma Suede Clasic", 
    image: PumaCollection ,
    route: "/coleccion/puma-suede",
    collectionId: "puma-suede",
    description: "Elegancia atemporal y estilo urbano.",
    hero: "/images/products/collection-hero/hero-collection-puma-suede.jpg"
},
  { id: 4, 
    title: "New balance 9060", 
    image: NewBalanceCollection,
    route: "/coleccion/9060-archive",
    collectionId: "9060-archive",
    description: "Futurismo y confort en cada paso.",
    hero: "/images/products/collection-hero/hero-collection-new-balance.jpg"

},
];

