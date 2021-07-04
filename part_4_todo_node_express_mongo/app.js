const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");
const mongodb = config.MONGODB_CONNECTION;
console.log(mongodb);
const Item = require("./models/items");
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
app.set("view engine", "ejs");

app.get("/create-item", (req, res) => {
  const item = new Item({
    name: "headphones",
    price: 500,
  });
  item
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/get-items", (req, res) => {
  Item.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/get-item", (req, res) => {
  Item.findById("60e0ca096b98601cb45f7155")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/", function (req, res) {
  const items = [
    { name: "mobile phone", price: 1000 },
    { name: "book", price: 30 },
    { name: "computer", price: 2000 },
  ];
  res.render("index", { items });
});
app.get("/add-item", function (req, res) {
  res.render("add-item");
});

app.use((req, res) => {
  res.render("error");
});
