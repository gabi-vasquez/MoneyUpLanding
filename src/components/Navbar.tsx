import { memo, useCallback, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useScroll } from '../hooks/useScroll';

interface NavbarProps {
    logoUrl: string;
}

/**
 * Componente Navbar con React.memo para optimización
 * Implementa: useState, useCallback, useMemo, Context, Custom Hooks
 */
const Navbar = memo(({ logoUrl }: NavbarProps) => {
    const { state, toggleMenu } = useAppContext();
    const scroll = useScroll();

    // useMemo para calcular si el navbar debe ser transparente o sólido
    const isScrolled = useMemo(() => scroll.y > 50, [scroll.y]);

    // useCallback para memorizar la función de click en enlaces
    const handleNavClick = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // useMemo para los items del menú
    const navItems = useMemo(
        () => [
            { id: 'inicio', label: 'Inicio' },
            { id: 'sobre-nosotros', label: 'Sobre Nosotros' },
            { id: 'contacto', label: 'Contacto' },
        ],
        []
    );

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-lime-custom shadow-lg' : 'bg-lime-custom'
                }`}
        >
            {/* Onda decorativa SVG */}
            <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
                <svg
                    viewBox="0 0 1280 187"
                    className="absolute bottom-0 w-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 0C320 93.4 640 93.4 960 0C1120 -46.7 1280 46.7 1280 187V0H0Z"
                        fill="#A3E635"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <div className="shrink-0">
                        <img src={logoUrl} alt="MoneyUp Logo" className="h-10 w-auto" />
                    </div>

                    {/* Links de navegación - Desktop */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className="text-lime-lightest font-archivo text-lg hover:text-white transition-colors duration-200"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Botón Descargar */}
                    <div className="hidden md:block">
                        <button className="bg-gray-dark text-lime-lightest px-8 py-3 rounded-2xl font-inter font-bold hover:bg-gray-800 transition-colors duration-200">
                            Descargar
                        </button>
                    </div>

                    {/* Botón menú móvil */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-lime-lightest p-2"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {state.isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Menú móvil */}
                {state.isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        handleNavClick(item.id);
                                        toggleMenu();
                                    }}
                                    className="text-lime-lightest font-archivo text-left hover:text-white transition-colors duration-200"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button className="bg-gray-dark text-lime-lightest px-8 py-3 rounded-2xl font-inter font-bold hover:bg-gray-800 transition-colors duration-200 w-full">
                                Descargar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;

