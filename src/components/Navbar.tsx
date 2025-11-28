import { Calculator, Package, FolderOpen, BarChart3, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import MenuUsuario from './auth/MenuUsuario';
import LoginModal from './auth/LoginModal';

interface NavItem {
  name: string;
  href: string;
  icon: typeof Package;
}

// Items del navbar para la aplicación (cuando estás en /app/*)
const appNavItems: NavItem[] = [
  { name: 'Calculadora', href: '/app/calculadora', icon: Calculator },
  { name: 'Inventario', href: '/app/inventario', icon: Package },
  { name: 'Proyectos', href: '/app/proyectos', icon: FolderOpen },
  { name: 'Reportes', href: '/app/reportes', icon: BarChart3 },
];

// Items del navbar para la landing pública (cuando estás en /)
const publicNavItems: NavItem[] = [];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  
  // Determinar si estamos en el área de la app
  const isInApp = currentPath.startsWith('/app');
  const logoHref = isInApp ? '/app' : '/';
  
  // Usar items diferentes según la ubicación
  const navItems = isInApp ? appNavItems : publicNavItems;

  // Escuchar evento para abrir el modal desde otras partes de la app
  useEffect(() => {
    const handleOpenLoginModal = () => {
      setLoginModalOpen(true);
    };
    
    window.addEventListener('open-login-modal', handleOpenLoginModal);
    
    return () => {
      window.removeEventListener('open-login-modal', handleOpenLoginModal);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-pink-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y nombre */}
            <div className="flex items-center space-x-3">
              <a href={logoHref} className="flex items-center space-x-3 group">
                <div className="relative">
                  {/* Efecto de brillo detrás del logo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-lg group-hover:from-pink-500/40 group-hover:to-purple-500/40 transition-all duration-300"></div>
                  
                  {/* Contenedor del logo - más cuadrado */}
                  <div className="relative w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 p-2.5 border-2 border-pink-300 shadow-md">
                    <img 
                      src="/logo_navbar.png" 
                      alt="Arte Entre Puntadas" 
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                
                <span className="text-xl font-display font-bold gradient-text hidden sm:block hover:scale-105 transition-transform duration-200">
                  Arte Entre Puntadas
                </span>
              </a>
            </div>

            {/* Links de navegación - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-2 border-pink-300'
                        : 'text-purple-600 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Menú de usuario */}
            <div className="hidden md:block">
              <MenuUsuario onLoginClick={() => setLoginModalOpen(true)} />
            </div>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-purple-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-pink-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-2 border-pink-300'
                        : 'text-purple-600 hover:text-pink-600 hover:bg-pink-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
              {/* Menú de usuario en móvil */}
              <div className="pt-3 border-t-2 border-pink-200">
                <MenuUsuario onLoginClick={() => setLoginModalOpen(true)} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modal de Login */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
