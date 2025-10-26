import { memo, useMemo } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { useActiveSection } from '../hooks/useActiveSection';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

interface HeroProps {
    mascotImage: string;
    lineImage: string;
}

/**
 * Componente Hero con animaciones y custom hooks
 * Implementa: memo, useMemo, useIntersection (custom hook)
 * Soporte para múltiples idiomas y tema claro/oscuro
 */
const Hero = memo(({ mascotImage, lineImage }: HeroProps) => {
    const { state } = useAppContext();
    const t = getTranslations(state.language);

    const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
        threshold: 0.2,
        triggerOnce: true,
    });

    // Registrar esta sección como visible en el Context
    useActiveSection('hero');

    // useMemo para el contenido del texto - traducido
    const content = useMemo(
        () => ({
            title: 'MoneyUP',
            description: state.language === 'es'
                ? 'aplicacion para controlar\ntus ingresos y egresos.'
                : 'app to track your\nincome and expenses.',
            subtitle: state.language === 'es' ? 'Ideal para' : 'Ideal for',
            feature: state.language === 'es'
                ? 'definir metas de ahorro.'
                : 'setting savings goals.',
        }),
        [state.language]
    );

    return (
        <section
            id="hero"
            ref={ref}
            className="relative pb-16 md:pb-24 overflow-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Columna izquierda - Mascota */}
                    <div
                        className={`relative transition-all duration-1000 ${isIntersecting
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            <img
                                src={mascotImage}
                                alt="MoneyUp Mascot"
                                className="w-full h-auto drop-shadow-2xl animate-float"
                            />
                            {/* Línea decorativa */}
                            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-32 md:w-48">
                                <img
                                    src={lineImage}
                                    alt=""
                                    className="w-full h-auto opacity-80"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Texto */}
                    <div
                        className={`space-y-6 transition-all duration-1000 delay-300 ${isIntersecting
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-10'
                            }`}
                    >
                        <h1 className="font-archivo text-4xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>
                            {content.title}
                        </h1>

                        <p className="font-inter text-2xl md:text-3xl leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                            {content.description}
                        </p>

                        <div className="pt-8">
                            <h2 className="font-archivo text-3xl md:text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
                                {content.subtitle}
                            </h2>
                            <p className="font-inter text-2xl md:text-3xl" style={{ color: 'var(--text-secondary)' }}>
                                {content.feature}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS personalizado para la animación float */}
            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;

