"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, ShoppingCart, Star, ChevronDown, ChevronUp } from "lucide-react"
import "./Productos.css"

function Productos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  const products = [
{
      id: 1,
      name: "Gafas Wayfarer Clásicas ",
      price: 135.00,
      rating: 5,
      image: "wc.png",
      category: "sol",
      description: "Estas gafas combinan un estilo moderno con un toque retro gracias a su icónico diseño Wayfarer. Su marco de acetato negro brillante y detalles metálicos dorados en las bisagras ofrecen elegancia y durabilidad.",
      bestseller: true,
    },
    {
      id: 2,
      name: "Gafas Redondas de Montura Metálica",
      price: 90.00,
      rating: 4,
      image: "redonda.png",
      category: "graduadas",
      description: "Estas gafas presentan una montura metálica ligera en tono dorado, con un diseño redondo que evoca elegancia y estilo intelectual. Su estructura delgada y refinada las hace ideales para uso diario, ofreciendo comodidad sin sacrificar sofisticación. Perfectas para quienes buscan un look vintage con un toque moderno.",
    },
    {
      id: 3,
      name: "Gafas de sol tipo aviador",
      price: 160.00,
      rating: 5,
      image: "gafasnose.png",
      category: "sol",
      description: "Gafa de sol tipo aviador – Un diseño atemporal con montura dorada y lentes oscuros. Ideal para quienes buscan estilo y protección. Con almohadillas ajustables para mayor confort.",
      bestseller: true,
    },
    {
      id: 4,
      name: "Gafas graduras Etnia Alexia BLFU",
      price: 160.00,
      rating: 4,
      image: "alexia.png",
      category: "graduadas",
      description: "Gafas graduadas Etnia Alexia BLFU: un diseño elegante y moderno con montura tipo cat-eye en metal azul marino, detalles en fucsia y varillas en azul translúcido. Perfectas para quienes buscan estilo y personalidad sin renunciar a la comodidad.",
    },
    {
      id: 5,
      name: "Gafas de Sol Retro",
      price: 120.00,
      rating: 5,
      image: "solretro.png",
      category: "sol",
      description: "Gafas de sol estilo retro con montura tipo aviador en acetato carey y lentes degradadas en tonos marrones. Su diseño clásico y atemporal ofrece un toque vintage perfecto para complementar cualquier look con elegancia y personalidad.",
    },
    {
      id: 6,
      name: "Monturas Modernas",
      price: 109.99,
      rating: 4,
      image: "gafi.png",
      category: "graduadas",
      description: "Monturas modernas con diseño geométrico y colores vibrantes.",
    },
    {
      id: 7,
      name: "Gafas de Sol Oversized",
      price: 139.99,
      rating: 4,
      image: "gafa.png",
      category: "sol",
      description: "Gafas de sol oversized con protección UV y estilo glamuroso.",
    },
    {
      id: 8,
      name: "Monturas Ligeras",
      price: 80.00,
      rating: 5,
      image: "montural.png",
      category: "graduadas",
      description: "Gafas graduadas con montura rectangular de metal en color negro, combinadas con varillas de acabado mate y detalle interior azul texturizado. Su diseño moderno y ligero ofrece una apariencia profesional y versátil, ideal para el uso diario.",
      bestseller: true,
    },
    
     {
      id: 9,
      name: "Gafas Estilo Redondo Retro",
      price: 130.00,
      rating: 4,
      image: "retro.png",
      category: "graduadas",
      description: "Las gafas de estilo redondo retro están disponibles en varios modelos, incluyendo opciones de sol y monturas de metal.",
    },

    {
      id: 10,
      name: "Luxury Rimless Square Sunglasses",
      price: 200.00,
      rating: 5,
      image: "luxury.png",
      category: "sol",
      description: "Anteojos de lujo estilo retro urbano sin montura, con diseño cuadrado y detalles metálicos dorados. Lentes oscuros y estructura refinada para un look sofisticado y llamativo.",
      bestseller: true,
    },

    {
      id: 11,
      name: "Wayfarer Moderno",
      price: 150.00,
      rating: 4,
      image: "wayfarer.png",
      category: "sol",
      description: "Gafas estilo Wayfarer Moderno con un diseño elegante y versátil. Montura negra mate con líneas definidas, perfectas para un look contemporáneo y sofisticado. Ideales para quienes buscan un equilibrio entre estilo clásico y modernidad.",
    },

    {
      id: 12,
      name: "Gafas estilo Cat-Eye",
      price: 100.00,
      rating: 4,
      image: "cat.png",
      category: "graduadas",
      description: "Gafas estilo Cat-Eye con montura negra brillante y lentes oscuros. Un diseño atrevido y femenino que combina elegancia retro con un toque moderno.",
    },
  ]

  useEffect(() => {
    let result = [...products]

    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter)
    }

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "bestseller":
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))
        break
      default:
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0))
    }

    setFilteredProducts(result)
  }, [searchTerm, categoryFilter, sortBy, priceRange])

  const handleAddToCart = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number(e.target.value)
    setPriceRange(newRange)
  }

  return (
    <div className="productos-page">
      <div className="container">
        <div className="productos-header">
          <h1 className="productos-title">Nuestros Productos</h1>
          <p className="productos-subtitle">Descubre nuestra amplia selección de gafas de sol y monturas graduadas</p>
        </div>

        <div className="search-bar">
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter size={18} />
            <span>Filtros</span>
            {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <div className="productos-layout">
          <aside className={`productos-filters ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-section">
              <h3 className="filter-title">Categorías</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === "all"}
                    onChange={() => setCategoryFilter("all")}
                  />
                  <span>Todos los productos</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === "sol"}
                    onChange={() => setCategoryFilter("sol")}
                  />
                  <span>Gafas de sol</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === "graduadas"}
                    onChange={() => setCategoryFilter("graduadas")}
                  />
                  <span>Monturas graduadas</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Precio</h3>
              <div className="price-range">
                <div className="price-inputs">
                  <div className="price-input-group">
                    <label>Min</label>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                    />
                  </div>
                  <div className="price-input-group">
                    <label>Max</label>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                    />
                  </div>
                </div>
                <div className="price-slider-container">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 0)}
                    className="price-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 1)}
                    className="price-slider"
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Ordenar por</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "relevance"}
                    onChange={() => setSortBy("relevance")}
                  />
                  <span>Relevancia</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "price-low"}
                    onChange={() => setSortBy("price-low")}
                  />
                  <span>Precio: Menor a Mayor</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "price-high"}
                    onChange={() => setSortBy("price-high")}
                  />
                  <span>Precio: Mayor a Menor</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="sort" checked={sortBy === "rating"} onChange={() => setSortBy("rating")} />
                  <span>Mejor valorados</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "bestseller"}
                    onChange={() => setSortBy("bestseller")}
                  />
                  <span>Más vendidos</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="productos-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o términos de búsqueda.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="producto-card">
                  <div className="producto-image">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} />
                    {product.bestseller && <div className="producto-badge bestseller">Más Vendido</div>}
                    <div className="producto-badge category">
                      {product.category === "sol" ? "Gafas de Sol" : "Monturas"}
                    </div>
                    <div className="producto-actions">
                      <Link to={`/producto/${product.id}`} className="action-btn view-btn">
                        Ver Detalles
                      </Link>
                      <button className="action-btn cart-btn" onClick={handleAddToCart}>
                        <ShoppingCart size={16} />
                        Añadir al Carrito
                      </button>
                    </div>
                  </div>
                  <div className="producto-info">
                    <h3 className="producto-title">{product.name}</h3>
                    <div className="producto-rating">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <Star key={i} size={16} className={i < product.rating ? "star-filled" : "star-empty"} />
                        ))}
                      <span className="rating-count">({product.rating}.0)</span>
                    </div>
                    <p className="producto-description">{product.description}</p>
                    <div className="producto-footer">
                      <span className="producto-price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={`cart-notification ${showNotification ? "show" : ""}`}>
        <ShoppingCart size={18} />
        <span>Producto añadido al carrito</span>
      </div>
    </div>
  )
}

export default Productos
