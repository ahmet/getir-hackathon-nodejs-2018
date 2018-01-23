'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema(
  {
    key: String,
    created_at: { type: Date, default: Date.now }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
)

const Record = mongoose.model('Record', recordSchema)
module.exports = Record
