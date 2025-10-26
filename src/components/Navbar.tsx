import { memo, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useScroll } from '../hooks/useScroll';
import { useGetActiveSection } from '../hooks/useActiveSection';
import { getTranslations } from '../lib/i18n';

interface NavbarProps {
    logoUrl: string;
}

/**
 * Componente Navbar con React.memo para optimización
 * Implementa: useState, useCallback, useMemo, Context, Custom Hooks
 */
const Navbar = memo(({ logoUrl }: NavbarProps) => {
    const { state, toggleMenu, toggleTheme, setLanguage } = useAppContext();
    const scroll = useScroll();
    const activeSection = useGetActiveSection();
    const t = getTranslations(state.language);

    // useMemo para calcular si el navbar debe ser transparente o sólido
    const isScrolled = useMemo(() => scroll.y > 50, [scroll.y]);

    // useMemo para los items del menú - ahora con traducciones y sectionId
    const navItems = useMemo(
        () => [
            { href: '/', label: t.navbar.home, sectionId: 'hero' },
            { href: '/about-us/', label: t.navbar.aboutUs, sectionId: 'about' },
            { href: '/contact/', label: t.navbar.contact, sectionId: 'contact' },
        ],
        [t]
    );

    // Función helper para determinar si un link está activo
    const isLinkActive = (sectionId: string) => {
        // Verificar si estamos en el cliente (browser)
        if (typeof window === 'undefined') return false;

        // Si estamos en la home (/) verificar con activeSection
        if (window.location.pathname === '/') {
            return activeSection === sectionId;
        }
        // Si estamos en otra página, verificar con el pathname
        return window.location.pathname.includes(sectionId);
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                paddingBottom: isScrolled ? '0' : '96px',
                backgroundColor: '#A3E635',
            }}
        >
            {/* Contenido principal del navbar */}
            <div className="max-w-[1440px] mx-auto px-8 md:px-12 relative z-10">
                {/* Desktop Grid Layout */}
                <div className="hidden md:grid items-center justify-center transition-all duration-300 h-20" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                    {/* Logo - Columna izquierda */}
                    <div className="flex justify-center">
                        <a href="/" className="shrink-0">
                            <img
                                src={logoUrl}
                                alt="MoneyUp Logo"
                                className="h-[34px] w-auto"
                                style={{ maxWidth: '194px' }}
                            />
                        </a>
                    </div>

                    {/* Links de navegación - Columna central (centrado perfecto) */}
                    <div className="flex items-center justify-center gap-12">
                        {navItems.map((item) => {
                            const isActive = isLinkActive(item.sectionId);
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={`text-white font-archivo hover:opacity-80 transition-all duration-200 whitespace-nowrap ${isActive ? 'font-bold border-b-2 border-white pb-1' : ''
                                        }`}
                                    style={{ fontSize: '20px', fontWeight: isActive ? 700 : 400 }}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* Botón Descargar + Controls - Columna derecha */}
                    <div className="flex justify-center items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="text-white hover:opacity-80 transition-opacity duration-200 p-2"
                            aria-label={state.theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                            title={state.theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
                        >
                            {state.theme === 'light' ? (
                                // Icono Luna
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            ) : (
                                // Icono Sol
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(state.language === 'es' ? 'en' : 'es')}
                            className="text-white hover:opacity-80 transition-opacity duration-200 px-3 py-2 rounded-lg font-inter font-semibold text-sm"
                            aria-label={state.language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
                            title={state.language === 'es' ? 'English' : 'Español'}
                        >
                            {state.language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
                        </button>

                        {/* Botón Descargar */}
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
                            {t.navbar.download}
                        </a>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex items-center justify-between transition-all duration-300 h-20">
                    {/* Logo */}
                    <a href="/" className="shrink-0">
                        <img
                            src={logoUrl}
                            alt="MoneyUp Logo"
                            className="h-[34px] w-auto"
                            style={{ maxWidth: '194px' }}
                        />
                    </a>

                    {/* Botón menú móvil */}
                    <button
                        onClick={toggleMenu}
                        className="text-white p-2"
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
                            {navItems.map((item) => {
                                const isActive = isLinkActive(item.sectionId);
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={toggleMenu}
                                        className={`text-white font-archivo text-lg text-left hover:opacity-80 transition-all duration-200 py-2 ${isActive ? 'font-bold border-l-4 border-white pl-3' : ''
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}

                            {/* Controls móviles */}
                            <div className="flex items-center justify-center gap-4 pt-4 pb-2 border-t border-white/20">
                                {/* Theme Toggle Mobile */}
                                <button
                                    onClick={toggleTheme}
                                    className="text-white hover:opacity-80 transition-opacity duration-200 p-3 rounded-lg bg-white/10"
                                    aria-label={state.theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
                                >
                                    {state.theme === 'light' ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>

                                {/* Language Toggle Mobile */}
                                <button
                                    onClick={() => setLanguage(state.language === 'es' ? 'en' : 'es')}
                                    className="text-white hover:opacity-80 transition-opacity duration-200 px-4 py-3 rounded-lg font-inter font-semibold bg-white/10"
                                    aria-label={state.language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
                                >
                                    {state.language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
                                </button>
                            </div>

                            <a
                                href="/download/"
                                className="bg-gray-800 text-white px-8 py-3 rounded-[20px] font-inter font-bold hover:bg-gray-900 transition-colors duration-200 w-full mt-4 text-center inline-block"
                                style={{ backgroundColor: '#1F2937', textDecoration: 'none' }}
                            >
                                {t.navbar.download}
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
                        style={{ fill: 'var(--bg-primary)' }}
                    />
                </svg>
            </div>
        </nav>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;

