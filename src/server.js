require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json"); // Importa el archivo generado


const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const courseController = require("./controllers/courseController");
const { errorMiddleware } = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/courses", courseController);

app.use(errorMiddleware);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.PORT;

if (!PORT) {
  throw new Error("PORT no está definido en el .env");
}

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });
}

module.exports = app;
