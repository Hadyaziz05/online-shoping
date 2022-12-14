const mongoose = require('mongoose');
const users = require('./routers/users')
const auth = require('./routers/auth')
const brows = require('./routers/brows')
const buy = require('./routers/buy')
const products = require('./routers/products')
const express = require('express');
const app = express();


mongoose.connect('mongodb+srv://olxUser:1357@mycluster.b1xvmmt.mongodb.net/test')
  .then(() => console.log('Connected to MongoDB...'))

app.use(express.json());

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/brows', brows)
app.use('/api/products', products)
app.use('/api/buy', buy)

const port = process.env.PORT || 3008;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server