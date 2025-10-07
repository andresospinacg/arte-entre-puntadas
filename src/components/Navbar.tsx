import { Calculator, Package, FolderOpen, BarChart3, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import MenuUsuario from './auth/MenuUsuario';
import LoginModal from './auth/LoginModal';

interface NavItem {
  name: string;
  href: string;
  icon: typeof Calculator;
}

const navItems: NavItem[] = [
  { name: 'Calculadora', href: '/calculadora', icon: Calculator },
  { name: 'Inventario', href: '/inventario', icon: Package },
  { name: 'Proyectos', href: '/proyectos', icon: FolderOpen },
  { name: 'Reportes', href: '/reportes', icon: BarChart3 },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

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
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y nombre */}
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-200">
                  <Calculator className="w-6 h-6 text-dark-950" />
                </div>
                <span className="text-xl font-display font-bold text-white hidden sm:block">
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
                        ? 'bg-dark-700 text-primary-400'
                        : 'text-dark-500 hover:text-white hover:bg-dark-800'
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
              className="md:hidden p-2 rounded-lg text-dark-500 hover:text-white hover:bg-dark-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-dark-700 bg-dark-900">
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
                        ? 'bg-dark-700 text-primary-400'
                        : 'text-dark-500 hover:text-white hover:bg-dark-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
              {/* Menú de usuario en móvil */}
              <div className="pt-3 border-t border-dark-700">
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
