# Proyecto API REST en Node,js con SQLite

Este proyecto es una API REST desarrollada en Node.js utilizando Express y SQLite como base de datos. La estructura del proyecto facilita la creación de modelos, controladores y rutas, permitiendo gestionar usuarios y roles con autenticación y autorización.

## Tabla de contenidos
* Requisitos
* Instalación
* Estructura del Proyecto
* Configuración de la Base de Datos
* Modelos
* Rutas y Controladores
* Validaciones y Middlewares
* Ejecución del Proyecto
* Endpoints

### Requisitos
Node.js (versión 14 o superior)
npm (normalmente incluido con Node.js)
SQLite (como base de datos embebida)

### Instalación
1. Clona el repositorio:

> git clone https://github.com/JossueJativa/Rest-API_JavaScript.git

2. Accede al directorio del proyecto:

> cd Rest-API_JavaScript

3. Instala las dependencias necesarias:

> npm install

Estructura del proyecto:

```
project/
├── controllers/        # Contiene los controladores de las rutas
│   ├── auth.controller.js
│   └── user.controller.js
│
├── middlewares/        # Contiene middlewares personalizados
│   ├── checkcampus.js
│   └── validateRoles.js
│
├── models/             # Define los modelos y la configuración de Sequelize
│   ├── user.model.js
│   ├── role.model.js
│   └── index.js        # Inicializa y exporta la conexión de Sequelize
│
├── routes/             # Define las rutas para los endpoints
│   ├── auth.routes.js
│   └── user.routes.js
│
├── dbConnection.js     # Conexión y sincronización de la base de datos
├── app.js              # Punto de entrada principal de la aplicación
└── package.json        # Configuración del proyecto y dependencias
```

### Configuración de la Base de Datos
El proyecto utiliza SQLite como base de datos a través de Sequelize. La configuración de la base de datos se encuentra en models/index.js, donde se inicializa la instancia de Sequelize y se define la ubicación del archivo de la base de datos (database.sqlite).

### Modelos
#### User Model
Define los atributos y validaciones para la entidad User:

* id: Identificador único (UUID).
name: Nombre del usuario (obligatorio).
* email: Email único del usuario (obligatorio).
* password: Contraseña del usuario (obligatorio).
* role: Rol del usuario (por defecto es USER_ROLE).
El modelo User se define en models/user.model.js.

#### Role Model
Define la entidad Role con un único atributo:

* role: Define el rol del usuario, que debe ser único.
Este modelo se encuentra en models/role.model.js.

#### Sincronización Automática
Al ejecutar el proyecto, Sequelize verifica y crea las tablas automáticamente si no existen, utilizando la configuración sync({ force: false }) para evitar que se eliminen datos existentes.

### Rutas y Controladores
Rutas
Las rutas están organizadas en el directorio routes y enlazadas con los controladores correspondientes:

Auth Routes (auth.routes.js): Rutas de autenticación, como POST /login.
User Routes (user.routes.js): Rutas de gestión de usuarios y roles (GET, POST, PUT, DELETE).

### Controladores
Los controladores están ubicados en el directorio controllers y contienen la lógica de cada endpoint:

auth.controller.js: Controlador de autenticación (método login).
user.controller.js: Controlador de usuario que gestiona las operaciones CRUD.

### Validaciones y Middlewares
El proyecto incluye varios middlewares para validación y control de acceso:

* validateCampus: Middleware personalizado para validar que todos los campos requeridos están presentes en el request.
* check: Utiliza express-validator para realizar validaciones en los campos de entrada (como el email y la longitud de la contraseña).
* validateJWT: Verifica que el token de autenticación JWT sea válido.
* isAdminRole: Verifica que el usuario tenga el rol ADMIN_ROLE antes de permitir el acceso a ciertas rutas (por ejemplo, eliminación de usuarios).

## Ejecución del proyecto
Para iniciar el servidor:

> npm run start

El servidor estará disponible en http://localhost:8000 o por default el 3000 (puedes configurar el puerto en app.js si deseas cambiarlo).

### Endpoints
Autenticación
* POST /api/auth/login: Endpoint para autenticación de usuario.
    * Body:
    ```
    {
    "email": "user@example.com",
    "password": "password123"
    }
    ```
Respuesta:
```
{
  "token": "JWT_TOKEN"
}
```

#### Usuarios
* GET /api/users: Lista todos los usuarios (solo para administradores).

* POST /api/users: Crea un nuevo usuario.

    * Body:
    ```
    {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "USER_ROLE"
    }
    ```
* PUT /api/users/
: Actualiza la información de un usuario específico por ID.

* DELETE /api/users/
: Elimina un usuario específico (requiere rol ADMIN_ROLE y autenticación).