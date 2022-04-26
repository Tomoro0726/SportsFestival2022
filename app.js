const express=require('express');
const mysql = require('mysql');
const app=express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '4460726tomoro',
    database: 'media'
});

app.get('/',(req,res) => {
    res.render('index.ejs');
});