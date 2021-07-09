const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
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

app.get("/", function (req, res) {
  res.redirect("/get-items");
});

app.get("/get-items", (req, res) => {
  Item.find()
    .then((result) => {
      res.render("index", { items: result });
    })
    .catch((err) => console.log(err));
});

app.get("/add-item", function (req, res) {
  res.render("add-item");
});

app.post("/items", (req, res) => {
  console.log(req.body);
  const item = Item(req.body);
  item
    .save()
    .then(() => {
      res.redirect("/get-items");
    })
    .catch((err) => console.log(err));
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id).then((result) => {
    console.log("result", result);
    res.render("item-details", { item: result });
  });
});

app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: "/get-items" });
  });
});

app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(id, req.body).then((result) => {
    res.json({ msg: "Updated successfully" });
  });
});

app.use((req, res) => {
  res.render("error");
});
