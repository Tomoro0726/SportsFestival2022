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
});
app.get("/register", (req, res) => {
  res.render("register.ejs")
});
app.get("/registercreate", (req, res) => {
  res.render("registercreate.ejs")
});
app.post("/registercreate", (req, res) => {
  if (req.body.hyouka == "昇順") {
    var hyouka = true;
  } else if (req.body.hyouka == "降順") {
    var hyouka = false;
  };
  console.log(hyouka);
  connection.query(
    'INSERT INTO tokuten (name,grade,one,two,three,four,five,six,seven,eight,hyouka) VALUES (?,?,?,?,?,?,?,?,?,?,?);',
    [req.body.name, req.body.grade, req.body.one, req.body.two, req.body.three, req.body.four, req.body.five, req.body.six, req.body.seven, req.body.eight, hyouka],
    (errow, result) => {
      console.log(errow);
      console.log(req.body);
      res.redirect('/register');
    }
  );
});

app.listen(3000);