'use strict'

const mongoose = require('mongoose')
const mongoURL =
  process.env.MONGODB_URL ||
  'mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon'

module.exports = () => {
  mongoose.connect(mongoURL).then(
    () => {
      mongoose.Promise = global.Promise
      const db = mongoose.connection
      db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    },
    err => {
      console.log('Unable to connect to Mongo.')
      console.log(err)
      process.exit(1)
    }
  )
}
