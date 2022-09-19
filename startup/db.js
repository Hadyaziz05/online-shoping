const mongoose = require('mongoose')
const config = require('config')
module.exports = function() {
    mongoose.connect('mongodb+srv://olxUser:1234@cluster0.63uvqr4.mongodb.net/test')
  .then(() => console.log('Connected to MongoDB...'))
  
}