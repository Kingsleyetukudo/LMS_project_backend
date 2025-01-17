const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://gcqjxlzv-5173.uks1.devtunnels.ms/",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

const user = require("./routes/userRoute");
const instructor = require("./routes/instructorRoute");
const cloudinary = require("./controllers/cloudinary_function");
const course = require("./routes/courseRoute");

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL;

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
app.use("/api/instructor", instructor);
app.use("/api", cloudinary);
app.use("/api/course", course);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
