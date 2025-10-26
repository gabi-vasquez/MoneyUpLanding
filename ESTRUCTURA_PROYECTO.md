# 📂 Estructura del Proyecto MoneyUp Landing

Visualización completa de la arquitectura del proyecto.

---

## 🌳 Árbol de Directorios

```
MoneyUpLanding/
│
├── 📄 Archivos de Configuración
│   ├── package.json              # Dependencias y scripts
│   ├── pnpm-lock.yaml           # Lock file de pnpm
│   ├── astro.config.mjs         # Configuración de Astro
│   └── tsconfig.json            # Configuración de TypeScript
│
├── 📚 Documentación (7 archivos)
│   ├── README.md                # Overview del proyecto
│   ├── ARQUITECTURA.md          # Arquitectura detallada
│   ├── CONCEPTOS_REACT.md       # Guía de hooks y patterns
│   ├── EJEMPLOS.md              # 50+ ejemplos prácticos
│   ├── REFERENCIA_RAPIDA.md     # Cheatsheet
│   ├── RESUMEN_PROYECTO.md      # Resumen completo
│   ├── INICIO_RAPIDO.md         # Quick start
│   └── ESTRUCTURA_PROYECTO.md   # Este archivo
│
├── 📁 public/                   # Assets estáticos
│   └── favicon.svg
│
└── 📁 src/                      # Código fuente
    │
    ├── 📁 components/           # Componentes React (8)
    │   ├── App.tsx             # ⭐ Componente raíz
    │   ├── Navbar.tsx          # 🔝 Navegación
    │   ├── Hero.tsx            # 🎨 Sección hero
    │   ├── CallToAction.tsx    # 🚀 CTA
    │   ├── Testimonials.tsx    # 💬 Testimonios
    │   ├── TestimonialCard.tsx # 📇 Card individual
    │   ├── Footer.tsx          # 🔽 Pie de página
    │   └── ScrollProgress.tsx  # 📊 Barra de progreso
    │
    ├── 📁 context/              # Context API
    │   └── AppContext.tsx      # 🌐 Estado global
    │
    ├── 📁 hooks/                # Custom Hooks (4)
    │   ├── index.ts            # Exportaciones
    │   ├── useScroll.ts        # 📜 Hook de scroll
    │   ├── useIntersection.ts  # 👁️ Hook de viewport
    │   ├── useToggle.ts        # 🔄 Hook de toggle
    │   └── useDebounce.ts      # ⏱️ Hook de debounce
    │
    ├── 📁 layouts/              # Layouts de Astro
    │   └── Layout.astro        # 📐 Layout principal
    │
    ├── 📁 pages/                # Páginas de Astro
    │   └── index.astro         # 🏠 Página principal
    │
    └── 📁 styles/               # Estilos
        └── global.css          # 🎨 CSS global + Tailwind
```

---

## 📊 Estadísticas

### Archivos por Tipo

| Tipo | Cantidad | Descripción |
|------|----------|-------------|
| **React (.tsx)** | 8 | Componentes interactivos |
| **TypeScript (.ts)** | 5 | Hooks y utilidades |
| **Astro (.astro)** | 2 | Páginas y layouts |
| **CSS (.css)** | 1 | Estilos globales + Tailwind |
| **Config (.js/.mjs/.json)** | 3 | Configuración |
| **Docs (.md)** | 8 | Documentación |

### Líneas de Código

```
Componentes React:    ~600 líneas
Custom Hooks:         ~200 líneas
Context API:          ~100 líneas
Pages/Layouts:        ~100 líneas
Estilos:             ~100 líneas
Configuración:        ~100 líneas
────────────────────────────────
Total TypeScript:    ~1,200 líneas
Total Documentación: ~500 líneas
```

---

## 🎯 Flujo de Archivos

### 1. Entrada de la Aplicación

```
index.html (generado por Astro)
    ↓
src/pages/index.astro (Página Astro)
    ↓
src/layouts/Layout.astro (Layout)
    ↓
src/components/App.tsx (Componente React)
```

### 2. Componentes React

```
App.tsx (Provider Root)
    ├── ScrollProgress.tsx (Barra progreso)
    ├── Navbar.tsx (Navegación)
    │   └── usa: useScroll, useAppContext
    │
    ├── Hero.tsx (Sección hero)
    │   └── usa: useIntersection
    │
    ├── CallToAction.tsx (CTA)
    │   └── usa: useState, useCallback, useIntersection
    │
    ├── Testimonials.tsx (Testimonios)
    │   ├── usa: useState, useEffect, useIntersection
    │   └── TestimonialCard.tsx (×6)
    │
    └── Footer.tsx (Pie de página)
        └── usa: useMemo, useCallback
```

### 3. Contexto y Hooks

```
AppContext.tsx (Context Provider)
    ├── state: tema, idioma, menú, secciones
    └── actions: toggle, set functions

hooks/
    ├── useScroll.ts → Navbar, ScrollProgress
    ├── useIntersection.ts → Hero, CTA, Testimonials
    ├── useToggle.ts → (disponible para uso)
    └── useDebounce.ts → (disponible para uso)
```

---

## 🔄 Dependencias entre Archivos

### AppContext.tsx
```
Usado por:
├── App.tsx (Provider)
└── Navbar.tsx (Consumer)
```

### useScroll.ts
```
Usado por:
├── Navbar.tsx (detección de scroll)
└── ScrollProgress.tsx (cálculo de progreso)
```

### useIntersection.ts
```
Usado por:
├── Hero.tsx (animaciones de entrada)
├── CallToAction.tsx (animaciones de entrada)
└── Testimonials.tsx (animaciones escalonadas)
```

### Layout.astro
```
Usado por:
└── index.astro (todas las páginas)
```

---

## 📦 Componentes por Categoría

### 🎨 Presentacionales (Solo UI)
```
TestimonialCard.tsx   # Card individual
Footer.tsx           # Pie de página
```

### 🔧 Contenedores (Con lógica)
```
App.tsx              # Root con Provider
Navbar.tsx           # Navegación con scroll
Hero.tsx             # Hero con animaciones
CallToAction.tsx     # CTA con interacciones
Testimonials.tsx     # Lista con animaciones
ScrollProgress.tsx   # Barra de progreso
```

### 🌐 Contexto
```
AppContext.tsx       # Estado global
```

### 🎣 Hooks
```
useScroll.ts         # Scroll tracking
useIntersection.ts   # Viewport detection
useToggle.ts         # Boolean state
useDebounce.ts       # Value debouncing
```

---

## 🎨 Estilos por Componente

| Componente | Estilos Principales | Animaciones |
|------------|---------------------|-------------|
| **Navbar** | Sticky, backdrop blur | Fade on scroll |
| **Hero** | Grid, flex | Float, fade-in |
| **CallToAction** | Flex, gradient | Scale on hover |
| **Testimonials** | Grid 3 cols | Stagger entrance |
| **TestimonialCard** | Shadow, rounded | Scale on hover |
| **Footer** | Dark bg, gradient | None |
| **ScrollProgress** | Fixed top, gradient | Width transition |

---

## 🔗 Imports por Archivo

### App.tsx
```tsx
import { AppProvider } from '../context/AppContext'
import Navbar from './Navbar'
import Hero from './Hero'
import CallToAction from './CallToAction'
import Testimonials from './Testimonials'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
```

### Navbar.tsx
```tsx
import { memo, useCallback, useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { useScroll } from '../hooks/useScroll'
```

### Hero.tsx
```tsx
import { memo, useMemo } from 'react'
import { useIntersection } from '../hooks/useIntersection'
```

### CallToAction.tsx
```tsx
import { memo, useCallback, useMemo, useState } from 'react'
import { useIntersection } from '../hooks/useIntersection'
```

### Testimonials.tsx
```tsx
import { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { useIntersection } from '../hooks/useIntersection'
import TestimonialCard from './TestimonialCard'
```

---

## 📊 Tamaño de Archivos

### Componentes
```
CallToAction.tsx    4.2 KB  (más grande)
Navbar.tsx          4.4 KB
Testimonials.tsx    3.9 KB
Hero.tsx            3.2 KB
Footer.tsx          2.9 KB
AppContext.tsx      2.5 KB
ScrollProgress.tsx  1.8 KB
App.tsx             1.4 KB
TestimonialCard.tsx 0.9 KB  (más pequeño)
```

### Documentación
```
EJEMPLOS.md             14 KB  (más grande)
RESUMEN_PROYECTO.md     11 KB
ARQUITECTURA.md         9.2 KB
CONCEPTOS_REACT.md      9.8 KB
REFERENCIA_RAPIDA.md    8.4 KB
INICIO_RAPIDO.md        7.0 KB
README.md               4.2 KB
```

---

## 🎯 Props Flow

```
index.astro
    └── assets: {...}
        ↓
    App.tsx
        ├── logoUrl → Navbar
        ├── mascotImage, lineImage → Hero
        ├── phoneImage → CallToAction
        └── vectorBg, icons → Footer
```

---

## 🔄 State Flow

### Global State (Context)
```
AppProvider (App.tsx)
    ↓
AppContext
    ├── theme: light/dark
    ├── language: es/en
    ├── isMenuOpen: boolean
    └── visibleSections: Set<string>
        ↓
    useAppContext()
        └── Navbar.tsx (consume)
```

### Local State
```
Navbar:          useState (ninguno, usa Context)
Hero:            useState (ninguno)
CallToAction:    useState (hoveredButton)
Testimonials:    useState (visibleCards)
ScrollProgress:  useState (progress)
```

---

## 🎨 Tailwind Classes por Categoría

### Layout Classes
```
flex, grid, container, mx-auto
justify-center, items-center
space-x-4, space-y-4, gap-4
```

### Responsive
```
md:flex, lg:grid-cols-3
hidden md:block
```

### Custom Colors
```
bg-lime-custom, bg-lime-green
text-lime-lightest, bg-gray-dark
```

### Animations
```
transition-all, duration-300
hover:scale-105, hover:bg-*
animate-float (custom)
```

---

## 📚 Documentación por Audiencia

### Para Principiantes
```
INICIO_RAPIDO.md         # Empezar en 5 minutos
README.md                # Overview básico
```

### Para Desarrolladores
```
CONCEPTOS_REACT.md       # Teoría de hooks
EJEMPLOS.md              # Código copy-paste
REFERENCIA_RAPIDA.md     # Cheatsheet
```

### Para Arquitectos
```
ARQUITECTURA.md          # Diseño del sistema
ESTRUCTURA_PROYECTO.md   # Este archivo
RESUMEN_PROYECTO.md      # Visión completa
```

---

## 🚀 Build Output

```
dist/
├── index.html              # Página principal
├── _astro/
│   ├── client.js          # React runtime (~187 KB)
│   ├── App.js            # Componentes (~14 KB)
│   └── index.js          # Entry point (~8 KB)
└── assets/
    └── (imágenes, fuentes, etc.)
```

---

## 🎓 Conceptos por Archivo

| Archivo | Conceptos |
|---------|-----------|
| **App.tsx** | Provider Pattern, Composition |
| **Navbar.tsx** | memo, useCallback, useMemo, Context, Custom Hook |
| **Hero.tsx** | memo, useMemo, Intersection Observer |
| **CallToAction.tsx** | useState, useCallback, useMemo, Intersection |
| **Testimonials.tsx** | useState, useEffect, Stagger Animation |
| **TestimonialCard.tsx** | Pure Component, memo |
| **Footer.tsx** | memo, useMemo, useCallback |
| **ScrollProgress.tsx** | useState, useEffect, useMemo, Custom Hook |
| **AppContext.tsx** | Context API, useCallback, useMemo, Provider |
| **useScroll.ts** | Custom Hook, Event Listeners |
| **useIntersection.ts** | Custom Hook, Intersection Observer, Generics |
| **useToggle.ts** | Custom Hook, Boolean State |
| **useDebounce.ts** | Custom Hook, Timing |

---

## 🎯 Resumen Visual

```
┌─────────────────────────────────────┐
│         MoneyUp Landing             │
│                                     │
│  📱 Astro + React + TypeScript     │
│  🎨 Tailwind CSS                   │
│  ⚡ Optimizado con memo/useMemo    │
│  🎣 4 Custom Hooks                 │
│  🌐 Context API                    │
│  📚 8 Documentos                   │
│  ✅ 100% Type Safe                 │
│  🚀 Production Ready               │
└─────────────────────────────────────┘
```

---

**Estructura diseñada para:** Escalabilidad • Mantenibilidad • Performance • DX

