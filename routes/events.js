var express = require("express")
var router = express.Router()
var dbConnection = require('../helpers/dbConnection')


// get request only parse as a query string

router.get('/search', function(req, resp){

    // console.log(req)
    console.log(req.query.search, req.query.date)
    var sql = "SELECT * FROM event JOIN venue ON event.venue_id = venue.venue_id WHERE (event.title LIKE ? AND event.date LIKE ?)";
    var inserts = [req.query.search, req.query.date];
    console.log(inserts)
    dbConnection.all(sql,inserts, function (err, result) {
      console.log(sql, inserts)
        if (err) {
            resp.send("No such event")
        };

        //Sending JSON.
        return resp.json(result);
    });

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
    var date = req.body.date



    if (req.body.event_id == ''){
        resp.send("Please enter all data")
        return
    }
    if (req.body.title == ''){
        resp.send("Please enter all data")
        return
    }
    if (req.body.venue_id == ''){
        resp.send("Please enter all data")
        return
    }

    if (req.body.date == ''){
        resp.send("Please enter all data")
        return
    }

    if (req.body.date.length == 8){
        var date = date.slice(0, 4) + "-" + date.slice(4);
        console.log(date)
        var date = date.slice(0, 7) + "-" + date.slice(7);
        console.log(date)
    }

    var inserts = [req.body.event_id, req.body.venue_id, req.body.title, date , req.body.url, req.body.blurb]

    var sql = "INSERT INTO event (event_id,venue_id,title,date,url,blurb) VALUES (?,?,?,?,?,?)"

console.log(inserts)
  dbConnection.all(sql , inserts, function(err, res) {

      console.log(sql,inserts)
    if (err) {
      resp.send("Please enter all data")
        return
    }
    resp.send("Success Your event have been added to a database")
  })
})


// DOES NOT DO ANYTHINGGGG
// router.post('/test', function (req,resp)){
//   const { test_id } = req.body
//   console.log(test_id);
// })

module.exports = router
