const express = require("express");
const app = express();
app.use(express.static("public"));
const mysql = require("mysql");

app.use(
  express.urlencoded({
    extended: false,
  })
);



app.get("/", (req, res) => {
  console.log(req.body);
  res.render("index.ejs");
});