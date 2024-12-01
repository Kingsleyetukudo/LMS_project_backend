const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const user = require("./routes/userRoute");

const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL;

mongoose
  .connect(DBURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`the server is currently running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("founded " + error);
  });

app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
