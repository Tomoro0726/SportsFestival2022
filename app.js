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
  console.log(req.body);
  res.render("index.ejs");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  if (req.body.id == 'tosyo' && req.body.pass == 'tosyo') {
    res.redirect("/all");
  } else if (req.body.id == 'ict' && req.body.pass == 'ict') {

  } else if (req.body.id == 'housou' && req.body.pass == 'housou') {

  } else if (req.body.id == 'taiiku' && req.body.pass == 'taiiku') {

  }
  res.redirect("/");
});

app.get("/competition", (req, res) => {
  connection.query(
    'SELECT*FROM table1',

    (errow, results) => {
      console.log(results);
      res.render('competition.ejs', {
        items: results
      });
    }
  );
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/newcompetition", (req, res) => {
  console.log(req.body);
  connection.query(
    'INSERT INTO table1 (name,grade,1_score,2_score,3_score,4_score,5_score,6_score,7_score,8_score) VALUES (?,?,?,?,?,?,?,?,?,?);',
    [req.body.competition_name, req.body.competition_grade, req.body.competition_1_score, req.body.competition_2_score, req.body.competition_3_score, req.body.competition_4_score, req.body.competition_5_score, req.body.competition_6_score, req.body.competition_7_score, req.body.competition_8_score],
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