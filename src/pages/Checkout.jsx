import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, ArrowLeft, ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Estado para el formulario (simple)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    tarjeta: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulamos proceso de pago
    setTimeout(() => {
      clearCart(); // Vaciamos el carrito
      setIsSuccess(true); // Mostramos mensaje de éxito
      window.scrollTo(0, 0);
    }, 1500);
  };

  // Formateador de moneda
  const formatPrice = (price) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price);

  //  VISTA: ÉXITO (GRACIAS POR TU COMPRA) 
  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-almond px-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-xl">
          <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={3} />
        </div>
        <h1 className="text-4xl font-clash font-bold text-espresso mb-2">¡Gracias por tu compra!</h1>
        <p className="text-espresso/70 mb-8 max-w-md">
          Tu pedido ha sido confirmado. Hemos enviado un correo a <span className="font-bold">{formData.email}</span> con los detalles.
        </p>
        <Link 
          to="/" 
          className="bg-fuzzy text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-fuzzy/20 hover:bg-copperfield transition-all hover:scale-105"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  //  VISTA: CARRITO VACÍO 
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-almond px-6 text-center">
        <ShoppingBag className="w-16 h-16 text-espresso/20 mb-4" />
        <h2 className="text-2xl font-clash font-bold text-espresso mb-4">Tu carrito está vacío</h2>
        <Link to="/" className="text-fuzzy font-bold hover:underline">Ir a comprar productos</Link>
      </div>
    );
  }

  //  VISTA: FORMULARIO DE CHECKOUT 
  return (
    <div className="bg-almond min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <ArrowLeft className="text-espresso" />
          </Link>
          <h1 className="text-3xl font-clash font-bold text-espresso">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="bg-white/50 backdrop-blur-sm p-8 rounded-4xl border border-white shadow-sm h-fit">
            <h2 className="text-xl font-bold text-espresso mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-fuzzy text-white rounded-full flex items-center justify-center text-sm">1</span>
              Información de Envío
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso/70 mb-1">Nombre Completo</label>
                <input 
                  required 
                  name="nombre"
                  onChange={handleChange}
                  type="text" 
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-white border border-espresso/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuzzy/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-espresso/70 mb-1">Correo Electrónico</label>
                <input 
                  required 
                  name="email"
                  onChange={handleChange}
                  type="email" 
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full bg-white border border-espresso/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuzzy/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-espresso/70 mb-1">Dirección de Entrega</label>
                <input 
                  required 
                  name="direccion"
                  onChange={handleChange}
                  type="text" 
                  placeholder="Calle, Número, Colonia, Ciudad"
                  className="w-full bg-white border border-espresso/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuzzy/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-espresso/70 mb-1">Tarjeta (Simulado)</label>
                <input 
                  required 
                  name="tarjeta"
                  onChange={handleChange}
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-white border border-espresso/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuzzy/50 transition-all"
                />
              </div>
            </form>
          </div>

          {/* COLUMNA DERECHA: RESUMEN */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-4xl shadow-xl border border-espresso/5">
              <h2 className="text-xl font-bold text-espresso mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-almond rounded-xl p-1 shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-espresso leading-tight">{item.name}</h4>
                      <p className="text-xs text-espresso/60">Talla: {item.selectedSize}</p>
                      <p className="text-xs text-espresso/60">Cant: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-espresso text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-espresso/20 my-4 pt-4 space-y-2">
                <div className="flex justify-between text-espresso/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-espresso/70">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xl font-clash font-bold text-espresso mb-6">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <button 
                type="submit" 
                form="checkout-form" // Esto conecta el botón con el form de la otra columna
                className="w-full bg-fuzzy text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-fuzzy/30 hover:bg-copperfield hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Pagar Ahora
              </button>
              
              <p className="text-center text-xs text-espresso/40 mt-4 flex justify-center gap-2 items-center">
                 🔒 Pago seguro SSL cifrado
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;