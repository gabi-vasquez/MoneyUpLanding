import { memo, useMemo, useCallback } from 'react';

interface FooterProps {
    vectorBg: string;
    twitterIcon: string;
    instagramIcon: string;
    facebookIcon: string;
}

/**
 * Componente Footer con optimizaciones
 * Implementa: memo, useMemo, useCallback
 */
const Footer = memo(({ vectorBg, twitterIcon, instagramIcon, facebookIcon }: FooterProps) => {
    // useMemo para los enlaces sociales
    const socialLinks = useMemo(
        () => [
            { id: 'twitter', icon: twitterIcon, url: 'https://twitter.com', label: 'Twitter' },
            { id: 'instagram', icon: instagramIcon, url: 'https://instagram.com', label: 'Instagram' },
            { id: 'facebook', icon: facebookIcon, url: 'https://facebook.com', label: 'Facebook' },
        ],
        [twitterIcon, instagramIcon, facebookIcon]
    );

    // useCallback para el manejo de clicks en redes sociales
    const handleSocialClick = useCallback((url: string, platform: string) => {
        console.log(`Opening ${platform}: ${url}`);
        window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    return (
        <footer className="relative bg-gray-dark text-white py-16 overflow-hidden">
            {/* Background decorativo */}
            <div className="absolute inset-0 opacity-20">
                <img
                    src={vectorBg}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-md">
                    {/* Logo/Título */}
                    <h3 className="font-inter font-bold text-2xl text-lime-lightest mb-6">
                        MoneyUp
                    </h3>

                    {/* Descripción */}
                    <p className="font-inter font-extralight text-lg text-white mb-8 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>

                    {/* Redes sociales */}
                    <div className="flex gap-4">
                        {socialLinks.map((social) => (
                            <button
                                key={social.id}
                                onClick={() => handleSocialClick(social.url, social.label)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label={social.label}
                            >
                                <img
                                    src={social.icon}
                                    alt={social.label}
                                    className="w-5 h-5"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="font-inter text-sm text-white/70 text-center">
                        © {new Date().getFullYear()} MoneyUp. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;

