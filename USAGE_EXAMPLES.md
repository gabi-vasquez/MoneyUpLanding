# 🚀 Ejemplos de Uso del Context API

## 📋 Tabla de Contenidos
1. [Cambio de Tema (Dark/Light)](#1-cambio-de-tema)
2. [Cambio de Idioma (ES/EN)](#2-cambio-de-idioma)
3. [Control del Menú Móvil](#3-control-del-menú-móvil)
4. [Navegación Activa](#4-navegación-activa)

---

## 1. Cambio de Tema

### Ejemplo Básico
```tsx
import { useAppContext } from '../context/AppContext';

function ThemeToggleButton() {
    const { state, toggleTheme } = useAppContext();
    
    return (
        <button onClick={toggleTheme}>
            {state.theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}
```

### Ejemplo Avanzado - Con Icono Animado
```tsx
import { useAppContext } from '../context/AppContext';

function AnimatedThemeToggle() {
    const { state, toggleTheme } = useAppContext();
    
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-transform hover:scale-110"
            aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {state.theme === 'light' ? (
                // Luna (Dark Mode)
                <svg className="w-6 h-6 transition-transform rotate-0" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            ) : (
                // Sol (Light Mode)
                <svg className="w-6 h-6 transition-transform rotate-180" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
}
```

### Usar CSS Variables del Tema
```tsx
function ThemedCard() {
    return (
        <div
            style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
            }}
            className="p-4 rounded-lg transition-colors duration-300"
        >
            Este card se adapta al tema automáticamente
        </div>
    );
}
```

---

## 2. Cambio de Idioma

### Ejemplo Básico
```tsx
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

function LanguageToggle() {
    const { state, setLanguage } = useAppContext();
    const t = getTranslations(state.language);
    
    return (
        <button onClick={() => setLanguage(state.language === 'es' ? 'en' : 'es')}>
            {state.language === 'es' ? '🇺🇸 English' : '🇪🇸 Español'}
        </button>
    );
}
```

### Ejemplo con Dropdown
```tsx
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

function LanguageSelector() {
    const { state, setLanguage } = useAppContext();
    const t = getTranslations(state.language);
    
    return (
        <select
            value={state.language}
            onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
            className="px-4 py-2 rounded-lg"
        >
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇺🇸 English</option>
        </select>
    );
}
```

### Usar Traducciones en un Componente
```tsx
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

function WelcomeMessage() {
    const { state } = useAppContext();
    const t = getTranslations(state.language);
    
    return (
        <div>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
            <button>{t.hero.cta}</button>
        </div>
    );
}
```

### Agregar Nuevas Traducciones
```typescript
// src/lib/i18n.ts

export interface Translations {
    // ... existentes
    myNewSection: {
        title: string;
        description: string;
    };
}

export const translations: Record<Language, Translations> = {
    es: {
        // ... existentes
        myNewSection: {
            title: 'Mi Nueva Sección',
            description: 'Esta es una descripción en español',
        },
    },
    en: {
        // ... existentes
        myNewSection: {
            title: 'My New Section',
            description: 'This is a description in English',
        },
    },
};
```

---

## 3. Control del Menú Móvil

### Ejemplo Básico
```tsx
import { useAppContext } from '../context/AppContext';

function MobileMenu() {
    const { state, toggleMenu } = useAppContext();
    
    return (
        <>
            {/* Botón hamburguesa */}
            <button onClick={toggleMenu}>
                {state.isMenuOpen ? '✕' : '☰'}
            </button>
            
            {/* Menú desplegable */}
            {state.isMenuOpen && (
                <div className="mobile-menu">
                    <a href="/" onClick={toggleMenu}>Inicio</a>
                    <a href="/about" onClick={toggleMenu}>Sobre Nosotros</a>
                    <a href="/contact" onClick={toggleMenu}>Contacto</a>
                </div>
            )}
        </>
    );
}
```

### Ejemplo con Animación
```tsx
import { useAppContext } from '../context/AppContext';

function AnimatedMobileMenu() {
    const { state, toggleMenu } = useAppContext();
    
    return (
        <>
            <button onClick={toggleMenu} className="hamburger">
                <span className={state.isMenuOpen ? 'rotate-45' : ''}></span>
                <span className={state.isMenuOpen ? 'opacity-0' : ''}></span>
                <span className={state.isMenuOpen ? '-rotate-45' : ''}></span>
            </button>
            
            <div
                className={`
                    mobile-menu
                    transition-transform duration-300
                    ${state.isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* Contenido del menú */}
            </div>
        </>
    );
}
```

---

## 4. Navegación Activa

### Registrar una Sección
```tsx
import { useActiveSection } from '../hooks/useActiveSection';

function MySection() {
    // Registra esta sección en el Context
    useActiveSection('my-section');
    
    return (
        <section id="my-section">
            {/* Contenido de la sección */}
        </section>
    );
}
```

### Obtener Sección Activa en el Navbar
```tsx
import { useGetActiveSection } from '../hooks/useActiveSection';

function Navbar() {
    const activeSection = useGetActiveSection();
    
    const navItems = [
        { id: 'hero', label: 'Inicio' },
        { id: 'about', label: 'Sobre Nosotros' },
        { id: 'contact', label: 'Contacto' },
    ];
    
    return (
        <nav>
            {navItems.map(item => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={activeSection === item.id ? 'active' : ''}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
```

### Ejemplo Completo con Estilos
```tsx
import { useGetActiveSection } from '../hooks/useActiveSection';

function NavigationBar() {
    const activeSection = useGetActiveSection();
    
    const navItems = [
        { id: 'hero', label: 'Home', href: '#hero' },
        { id: 'features', label: 'Features', href: '#features' },
        { id: 'pricing', label: 'Pricing', href: '#pricing' },
    ];
    
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md">
            <div className="flex gap-4 p-4">
                {navItems.map(item => {
                    const isActive = activeSection === item.id;
                    
                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`
                                px-4 py-2 rounded-lg transition-all
                                ${isActive 
                                    ? 'bg-blue-500 text-white font-bold' 
                                    : 'text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            {item.label}
                            {isActive && (
                                <span className="ml-2">→</span>
                            )}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
```

### Configurar el Observer
```tsx
import { useActiveSection } from '../hooks/useActiveSection';

function CustomSection() {
    // Configuración personalizada del IntersectionObserver
    useActiveSection('my-section', {
        threshold: 0.5,              // 50% visible para activar
        rootMargin: '0px 0px -100px 0px'  // Margen personalizado
    });
    
    return (
        <section id="my-section">
            {/* Contenido */}
        </section>
    );
}
```

---

## 🎯 Ejemplo Completo - Componente que Usa Todo

```tsx
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';
import { useActiveSection } from '../hooks/useActiveSection';

function CompleteExample() {
    // 1. Acceder al Context
    const { state, toggleTheme, setLanguage, toggleMenu } = useAppContext();
    
    // 2. Obtener traducciones
    const t = getTranslations(state.language);
    
    // 3. Registrar sección como visible
    useActiveSection('example-section');
    
    return (
        <section
            id="example-section"
            style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
            }}
            className="p-8 transition-colors duration-300"
        >
            {/* Controles de tema e idioma */}
            <div className="flex gap-4 mb-4">
                <button onClick={toggleTheme}>
                    {state.theme === 'light' ? '🌙' : '☀️'}
                </button>
                
                <button onClick={() => setLanguage(state.language === 'es' ? 'en' : 'es')}>
                    {state.language === 'es' ? '🇺🇸' : '🇪🇸'}
                </button>
                
                <button onClick={toggleMenu} className="md:hidden">
                    {state.isMenuOpen ? '✕' : '☰'}
                </button>
            </div>
            
            {/* Contenido traducido */}
            <h1>{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
            
            {/* Información de estado */}
            <div className="mt-4 text-sm opacity-70">
                <p>Tema actual: {state.theme}</p>
                <p>Idioma: {state.language}</p>
                <p>Menú abierto: {state.isMenuOpen ? 'Sí' : 'No'}</p>
                <p>Secciones visibles: {state.visibleSections.size}</p>
            </div>
        </section>
    );
}

export default CompleteExample;
```

---

## 🔧 Tips y Mejores Prácticas

### 1. Usar `memo` para Optimización
```tsx
import { memo } from 'react';
import { useAppContext } from '../context/AppContext';

const OptimizedComponent = memo(() => {
    const { state } = useAppContext();
    
    return <div>{state.theme}</div>;
});
```

### 2. Extraer Solo lo Necesario
```tsx
// ❌ Malo - Causa re-renders innecesarios
const { state } = useAppContext();

// ✅ Bueno - Solo lo que necesitas
const { state: { theme } } = useAppContext();
```

### 3. Verificar SSR
```tsx
function MyComponent() {
    const { state } = useAppContext();
    
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') {
        return <div>Loading...</div>;
    }
    
    return <div>{state.theme}</div>;
}
```

---

## 📚 Recursos Adicionales

- [Documentación del Context](./CONTEXT_API_README.md)
- [Tipos de TypeScript](./src/context/AppContext.tsx)
- [Traducciones](./src/lib/i18n.ts)
- [Custom Hooks](./src/hooks/)

---

**¡Listo para usar! 🚀**

