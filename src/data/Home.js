//importacion de imagenes 
import NewBalanceImage from "../assets/home-assets/new-balance-black.png"
import NikeAirMidImage from "../assets/home-assets/nike-air-jordan-mid.png"
import PumaSuedeBlack from "../assets/home-assets/puma-suede-clasic-black.png"
import AdidasCampusImage from "../assets/home-assets/adidas-campus-black.png"



export const Mostwanted = [
  {id:1, name:"New Balance 9060 Black",image: NewBalanceImage ,price: "$3,200 MXN"},
  {id:2, name:"Nike Air Jordan 1 Mid",image:NikeAirMidImage,price: "$3,500 MXN"},
  {id:3, name:"Puma Suede Classic White",image:PumaSuedeBlack ,price: "$3,000 MXN"},
  {id:4, name:"Adidas Campus 00s Black",image:AdidasCampusImage ,price: "$3,200 MXN"},
]

export const userReviews = [
  {
    id: 1,
    rating: 5,
    title: "Bueno",
    comment: "Excelente servicio, cumple con las especificaciones",
    user: {
      name: "Eduardo M",
      avatar: "https://i.pravatar.cc/150?img=1", // Avatar aleatorio
      verified: true
    }
  },
  {
    id: 2,
    rating: 5,
    title: "Excelente calidad",
    comment: "Los tenis llegaron en perfectas condiciones",
    user: {
      name: "María G",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true
    }
  },
  {
    id: 3,
    rating: 4,
    title: "Muy satisfecho",
    comment: "Buena relación calidad-precio",
    user: {
      name: "Carlos R",
      avatar: "https://i.pravatar.cc/150?img=12",
      verified: false
    }
  }
];