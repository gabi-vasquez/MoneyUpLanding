import { memo, useMemo } from 'react';
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

    // useMemo para los items del menú
    const navItems = useMemo(
        () => [
            { href: '/', label: 'Inicio' },
            { href: '/about-us/', label: 'Sobre Nosotros' },
            { href: '/contact/', label: 'Contacto' },
        ],
        []
    );

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-lime-custom"
            style={{
                paddingBottom: isScrolled ? '0' : '96px'
            }}
        >
            {/* Contenido principal del navbar */}
            <div className="max-w-[1280px] mx-auto px-8 md:px-[124px] relative z-10">
                <div
                    className="flex items-center justify-between transition-all duration-300 h-20">
                    {/* Logo */}
                    <a href="/" className="shrink-0">
                        <img
                            src={logoUrl}
                            alt="MoneyUp Logo"
                            className="h-[34px] w-auto"
                            style={{ maxWidth: '194px' }}
                        />
                    </a>

                    {/* Links de navegación - Desktop */}
                    <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2" style={{ gap: '138px' }}>
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-white font-archivo hover:opacity-80 transition-opacity duration-200 whitespace-nowrap"
                                style={{ fontSize: '20px', fontWeight: 400 }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Botón Descargar */}
                    <div className="hidden md:block shrink-0">
                        <a
                            href="/download/"
                            className="font-inter font-bold text-white hover:opacity-90 transition-opacity duration-200 inline-flex items-center justify-center"
                            style={{
                                backgroundColor: '#1F2937',
                                padding: '14px 40px',
                                borderRadius: '20px',
                                fontSize: '20px',
                                width: '181px',
                                height: '58px',
                                textDecoration: 'none'
                            }}
                        >
                            Descargar
                        </a>
                    </div>

                    {/* Botón menú móvil */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white p-2"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
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
                    <div className="md:hidden pb-6 pt-2">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={toggleMenu}
                                    className="text-white font-archivo text-lg text-left hover:opacity-80 transition-opacity duration-200 py-2"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="/download/"
                                className="bg-gray-800 text-white px-8 py-3 rounded-[20px] font-inter font-bold hover:bg-gray-900 transition-colors duration-200 w-full mt-4 text-center inline-block"
                                style={{ backgroundColor: '#1F2937', textDecoration: 'none' }}
                            >
                                Descargar
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Onda decorativa SVG en la parte inferior */}
            <div
                className="absolute left-0 right-0 w-full pointer-events-none overflow-visible transition-all duration-300"
                style={{
                    top: '88px',
                    height: '115px',
                    opacity: isScrolled ? 0 : 1,
                    visibility: isScrolled ? 'hidden' : 'visible'
                }}
            >
                <svg
                    viewBox="0 0 1280 187"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    style={{ display: 'block' }}
                >
                    <path
                        d="M0,20 C213,80 427,120 640,100 C853,80 1067,40 1280,20 L1280,187 L0,187 Z"
                        fill="white"
                    />
                </svg>
            </div>
        </nav>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;

