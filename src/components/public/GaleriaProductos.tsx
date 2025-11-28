import { Heart, Star, X } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  imagen: string; // Puede ser emoji (temporalmente) o ruta /productos/nombre.jpg
  imagenReal?: string; // Ruta a la imagen real cuando esté disponible
  precio: string;
  descripcion: string;
  detalles?: string; // Descripción extendida para el modal
  tamano?: string; // Tamaño aproximado
  materiales?: string; // Materiales utilizados
}

const productosDestacados: Producto[] = [
  {
    id: 1,
    nombre: "Llavero - Galleta festival",
    categoria: "Accesorios",
    imagen: "🏴‍☠️",
    imagenReal: "/productos/llavero-galleta.jpg",
    precio: "Desde $15.000",
    descripcion: "Amigurumi de galleta festival tejido a mano",
    detalles: "Llavero único inspirado en el famoso personaje de galleta. Perfecto para llevar contigo a todas partes. Cada pieza es hecha a mano con amor y dedicación.",
    materiales: "Algodón 100%, relleno hipoalergénico"
  },
  {
    id: 2,
    nombre: "Muñeca",
    categoria: "Personajes",
    imagen: "🐧",
    imagenReal: "/productos/muneca.jpg",
    precio: "Desde $120.000",
    descripcion: "Hermosa muñeca Tamaño perfecto para abrazar y jugar. Ideal para niñas y bebés. ¡Un regalo tierno lleno de amor hecho a mano que será la compañera perfecta de aventuras!​​​​​​​​​​​​​​​​ 🫶🏻",
    detalles: "Hermosa muñeca Tamaño perfecto para abrazar y jugar. Ideal para niñas y bebés. ¡Un regalo tierno lleno de amor hecho a mano que será la compañera perfecta de aventuras!​​​​​​​​​​​​​​​​ 🫶🏻",
    tamano: "25-30 cm",
    materiales: "Algodón premium, ojos de seguridad, relleno antiestático"
  },
  {
    id: 3,
    nombre: "Llavero Abeja",
    categoria: "Accesorios",
    imagen: "🐝",
    imagenReal: "/productos/abeja-molly.jpg",
    precio: "Desde $15.000",
    descripcion: "Adorable llavero de abejita con delicados detalles de rayas y alitas, tamaño perfecto para llaves o bolsos ✨",
    detalles: "Adorable llavero de abejita con delicados detalles de rayas y alitas, tamaño perfecto para llaves o bolsos. ✨",
    materiales: "Hilo acrílico, fieltro para alas"
  },
  {
    id: 4,
    nombre: "Vincent van Gogh",
    categoria: "Personajes",
    imagen: "🎩",
    imagenReal: "/productos/Vincent-van-Gogh.jpg",
    precio: "Desde $85.000",
    descripcion: "Vincent van Gogh clásico perfecto para regalar",
    detalles: "Representación única del famoso pintor con todos sus detalles característicos. Perfecto para amantes del arte. Una pieza de conversación ideal para tu escritorio o estantería.",
    tamano: "15 cm",
    materiales: "Algodón, accesorios en fieltro"
  },
  {
    id: 5,
    nombre: "Paleta de helado",
    categoria: "Accesorios",
    imagen: "🍦",
    imagenReal: "/productos/paleta-de-helado.jpg",
    precio: "Desde $40.000",
    descripcion: "Hermosa paleta de helado con detalles únicos",
    detalles: "Paleta de helado colorida con detalles realistas. Ideal para decoración de verano o regalo divertido. Los colores pueden personalizarse según tus preferencias.",
    tamano: "12-15 cm",
    materiales: "Hilo acrílico multicolor, palito de madera"
  },
  {
    id: 6,
    nombre: "Rosa Sherk",
    categoria: "Accesorios",
    imagen: "🌹",
    imagenReal: "/productos/flor-sherk.jpg",
    precio: "Desde $28.000",
    descripcion: "Hermosa rosa de Sherk con detalles únicos",
    detalles: "La icónica rosa de la película Shrek, tejida con amor. Un regalo romántico y divertido a la vez. Perfecta para los fans de la película.",
    tamano: "15 cm con tallo",
    materiales: "Algodón satinado, alambre para tallo"
  },
  {
    id: 7,
    nombre: "Separadores de Libros",
    categoria: "Accesorios",
    imagen: "📖",
    imagenReal: "/productos/separador-libros.jpg",
    precio: "Desde $17.000",
    descripcion: "Separador con diseño de gato, perfecto para los amantes de la lectura y gaticos.",
    detalles: "Separador con diseño de gato, perfecto para los amantes de la lectura y gaticos",
    tamano: "15-20 cm",
    materiales: "Algodón, cinta de satén"
  },
  {
    id: 8,
    nombre: "Llavero Pollito",
    categoria: "Animales",
    imagen: "🐣",
    imagenReal: "/productos/pollito-sombrero-conejo.jpg",
    precio: "Desde $15.000",
    descripcion: "Tierno pollito ideal para decoración o regalo",
    detalles: "Adorable pollito con sombrero de vaquero. Perfecto como decoración infantil o regalo tierno. Sus detalles hacen que cada pieza sea especial.",
    tamano: "8-10 cm",
    materiales: "Algodón suave, ojos bordados seguros"
  },
  {
    id: 9,
    nombre: "Sonajero Venadito",
    categoria: "Bebés",
    imagen: "🦌",
    imagenReal: "/productos/sonajero-venado.jpg",
    precio: "Desde $40.000",
    descripcion: "Dulce sonajero tejido con forma de venadito, perfecto para bebés",
    detalles: "Sonajero diseñado especialmente para manos pequeñitas. Suave, liviano y con sonido gentil que no asusta al bebé. Hecho con materiales seguros y certificados.",
    tamano: "12-15 cm",
    materiales: "Algodón orgánico, relleno hipoalergénico, sonajero interno certificado"
  },
  {
    id: 10,
    nombre: "Separador de Libros Ranita",
    categoria: "Accesorios",
    imagen: "🐸",
    imagenReal: "/productos/separador-libros-ranita.jpg",
    precio: "Desde $20.000",
    descripcion: "Hermoso separador de libros con diseño de ranita",
    detalles: "Separador de libros único con diseño de ranita adorable. Ideal para marcar tu lugar favorito mientras lees. Un regalo perfecto para lectores de todas las edades.",
    tamano: "15-18 cm",
    materiales: "Algodón, cinta marcadora"
  },
  {
    id: 11,
    nombre: "Pollito Mascota Logo Empresa",
    categoria: "Personalizados",
    imagen: "✨",
    imagenReal: "/productos/pollito-logo-empresa.jpg",
    precio: "Desde $65.000",
    descripcion: "Tienes un negocio? ¡Haz que tu mascota sea única con nuestro servicio de personalización!",
    detalles: "Creamos la mascota de tu empresa o negocio en amigurumi. Perfecto para eventos corporativos, merchandising o regalos empresariales. Incluye logo bordado o aplicado según diseño.\n\nPrecios según tamaño:\n• 10 cm: $65.000\n• 15 cm: $85.000\n• 20 cm: $100.000",
    tamano: "10 cm, 15 cm o 20 cm (a elegir)",
    materiales: "Materiales premium seleccionados según el proyecto"
  },
  {
    id: 12,
    nombre: "Personalizada",
    categoria: "Personalizados",
    imagen: "✨",
    imagenReal: "/productos/mujer-personalizado.jpg",
    precio: "Desde $65.000",
    descripcion: "Regala un recuerdo inolvidable con nuestras figuras personalizadas de personas",
    detalles: "Creamos una figura personalizada de la persona que quieras inmortalizar. Ideal para regalos de cumpleaños, aniversarios o momentos especiales. Envianos una foto y recreamos cada detalle.\n\nPrecios según tamaño:\n• 10 cm: $65.000\n• 15 cm: $85.000\n• 20 cm: $100.000",
    tamano: "10 cm, 15 cm o 20 cm (a elegir)",
    materiales: "Algodón premium, detalles personalizados según foto"
  },
  {
    id: 13,
    nombre: "Personalizado",
    categoria: "Personalizados",
    imagen: "💑",
    imagenReal: "/productos/abuelo-personalizado.jpg",
    precio: "Desde $65.000",
    descripcion: "Regala un recuerdo inolvidable con nuestras figuras personalizadas de abuelos",
    detalles: "Un regalo único para honrar a los abuelos. Creamos figuras personalizadas con sus características, ropa favorita y accesorios. El regalo perfecto para el Día de los Abuelos o cualquier ocasión especial.\n\nPrecios según tamaño:\n• 10 cm: $65.000\n• 15 cm: $85.000\n• 20 cm: $100.000",
    tamano: "10 cm, 15 cm o 20 cm (a elegir)",
    materiales: "Algodón premium, detalles personalizados"
  },
  {
    id: 14,
    nombre: "Lyffy One Piece",
    categoria: "Personajes",
    imagen: "🦙",
    imagenReal: "/productos/hero-2.jpg",
    precio: "Desde $90.000",
    descripcion: "Luffy de One Piece Incluye su icónico sombrero de paja, chaleco rojo y pantalón azul y todos sus detalles. Perfecto para fans del anime y coleccionistas.💛❤",
    detalles: "Luffy de One Piece Incluye su icónico sombrero de paja, chaleco rojo y pantalón azul y todos sus detalles. Perfecto para fans del anime y coleccionistas.💛❤",
    tamano: "15 cm",
    materiales: "Algodón amarillo y verde, detalles bordados"
  },
  {
    id: 15,
    nombre: "Llavero Frailejón Ernesto Pérez",
    categoria: "Personajes",
    imagen: "🌿",
    imagenReal: "/productos/frailejon-ernesto.jpg",
    precio: "Desde $15.000",
    descripcion: "El querido Frailejón Ernesto Pérez de los niños colombianos",
    detalles: "¡El personaje más adorable de la televisión colombiana! Frailejón Ernesto Pérez tejido a mano con todos sus detalles característicos. Perfecto para niños y coleccionistas.",
    materiales: "Algodón verde, fieltro, ojos de seguridad"
  }

];

// Componente Modal para mostrar detalles del producto
interface ProductoModalProps {
  producto: Producto;
  onClose: () => void;
}

function ProductoModal({ producto, onClose }: ProductoModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-pink-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-b-2 border-pink-200 px-6 py-4 flex items-center justify-between rounded-t-3xl flex-shrink-0">
          <h2 className="text-2xl font-bold gradient-text">{producto.nombre}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-pink-100 rounded-lg transition-colors text-purple-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="p-6 overflow-y-auto flex-1" style={{scrollbarWidth: 'thin'}}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Imagen del producto */}
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden relative shadow-lg">
              {producto.imagenReal ? (
                <img 
                  src={producto.imagenReal}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const emojiDiv = document.createElement('div');
                      emojiDiv.className = 'absolute inset-0 flex items-center justify-center text-9xl';
                      emojiDiv.textContent = producto.imagen;
                      parent.appendChild(emojiDiv);
                    }
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-9xl">
                  {producto.imagen}
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
                  {producto.categoria}
                </span>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="ml-2 text-purple-600 text-sm font-medium">(5.0)</span>
                </div>

                <p className="text-3xl font-bold text-pink-600 mb-4">{producto.precio}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Descripción</h3>
                <p className="text-purple-700">{producto.detalles || producto.descripcion}</p>
              </div>

              {producto.tamano && (
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Tamaño aproximado</h3>
                  <p className="text-purple-700">{producto.tamano}</p>
                </div>
              )}

              {producto.materiales && (
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Materiales</h3>
                  <p className="text-purple-700">{producto.materiales}</p>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3 pt-4">
                <a
                  href={`https://wa.me/573133097012?text=Hola!%20Me%20interesa%20el%20producto:%20${encodeURIComponent(producto.nombre)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full flex items-center justify-center space-x-2 font-medium"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Hacer Pedido por WhatsApp</span>
                </a>
                
                <a
                  href="https://instagram.com/arte_entrepuntadas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-purple-300 text-purple-700 px-6 py-3 rounded-full hover:bg-purple-50 hover:border-pink-400 transition-all duration-300 w-full flex items-center justify-center space-x-2 font-medium"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Ver más en Instagram</span>
                </a>
              </div>

              {/* Información adicional */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 space-y-2 text-sm text-purple-700 border border-pink-200">
                <p>✓ Hecho 100% a mano con amor</p>
                <p>✓ Materiales de alta calidad</p>
                <p>✓ Cada pieza es única</p>
                <p>✓ Envíos a todo Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GaleriaProductos() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const categorias = ['Todos', 'Personajes', 'Animales', 'Bebés', 'Accesorios', 'Personalizados'];

  const productosFiltrados = categoriaActiva === 'Todos' 
    ? productosDestacados 
    : productosDestacados.filter(p => p.categoria === categoriaActiva);

  return (
    <section id="galeria" className="scroll-anchor py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Nuestras Creaciones</span>
          </h2>
          <p className="text-xl text-purple-700 max-w-2xl mx-auto">
            Cada amigurumi es único y hecho con dedicación. Explora nuestra galería y encuentra el perfecto para ti.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map(categoria => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                categoriaActiva === categoria
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-lg scale-105'
                  : 'bg-white text-purple-700 border-purple-300 hover:border-pink-400 hover:text-pink-600 hover:shadow-md hover:bg-pink-50'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" key={categoriaActiva}>
          {productosFiltrados.map((producto, index) => (
            <div 
              key={producto.id}
              className="card-hover group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setProductoSeleccionado(producto)}
            >
              {/* Imagen */}
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl mb-4 overflow-hidden relative">
                {producto.imagenReal ? (
                  <img 
                    src={producto.imagenReal}
                    alt={producto.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Si la imagen no carga, mostrar emoji
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const emojiDiv = document.createElement('div');
                        emojiDiv.className = 'absolute inset-0 flex items-center justify-center text-8xl';
                        emojiDiv.textContent = producto.imagen;
                        parent.appendChild(emojiDiv);
                      }
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-300">
                    {producto.imagen}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-pink-500 font-medium bg-pink-100 px-2 py-1 rounded-full">{producto.categoria}</span>
                  <button 
                    className="p-2 hover:bg-pink-50 rounded-lg transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-4 h-4 text-purple-400 hover:text-pink-500 hover:fill-pink-500 transition-colors" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-purple-900 group-hover:text-pink-500 transition-colors">
                  {producto.nombre}
                </h3>

                <p className="text-sm text-purple-600 line-clamp-2">
                  {producto.descripcion}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-pink-500 font-bold text-lg">{producto.precio}</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 scroll-animate">
          <a href="/galeria" className="btn-secondary inline-flex items-center space-x-2 hover:scale-105 transition-transform">
            <span>Ver Catálogo Completo</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Modal de producto */}
      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </section>
  );
}
