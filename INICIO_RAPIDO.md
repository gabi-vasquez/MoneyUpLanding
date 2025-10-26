# 🚀 Inicio Rápido - MoneyUp Landing

Guía para empezar a trabajar con el proyecto en **5 minutos**.

---

## ⚡ Setup Rápido

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Iniciar Desarrollo
```bash
pnpm dev
```

Abre tu navegador en: **http://localhost:4321**

---

## 📁 Archivos Principales

### Quiero modificar...

| Objetivo | Archivo | Ubicación |
|----------|---------|-----------|
| **Navbar** | `Navbar.tsx` | `/src/components/` |
| **Hero** | `Hero.tsx` | `/src/components/` |
| **Testimonios** | `Testimonials.tsx` | `/src/components/` |
| **Footer** | `Footer.tsx` | `/src/components/` |
| **Colores** | `global.css` (sección `@theme`) | `/src/styles/` |
| **Página principal** | `index.astro` | `/src/pages/` |
| **Layout** | `Layout.astro` | `/src/layouts/` |
| **Estilos globales** | `global.css` | `/src/styles/` |

---

## 🎨 Cambios Comunes

### Cambiar Colores

**Archivo**: `src/styles/global.css`

```css
@theme {
  --color-lime-custom: #A3E635;    /* ← Cambia aquí */
  --color-lime-green: #7AAC28;
  /* ... */
}
```

### Cambiar Textos del Hero

**Archivo**: `src/components/Hero.tsx`

```tsx
const content = useMemo(
  () => ({
    title: 'MoneyUP',              // ← Título
    description: 'aplicacion...',   // ← Descripción
    subtitle: 'Ideal para',         // ← Subtítulo
    feature: 'definir metas...',    // ← Feature
  }),
  []
);
```

### Agregar Testimonio

**Archivo**: `src/components/Testimonials.tsx`

```tsx
const testimonials = useMemo(
  () => [
    // ... testimonios existentes
    {
      id: 7,                                    // ← Nuevo ID
      name: 'Tu Nombre',                       // ← Nombre
      comment: 'Tu comentario aquí...',        // ← Comentario
    },
  ],
  []
);
```

### Cambiar Enlaces del Navbar

**Archivo**: `src/components/Navbar.tsx`

```tsx
const navItems = useMemo(
  () => [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-nosotros', label: 'Sobre Nosotros' },
    { id: 'contacto', label: 'Contacto' },
    // Agrega más aquí ↓
    { id: 'pricing', label: 'Precios' },
  ],
  []
);
```

---

## 🔧 Crear Nuevo Componente

### Paso 1: Crear archivo
```bash
touch src/components/MiComponente.tsx
```

### Paso 2: Plantilla básica
```tsx
import { memo, useState } from 'react';

interface MiComponenteProps {
  titulo: string;
}

const MiComponente = memo(({ titulo }: MiComponenteProps) => {
  const [contador, setContador] = useState(0);
  
  return (
    <div className="p-4">
      <h2>{titulo}</h2>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(c => c + 1)}>
        Incrementar
      </button>
    </div>
  );
});

MiComponente.displayName = 'MiComponente';

export default MiComponente;
```

### Paso 3: Importar en App.tsx
```tsx
import MiComponente from './MiComponente';

// En el JSX:
<MiComponente titulo="Hola Mundo" />
```

---

## 🎣 Usar un Hook

### useScroll
```tsx
import { useScroll } from '../hooks/useScroll';

function MiComponente() {
  const scroll = useScroll();
  
  return <div>Scroll Y: {scroll.y}px</div>;
}
```

### useIntersection
```tsx
import { useIntersection } from '../hooks/useIntersection';

function MiComponente() {
  const { ref, isIntersecting } = useIntersection();
  
  return (
    <div ref={ref}>
      {isIntersecting ? 'Visible' : 'No visible'}
    </div>
  );
}
```

### Context
```tsx
import { useAppContext } from '../context/AppContext';

function MiComponente() {
  const { state, toggleMenu } = useAppContext();
  
  return (
    <button onClick={toggleMenu}>
      {state.isMenuOpen ? 'Cerrar' : 'Abrir'}
    </button>
  );
}
```

---

## 🎨 Estilos con Tailwind

### Classes más usadas
```tsx
// Layout
className="flex justify-center items-center"
className="grid grid-cols-3 gap-4"
className="container mx-auto px-4"

// Spacing
className="p-4 m-2"           // padding y margin
className="pt-8 pb-16"        // padding top/bottom
className="space-y-4"         // espacio vertical entre hijos

// Typography
className="text-2xl font-bold"
className="font-inter text-gray-800"
className="text-center leading-relaxed"

// Colors
className="bg-lime-custom text-white"
className="text-gray-dark"

// Responsive
className="md:flex lg:grid-cols-3"
className="hidden md:block"

// Hover & Transitions
className="hover:bg-lime-green transition-colors duration-300"
className="hover:scale-105 transform"
```

---

## 📊 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor dev

# Producción
pnpm build           # Construye para producción
pnpm preview         # Vista previa de build

# Utilidades
pnpm astro --help    # Ver comandos de Astro
pnpm astro add       # Agregar integraciones
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error: Puerto en uso
```bash
# Cambiar puerto
pnpm dev --port 3000
```

### Error de TypeScript
```bash
# Regenerar tipos
rm -rf .astro
pnpm dev
```

### Build falla
```bash
# Limpiar caché
rm -rf dist .astro
pnpm build
```

---

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Overview y setup |
| `CONCEPTOS_REACT.md` | Guía de hooks y patrones |
| `ARQUITECTURA.md` | Estructura del proyecto |
| `EJEMPLOS.md` | 50+ ejemplos prácticos |
| `REFERENCIA_RAPIDA.md` | Cheatsheet |
| `RESUMEN_PROYECTO.md` | Resumen completo |

---

## 🎯 Checklist de Desarrollo

### Antes de empezar
- [ ] `pnpm install` ejecutado
- [ ] `pnpm dev` corriendo
- [ ] Navegador abierto en localhost:4321

### Al crear componente
- [ ] Archivo en `/src/components/`
- [ ] Nombre en PascalCase
- [ ] Props interface definida
- [ ] Exportar con `export default`
- [ ] Importar en componente padre

### Al usar hooks
- [ ] Solo en funciones de React
- [ ] No dentro de condicionales
- [ ] Dependencies array correcto
- [ ] Cleanup si es necesario

### Antes de commit
- [ ] `pnpm build` sin errores
- [ ] No hay console.logs
- [ ] Código formateado
- [ ] TypeScript happy

---

## 💡 Tips Rápidos

### 1. Hot Module Replacement (HMR)
Los cambios se reflejan automáticamente, no necesitas refrescar.

### 2. React DevTools
Instala la extensión para ver el árbol de componentes.

### 3. Tailwind IntelliSense
Instala la extensión de VS Code para autocompletado.

### 4. TypeScript IntelliSense
Presiona `Ctrl+Space` para ver sugerencias.

### 5. Errores en consola
Revisa la terminal Y la consola del navegador.

---

## 🔗 Links Útiles

- **Proyecto**: http://localhost:4321
- **Astro Docs**: https://docs.astro.build
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com

---

## 🎓 Próximos Pasos

1. ✅ Ejecuta `pnpm dev`
2. 📖 Lee `CONCEPTOS_REACT.md`
3. 🎨 Modifica un componente
4. 🎣 Usa un custom hook
5. 🌐 Prueba el Context
6. 💡 Revisa `EJEMPLOS.md`

---

**¡Listo para empezar!** 🚀

¿Preguntas? Revisa la documentación en el directorio raíz.

