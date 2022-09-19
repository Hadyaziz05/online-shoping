const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const express = require('express');
const lodash = require('lodash')
const {User, validate} = require('../models/users');
const { Product } = require('../models/products');
const router = express.Router();

router.get('/',auth, async(req, res)=> {
    if(!req.query) {return res.send('Id needed (put id in the query)')}
const product = await Product
.findById(req.query)  
if(!product)  {return res.status(404).send('No such product found invalid id')}

const user = await User.findById(product.userId)

if (product.quantity > 0) {
    product.quantity--
} else if (product.quantity === 0) {
 
  
    return res.send('product out of stock')
}
product.save()
let objS = {
    seller : {
        name: user.name,
        email: user.email
    },
    product: {
        nameOfProduct: product.nameOfProduct,
        quantity: product.quantity
    }
}
res.send(objS)

})


module.exports = router