const express = require('express');
const app = express();
const morgan = require('morgan'); // Http isteklerini kaydetmek için kullanılır.
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Header',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})




module.exports = app;