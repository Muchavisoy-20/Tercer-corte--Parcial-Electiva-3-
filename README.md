# AdminPanel - Gestión de Inventario

Un sistema administrativo premium para la gestión de inventario, productos y usuarios, desarrollado con **React 19**, **TypeScript**, **Vite**, **NestJS** y **MySQL**.

## 🎮 Descripción
El proyecto consiste en una plataforma robusta que permite a los administradores gestionar un catálogo de productos, controlar el inventario y administrar cuentas de usuario. Cuenta con una interfaz moderna con animaciones fluidas y un sistema de autenticación seguro basado en JWT.

## 🚀 Características Principales
✅ **Autenticación Segura**: Sistema de Login y Registro con validación de datos y protección de rutas.
✅ **Gestión de Productos**: CRUD completo de productos con carga de imágenes y categorización.
✅ **Dashboard Estadístico**: Panel de control con métricas clave del inventario.
✅ **Diseño Premium**: Interfaz oscura con efectos de "Glassmorphism" y degradados modernos.
✅ **Persistencia de Datos**: Almacenamiento seguro en MySQL y gestión de sesión persistente con Zustand.
✅ **Notificaciones en Tiempo Real**: Sistema de alertas visuales con Sonner.

## 📋 Requisitos Técnicos Cumplidos
✅ **Vite**: Base del proyecto frontend para un desarrollo ultrarrápido.
✅ **NestJS**: Backend escalable y modular con arquitectura de controladores y servicios.
✅ **TypeORM**: Gestión de base de datos MySQL con sincronización automática.
✅ **Zustand**: Manejo de estado global para la autenticación y el usuario.
✅ **Tailwind CSS 4.0**: Estilos de última generación sin configuración pesada.
✅ **Framer Motion**: Micro-interacciones y animaciones de entrada.
✅ **React Router v7**: Navegación de una sola página (SPA) fluida.
✅ **Seeding Automático**: Carga de datos de prueba al iniciar el servidor por primera vez.

## 📁 Estructura del Proyecto
```text
Parcial-Electiva/
├── backend/                # Servidor NestJS
│   ├── src/
│   │   ├── auth/          # Lógica de autenticación
│   │   ├── productos/     # Módulo de productos
│   │   ├── usuarios/      # Módulo de usuarios
│   │   ├── database/      # Configuración TypeORM
│   │   └── seed.service.ts # Semilla de datos iniciales
│   └── .env               # Configuración DB y JWT
├── frontend/               # Cliente React
│   ├── src/
│   │   ├── components/    # Componentes UI reutilizables
│   │   ├── layouts/       # Estructura de la página (Dashboard)
│   │   ├── pages/         # Vistas: Login, Register, Dashboard, Products
│   │   ├── store/         # Zustand: authStore
│   │   └── routes/        # Definición de rutas y protección
│   └── index.html
└── README.md
```

## 🛠️ Instalación
1. Clonar el repositorio.
2. Configurar el servidor MySQL (XAMPP recomendado).
3. Instalar dependencias en ambas carpetas:
```bash
# En la carpeta backend
npm install

# En la carpeta frontend
npm install
```

## 🎯 Cómo Ejecutar
### Modo Desarrollo
Para que el sistema funcione, ambos servidores deben estar corriendo:

**Backend:**
```bash
cd backend
npm run start:dev
```
*Abre [http://localhost:8080/api](http://localhost:8080/api) para ver el servidor.*

**Frontend:**
```bash
cd frontend
npm run dev
```
*Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador.*

## 📖 Flujo de Uso
1. **Inicio**: El sistema te redirige automáticamente al `/login`.
2. **Autenticación**: Usa las credenciales de prueba o regístrate.
3. **Exploración**:
   - **Dashboard**: Vista general del sistema.
   - **Productos**: Gestiona el catálogo de inventario.
4. **Cerrar Sesión**: Salida segura limpiando el estado de la aplicación.

## 🔐 Credenciales de Prueba
- **Email**: `admin@email.com`
- **Contraseña**: `admin123`

## 🔧 Configuración Técnica
### Base de Datos
El proyecto usa una base de datos MySQL llamada `tienda_virtual`. El backend sincroniza automáticamente las tablas gracias a la propiedad `synchronize: true` de TypeORM.

### Prevención de Errores de DOM
Para evitar el error de `insertBefore` causado por el **Traductor de Google**, se ha configurado el atributo `lang="es"` en el `index.html`. Se recomienda no traducir la página manualmente si se usa React.

## 📦 Dependencias Principales
- **React 19**: Biblioteca de UI.
- **NestJS 11**: Framework de backend.
- **Zustand**: Estado global ligero.
- **Lucide React**: Iconos premium.
- **Axios**: Peticiones HTTP al backend.
- **TypeORM**: ORM para MySQL.

## 👨‍💻 Autores
- **Vanya Catalina Portilla Sanchez**
- **Andres Alirio Bubrano Solarte**
- **Franklin Sneider Cordoba de la Cruz**
- **Jhonatan Mauricio Muchavisoy**
- **Jaider Chindoy**

---
Desarrollado como proyecto para la asignatura de **Electiva III**.
