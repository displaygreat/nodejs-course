const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.listen(3000);

app.get("/", function (req, res) {
  res.render("index", { title2: "simple title2" });
});
app.get("/add-item", function (req, res) {
  res.render("add-item");
});

app.use((req, res) => {
  res.render("error");
});
