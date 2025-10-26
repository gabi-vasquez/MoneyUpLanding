import { memo, useMemo, useEffect, useState } from 'react';
import { useScroll } from '../hooks/useScroll';

/**
 * Componente ScrollProgress - Barra de progreso de scroll
 * Demuestra: memo, useMemo, useState, useEffect, custom hook
 * 
 * Este componente muestra una barra en la parte superior que indica
 * el progreso del scroll en la página
 */
const ScrollProgress = memo(() => {
    const scroll = useScroll();
    const [progress, setProgress] = useState(0);

    // useEffect para calcular el progreso de scroll
    useEffect(() => {
        const calculateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const totalScrollable = documentHeight - windowHeight;
            const scrollProgress = (scrollTop / totalScrollable) * 100;

            setProgress(Math.min(scrollProgress, 100));
        };

        calculateProgress();
    }, [scroll.y]);

    // useMemo para calcular el color basado en el progreso
    const barColor = useMemo(() => {
        if (progress < 25) return 'bg-lime-light';
        if (progress < 50) return 'bg-lime-custom';
        if (progress < 75) return 'bg-lime-green';
        return 'bg-green-600';
    }, [progress]);

    // useMemo para calcular si la barra debe ser visible
    const isVisible = useMemo(() => progress > 1, [progress]);

    return (
        <div
            className={`fixed top-0 left-0 right-0 h-1 z-100 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div
                className={`h-full ${barColor} transition-all duration-300 ease-out shadow-lg`}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
});

ScrollProgress.displayName = 'ScrollProgress';

export default ScrollProgress;

