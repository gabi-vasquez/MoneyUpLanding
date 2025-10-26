import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';
import TestimonialCard from './TestimonialCard';

/**
 * Componente Testimonials con lógica compleja de estado
 * Implementa: useState, useEffect, useMemo, useCallback, memo
 * Soporte para múltiples idiomas y tema claro/oscuro
 */
const Testimonials = memo(() => {
    const { state } = useAppContext();
    const t = getTranslations(state.language);

    const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
        threshold: 0.2,
        triggerOnce: true,
    });

    const [visibleCards, setVisibleCards] = useState<number>(0);

    // useEffect para animar las cards cuando entran en vista
    useEffect(() => {
        if (isIntersecting && visibleCards < 6) {
            const timer = setTimeout(() => {
                setVisibleCards((prev) => prev + 1);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isIntersecting, visibleCards]);

    // useMemo para los testimonios (evita recrear el array en cada render) - traducidos
    const testimonials = useMemo(
        () => [
            {
                id: 1,
                name: 'Jhon Bold',
                comment: state.language === 'es'
                    ? 'Desde que uso MoneyUp he logrado llegar a fin de mes sin preocuparme por mis compras y gastos. Gracias MoneyUp'
                    : 'Since using MoneyUp, I\'ve been able to make it through the month without worrying about my purchases and expenses. Thanks MoneyUp',
            },
            {
                id: 2,
                name: 'Maria Garcia',
                comment: state.language === 'es'
                    ? 'Excelente app para organizar las finanzas personales. Muy fácil de usar y me ha ayudado mucho.'
                    : 'Excellent app for organizing personal finances. Very easy to use and has helped me a lot.',
            },
            {
                id: 3,
                name: 'Carlos Rodriguez',
                comment: state.language === 'es'
                    ? 'La mejor aplicación para controlar mis gastos. La recomiendo 100%.'
                    : 'The best app to control my expenses. I recommend it 100%.',
            },
            {
                id: 4,
                name: 'Ana Martinez',
                comment: state.language === 'es'
                    ? 'MoneyUp me ayudó a cumplir mis metas de ahorro. Gracias por crear esta app!'
                    : 'MoneyUp helped me achieve my savings goals. Thanks for creating this app!',
            },
            {
                id: 5,
                name: 'Luis Fernandez',
                comment: state.language === 'es'
                    ? 'Interfaz intuitiva y funciones muy útiles. Me encanta poder ver mis gastos por categorías.'
                    : 'Intuitive interface and very useful features. I love being able to see my expenses by categories.',
            },
            {
                id: 6,
                name: 'Sofia Lopez',
                comment: state.language === 'es'
                    ? 'Finalmente puedo tener control total de mis finanzas. Aplicación imprescindible.'
                    : 'I can finally have total control of my finances. Essential application.',
            },
        ],
        [state.language]
    );

    // useCallback para filtrar testimonios visibles
    const getVisibleTestimonials = useCallback(() => {
        return testimonials.slice(0, visibleCards);
    }, [testimonials, visibleCards]);

    const visibleTestimonialsList = useMemo(
        () => getVisibleTestimonials(),
        [getVisibleTestimonials]
    );

    return (
        <section
            ref={ref}
            className="py-16 md:py-24"
            style={{
                background: `linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))`,
                transition: 'background 0.3s ease'
            }}
        >
            <div className="w-full">
                {/* Título */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isIntersecting
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="font-inter font-bold text-3xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>
                        {state.language === 'es'
                            ? 'Comentarios de nuestros usuarios'
                            : 'What our users say'
                        }
                    </h2>
                </div>

                {/* Grid de testimonios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {visibleTestimonialsList.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`transition-all duration-700 ${isIntersecting && index < visibleCards
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-10'
                                }`}
                        >
                            <TestimonialCard
                                name={testimonial.name}
                                comment={testimonial.comment}
                                delay={index * 150}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;

