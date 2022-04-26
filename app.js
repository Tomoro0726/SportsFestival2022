const express=require('express');
const app=express();
app.use(express.static('public'));

app.get('/',(req,res) => {
    res.render('index.ejs');
});
app.get('/competition',(req,res)=>{
    res.render('competition.ejs')
});

app.get('/new',(req,res)=>{
    res.render('new.ejs')
});

app.get('/edit',(req,res)=>{
    res.render('edit.ejs')
});

app.get('/all',(req,res)=>{
    res.render('all.ejs')
});

app.listen(3000);
