require("dotenv").config();

const express = require("express");
const app = express();
const courseController = require("./controllers/courseController");
const { errorMiddleware } = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/courses", courseController);

app.use(errorMiddleware);

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
