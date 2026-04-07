# Tech Solutions - Gestión Administrativa (Módulo 8)

Este proyecto es una plataforma de gestión de usuarios desarrollada con **Node.js**, **Express** y **Sequelize**, actualizada para cumplir con los requisitos del Módulo 8: Autenticación mediante **JWT (JSON Web Tokens)** y persistencia de archivos con **Multer**.

## 🚀 Funcionalidades Principales

* **Autenticación Segura**: Implementación de login para la generación de tokens JWT.
* **Seguridad de Rutas**: Middlewares personalizados para proteger rutas sensibles.
* **Carga de Archivos**: Sistema de subida de imágenes de perfil para usuarios.
* **Persistencia**: Base de datos PostgreSQL integrada con Sequelize.
* **Motor de Vistas**: Renderizado dinámico mediante Handlebars (HBS).
* **Auditoría**: Sistema de logs que registra cada petición al servidor.

## 🛠️ Tecnologías Utilizadas

* Backend: Node.js, Express.
* Base de Datos: PostgreSQL, Sequelize.
* Seguridad: JSON Web Token (JWT).
* Manejo de Archivos: Multer.
* Vistas: Express-Handlebars.
* Estilos: Bootstrap 5.

## 📁 Estructura del Proyecto

M7Git/
├── logs/                 # Registros de actividad (.txt)
├── public/               # Archivos estáticos (CSS, JS)
├── src/
│   ├── config/           # Conexión a la base de datos (entrega_m7)
│   ├── controllers/      # Lógica de negocio (registrarUsuario, etc.)
│   ├── middlewares/      # auth.middleware y multer.middleware
│   ├── models/           # Modelos de Sequelize
│   └── routes/           # Definición de rutas (index.js)
├── uploads/              # Carpeta de destino para imágenes subidas
├── views/                # Plantillas Handlebars
└── app.js                # Punto de entrada del servidor

## ⚙️ Instalación y Configuración

1. Clonar el repositorio.
2. Instalar dependencias:
   npm install
3. Configurar variables de entorno en el archivo `.env`:
   PORT=3000
   DB_NAME=entrega_m7
   DB_USER=tu_usuario
   DB_PASS=tu_password
   DB_HOST=localhost

## 🚦 Instrucciones de Prueba (Flujo de Usuario)

Para evaluar el correcto funcionamiento del Módulo 8, siga estos pasos:

1. **Paso 1 - Login**: Acceder a `http://localhost:3000/login`. Al ingresar las credenciales, el sistema generará un Token JWT y lo almacenará en el `localStorage` del navegador.
2. **Paso 2 - Registro**: Dirigirse a `http://localhost:3000/registro`. El formulario permitirá ingresar el nombre del usuario y seleccionar una imagen.
3. **Paso 3 - Validación**: Al presionar el botón de registro, el cliente envía el Token en los headers (`Authorization: Bearer <token>`). El servidor valida el token y Multer procesa la imagen, guardándola en la carpeta `/uploads`.
4. **Paso 4 - Confirmación**: Los datos se almacenan en la base de datos `entrega_m7`.

## 🛡️ Seguridad

El sistema utiliza un middleware de verificación que comprueba la firma del token antes de permitir cualquier operación de escritura o subida de archivos, garantizando que solo usuarios autenticados puedan modificar el sistema.


---

### 📝 NOTA TÉCNICA: Resolución del error "Token inválido o expirado"

En caso de encontrar el error `❌ Error: Token inválido o expirado` durante las pruebas, considere los siguientes puntos de resolución técnica implementados en este proyecto:

1. **Sincronización de Secret Key**: El servidor utiliza una firma digital única (`secret_key_m8`). Si el token fue generado con una llave distinta o previa a la última actualización del servidor, la validación fallará por seguridad.
2. **Persistencia en Cliente**: El navegador puede mantener almacenado un token antiguo en el `localStorage`. Para solucionar esto, ejecute `localStorage.clear()` en la consola del desarrollador y reinicie el flujo de Login.
3. **Expiración de Sesión**: Los tokens tienen un tiempo de vida de **1 hora**. Una vez cumplido este tiempo, el middleware de seguridad rechazará cualquier petición a la ruta `/api/subir` hasta que se genere un nuevo acceso.

---

---
Desarrollado por Marcelo Mardones Guzmán - 2026

