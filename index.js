const config = require('config')
const mongoose = require('mongoose');
const users = require('./routers/users')
const auth = require('./routers/auth')
const brows = require('./routers/brows')
const buy = require('./routers/buy')
const products = require('./routers/products')
const express = require('express');
const app = express();


mongoose.connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/brows', brows)
app.use('/api/products', products)
app.use('/api/buy', buy)

const port = process.env.PORT || 3008;
app.listen(port, () => console.log(`Listening on port ${port}...`));