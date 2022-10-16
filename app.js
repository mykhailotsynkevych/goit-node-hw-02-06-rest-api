const express = require("express");
const mongoose = require("mongoose");
const { mongoURL } = require("./config");
const path = require("path");
const app = express();
const logger = require("morgan");
const cors = require("cors");


const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const publicDir = path.join(__dirname, "public");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));
app.use(logger(formatsLogger));

mongoose
  .connect(mongoURL, { dbName: "03-mongodb" })
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
