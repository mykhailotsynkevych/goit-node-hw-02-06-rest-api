const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const app = express();
const multer = require('multer');
const logger = require("morgan");
const cors = require("cors");

// const avatarRouter = express.Router();

// const avatarsDir = path.join(__dirname, "public/avatars");
const tempDir = path.join(__dirname, "temp");

// console.log(tempDir);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});


app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// http://localhost:3000/avatars/av1.jpeg


const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const mongoose = require("mongoose");
const { mongoURL } = require("./config");

mongoose
  .connect(mongoURL, { dbName: "03-mongodb" })
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });




const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);
// app.use("/api/products", avatarRouter);

app.use(logger(formatsLogger));


// app.get("/public/avatars", async (req, res) => {
//   res.json(avatars);
// });
app.post("/", upload.single("image"), async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);

  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
