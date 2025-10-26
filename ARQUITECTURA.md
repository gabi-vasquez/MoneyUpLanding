# 🏗️ Arquitectura del Proyecto MoneyUp Landing

## 📐 Estructura General

```
MoneyUpLanding/
├── src/
│   ├── components/          # Componentes React
│   │   ├── App.tsx         # Componente raíz con Provider
│   │   ├── Navbar.tsx      # Navegación principal
│   │   ├── Hero.tsx        # Sección hero
│   │   ├── CallToAction.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollProgress.tsx
│   │
│   ├── context/            # Context API
│   │   └── AppContext.tsx  # Estado global
│   │
│   ├── hooks/              # Custom Hooks
│   │   ├── index.ts        # Exportaciones centralizadas
│   │   ├── useScroll.ts    # Hook de scroll
│   │   ├── useIntersection.ts # Hook de viewport
│   │   ├── useToggle.ts    # Hook de toggle
│   │   └── useDebounce.ts  # Hook de debounce
│   │
│   ├── layouts/            # Layouts de Astro
│   │   └── Layout.astro    # Layout principal
│   │
│   ├── pages/              # Páginas de Astro
│   │   └── index.astro     # Página principal
│   │
│   └── styles/             # Estilos globales
│       └── global.css      # CSS global + Tailwind
│
├── public/                 # Assets estáticos
├── astro.config.mjs        # Configuración Astro
├── tsconfig.json           # Configuración TypeScript
└── package.json            # Dependencias
```

---

## 🔄 Flujo de Datos

### 1. Entrada de la Aplicación
```
index.astro (Astro Page)
    ↓
  Pasa props con assets
    ↓
App.tsx (React Component)
    ↓
AppProvider (Context)
    ↓
Componentes hijos
```

### 2. Estado Global (Context)
```
AppContext.tsx
    ├─ state (objeto de estado)
    │   ├─ theme: 'light' | 'dark'
    │   ├─ language: 'es' | 'en'
    │   ├─ isMenuOpen: boolean
    │   └─ visibleSections: Set<string>
    │
    └─ actions (funciones memorizadas)
        ├─ toggleTheme()
        ├─ toggleMenu()
        ├─ setLanguage()
        ├─ addVisibleSection()
        └─ removeVisibleSection()
```

### 3. Flujo de Componentes
```
App (Provider Root)
 │
 ├─ ScrollProgress
 │   └─ usa: useScroll, useState, useEffect, useMemo
 │
 ├─ Navbar
 │   └─ usa: useAppContext, useScroll, useCallback, useMemo
 │
 ├─ Hero
 │   └─ usa: useIntersection, useMemo
 │
 ├─ CallToAction
 │   └─ usa: useState, useCallback, useMemo, useIntersection
 │
 ├─ Testimonials
 │   ├─ usa: useState, useEffect, useMemo, useCallback, useIntersection
 │   └─ TestimonialCard (memo)
 │
 └─ Footer
     └─ usa: useMemo, useCallback
```

---

## 🎯 Patrones de Diseño Implementados

### 1. **Container/Presentational Pattern**

**Container Components** (Smart):
- `App.tsx` - Maneja lógica y providers
- `Testimonials.tsx` - Maneja estado y lógica de animación

**Presentational Components** (Dumb):
- `TestimonialCard.tsx` - Solo recibe props y renderiza UI
- `Footer.tsx` - Componente visual puro

### 2. **Custom Hooks Pattern**

Extrae lógica reutilizable a hooks personalizados:

```tsx
// Antes (lógica en componente)
function Component() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  
  // ... resto del componente
}

// Después (con custom hook)
function Component() {
  const scroll = useScroll();
  // ... resto del componente
}
```

### 3. **Provider Pattern**

Envuelve la aplicación en un Provider para compartir estado:

```tsx
<AppProvider>
  <App />
</AppProvider>
```

### 4. **Composition Pattern**

Compone componentes pequeños para crear interfaces complejas:

```tsx
<Testimonials>
  {testimonials.map(t => 
    <TestimonialCard key={t.id} {...t} />
  )}
</Testimonials>
```

---

## ⚡ Estrategias de Optimización

### 1. **Memoization**

#### React.memo
```tsx
const Navbar = memo(({ logoUrl }) => {
  // Solo re-renderiza si logoUrl cambia
});
```

#### useMemo
```tsx
// Evita recrear el array en cada render
const navItems = useMemo(() => [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-nosotros', label: 'Sobre Nosotros' },
], []);
```

#### useCallback
```tsx
// Mantiene la misma referencia de función
const handleClick = useCallback((id: string) => {
  console.log(id);
}, []);
```

### 2. **Lazy Loading**

- Animaciones se activan solo cuando son visibles (useIntersection)
- Assets se cargan bajo demanda
- Componentes pesados con `client:load` en Astro

### 3. **Code Splitting**

Astro automáticamente hace code splitting:
- Cada página es un chunk separado
- Componentes React se cargan solo cuando se necesitan

### 4. **Event Listener Optimization**

```tsx
// Passive listeners para mejor scroll performance
window.addEventListener('scroll', handler, { passive: true });

// Cleanup apropiado
return () => window.removeEventListener('scroll', handler);
```

---

## 🔐 TypeScript

### Type Safety en Props

```tsx
interface NavbarProps {
  logoUrl: string;
}

const Navbar = memo(({ logoUrl }: NavbarProps) => {
  // TypeScript asegura que logoUrl es string
});
```

### Generic Hooks

```tsx
export function useIntersection<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T>(null);
  // T puede ser cualquier elemento HTML
}
```

### Typed Context

```tsx
interface AppContextType {
  state: AppState;
  toggleTheme: () => void;
  // ...
}
```

---

## 🎨 Integración Astro + React

### ¿Por qué Astro?

1. **Zero JS by default**: Solo envía JS cuando es necesario
2. **Partial Hydration**: Solo hidrata componentes interactivos
3. **Build Time**: Genera HTML estático en build time
4. **Framework Agnostic**: Soporta React, Vue, Svelte, etc.

### Client Directives

```astro
<!-- Solo carga en el cliente cuando es visible -->
<App client:load assets={assets} />

<!-- Otras opciones:
  client:idle - Cuando el navegador esté idle
  client:visible - Cuando el componente sea visible
  client:media - Basado en media query
-->
```

### Ventajas para esta Landing

- **SEO**: HTML pre-renderizado
- **Performance**: Solo JS necesario se envía
- **Developer Experience**: Usa React para interactividad
- **Best of Both Worlds**: Estático + Dinámico

---

## 📊 Performance Metrics

### Bundle Size Optimizado

```
dist/_astro/client.js    ~187 KB (gzipped: ~59 KB)
dist/_astro/App.js       ~14 KB  (gzipped: ~4.5 KB)
dist/_astro/index.js     ~8 KB   (gzipped: ~3 KB)
```

### Lighthouse Score Objetivo

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## 🔄 Ciclo de Vida del Componente

```
1. Mount (Primera vez)
   └─ useState inicializa
   └─ useEffect ejecuta
   └─ Render inicial

2. Update (Cambio de state/props)
   └─ useMemo recalcula si deps cambian
   └─ useCallback mantiene referencia si deps no cambian
   └─ React.memo compara props
   └─ Re-render solo si necesario

3. Unmount
   └─ useEffect cleanup ejecuta
   └─ Event listeners removidos
```

---

## 🧪 Testing Strategy (Recomendado)

```
Unit Tests
├─ Custom Hooks (useScroll, useIntersection)
├─ Pure Components (TestimonialCard, Footer)
└─ Utility Functions

Integration Tests
├─ Context Provider
├─ Component Interaction
└─ Form Submissions

E2E Tests
├─ Navigation Flow
├─ Scroll Animations
└─ Responsive Behavior
```

---

## 🚀 Deployment

### Build Process

```bash
pnpm build
├─ Genera HTML estático
├─ Optimiza assets
├─ Minimiza JS/CSS
└─ Genera sitemap
```

### Recommended Hosts

- **Vercel** (Recomendado para Astro)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**

---

## 📈 Escalabilidad

### Para Agregar Nuevas Secciones

1. Crear componente React en `/src/components/`
2. Importar en `App.tsx`
3. Agregar al JSX
4. Usar hooks existentes si es necesario

### Para Agregar Nuevas Páginas

1. Crear `.astro` file en `/src/pages/`
2. Importar componentes necesarios
3. Pasar props requeridas

### Para Agregar Nuevo Estado Global

1. Actualizar `AppContext.tsx`
2. Agregar al interface `AppState`
3. Crear función de actualización
4. Memorizar con useCallback
5. Incluir en el value del Provider

---

## 🎓 Conceptos Avanzados Aplicados

1. ✅ **Hooks Composition**: Combinar múltiples hooks
2. ✅ **Render Props Alternative**: Custom hooks
3. ✅ **Compound Components**: Testimonials + Card
4. ✅ **Controlled Components**: Estado controlado
5. ✅ **Error Boundaries**: Manejo de errores (Context)
6. ✅ **Performance Optimization**: Memoization
7. ✅ **Type Safety**: TypeScript en todo
8. ✅ **Accessibility**: Semantic HTML, ARIA labels

---

**Arquitectura diseñada para**: Escalabilidad, Mantenibilidad, Performance y Developer Experience 🚀

