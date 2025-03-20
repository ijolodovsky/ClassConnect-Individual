const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./src/server.js",
  "./src/controllers/courseController.js",
];

const doc = {
  info: {
    title: "API de Cursos",
    description: "Documentación de la API de cursos",
  },
  host: `localhost:${process.env.PORT || 3000}`,
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
