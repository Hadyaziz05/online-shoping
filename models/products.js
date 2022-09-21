const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nameOfProduct: {
        type: String,
        minlength: 3,
        maxlength: 50,
        
    },
    quantity: {
        type: Number,
        
    },
    price : {
        type:Number,

    },

    userId: {
        type: String,
        
    }
    
})


const Product = mongoose.model('Product', productSchema)


function validateProduct(product) {
    const schema = {
        
        
                nameOfProduct: Joi.string().min(3).max(50).required(),
                quantity: Joi.number().required(),
                price: Joi.number().required()
            
       
    };
  
    return Joi.validate(product, schema);
  }
  
  exports.Product = Product; 
  exports.validateP = validateProduct;
  exports.productSchema = productSchema