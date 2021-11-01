const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const usersController = require('./controllers/users')
const listingsController = require('./controllers/listings')
const ordersController = require('./controllers/orders')
const sessionsController = require('./controllers/sessions')
const port = process.env.PORT ?? 3001

// * Config
const mongoURI = process.env.MONGODB_URI ?? 'mongodb+srv://desertkrieg:<password>@cluster0.btgsa.mongodb.net/groupBuy?retryWrites=true&w=majority'
mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...'+ mongoURI)
})


// * Middleware
// app.use(session({
//   secret: 'feedmeseymour',
//   resave: false,
//   saveUninitialized: false
// }))
app.use(express.static(path.join(__dirname, "/client/build")))
app.use(express.json({extended: true}))
app.use('/api/users', usersController)
app.use('/api/listings', listingsController)
app.use('/api/orders', ordersController)
app.use('/api/sessions', sessionsController)


// * Routes
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


// * Listen
app.listen(port, () => {
  console.log('listening on port '+port)
})