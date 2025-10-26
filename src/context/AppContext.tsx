import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

// Tipos para el contexto
interface AppState {
    theme: 'light' | 'dark';
    language: 'es' | 'en';
    isMenuOpen: boolean;
    visibleSections: Set<string>;
}

interface AppContextType {
    state: AppState;
    toggleTheme: () => void;
    toggleMenu: () => void;
    setLanguage: (lang: 'es' | 'en') => void;
    addVisibleSection: (section: string) => void;
    removeVisibleSection: (section: string) => void;
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider del contexto
export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>({
        theme: 'light',
        language: 'es',
        isMenuOpen: false,
        visibleSections: new Set(),
    });

    // useCallback para evitar re-renders innecesarios
    const toggleTheme = useCallback(() => {
        setState((prev) => ({
            ...prev,
            theme: prev.theme === 'light' ? 'dark' : 'light',
        }));
    }, []);

    const toggleMenu = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isMenuOpen: !prev.isMenuOpen,
        }));
    }, []);

    const setLanguage = useCallback((lang: 'es' | 'en') => {
        setState((prev) => ({
            ...prev,
            language: lang,
        }));
    }, []);

    const addVisibleSection = useCallback((section: string) => {
        setState((prev) => {
            const newSet = new Set(prev.visibleSections);
            newSet.add(section);
            return {
                ...prev,
                visibleSections: newSet,
            };
        });
    }, []);

    const removeVisibleSection = useCallback((section: string) => {
        setState((prev) => {
            const newSet = new Set(prev.visibleSections);
            newSet.delete(section);
            return {
                ...prev,
                visibleSections: newSet,
            };
        });
    }, []);

    // useMemo para evitar recrear el objeto de valor en cada render
    const value = useMemo(
        () => ({
            state,
            toggleTheme,
            toggleMenu,
            setLanguage,
            addVisibleSection,
            removeVisibleSection,
        }),
        [state, toggleTheme, toggleMenu, setLanguage, addVisibleSection, removeVisibleSection]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext debe ser usado dentro de un AppProvider');
    }
    return context;
}

