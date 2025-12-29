
//Imagenes
import CollectionHero from "../assets/collection-img/hero-colecciones.png"
import NikeCollection from "../assets/collection-img/collection-air-jordan-1.jpg"
import AdidasCollection from "../assets/collection-img/collection-adidas-campus.jpg"
import PumaCollection from "../assets/collection-img/collection-suede-clasic.jpg"
import NewBalanceCollection from "../assets/collection-img/collection-new-balance-9060.jpg"

export const allCollection = [
  {
    id: 1,
    title: "Adidas campus 00´s",
    image: AdidasCollection,
    route: "/coleccion/adidas-campus"
  },
  { id: 2,
     title: "Nike Air Jordán 1", 
     image: NikeCollection ,
     route: "/coleccion/jordan-retro"
    },
  { id: 3,
    title: "Puma Suede Clasic", 
    image: PumaCollection ,
    route: "/coleccion/puma-suede"
},
  { id: 4, 
    title: "New balance 9060", 
    image: NewBalanceCollection,
    route: "/coleccion/9060-archive"
},
];