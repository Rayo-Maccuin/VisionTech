"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react"
import "./Carrito.css"

function Carrito() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Gafas de Sol Aviador",
      price: 129.99,
      image: "",
      quantity: 1,
    },
    {
      id: 2,
      name: "Monturas Clásicas",
      price: 89.99,
      image: "",
      quantity: 2,
    },
    {
      id: 3,
      name: "Gafas de Sol Deportivas",
      price: 149.99,
      image: "",
      quantity: 1,
    },
  ])

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const tax = subtotal * 0.16

  const total = subtotal + tax

  const isCartEmpty = cartItems.length === 0

  const handleCheckout = () => {
    navigate("/pago")
  }

  return (
    <div className="carrito-page">
      <div className="container">
        <div className="carrito-header">
          <h1 className="carrito-title">Tu Carrito de Compras</h1>
          <p className="carrito-subtitle">
            {isCartEmpty
              ? "Tu carrito está vacío"
              : `Tienes ${cartItems.length} ${cartItems.length === 1 ? "producto" : "productos"} en tu carrito`}
          </p>
        </div>

        {isCartEmpty ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>Tu carrito está vacío</h2>
            <p>Parece que aún no has añadido productos a tu carrito.</p>
            <Link to="/productos" className="btn btn-primary">
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="carrito-content">
            <div className="carrito-items">
              <div className="carrito-table-header">
                <div className="header-producto">Producto</div>
                <div className="header-precio">Precio</div>
                <div className="header-cantidad">Cantidad</div>
                <div className="header-total">Total</div>
                <div className="header-acciones"></div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="carrito-item">
                  <div className="item-producto">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-category">Categoría: Gafas</p>
                    </div>
                  </div>
                  <div className="item-precio">${item.price.toFixed(2)}</div>
                  <div className="item-cantidad">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                  <div className="item-acciones">
                    <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Eliminar producto">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-summary">
              <h2 className="summary-title">Resumen del Pedido</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Impuestos (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>Calculado en el checkout</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                Proceder al Pago
              </button>
              <Link to="/productos" className="continue-shopping">
                <ArrowLeft size={16} />
                <span>Continuar Comprando</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Carrito

