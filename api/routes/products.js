const express = require('express');
//sub package that express framework ships with that gives us capability to conveniently handle different routes
//reaching different endpoints with different HTTP words
const router = express.Router();

//get() handles incoming get requests 

//200 status just means success, or OK
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

//201 status means success in creating resource
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special id',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an id'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    });
});


router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    });
});


module.exports = router;