const express = require('express');
const dotenv=require('dotenv');
const morgan=require('morgan'); //allows us to log a request on console whenever we make req
const path=require('path');
const bodyParser = require('body-parser');

const connectDB = require('./server/database/connection');


const app=express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}))


//set view engine
app.set("view engine","ejs")
//app.set('views',__dirname + '/views');


//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,() => {
    console.log(`server is running on http://localhost:${PORT}`);
})