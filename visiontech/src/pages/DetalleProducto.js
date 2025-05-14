"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Heart, Share2, Star, ChevronRight, Check, ArrowLeft, Plus, Minus } from "lucide-react"
import "./DetalleProducto.css"


function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showNotification, setShowNotification] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])

  const productsData = [
    {
      id: "1",
      name: "Gafas Wayfarer Clásicas",
      price: 135.000,
      rating: 5,
      reviewCount: 24,
      images: [
        "/wc.png",
        "/wcp.png",
        "/wco.png",
        "/wca.png",
      ],
      category: "sol",
      description:
        "Estas gafas combinan un estilo moderno con un toque retro gracias a su icónico diseño Wayfarer. Su marco de acetato negro brillante y detalles metálicos dorados en las bisagras ofrecen elegancia y durabilidad.",
      longDescription:
        "Estas gafas de sol combinan a la perfección el estilo moderno con un sutil aire retro, inspirado en el clásico diseño Wayfarer que ha perdurado a lo largo de las décadas. Su montura, elaborada en acetato negro de alto brillo, no solo proporciona una apariencia sofisticada y atemporal, sino que también garantiza una excelente resistencia y comodidad durante el uso diario. Los detalles metálicos dorados en las bisagras aportan un contraste elegante que eleva el diseño general, reforzando la estructura y añadiendo un toque distintivo de refinamiento. Estas gafas son ideales para quienes buscan un accesorio versátil que complemente tanto looks casuales como más formales, sin renunciar al estilo ni a la calidad. ",
      colors: [
        { name: "Negro", value: "#000000" },
        { name: "Dorado", value: "#FFD700" },
        { name: "Plateado", value: "#C0C0C0" },
      ],
      features: [
        "Protección UV 400",
        "Lentes polarizadas",
        "Marco metálico ligero",
        "Patillas ajustables",
        "Incluye estuche y paño de limpieza",
      ],
      stock: 15,
      bestseller: true,
      specifications: {
        material: "Metal",
        dimensiones: "140mm (ancho) x 50mm (alto) x 140mm (largo)",
        peso: "28g",
        garantia: "2 años",
      },
    },
    {
      id: "2",
      name: "Gafas Redondas de Montura Metálica",
      price: 89.99,
      rating: 4,
      reviewCount: 18,
      images: [
        "/redonda.png",
        "/redondac.png",
        "/redondap.png",
      ],
      category: "graduadas",
      description: "Gafas Redondas de Montura Metálica",
      longDescription:
        "Estas gafas presentan una montura metálica ultraligera en tono dorado, con un diseño redondo que transmite una estética clásica y refinada. Su estructura delgada y elegante proporciona una sensación de ligereza, lo que las hace perfectas para un uso prolongado sin comprometer la comodidad.",
      colors: [
        { name: "Negro", value: "#000000" },
        { name: "Tortuga", value: "#8B4513" },
        { name: "Azul", value: "#1E3A8A" },
      ],
      features: [
        "Acetato de alta calidad",
        "Bisagras reforzadas",
        "Diseño unisex",
        "Compatible con todo tipo de lentes",
        "Incluye estuche rígido",
      ],
      stock: 22,
      bestseller: false,
      specifications: {
        material: "Acetato",
        dimensiones: "138mm (ancho) x 48mm (alto) x 145mm (largo)",
        peso: "25g",
        garantia: "2 años",
      },
    },
    {
      id: "3",
      name: "Gafas de sol tipo aviador",
      price: 149.99,
      rating: 5,
      reviewCount: 32,
      images: [
        "/gafasnose.png",
        "/gafasnosea.png",
        "/gafasnosep.png",
      ],
      category: "sol",
      description: "Gafas deportivas con protección UV y resistencia al agua.",
      longDescription:
        "Diseñadas para deportistas exigentes, estas gafas ofrecen una protección superior contra los rayos UV, resistencia al agua y al sudor, y un ajuste seguro incluso durante actividades intensas. Las lentes polarizadas reducen el deslumbramiento y mejoran la visibilidad en condiciones de mucha luz.",
      colors: [
        { name: "Negro Mate", value: "#1a1a1a" },
        { name: "Rojo", value: "#FF0000" },
        { name: "Azul Eléctrico", value: "#0047AB" },
      ],
      features: [
        "Lentes polarizadas",
        "Resistentes al agua y sudor",
        "Marco flexible y resistente a impactos",
        "Almohadillas nasales ajustables",
        "Incluye correa deportiva",
      ],
      stock: 8,
      bestseller: true,
      specifications: {
        material: "TR90 (Nylon)",
        dimensiones: "145mm (ancho) x 52mm (alto) x 135mm (largo)",
        peso: "24g",
        garantia: "1 año",
      },
    },
    {
      id: "4",
      name: "Gafas graduras Etnia Alexia BLFU",
      price: 99.99,
      rating: 4,
      reviewCount: 15,
      images: [
        "/alexia.png",
        "/alexiac.png",
        "/alexiap.png",
      ],
      category: "graduadas",
      description: "Monturas minimalistas de titanio, ultraligeras y resistentes.",
      longDescription:
        "Estas monturas minimalistas están fabricadas con titanio de grado médico, ofreciendo una combinación perfecta de ligereza, resistencia y durabilidad. Su diseño discreto y elegante es perfecto para quienes buscan un estilo sofisticado sin llamar demasiado la atención.",
      colors: [
        { name: "Plateado", value: "#C0C0C0" },
        { name: "Negro", value: "#000000" },
        { name: "Dorado Rosa", value: "#B76E79" },
      ],
      features: [
        "Titanio de grado médico",
        "Ultraligeras (menos de 15g)",
        "Hipoalergénicas",
        "Resistentes a la corrosión",
        "Incluye estuche premium",
      ],
      stock: 12,
      bestseller: false,
      specifications: {
        material: "Titanio",
        dimensiones: "135mm (ancho) x 45mm (alto) x 140mm (largo)",
        peso: "14g",
        garantia: "3 años",
      },
    },

    {
      id: "5",
      name: "Gafas de Sol Retro",
      price: 120.00,
      rating: 5,
      reviewCount: 15,
      images: [
        "/solretro.png",
        "/solretrop.png",
        "/solretroc.png",
      ],
      category: "sol",
      description: "Gafas de sol retro estilo aviador con montura de carey y lentes degradadas marrones, perfectas para un look sofisticado y atemporal.",
      longDescription:
        "Inspiradas en los clásicos diseños de los años 70 y 80, estas gafas de sol retro combinan elegancia vintage con un toque moderno. Su montura estilo aviador en acetato color carey aporta carácter y estilo, mientras que las lentes marrones degradadas no solo protegen tus ojos del sol, sino que también añaden un aire refinado. Ideales para quienes buscan destacar con un accesorio distintivo y con personalidad, estas gafas son perfectas para el uso diario o complementar un atuendo más formal.",
      colors: [
        { name: "Azul", value: "#0000FF" },
        { name: "Morado", value: "#800080" },
        { name: "Verde", value: "#008000" },
      ],
      features: [
        "Diseño estilo aviador retro",
        "Lentes marrón degradado",
        "Montura de carey",
        "Puente doble y patillas anchas",
        "Incluye estuche premium",
      ],
      stock: 9,
      bestseller: false,
      specifications: {
        material: "Acetato",
        dimensiones: "145mm (ancho) x 49mm (alto) x 145mm (largo)",
        peso: "28g",
        garantia: "3 años",
      },
    },

    {
      id: "6",
      name: "Monturas Modernas",
      price: 109.99,
      rating: 4,
      reviewCount: 12,
      images: [
        "/gafi.png",
        "/gafic.png",
        "/gafip.png",
      ],
      category: "graduadas",
      description: "Gafas de sol hexagonales con montura dorada y detalles vibrantes en rojo, azul y amarillo. Diseño audaz y original para un estilo atrevido y moderno.",
      longDescription:
        "Estas gafas de sol destacan por su diseño geométrico hexagonal que rompe con lo convencional. La combinación de colores primarios vibrantes (rojo, azul y amarillo) sobre una base metálica dorada brinda una estética única, futurista y artística. Son ideales para quienes buscan marcar tendencia con accesorios llamativos. Perfectas para festivales, sesiones fotográficas o looks urbanos atrevidos.",
      colors: [
        { name: "Lavanda", value: "#B497BD" },
        { name: "Turquesa suave", value: "#9DE6E1" },
        { name: "Plateado oscuro", value: "#4F4F4F" },
      ],
      features: [
        "Forma hexagonal",
        "Lentes espejados azul eléctrico con protección UV400.",
        "Montura metálica",
        "Detalles en rojo y amarillo",
        "Incluye estuche premium",
      ],
      stock: 16,
      bestseller: false,
      specifications: {
        material: "Aleación metálica",
        dimensiones: "142mm (ancho) x 48mm (alto) x 140mm (largo)",
        peso: "24g",
        garantia: "1 años",
      },
    },

    {
      id: "7",
      name: "Gafas de Sol Oversized",
      price: 139.99,
      rating: 4,
      reviewCount: 4,
      images: [
        "/gafa.png",
        "/gafac.png",
        "/gafap.png",
      ],
      category: "sol",
      description: "Gafas de sol oversized con diseño envolvente y montura elegante, ideales para un look sofisticado y de alto impacto visual.",
      longDescription:
        "Las gafas de sol oversized son el accesorio perfecto para quienes buscan destacar con estilo y actitud. Con una montura amplia que cubre gran parte del rostro, no solo ofrecen máxima protección solar, sino que también realzan cualquier outfit con un toque de glamour y confianza. Inspiradas en la moda de pasarela y celebridades, estas gafas combinan funcionalidad con un diseño imponente. Perfectas para días soleados, vacaciones o para elevar tu look diario a un nivel superior.",
      colors: [
        { name: "Ámbar dorado", value: "#DAA520" },
        { name: "Rosa espejo suave", value: "#F5B7B1" },
        { name: "Negro profundo", value: "#000000" },
      ],
      features: [
        "Montura oversized envolvente",
        "Diseño sofisticado y atemporal",
        "Lentes degradadas con protección UV400",
        "Patillas anchas",
        "Incluye estuche premium",
      ],
      stock: 22,
      bestseller: false,
      specifications: {
        material: "Acetato pulido de alta resistencia",
        dimensiones: "150mm (ancho) x 54mm (alto) x 145mm (largo)",
        peso: "24g",
        garantia: "4 años",
      },
    },

    {
      id: "8",
      name: "Monturas Ligeras",
      price: 80.00,
      rating: 5,
      reviewCount: 8,
      images: [
        "/montural.png",
        "/monturalc.png",
        "/monturalp.png",
      ],
      category: "graduadas",
      description: "Gafas con montura metálica delgada y forma rectangular, ideales para un look moderno y profesional.",
      longDescription:
        "Estas gafas combinan un diseño clásico con un toque contemporáneo gracias a su montura metálica delgada y elegante. Su forma rectangular se adapta a una gran variedad de rostros, brindando un estilo sobrio, sofisticado y versátil. Son perfectas tanto para el uso diario como para entornos laborales o académicos, ofreciendo comodidad y ligereza sin sacrificar la resistencia.",
      colors: [
        { name: "Negro clásico", value: "#1C1C1C" },
        { name: "Gris metálico", value: "#5E5E5E" },
        { name: "Azul marino mate", value: "#2C3E50" },
      ],
      features: [
        "Diseño rectangular",
        "Montura ultradelgada",
        "Almohadillas nasales ajustables",
        "Patillas curvas",
        "Incluye estuche premium",
      ],
      stock: 10,
      bestseller: true,
      specifications: {
        material: "Acero inoxidable con recubrimiento mate.",
        dimensiones: "140mm (ancho) x 15mm (alto) x 140mm (largo)",
        peso: "24g",
        garantia: "1 años",
      },
    },

    {
      id: "9",
      name: "Gafas Estilo Redondo Retro",
      price: 130.00,
      rating: 4,
      reviewCount: 14,
      images: [
        "/retro.png",
        "/retroc.png",
        "/retrop.png",
      ],
      category: "graduadas",
      description: "Gafas redondas con montura combinada de acetato negro y metal dorado, perfectas para un estilo clásico e intelectual.",
      longDescription:
        "Estas gafas de diseño redondo evocan una estética vintage que nunca pasa de moda. Su estructura mezcla la elegancia del metal dorado con la sobriedad del acetato negro en la parte superior, creando un equilibrio visual sofisticado. Ideales para personas que buscan un look intelectual, profesional o artístico, estas gafas no solo son una declaración de estilo, sino también una opción funcional y cómoda para el uso diario.",
      colors: [
        { name: "Negro con dorado", value: "#0E0E0E" },
        { name: "Havanna", value: "#5C4033" },
        { name: "Plata", value: "#C0C0C0" },
      ],
      features: [
        "Montura mixta",
        "Forma redonda",
        "Puente en forma de cerradura",
        "arillas negras con terminaciones curvas",
        "Incluye estuche premium",
      ],
      stock: 2,
      bestseller: false,
      specifications: {
        material: "Aleación de metal dorado con extremos en acetato negro.",
        dimensiones: "138mm (ancho) x 49mm (alto) x 140mm (largo)",
        peso: "21g",
        garantia: "3 años",
      },
    },

    {
      id: "10",
      name: "Luxury Rimless Square Sunglasses",
      price: 200.00,
      rating: 5,
      reviewCount: 30,
      images: [
        "/luxury.png",
        "/luxuryc.png",
        "/luxuryp.png",
      ],
      category: "sol",
      description: "Gafas de sol cuadradas con cristales oscuros y detalles dorados, diseñadas para un look lujoso y audaz.",
      longDescription:
        "Estas gafas de sol destacan por su estilo llamativo y sofisticado. La forma cuadrada de los cristales ofrece una estética moderna y elegante, mientras que los detalles dorados en las bisagras y patillas aportan un aire de lujo y exclusividad. Gracias a su diseño sin montura completa, estas gafas se sienten ligeras pero visualmente impactantes, perfectas para quienes desean sobresalir con estilo y confianza.",
      colors: [
        { name: "Negro con dorado", value: "#0E0E0E " },
        { name: "Cristal vino con detalles oro rosado", value: "#6F1E51 " },
        { name: "Cristal azul con detalles plata", value: "#1F3A93 " },
      ],
      features: [
        "Cristales oscuros sin marco completo",
        "Detalles en dorado brillante",
        "Forma cuadrada",
        "Patillas curvadas con extremos negros",
        "Incluye estuche premium",
      ],
      stock: 12,
      bestseller: true,
      specifications: {
        material: "Acetato negro.",
        dimensiones: "142mm (ancho) x 48mm (alto) x 140mm (largo)",
        peso: "23g",
        garantia: "1 años",
      },
    },

    {
      id: "11",
      name: "Wayfarer Moderno",
      price: 150.00,
      rating: 4,
      reviewCount: 22,
      images: [
        "/wayfarer.png",
        "/wayfarerc.png",
        "/wayfarerp.png",
      ],
      category: "sol",
      description: "Gafas de sol negras estilo Wayfarer con montura gruesa y lentes oscuros, ideales para un look urbano y atemporal.",
      longDescription:
        "Estas gafas de sol presentan el icónico diseño Wayfarer, una silueta que ha resistido el paso del tiempo gracias a su versatilidad y carácter. Su montura de acetato negro pulido es robusta y estilizada, mientras que los lentes oscuros degradados ofrecen protección solar y un toque sofisticado. Son perfectas para quienes buscan un accesorio de moda clásico pero con actitud, combinando fácilmente con looks casuales o más elegantes.",
      colors: [
        { name: "Carey", value: "#5A3825" },
        { name: "Transparente", value: "#E0E0E0" },
        { name: "Negro", value: "#0B0B0B " },
      ],
      features: [
        "Estilo Wayfarer moderno",
        "Montura gruesa en acetato negro",
        "Lentes degradados oscuros",
        "Apta para todo tipo de rostro",
        "Incluye estuche premium",
      ],
      stock: 12,
      bestseller: false,
      specifications: {
        material: "Acetato de alta densidad.",
        dimensiones: "144mm (ancho) x 45mm (alto) x 145mm (largo)",
        peso: "26g",
        garantia: "2 años",
      },
    },
    
     {
      id: "12",
      name: "Gafas estilo Cat-Eye",
      price: 100.00,
      rating: 4,
      reviewCount: 18,
      images: [
        "/cat.png",
        "/catc.png",
        "/catp.png",
      ],
      category: "graduadas",
      description: "Gafas de sol negras estilo cat eye con diseño elegante y femenino, perfectas para un look vintage y sofisticado.",
      longDescription:
        "Estas gafas de sol con forma cat eye son el complemento ideal para quienes buscan destacar con un estilo glamuroso y retro. Su montura negra estilizada realza las facciones del rostro, aportando un aire de elegancia y misterio. Inspiradas en los looks icónicos de los años 50 y 60, estas gafas ofrecen una mezcla perfecta entre moda clásica y actitud moderna, siendo ideales para eventos, sesiones fotográficas o un outfit chic del día a día.",
      colors: [
        { name: "Blanco perla", value: "#F0F0F0" },
        { name: "Rojo vino", value: "#7B1E1E" },
        { name: "Negro clasico", value: "#101010" },
      ],
      features: [
        "Diseño cat eye pronunciado",
        "Montura robusta y brillante",
        "Lentes oscuros y envolventes",
        "Ideal para rostros ovalados o alargados",
        "Incluye estuche premium",
      ],
      stock: 10,
      bestseller: false,
      specifications: {
        material: "Acetato de alta calidad.",
        dimensiones: "142mm (ancho) x 47mm (alto) x 140mm (largo)",
        peso: "24g",
        garantia: "2 años",
      },
    },
  ]

  const reviews = [
    {
      id: 1,
      user: "María G.",
      rating: 5,
      date: "15/04/2023",
      comment:
        "Excelentes gafas, muy cómodas y la calidad es impresionante. Las uso todos los días y no me han dado ningún problema.",
    },
    {
      id: 2,
      user: "Carlos R.",
      rating: 4,
      date: "02/03/2023",
      comment:
        "Buena relación calidad-precio. El diseño es muy elegante y las lentes tienen una excelente protección UV.",
    },
    {
      id: 3,
      user: "Laura M.",
      rating: 5,
      date: "18/02/2023",
      comment:
        "Superaron mis expectativas. Son ligeras, resistentes y el color es exactamente como se muestra en las fotos.",
    },
  ]

  useEffect(() => {

    setLoading(true)

    setTimeout(() => {
      const foundProduct = productsData.find((p) => p.id === id)

      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedColor(foundProduct.colors[0])

        const related = productsData.filter((p) => p.category === foundProduct.category && p.id !== id).slice(0, 3)
        setRelatedProducts(related)
      } else {
    
        navigate("/productos")
      }

      setLoading(false)
    }, 800)
  }, [id, navigate])

  const handleAddToCart = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver todos los productos
        </Link>
      </div>
    )
  }

  return (
    <div className="detalle-producto-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Inicio</Link>
          <ChevronRight size={14} />
          <Link to="/productos">Productos</Link>
          <ChevronRight size={14} />
          <Link to={`/productos/${product.category === "sol" ? "gafas-sol" : "monturas"}`}>
            {product.category === "sol" ? "Gafas de Sol" : "Monturas"}
          </Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>

        <div className="back-to-products">
          <Link to="/productos" className="back-link">
            <ArrowLeft size={16} />
            <span>Volver a productos</span>
          </Link>
        </div>

        <div className="product-detail-container">
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={product.images[selectedImage] || ""}
                alt={product.name}
                className="main-image"
              />
              {product.bestseller && <div className="product-badge bestseller">Más Vendido</div>}
              <div className="product-badge category">{product.category === "sol" ? "Gafas de Sol" : "Monturas"}</div>
            </div>
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image || ""} alt={`${product.name} - Vista ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star key={i} size={18} className={i < product.rating ? "star-filled" : "star-empty"} />
                  ))}
                <span className="rating-text">
                  {product.rating.toFixed(1)} ({product.reviewCount} reseñas)
                </span>
              </div>
              <div className="product-stock">
                {product.stock > 0 ? (
                  <span className="in-stock">
                    <Check size={16} />
                    En stock ({product.stock} disponibles)
                  </span>
                ) : (
                  <span className="out-of-stock">Agotado</span>
                )}
              </div>
            </div>

            <div className="product-price">${product.price.toFixed(2)}</div>

            <div className="product-description">
              <p>{product.longDescription}</p>
            </div>

            <div className="product-colors">
              <h3>Color:</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className={`color-option ${selectedColor?.name === color.name ? "selected" : ""}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && <Check size={14} color="white" />}
                  </div>
                ))}
              </div>
              <span className="selected-color-name">{selectedColor?.name}</span>
            </div>

            <div className="product-features">
              <h3>Características:</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <Check size={16} className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus size={16} />
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingCart size={18} />
                Añadir al Carrito
              </button>

              <button className="wishlist-btn">
                <Heart size={18} />
              </button>

              <button className="share-btn">
                <Share2 size={18} />
              </button>
            </div>

            <div className="product-specifications">
              <h3>Especificaciones:</h3>
              <table className="specifications-table">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-name">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button className="tab-btn active">Reseñas ({reviews.length})</button>
            <button className="tab-btn">Envío y Devoluciones</button>
            <button className="tab-btn">Guía de Tallas</button>
          </div>

          <div className="tab-content">
            <div className="reviews-container">
              <div className="reviews-summary">
                <div className="average-rating">
                  <div className="rating-number">{product.rating.toFixed(1)}</div>
                  <div className="rating-stars">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <Star key={i} size={18} className={i < product.rating ? "star-filled" : "star-empty"} />
                      ))}
                    <span className="rating-count">Basado en {product.reviewCount} reseñas</span>
                  </div>
                </div>
                <button className="write-review-btn">Escribir una reseña</button>
              </div>

              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{review.user.charAt(0)}</div>
                        <div className="reviewer-details">
                          <div className="reviewer-name">{review.user}</div>
                          <div className="review-date">{review.date}</div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <Star key={i} size={16} className={i < review.rating ? "star-filled" : "star-empty"} />
                          ))}
                      </div>
                    </div>
                    <div className="review-content">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">Productos Relacionados</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="related-product-card">
                  <Link to={`/producto/${relatedProduct.id}`} className="related-product-link">
                    <div className="related-product-image">
                      <img src={relatedProduct.images[0] || "/placeholder.svg"} alt={relatedProduct.name} />
                      {relatedProduct.bestseller && <div className="product-badge bestseller small">Más Vendido</div>}
                    </div>
                    <div className="related-product-info">
                      <h3 className="related-product-title">{relatedProduct.name}</h3>
                      <div className="related-product-rating">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < relatedProduct.rating ? "star-filled" : "star-empty"}
                            />
                          ))}
                      </div>
                      <div className="related-product-price">${relatedProduct.price.toFixed(2)}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`cart-notification ${showNotification ? "show" : ""}`}>
        <ShoppingCart size={18} />
        <span>Producto añadido al carrito</span>
      </div>
    </div>
  )
}

export default DetalleProducto
