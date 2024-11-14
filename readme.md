# Aplicación de Chat en Tiempo Real

## Descripción

Esta es una aplicación de chat en tiempo real desarrollada utilizando una arquitectura monorepo. El proyecto incluye tanto el frontend como el backend en un solo repositorio, lo que facilita el manejo de dependencias y la gestión del código compartido. La aplicación está construida con TypeScript y utiliza tecnologías como Node.js, Express, Socket.IO, Vue.js y Tailwind CSS.

## Características

- Chat en tiempo real: Comunicación instantánea entre usuarios utilizando WebSockets.
- Autenticación JWT: Seguridad en las comunicaciones mediante tokens JWT.
- Arquitectura Monorepo: Organización eficiente del código compartido entre frontend y backend.
- TypeScript: Tipado estático para un código más robusto y mantenible.
- Webpack: Empaquetado y optimización de los archivos para producción.
- Tailwind CSS: Estilos rápidos y consistentes utilizando clases utilitarias.

## Estructura del Proyecto

La arquitectura de carpetas de la aplicación es la siguiente:

```arduino
client
  - api
  - assets
  - components
  - composables
  - models
  - router
  - services
  - store
  - styles
  - types
  - utils
  - views
  App.vue
  main.ts
dist
node_modules
public
  - index.html
server
  - config
  - controllers
  - database
  - middlewares
  - models
  - routes
  - schema
  - types
  - utils
  main.ts
webpack
.env
.env.local
.gitignore
package.json
pnpm-lock.yaml
tailwindcss.config.json
tsconfig.json
```

## Descripción de Carpetas y Archivos Principales

- client/: Contiene el código del frontend de la aplicación.
  - api/: Configuración y manejo de llamadas a APIs.
  - assets/: Recursos estáticos como imágenes y estilos globales.
  - components/: Componentes Vue reutilizables.
  - composables/: Funciones reutilizables de composición (Composition API).
  - models/: Modelos y tipados utilizados en el frontend.
  - router/: Configuración de rutas de Vue Router.
  - services/: Servicios para interacción con el backend.
  
- server/: Contiene el código del backend de la aplicación.
  - config/index.ts: Variables de entorno y configuración general.
  - controllers/: Lógica de negocio para manejar las solicitudes.
  - auth.ts: Controlador para autenticación y manejo de usuarios.
  - messages.ts: Controlador para manejo de mensajes.
  - sockets.ts: Lógica para manejo de conexiones WebSocket.
  - database/config.ts: Configuración de la conexión a la base de datos.
  - middlewares/: Middlewares de Express para validaciones y seguridad.
  - validate-fields.ts: Validación de campos en las solicitudes.
  - validate-jwt.ts: Validación de tokens JWT.
  - models/: Modelos y clases utilizadas en el backend.
  - server.ts: Configuración y arranque del servidor Express.
  - sockets.ts: Configuración de Socket.IO.
  - routes/: Definición de rutas del API REST.
  - auth.ts: Rutas relacionadas con autenticación.
  - index.ts: Archivo principal de rutas.
  - messages.ts: Rutas para manejo de mensajes.
  - schema/: Esquemas de Mongoose para la base de datos.
  - message.ts: Esquema para mensajes.
  - user.ts: Esquema para usuarios.
  - types/express.d.ts: Definiciones de tipos para extensiones de Express.
  - utils/jwt.ts: Utilidades para manejo de tokens JWT.
  - main.ts: Punto de entrada del backend.
  
- public/: Contiene el archivo index.html que sirve como plantilla para la aplicación.
- dist/: Carpeta donde se generan los archivos de producción después del build.
- webpack/: Configuraciones de Webpack para el build del proyecto.
- .env: Archivo de variables de entorno.
- package.json: Configuración de dependencias y scripts de npm.
- tailwindcss.config.json: Configuración de Tailwind CSS.
- tsconfig.json: Configuración de TypeScript.

Instalación

Requisitos Previos
  - Node.js (versión 14 o superior)
  - npm o pnpm (se recomienda pnpm para este proyecto)
  - MongoDB (para la base de datos)
  
Pasos de Instalación
1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Ingresar al Directorio del Proyecto
```bash
cd tu-repositorio
```

3. Instalar Dependencias
Se recomienda usar pnpm para instalar las dependencias:
```bash
pnpm install
```

Si prefieres usar npm, puedes instalar pnpm globalmente:
```bash
npm install -g pnpm
pnpm install
```

4. Configurar Variables de Entorno
Copia el archivo .env de ejemplo y configura tus variables de entorno:
```bash
cp .env.example .env
```

Edita el archivo .env y proporciona los valores necesarios:
```bash
# Configuración del Servidor
PORT=3000

# Configuración de la Base de Datos
MONGODB_URI=mongodb://localhost:27017/tu-base-de-datos

# Clave Secreta para JWT
JWT_SECRET=tu_clave_secreta

# Otras variables necesarias...
```

5. Compilar el Proyecto
Compila el proyecto usando los scripts de package.json:
```bash
pnpm build
```

## Ejecución de la Aplicación

Modo de Desarrollo
Para iniciar la aplicación en modo de desarrollo con recarga en tiempo real:

```bash
pnpm dev
```

Esto levantará tanto el servidor backend como el frontend en modo de desarrollo.

- El frontend estará disponible en http://localhost:3000.
- El backend estará corriendo en http://localhost:3001.

## Modo de Producción

Para iniciar la aplicación en modo de producción:
1. Construir el Proyecto
```bash
pnpm build
```
2. Iniciar el Servidor
```bash
pnpm start
```

El servidor levantará la aplicación preparada para producción.

## Scripts Disponibles
En el package.json, se encuentran los siguientes scripts:

- pnpm dev: Inicia la aplicación en modo de desarrollo.
- pnpm build: Compila el proyecto para producción.
- pnpm start: Inicia el servidor en modo de producción.
- pnpm lint: Ejecuta el linter para mantener la calidad del código.

## Tecnologías Utilizadas

- Node.js: Entorno de ejecución para el backend.
- Express: Framework para el servidor web.
- Socket.IO: Comunicación en tiempo real mediante WebSockets.
- MongoDB: Base de datos NoSQL.
- Mongoose: ODM para MongoDB y Node.js.
- Vue.js: Framework progresivo para el frontend.
- Vuex: Gestión del estado centralizado para Vue.js.
- Vue Router: Enrutamiento para aplicaciones Vue.js.
- TypeScript: Superset tipado de JavaScript.
- Webpack: Empaquetador de módulos para JavaScript.
- TailwindCSS: Framework CSS utilitario para un diseño rápido y responsive.
- pnpm: Gestor de paquetes rápido y eficiente.

## Contribuyendo

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad o corrección de errores:
```bash
git checkout -b mi-nueva-funcionalidad
```

3. Realiza tus cambios y realiza commits descriptivos.
4. Envía tus cambios al repositorio remoto:

```bash
git push origin mi-nueva-funcionalidad
```

5. Abre una Pull Request describiendo tus cambios en detalle.

## License

Este proyecto está bajo la Licencia MIT.

## Contacto
Si tienes alguna pregunta o sugerencia, no dudes en contactar al autor del proyecto.
