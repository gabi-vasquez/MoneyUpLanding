import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import TestimonialCard from './TestimonialCard';

/**
 * Componente Testimonials con lógica compleja de estado
 * Implementa: useState, useEffect, useMemo, useCallback, memo
 */
const Testimonials = memo(() => {
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

    // useMemo para los testimonios (evita recrear el array en cada render)
    const testimonials = useMemo(
        () => [
            {
                id: 1,
                name: 'Jhon Bold',
                comment:
                    'Desde que uso MoneyUp he logrado llegar a fin de mes sin preocuparme por mis compras y gastos. Gracias MoneyUp',
            },
            {
                id: 2,
                name: 'Jhon Bold',
                comment:
                    'Desde que uso MoneyUp he logrado llegar a fin de mes sin preocuparme por mis compras y gastos. Gracias MoneyUp',
            },
            {
                id: 3,
                name: 'Jhon Bold',
                comment:
                    'Desde que uso MoneyUp he logrado llegar a fin de mes sin preocuparme por mis compras y gastos. Gracias MoneyUp',
            },
            {
                id: 4,
                name: 'Jhon Bold',
                comment:
                    'Desde que uso MoneyUp he logrado llegar a fin de mes sin preocuparme por mis compras y gastos. Gracias MoneyUp',
            },
            {
                id: 5,
                name: 'Jhon Bold',
                comment:
                    'Desde que uso MoneyUp he logrado llegar a fin de mes sin preocuparme por mis compras y gastos. Gracias MoneyUp',
            },
            {
                id: 6,
                name: 'Jhon Bold',
                comment:
                    'Desde que uso MoneyUp he logrado llegar a fin de mes sin preocuparme por mis compras y gastos. Gracias MoneyUp',
            },
        ],
        []
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
            className="py-16 md:py-24 bg-linear-to-b from-white to-gray-50"
        >
            <div className="container mx-auto px-4">
                {/* Título */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isIntersecting
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="font-inter font-bold text-3xl md:text-5xl text-gray-800">
                        Comentarios de nuestros usuarios
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

