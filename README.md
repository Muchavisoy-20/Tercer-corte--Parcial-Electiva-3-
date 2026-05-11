# Gestión de Inventario - SGI (Final)

Este proyecto ha evolucionado de un gestor de tareas básico a un robusto **Sistema de Gestión de Inventario (SGI)** diseñado para el control total de existencias, métricas de negocio y salud operativa.

🔗 **Repositorio Oficial**: [https://github.com/PortillaVanya/Segundo-Parcial-Electiva3.git](https://github.com/PortillaVanya/Segundo-Parcial-Electiva3.git)

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
- **Trazabilidad Total**: Historial completo de movimientos (entradas, ajustes, precios).
- **Acceso Exclusivo**: El sistema es exclusivo para el rol **Admin** en esta etapa.

## 🌟 Características Destacadas
✅ **Dashboard BI**: Métricas de salud, gráfico de distribución y lista de alertas de stock.
✅ **Historial de Auditoría**: Registro cronológico de todos los movimientos de inventario.
✅ **Exportación de Datos**: Función para descargar el catálogo completo en formato **CSV**.
✅ **Gestión de Perfil**: Vista dedicada para la información del usuario administrador.
✅ **Manejo de Errores**: Filtro global de excepciones para respuestas de API estandarizadas.
✅ **Diseño Premium**: Interfaz oscura con animaciones de Framer Motion y efectos glass.

## 📋 Requerimientos de Usuario (Historias de Usuario)

### Épica 1: Gestión de Existencias (Inventory Health)
- **HU 1**: Como Admin, quiero ver un dashboard con el valor total del inventario y alertas de stock bajo.
- **HU 2**: Como Admin, quiero visualizar la distribución de mis productos por categoría mediante gráficos.

### Épica 2: Control de Catálogo
- **HU 3**: Como Admin, quiero gestionar categorías y productos con validaciones en tiempo real.
- **HU 4**: Como Admin, quiero exportar mi inventario a CSV para reportes externos.

### Épica 3: Trazabilidad y Auditoría
- **HU 5**: Como Admin, quiero un registro histórico de todos los cambios en stock o precio para auditar el sistema.

## 📁 Estructura del Proyecto
```text
Parcial-Electiva/
├── backend/                # Servidor NestJS
│   ├── src/
│   │   ├── auth/          # Autenticación JWT
│   │   ├── productos/     # Gestión de catálogo y KPIs
│   │   ├── inventario/    # Logs y movimientos de stock
│   │   ├── common/        # Filtros globales y utilidades
│   │   └── seed.service.ts # Semilla de datos
│   └── docker-compose.yml # Orquestación de DB y API
├── frontend/               # Cliente React 19
│   ├── src/
│   │   ├── pages/         # Dashboard, Products, History, Profile
│   │   ├── store/         # Estado: authStore, inventoryStore, productStore
│   │   └── layouts/       # Sidebar y navegación
│   └── .env               # VITE_API_URL
└── README.md
```

## 🛠️ Instalación y Ejecución

Sigue estos pasos para correr el proyecto:

### Opción A: Con Docker (Recomendado)
Asegúrate de tener Docker Desktop instalado y corriendo:
```bash
cd backend
docker-compose up --build -d
```
*Esto levantará MySQL y el Backend automáticamente.*

### Opción B: Ejecución Manual (Local)
1. **Base de Datos**: Inicia MySQL (XAMPP) y crea la DB `tienda_virtual`.
2. **Backend**:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔐 Credenciales de Acceso
- **URL Frontend**: [http://localhost:5173/](http://localhost:5173/)
- **Email**: `admin@email.com`
- **Contraseña**: `admin123`

## 📦 Dependencias Principales
- **React 19** & **Vite**: Frontend moderno y veloz.
- **NestJS 11**: Backend robusto y modular.
- **TypeORM**: Gestión eficiente de MySQL.
- **Zustand**: Gestión de estado simple y potente.
- **Lucide React** & **Framer Motion**: UI premium y animada.

## 👨‍💻 Autores
- **Vanya Catalina Portilla Sanchez**
- **Andres Alirio Bubrano Solarte**
- **Franklin Sneider Cordoba de la Cruz**
- **Jhonatan Mauricio Muchavisoy**
- **Jaider Chindoy**

---
Desarrollado para la asignatura de **Electiva III**.
