# 📚 Conceptos de React Implementados

Este documento explica detalladamente todos los conceptos de React implementados en el proyecto MoneyUp Landing.

---

## 1. 🎣 Hooks Básicos

### useState
**Archivo**: `src/components/CallToAction.tsx`, `src/components/Testimonials.tsx`

```tsx
const [hoveredButton, setHoveredButton] = useState<string | null>(null);
const [visibleCards, setVisibleCards] = useState<number>(0);
```

**Uso**: Maneja el estado local de los componentes. En `CallToAction` rastrea qué botón está siendo hover. En `Testimonials` controla cuántas cards son visibles.

**Ventaja**: Permite que los componentes funcionales tengan estado sin convertirse en clases.

---

### useEffect
**Archivo**: `src/components/Testimonials.tsx`, `src/hooks/useScroll.ts`, `src/hooks/useIntersection.ts`

```tsx
useEffect(() => {
  if (isIntersecting && visibleCards < 6) {
    const timer = setTimeout(() => {
      setVisibleCards((prev) => prev + 1);
    }, 150);
    return () => clearTimeout(timer);
  }
}, [isIntersecting, visibleCards]);
```

**Uso**: Ejecuta efectos secundarios como animaciones escalonadas, suscripciones a eventos, o limpieza.

**Ventaja**: Sincroniza el componente con sistemas externos (scroll, timers, APIs).

---

### useCallback
**Archivo**: `src/context/AppContext.tsx`, `src/components/Navbar.tsx`, `src/components/CallToAction.tsx`

```tsx
const handleMouseEnter = useCallback((buttonId: string) => {
  setHoveredButton(buttonId);
}, []);

const toggleMenu = useCallback(() => {
  setState((prev) => ({
    ...prev,
    isMenuOpen: !prev.isMenuOpen,
  }));
}, []);
```

**Uso**: Memoriza funciones para evitar recrearlas en cada render. Especialmente útil cuando pasas callbacks a componentes hijos memorizados.

**Ventaja**: Previene re-renders innecesarios en componentes que reciben estas funciones como props.

---

### useMemo
**Archivo**: `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/Testimonials.tsx`

```tsx
const isScrolled = useMemo(() => scroll.y > 50, [scroll.y]);

const content = useMemo(
  () => ({
    title: 'MoneyUP',
    description: 'aplicacion para controlar\ntus ingresos y egresos.',
    subtitle: 'Ideal para',
    feature: 'definir metas de ahorro.',
  }),
  []
);
```

**Uso**: Memoriza valores computados costosos. Solo recalcula cuando sus dependencias cambian.

**Ventaja**: Optimiza el rendimiento evitando cálculos repetidos innecesarios.

---

## 2. 🎨 React.memo

**Archivo**: `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/TestimonialCard.tsx`, etc.

```tsx
const Navbar = memo(({ logoUrl }: NavbarProps) => {
  // Component logic
});
```

**Uso**: Componente de orden superior que memoriza el componente. Solo re-renderiza si las props cambian.

**Ventaja**: Optimización de rendimiento crucial para componentes que reciben las mismas props frecuentemente.

**Ejemplo práctico**: `TestimonialCard` se renderiza 6 veces. Con `memo`, solo se actualiza la card cuyas props cambien.

---

## 3. 🔧 Custom Hooks

### useScroll
**Archivo**: `src/hooks/useScroll.ts`

```tsx
export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: 'up' | 'down' | null,
  });
  
  // Logic to track scroll
  
  return scrollPosition;
}
```

**Uso**: Abstrae la lógica de monitoreo de scroll. Usado en `Navbar` para cambiar el estilo al hacer scroll.

**Ventaja**: Reutilizable en cualquier componente que necesite datos de scroll.

---

### useIntersection
**Archivo**: `src/hooks/useIntersection.ts`

```tsx
export function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  
  useEffect(() => {
    // Intersection Observer logic
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);
  
  return { ref: elementRef, isIntersecting, hasIntersected };
}
```

**Uso**: Detecta cuando un elemento entra en el viewport. Usado en `Hero`, `CallToAction`, y `Testimonials` para animaciones de entrada.

**Ventaja**: Animaciones activadas solo cuando el usuario ve el contenido, mejorando la UX.

**Ejemplo**:
```tsx
const { ref, isIntersecting } = useIntersection({ threshold: 0.2 });

<div 
  ref={ref} 
  className={isIntersecting ? 'visible' : 'hidden'}
>
  Content
</div>
```

---

### useToggle
**Archivo**: `src/hooks/useToggle.ts`

```tsx
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}
```

**Uso**: Simplifica el manejo de estados booleanos (modales, menús, etc.).

**Ventaja**: Código más limpio y legible para estados on/off.

---

### useDebounce
**Archivo**: `src/hooks/useDebounce.ts`

```tsx
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

**Uso**: Retrasa la actualización de un valor. Útil para búsquedas en tiempo real o validaciones.

**Ventaja**: Reduce llamadas a APIs o cálculos costosos.

---

## 4. 🌐 Context API

### AppContext
**Archivo**: `src/context/AppContext.tsx`

```tsx
interface AppContextType {
  state: AppState;
  toggleTheme: () => void;
  toggleMenu: () => void;
  setLanguage: (lang: 'es' | 'en') => void;
  addVisibleSection: (section: string) => void;
  removeVisibleSection: (section: string) => void;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    theme: 'light',
    language: 'es',
    isMenuOpen: false,
    visibleSections: new Set(),
  });
  
  // Funciones memorizadas con useCallback
  
  const value = useMemo(
    () => ({ state, toggleTheme, toggleMenu, ... }),
    [state, toggleTheme, toggleMenu, ...]
  );
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

**Uso**: Estado global compartido entre componentes sin prop drilling.

**Ventajas**:
1. **Sin prop drilling**: No necesitas pasar props por múltiples niveles
2. **Centralizado**: Todo el estado global en un lugar
3. **Optimizado**: Usa `useMemo` para evitar re-renders innecesarios

**Ejemplo de consumo**:
```tsx
const { state, toggleMenu } = useAppContext();

<button onClick={toggleMenu}>
  {state.isMenuOpen ? 'Cerrar' : 'Abrir'}
</button>
```

---

## 5. 🎯 Props y TypeScript

### Props Tipadas
**Ejemplo**: `src/components/Navbar.tsx`

```tsx
interface NavbarProps {
  logoUrl: string;
}

const Navbar = memo(({ logoUrl }: NavbarProps) => {
  // Component logic
});
```

**Ventaja**: Type safety y autocompletado en el IDE.

### Props con Children
**Ejemplo**: `src/context/AppContext.tsx`

```tsx
export function AppProvider({ children }: { children: ReactNode }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

---

## 6. ⚡ Optimizaciones Aplicadas

### 1. Componentes Memorizados
- Todos los componentes principales usan `React.memo`
- Evita re-renders cuando las props no cambian

### 2. Callbacks Memorizados
- Todas las funciones pasadas como props usan `useCallback`
- Mantiene referencias estables entre renders

### 3. Valores Computados
- Arrays y objetos estáticos usan `useMemo`
- Cálculos costosos solo se ejecutan cuando es necesario

### 4. Lazy Loading
- Imágenes se cargan bajo demanda
- Animaciones se activan solo al ser visibles

### 5. Event Listeners Optimizados
- `{ passive: true }` en scroll listeners
- Limpieza apropiada en useEffect

---

## 7. 🎨 Patrones de Diseño

### Container/Presentational Pattern
- **Container**: `App.tsx` - Maneja lógica y estado
- **Presentational**: Componentes individuales - Solo UI

### Compound Components
- `Testimonials` + `TestimonialCard`
- Componentes que trabajan juntos

### Custom Hooks Pattern
- Lógica reutilizable extraída a hooks
- Separación de concerns

---

## 8. 📊 Flujo de Datos

```
AppProvider (Context Global)
    ↓
  App.tsx (Componente Principal)
    ↓
  ├─ Navbar (usa useScroll, useAppContext)
  ├─ Hero (usa useIntersection)
  ├─ CallToAction (usa useState, useCallback, useIntersection)
  ├─ Testimonials (usa useState, useEffect, useMemo)
  │   └─ TestimonialCard (React.memo)
  └─ Footer (usa useMemo, useCallback)
```

---

## 9. 🔍 Debugging Tips

### React DevTools
- Inspecciona el árbol de componentes
- Ve qué componentes se re-renderizan
- Examina el contexto

### Performance Profiler
- Identifica componentes lentos
- Mide tiempo de render
- Detecta re-renders innecesarios

---

## 10. 📖 Mejores Prácticas Implementadas

✅ **Siempre usa TypeScript** para type safety
✅ **Memoriza callbacks** cuando se pasan a componentes hijos
✅ **Usa React.memo** en componentes puros
✅ **Extrae lógica compleja** a custom hooks
✅ **Limpia effects** en el return de useEffect
✅ **Evita inline functions** en props de componentes memorizados
✅ **Usa Context** para estado global, no para todo
✅ **Nombres descriptivos** para hooks y componentes
✅ **Un componente, una responsabilidad**
✅ **Prefiere composición** sobre herencia

---

## 🎓 Recursos de Aprendizaje

- [React Docs (Beta)](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Patterns.dev](https://www.patterns.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Creado con ❤️ para demostrar conceptos avanzados de React**

