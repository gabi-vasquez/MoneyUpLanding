import { memo, useMemo, useCallback } from 'react';

interface FooterProps {
    vectorBg: string;
    twitterIcon: string;
    instagramIcon: string;
    facebookIcon: string;
}

interface SocialLink {
    id: string;
    icon: string;
    url: string;
    label: string;
}

/**
 * Componente Footer con diseño moderno y onda decorativa
 * 
 * Optimizaciones implementadas:
 * - memo: Evita re-renders innecesarios
 * - useMemo: Cachea la lista de redes sociales
 * - useCallback: Memoriza el handler de clicks
 * 
 * Layout Inteligente:
 * - Usa CSS Variables para dimensiones dinámicas
 * - Clase .footer-container para espaciado adaptativo
 * - Clase .footer-wave para altura dinámica de la onda
 * - Sin valores hardcodeados - se adapta automáticamente
 * 
 * Características:
 * - Diseño responsive (mobile-first)
 * - Onda decorativa SVG en la parte superior
 * - Accesibilidad mejorada (ARIA labels, roles semánticos)
 * - Animaciones suaves en hover
 * - Background pattern decorativo
 */
const Footer = memo(({ vectorBg, twitterIcon, instagramIcon, facebookIcon }: FooterProps) => {
    // useMemo para los enlaces sociales - Evita recrear el array en cada render
    const socialLinks = useMemo<SocialLink[]>(
        () => [
            {
                id: 'twitter',
                icon: twitterIcon,
                url: 'https://twitter.com',
                label: 'Twitter'
            },
            {
                id: 'instagram',
                icon: instagramIcon,
                url: 'https://instagram.com',
                label: 'Instagram'
            },
            {
                id: 'facebook',
                icon: facebookIcon,
                url: 'https://facebook.com',
                label: 'Facebook'
            },
        ],
        [twitterIcon, instagramIcon, facebookIcon]
    );

    // useCallback para el manejo de clicks - Evita recrear la función
    const handleSocialClick = useCallback((url: string, platform: string) => {
        // Analytics tracking could be added here
        console.log(`Opening ${platform}: ${url}`);
        window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="footer-container relative bg-gray-dark text-white"
            role="contentinfo"
            aria-label="Footer"
        >
            {/* 
                Onda decorativa superior - Curva en U hacia abajo
                - .footer-wave-container: Posiciona la onda con translateY(-100%)
                - .footer-wave: Altura dinámica basada en CSS Variables
                El margin-top del footer-container (100px) da espacio para esta onda
            */}
            <div className="footer-wave-container absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="footer-wave relative block w-full"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M0,0 Q360,50 720,50 T1440,0 L1440,100 L0,100 Z"
                        className="fill-gray-dark"
                    />
                </svg>
            </div>

            {/* Background pattern decorativo */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img
                    src={vectorBg}
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
            </div>

            {/* Contenido principal del footer */}
            <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        {/* Logo/Título */}
                        <h2 className="font-inter font-bold text-2xl sm:text-3xl text-white mb-4 sm:mb-5">
                            MoneyUp
                        </h2>

                        {/* Descripción */}
                        <p className="font-inter font-extralight text-base sm:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>

                        {/* Redes sociales */}
                        <nav
                            className="flex gap-4 mb-8 sm:mb-10"
                            aria-label="Redes sociales"
                        >
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSocialClick(social.url, social.label);
                                    }}
                                    className="group transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-dark rounded-full"
                                    aria-label={`Visitar nuestro perfil de ${social.label}`}
                                >
                                    <img
                                        src={social.icon}
                                        alt={social.label}
                                        className="w-6 h-6 sm:w-7 sm:h-7 brightness-0 invert opacity-90 group-hover:opacity-100"
                                        loading="lazy"
                                    />
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-white/10 pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <p className="font-inter text-xs sm:text-sm text-white/60">
                                © {currentYear} MoneyUp. Todos los derechos reservados.
                            </p>

                            {/* Enlaces legales */}
                            <nav className="flex gap-6">
                                <a
                                    href="#privacy"
                                    className="font-inter text-xs sm:text-sm text-white/60 hover:text-white transition-colors focus:outline-none focus:underline"
                                >
                                    Privacidad
                                </a>
                                <a
                                    href="#terms"
                                    className="font-inter text-xs sm:text-sm text-white/60 hover:text-white transition-colors focus:outline-none focus:underline"
                                >
                                    Términos
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;

