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
    res.render('competition.ejs')
});

app.listen(3000);
