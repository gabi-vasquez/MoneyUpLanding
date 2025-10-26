# Utilities Library

## cn() - Class Name Merger

La función `cn()` combina **clsx** y **tailwind-merge** para manejar clases dinámicas de Tailwind de forma inteligente.

### ¿Qué hace?

1. **clsx**: Maneja clases condicionales
2. **tailwind-merge**: Resuelve conflictos entre clases de Tailwind (el último gana)

### Importación

```tsx
import { cn } from '@/lib/utils';
// o
import { cn } from '../lib/utils';
```

### Ejemplos de Uso

#### 1. Clases Condicionales

```tsx
<button
  className={cn(
    'px-4 py-2',
    isActive && 'bg-blue-500',
    !isActive && 'bg-gray-300'
  )}
>
  Click me
</button>
```

#### 2. Merge de Clases Conflictivas

```tsx
// Sin cn(): ambas clases se aplican, comportamiento indefinido
<div className="px-4 px-8">  // ❌ Conflicto

// Con cn(): la última gana
<div className={cn('px-4', 'px-8')}>  // ✅ Resultado: 'px-8'
```

#### 3. Props + Clases Base

```tsx
interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

function Button({ className, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'px-12 py-5 rounded-2xl transition-all',
        // Variants
        variant === 'primary' && 'bg-lime-custom hover:bg-lime-green',
        variant === 'secondary' && 'bg-black hover:bg-gray-dark',
        // Props externos (pueden sobrescribir)
        className
      )}
    >
      Click me
    </button>
  );
}

// Uso
<Button className="px-16" />  // px-16 sobrescribe px-12
```

#### 4. Objetos Condicionales

```tsx
<div
  className={cn(
    'base-class',
    {
      'text-green-500': isSuccess,
      'text-red-500': isError,
      'text-gray-500': !isSuccess && !isError,
    }
  )}
/>
```

#### 5. Arrays y Spread

```tsx
const baseClasses = ['px-4', 'py-2', 'rounded'];
const conditionalClasses = isLarge ? ['text-xl', 'py-4'] : ['text-sm'];

<button className={cn(...baseClasses, ...conditionalClasses)}>
  Click me
</button>
```

### ⚠️ Importante

**Recuerda que Tailwind necesita ver las clases literalmente en el código:**

```tsx
// ✅ CORRECTO
className={cn(
  variant === 'primary' && 'bg-blue-500',
  variant === 'secondary' && 'bg-gray-500'
)}

// ❌ INCORRECTO - Tailwind no puede ver estas clases
const colors = { primary: 'bg-blue-500', secondary: 'bg-gray-500' };
className={cn(colors[variant])}
```

### Beneficios

- ✅ **Type-safe**: TypeScript detecta errores
- ✅ **Inteligente**: Resuelve conflictos automáticamente
- ✅ **Limpio**: Código más legible
- ✅ **Performance**: Solo aplica las clases necesarias
- ✅ **Flexible**: Acepta strings, objetos, arrays, undefined, null

### Referencias

- [clsx](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)

