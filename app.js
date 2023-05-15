import express from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT;
const URI = process.env.URI;
//express app
const app = express();
app.use(session({secret: 'FYNGZ_KEY'}));
app.listen(port);
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import index_router from "./routes/index.js";
import product_router from "./routes/Products.js";
import user_router from "./routes/User.js";

app.use('/', index_router);
app.use('/User', user_router);
app.use('/Product', product_router);
app.use((req,res)=>{
    res.status(404).render('404');
})
//connect to mongodb   
import mongoose from 'mongoose';
mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>console.log('connected to db'))
.catch((err)=>console.log(err));

export default app;