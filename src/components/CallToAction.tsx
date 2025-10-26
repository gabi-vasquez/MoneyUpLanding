import { memo, useCallback, useMemo, useState } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';
import { cn } from '../lib/utils';

interface CallToActionProps {
    phoneImage: string;
}

/**
 * Componente CTA con estado y callbacks optimizados
 * Implementa: useState, memo, useCallback, useMemo, useIntersection
 * Soporte para múltiples idiomas y tema claro/oscuro
 */
const CallToAction = memo(({ phoneImage }: CallToActionProps) => {
    const { state } = useAppContext();
    const t = getTranslations(state.language);

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
        if (action === 'start') {
            window.location.href = '/download/';
        }
        // Aquí puedes agregar la lógica de navegación o descarga
    }, []);

    // useMemo para los datos de los botones - traducidos
    const buttons = useMemo(
        () => [
            {
                id: 'start',
                label: state.language === 'es' ? 'Empieza ahora' : 'Start now',
                bgColor: '#a3e635',
                hoverColor: '#84cc16',
                textColor: '#1f2937',
            },
            {
                id: 'docs',
                label: state.language === 'es' ? 'Documentación' : 'Documentation',
                bgColor: 'var(--button-bg)',
                hoverColor: '#374151',
                textColor: 'var(--button-text)',
            },
        ],
        [state.language]
    );

    return (
        <section
            ref={ref}
            className="relative py-16 md:py-24 overflow-hidden"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="w-full">
                {/* Texto principal */}
                <div
                    className={`text-center mb-12 transition-all duration-1000 ${isIntersecting
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                        }`}
                >
                    <h2 className="font-archivo text-3xl md:text-5xl mb-6" style={{ color: 'var(--text-primary)' }}>
                        {state.language === 'es'
                            ? <>¿Necesitas ayuda para manejar tus <span style={{ color: '#a3e635' }}>ingresos</span> y <span style={{ color: '#a3e635' }}>egresos</span>?</>
                            : <>Need help managing your <span style={{ color: '#a3e635' }}>income</span> and <span style={{ color: '#a3e635' }}>expenses</span>?</>
                        }
                    </h2>
                    <p className="font-inter text-xl md:text-3xl opacity-70 max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        {state.language === 'es'
                            ? <>Descarga MoneyUp y tu vida<br />financiera se volvera mas llevadera</>
                            : <>Download MoneyUp and your<br />financial life will become easier</>
                        }
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
                                // Conditional hover state
                                hoveredButton === button.id ? 'scale-105 shadow-2xl' : 'shadow-lg'
                            )}
                            style={{
                                backgroundColor: button.bgColor,
                                color: button.textColor,
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = button.hoverColor;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = button.bgColor;
                            }}
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
                        {/* Gradient overlay para efecto fade - se adapta al tema */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `linear-gradient(to top, var(--bg-primary), transparent)`
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;

