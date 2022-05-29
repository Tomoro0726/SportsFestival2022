const e = require("express");
const express = require("express");
const app = express();
app.use(express.static("public"));
const mysql = require("mysql2");
var os = require('os');
console.log(getLocalAddress());

function getLocalAddress() {
  var ifacesObj = {}
  ifacesObj.ipv4 = [];
  ifacesObj.ipv6 = [];
  var interfaces = os.networkInterfaces();

  for (var dev in interfaces) {
    interfaces[dev].forEach(function (details) {
      if (!details.internal) {
        switch (details.family) {
          case "IPv4":
            ifacesObj.ipv4.push({ name: dev, address: details.address });
            break;
          case "IPv6":
            ifacesObj.ipv6.push({ name: dev, address: details.address })
            break;
        }
      }
    });
  }
  return ifacesObj;
};
app.use(
  express.urlencoded({
    extended: false,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "password",
  database: "sports"
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/register", (req, res) => {
  connection.query(
    'SELECT*FROM tokuten',
    (errow, result) => {
      res.render("register.ejs", {
        items: result
      });
    }
  );

});
app.get("/registercreate", (req, res) => {
  res.render("registercreate.ejs");
});
app.get("/registeredit/:id", (req, res) => {
  connection.query(
    'SELECT*FROM tokuten WHERE id=?',
    [req.params.id],
    (errow, results) => {

      console.log(results);
      console.log(req.params.id);
      console.log(errow);
      res.render('registeredit.ejs', {
        items: results[0]
      });
    }
  );
});

app.post("/registeredit/:id", (req, res) => {
  if (req.body.hyouka == "昇順") {
    var hyouka = 1;
  } else if (req.body.hyouka == "降順") {
    var hyouka = 0;
  };
  connection.query(
    'UPDATE tokuten SET name=?,grade=?,one=?,two=?,three=?,four=?,five=?,six=? ,seven=?,eight=?,hyouka=? WHERE id=?',
    [req.body.name, req.body.grade, req.body.one, req.body.two, req.body.three, req.body.four, req.body.five, req.body.six, req.body.seven, req.body.eight, hyouka, req.params.id],
    (errow, results) => {
      console.log(req);
      console.log(errow);
      res.redirect("/register");
    }
  );
});
app.post("/registerdelete/:id", (req, res) => {
  connection.query(
    'DELETE FROM tokuten WHERE id=?',
    [req.params.id],
    (errow, results) => {

      console.log(results);
      console.log(req.params.id);
      console.log(errow);
      res.redirect("/register");
    }
  );
});
app.post("/registercreate", (req, res) => {
  if (req.body.hyouka == "昇順") {
    var hyouka = 1;
  } else if (req.body.hyouka == "降順") {
    var hyouka = 0;
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

app.get("/result", (req, res) => {
  connection.query(
    'SELECT*FROM tokuten',
    (errow, result) => {
      console.log(result);
      res.render("result.ejs", {
        items: result
      });
    }
  );
});
app.get("/resultedit/:id", (req, res) => {
  connection.query(
    'SELECT*FROM tokuten WHERE id=?',
    [req.params.id],
    (errow, results) => {

      console.log(results);
      console.log(req.params.id);
      console.log(errow);
      res.render('resultedit.ejs', {
        items: results[0]
      });
    }
  );
});
app.post("/resultedit/:id", (req, res) => {
  var edit = [req.body.onekiroku, req.body.twokiroku, req.body.threekiroku, req.body.fourkiroku, req.body.fivekiroku, req.body.sixkiroku, req.body.sevenkiroku, req.body.eightkiroku, req.body.onec, req.body.twoc, req.body.threec, req.body.fourc, req.body.fivec, req.body.sixc, req.body.sevenc, req.body.eightc, req.body.onep, req.body.twop, req.body.threep, req.body.fourp, req.body.fivep, req.body.sixp, req.body.sevenp, req.body.eightp, req.body.oneh, req.body.twoh, req.body.threeh, req.body.fourh, req.body.fiveh, req.body.sixh, req.body.sevenh, req.body.eighth, req.body.oneb, req.body.twob, req.body.threeb, req.body.fourb, req.body.fiveb, req.body.sixb, req.body.sevenb, req.body.eightb, req.params.id];
  for (let i = 0; i < edit.length; i++) {
    if (edit[i] == '') {
      edit[i] = null;
    }
  };
  for (let i = 0; i < 8; i++) {
    if (edit[17 + i] == '') {
      edit[17 + i] = 0;
    }
  };
  connection.query(
    'UPDATE tokuten SET onekiroku=?,twokiroku=?,threekiroku=?,fourkiroku=?,fivekiroku=?,sixkiroku=?,sevenkiroku=?,eightkiroku=?,onec=?,twoc=?,threec=?,fourc=?,fivec=?,sixc=?,sevenc=?,eightc=?,onep=?,twop=?,threep=?,fourp=?,fivep=?,sixp=?,sevenp=?,eightp=?,oneh=?,twoh=?,threeh=?,fourh=?,fiveh=?,sixh=?,sevenh=?,eighth=?,oneb=?,twob=?,threeb=?,fourb=?,fiveb=?,sixb=?,sevenb=?,eightb=? WHERE id=?',
    edit,
    (errow, result) => {


      res.redirect('/result');
    }
  );
});

app.get("/publication", (req, res) => {
  connection.query(
    'SELECT*FROM tokuten WHERE grade="H1"',
    (errow, result) => {
      connection.query(
        'SELECT*FROM tokuten WHERE grade="H2"',
        (errow, result2) => {
          connection.query(
            'SELECT*FROM tokuten WHERE grade="H3"',
            (errow, result3) => {
              connection.query(
                'SELECT*FROM color',
                (errow, result4) => {
                  res.render("publication.ejs", {
                    items: result, items2: result2, items3: result3, items4: result4
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});
app.get("/publication/:id", (req, res) => {
  connection.query(
    'SELECT*FROM tokuten WHERE id=?', [req.params.id],
    (errow, result) => {
      res.render("publications.ejs", {
        items: result[0]
      });
    }
  );
});

app.get("/colorpublication/:id", (req, res) => {
  connection.query(
    'SELECT*FROM color WHERE id=?', [req.params.id],
    (errow, result) => {
      res.render("colorpublications.ejs", {
        items: result[0]
      });
    }
  );
});

app.get("/ip", (req, res) => {
  res.render("ip.ejs", { items: getLocalAddress() })
});

app.get("/color", (req, res) => {
  connection.query(
    'SELECT*FROM color',
    (errow, result) => {
      console.log(result);
      res.render("color.ejs", {
        items: result
      });
    }
  );
});

app.get("/colorcreate", (req, res) => {

  res.render("colorcreate.ejs")
});

app.post("/colorcreate", (req, res) => {
  if (req.body.hyouka == "昇順") {
    var hyouka = 1;
  } else if (req.body.hyouka == "降順") {
    var hyouka = 0;
  };
  connection.query(
    'INSERT INTO color (name,one,two,three,four,five,six,seven,eight,hyouka) VALUES (?,?,?,?,?,?,?,?,?,?);',
    [req.body.name, req.body.one, req.body.two, req.body.three, req.body.four, req.body.five, req.body.six, req.body.seven, req.body.eight, hyouka],
    (errow, result) => {
      console.log(errow);
      console.log(req.body);
      res.redirect('/color');
    }
  );
});

app.get("/coloredit/:id", (req, res) => {
  connection.query(
    'SELECT*FROM color WHERE id=?',
    [req.params.id],
    (errow, results) => {

      console.log(results);
      console.log(req.params.id);
      console.log(errow);
      res.render('coloredit.ejs', {
        items: results[0]
      });
    }
  );
});

app.post("/coloredit/:id", (req, res) => {
  if (req.body.hyouka == "昇順") {
    var hyouka = 1;
  } else if (req.body.hyouka == "降順") {
    var hyouka = 0;
  };
  connection.query(
    'UPDATE color SET name=?,one=?,two=?,three=?,four=?,five=?,six=? ,seven=?,eight=?,hyouka=? WHERE id=?',
    [req.body.name, req.body.one, req.body.two, req.body.three, req.body.four, req.body.five, req.body.six, req.body.seven, req.body.eight, hyouka, req.params.id],
    (errow, results) => {
      console.log(errow);
      res.redirect("/color");
    }
  );
});

app.post("/colordelete/:id", (req, res) => {
  connection.query(
    'DELETE FROM color WHERE id=?',
    [req.params.id],
    (errow, results) => {

      console.log(results);
      console.log(req.params.id);
      console.log(errow);
      res.redirect("/color");
    }
  );
});

app.get("/colorresult", (req, res) => {
  connection.query(
    'SELECT*FROM color',
    (errow, result) => {
      console.log(result);
      res.render("colorresult.ejs", {
        items: result
      });
    }
  );
});

app.get("/colorresultedit/:id", (req, res) => {
  connection.query(
    'SELECT*FROM color WHERE id=?',
    [req.params.id],
    (errow, results) => {

      console.log(results);
      console.log(req.params.id);
      console.log(errow);
      res.render('colorresultedit.ejs', {
        items: results[0]
      });
    }
  );
});

app.post("/colorresultedit/:id", (req, res) => {
  var edit = [req.body.onekiroku, req.body.twokiroku, req.body.threekiroku, req.body.fourkiroku, req.body.fivekiroku, req.body.sixkiroku, req.body.sevenkiroku, req.body.eightkiroku, req.body.onec, req.body.twoc, req.body.threec, req.body.fourc, req.body.fivec, req.body.sixc, req.body.sevenc, req.body.eightc, req.body.onep, req.body.twop, req.body.threep, req.body.fourp, req.body.fivep, req.body.sixp, req.body.sevenp, req.body.eightp, req.body.oneh, req.body.twoh, req.body.threeh, req.body.fourh, req.body.fiveh, req.body.sixh, req.body.sevenh, req.body.eighth, req.body.oneb, req.body.twob, req.body.threeb, req.body.fourb, req.body.fiveb, req.body.sixb, req.body.sevenb, req.body.eightb, req.params.id];
  for (let i = 0; i < edit.length; i++) {
    if (edit[i] == '') {
      edit[i] = null;
    }
  };
  for (let i = 0; i < 8; i++) {
    if (edit[17 + i] == '') {
      edit[17 + i] = 0;
    }
  };
  connection.query(
    'UPDATE color SET onekiroku=?,twokiroku=?,threekiroku=?,fourkiroku=?,fivekiroku=?,sixkiroku=?,sevenkiroku=?,eightkiroku=?,onec=?,twoc=?,threec=?,fourc=?,fivec=?,sixc=?,sevenc=?,eightc=?,onep=?,twop=?,threep=?,fourp=?,fivep=?,sixp=?,sevenp=?,eightp=?,oneh=?,twoh=?,threeh=?,fourh=?,fiveh=?,sixh=?,sevenh=?,eighth=?,oneb=?,twob=?,threeb=?,fourb=?,fiveb=?,sixb=?,sevenb=?,eightb=? WHERE id=?',
    edit,
    (errow, result) => {


      res.redirect('/colorresult');
    }
  );
});

app.listen(3000);