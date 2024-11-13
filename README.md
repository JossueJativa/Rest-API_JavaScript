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