const express = require("express");
const app = express();
app.use(express.static("public"));
const mysql = require("mysql");

app.use(
  express.urlencoded({
    extended: false,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4460726tomoro",
  database: "sports"
});

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.listen(3000);