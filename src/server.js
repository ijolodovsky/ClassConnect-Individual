import express from "express";
import router from "./controllers/courseController.js";
import { PORT } from "./common/constants.js";

let app = express();

app.use(express.json());
app.use("/courses", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
