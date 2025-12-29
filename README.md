# 👟 SNEAKER VAULT | Luxury E-Commerce Experience

![Project Banner](https://via.placeholder.com/1200x600?text=SNEAKER+VAULT+PREVIEW)

> **Redefiniendo el movimiento.** Una experiencia de compra inmersiva con estética editorial, diseño "Warm Clay" y arquitectura Frontend moderna.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Fast-yellow?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-Bleeding_Edge-38bdf8?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-MVP_Development-green)

---

## 📖 Tabla de Contenidos

1. [Sobre el Proyecto](#-sobre-el-proyecto)
2. [Concepto de Diseño](#-concepto-de-diseño)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Características Clave](#-características-clave)
5. [Instalación y Uso](#-instalación-y-uso)
6. [Estructura del Proyecto](#-estructura-del-proyecto)
7. [Roadmap](#-roadmap)

---

## 💡 Sobre el Proyecto

**Sneaker Vault** no es solo una tienda online; es un ejercicio de **UI/UX de alto nivel**. Este proyecto fue concebido para alejarse de los templates genéricos de e-commerce y acercarse a una experiencia de "boutique digital".

El objetivo técnico fue construir una **SPA (Single Page Application)** performante, utilizando las últimas tecnologías del ecosistema React y gestionando un estado global complejo sin dependencias pesadas.

---

## 🎨 Concepto de Diseño: "Warm Clay & Glass"

El diseño visual es el corazón de este proyecto. Se aleja del clásico "blanco y negro" del streetwear para abrazar una paleta orgánica y sofisticada.

* **Paleta de Colores:** Tonos tierra, almendra (`#F1D9C6`), terracota (`#C76D4D`) y café espresso (`#2A1B15`).
* **Glassmorphism:** Uso intensivo de `backdrop-filter` y bordes translúcidos para crear profundidad y jerarquía.
* **Tipografía:** Combinación de **Clash Display** (Display/Editorial) para impacto y **General Sans** para legibilidad técnica.
* **Micro-interacciones:** Hover effects líquidos y transiciones suaves para una sensación premium.

---

## 🛠 Stack Tecnológico

Este proyecto utiliza una arquitectura moderna basada en componentes funcionales y Hooks.

* **Core:** React 18 + Vite (Build tool ultrarrápido).
* **Estilos:** **Tailwind CSS v4** (Configuración nativa CSS-first, sin `tailwind.config.js`).
* **Routing:** React Router DOM v6.
* **Iconografía:** Lucide React (Minimalista y ligero).
* **Estado:** React Context API (Gestión de Carrito y Favoritos) + LocalStorage (Persistencia).
* **Datos:** Mock Data Architecture (JSON estructurado simulando API REST).

---

## ✨ Características Clave

* ✅ **Navegación Fluida:** SPA con routing dinámico.
* ✅ **Catálogo Inteligente:** Filtrado en tiempo real por Talla, Marca, Color y Precio (sin recargas).
* ✅ **Filtros UI Personalizados:** Dropdowns diseñados desde cero (sin elementos nativos del navegador).
* ✅ **Carrito de Compras (Slide-over):** Gestión de estado global, cálculo de subtotales y persistencia de datos.
* ✅ **Diseño Responsivo:** Adaptación fluida desde Móvil (Menú hamburguesa) hasta Desktop (Grids complejos).
* ✅ **Página de Producto:** Galería de imágenes interactiva y selector de tallas lógico.

---

## 🚀 Instalación y Uso

Sigue estos pasos para correr el proyecto localmente:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/sneaker-vault.git](https://github.com/TU_USUARIO/sneaker-vault.git)
    cd sneaker-vault
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Visita `http://localhost:5173/` para ver la aplicación.

---

## 📂 Estructura del Proyecto

Organización modular para escalabilidad:

```bash
src/
├── assets/          # Imágenes y fuentes locales
├── components/      # Componentes reutilizables (Navbar, Cards, Buttons)
├── context/         # Estado global (CartContext)
├── data/            # Mock Data (products.json)
├── pages/           # Vistas principales (Home, Novedades, ProductDetail)
├── App.jsx          # Configuración de Rutas
├── index.css        # Configuración de Tailwind v4 (@theme)
└── main.jsx         # Punto de entrada
