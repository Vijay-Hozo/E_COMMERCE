const express = require("express");
const cors = require("cors")
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

const Productroute = require('./Routes/ProductRoute')
const Userroute = require('./Routes/UserRoute')
const Cartroute = require('./Routes/CartRoute')
const Orderroute = require('./Routes/OrderRoute')

const app = express();
app.use(bodyparser.json())
app.use(cors());

//DATABASE CONNECTION
mongoose.connect(
    'mongodb+srv://Products:vijay2304@cluster0.4d5oyr6.mongodb.net/Product?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});

//VIEW ENGINE
app.set('view engine','ejs'); //EMBEDDED JAVASCRIPT

//ROUTES
app.use('/',Productroute)
app.use('/',Userroute)
app.use('/',Cartroute)
app.use('/',Orderroute)

//SERVER
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})