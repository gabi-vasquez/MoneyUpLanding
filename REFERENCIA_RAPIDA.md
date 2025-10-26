# 🚀 Referencia Rápida - MoneyUp Landing

Guía de consulta rápida para todos los conceptos implementados.

---

## 📦 Comandos

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev              # http://localhost:4321

# Producción
pnpm build           # Construir para producción
pnpm preview         # Vista previa de producción

# Utilidades
pnpm astro --help    # Ver comandos de Astro
```

---

## 🎣 Hooks Cheatsheet

### useState
```tsx
const [state, setState] = useState(initialValue);
setState(newValue);                    // Set directo
setState(prev => prev + 1);            // Set con función
```

### useEffect
```tsx
// Ejecuta en cada render
useEffect(() => { /* ... */ });

// Ejecuta solo al montar
useEffect(() => { /* ... */ }, []);

// Ejecuta cuando deps cambian
useEffect(() => { /* ... */ }, [dep1, dep2]);

// Con cleanup
useEffect(() => {
  // Setup
  return () => { /* Cleanup */ };
}, []);
```

### useCallback
```tsx
const memoizedFn = useCallback(
  (param) => { /* ... */ },
  [dependencies]
);
```

### useMemo
```tsx
const memoizedValue = useMemo(
  () => expensiveComputation(),
  [dependencies]
);
```

### memo (HOC)
```tsx
const MemoizedComponent = memo(Component);

// Con comparador personalizado
const MemoizedComponent = memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```

---

## 🔧 Custom Hooks Disponibles

| Hook | Ubicación | Uso |
|------|-----------|-----|
| `useScroll` | `/hooks/useScroll.ts` | Monitorea posición y dirección del scroll |
| `useIntersection` | `/hooks/useIntersection.ts` | Detecta cuando elemento entra en viewport |
| `useToggle` | `/hooks/useToggle.ts` | Maneja estados booleanos |
| `useDebounce` | `/hooks/useDebounce.ts` | Retrasa actualización de valores |

### Uso Rápido

```tsx
// useScroll
const { x, y, direction } = useScroll();

// useIntersection
const { ref, isIntersecting, hasIntersected } = useIntersection({
  threshold: 0.5,
  rootMargin: '0px',
  triggerOnce: true,
});

// useToggle
const [isOpen, toggle, setIsOpen] = useToggle(false);

// useDebounce
const debouncedValue = useDebounce(searchTerm, 500);
```

---

## 🌐 Context API

### Consumir el contexto
```tsx
import { useAppContext } from '../context/AppContext';

function Component() {
  const { state, toggleTheme, toggleMenu } = useAppContext();
  
  return (
    <div>
      Theme: {state.theme}
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

### Estado disponible
```tsx
interface AppState {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  isMenuOpen: boolean;
  visibleSections: Set<string>;
}
```

### Acciones disponibles
```tsx
- toggleTheme()
- toggleMenu()
- setLanguage(lang: 'es' | 'en')
- addVisibleSection(section: string)
- removeVisibleSection(section: string)
```

---

## 🎨 Componentes Disponibles

| Componente | Props | Descripción |
|------------|-------|-------------|
| `App` | `assets` | Componente raíz con Provider |
| `Navbar` | `logoUrl` | Barra de navegación |
| `Hero` | `mascotImage, lineImage` | Sección hero |
| `CallToAction` | `phoneImage` | CTA con botones |
| `Testimonials` | - | Grid de testimonios |
| `TestimonialCard` | `name, comment, delay` | Card individual |
| `Footer` | `vectorBg, socialIcons` | Footer con redes |
| `ScrollProgress` | - | Barra de progreso |

---

## 🎯 Tailwind Classes Personalizadas

### Colores
```css
bg-lime-custom      /* #A3E635 */
bg-lime-green       /* #7AAC28 */
bg-lime-light       /* #BEF264 */
bg-lime-lightest    /* #F7FEE7 */
bg-gray-dark        /* #1F2937 */
```

### Sombras
```css
shadow-card         /* 0px 4px 7.1px 6px #bef264 */
```

### Fuentes
```css
font-archivo        /* Archivo Black */
font-inter          /* Inter */
```

---

## ⚡ Optimizaciones

### ✅ Usar cuando...

**React.memo**
- Componente renderiza frecuentemente
- Props cambian raramente
- Componente es "pesado"

**useCallback**
- Función se pasa a componente hijo memoizado
- Función se usa en dependencias de useEffect/useMemo
- Función crea closures complejos

**useMemo**
- Cálculo costoso
- Array/objeto se pasa a componente hijo memoizado
- Valor se usa en dependencias

### ❌ No usar cuando...

- Optimización prematura
- Props cambian frecuentemente
- Componente es simple/pequeño
- No hay problema de performance

---

## 📝 TypeScript Tips

### Props Interface
```tsx
interface ComponentProps {
  title: string;
  count?: number;              // Opcional
  onClick: (id: string) => void;
  children?: ReactNode;
}
```

### Generic Hooks
```tsx
function useHook<T>(initial: T): T {
  // ...
}
```

### Event Types
```tsx
onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
```

---

## 🔍 Debugging

### React DevTools
```bash
# Instalar extensión de navegador
- Chrome: React Developer Tools
- Firefox: React Developer Tools

# Inspeccionar:
- Árbol de componentes
- Props y State
- Context
- Hooks
```

### Console Tips
```tsx
// Ver renders
useEffect(() => {
  console.log('Component rendered');
});

// Ver cambios de estado
useEffect(() => {
  console.log('State changed:', state);
}, [state]);

// Timing
console.time('render');
// ... código
console.timeEnd('render');
```

---

## 🎨 Astro + React

### Client Directives
```astro
<Component client:load />      <!-- Carga inmediatamente -->
<Component client:idle />      <!-- Carga cuando idle -->
<Component client:visible />   <!-- Carga cuando visible -->
<Component client:media="(min-width: 768px)" />
```

### Pasar Props
```astro
---
const data = { name: 'Test' };
---
<Component client:load data={data} />
```

---

## 📊 Performance Checklist

- [ ] Componentes memorizados con `memo`
- [ ] Callbacks memorizados con `useCallback`
- [ ] Valores computados con `useMemo`
- [ ] Lazy loading de imágenes
- [ ] Code splitting
- [ ] Passive event listeners
- [ ] Cleanup en useEffect
- [ ] Evitar inline functions en props
- [ ] Usar keys únicas en listas

---

## 🐛 Errores Comunes

### 1. "Cannot read property of undefined"
```tsx
// ❌ MAL
const { data } = useContext(MyContext);
data.map(...)  // Error si data es undefined

// ✅ BIEN
const { data } = useContext(MyContext);
data?.map(...) // Optional chaining
```

### 2. "Too many re-renders"
```tsx
// ❌ MAL
<button onClick={handleClick()}>Click</button>

// ✅ BIEN
<button onClick={handleClick}>Click</button>
<button onClick={() => handleClick(id)}>Click</button>
```

### 3. "useEffect infinite loop"
```tsx
// ❌ MAL
useEffect(() => {
  setState(value);  // value es objeto/array
}, [value]);

// ✅ BIEN
useEffect(() => {
  setState(value);
}, [value.id]);  // Dependencia específica
```

### 4. "Cannot update component while rendering"
```tsx
// ❌ MAL
function Component() {
  setState(value);  // No en el body
}

// ✅ BIEN
useEffect(() => {
  setState(value);
}, []);
```

---

## 📚 Recursos

### Documentación
- [React Docs](https://react.dev)
- [Astro Docs](https://docs.astro.build)
- [Tailwind Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Herramientas
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Playground](https://play.tailwindcss.com/)

### Artículos Clave
- [Hooks Rules](https://react.dev/reference/rules)
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
- [React Patterns](https://www.patterns.dev/react)

---

## 🎯 Próximos Pasos

1. **Testing**: Agregar tests con Vitest
2. **Forms**: Implementar React Hook Form
3. **Animations**: Usar Framer Motion
4. **State Management**: Si crece, considerar Zustand
5. **API Integration**: Fetch data con React Query
6. **Internationalization**: i18next
7. **PWA**: Agregar service worker

---

## 💡 Tips Pro

1. Usa `React.StrictMode` en desarrollo
2. Configura ESLint + Prettier
3. Activa TypeScript strict mode
4. Profile con React DevTools
5. Usa Lighthouse para auditar
6. Implementa Error Boundaries
7. Documenta props con JSDoc
8. Escribe tests para hooks
9. Usa Git hooks con Husky
10. CI/CD con GitHub Actions

---

**¡Guarda este archivo para consulta rápida!** 📖

