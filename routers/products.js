const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const express = require('express');
const lodash = require('lodash')
const {User, validate} = require('../models/users')
const {Product, validateP} = require('../models/products')
const router = express.Router();

router.post('/',auth, async(req, res)=> {
    const { error } = validateP(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 const product = new Product({
    nameOfProduct: req.body.nameOfProduct,
    quantity: req.body.quantity,
    userId: req.user
 })
 await product.save()
 res.send(product)
  
    
})

router.delete('/', auth, async(req, res)=> {
const product = await Product.findById(req.query)
if(!product) return res.status(404).send('No such product found')
if(product.userId === req.user._id) {
   const result = await Product.findByIdAndRemove(req.query)
   res.send(result)
} else if (product.userId !== req.user._id){res.send( 'you can only delete your product')}
})

module.exports = router