# 🚀 Sistema de Gestión Tech Solutions - Módulo 6

Este proyecto representa la culminación de la **Parte 1 del Módulo 6**. Se ha construido un servidor robusto con **Node.js** y **Express**, aplicando una arquitectura limpia, modular y preparada para el escalamiento.

---

## 📂 Arquitectura del Proyecto

Para este desarrollo, se aplicó una separación de responsabilidades (SoC), organizando el código en directorios especializados:

* **`app.js`**: 🧠 Punto de entrada principal. Configura el motor Handlebars y los middlewares globales.
* **`routes/`**: 📍 Contiene la lógica de los endpoints. Se utilizó `Express Router` para desacoplar las rutas del servidor principal.
* **`data/`**: 📦 Persistencia de datos en archivos planos (`usuarios.json`).
* **`logs/`**: 📝 Registro histórico de actividad (`log.txt`) generado por middleware de auditoría.
* **`public/`**: 🎨 Recursos estáticos (CSS, JS, imágenes) servidos de forma directa.
* **`views/`**: 🎭 Plantillas dinámicas:
    * `layouts/`: Estructura base maestra (`main.hbs`).
    * `partials/`: Componentes reutilizables (**Header** y **Footer**).

---

## 🛠️ Stack Tecnológico

* **Runtime**: Node.js (v18+) 🟢
* **Framework**: Express.js 🚂
* **Motor de Plantillas**: Handlebars (HBS) 🎭
* **Gestión de Variables**: Dotenv 🔐
* **Estándar de Código**: ES Modules (`import/export`) 📦
* **Persistencia**: Módulo nativo `fs` (File System) 📑

---

## ⚙️ Configuración e Instalación

Siga estos pasos para poner en marcha el servidor:

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Configurar entorno**:
    Cree un archivo `.env` en la raíz con el siguiente contenido:
    ```env
    PORT=3000
    ```

3.  **Ejecutar el servidor**:
    * **Desarrollo**: `npm run dev` (Recomendado)
    * **Producción**: `npm start`

---

## 📝 Decisiones de Diseño

### 1. Enrutamiento Modularizado
A diferencia de aplicaciones básicas, las rutas se extrajeron a la carpeta `routes/`. Esto permite que el archivo `app.js` permanezca limpio y se centre únicamente en la configuración del entorno.

### 2. Rutas Absolutas Robustas
Se implementó `process.cwd()` para la lectura de la base de datos JSON. Esto garantiza que el servidor encuentre los archivos de datos sin importar desde qué directorio se ejecute el proceso de Node. 📍

### 3. Sistema de Auditoría (Middleware)
Se diseñó un middleware personalizado que intercepta cada solicitud y registra en tiempo real el método HTTP, la URL y la marca de tiempo en `logs/log.txt`. 🕒

---

## 🔗 Endpoints del Sistema

| Ruta | Método | Función |
| :--- | :--- | :--- |
| `/` | `GET` | Dashboard de inicio con datos dinámicos. |
| `/usuarios` | `GET` | Renderizado de lista de usuarios desde JSON. |
| `/status` | `GET` | Estado operacional y tiempo de actividad (Uptime). |

---

> **Nota**: Este proyecto ha sido desarrollado como parte del programa de formación **FullStack JavaScript Trainee 2026**. ✅
> **Nota**: Iconos o caracteres especiales obtenidos utilizando las teclas "windows + ."
>**Nota**: Enlace a carpeta subida a Google Drive https://drive.google.com/drive/folders/11D4T-PUvtwxIYrQYA4jD6Emj-B1dGce2?usp=sharing
>**nota**: Al intentar instalar nodemon y ejecutar run dev causaba conflicto de compativilidad, asique decidí ejecutarlo con "npm start"


______________________________________________________________________________________________________________________________________________
# Segunda parte del trabajo 

🚀 Tech Solutions: Sistema de Gestión de Usuarios (M7)
Desarrollador: Marcelo Mardones Guzmán

Estado: Entregable Final - Módulo 7 (Persistencia Relacional)

Este proyecto es una aplicación web FullStack diseñada para la administración técnica de usuarios. La arquitectura ha sido migrada de un sistema de archivos planos (JSON) a una base de datos relacional robusta, implementando el patrón MVC y Sequelize ORM.

# 📑 Índice
Requerimientos Cumplidos

Stack Tecnológico

Estructura del Proyecto

Instalación y Configuración

Endpoints Disponibles

# ✅ Requerimientos Cumplidos
Persistencia en SQL: Integración completa con PostgreSQL.

Operaciones CRUD: * Create: Registro de usuarios mediante formulario estilizado.

Read: Visualización dinámica de la base de datos en una tabla/grid.

Delete: Eliminación de registros con confirmación de seguridad.

Diseño UI/UX: Interfaz profesional construida con Bootstrap 5 y CSS personalizado (Efectos de elevación y botones CTA).

Arquitectura: Separación clara de responsabilidades (Modelos, Vistas y Controladores).

# 💻 Stack Tecnológico
Backend: Node.js, Express.js.

Frontend: Handlebars (HBS), Bootstrap 5, Bootstrap Icons.

Base de Datos: PostgreSQL.

ORM: Sequelize (v6+).

Variables de Entorno: Dotenv (para protección de credenciales

# 📁 Estructura del Proyecto
EntregaM7/
├── public/               # Estilos CSS y activos estáticos
├── src/
│   ├── config/           # Configuración de conexión a PostgreSQL
│   ├── controllers/      # Lógica de negocio (Sequelize functions)
│   ├── models/           # Definición del modelo 'Usuario'
│   ├── routes/           # Definición de rutas Express
│   └── app.js            # Inicialización del servidor y Middleware
├── views/                # Plantillas Handlebars
│   ├── partials/         # Componentes reutilizables (Navbar, Header)
│   ├── layouts/          # main.hbs (Estructura base)
│   ├── home.hbs          # Panel de bienvenida
│   ├── usuarios.hbs      # Listado de usuarios registrados
│   └── registro.hbs      # Formulario de alta de usuarios
├── .env                  # Configuración de base de datos (Ejemplo incluido)
└── package.json          # Gestión de scripts y dependencias

# 🚀 Instalación y Configuración
## 1. Preparación de la Base de Datos
Asegúrese de tener PostgreSQL instalado y cree una base de datos vacía:

CREATE DATABASE tech_solutions_db;

## 2. Configuración del Entorno
Cree un archivo .env en la raíz con sus credenciales:

PORT=3000
DB_NAME=tech_solutions_db
DB_USER=postgres
DB_PASS=su_contraseña
DB_HOST=localhost

## Ejecución del Proyecto

#   Instalar dependencias
    npm install

#   Iniciar en modo desarrollo (Nodemon)
    npm run dev

# 🔗 Endpoints Disponibles

Método /Ruta                     /  Descripción

GET    /Home                     / Dashboard principal
GET    /usuarios,                /Lista todos los usuarios de PostgreSQL
GET    /registro,                /Muestra el formulario de registro
POST   /registro,                /Guarda un nuevo usuario en la DB
POST   /usuarios/eliminar/:id,   /Elimina un usuario por su ID


> **Nota**: El sistema sincroniza automáticamente los modelos con la base de datos al iniciar el servidor mediante db.sync().

> **Nota**: El servidor utiliza db.sync({ force: false }) para asegurar que las tablas se creen automáticamente al iniciar la aplicación sin borrar los datos existentes.

>**nota**: Esta segunda entrega del trabajo (Modulo 7) se logra utilizar nodemon lo que en la version anterior no permitía por compatibilidad.