const express = require("express");
const app = express();
const courseController = require("./controllers/courseController");
const { errorMiddleware } = require("./middleware/errorMiddleware");

app.use(express.json());

// Rutas de cursos
app.use("/courses", courseController);

// Middleware de manejo de errores
app.use(errorMiddleware);

const PORT =
  process.env.PORT || (process.env.NODE_ENV === "test" ? 3001 : 3000);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
}
module.exports = app;
