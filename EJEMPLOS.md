# 💡 Ejemplos Prácticos - MoneyUp Landing

Guía práctica de cómo usar y extender los conceptos implementados.

---

## 1. 🎣 Usando Custom Hooks

### Ejemplo 1: useScroll para cambiar estilos

```tsx
import { useScroll } from '../hooks/useScroll';

function MyComponent() {
  const scroll = useScroll();
  
  // Cambia el estilo basado en la posición del scroll
  const headerStyle = scroll.y > 100 ? 'bg-black' : 'bg-transparent';
  
  // Detecta la dirección del scroll
  const isScrollingDown = scroll.direction === 'down';
  
  return (
    <header className={`fixed top-0 ${headerStyle} ${isScrollingDown ? 'translate-y-[-100%]' : 'translate-y-0'}`}>
      Scroll Y: {scroll.y}px
    </header>
  );
}
```

### Ejemplo 2: useIntersection para animaciones

```tsx
import { useIntersection } from '../hooks/useIntersection';

function AnimatedSection() {
  const { ref, isIntersecting, hasIntersected } = useIntersection({
    threshold: 0.5,      // 50% del elemento debe ser visible
    rootMargin: '0px',   // Sin margen extra
    triggerOnce: true,   // Solo anima una vez
  });
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        hasIntersected 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-20'
      }`}
    >
      <h2>¡Aparezco cuando me ves!</h2>
    </div>
  );
}
```

### Ejemplo 3: useToggle para modales

```tsx
import { useToggle } from '../hooks/useToggle';

function ModalExample() {
  const [isOpen, toggle, setIsOpen] = useToggle(false);
  
  return (
    <>
      <button onClick={toggle}>
        {isOpen ? 'Cerrar Modal' : 'Abrir Modal'}
      </button>
      
      {isOpen && (
        <div className="modal">
          <h2>¡Soy un Modal!</h2>
          <button onClick={() => setIsOpen(false)}>Cerrar</button>
        </div>
      )}
    </>
  );
}
```

### Ejemplo 4: useDebounce para búsquedas

```tsx
import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  // Este efecto solo se ejecuta 500ms después del último cambio
  useEffect(() => {
    if (debouncedSearch) {
      console.log('Buscando:', debouncedSearch);
      // Hacer llamada a API aquí
    }
  }, [debouncedSearch]);
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

---

## 2. 🌐 Usando Context API

### Ejemplo 1: Consumir el contexto

```tsx
import { useAppContext } from '../context/AppContext';

function ThemeToggle() {
  const { state, toggleTheme } = useAppContext();
  
  return (
    <button onClick={toggleTheme}>
      Tema actual: {state.theme}
      <span>{state.theme === 'light' ? '🌞' : '🌙'}</span>
    </button>
  );
}
```

### Ejemplo 2: Usar múltiples valores del contexto

```tsx
function NavigationMenu() {
  const { state, toggleMenu, setLanguage } = useAppContext();
  
  return (
    <nav>
      <button onClick={toggleMenu}>
        {state.isMenuOpen ? 'Cerrar' : 'Abrir'} Menú
      </button>
      
      <select 
        value={state.language} 
        onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </nav>
  );
}
```

### Ejemplo 3: Extender el contexto

```tsx
// En AppContext.tsx, agregar:

interface AppState {
  // ... estados existentes
  user: User | null;  // Nuevo estado
}

// Agregar función de login
const login = useCallback((user: User) => {
  setState((prev) => ({
    ...prev,
    user,
  }));
}, []);

// Incluir en el value
const value = useMemo(
  () => ({
    state,
    toggleTheme,
    toggleMenu,
    login,  // Nueva función
    // ...
  }),
  [state, toggleTheme, toggleMenu, login]
);
```

---

## 3. ⚡ Optimización con memo, useMemo, useCallback

### Ejemplo 1: Cuándo usar React.memo

```tsx
// ❌ MAL: Sin memo, se re-renderiza cada vez que el padre cambia
function ExpensiveComponent({ data }) {
  const result = heavyCalculation(data);
  return <div>{result}</div>;
}

// ✅ BIEN: Con memo, solo se re-renderiza si 'data' cambia
const ExpensiveComponent = memo(({ data }) => {
  const result = heavyCalculation(data);
  return <div>{result}</div>;
});
```

### Ejemplo 2: useMemo para cálculos costosos

```tsx
function ProductList({ products, filters }) {
  // ❌ MAL: Se filtra en cada render
  const filtered = products.filter(p => p.price > filters.minPrice);
  
  // ✅ BIEN: Solo recalcula si products o filters cambian
  const filtered = useMemo(
    () => products.filter(p => p.price > filters.minPrice),
    [products, filters.minPrice]
  );
  
  return (
    <ul>
      {filtered.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

### Ejemplo 3: useCallback para funciones en props

```tsx
function Parent() {
  // ❌ MAL: Se crea una nueva función en cada render
  const handleClick = (id: string) => {
    console.log(id);
  };
  
  // ✅ BIEN: Misma referencia entre renders
  const handleClick = useCallback((id: string) => {
    console.log(id);
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
}

const ChildComponent = memo(({ onClick }) => {
  // Solo se re-renderiza si onClick cambia
  return <button onClick={() => onClick('123')}>Click</button>;
});
```

### Ejemplo 4: Combinando optimizaciones

```tsx
const OptimizedList = memo(({ items }: { items: Item[] }) => {
  // useMemo para el cálculo
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );
  
  // useCallback para el handler
  const handleItemClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);
  
  return (
    <ul>
      {sortedItems.map(item => (
        <ItemCard 
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </ul>
  );
});
```

---

## 4. 🎨 Crear Componente Completo

### Ejemplo: Componente de Card con todas las optimizaciones

```tsx
import { memo, useState, useCallback, useMemo } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { useAppContext } from '../context/AppContext';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onLike?: (id: string) => void;
  id: string;
}

/**
 * Card optimizado con:
 * - React.memo para evitar re-renders
 * - useState para estado local
 * - useCallback para funciones
 * - useMemo para valores computados
 * - useIntersection para animaciones
 * - Context para tema
 */
const Card = memo(({ title, description, imageUrl, onLike, id }: CardProps) => {
  // Estado local
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  
  // Context
  const { state } = useAppContext();
  
  // Custom hook
  const { ref, isIntersecting } = useIntersection({ threshold: 0.3 });
  
  // useCallback para funciones
  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(id);
  }, [isLiked, onLike, id]);
  
  // useMemo para valores computados
  const cardTheme = useMemo(
    () => state.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black',
    [state.theme]
  );
  
  const animationClass = useMemo(
    () => isIntersecting 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-10',
    [isIntersecting]
  );
  
  return (
    <div
      ref={ref}
      className={`
        ${cardTheme}
        ${animationClass}
        rounded-lg shadow-lg p-6
        transition-all duration-500
        hover:scale-105
      `}
    >
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`
            px-4 py-2 rounded-lg transition-colors
            ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-200'}
          `}
        >
          {isLiked ? '❤️' : '🤍'} {likes}
        </button>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
```

---

## 5. 🔄 Crear Custom Hook Completo

### Ejemplo: useLocalStorage

```tsx
import { useState, useCallback, useEffect } from 'react';

/**
 * Hook para sincronizar estado con localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  
  // State para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // useCallback para función de actualización
  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key]);
  
  // useCallback para limpiar
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, initialValue]);
  
  return [storedValue, setValue, removeValue];
}

// Uso:
function MyComponent() {
  const [name, setName, removeName] = useLocalStorage('userName', '');
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={removeName}>Limpiar</button>
    </div>
  );
}
```

---

## 6. 🎯 Patterns Avanzados

### Pattern 1: Compound Components

```tsx
// Componente contenedor
function Tabs({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
}

// Sub-componentes que usan el contexto
Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = function Tab({ index, children }: { index: number; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabsContext();
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      className={activeTab === index ? 'active' : ''}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabPanel({ index, children }: { index: number; children: ReactNode }) {
  const { activeTab } = useTabsContext();
  
  if (activeTab !== index) return null;
  return <div className="tab-panel">{children}</div>;
};

// Uso:
function App() {
  return (
    <Tabs>
      <Tabs.List>
        <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
        <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panel index={0}>Contenido 1</Tabs.Panel>
      <Tabs.Panel index={1}>Contenido 2</Tabs.Panel>
    </Tabs>
  );
}
```

### Pattern 2: Render Props Alternative (Custom Hooks)

```tsx
// ❌ Viejo estilo: Render Props
<DataFetcher
  url="/api/data"
  render={({ data, loading, error }) => (
    <div>
      {loading && <Spinner />}
      {error && <Error />}
      {data && <Display data={data} />}
    </div>
  )}
/>

// ✅ Nuevo estilo: Custom Hook
function useDataFetcher(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Uso:
function MyComponent() {
  const { data, loading, error } = useDataFetcher('/api/data');
  
  if (loading) return <Spinner />;
  if (error) return <Error />;
  return <Display data={data} />;
}
```

---

## 7. 📱 Responsive con Hooks

```tsx
import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  
  return matches;
}

// Uso:
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
```

---

## 🎓 Conclusión

Estos ejemplos demuestran:

✅ **Hooks fundamentales**: useState, useEffect, useCallback, useMemo
✅ **Custom Hooks**: Lógica reutilizable
✅ **Context API**: Estado global
✅ **Optimizaciones**: memo, memoization
✅ **Patterns avanzados**: Compound Components, Render Props
✅ **TypeScript**: Type safety
✅ **Best Practices**: Clean code, DRY, SOLID

---

**¡Copia, modifica y experimenta con estos ejemplos!** 🚀

