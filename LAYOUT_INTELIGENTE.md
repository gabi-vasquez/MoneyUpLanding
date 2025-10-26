# Sistema de Layout Inteligente con Flexbox y CSS Variables

## 🎯 Objetivo
Crear un sistema de layout adaptativo que **elimina valores hardcodeados** y se ajusta automáticamente cuando cambian las dimensiones del navbar o footer.

## 🏗️ Arquitectura

### 1. CSS Variables (global.css)
Definimos variables CSS en `@layer theme` con `:root` para todas las dimensiones del layout:

```css
/* Layout Variables - Sistema de espaciado inteligente (CSS Custom Properties) */
/* En Tailwind v4, las variables personalizadas deben estar en @layer theme */
@layer theme {
  :root {
    --navbar-height: 88px;
    --navbar-padding-bottom: 96px;
    --navbar-wave-height: 115px;
    --navbar-total-height: calc(var(--navbar-height) + var(--navbar-padding-bottom));
    --navbar-content-offset: calc(var(--navbar-total-height) + 20px);
    
    --footer-wave-height: 100px;
    --footer-spacing: var(--footer-wave-height);
  }
}
```

**⚠️ Notas Importantes para Tailwind v4:**
1. **Variables en `@layer theme`**: Las variables personalizadas DEBEN estar dentro de `@layer theme` con `:root` para ser accesibles globalmente
2. **NO usar `@theme` para variables personalizadas**: `@theme` es solo para tokens de Tailwind (colores, fuentes, etc.)
3. **Clases personalizadas FUERA de `@layer components`**: En Tailwind v4, las clases personalizadas se definen directamente, NO dentro de `@layer components`

**Ventajas:**
- ✅ **Single Source of Truth**: Cambiar una dimensión actualiza todo automáticamente
- ✅ **Calculado dinámicamente**: Usa `calc()` para operaciones
- ✅ **Mantenible**: Solo modificar las variables, no el código
- ✅ **Accesibles globalmente**: Disponibles en todo el CSS

### 2. Clases CSS Inteligentes (global.css)

**IMPORTANTE**: En Tailwind v4, las clases personalizadas NO deben estar en `@layer components`. Se definen directamente en el CSS:

```css
/* Definidas directamente, NO dentro de @layer components */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
```

#### `.page-container`
```css
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
```
- Usa **Flexbox** para distribuir verticalmente: navbar → main → footer
- `min-height: 100vh` asegura que ocupe toda la pantalla

#### `.main-content`
```css
.main-content {
  flex: 1 1 auto;
  padding-top: var(--navbar-content-offset);
  min-height: calc(100vh - var(--navbar-content-offset));
}
```
- `flex: 1 1 auto` hace que ocupe **todo el espacio disponible**
- `padding-top` usa la variable CSS (se adapta automáticamente)
- **No más valores hardcodeados** como `204px`

#### `.footer-container`
```css
.footer-container {
  margin-top: var(--footer-spacing);
  flex-shrink: 0;
}
```
- `margin-top` dinámico basado en la altura de la onda
- `flex-shrink: 0` previene que el footer se comprima

#### `.footer-wave`
```css
.footer-wave {
  height: var(--footer-wave-height);
}
```
- Altura de la onda decorativa calculada dinámicamente

## 🔧 Implementación en Componentes

### PageLayout.tsx
```tsx
<div className="page-container bg-white">
  <Navbar logoUrl={logoUrl} />
  <main className="main-content">
    {children}
  </main>
  <Footer {...footerProps} />
</div>
```

**Antes (❌ hardcoded):**
```tsx
<main style={{ paddingTop: '204px', minHeight: 'calc(100vh - 204px)' }}>
```

**Después (✅ dinámico):**
```tsx
<main className="main-content">
```

### Footer.tsx
```tsx
<footer className="footer-container relative bg-gray-dark text-white">
  <div className="...">
    <svg className="footer-wave relative block w-full">
```

**Antes (❌ hardcoded):**
```tsx
<footer style={{ marginTop: '100px' }}>
  <svg style={{ height: '100px' }}>
```

**Después (✅ dinámico):**
```tsx
<footer className="footer-container">
  <svg className="footer-wave">
```

## 🎨 Cómo Funciona el Flexbox Layout

```
┌──────────────────────────────────────┐
│  .page-container                     │
│  (display: flex, flex-direction:     │
│   column, min-height: 100vh)         │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  <Navbar /> (fixed)            │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  <main className="main-content">│ │
│  │  • flex: 1 (ocupa espacio)     │ │
│  │  • padding-top: var(...)       │ │
│  │                                 │ │
│  │  {children}                     │ │
│  │                                 │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  <Footer className=            │ │
│  │    "footer-container">         │ │
│  │  • margin-top: var(...)        │ │
│  │  • flex-shrink: 0              │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## 📐 Ventajas del Sistema

### 1. **Adaptabilidad Automática**
Si necesitas cambiar la altura del navbar:
```css
/* Solo cambia esto */
--navbar-height: 100px;  /* Era 88px */

/* Y TODO se actualiza automáticamente: */
/* - padding-top del main */
/* - min-height del main */
/* - Todos los cálculos dependientes */
```

### 2. **Principios SOLID**
- ✅ **Single Responsibility**: Cada clase tiene un propósito único
- ✅ **Open/Closed**: Extensible sin modificar el código existente
- ✅ **DRY**: No repetir valores - usar variables

### 3. **Mantenibilidad**
- Un solo lugar para cambiar dimensiones (`global.css`)
- No buscar y reemplazar valores hardcodeados en múltiples archivos
- Documentación clara de las variables

### 4. **Responsive Design**
El sistema se adapta automáticamente a diferentes tamaños de pantalla porque usa:
- **Flexbox**: Distribución flexible
- **CSS Variables**: Valores dinámicos
- **calc()**: Cálculos automáticos

## 🧪 Testing y Verificación

### Verificar que funciona correctamente:
1. El contenido del main no queda oculto detrás del navbar
2. Hay espacio suficiente entre el contenido y el footer
3. La onda del footer no choca con el contenido
4. El footer siempre está al fondo (incluso con poco contenido)

### Cambiar dimensiones (testing):
```css
/* En global.css, prueba cambiar: */
--navbar-height: 120px;  /* Aumenta navbar */
--footer-wave-height: 150px;  /* Aumenta onda */

/* Y verifica que todo se adapta automáticamente */
```

## 📚 Referencias

### Flexbox
- `display: flex` + `flex-direction: column`: Layout vertical
- `flex: 1`: Hace que un elemento ocupe todo el espacio disponible
- `flex-shrink: 0`: Previene que un elemento se comprima

### CSS Variables
- `var(--variable-name)`: Usa una variable CSS
- `calc()`: Realiza cálculos con variables
- Scope: Variables definidas en `:root` o `@theme` son globales

## 🐛 Troubleshooting - Problema Resuelto

### Problema: "Las clases CSS están siendo ignoradas"

**Síntoma**: Las clases `.page-container`, `.main-content`, etc. no se aplican y el contenido choca con el navbar.

**Causa**: En Tailwind CSS v4, el manejo de `@layer` ha cambiado:
1. Las variables en `@theme` NO son accesibles como CSS custom properties
2. Las clases en `@layer components` pueden ser ignoradas o no generarse

**Solución**:

1. **Variables CSS**:
   ```css
   /* ❌ NO FUNCIONA - Variables en @theme */
   @theme {
     --navbar-height: 88px;
   }
   
   /* ✅ SÍ FUNCIONA - Variables en @layer theme con :root */
   @layer theme {
     :root {
       --navbar-height: 88px;
     }
   }
   ```

2. **Clases Personalizadas**:
   ```css
   /* ❌ NO FUNCIONA - Clases en @layer components */
   @layer components {
     .page-container {
       display: flex;
     }
   }
   
   /* ✅ SÍ FUNCIONA - Clases definidas directamente */
   .page-container {
     display: flex;
     flex-direction: column;
     min-height: 100vh;
   }
   ```

**Verificar que funciona**:
```bash
# Buscar las clases en el CSS compilado
grep -E "(page-container|main-content)" dist/_astro/*.css
```

## 🎓 Conclusión

Este sistema reemplaza valores hardcodeados con un sistema inteligente y adaptativo que:
- ✅ Es más fácil de mantener
- ✅ Se adapta automáticamente a cambios
- ✅ Sigue mejores prácticas (SOLID, DRY, KISS)
- ✅ Usa tecnologías modernas (Flexbox, CSS Variables)
- ✅ Es más profesional y escalable
- ✅ Compatible con Tailwind CSS v4

**Antes**: 🔴 `style={{ paddingTop: '204px' }}`  
**Después**: 🟢 `className="main-content"`  

Simple, limpio, mantenible. 🚀

