import { memo, useCallback, useMemo, useState } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { cn } from '../lib/utils';

interface CallToActionProps {
    phoneImage: string;
}

/**
 * Componente CTA con estado y callbacks optimizados
 * Implementa: useState, memo, useCallback, useMemo, useIntersection
 */
const CallToAction = memo(({ phoneImage }: CallToActionProps) => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const { ref, isIntersecting } = useIntersection<HTMLDivElement>({
        threshold: 0.3,
        triggerOnce: true,
    });

    // useCallback para memorizar los handlers de hover
    const handleMouseEnter = useCallback((buttonId: string) => {
        setHoveredButton(buttonId);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredButton(null);
    }, []);

    // useCallback para el click de los botones
    const handleButtonClick = useCallback((action: string) => {
        console.log(`Action clicked: ${action}`);
        // Aquí puedes agregar la lógica de navegación o descarga
    }, []);

    // useMemo para los datos de los botones
    const buttons = useMemo(
        () => [
            {
                id: 'start',
                label: 'Empieza ahora',
                bgColor: 'bg-lime-custom',
                hoverColor: 'hover:bg-lime-green',
                textColor: 'text-gray-dark',
            },
            {
                id: 'docs',
                label: 'Documentación',
                bgColor: 'bg-black',
                hoverColor: 'hover:bg-gray-dark',
                textColor: 'text-lime-lightest',
            },
        ],
        []
    );

    return (
        <section
            ref={ref}
            className="relative py-16 md:py-24 bg-white overflow-hidden"
        >
            <div className="w-full">
                {/* Texto principal */}
                <div
                    className={`text-center mb-12 transition-all duration-1000 ${isIntersecting
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="font-archivo text-3xl md:text-5xl text-black mb-6">
                        ¿Necesitas ayuda para manejar tus{' '}
                        <span className="text-lime-custom">ingresos</span> y{' '}
                        <span className="text-lime-custom">egresos</span>?
                    </h2>
                    <p className="font-inter text-xl md:text-3xl text-gray-800 opacity-70 max-w-3xl mx-auto">
                        Descarga MoneyUp y tu vida
                        <br />
                        financiera se volvera mas llevadera
                    </p>
                </div>

                {/* Botones */}
                <div
                    className={cn(
                        'flex flex-col sm:flex-row gap-6 justify-center items-center mb-16',
                        'transition-all duration-1000 delay-300',
                        isIntersecting
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                    )}
                >
                    {buttons.map((button) => (
                        <button
                            key={button.id}
                            onClick={() => handleButtonClick(button.id)}
                            onMouseEnter={() => handleMouseEnter(button.id)}
                            onMouseLeave={handleMouseLeave}
                            className={cn(
                                // Base styles
                                'px-12 py-5 rounded-2xl font-archivo text-2xl md:text-3xl',
                                'transition-all duration-300 transform',
                                // Button-specific colors
                                button.bgColor,
                                button.hoverColor,
                                button.textColor,
                                // Conditional hover state
                                hoveredButton === button.id ? 'scale-105 shadow-2xl' : 'shadow-lg'
                            )}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>

                {/* Imagen del teléfono */}
                <div
                    className={`relative max-w-md mx-auto transition-all duration-1000 delay-500 ${isIntersecting
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                        }`}
                >
                    <div className="relative">
                        <img
                            src={phoneImage}
                            alt="MoneyUp App Preview"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                        {/* Gradient overlay para efecto fade */}
                        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;

