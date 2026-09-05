# 💰 Software Cost Estimator — Plataforma Interactiva de Cotización Digital

Plataforma web interactiva orientada a la estimación y cálculo dinámico de presupuestos para proyectos de desarrollo de software (Web, iOS y Android), estructurada mediante un flujo paso a paso (*Wizard UI*) con diseño Mobile-First y persistencia en cliente.

![Software Cost Estimator Status](https://img.shields.io/badge/Cost_Estimator-v1.5_Interactive-00e5ff?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-Semantic_Layout-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Flexbox_&_Grid-1572B6?style=for-the-badge&logo=css3)
![JavaScript ES6+](https://img.shields.io/badge/JavaScript-Dynamic_Engine-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 Tabla de Contenidos

1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Características Principales](#-características-principales)
3. [Flujo del Wizard (Paso a Paso)](#-flujo-del-wizard-paso-a-paso)
4. [Motor de Cálculo Interactivo](#-motor-de-cálculo-interactivo)
5. [Tecnologías y Conceptos Clave](#-tecnologías-y-conceptos-clave)
6. [Estructura del Proyecto](#-estructura-del-proyecto)
7. [Instalación y Uso](#-instalación-y-uso)
8. [Autores](#-autores)

---

## 📖 Descripción del Proyecto

El **Software Cost Estimator** resuelve la dificultad habitual que experimentan clientes y gerentes de producto para calcular de manera transparente los costos y tiempos involucrados en el desarrollo de software a la medida. 

El sistema guía al usuario a través de un recorrido interactivo de 4 pasos, recopilando requerimientos de plataforma y alcances técnicos para proyectar en tiempo real un presupuesto estimado en dólares (USD) y las semanas de ingeniería requeridas.

---

## 🔥 Características Principales

- 🧭 **Flujo Wizard Paso a Paso**: Indicador visual interactivo de progreso (`25%`, `50%`, `75%`, `100%`) que orienta al usuario a través del formulario.
- 📱 **Diseño Mobile-First Responsivo**: Adaptabilidad completa para smartphones, tablets y pantallas de escritorio sin dependencias de frameworks CSS pesados.
- ⚡ **Motor de Cálculo Dinámico en JavaScript (`estimator.js`)**:
  - Persistencia de opciones seleccionadas entre páginas mediante la API de `SessionStorage`.
  - Cálculo automático de costos base por plataforma (Web, iOS, Android) y sinergias multi-plataforma.
  - Proyección de horas de desarrollo estimadas y semanas de calendario.
- 📬 **Simulador de Envío de Propuesta**: Manejo interactivo del formulario final con generación de tarjeta de confirmación y resumen desglosado.

---

## 🗺️ Flujo del Wizard (Paso a Paso)

```text
index1.html (Paso 1: Landing Page)
   │
   └──> index2.html (Paso 2: Selección de Plataforma - Web, iOS, Android)
          │
          └──> index3.html (Paso 3: Detalle de Costos, Categorías y Métricas)
                 │
                 └──> index4.html (Paso 4: Resumen Dinámico y Formulario de Contacto)
```

---

## ⚙️ Motor de Cálculo Interactivo

El motor implementado en `estimator.js` procesa los requerimientos seleccionados bajo los siguientes parámetros de referencia:

| Plataforma | Costo Base Referencial | Horas de Ingeniería |
| :--- | :--- | :--- |
| **Web App** | $12,000 USD | ~180 horas |
| **iOS (Nativo)** | $16,000 USD | ~240 horas |
| **Android (Nativo)** | $15,000 USD | ~220 horas |

*Nota: Cuando se seleccionan múltiples plataformas, el motor aplica automáticamente un factor de descuento por reutilización de arquitectura de backend y diseño UX (15%).*

---

## 🛠️ Tecnologías y Conceptos Clave

- **HTML5 Semántico:** Uso exhaustivo de `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>` y formularios accesibles.
- **CSS3 Avanzado:** Flexbox para alineaciones flexibles, CSS Grid para distribución de tarjetas, y selectores pseudo-clase para radio buttons y checkboxes estilizados.
- **JavaScript Moderno:** Manipulación del DOM, eventos `change` y `submit`, almacenamiento de sesión con `sessionStorage`.

---

## 📂 Estructura del Proyecto

```text
Software-Cost-Estimator/
├── index1.html        # Landing page y llamado a la acción inicial
├── index2.html        # Wizard Paso 2: Selección de Plataforma
├── index3.html        # Wizard Paso 3: Desglose de categorías y habilidades
├── index4.html        # Wizard Paso 4: Resumen interactivo de costos y contacto
├── styles.css         # Hoja de estilos principal (+920 líneas responsivas)
├── estimator.js       # Motor JavaScript de persistencia y cálculo dinámico
├── .gitignore         # Configuración limpia de Git
└── README.md          # Documentación del proyecto
```

---

## 🚀 Instalación y Uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/GabrielaRincon06/Proyecto-Gabriela-David.git Software-Cost-Estimator
   cd Software-Cost-Estimator
   ```
2. Abrir directamente `index1.html` en cualquier navegador web moderno, o ejecutar un servidor local:
   ```bash
   python -m http.server 8000
   ```
3. Navega a `http://localhost:8000/index1.html` e interactúa con el cotizador seleccionando diferentes plataformas en el Paso 2 para ver reflejado el cálculo dinámico en el Paso 4.

---

## 👩‍💻 Autores

- **Maria Gabriela Rincón León** ([@GabrielaRincon06](https://github.com/GabrielaRincon06))
- **David Leonardo Martínez Pérez**
- Proyecto colaborativo de desarrollo front-end enfocado en UI/UX moderna, maquetación semántica y lógica de negocio en cliente.