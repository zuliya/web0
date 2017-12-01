var express = require("express")
var router = express.Router()
var dbConnection = require('../helpers/dbConnection')

router.get('/search', function(req, resp){
  const {search, date} = req.query
  let query = 'SELECT * FROM event where'
  if (search) query += `title LIKE '%${search}%'`
  if (date) query += `title LIKE '%${search}%'`
  if (search && date) query += ` AND `
  dbConnection.query(query, function (err, result) {
    if (err) {
      console.log(err)
      resp.send("404 - page not found")
    }
    resp.send(result)
  })
})

router.get('/get/:event_id', function(req, resp){
  const id = req.params.event_id;
  dbConnection.query('SELECT * FROM event where event_id = ?', id, function(err, res, fields) {
    if(err) throw err
    const event = res[0]
    if (!event) {
      resp.send("Error: no such event")
      return
    }
    resp.json(event);
  })
})

router.post('/add', function(req, resp){
  const { event_id, title, venue_id, date, url, blurb } = req.body
  const params = { event_id, title, venue_id, date, url, blurb }
  dbConnection.query('INSERT INTO event SET ?', params, function(err, res) {
    if (err) {
      resp.send(err)
      return
    }
    resp.send(params)
  })
})

module.exports = router
