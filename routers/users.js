
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const express = require('express');
const lodash = require('lodash')
const {User, validateU} = require('../models/users')
const router = express.Router();

router.post('/', async(req, res)=> {
    const { error } = validateU(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  //let user = await User.findOne({email: req.body.email})
  //if (user) return res.status(400).send('User already registered.')
   
     let user = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: req.body.password
      
     })
     const salt = await bcrypt.genSalt(10)
     user.password = await bcrypt.hash(user.password, salt)
    await user.save()
     
     res.send(lodash.pick(user, '_id', 'name', 'email'))
    
})

module.exports = router