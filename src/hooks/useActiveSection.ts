import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * Hook personalizado para detectar qué sección está visible en la pantalla
 * Usa IntersectionObserver API para tracking eficiente
 * 
 * @param sectionId - ID de la sección a observar
 * @param options - Opciones del IntersectionObserver
 * 
 * Uso:
 * ```tsx
 * // En un componente de sección:
 * useActiveSection('hero');
 * 
 * // En el Navbar:
 * const { state } = useAppContext();
 * const isActive = state.visibleSections.has('hero');
 * ```
 */
export function useActiveSection(
    sectionId: string,
    options?: IntersectionObserverInit
) {
    const { addVisibleSection, removeVisibleSection } = useAppContext();

    useEffect(() => {
        // Buscar el elemento por ID
        const element = document.getElementById(sectionId);
        
        if (!element) {
            console.warn(`Element with id "${sectionId}" not found`);
            return;
        }

        // Configuración del observer
        const observerOptions: IntersectionObserverInit = {
            // Considera visible cuando el 30% del elemento está visible
            threshold: 0.3,
            // Margen para activar antes de que entre completamente
            rootMargin: '-100px 0px -50% 0px',
            ...options,
        };

        // Crear el observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // El elemento es visible, agregarlo al Set
                    addVisibleSection(sectionId);
                } else {
                    // El elemento no es visible, removerlo del Set
                    removeVisibleSection(sectionId);
                }
            });
        }, observerOptions);

        // Comenzar a observar
        observer.observe(element);

        // Cleanup: detener la observación cuando el componente se desmonte
        return () => {
            observer.unobserve(element);
            removeVisibleSection(sectionId);
        };
    }, [sectionId, addVisibleSection, removeVisibleSection, options]);
}

/**
 * Hook para obtener la sección activa actual
 * Retorna el ID de la primera sección visible (útil para el navbar)
 * 
 * Uso:
 * ```tsx
 * const activeSection = useGetActiveSection();
 * // activeSection = 'hero' | 'about' | 'contact' | null
 * ```
 */
export function useGetActiveSection(): string | null {
    const { state } = useAppContext();
    
    // Retornar el primer elemento del Set (la sección más arriba que está visible)
    const firstVisible = Array.from(state.visibleSections)[0];
    return firstVisible || null;
}

