var express = require("express")
var router = express.Router()
var dbConnection = require('../helpers/dbConnection')


// get request only parse as a query string

router.get('/search', function(req, resp){
  const {search, date} = req.query;
    console.log("Here")
    console.log(search,date)
    let query = 'SELECT * FROM event WHERE'
    if (!search[0] && !date[0]) query  = "SELECT * FROM event"
    if (search) query += ` title LIKE '%${search}%'`
    if (date) query += ` title LIKE '%${date}%'`
    if (search && date) query += ` AND `
    console.log(query)



  dbConnection.all(query, function (err, result) {
    if (err) {
      console.log(err)
      resp.send("No such event")

    }
    resp.json(result)
  })

})



router.get('/get/:event_id', function(req, resp){

  const id = req.params.event_id;
  dbConnection.all('SELECT * FROM event WHERE event_id = ?', id, function(err, res, fields) {
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

  // const  { event_id, venue_id,title, date, url, blurb } = req.body
    //const params = { event_id, venue_id,title, date, url, blurb }
    // var auth_token = [req.body.auth_token]
    var inserts = [req,req.body.event_id, req.body.venue_id, req.body.title, req.body.date, req.body.url, req.body.blurb]
  var sql = "INSERT INTO event (event_id,venue_id,title,date,url,blurb) VALUES (?,?,?,?,?,?)"

console.log(inserts)
  dbConnection.all(sql , inserts, function(err, res) {

      console.log(sql,inserts)
    if (err) {
      resp.send("Please enter all data")
        return
    }
    resp.send("Success")
  })
})


// DOES NOT DO ANYTHINGGGG
// router.post('/test', function (req,resp)){
//   const { test_id } = req.body
//   console.log(test_id);
// })

module.exports = router
