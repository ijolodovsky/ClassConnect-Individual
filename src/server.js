const express = require('express');
const app = express();
const courseController = require('./controllers/courseController'); // Ruta donde están las rutas de los cursos
const errorMiddleware = require('./middleware/errorMiddleware'); // Importamos el middleware de errores

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas de cursos
app.use('/courses', courseController);

// Middleware de manejo de errores (al final de todos los middlewares y rutas)
app.use(errorMiddleware);

// Iniciar el servidor y mostrar un mensaje en consola
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});

module.exports = app;
