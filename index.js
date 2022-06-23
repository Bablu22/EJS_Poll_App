const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const postController = require("./controllers/createPoll");
const showPoll = require("./controllers/showPolls");
const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: "true" }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/create", postController);
app.use("/show", showPoll);

app.get("/", (req, res) => {
  res.render("home");
});

mongoose
  .connect(
    `mongodb+srv://express-poll:${process.env.PASSWORD}@cluster0.tzt34uk.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
