# GymRat Daily - Tu Entrenador Personal Inteligente

![GymRat Daily Logo](/public/vite.svg)

> **Desarrollado por [ACHADev](https://github.com/ACHADev)**

GymRat Daily es una Aplicación Web Progresiva (PWA) moderna y robusta diseñada para transformar tu dispositivo en un entrenador personal completo. Gestiona tus rutinas, controla tus tiempos de descanso con precisión y visualiza tu progreso con un sistema de gamificación integrado.

## 🚀 Características Principales

- **🏋️ Gestión de Rutinas Avanzada**: Crea, edita y personaliza rutinas ilimitadas organizadas por días de la semana.
- **⏱️ Modo Entrenamiento Inmersivo**: Interfaz libre de distracciones con cronómetro de sesión y temporizador de descanso automático entre series.
- **📊 Seguimiento de Progreso**: Historial detallado de entrenamientos, gráficas de volumen de carga y récords personales.
- **🏆 Sistema de Gamificación y Logros**: Sube de nivel, desbloquea trofeos y mantén tu racha de entrenamiento para mantener la motivación al máximo.
- **💡 Sugerencias Inteligentes**: Accede a rutinas predefinidas por expertos para niveles Principiante, Intermedio y Avanzado.
- **🌗 Modo Oscuro / Claro**: Interfaz adaptable que cuida tu vista y batería, con diseño consistente en toda la aplicación.
- **📱 PWA & Offline First**: Instálala como una app nativa en iOS/Android y úsala sin conexión a internet. Todos los datos persisten localmente.

## 🛠️ Tecnologías Utilizadas

Este proyecto ha sido construido utilizando las últimas tecnologías del ecosistema React:

- **Frontend**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Diseño responsivo y sistema de temas)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) (Transiciones fluidas y micro-interacciones)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Estado Global**: React Context API
- **Persistencia**: LocalStorage + IndexedDB (vía servicios personalizados)
- **Navegación**: React Router DOM v6
- **Utilidades**: date-fns, uuid, clsx

## 📦 Instalación y Despliegue

### Requisitos Previos

- Node.js (v18 o superior)
- pnpm (recomendado) o npm

### Pasos

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/ACHADev/gymrat-daily.git
   cd gymrat-daily
   ```

2. **Instalar dependencias**:

   ```bash
   pnpm install
   ```

3. **Iniciar servidor de desarrollo**:

   ```bash
   pnpm dev
   ```

4. **Construir para producción**:
   ```bash
   pnpm build
   ```

## 🧪 Tests

El proyecto incluye una suite de pruebas unitarias para asegurar la integridad de los datos y cálculos críticos.

```bash
npx vitest run
```

## 👤 Autor

**Desarrollado con ❤️ y código limpio por ACHADev.**

- **GitHub**: [@ACHADev](https://github.com/ACHADev)
- **Portafolio**: [ACHADev Portfolio](https://achadev.com)

---

© 2026 ACHADev. Todos los derechos reservados.
