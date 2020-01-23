const express = require('express');
//express is going to make handling requests easier for us
const app = express();
//middleware to help log incoming requests
const morgan = require('morgan');
//middleware that parses incoming request bodies before your handlers, 
//and makes them available under req.body
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//setup morgan middleware to handle logging of incoming requests
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Before going to middleware used for routing, adjust response headers
//so that CORS is allowed
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //have to handle this case because browser always first sends OPTIONS request to see what methods are allowed
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    //so that other routes can take over
    next();
})
//sets up a middlware, incoming requests have to come through app.use()
//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes)

//catch all - if the above routes didnt match, then we dont have something to handle request
//so we catch the request and handle it as an error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;