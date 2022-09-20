const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const express = require('express');
const lodash = require('lodash')
const {User, validate} = require('../models/users');
const { Product } = require('../models/products');
const router = express.Router();

router.get('/', auth , async(req, res)=> {
    let arr = []
const product = await Product.find()
for (let i = 0; i < product.length; i++){
    if (product[i].quantity === 0) {
        product.splice(i, 1)
    } 
}
for (let j =0; j < product.length; j++) {
    let user = await User.findOne({_id: product[j].userId})
    arr.push({
        sellerDetails: {
            name: user.name,
            email: user.email
        },
        productDetails: {
            _id: product[j]._id,
            name: product[j].nameOfProduct,
            quantity: product[j].quantity
        }
    })
}

    res.send(arr)
})


module.exports = router