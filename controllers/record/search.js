'use strict'

const Record = require('../../models/record')

const RecordSearchController = (req, res) => {
  let aggregateQuery = []

  let addFieldQuery = {
    '$addFields': {
      'totalCount': {
        '$sum': '$counts'
      }
    }
  }
  aggregateQuery.push(addFieldQuery)

  let matchQuery = {}
  if (req.body.startDate || req.body.endDate) {
    matchQuery['$match'] = matchQuery['$match'] || {}
    matchQuery['$match']['createdAt'] = matchQuery['$match']['createdAt'] || {}
  }

  if (req.body.startDate) {
    matchQuery['$match']['createdAt']['$gte'] = new Date(req.body.startDate)
  }

  if (req.body.endDate) {
    matchQuery['$match']['createdAt']['$lte'] = new Date(req.body.endDate)
  }

  if (req.body.minCount) {
    matchQuery['$match']['totalCount'] = matchQuery['$match']['totalCount'] || {}
    matchQuery['$match']['totalCount']['$gte'] = req.body.minCount
  }

  if (req.body.maxCount) {
    matchQuery['$match']['totalCount'] = matchQuery['$match']['totalCount'] || {}
    matchQuery['$match']['totalCount']['$lte'] = req.body.maxCount
  }

  if (Object.keys(matchQuery).length !== 0 && matchQuery.constructor === Object) {
    aggregateQuery.push(matchQuery)
  }

  let projectQuery = { '$project': { '_id': 0, 'key': 1, 'createdAt': 1, 'totalCount': 1 } }
  aggregateQuery.push(projectQuery)

  Record.aggregate(aggregateQuery).exec(function (err, records) {
    if (err) {
      res.status(400).json({
        'code': -1,
        'msg': 'Error',
        'records': []
      })
    } else {
      res.json({
        'code': 0,
        'msg': 'Success',
        'records': records
      })
    }
  })
}

module.exports = RecordSearchController
