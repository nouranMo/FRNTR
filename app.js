const express = require('express');
const session = require('express-session');
//express app
const app = express();
app.use(session({secret: 'FYNGZ_KEY'}));
app.listen(4040);
app.set('view engine','ejs');
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/clientProduct',(req,res)=>{
    res.render('clientProduct');
})
app.get('/itemPage',(req,res)=>{
    res.render('itemPage');
})
app.get('/wishlist',(req,res)=>{
    res.render('wishlist');
})
app.get('/cart',(req,res)=>{
    res.render('cart');
})
app.get('/dashboard',(req,res)=>{
    res.render('dashboard');
})
app.get('/offers',(req,res)=>{
    res.render('offers');
})
app.get('/orders',(req,res)=>{
    res.render('orders');
})
app.get('/ProductEdit',(req,res)=>{
    res.render('ProductEdit');
})
app.get('/reviews',(req,res)=>{
    res.render('reviews');
})
app.get('/statistics',(req,res)=>{
    res.render('statistics');
})
app.get('/customers',(req,res)=>{
    res.render('customers');
})
app.get('/DeleteProduct',(req,res)=>{
    res.render('DeleteProduct');
})
app.get('/AddProduct',(req,res)=>{
    res.render('AddProduct');
})
app.get('/products',(req,res)=>{
    res.render('products');
})
app.get('/SignUp',(req,res)=>{
    res.render('SignUp');
})
app.use((req,res)=>{
    res.status(404).render('404');
})

