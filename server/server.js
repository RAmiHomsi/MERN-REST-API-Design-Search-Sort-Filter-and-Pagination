require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("./db");
const movieRouter = require("./routes/movies");

app.use(express.json());
app.use(cors());

app.use("/api", movieRouter);

app.listen("8080", () => {
  console.log("listning to port 8080");
});
