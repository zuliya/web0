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
      const { id, name, postcode, town, url, icon } = result[i]
      // string interpalation ['']
      normalized[`v_${id}`] = { name, postcode, town, url, icon }
    }
    resp.json({ venues: normalized })
  })
})

router.post("/add", function(req, resp) {
  const { name, postcode, town, url, icon } = req.body
  const params = {name, postcode, town, url, icon }

  dbConnection.all('INSERT INTO venue SET ?', params, function(err, res) {
    console.log(params)
    if (err) {
      resp.send(err)
      console.log(params)
      return
    }
    resp.send(params)
  })
});

module.exports = router
