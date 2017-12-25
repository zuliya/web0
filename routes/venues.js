var express = require("express")
var router = express.Router()
var dbConnection = require('../helpers/dbConnection')

// Get all venues
router.get("/", function(req, resp) {
  // application/json all response have JSON have to send JSON
      resp.setHeader("content-type", "application/json");
  // pass the query to an established connection

  const query = 'SELECT * FROM venue'
  dbConnection.all(query, function(error, result) {
    if (error) {
      console.log(error)
    }
    let normalized = {}
    for (var i = 0; i < result.length; i++ ) {
      const { venue_id, name, postcode, town, url, icon } = result[i]
      // string interpalation ['']
      normalized[`v_${venue_id}`] = { name, postcode, town, url, icon }
    }
    resp.json({ venues: normalized })
  })
})

router.post("/add", function(req, resp) {

    var inserts = [req.body.name, req.body.postcode, req.body.town, req.body.url, req.body.icon]

    if (req.body.name == ''){
        resp.send("Please enter all data")
        return
    }
    if (req.body.postcode == ''){
        resp.send("Please enter all data")
        return
    }
    if (req.body.town == ''){
        resp.send("Please enter all data")
        return
    }


    var sql = "INSERT INTO venue (name, postcode, town, url, icon ) VALUES (?,?,?,?,?)"

    console.log(inserts)
    dbConnection.all(sql , inserts, function(err, res) {

        console.log(sql,inserts)
        if (err) {
            resp.send("Please enter all data")
            return

        }
        resp.send("Success")
    })

});

module.exports = router
