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


    res.send(product)
})

router.get('/myProducts', auth, async(req, res)=> {
    const product = await Product.find()
    for (let i = 0 ; i < product.length; i++){
        if(product[i].userId !== req.user._id){ product.splice(i, 1)}
    }
    res.send(product)
})


module.exports = router