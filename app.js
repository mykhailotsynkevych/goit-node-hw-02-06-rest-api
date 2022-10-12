const express = require("express");
const logger = require("morgan");
const cors = require("cors");

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

const app = express();
app.use(express.json());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use(logger(formatsLogger));
app.use(cors());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
