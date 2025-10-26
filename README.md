# MoneyUp Landing Page 🚀

Landing page moderna para MoneyUp, una aplicación de gestión financiera. Construida con **Astro**, **React** y **Tailwind CSS**.

## 🎯 Tecnologías Utilizadas

- **Astro 5.15** - Framework web moderno
- **React 19** - Biblioteca de UI con componentes interactivos
- **Tailwind CSS 4** - Framework de CSS utility-first
- **TypeScript** - Tipado estático

## 📚 Conceptos de React Implementados

### 1. **Hooks Fundamentales**
- ✅ `useState` - Manejo de estado local en componentes
- ✅ `useEffect` - Efectos secundarios y ciclo de vida
- ✅ `useCallback` - Memorización de funciones
- ✅ `useMemo` - Memorización de valores computados
- ✅ `memo` - Optimización de componentes

### 2. **Custom Hooks**
Ubicados en `/src/hooks/`:
- 📍 `useScroll` - Monitorea posición y dirección del scroll
- 📍 `useIntersection` - Detecta cuando elementos entran en viewport
- 📍 `useToggle` - Maneja estados booleanos
- 📍 `useDebounce` - Retrasa actualización de valores

### 3. **Context API**
- 🌐 `AppContext` - Estado global de la aplicación
- 🌐 `AppProvider` - Proveedor del contexto
- 🌐 `useAppContext` - Hook personalizado para consumir el contexto

### 4. **Optimizaciones**
- ⚡ Componentes memorizados con `React.memo`
- ⚡ Callbacks memorizados con `useCallback`
- ⚡ Valores computados con `useMemo`
- ⚡ Lazy loading de componentes

## 🏗️ Estructura del Proyecto

```
src/
├── components/         # Componentes React
│   ├── App.tsx        # Componente principal
│   ├── Navbar.tsx     # Barra de navegación
│   ├── Hero.tsx       # Sección hero
│   ├── CallToAction.tsx
│   ├── Testimonials.tsx
│   ├── TestimonialCard.tsx
│   └── Footer.tsx
├── context/           # Context API
│   └── AppContext.tsx
├── hooks/            # Custom Hooks
│   ├── useScroll.ts
│   ├── useIntersection.ts
│   ├── useToggle.ts
│   ├── useDebounce.ts
│   └── index.ts
├── layouts/          # Layouts de Astro
│   └── Layout.astro
├── pages/            # Páginas de Astro
│   └── index.astro
└── styles/           # Estilos globales
    └── global.css
```

## 🎨 Características

- ✨ Diseño responsive y moderno
- ✨ Animaciones suaves con Tailwind
- ✨ Optimización de rendimiento con React.memo
- ✨ Detección de scroll con custom hooks
- ✨ Animaciones al entrar en viewport
- ✨ Estado global con Context API
- ✨ TypeScript para seguridad de tipos

## 🚀 Comandos

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Vista previa de producción
pnpm preview
```

## 📝 Ejemplos de Uso

### Custom Hook - useIntersection
```tsx
const { ref, isIntersecting } = useIntersection({
  threshold: 0.2,
  triggerOnce: true,
});

return (
  <div ref={ref} className={isIntersecting ? 'visible' : 'hidden'}>
    Content
  </div>
);
```

### Context API
```tsx
const { state, toggleMenu } = useAppContext();

return (
  <button onClick={toggleMenu}>
    {state.isMenuOpen ? 'Close' : 'Open'}
  </button>
);
```

### React.memo Optimization
```tsx
const MemoizedComponent = memo(({ data }) => {
  // Solo se re-renderiza si 'data' cambia
  return <div>{data}</div>;
});
```

## 🎯 Optimizaciones Implementadas

1. **Memorización de Componentes**: Uso de `React.memo` para evitar re-renders
2. **Memorización de Callbacks**: `useCallback` para funciones estables
3. **Memorización de Valores**: `useMemo` para cálculos costosos
4. **Lazy Loading**: Carga diferida de imágenes y componentes
5. **Context Optimizado**: Separación de estado y acciones en el contexto

## 📱 Responsive Design

- Mobile First approach
- Breakpoints de Tailwind CSS
- Navegación adaptativa
- Imágenes optimizadas

## 🔧 Configuración de Tailwind CSS v4

Colores personalizados definidos en `src/styles/global.css` usando `@theme`:

```css
@theme {
  --color-lime-custom: #A3E635;
  --color-lime-green: #7AAC28;
  --color-lime-light: #BEF264;
  --color-lime-lightest: #F7FEE7;
  --color-gray-dark: #1F2937;
}
```

## 📄 Licencia

MIT

---

Desarrollado con ❤️ usando Astro + React + Tailwind CSS
