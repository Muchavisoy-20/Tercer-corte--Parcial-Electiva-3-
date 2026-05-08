# AdminPanel - Gestión de Inventario (Final)

Este proyecto ha evolucionado de un gestor de tareas básico a un robusto **Sistema de Gestión de Inventario (SGI)** diseñado para el control total de existencias, métricas de negocio y salud operativa.

## 🚀 Justificación de la Arquitectura

### Migración: MongoDB/Express → MySQL/NestJS
La migración fue fundamental para garantizar la **integridad de los datos** y la **escalabilidad** del sistema:
- **Integridad Referencial**: El uso de MySQL permite definir relaciones estrictas entre Productos, Categorías e Inventario, evitando datos huérfanos.
- **Escalabilidad con NestJS**: Su arquitectura modular facilita el crecimiento del proyecto y la inyección de dependencias.
- **Seguridad Robusta**: Implementación de JWT con Guards para proteger endpoints críticos.
- **Métricas BI**: El motor relacional permite realizar cálculos complejos de salud del stock en tiempo real.

## 🎯 Objetivos del Sistema
- **Control de Stock Crítico**: Visualización inmediata de productos con existencias bajas o agotadas.
- **Gestión de Categorías**: Organización lógica del catálogo con CRUD dedicado.
- **Logs de Actividad**: Registro automático de entradas, ajustes manuales y cambios de precio.
- **Acceso Exclusivo**: El sistema es exclusivo para el rol **Admin** en esta etapa.

## 🌟 Características Destacadas
✅ **Dashboard BI**: Métricas de salud, gráfico de distribución y lista de alertas de stock.
✅ **Gestión Avanzada**: CRUD de productos y categorías con validaciones en tiempo real.
✅ **Paginación Inteligente**: Control de visualización con selector de filas (10/20).
✅ **Diseño Premium**: Interfaz oscura con animaciones de Framer Motion y efectos glass.
✅ **Seguridad**: Rutas protegidas y registro de actividad Morgan en el backend.

## 📋 Requerimientos de Usuario (Historias de Usuario)

### Épica 1: Gestión de Existencias (Inventory Health)
- **HU 1**: Como Admin, quiero ver un dashboard con el valor total del inventario y alertas de stock bajo para tomar decisiones de compra.
- **HU 2**: Como Admin, quiero visualizar la distribución de mis productos por categoría mediante gráficos interactivos.

### Épica 2: Control de Catálogo
- **HU 3**: Como Admin, quiero crear, editar y eliminar categorías para organizar mejor mis productos.
- **HU 4**: Como Admin, quiero filtrar productos por categoría y buscarlos por nombre en una tabla paginada.

### Épica 3: Trazabilidad y Auditoría
- **HU 5**: Como Admin, quiero un registro (log) automático cada vez que el stock o el precio de un producto cambie para auditar ajustes manuales.

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

## 🛠️ Instalación y Configuración para Estudiantes

Sigue estos pasos para correr el proyecto localmente sin errores:

### 1. Requisitos Previos
- **Node.js** (v18 o superior)
- **MySQL/MariaDB** (Se recomienda **XAMPP** o **MySQL Installer**)

### 2. Configuración de Base de Datos
1. Inicia el servicio de MySQL en tu panel de XAMPP.
2. Crea una base de datos vacía llamada `tienda_virtual` (puedes hacerlo desde phpMyAdmin).
   *Nota: El sistema creará las tablas y datos de prueba automáticamente al iniciar el backend por primera vez.*

### 3. Configuración de Variables de Entorno
Debes crear los archivos `.env` basados en los ejemplos proporcionados:

**En la carpeta `backend/`:**
1. Copia `.env.example` y cámbiale el nombre a `.env`.
2. Asegúrate de que los valores de `DB_USERNAME`, `DB_PASSWORD` y `DB_PORT` coincidan con tu configuración local (XAMPP por defecto usa `root`, contraseña vacía y puerto `3306`).

**En la carpeta `frontend/`:**
1. Copia `.env.example` y cámbiale el nombre a `.env`.

### 4. Instalación de Dependencias
Abre dos terminales y ejecuta lo siguiente:

```bash
# Terminal 1 (Backend)
cd backend
npm install

# Terminal 2 (Frontend)
cd frontend
npm install
```

## 🎯 Ejecución del Proyecto

Para que el sistema funcione, ambos servidores deben estar activos:

**Servidor Backend (NestJS):**
```bash
cd backend
npm run start:dev
```
*El servidor estará disponible en [http://localhost:8080](http://localhost:8080). Podrás ver la documentación de la API en [http://localhost:8080/api-docs](http://localhost:8080/api-docs).*

**Cliente Frontend (React/Vite):**
```bash
cd frontend
npm run dev
```
*Abre [http://localhost:5173/](http://localhost:5173/) para usar la aplicación.*

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
