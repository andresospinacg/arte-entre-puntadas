import { Heart, Star, Search, X } from 'lucide-react';
import { FaWhatsapp, FaHeart, FaInstagram } from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  imagen: string;
  imagenReal?: string;
  precio: string;
  descripcion: string;
  detalles?: string;
  tamano?: string;
  materiales?: string;
}

const todosLosProductos: Producto[] = [
  {
    id: 1,
    nombre: "Llavero - Galleta festival",
    categoria: "Accesorios",
    imagen: "🏴‍☠️",
    imagenReal: "/productos/llavero-galleta.jpg",
    precio: "Desde $45.000",
    descripcion: "Amigurumi de galleta festival tejido a mano",
    detalles: "Llavero único inspirado en el famoso personaje de galleta. Perfecto para llevar contigo a todas partes.",
    materiales: "Algodón 100%, relleno hipoalergénico"
  },
  {
    id: 2,
    nombre: "Muñeca",
    categoria: "Personajes",
    imagen: "🐧",
    imagenReal: "/productos/muneca.jpg",
    precio: "Desde $150.000",
    descripcion: "Adorable muñeca tejida a mano con detalles únicos",
    detalles: "Muñeca clásica con vestido y accesorios personalizables. Ideal para coleccionar o regalar.",
    tamano: "25-30 cm",
    materiales: "Algodón premium, ojos de seguridad, relleno antiestático"
  },
  {
    id: 3,
    nombre: "Abeja Molly",
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
    detalles: "Paleta de helado colorida con detalles realistas. Ideal para decoración de verano o regalo divertido.",
    tamano: "12-15 cm",
    materiales: "Hilo acrílico multicolor, palito de madera"
  },
  {
    id: 6,
    nombre: "Rosa Shrek",
    categoria: "Accesorios",
    imagen: "🌹",
    imagenReal: "/productos/flor-sherk.jpg",
    precio: "Desde $28.000",
    descripcion: "Hermosa rosa de Shrek con detalles únicos",
    detalles: "La icónica rosa de la película Shrek, tejida con amor. Un regalo romántico y divertido a la vez.",
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
    descripcion: "Separadores tejidos con diseños únicos",
    detalles: "Colección de separadores con personajes adorables. Perfectos para los amantes de la lectura. Cada diseño es único y puede personalizarse.",
    tamano: "15-20 cm",
    materiales: "Algodón, cinta de satén"
  },
  {
    id: 8,
    nombre: "Pollito Vaquero",
    categoria: "Animales",
    imagen: "🐣",
    imagenReal: "/productos/pollito-sombrero-conejo.jpg",
    precio: "Desde $18.000",
    descripcion: "Tierno pollito ideal para decoración o regalo",
    detalles: "Adorable pollito con sombrero de vaquero. Perfecto como decoración infantil o regalo tierno. Sus detalles hacen que cada pieza sea especial.",
    tamano: "8-10 cm",
    materiales: "Algodón suave, ojos bordados seguros"
  },
  {
    id: 15,
    nombre: "Frailejón Ernesto Pérez",
    categoria: "Personajes",
    imagen: "🌿",
    imagenReal: "/productos/frailejon-ernesto.jpg",
    precio: "Desde $15.000",
    descripcion: "El querido Frailejón Ernesto Pérez de los niños colombianos",
    detalles: "¡El personaje más adorable de la televisión colombiana! Frailejón Ernesto Pérez tejido a mano con todos sus detalles característicos. Perfecto para niños y coleccionistas.",
    materiales: "Algodón verde, fieltro, ojos de seguridad"
  },
  {
    id: 16,
    nombre: "Doctora Personalizada",
    categoria: "Personalizados",
    imagen: "👩‍⚕️",
    imagenReal: "/productos/doctora-personalizado.jpg",
    precio: "Desde $80.000",
    descripcion: "Doctora personalizada con uniforme médico",
    detalles: "Amigurumi personalizado de doctora o enfermera. Perfecto para regalar a profesionales de la salud o estudiantes de medicina. Se puede personalizar el color de piel, cabello y detalles del uniforme.\n\nPrecios según tamaño:\n• 10 cm: $80.000\n• 15 cm: $95.000\n• 19 cm: $128.000",
    tamano: "10 cm, 15 cm o 19 cm (a elegir)",
    materiales: "Algodón, uniforme tejido, accesorios médicos"
  },
  {
    id: 17,
    nombre: "Abuelo Personalizado",
    categoria: "Personalizados",
    imagen: "👴",
    imagenReal: "/productos/abuelo-personalizado.jpg",
    precio: "Desde $80.000",
    descripcion: "Regala un recuerdo inolvidable con nuestras figuras personalizadas de abuelos",
    detalles: "Un regalo único para honrar a los abuelos. Creamos figuras personalizadas con sus características, ropa favorita y accesorios. El regalo perfecto para el Día de los Abuelos o cualquier ocasión especial.\n\nPrecios según tamaño:\n• 10 cm: $80.000\n• 15 cm: $95.000\n• 19 cm: $128.000",
    tamano: "10 cm, 15 cm o 19 cm (a elegir)",
    materiales: "Algodón premium, detalles personalizados"
  },
  {
    id: 18,
    nombre: "Hombre Personalizado",
    categoria: "Personalizados",
    imagen: "👨",
    imagenReal: "/productos/hombre-personalizado.jpg",
    precio: "Desde $80.000",
    descripcion: "Amigurumi personalizado de hombre según características",
    detalles: "Crea un amigurumi único basado en una persona real. Personalizable: color de piel, cabello, barba, ropa, accesorios. Ideal para regalos especiales, aniversarios o simplemente sorprender.\n\nPrecios según tamaño:\n• 10 cm: $80.000\n• 15 cm: $95.000\n• 19 cm: $128.000",
    tamano: "10 cm, 15 cm o 19 cm (a elegir)",
    materiales: "Algodón, detalles bordados y tejidos"
  },
  {
    id: 19,
    nombre: "Mujer Personalizada",
    categoria: "Personalizados",
    imagen: "👩",
    imagenReal: "/productos/mujer-personalizado.jpg",
    precio: "Desde $80.000",
    descripcion: "Amigurumi personalizado de mujer según características",
    detalles: "Amigurumi femenino totalmente personalizable. Elige color de piel, estilo de cabello, vestimenta, accesorios y más. Perfecto para auto-regalos o sorprender a alguien especial.\n\nPrecios según tamaño:\n• 10 cm: $80.000\n• 15 cm: $95.000\n• 19 cm: $128.000",
    tamano: "10 cm, 15 cm o 19 cm (a elegir)",
    materiales: "Algodón, detalles finos bordados"
  },
  {
    id: 20,
    nombre: "Joven Personalizado",
    categoria: "Personalizados",
    imagen: "🧑",
    imagenReal: "/productos/joven-personalizado.jpg",
    precio: "Desde $80.000",
    descripcion: "Amigurumi juvenil personalizado con estilo moderno",
    detalles: "Perfecto para adolescentes y jóvenes adultos. Personalizable con ropa casual moderna, accesorios como audífonos, mochilas, o elementos que representen sus hobbies.\n\nPrecios según tamaño:\n• 10 cm: $80.000\n• 15 cm: $95.000\n• 19 cm: $128.000",
    tamano: "10 cm, 15 cm o 19 cm (a elegir)",
    materiales: "Algodón, accesorios modernos tejidos"
  },
  {
    id: 21,
    nombre: "Corazoncito Amigurumi",
    categoria: "Accesorios",
    imagen: "❤️",
    imagenReal: "/productos/corazoncito.jpg",
    precio: "Desde $25.000",
    descripcion: "Tierno corazón tejido perfecto para regalar amor",
    detalles: "Pequeño corazón adorable con carita feliz. Ideal para San Valentín, aniversarios o cualquier ocasión para expresar amor. Se puede hacer en diferentes colores.",
    materiales: "Algodón suave, ojos bordados"
  },
  {
    id: 22,
    nombre: "Cerezas Obsequio",
    categoria: "Accesorios",
    imagen: "🍒",
    imagenReal: "/productos/cerezas-obsequio.jpg",
    precio: "Desde $12.000",
    descripcion: "Dos cerezas rojas unidas por su tallito verde tamaño perfecto para llaves o bolsos 🍒",
    detalles: "Dos cerezas rojas unidas por su tallito verde tamaño perfecto para llaves o bolsos 🍒",
    tamano: "10-12 cm (par)",
    materiales: "Algodón rojo y verde, relleno suave"
  },
  {
    id: 23,
    nombre: "Bolso Negro de Trapillo",
    categoria: "Accesorios",
    imagen: "👜",
    imagenReal: "/productos/bolso-negro-hecho-a-mano-trapillo.jpg",
    precio: "Desde $120.000",
    descripcion: "Bolso elegante tejido a mano en trapillo",
    detalles: "Bolso funcional y resistente tejido en trapillo. Perfecto para uso diario, espacioso y con diseño moderno. Incluye asas resistentes y cierre seguro.",
    tamano: "30x25 cm aprox",
    materiales: "Trapillo de alta calidad, forro interno opcional"
  },
  {
    id: 24,
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
    id: 25,
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
    id: 26,
    nombre: "Rosita Fresita",
    categoria: "Personajes",
    imagen: "🍓",
    imagenReal: "/productos/rosita-fresita.jpg",
    precio: "Desde $38.000",
    descripcion: "La dulce Rosita Fresita con su aroma a fresa",
    detalles: "Personaje clásico de Rosita Fresita (Strawberry Shortcake). Tejida con todos sus detalles: vestido, gorro y su característico cabello rojo. Perfecta para coleccionistas y fans.",
    tamano: "18-20 cm",
    materiales: "Algodón rojo y rosa, detalles bordados"
  },
  {
    id: 27,
    nombre: "Ranitas Llaveros para Parejas",
    categoria: "Accesorios",
    imagen: "🐸💚",
    imagenReal: "/productos/ranitas-llaveros-parejas.jpg",
    precio: "Desde $30.000",
    descripcion: "Set de 2 ranitas llaveros para parejas enamoradas",
    detalles: "Pareja de ranitas que se complementan. Perfectas para parejas, mejores amigos o hermanos. Cada uno lleva su ranita y siempre están conectados.",
    materiales: "Algodón verde, detalles en fieltro, argolla metálica"
  },
  {
    id: 28,
    nombre: "Ramo de Tulipanes con Abeja",
    categoria: "Accesorios",
    imagen: "🌷🐝",
    imagenReal: "/productos/ramo-tulipan-abeja.jpg",
    precio: "Desde $95.000",
    descripcion: "Hermoso ramo de tulipanes tejidos con abejita",
    detalles: "Ramo decorativo que nunca se marchita. Incluye varios tulipanes en colores vibrantes y una abejita posada. Perfecto para decoración permanente o regalo especial.",
    tamano: "25-30 cm de alto",
    materiales: "Algodón multicolor, tallos con alambre, maceta opcional"
  },
  {
    id: 29,
    nombre: "Pollito Sombrero Vaquero",
    categoria: "Animales",
    imagen: "🐤🤠",
    imagenReal: "/productos/pollito-sombrero-vaquero.jpg",
    precio: "Desde $15.000",
    descripcion: "Tierno pollito bebé con sombrero de vaquero",
    detalles: "Pollito amarillo adorable con su sombrero vaquero. Expresión dulce y tamaño perfecto para llevar a todas partes. Ideal como llavero o decoración.",
    tamano: "8-10 cm",
    materiales: "Algodón amarillo y café, ojos bordados seguros"
  },
  {
    id: 30,
    nombre: "Pollito Mascota Logo Empresa",
    categoria: "Personalizados",
    imagen: "🐥💼",
    imagenReal: "/productos/pollito-logo-empresa.jpg",
    precio: "Desde $80.000",
    descripcion: "Tienes un negocio? ¡Haz que tu mascota sea única con nuestro servicio de personalización!",
    detalles: "Creamos la mascota de tu empresa o negocio en amigurumi. Perfecto para eventos corporativos, merchandising o regalos empresariales. Incluye logo bordado o aplicado según diseño.\n\nPrecios según tamaño:\n• 10 cm: $80.000\n• 15 cm: $95.000\n• 19 cm: $128.000",
    tamano: "10 cm, 15 cm o 19 cm (a elegir)",
    materiales: "Materiales premium seleccionados según el proyecto"
  },
  {
    id: 31,
    nombre: "Llavero Diente",
    categoria: "Accesorios",
    imagen: "🦷",
    imagenReal: "/productos/llavero-diente.jpg",
    precio: "Desde $15.000",
    descripcion: "Diente sonriente tejido a mano. Regalo ideal para dentistas, estudiantes de odontología o celebrar la caída del primer diente.",
    detalles: "Diente sonriente tejido a mano. Regalo ideal para dentistas, estudiantes de odontología o celebrar la caída del primer diente.",
    materiales: "Algodón blanco, detalles bordados"
  },
  {
    id: 32,
    nombre: "Llaveros (Sol y Tierra)",
    categoria: "Accesorios",
    imagen: "☀️🌍",
    imagenReal: "/productos/llavero-diente-sol-tierra.jpg",
    precio: "Desde $30.000",
    descripcion: "Set de 2 llaveros sol y Tierra Diseño tierno con caritas sonrientes que se complementan perfectamente Ideal para parejas, mejores amigos etc.",
    detalles: "Set de 2 llaveros sol y Tierra Diseño tierno con caritas sonrientes que se complementan perfectamente Ideal para parejas, mejores amigos etc.",
    materiales: "Algodón multicolor, argollas metálicas"
  },
  {
    id: 33,
    nombre: "Llavero Lápiz",
    categoria: "Accesorios",
    imagen: "✏️",
    imagenReal: "/productos/llavero-lapiz.jpg",
    precio: "Desde $18.000",
    descripcion: "Llavero en forma de lápiz para maestros y estudiantes",
    detalles: "Lápiz tejido con punta y borrador detallados. Regalo perfecto para maestros, profesores, estudiantes o amantes de la papelería.",
    materiales: "Algodón amarillo y negro, detalles en fieltro"
  },
  {
    id: 34,
    nombre: "Messi",
    categoria: "Personajes",
    imagen: "⚽",
    imagenReal: "/productos/messi.jpg",
    precio: "Desde $70.000",
    descripcion: "Lionel Messi tejido a mano en crochet con los colores de Argentina. Incluye camiseta con el número 10 y detalles personalizados Perfecto para fanáticos del fútbol y coleccionistas.⚽💙🤍",
    detalles: "Lionel Messi tejido a mano en crochet con los colores de Argentina. Incluye camiseta con el número 10 y detalles personalizados Perfecto para fanáticos del fútbol y coleccionistas.⚽💙🤍",
    tamano: "13 cm",
    materiales: "Algodón, camiseta tejida con detalles bordados"
  },
  {
    id: 35,
    nombre: "Patito con Gorro de Sapito",
    categoria: "Animales",
    imagen: "🦆🐸",
    imagenReal: "/productos/patito-gorro-sapito.jpg",
    precio: "Desde $20.000",
    descripcion: "Adorable llavero de patito tejido a crochet con gorro de ranita verde Expresión tierna y colores vibrantes. Tamaño perfecto para llaves o bolsos 🐸",
    detalles: "Adorable llavero de patito tejido a crochet con gorro de ranita verde Expresión tierna y colores vibrantes. Tamaño perfecto para llaves o bolsos 🐸",
    materiales: "Algodón amarillo y verde, detalles bordados"
  },
  {
    id: 36,
    nombre: "Lyffy One Piece",
    categoria: "Personajes",
    imagen: "🦙",
    imagenReal: "/productos/hero-2.jpg",
    precio: "Desde $85.000",
    descripcion: "Luffy de One Piece Incluye su icónico sombrero de paja, chaleco rojo y pantalón azul y todos sus detalles. Perfecto para fans del anime y coleccionistas.💛❤",
    detalles: "Luffy de One Piece Incluye su icónico sombrero de paja, chaleco rojo y pantalón azul y todos sus detalles. Perfecto para fans del anime y coleccionistas.💛❤",
    tamano: "15 cm",
    materiales: "Algodón amarillo y verde, detalles bordados"
  },
    {
    id: 37,
    nombre: "Minions",
    categoria: "Personajes",
    imagen: "🌹",
    imagenReal: "/productos/hero-3.jpg",
    precio: "Desde $55.000",
    descripcion: "Tierno minions tejido úsalo como llavero o decoración para tu espacio. Perfecto para fans de Mi Villano Favorito y coleccionistas. ❤",
    detalles: "Tierno minions tejido úsalo como llavero o decoración para tu espacio. Perfecto para fans de Mi Villano Favorito y coleccionistas. ❤",
    tamano: "12-15 cm",
    materiales: "Algodón amarillo y verde, detalles bordados"
  }
];

interface ProductoModalProps {
  producto: Producto;
  onClose: () => void;
}

function ProductoModal({ producto, onClose }: ProductoModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-dark-800 border-b border-dark-700 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold gradient-text">{producto.nombre}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Imagen */}
            <div className="aspect-square bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-xl overflow-hidden relative">
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

            {/* Detalles */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary-400/20 text-primary-400 rounded-full text-sm font-medium mb-4">
                  {producto.categoria}
                </span>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-warm-400 fill-warm-400" />
                  ))}
                  <span className="ml-2 text-dark-500 text-sm">(5.0)</span>
                </div>

                <p className="text-3xl font-bold text-primary-400 mb-4">{producto.precio}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-dark-400">{producto.detalles || producto.descripcion}</p>
              </div>

              {producto.tamano && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tamaño aproximado</h3>
                  <p className="text-dark-400">{producto.tamano}</p>
                </div>
              )}

              {producto.materiales && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Materiales</h3>
                  <p className="text-dark-400">{producto.materiales}</p>
                </div>
              )}

              {/* CTAs */}
              <div className="space-y-3 pt-4">
                <a
                  href={`https://wa.me/573133097012?text=Hola!%20Me%20interesa%20el%20producto:%20${encodeURIComponent(producto.nombre)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>Hacer Pedido por WhatsApp</span>
                </a>
                
                <a
                  href="https://instagram.com/arte_entrepuntadas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full flex items-center justify-center space-x-2"
                >
                  <FaInstagram className="w-5 h-5" />
                  <span>Ver más en Instagram</span>
                </a>
              </div>

              {/* Info adicional */}
              <div className="bg-dark-700/50 rounded-lg p-4 space-y-2 text-sm text-dark-400">
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

export default function CatalogoCompleto() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [mostrarSoloFavoritos, setMostrarSoloFavoritos] = useState(false);
  const [animatingHeart, setAnimatingHeart] = useState<number | null>(null);

  const categorias = ['Todos', 'Personajes', 'Animales', 'Bebés', 'Accesorios', 'Personalizados'];

  // Cargar favoritos del localStorage al montar el componente
  useEffect(() => {
    try {
      const favoritosGuardados = localStorage.getItem('favoritos-arte-entre-puntadas');
      if (favoritosGuardados) {
        setFavoritos(JSON.parse(favoritosGuardados));
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem('favoritos-arte-entre-puntadas', JSON.stringify(favoritos));
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }, [favoritos]);

  // Filtrar productos
  const productosFiltrados = todosLosProductos.filter(producto => {
    const cumpleCategoria = categoriaActiva === 'Todos' || producto.categoria === categoriaActiva;
    const cumpleBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleFavoritos = !mostrarSoloFavoritos || favoritos.includes(producto.id);
    return cumpleCategoria && cumpleBusqueda && cumpleFavoritos;
  });

  const toggleFavorito = (id: number) => {
    setFavoritos(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
    
    // Animación del corazón
    setAnimatingHeart(id);
    setTimeout(() => setAnimatingHeart(null), 600);
  };

  const compartirFavoritos = () => {
    if (favoritos.length === 0) {
      alert('No tienes productos favoritos para compartir');
      return;
    }

    const productosFavoritos = todosLosProductos.filter(p => favoritos.includes(p.id));
    const mensaje = `¡Hola! Me interesan estos productos de Arte Entre Puntadas:\n\n${productosFavoritos.map((p, i) => `${i + 1}. ${p.nombre} - ${p.precio}`).join('\n')}\n\n¿Podrían darme más información?`;
    
    window.open(`https://wa.me/573133097012?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <>
      <div className="min-h-screen bg-dark-900 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Catálogo Completo</span>
            </h1>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Explora toda nuestra colección de amigurumis hechos a mano con amor
            </p>
          </div>

          {/* Barra de búsqueda */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:border-primary-400 transition-colors"
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-dark-700 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-dark-500" />
                </button>
              )}
            </div>
          </div>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => {
                  setCategoriaActiva(categoria);
                  setMostrarSoloFavoritos(false);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  categoriaActiva === categoria && !mostrarSoloFavoritos
                    ? 'bg-primary-400 text-dark-950'
                    : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                {categoria}
              </button>
            ))}
            
            {/* Botón Mis Favoritos */}
            {favoritos.length > 0 && (
              <button
                onClick={() => {
                  setMostrarSoloFavoritos(!mostrarSoloFavoritos);
                  if (!mostrarSoloFavoritos) {
                    setCategoriaActiva('Todos');
                  }
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  mostrarSoloFavoritos
                    ? 'bg-accent-400 text-dark-950'
                    : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${mostrarSoloFavoritos ? 'fill-current' : ''}`} />
                <span>Mis Favoritos ({favoritos.length})</span>
              </button>
            )}
          </div>

          {/* Contador de resultados */}
          <div className="text-center mb-6">
            <p className="text-dark-400">
              {mostrarSoloFavoritos 
                ? `${productosFiltrados.length} ${productosFiltrados.length === 1 ? 'favorito' : 'favoritos'}`
                : `${productosFiltrados.length} ${productosFiltrados.length === 1 ? 'producto encontrado' : 'productos encontrados'}`
              }
            </p>
          </div>

          {/* Grid de productos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {productosFiltrados.map(producto => (
              <div 
                key={producto.id}
                className="card-hover group cursor-pointer"
                onClick={() => setProductoSeleccionado(producto)}
              >
                {/* Imagen */}
                <div className="aspect-square bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-xl mb-4 overflow-hidden relative">
                  {producto.imagenReal ? (
                    <img 
                      src={producto.imagenReal}
                      alt={producto.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
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
                    <span className="text-xs text-primary-400 font-medium">{producto.categoria}</span>
                    <button 
                      className={`p-2 hover:bg-dark-700 rounded-lg transition-all ${
                        animatingHeart === producto.id ? 'scale-125' : 'scale-100'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorito(producto.id);
                      }}
                      title={favoritos.includes(producto.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      <Heart 
                        className={`w-4 h-4 transition-all duration-300 ${
                          favoritos.includes(producto.id)
                            ? 'text-accent-400 fill-accent-400 scale-110'
                            : 'text-dark-500 hover:text-accent-400'
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {producto.nombre}
                  </h3>

                  <p className="text-sm text-dark-400 line-clamp-2">
                    {producto.descripcion}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-primary-400 font-bold">{producto.precio}</span>
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-3 h-3 text-warm-400 fill-warm-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje si no hay resultados */}
          {productosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">{mostrarSoloFavoritos ? '�' : '�🔍'}</div>
              <h3 className="text-xl font-semibold mb-2">
                {mostrarSoloFavoritos ? 'No tienes favoritos aún' : 'No se encontraron productos'}
              </h3>
              <p className="text-dark-400 mb-6">
                {mostrarSoloFavoritos 
                  ? (
                    <span className="flex items-center justify-center gap-2">
                      Marca productos con el <FaHeart className="inline w-4 h-4 text-accent-400" /> para guardarlos aquí
                    </span>
                  )
                  : 'Intenta con otros términos de búsqueda o categoría'
                }
              </p>
              <button
                onClick={() => {
                  setBusqueda('');
                  setCategoriaActiva('Todos');
                  setMostrarSoloFavoritos(false);
                }}
                className="btn-secondary"
              >
                Ver todos los productos
              </button>
            </div>
          )}

          {/* CTA final */}
          <div className="bg-gradient-to-r from-primary-400/10 to-accent-400/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-dark-400 mb-6 max-w-2xl mx-auto">
              ¡Podemos crear cualquier diseño personalizado! Contáctanos y cuéntanos tu idea.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/573133097012?text=Hola!%20Me%20interesa%20un%20amigurumi%20personalizado"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Contactar por WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/arte_entrepuntadas"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <FaInstagram className="w-5 h-5" />
                <span>Ver Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante para compartir favoritos */}
      {favoritos.length > 0 && !mostrarSoloFavoritos && (
        <button
          onClick={compartirFavoritos}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-accent-400 to-accent-500 text-dark-950 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 group"
          title="Compartir mis favoritos por WhatsApp"
        >
          <div className="relative">
            <Heart className="w-6 h-6 fill-current" />
            <span className="absolute -top-2 -right-2 bg-primary-400 text-dark-950 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {favoritos.length}
            </span>
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Compartir favoritos
          </span>
        </button>
      )}

      {/* Modal de producto */}
      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </>
  );
}
