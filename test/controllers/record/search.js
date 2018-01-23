'use strict'

const request = require('supertest')
const express = require('express')
const expect = require('expect')
const connectToDB = require('../../../database')
const recordSearchCtrl = require('../../../controllers/record/search')

describe('POST /searchRecord', () => {
  connectToDB()
  let app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.post('/searchRecord', recordSearchCtrl)

  it('should get at least 1 valid record', function (done) {
    this.timeout(30000)

    request(app)
      .post('/searchRecord')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        'startDate': '2016-01-26',
        'endDate': '2017-02-02',
        'minCount': 2700,
        'maxCount': 3000
      })
      .expect(200)
      .expect(res => {
        expect(res.body.code).toBe(0)
        expect(res.body.msg).toBe('Success')
        expect(res.body.records.length).toBeGreaterThan(0)
        expect(res.body.records[0].totalCount).toBeGreaterThanOrEqual(2700)
        expect(res.body.records[0].totalCount).toBeLessThanOrEqual(3000)
      })
      .end(done)
  })
})
