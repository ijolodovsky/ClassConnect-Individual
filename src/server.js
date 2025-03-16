const express = require("express");
const router = require("./controllers/courseController.js");
const { PORT } = require("./common/constants.js");

const app = express();

app.use(express.json());
app.use("/courses", router);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
