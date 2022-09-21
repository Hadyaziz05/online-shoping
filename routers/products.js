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
  if (req.body.quantity === 0) { 
   /*const product = new Product({
      nameOfProduct: req.body.nameOfProduct,
      quantity: req.body.quantity,
      price: req.body.price,
      userId: req.user
   })
   await product.save()*/
   return res.send('Can not post with zero quantity') 
}
  else if (req.body.quantity > 0) {
   const product = new Product({
    nameOfProduct: req.body.nameOfProduct,
    quantity: req.body.quantity,
    price: req.body.price,
    userId: req.user
 })
 await product.save()
 res.send(product)
}
    
})

router.put('/', auth, async(req, res)=> {
   if(!req.query._id) {return res.send('Id needed (put id in the query)')}
   const product = await Product.findById(req.query._id)
   if(!product) return res.status(404).send('No such product found')
   if(product.userId === req.user._id) {
      const result = await Product.findByIdAndUpdate(req.query._id, {
         nameOfProduct: req.body.nameOfProduct,
         price: req.body.price,
         quantity: req.body.quantity
      })
      await product.save()
      res.send('Updated succefully')
   } else if (product.userId !== req.user._id){res.send( 'you can only update your product')}
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