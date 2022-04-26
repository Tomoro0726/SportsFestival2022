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
  host: "127.0.0.1",
  user: "root",
  password: "4460726tomoro",
  database: "sports"
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/competition", (req, res) => {
  res.render("competition.ejs");
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/newcompetition", (req, res) => {
  console.log(req.body);
  connection.query(
    'INSERT INTO table4 (name,grade) VALUES (?,?);',
    [req.body.competition_name, req.body.competition_grade],
    (errow, result) => {
      console.log(errow);
      res.redirect('/competition');
    }
  );
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

app.get("/all", (req, res) => {
  res.render("all.ejs");
});

app.listen(3000);