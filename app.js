const express = require('express');
const session = require('express-session');
//express app
const app = express();
app.use(session({secret: 'FYNGZ_KEY'}));
app.listen(8080);
app.set('view engine','ejs');
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('index');
})
app.use((req,res)=>{
    res.status(404).render('404');
})