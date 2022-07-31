const express = require("express");
const app = express();
const Port = process.env.Port || 9046;
app.use(express.urlencoded({ extended: false }));
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/upload"));

Mongoose.connect(
  "mongodb+srv://Hrishi:okRYAmDWwiGEiK7j@cluster0.lqquo.mongodb.net/?retryWrites=true&w=majority"
)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error", error);
  });
app.use(BodyParser.urlencoded({ extended: false }));
app.use(express.static(Path.resolve(__dirname, "public")));
app.listen(Port, () => {
  console.log("server is running at port" + Port);
});
