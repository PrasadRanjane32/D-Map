const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

dotenv.config({path:'./Server/config.env'})

require('./Server/db/conn');

// const User = require('./model/userSchema');

app.use(express.json());
app.use(cookieParser());
// we link the router files to make our route easy 
app.use(require('./Server/router/auth'));

const PORT = process.env.Port || 5000;

// Middelware 
// const middleware = (req,res, next) => {
//     console.log(`Hello my Middleware`);
//     next();
// }

// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app.js`);
// });

// app.get('/about', middleware, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello About world from the server`);
// });

// app.get('/contact', (req, res) => {
//     res.send(`Hello Contact world from the server`);
// });

// app.get('/signin', (req, res) => {
//     res.send(`Hello Login world from the server`);
// });

// app.get('/signup', (req, res) => {
//     res.send(`Hello Registration world from the server`);
// });

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})

