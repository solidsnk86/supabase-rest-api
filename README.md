# Supabase REST API

Esta es una API RESTful desarrollada con Node.js que utiliza Supabase como motor de base de datos. La aplicación sigue la arquitectura **MVC** (Modelo-Vista-Controlador) y está implementada utilizando **Programación Orientada a Objetos (OOP)**. Además, se han integrado validaciones robustas con [Zod](https://github.com/colinhacks/zod) para garantizar la integridad de los datos en cada request.

## Características

- **API RESTful:** Endpoints estructurados para realizar operaciones CRUD (Create, Read, Update, Delete).
- **Supabase:** Utiliza Supabase para la gestión y manipulación de la base de datos.
- **Validaciones con Zod:** Se implementa [Zod](https://github.com/colinhacks/zod) para validar la entrada de datos y prevenir inyecciones o datos mal formateados.
- **Arquitectura MVC:** Separación de responsabilidades en modelos, controladores y rutas.
- **Programación Orientada a Objetos:** Organización del código en clases para facilitar la reutilización y el mantenimiento.
- **Middlewares de CORS y Rate Limiting:** Configuración personalizada de CORS y limitación de requests para mejorar la seguridad y el rendimiento.

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Supabase](https://supabase.com/)
- [Zod](https://github.com/colinhacks/zod)
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- [cors](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv)

## Estructura del Proyecto

La estructura del proyecto sigue una organización basada en MVC y OOP. Por ejemplo:

```
├── middlewares
│   └── cors.js        # Middleware para CORS
├── routes
│   └── data.js        # Rutas para la API
├── schemas
│   └── data.js        # Esquema de validación con Zod
├── models
│   └── supabase.js    # Modelo para la comunicación con Supabase
├── src
│   └── index.js       # Punto de entrada de la aplicación y configuración de Express
└── package.json       # Configuración del proyecto y dependencias
```

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/supabase-rest-api.git
   cd supabase-rest-api
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables (ajústalas según tus credenciales):

   ```env
   PORT=3639
   SUPABASE_URL=tu_supabase_url
   SUPABASE_KEY=tu_supabase_key
   ```

## Uso

Para iniciar la aplicación en modo de desarrollo:

```bash
npm run dev
```

La aplicación se ejecutará en http://localhost:3639 (o el puerto definido en tu archivo .env).

## Endpoints Principales

- **GET** `/supabase?from=<tableName>&select=<fields>`
  Recupera datos de la tabla especificada.

- **GET** `/supabase/optional?from=<tableName>&select=<fields>&order=<column>&limit=<number>`
  Recupera datos opcionales de la tabla especificada.

- **GET** `/supabase/search?from=<tableName>&select=<fields>&column=<fields>&eq=<value>`
  Búsqueda de datos de la tabla y columna especificados.

- **POST** `/supabase?from=<tableName>`
  Inserta nuevos datos en la tabla especificada. Los datos se envían en el body de la request.

- **PUT** `/supabase/:id?from=<tableName>`
  Actualiza el registro con el ID indicado en la tabla especificada.

- **DELETE** `/supabase/:id?from=<tableName>`
  Elimina el registro con el ID indicado en la tabla especificada.

_Nota: La validación de los parámetros `from` y `select` se realiza mediante Zod, lo que garantiza que los datos enviados cumplan con el formato esperado y no contengan inyecciones o patrones maliciosos._

## Ejemplo de Código

### Archivo principal (src/index.js)

```javascript
const express = require('express')
const { rateLimit } = require('express-rate-limit')
require('dotenv').config()
const { createDataRouter } = require('./routes/data')
const corsMiddleware = require('../middlewares/cors.js')

const createApp = () => {
  const app = express()

  app.use(express.json())
  app.disable('x-powered-by')
  app.use(corsMiddleware())

  const rateLimiter = rateLimit({
    limit: 300,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests',
  })

  app.use(rateLimiter)
  app.use('/supabase', createDataRouter())

  const PORT = process.env.PORT ?? 3639
  app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
  })
}

createApp()
```

### Middleware de CORS (middlewares/cors.js)

```javascript
const cors = require('cors')

const ACCEPTED_ORIGINS = [
  'https://calcagni-gabriel.vercel.app',
  'https://neo-wifi.vercel.app',
  'https://double-commit.vercel.app',
  'http://localhost:3639',
]

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    },
  })
}

module.exports = corsMiddleware
```
