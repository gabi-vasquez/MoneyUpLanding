# Problema con Clases Dinámicas en Tailwind CSS

## El Problema

### ❌ Código que NO funciona

```tsx
// ESTO NO FUNCIONA - Las clases no se generan
const buttons = [
  {
    bgColor: 'bg-lime-custom',      // ❌ String dinámico
    hoverColor: 'hover:bg-lime-green', // ❌ String dinámico
    textColor: 'text-gray-dark',    // ❌ String dinámico
  }
];

<button className={button.bgColor}>Click me</button>
```

### ¿Por qué falla?

**Tailwind CSS usa análisis estático del código** durante el build. El compilador de Tailwind:

1. Escanea todos tus archivos buscando clases de Tailwind
2. Solo genera CSS para las clases que **puede ver literalmente en el código**
3. **NO puede detectar** clases que están en variables, concatenaciones o generadas dinámicamente

```tsx
// Tailwind NO puede ver estas clases porque están en strings
const dynamicClass = 'bg-blue-500';  // ❌ No se genera
className={variable}                  // ❌ No se genera
className={`bg-${color}-500`}        // ❌ No se genera
```

## La Solución

### ✅ Opción 1: Condicionales con Clases Estáticas (RECOMENDADO)

```tsx
const buttons = [
  {
    id: 'start',
    label: 'Empieza ahora',
    variant: 'primary' as const,  // ✅ Solo guardamos el tipo
  },
  {
    id: 'docs',
    label: 'Documentación',
    variant: 'secondary' as const,
  }
];

// Las clases están escritas literalmente en el código
<button
  className={cn(
    'px-12 py-5 rounded-2xl',
    button.variant === 'primary' && 'bg-lime-custom hover:bg-lime-green text-gray-dark',
    button.variant === 'secondary' && 'bg-black hover:bg-gray-dark text-lime-lightest'
  )}
>
  {button.label}
</button>
```

**Ventajas:**
- ✅ Tailwind puede ver todas las clases
- ✅ Código type-safe con TypeScript
- ✅ Funciona con el utility `cn()` para merge inteligente
- ✅ Mejor performance (CSS optimizado)

### ✅ Opción 2: Estilos Inline con CSS Variables

```tsx
const buttons = [
  {
    bgColor: '#A3E635',
    hoverBgColor: '#7AAC28',
    textColor: '#1F2937',
  }
];

<button
  style={{
    backgroundColor: button.bgColor,
    color: button.textColor,
  }}
  className="px-12 py-5 rounded-2xl hover:opacity-90"
>
  Click me
</button>
```

**Ventajas:**
- ✅ Completamente dinámico
- ✅ Útil para colores calculados o desde API
- ⚠️ No puedes usar pseudo-clases como `:hover` directamente

### ✅ Opción 3: Safelist (Para casos muy específicos)

Si **realmente necesitas** clases dinámicas, puedes usar safelist en la configuración:

```js
// tailwind.config.js
export default {
  safelist: [
    'bg-lime-custom',
    'hover:bg-lime-green',
    'text-gray-dark',
    'text-lime-lightest',
  ]
}
```

**Desventajas:**
- ⚠️ Aumenta el tamaño del CSS bundle
- ⚠️ Fácil olvidar agregar clases nuevas
- ⚠️ No recomendado para proyectos grandes

## Patrones Recomendados

### 1. Component Variants Pattern (shadcn/ui style)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'px-12 py-5 rounded-2xl font-archivo transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-lime-custom hover:bg-lime-green text-gray-dark',
        secondary: 'bg-black hover:bg-gray-dark text-lime-lightest',
        outline: 'border border-gray-300 hover:bg-gray-100',
      },
      size: {
        sm: 'px-8 py-3 text-xl',
        md: 'px-12 py-5 text-2xl',
        lg: 'px-16 py-6 text-3xl',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    }
  }
);

// Uso
<button className={buttonVariants({ variant: 'primary', size: 'md' })}>
  Click me
</button>
```

### 2. Utility cn() para Merge Inteligente

```tsx
import { cn } from '@/lib/utils';

// Maneja condicionales y merge de clases conflictivas
<button
  className={cn(
    'px-4',           // Base
    isLarge && 'px-8', // Condicional - 'px-8' sobrescribe 'px-4'
    className         // Props adicionales
  )}
>
  Click me
</button>
```

## Reglas de Oro

1. **✅ SIEMPRE escribe las clases literalmente en el código**
2. **❌ NUNCA uses concatenación de strings** (`'bg-' + color + '-500'`)
3. **❌ NUNCA almacenes clases completas en variables** (almacena el variant/tipo)
4. **✅ USA condicionales** con operadores `&&` o ternarios
5. **✅ USA el utility `cn()`** para combinar clases de forma limpia

## Debugging

Si tus estilos no se aplican:

1. **Verifica que las clases existan en el CSS compilado:**
   ```bash
   grep "bg-lime-custom" dist/_astro/*.css
   ```

2. **Inspecciona el elemento en DevTools:**
   - ¿La clase está en el HTML?
   - ¿La clase tiene estilos CSS asociados?

3. **Rebuild el proyecto:**
   ```bash
   pnpm run build
   ```

4. **Verifica la configuración de Tailwind CSS v4:**
   ```css
   /* src/styles/global.css */
   @theme {
     --color-lime-custom: #A3E635;
   }
   ```

## Referencias

- [Tailwind CSS - Dynamic Class Names](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
- [Class Variance Authority](https://cva.style/docs)
- [clsx + tailwind-merge (cn utility)](https://github.com/dcastil/tailwind-merge)

