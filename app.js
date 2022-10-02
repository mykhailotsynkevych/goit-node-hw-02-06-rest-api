const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require('mongoose');
// const { connect } = require("mongoose");
const { mongoURL } = require("./config");

// const mongoURL =
//   "mongodb+srv://tsynkevych:987654321@cluster0.xqzeagt.mongodb.net/?retryWrites=true&w=majority";
// const { mongoURL } = require("./config");
mongoose
  .connect(mongoURL, { dbName: "03-mongodb" })
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err.message));
const contactsRouter = require("./routes/api/contacts");

const app = express();
app.use(express.json());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
