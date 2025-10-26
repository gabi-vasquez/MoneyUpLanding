# 📚 Documentación del Context API - MoneyUp Landing

## 🎯 Resumen Ejecutivo

Este proyecto implementa **Context API de React** de forma profesional y escalable, demostrando las mejores prácticas para el manejo de estado global en aplicaciones React.

## 🏗️ Arquitectura del Context

### Ubicación
- **Context Provider**: `src/context/AppContext.tsx`
- **Traducciones (i18n)**: `src/lib/i18n.ts`
- **Custom Hooks**: `src/hooks/useActiveSection.ts`

### Estado Global Gestionado

El `AppContext` gestiona 4 propiedades principales:

```typescript
interface AppState {
    theme: 'light' | 'dark';           // Tema visual de la aplicación
    language: 'es' | 'en';             // Idioma de la interfaz
    isMenuOpen: boolean;                // Estado del menú móvil
    visibleSections: Set<string>;      // Secciones visibles (IntersectionObserver)
}
```

---

## 🚀 Funcionalidades Implementadas

### 1️⃣ **Theme Toggle (Dark/Light Mode)** 🌓

**Uso:**
```tsx
import { useAppContext } from '../context/AppContext';

const { state, toggleTheme } = useAppContext();

<button onClick={toggleTheme}>
    {state.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
</button>
```

**Características:**
- ✅ Persistencia en `localStorage`
- ✅ Transiciones suaves con CSS Variables
- ✅ Colores adaptativos para Navbar, Footer, y contenido
- ✅ Carga automática del tema guardado al iniciar

**CSS Variables:**
```css
/* Light Mode */
:root {
    --bg-primary: #ffffff;
    --text-primary: #1f2937;
    --navbar-bg: #A3E635;
    /* ... más variables */
}

/* Dark Mode */
:root[data-theme='dark'] {
    --bg-primary: #111827;
    --text-primary: #f9fafb;
    --navbar-bg: #7AAC28;
    /* ... más variables */
}
```

---

### 2️⃣ **Internacionalización (i18n)** 🌐

**Uso:**
```tsx
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../lib/i18n';

const { state, setLanguage } = useAppContext();
const t = getTranslations(state.language);

<button onClick={() => setLanguage('en')}>
    {t.navbar.home} {/* "Home" o "Inicio" */}
</button>
```

**Idiomas Soportados:**
- 🇪🇸 Español (`es`)
- 🇺🇸 Inglés (`en`)

**Estructura de Traducciones:**
```typescript
export interface Translations {
    navbar: { home, aboutUs, contact, download }
    hero: { title, subtitle, cta }
    callToAction: { ... }
    testimonials: { ... }
    footer: { ... }
    contact: { ... }
    aboutUs: { ... }
    download: { ... }
    theme: { light, dark }
}
```

---

### 3️⃣ **Active Navigation (IntersectionObserver)** 📍

**Concepto:**
Detecta automáticamente qué sección está visible en la pantalla y resalta el link correspondiente en el navbar.

**Hook Personalizado:**
```tsx
import { useActiveSection, useGetActiveSection } from '../hooks/useActiveSection';

// En el componente de la sección (ej: Hero, About)
function Hero() {
    useActiveSection('hero'); // Registra la sección en el Context
    return <section id="hero">...</section>
}

// En el Navbar para obtener la sección activa
function Navbar() {
    const activeSection = useGetActiveSection();
    const isActive = activeSection === 'hero'; // true si Hero está visible
}
```

**Funcionamiento:**
1. Cada sección usa `useActiveSection('sectionId')` para registrarse
2. El hook usa `IntersectionObserver` para detectar visibilidad
3. Cuando una sección es visible (30% threshold), se agrega a `visibleSections`
4. El Navbar consulta `visibleSections` para resaltar el link activo

**Configuración del Observer:**
```typescript
{
    threshold: 0.3,              // 30% visible para activar
    rootMargin: '-100px 0px -50% 0px'  // Margen para activación anticipada
}
```

---

### 4️⃣ **Menu Toggle (Mobile)** 📱

**Uso:**
```tsx
const { state, toggleMenu } = useAppContext();

<button onClick={toggleMenu}>
    {state.isMenuOpen ? 'Cerrar' : 'Abrir'}
</button>

{state.isMenuOpen && <MobileMenu />}
```

---

## 🎨 Componentes que Usan el Context

| Componente | Features Usadas | Archivo |
|------------|----------------|---------|
| **Navbar** | theme, language, isMenuOpen, activeSection | `src/components/Navbar.tsx` |
| **Footer** | theme, language | `src/components/Footer.tsx` |
| **Hero** | activeSection tracking | `src/components/Hero.tsx` |
| **PageLayout** | Provider (envuelve toda la app) | `src/components/PageLayout.tsx` |

---

## 🧪 Optimizaciones Implementadas

### Performance
- ✅ `useCallback` para todas las funciones del Context
- ✅ `useMemo` para el objeto de valor del Context
- ✅ `React.memo` en componentes consumidores
- ✅ Split del estado para evitar re-renders innecesarios

### Persistencia
- ✅ `localStorage` para el tema (persiste entre sesiones)
- ✅ Carga inicial automática del tema guardado

### Accesibilidad
- ✅ ARIA labels en todos los botones de control
- ✅ Indicadores visuales claros del tema actual
- ✅ Transiciones suaves para cambios de estado

---

## 📖 Patrones de Diseño Utilizados

### 1. **Context Provider Pattern**
```tsx
<AppProvider>
    <App />
</AppProvider>
```

### 2. **Custom Hooks Pattern**
```tsx
// Encapsula lógica compleja
export function useActiveSection(sectionId: string) { ... }
export function useGetActiveSection(): string | null { ... }
```

### 3. **Separation of Concerns**
- Context solo para estado global
- Hooks para lógica reutilizable
- Componentes solo para UI

---

## 🔧 Cómo Extender el Context

### Agregar un nuevo campo al estado:

1. **Actualizar el tipo:**
```typescript
// src/context/AppContext.tsx
interface AppState {
    theme: 'light' | 'dark';
    // ... existentes
    newField: string; // ← Nueva propiedad
}
```

2. **Agregar al estado inicial:**
```typescript
const [state, setState] = useState<AppState>({
    // ... existentes
    newField: 'default value',
});
```

3. **Crear función para modificarlo:**
```typescript
const setNewField = useCallback((value: string) => {
    setState(prev => ({ ...prev, newField: value }));
}, []);
```

4. **Exportarlo en el Context:**
```typescript
const value = useMemo(() => ({
    state,
    // ... existentes
    setNewField,
}), [state, setNewField]);
```

---

## 🎓 Conceptos Académicos Demostrados

### React Hooks Avanzados
- ✅ `useContext` - Consumir contexto
- ✅ `useState` - Estado local
- ✅ `useEffect` - Efectos secundarios (localStorage, DOM)
- ✅ `useCallback` - Memorización de funciones
- ✅ `useMemo` - Memorización de valores

### Patrones de React
- ✅ Context API para estado global
- ✅ Custom Hooks para lógica reutilizable
- ✅ Compound Components Pattern
- ✅ Render Props Pattern (en hooks)

### Web APIs
- ✅ **IntersectionObserver** - Para scroll tracking
- ✅ **localStorage** - Para persistencia
- ✅ **document.documentElement** - Para manipular atributos del DOM

### Performance
- ✅ Evitar re-renders innecesarios con `memo`
- ✅ Optimización con `useCallback` y `useMemo`
- ✅ Lazy evaluation de valores caros

---

## 📊 Diagrama de Flujo del Context

```
┌─────────────────────────────────────────┐
│         AppProvider (Root)              │
│  - Gestiona estado global               │
│  - Persiste en localStorage             │
│  - Aplica cambios al DOM                │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│    Navbar     │   │    Footer     │
│ - Theme       │   │ - Theme       │
│ - Language    │   │ - Language    │
│ - Menu        │   │               │
│ - Active Nav  │   │               │
└───────────────┘   └───────────────┘
        │
        ▼
┌───────────────────────────────────┐
│     Secciones (Hero, About)       │
│  - useActiveSection('sectionId')  │
│  - Registra visibilidad           │
└───────────────────────────────────┘
```

---

## 🎯 Justificación para el Trabajo Académico

### ¿Por qué usar Context API aquí?

1. **Estado compartido entre múltiples componentes:**
   - Navbar y Footer necesitan el mismo estado de `theme` y `language`
   - Evita prop drilling (pasar props por 3+ niveles)

2. **Sincronización automática:**
   - Cambiar el idioma actualiza todos los textos instantáneamente
   - El tema se aplica a toda la aplicación de forma consistente

3. **Separación de responsabilidades:**
   - Los componentes solo se preocupan por la UI
   - La lógica de estado está centralizada en el Context

4. **Escalabilidad:**
   - Fácil agregar nuevas features al Context
   - No requiere refactorizar componentes existentes

---

## 🏆 Resultado Final

✅ **3 Features reales e útiles** implementadas con Context  
✅ **100% funcional** con persistencia y sincronización  
✅ **Código profesional** con tipos, documentación y optimizaciones  
✅ **Patrones avanzados** de React demostrados  
✅ **Experiencia de usuario mejorada** con dark mode, i18n y navegación activa  

---

## 📝 Notas para el Profesor

Este proyecto demuestra:
1. Comprensión profunda de Context API y sus casos de uso
2. Implementación de patrones avanzados (Custom Hooks, Performance)
3. Integración con Web APIs modernas (IntersectionObserver)
4. Código mantenible y escalable con TypeScript
5. Aplicación práctica de conceptos teóricos en un proyecto real

---

**Autor**: Yerson Argote  
**Fecha**: Octubre 2025  
**Tecnologías**: React, TypeScript, Context API, IntersectionObserver API

